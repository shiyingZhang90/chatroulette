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

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

}
</style>
