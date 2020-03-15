<template>
  <div id="chatroom">
    <app-header></app-header>
    <app-container></app-container>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import AppContainer from '../components/Container'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppContainer
  }
}
</script>

<style lang="less">
#chatroom {
  height: 100%;
  overflow: hidden;
  position: relative;

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
    color: #767676;
    background-color: #fff;

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
