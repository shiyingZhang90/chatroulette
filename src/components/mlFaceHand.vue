<template>
<div class="container-fluid" style="height:100%">
  <div class="header m-0 py-3">
    <div class="container">
      <h1 class="logo ml-2">Co-Avoid.com</h1>
      <h5 id="info" class="notice"></h5>
    </div>
  </div>
  <div id="predictions"></div>
  <div class="container px-0 my-4" style="height:100%">
    <div class="row">
      <div class="col-lg">
        <div class="h-100 d-flex align-items-center">
          <div class = "text-body">
            <div class="notice">
              <h3 class = "body"> All data is processed locally on your computer and not sent to the Internet.Feel free to minimize this tab to run in background.</h3>
            </div>
            <div class="explanation p-2">
              <h1 >Magic Co-avoid</h1>
              <h3 class = "body">The CDC lists "avoid touching your eyes, nose, and mouse" as critical measure to avoid COVID-19.</h3>
              <h3 class = "body">Coavoid uses AI to send you notification whenever you touch your eyes, nose and mouth</h3>
            </div> 
          </div> 
        </div>
      </div>
      <div class = "footer explanation mx-3">
        <h4 >co-avoid.com</h4>
        <h6>Please open co-avoid.com on laptop. Mobile not supported yet but we are working on it</h6>
      </div>
      <div class="col-lg">
        <div class="mt-3">
          <h5 class="notice text-center"> FaceMesh take time to load, be patient. Try touch your nose</h5>
<!--           <div class="embed-responsive embed-responsive-4by3"> -->
          <div id="bm" v-show="animationVisible" class="animation"> </div>
          <canvas id="output" v-show="elementVisible" class="output embed-responsive-item"></canvas>
          <video id="video" playsinline autoplay class="video"/>
        </div>
      </div>
    </div>
    <div class="cards">
      <li class="cards__item">
        <div v-on:click="mlFaceConfigue.newAnimation = animationJson['14354-busy']" id="14354-busy" class="card "></div>
        <div v-on:click="mlFaceConfigue.newAnimation = animationJson['19083-elephant']" id="19083-elephant" class="card"></div>
        <div v-on:click="mlFaceConfigue.newAnimation = animationJson['17745-viroses']" id="17745-viroses" class="card "></div>
      </li>
    </div>
    <div class="cards">
      <li class="cards__item">
        <div v-on:click="mlFaceConfigue.newAnimation = animationJson['18761-expresso']" id="18761-expresso" class="card "></div>
        <div v-on:click="mlFaceConfigue.newAnimation = animationJson['15156-yoga-pose']" id="15156-yoga-pose" class="card"></div>
        <div v-on:click="mlFaceConfigue.newAnimation = animationJson['17686-wash-hand']" id="17686-wash-hand" class="card"></div>
      </li>
    </div>
  </div>
</div>  
</template>

<script>
import mlFace from './mlFaceHand'
import Vue from 'vue'
import Push from 'push.js';
import lottie from 'lottie-web';
import elephantAsset from '../assets/lottie/19083-elephant-jumping.json';
import expressoAsset from '../assets/lottie/18761-expresso.json';
import yogaAsset from '../assets/lottie/15156-yoga-pose.json';
import virusAsset from '../assets/lottie/17745-viroses.json';
import wfhAsset from '../assets/lottie/14354-busy.json';
import handAsset from '../assets/lottie/17686-wash-your-hands-regularly.json';


const _ANIMATION_JSON = { 
  '14354-busy': { id: '14354-busy', data: wfhAsset, animationLeft: 530, animationTop: 150, animationKeypoint: 10 },
  '19083-elephant': { id: '19083-elephant', data: elephantAsset, animationLeft: 520, animationTop: 150, animationKeypoint: 10  },
  '17745-viroses': { id: '17745-viroses', data: virusAsset, animationLeft: 520, animationTop: 110, animationKeypoint: 152  },
  '18761-expresso': { id: '18761-expresso', data: expressoAsset, animationLeft: 520, animationTop: 0, animationKeypoint: 14  },
  '15156-yoga-pose': { id: '15156-yoga-pose', data: yogaAsset, animationLeft: 520, animationTop: 150, animationKeypoint: 10  },
  '17686-wash-hand': { id: '17686-wash-hand', data: handAsset, animationLeft: 520, animationTop: 20, animationKeypoint: 152  },
};


