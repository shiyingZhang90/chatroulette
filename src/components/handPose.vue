<template>
<div>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0, user-scalable=no">
  <div id="info" style='display:none'></div>
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
  </div>
  <div id="scatter-gl-container"></div>
</div>  
</template>

<script>
import handPoseMain from './hand_index'
import Vue from 'vue'
export default {
  created () {
    this.openCamera();
  },
  methods: {
    openCamera () {
      handPoseMain();
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
  }

  #scatter-gl-container {
    border: solid 1px black;
    position: relative;
  }

  /* center the canvas within its wrapper */
  #scatter-gl-container canvas {
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    top: 50%;
    position: absolute;
  }
  #header {
    height: 60px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 2px rgba(0,0,0,0.075);
    justify-content: space-between;
    align-items: center;
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