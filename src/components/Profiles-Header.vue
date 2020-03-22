<template>
  <header id="header" class="flex">
    <h1>
      <a href="/">Chatroulette</a>
    </h1>
    <div class="header">
      <ul class="control">
        <li>
          <button class="button-sm" @click="onChat" >Free Chat</button>
        </li>
        <li>
          <button class="button-sm" @click="onMain">Main Page</button>
        </li>
        <li>
          <button class="button-sm" @click="onProfile">All Girls</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app-header',

  computed: mapState(['localStream', 'connectionState']),

  methods: {
    ...mapMutations(['createPeerConnection', 'closePeerConnection', 'addLocalStream', 'removeLocalStream']),
    ...mapActions(['getUserMedia', 'hangUpCall']),
    onChat () {
      this.$router.push(`/chatroom`)
    },
    onMain () {
      this.$router.push(`/service`)
    },
    onProfile () {
      this.$router.push(`/profiles`)
    },
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
    }
  }
}
</script>

<style lang="less">
#header {
  height: 60px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0,0,0,0.075);
  justify-content: space-between;
  align-items: center;

  h1 {
    margin-left: 10px;
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
}
</style>