export default {
  name: 'worker-test', 
    data() {
      return {
        elementVisible: false,
        animationVisible: false,
        feedback: '',
        counter: 0,
        mlFaceConfigue: mlFace.configue,
        animationJson: _ANIMATION_JSON
      }
    },
  destroyed() {
    this.worker = null
  },
  mounted () {
    lottie.loadAnimation({
      container: document.getElementById('14354-busy'), // Required
      animationData: wfhAsset,
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      progressiveLoad: true,
    })
    lottie.loadAnimation({
      container: document.getElementById('19083-elephant'), // Required
      animationData: elephantAsset,
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      progressiveLoad: true,
    })
    lottie.loadAnimation({
      container: document.getElementById('17745-viroses'), // Required
      animationData: virusAsset,
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      progressiveLoad: true,
    })
    lottie.loadAnimation({
      container: document.getElementById('18761-expresso'), // Required
      animationData: expressoAsset,
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      progressiveLoad: true,
    })
    lottie.loadAnimation({
      container: document.getElementById('15156-yoga-pose'), // Required
      animationData: yogaAsset,
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      progressiveLoad: true,
    })
    lottie.loadAnimation({
      container: document.getElementById('17686-wash-hand'), // Required
      animationData: handAsset,
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      progressiveLoad: true,
    })
    this.$ga.page({
      page: '/',
      title: 'CoAvoid',
      location: window.location.href
    })
    this.$ga.time({
      timingCategory: 'userTiming',
      timingVar: Math.ceil(Math.random()*10),
      timingValue: 20,
      timingLabel: 'label'
    })
    setTimeout(() => this.animationVisible = true, 10000);
    setTimeout(() => this.elementVisible = true, 10000);
    setTimeout(() => this.elementVisible = false, 35000);
    this.openCamera();
  },
  methods: {
    openCamera () {
      mlFace.mlFaceHand();
      // tryRecursion();
    },
    feedbackSubmit () {
      this.$ga.event({
        eventCategory: 'feedback',
        eventAction: this.feedback,
        eventLabel: 'vue submit',
        eventValue: 123
      })
    }
  }
}
</script>

<style>
  #canvas-wrapper {
    position: relative;
  }
  #canvas-wrapper {
    display: inline-block;
    vertical-align: top;
    margin-left: 40px;
    margin-top: 20px;
    overflow: hidden;
  }
  .cards {
     margin-top: 20px;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
  }
  .cards__item {
    display: flex;
    padding: 1rem;
    height: 300px;
  }
  
  .card {
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-right: 10px;
    margin-left: 10px;
    width:400px;
    cursor: pointer;
  }

  .canvas-container {
    margin-left: 15px;
    margin-right: 15px;
  }

  .video {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    display: inline-block;
/*    visibility: hidden;*/
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .animation {
    width: 40%;
    height: 40%;
    position: absolute;
    z-index: 100;
    display: inline-block;
  }
  .output {
    z-index: 50;
    position: absolute;
    display: inline-block;
  }


  .explanation {
    background-color: lightblue;
    color: white;
  }
  .notice {
    background-color: lightpink;
    color: white;
  }

  .header {
    text-align: left;
    background: #00CED1;
    color: white;
    font-size: 30px;
  }
  .body {
    margin-top:  20px;
    margin-bottom: 20px;
    margin-right: 30px;
    margin: 20px;
  }
  .button-sm {
    background-color: #96B9F8;
    color: white;
    padding: 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 30px;
    margin: 6px 10px;
    border-radius: 20px;
  }
  .iframe {
    display: inline-block;
  }
  .control {
    li {
      display: inline-block;
      margin-right: 30px;
    }
  }
  .logo {
    font-size: 250%;
    color: "white";
  }
  @media (max-width: 576px) {  
    .logo {
      font-size:1.5rem;
    } /*1rem = 16px*/
  }
   
  /* Small devices (landscape phones, 576px and up)*/
  @media (max-width: 767px) {  
    h1 {font-size:2rem;} /*1rem = 16px*/
    .logo {
      font-size:85%;
    } /*1rem = 16px*/
    .text-body {
      display: none;
    }

  }
   

  @media (min-width: 768px) { 
    h1 {font-size:2.5rem;} /*1rem = 16px*/
    .footer {
      display: none;
    }
  }
   


</style>