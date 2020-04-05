/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as handpose from '@tensorflow-models/handpose';
import * as facemesh from '@tensorflow-models/facemesh';
import {TRIANGULATION} from './triangulation';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import {version} from '@tensorflow/tfjs-backend-wasm/dist/version';
import push from 'push.js';
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import { v4 as uuidv4 } from 'uuid';


const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    googleAnalytics({
      trackingId: 'UA-161594606-1'
    })
  ]
})




function isMobile() {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isAndroid || isiOS;
}

// tfjsWasm.setWasmPath(
//     `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
//         version}/dist/tfjs-backend-wasm.wasm`);

let videoWidth, videoHeight, scatterGLHasInitialized = false, scatterGL,
  fingerLookupIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20]
  }; // for rendering each finger as a polyline

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;
const mobile = isMobile();
// Don't render the point cloud on mobile in order to maximize performance and
// to avoid crowding limited screen space.
// const renderPointcloud = mobile === false;


const state = {
  // backend: 'wasm',
  triangulateMesh: true,
  lowSpeedMode: false,
  windowOpen: false
};



function setupDatGui() {
  const gui = new dat.GUI();
  gui.add(state, 'lowSpeedMode');
  gui.add(state, 'windowOpen');
}

function drawPoint(ctx, y, x, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}

function drawKeypoints(ctx, keypoints) {
  const keypointsArray = keypoints;

  for (let i = 0; i < keypointsArray.length; i++) {
    const y = keypointsArray[i][0];
    const x = keypointsArray[i][1];
    drawPoint(ctx, x - 2, y - 2, 3);
  }

  const fingers = Object.keys(fingerLookupIndices);
  for (let i = 0; i < fingers.length; i++) {
    const finger = fingers[i];
    const points = fingerLookupIndices[finger].map(idx => keypoints[idx]);
    drawPath(ctx, points, false);
  }

}

function drawPath(ctx, points, closePath) {
  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
  }

  if (closePath) {
    region.closePath();
  }
  ctx.stroke(region);

}

let model, model_face;

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (location.protocol === 'http:') {
      alert('Camera and Mic are not available vis http connection.')
    } else {
      alert('Cannot find your camera / mic.')
    }
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  const stream = await navigator.mediaDevices.getUserMedia({
      'audio': true,
      'video': {
        facingMode: 'user',
        // Only setting the video to a specified size in order to accommodate a
        // point cloud, so on mobile devices accept the default size.
        width: mobile ? undefined : VIDEO_WIDTH,
        height: mobile ? undefined : VIDEO_HEIGHT
      }
    },
       // errorCallback
   function(err) {

    if(err === PERMISSION_DENIED) {
      // Explain why you need permission and how to update the permission setting
    }
   }
  )
  .then(function(stream) {
    var videoTracks = stream.getVideoTracks();
    console.log('Using video device: ' + videoTracks[0].label);
    const state = videoTracks.readyState

    stream.onremovetrack = function() {
      console.log('Stream ended');
    };
    return stream;
  })
  .catch((error)=>{console.log("stream ", error)});
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera()


  video.play();

  
  return video;
}

function trans2D (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].pop(2);
  }
  return array;
}

const mlFaceHand = async () => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    let notification = new Notification("Hi there!");
    // console.log("already graneted")
  }

  else if (Notification.permission !== "granted") {
    console.log("in deny loop")
    const handlePermission = (permission) => {
      // console.log("permission in loop", permission)
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        let notification = new Notification("Hi there!");
      } 
      else {
        let info = document.getElementById('info');
        info.textContent = 'notification access needed to notify you even you leave this website. For firefox users, checkout meesage icon in address bar';
        info.style.display = 'block';
      }
    }

    try {
      Notification.requestPermission()
            .then(handlePermission)                                                                                                                                               
    } catch (error) {
        // Safari doesn't return a promise for requestPermissions and it                                                                                                                                       
        // throws a TypeError. It takes a callback as the first argument                                                                                                                                       
        // instead.
        if (error instanceof TypeError) {
            Notification.requestPermission(handlePermission);
        } else {
            throw error;                                                                                                                                                                                       
        }                                                                                                                                                                                                      
    } 

  }




  const faceModelPromise = facemesh.load({maxFaces: 1});
  //const videoPromise =  loadVideo().catch(() => );
  const values = await Promise.all([faceModelPromise]);
  model_face = values[0];
  //let video = values[1];
  //landmarksRealTime(video);

 
  //model = await handpose.load({detectionConfidence: 0.9});
  //model_face = await facemesh.load({maxFaces: 1});

  let video;
  try {
    video = await loadVideo();
  } catch (e) {
    info = document.getElementById('info');
    info.textContent = 'camera access needed to know whether you touch your face. Please grant';
    info.style.display = 'block';
    throw e;
  }
  landmarksRealTime(video);

  model = await handpose.load({detectionConfidence: 0.9});

}



