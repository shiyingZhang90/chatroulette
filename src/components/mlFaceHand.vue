<template>
<div>  
  <b-navbar toggleable="lg" type="dark" variant="info" class = "header">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" class = "logo">Magic Coavoid</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <div id="predictions"></div>
  <div id="canvas-wrapper">
    <canvas id="output" style=""></canvas>
    <video id="video" playsinline style="
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    visibility: hidden;
    width: auto;
    height: auto;
    position: absolute;
    ">
    </video>
    <div class="explanation">
      <h1 class = "title">Magic Coavoid</h1>
      <h3 class = "body">The CDC lists "avoid touching your eyes, nose, and mouse" as critical measure to avoid COVID-19.</h3>
      <h3 class = "body">Coavoid uses AI to send you notification whenever you touch your eyes, nose and mouth</h3>
    </div>
    <div class="notice">
      <h3 class = "body">Toggle lowSpeedMode on top right to run it silent mode. Add it to default open tab so you will always get protected</h3>
    </div>  
  </div>
  <div id="scatter-gl-container"></div>
  <div class="embed-responsive embed-responsive-16by9 w-50 mx-auto">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/BtulL3oArQw?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen autoplay="1"></iframe>
  </div>
</div>  
</template>

<script>
import mlFaceHand from './mlFaceHand'
// import tryRecursion from './mlFaceHand'
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
    // let data 
    // this.worker.postMessage('pull-data', [data])
    //   .then(res => console.log(res)) 
  },
  destroyed() {
    this.worker = null
  },
  created () {
    // let cnt = 0;
    // setInterval(function(){ console.log("Hello ", cnt++); }, 1000);

    // const hello = () => {
    //   console.log('shsh hello')
    // };

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
  #output {
    float:left;
  }

  /* center the canvas within its wrapper */
  #scatter-gl-container canvas {
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    top: 50%;
    position: absolute;
  }
  .explanation {
    overflow: hidden;
    margin-left: 780px;
    margin-top: 60px;
    background-color: lightblue;
    color: white;
    margin-right: 20px;
  }
  .notice {
    margin-left: 780px;
    margin-top: 30px;
    background-color: lightpink;
    color: white;
    margin-right: 20px;
  }
  .title {
    font-size: 50px;
    margin: 20px;
  }
  .header {
    height: 160px;
  }
  .body {
    margin-top:  20px;
    margin-bottom: 20px;
    margin-right: 30px;
    margin: 20px;
  }
  .logo {
    font-size: 80px;
    margin-left: 150px;
    color: "white";
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
  .iframe iframe {
    width : 1000px;
    height: 1000px;
    display: inline-block;
  }
  .control {
    li {
      display: inline-block;
      margin-right: 30px;
    }
  }
  .header {
    margin-right: 10px;
  }

</style>