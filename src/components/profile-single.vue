<template lang="pug">
  b-card(:img-src="person.photo", img-alt="Image", img-top, tag="article" style="max-width: 30rem;" class="mb-2")
    div(class="d-flex justify-content-between")
      h4(class="inline-block") {{person.name}}
      b-button(href="#" variant="info") {{person.type}}
    audio(controls)
      source(:src="person.audio", type="audio/mpeg")
    b-card-text {{person.attribute}}
    b-card-text {{person.talent}}
    b-card-text {{person.hobby}}
    b-card-text {{person.recommendation}}
    b-card-text {{person.outlooking}}
    b-button(href="#" variant="primary" @click="onChat") Voice Chat
</template>

<script>
export default {
  props: ['person'],
  methods: {
    onChat () {
      this.$ga.event('Profile', 'chooseVlogger')
      this.$router.push(`/chat_vlogger`)
    }
  }
}
</script>

<style lang="less" scoped>
main {
  margin: 2em auto;
  max-width: 1200px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 3em 1em;
}

h2 {
  text-align: center;
  margin: 2em;
}

img {
  width: 350px;
  height: 420px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

audio {
  display: block;
  width: 250px;
  height: 30px;
  margin: 1em auto;
}
</style>
