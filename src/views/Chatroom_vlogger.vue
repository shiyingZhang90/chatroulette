<template>
  <div id="chatroom">
    <app-header></app-header>
    <app-container></app-container>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import AppContainer from '../components/Container_vlogger'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppContainer
  }
}
</script>

<style lang="less">
@import "~@fortawesome/fontawesome-free/less/fontawesome.less";
@import "~@fortawesome/fontawesome-free/less/solid.less";

html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #333;
  background-color: #fff;
}

ul, h1, h2 {
  margin: 0;
  padding: 0;
}


#chatroom {
  height: 100%;
  overflow: hidden;
  position: relative;


  ul, h1, h2 {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    height: 100%;
    border: none;
    font-size: 1rem;
    outline: none;
    cursor: pointer;

    &:hover {
      color: #333;
    }

    &:active {
      color: #000;
    }
  }

  .flex {
    display: flex;
  }
}
</style>
