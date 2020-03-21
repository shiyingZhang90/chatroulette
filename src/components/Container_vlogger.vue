<template>
  <div id="container" class="flex">
    <container-profile></container-profile>
    <container-room></container-room>
    <container-list></container-list>
  </div>
</template>

<script>
import ContainerProfile from './Profile'
import ContainerRoom from './Room'
import ContainerList from './ChatHead'

export default {
  name: 'container',
  components: {
    ContainerProfile,
    ContainerRoom,
    ContainerList
  }
}
</script>

<style lang="less">
#container {
  height: calc(100% - 61px);
}
</style>
