<template>
  <transition-group tag="ul" id="messages" name="messages" @enter="enter">
    <li key="open" v-if="connectionState === 'open'" class="system message">
      <p class="text">
        <span class="tip"><i class="fas fa-check"></i></span>
        Just say hello to each other :D
      </p>
    </li>

    <li key="connecting" v-if="connectionState === 'connecting'" class="system message">
      <p class="text">
        <span class="tip"><i class="fas fa-spinner fa-spin"></i></span>
        Life is like a non-stop roulette. You never know who you will meet next...
        <button class="button-sm" @click="next" :disabled="connectionState !== 'open'">New chat</button>
      </p>
    </li>

    <li v-for="(message, index) of messages" :key="`${index}`" :class="message.role" class="message">
      <p class="text"><span class="tip" v-html="message.html"></span>{{message.text}}</p>
    </li>
<!--     <button v-if="showbutton"></button> -->
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'messages',

  computed: mapState(['messages', 'connectionState']),

  // watch:{
  //   connectionState(newvalue, oldvalue){
  //     if(newvalue === 'connecting'){
  //       this.showbutton = true
  //     }
  //   }
  // }
  methods: {
    enter (el) {
      el.scrollIntoView({ block: 'end', behavior: 'auto' })
    }
  }
}
</script>

<style lang="less">
#messages {
  padding: 20px;
  flex: 1 1 100%;
  overflow-y: auto;
  position: relative;

  .messages-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .messages-move {
    transition: all 0.5s;
  }

  .message {
    border-radius: 5px;
    padding: 10px;
    clear: both;
    max-width: 70%;
    list-style-type: none;
    margin: 10px 0;
    transition: all 0.5s;
  }

  .text {
    margin: 0;
    line-height: 1.5;
  }

  .system {
    .tip {
      margin-right: 10px;
    }
  }

  .you {
    float: right;
    background-color: lawnGreen;
    position: relative;

    .text::after {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid lawnGreen;
      position: absolute;
      top: 0;
      right: -10px;
      border-color: lawnGreen transparent transparent transparent;
    }
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
  .partner {
    float: left;
    background-color: whiteSmoke;
    position: relative;

    .text::before {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid lawnGreen;
      position: absolute;
      top: 0;
      left: -10px;
      border-color: whiteSmoke transparent transparent transparent;
    }
  }
}
</style>
