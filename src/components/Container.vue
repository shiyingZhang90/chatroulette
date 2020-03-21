<template>
  <div id="container" class="flex">
    <container-webcam></container-webcam>
    <container-room></container-room>
    <container-list></container-list>
  </div>
</template>

<script>
import ContainerWebcam from './Webcam'
import ContainerRoom from './Room'
import ContainerList from './ChatHead'

export default {
  name: 'container',
  components: {
    ContainerWebcam,
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
