<template>
  <div id="main">
    <div class="container">
      <div class="canvas-wrapper">
        <canvas id="output"></canvas>
        <video id="video" playsinline style="
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          visibility: hidden;
          width: auto;
          height: auto;
          ">
        </video>
      </div>
      <div id="scatter-gl-container"></div>
    </div>
  </div>
</template>

<script>
import {version} from '@tensorflow/tfjs-backend-wasm/dist/version'
import {TRIANGULATION} from './triangulation'
import facemeshMain from './facemesh_index'
import handPoseMain from './hand_index'
import Vue from 'vue'
export default {
  created () {

    this.openCamera();
  },
  methods: {
    openCamera () {
      console.log('executing 3', facemeshMain)
      facemeshMain();
    } 
  }
}
</script>

<style>
  .canvas-wrapper, #scatter-gl-container {
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