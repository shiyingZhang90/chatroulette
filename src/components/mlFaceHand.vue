<template>
<div class="container-fluid">
  <div class="header m-0 py-3">
    <div class="container">
      <h1 class="logo ml-2">CoAvoid</h1>
    </div>
  </div>
  <div id="predictions"></div>
  <div class="container px-0 my-4">
    <div class="row">
      <div class="col-lg">
        <div class="h-100 d-flex align-items-center">
          <div class = "text-body">
            <div class="explanation p-2">
              <h1 >Magic Coavoid</h1>
              <h3 class = "body">The CDC lists "avoid touching your eyes, nose, and mouse" as critical measure to avoid COVID-19.</h3>
              <h3 class = "body">Coavoid uses AI to send you notification whenever you touch your eyes, nose and mouth</h3>
            </div>
            <div class="notice">
              <h3 class = "body">Please grant access to notification and camera so you will be protected. All data is processed locally on your computer and not sent to the Internet.</h3>
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
          <h5 class="notice text-center"> FaceMesh take time to load, be patient. If no notification, you will see "no" pop up in below video</h5>
          <div class="embed-responsive embed-responsive-4by3">
            <canvas id="output" class="output embed-responsive-item"></canvas>
            <video id="video" playsinline class="video"/>
          </div>
        </div>
      </div>
    </div>
    <div class="embed-responsive embed-responsive-16by9 mx-auto my-3">
      <iframe class="embed-responsive-item" src="https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/coronavirus-facts-infographic" allowfullscreen ></iframe>
    </div>
  </div>

</div>  
</template>

<script>
import mlFaceHand from './mlFaceHand'
import Vue from 'vue'
import Push from 'push.js';
export default {
  name: 'worker-test', 
  // data() {
  //   return {
  //     worker: null,
  //   }
  // },
  mounted() {
    this.$ga.page({
      page: '/',
      title: 'CoAvoid',
      location: window.location.href
    })
    // let data 
    // this.worker.postMessage('pull-data', [data])
    //   .then(res => console.log(res)) 
  },
  destroyed() {
    this.worker = null
  },
  created () {

    // this.$worker.run((args) => {
    //   {args}
    //   // const funcStr = args[0];
    //   // //var argName = funcStr.substring(funcStr.indexOf("(") + 1, funcStr.indexOf(")"));
    //   // //funcStr = funcStr.substring(funcStr.indexOf("{") + 1, funcStr.lastIndexOf("}"));
    //   // const f = new Function('', funcStr);

    //   return `Hello!`
    // }, [this.hello])
    // .then(result => {
    //   console.log(result)
    // })
    // .catch(e => {
    //   console.error(e)
    // })
    // this.worker = this.$worker.create([
    //   {
    //     message: 'pull-data',
    //     func(data) {
    //       for(var i=0; i<1000; i++) {
    //         data++;
    //         return i
    //       }
    //     }
    //   }
    // ]),
    this.openCamera();
  },
  methods: {
    openCamera () {
      mlFaceHand();
      // tryRecursion();
    } 
  }
}
</script>

<style>
  #canvas-wrapper {
    position: relative;
  }
  #canvas-wrapper, #scatter-gl-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 40px;
    margin-top: 20px;
    overflow: hidden;
  }

  #scatter-gl-container {
    position: relative;
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
  .output {
    z-index: 100;
    position: absolute;
    display: inline-block;
  }

  /* center the canvas within its wrapper */
  #scatter-gl-container canvas {
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    top: 50%;
    position: absolute;
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