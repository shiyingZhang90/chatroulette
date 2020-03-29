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
      <h3 class = "body">Coavoid uses AI to warn you whenever you touch your eyes, nose and mouth</h3>
    </div>
    <div class="notice">
      <h3 class = "body">Please open this website in a new browser window to keep this tab alive</h3>
    </div>  
  </div>
  <div id="scatter-gl-container"></div>
  <div class="embed-responsive embed-responsive-16by9 w-50 mx-auto">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/BtulL3oArQw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>  
</template>

<script>
import mlFaceHand from './mlFaceHand'
import Vue from 'vue'
export default {
  created () {
    // this.$worker.run((args) => {
    //   {args};
    //   return `Hello!`
    // }, [this.openCamera()])
    // .then(result => {
    //   console.log(result)
    // })
    // .catch(e => {
    //   console.error(e)
    // })
    this.openCamera();
  },
  methods: {
    openCamera () {
      mlFaceHand();
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