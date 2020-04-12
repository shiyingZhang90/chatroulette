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
    <div class="row" style="height:100%">
      <div class="col-lg">
        <div class="embed-responsive embed-responsive-16by9 mx-auto my-3" style="height:100%">
          <iframe class="embed-responsive-item" src="https://greatist.com/eat/10-minute-recipes#lunch" allowfullscreen ></iframe>
        </div>
      </div>
      <div class="col-lg">
        <div class="embed-responsive embed-responsive-16by9 mx-auto my-3" style="height:100%">
          <iframe class="embed-responsive-item" src="https://www.self.com/gallery/bodyweight-exercises-you-can-do-at-home" allowfullscreen ></iframe>
        </div>
      </div>
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
    data() {
      return {
        elementVisible: false,
        animationVisible: false,
        feedback: ''
      }
    },
  mounted() {
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
  },
  destroyed() {
    this.worker = null
  },
  mounted () {

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
    setTimeout(() => this.animationVisible = true, 10000);
    setTimeout(() => this.elementVisible = true, 10000);
    setTimeout(() => this.elementVisible = false, 35000);
    this.openCamera();
  },
  methods: {
    openCamera () {
      mlFaceHand();
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
    width: 30%;
    height: 30%;
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