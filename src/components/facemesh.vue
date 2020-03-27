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
    /*
    Vue.loadScript("https://cdn.jsdelivr.net/npm/three@0.106.2/build/three.min.js")
    Vue.loadScript("https://cdn.jsdelivr.net/npm/scatter-gl@0.0.1/lib/scatter-gl.min.js")
    Vue.loadScript("https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js")
    */

    /*
    console.log('executing 1')
    const allScripts = [
      "https://cdn.jsdelivr.net/npm/three@0.106.2/build/three.min.js",
      "https://cdn.jsdelivr.net/npm/scatter-gl@0.0.1/lib/scatter-gl.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js",
    ];
    const allPromises = [];
    for (let i = 0; i < allScripts.length; i++) {
      const p = Vue.loadScript(allScripts[i]);
      allPromises.push(p);
    }
    Promise.all(allPromises).then((values) => {
      this.openCamera();
    });
    */

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