const landmarksRealTime = async (video) => {
  setupDatGui();

  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;

  const canvas = document.getElementById('output');


  canvas.width = videoWidth;
  canvas.height = videoHeight;

  const ctx = canvas.getContext('2d');

  video.width = videoWidth;
  video.height = videoHeight;

  ctx.clearRect(0, 0, videoWidth, videoHeight);
  ctx.strokeStyle = "#32EEDB";
  ctx.fillStyle = "#32EEDB";
  ctx.lineWidth = 0.5;

  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  
  let cli_id

  if (localStorage.hasOwnProperty("clientId")) {
    cli_id = localStorage.getItem("clientId")
  }
  else {
    cli_id = uuidv4();
    localStorage.setItem("clientId", cli_id) // here someid from your google analytics fetch
  }
  // console.log("client id is", cli_id)


  // These anchor points allow the hand pointcloud to resize according to its
  // position in the input.
  const ANCHOR_POINTS = [[0, 0, 0], [0, -VIDEO_HEIGHT, 0],
  [-VIDEO_WIDTH, 0, 0], [-VIDEO_WIDTH, -VIDEO_HEIGHT, 0]];
  var classifyPoint = require("robust-point-in-polygon");
  let draw = true;

  setTimeout(() => {
    draw = false;
    state.lowSpeedMode = true;
  }, 30000);



  async function frameLandmarks() {
    stats.begin();
    let finger_points = [];
    // ctx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0 ) {
      let boundingBoxW= predictions[0].boundingBox.bottomRight[1] - predictions[0].boundingBox.topLeft[1];
      const annotation = predictions[0].annotations;
      const index = (annotation.indexFinger[0][1] > annotation.indexFinger[1][1]) &&
                      (annotation.indexFinger[2][1] > annotation.indexFinger[1][1]);
      const middle = (annotation.middleFinger[0][1] > annotation.middleFinger[1][1]) &&
                (annotation.middleFinger[2][1] > annotation.middleFinger[1][1]);      
      const ring = (annotation.ringFinger[0][1] > annotation.ringFinger[1][1]) &&
                      (annotation.ringFinger[2][1] > annotation.ringFinger[1][1]);
      const wrongCase = (index && middle && ring);

      if (!wrongCase) {
        const result = predictions[0].landmarks;
        if (draw) {
          const drawp = () => {
            drawKeypoints(ctx, result, predictions[0].annotations);
          };
          requestAnimationFrame(drawp);
        }
        
        // console.log("annotaions_hand", predictions[0].annotations)
        var finger_tips = predictions[0].annotations.indexFinger.slice(2,4).concat(
          predictions[0].annotations.middleFinger.slice(2,4),
          predictions[0].annotations.ringFinger.slice(2,4),
          predictions[0].annotations.pinky.slice(2,4)
        )
        finger_points = trans2D(finger_tips);

        // console.log("finger_tips", finger_points)

      }
      if (state.lowSpeedMode){
        await delay(1500);
      } 

    }

    stats.end();
    //requestAnimationFrame(frameLandmarks);
    return finger_points;
  };




  async function frameLandmarksFace() {
    let polygon_lips, polygon_eye, polygon_nose;
    let polygon_all = {};
    stats.begin();
    const predictions_face = await model_face.estimateFaces(video);


    ctx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);
    console.log("image capture", canvas.toDataURL('image/png'))

    var videoTracks = video.srcObject.getVideoTracks();
    const videoTrackState = videoTracks.readyState
    console.log("VideoTrack state ", videoTracks)
    if (predictions_face.length > 0) {
      predictions_face.forEach(prediction => {
        const keypoints = prediction.scaledMesh;
        var polygon_lips_upper = trans2D(prediction.annotations.lipsUpperOuter)
        var polygon_lips_lower = trans2D(prediction.annotations.lipsLowerOuter.slice(0,9))
        polygon_lips = polygon_lips_upper.concat(polygon_lips_lower, prediction.annotations.lipsLowerOuter.slice(9,10))
        var polygon_eye_3d = prediction.annotations.rightEyeUpper2.concat(
          prediction.annotations.rightEyeLower3,
          prediction.annotations.leftEyeLower3,
          prediction.annotations.leftEyeUpper2
        )
        polygon_eye = trans2D(polygon_eye_3d)
        const indexArray = [6, 122, 188, 114, 47, 100, 142, 129, 98, 97, 2, 326, 327, 356, 358, 371, 329, 277, 343, 412, 351]
        var polygonNose3d = prediction.scaledMesh.filter((item, index)=> {
          return indexArray.includes(index)
        })
        polygon_nose = trans2D(polygonNose3d)

        polygon_all = {
          polygonLips : polygon_lips || [],
          polygonEye  : polygon_eye || [],
          polygonNose : polygon_nose || []
        }
        if (draw) {
          requestAnimationFrame(() => {
            if (state.triangulateMesh) {
              for (let i = 0; i < TRIANGULATION.length / 3; i++) {
                const points = [
                  TRIANGULATION[i * 3], TRIANGULATION[i * 3 + 1],
                  TRIANGULATION[i * 3 + 2]
                ].map(index => keypoints[index]);

                drawPath(ctx, points, true);
              }
            } else {
              for (let i = 0; i < keypoints.length; i++) {
                const x = keypoints[i][0];
                const y = keypoints[i][1];

                ctx.beginPath();
                ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
                ctx.fill();
              }
            }
          });
        }

      });
      if (state.lowSpeedMode){
        await delay(1500);
      } 
    }
    
    //requestAnimationFrame(frameLandmarksFace);
    stats.end();
    // console.log("return polygon", polygon_all)
    return polygon_all
  }

  let notifyAllow = true;
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function drawAttention(){
    ctx.fillStyle = "#32EEDB";
    ctx.fillRect(25, 35, 60, 80);
    ctx.textBaseline = "top";
    ctx.fillStyle = '#FF0000';
    ctx.font = "60px Arial";
    ctx.fillText("on", 35, 40);
    ctx.fillStyle = "#32EEDB";
  }


  async function monitorFaceTouch() {
    const facePromise = model_face ? frameLandmarksFace() : Promise.resolve([]);
    const fingerPromise = model ? frameLandmarks() : Promise.resolve([]);
    const minDelay = delay(30);
    const values = await Promise.all([facePromise, fingerPromise, minDelay]);
    // console.log("monitor running")
    if (Object.keys(values && values[0] && values[0]).length === 0 && values[0].constructor === Object) {
      // console.log("no polygon_all returned")
    } else {
      const polygon_lips = values[0].polygonLips
      const polygon_eye = values[0].polygonEye
      const polygon_nose = values[0].polygonNose
      const finger_points = values[1]
      const lipsCnt = (polygon_lips || []).length;
      const eyeCnt = (polygon_eye || []).length;
      const noseCnt = (polygon_nose || []).length;
      const fingerCnt = (finger_points || []).length;
      let noseNumber, lipNumber, eyeNumber

      

      let fingerTouchNose = false;
      if(noseCnt > 0 && fingerCnt > 0) {
        for (let i=0; i< fingerCnt; i++) {
          if (classifyPoint(polygon_nose, finger_points[i]) == -1) {
            fingerTouchNose = true;
          }
        }
        // console.log("fingerTouchNose", fingerTouchNose, "notifyAllow", notifyAllow)
        if ( (fingerTouchNose == true) && notifyAllow == true ) {

          push.create("You just touched your nose!", {
              body: "Don't touch your face to avoid COVID-19",
              timeout: 4000,
              onClick: function () {
                  window.focus();
                  this.close();
              }
          });
          // console.log("touched nose")
          drawAttention();
          analytics.track('TouchNose', {
            category: 'Notification',
            label: cli_id,
            value: 42
          })

          notifyAllow = false;
          setTimeout(function() {
            notifyAllow = true;
          }, 1000); 
        }
      }

      let fingerTouchFace = false;
      if(lipsCnt > 0 && fingerCnt > 0) {
        for (let i=0; i< fingerCnt; i++) {
          if (classifyPoint(polygon_lips, finger_points[i]) == -1) {
            fingerTouchFace = true;
          }
        }
        if ( (fingerTouchFace == true) && notifyAllow == true ) {
          push.create("You just touched your mouth!", {
              body: "Don't touch your face to avoid COVID-19",
              timeout: 4000,
              onClick: function () {
                  window.focus();
                  this.close();
              }
          });
          // console.log("touched mouth")
          drawAttention();
          analytics.track('TouchMouth', {
            category: 'Notification',
            label: cli_id,
            value: 41
          })
          notifyAllow = false;
          setTimeout(function() {
            notifyAllow = true;
          }, 1000); 
        }
      }
      let fingerTouchEye = false;
      if(eyeCnt > 0 && fingerCnt > 0) {
        for (let i=0; i< fingerCnt; i++) {
          if (classifyPoint(polygon_eye, finger_points[i]) == -1) {
            fingerTouchEye = true;
          }
        }
        if ( (fingerTouchEye == true) && notifyAllow == true ) {
          push.create("You just touched your eye!", {
              body: "Don't touch your face to avoid COVID-19",
              icon: './virus.png',
              timeout: 4000,
              onClick: function () {
                  window.focus();
                  this.close();
              }
          });
          drawAttention();
          analytics.track('TouchEye', {
            category: 'Notification',
            label: cli_id,
            value: 41
          })
          notifyAllow = false;
          setTimeout(function() {
            notifyAllow = true;
          }, 1000); 
        }
      }
    }

    monitorFaceTouch();
    //requestAnimationFrame(monitorFaceTouch);
  }
  

  monitorFaceTouch()

};

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// main();
export default mlFaceHand;

