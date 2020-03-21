<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import "~@fortawesome/fontawesome-free/less/fontawesome.less";
@import "~@fortawesome/fontawesome-free/less/solid.less";

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}

html {
  height: 100%;
}

body {
  margin: 0;
  height: 100% !important;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #333;
  background-color: #fff;
}

</style>
