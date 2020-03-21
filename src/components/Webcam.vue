<template>
  <aside id="webcam">
    <div style='text-align:center' class="partner">
      <h2><toggle-button
        :value="true"
        :width="120"
        :height="40"
        :speed="480"
        :font-size="25"
        :margin="5"
        v-model="hodor"
        :color="{checked: '#BE3D62', unchecked: '#FF877B'}"
        :labels="{checked: 'Stop', unchecked: 'Video'}"
        @change="video($event.value)"
        :disabled="connectionState !== 'open'">Video</toggle-button></h2>
      <!-- <video autoplay ref="remote" @loadedmetadata="loaded"></video> -->
      <video class="video2" autoplay ref="remote"></video>
    </div>
    <div style='text-align:center' class="you">
      <h2>You</h2>
      <!-- <video autoplay muted ref="local" @loadedmetadata="loaded"></video> -->
      <video class="video1" autoplay muted ref="local"></video>
    </div>
  </aside>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ToggleButton from 'vue-js-toggle-button'
import Vue from 'vue'
Vue.use(ToggleButton)
// const start = () => {
//   this.createPeerConnection();
//   this.getUserMedia();
// };

export default {
  name: 'webcam',

  computed: mapState(['localStream', 'remoteStream', 'connectionState']),

  watch: {
    remoteStream (stream) {
      this.$refs.remote.srcObject = stream
    },
    localStream (stream) {
      this.$refs.local.srcObject = stream
    }
  },

  methods: {
    ...mapMutations(['createPeerConnection', 'closePeerConnection', 'addLocalStream', 'removeLocalStream']),
    ...mapActions(['getUserMedia', 'hangUpCall']),
    start () {
      this.createPeerConnection()
      this.getUserMedia()
    },
    next () {
      this.closePeerConnection()
      this.hangUpCall()
      this.createPeerConnection()
      this.addLocalStream(this.localStream)
    },

    stop () {
      this.closePeerConnection()
      this.hangUpCall()
      this.removeLocalStream()
    },
    video: function (state) {
      if (state === true) {
        this.addLocalStream(this.localStream)
      } else {
        this.removeLocalStream()
      }
    }
    // loaded (event) {
    //   event.currentTarget.play()
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#webcam {
  min-width: 840px;
  border-right: 10px solid #ddd;
  overflow: auto;
  padding: 10px;

  .partner, .you {
    margin-bottom: 15px;
  }

  h2 {
    color: #767676;
    font-size: 0.8rem;
    margin-bottom: 5px;
  }

  .video1 {
    width: 520px;
    max-width: 100%;
    background-color: #333;
    box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  .video2 {
    width: 840px;
    max-width: 100%;
    background-color: #333;
    box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  .button-video {
    background-color: #74A5FA;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 30px;
    margin: 4px 2px;
    border-radius: 20px;
  }

}
</style>
