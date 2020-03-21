<template lang="pug">
main
  template(v-for="group in groups")
    .grid
      div(v-for="person in group" v-on:click="clickMethod" v-on:scroll.passive="handleScroll" class="swiper-slide d-flex align-items-center")
        vue-scroll-progress-bar @complete="handleComplete" height="2rem"
        img(:src="person.photo")
        span(class="ml-1")
          span(class="d-flex justify-content-between")
            span(class="m-0") {{person.name}}
            button(v-on:click="clickMethod" class="button-sm mr-1") chat
          audio(controls)
              source(:src="person.audio", type="audio/mpeg")
</template>

<script>
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'
import Vue from 'vue'
Vue.use(VueScrollProgressBar)
export default {
  data () {
    return {
      groups: []
    }
  },
  methods: {
    clickMethod () {
    // this.$router.push('home');
    },
    handleScroll: function (e) {
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    const map = new Map()
    for (const person of PROFILES) {
      if (!map.has(person.type)) {
        map.set(person.type, [])
      }
      map.get(person.type).push(person)
    }
    this.groups = Array.from(map.values())
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
const PROFILES = [
  { photo: require('@/assets/主播/御姐风/九叶.jpeg'), audio: require('@/assets/主播/御姐风/九叶.mp3'), type: '御姐风', name: '九叶' },
  { photo: require('@/assets/主播/御姐风/半梦.jpeg'), audio: require('@/assets/主播/御姐风/半梦.mp3'), type: '御姐风', name: '半梦' },
  { photo: require('@/assets/主播/御姐风/歪歪.jpeg'), audio: require('@/assets/主播/御姐风/歪歪.mp3'), type: '御姐风', name: '歪歪' },
  { photo: require('@/assets/主播/御姐风/门儿.jpeg'), audio: require('@/assets/主播/御姐风/门儿.mp3'), type: '御姐风', name: '门儿' },
  { photo: require('@/assets/主播/御姐风/风伶.jpeg'), audio: require('@/assets/主播/御姐风/风伶.mp3'), type: '御姐风', name: '风伶' },
  { photo: require('@/assets/主播/元气少女/Touma.jpeg'), audio: require('@/assets/主播/元气少女/Touma.mp3'), type: '元气少女', name: 'Touma' },
  { photo: require('@/assets/主播/元气少女/北北.jpeg'), audio: require('@/assets/主播/元气少女/北北.mp3'), type: '元气少女', name: '北北' },
  { photo: require('@/assets/主播/元气少女/千浔.jpeg'), audio: require('@/assets/主播/元气少女/千浔.mp3'), type: '元气少女', name: '千浔' },
  { photo: require('@/assets/主播/元气少女/月筝.jpeg'), audio: require('@/assets/主播/元气少女/月筝.mp3'), type: '元气少女', name: '月筝' },
  { photo: require('@/assets/主播/元气少女/江流.jpeg'), audio: require('@/assets/主播/元气少女/江流.mp3'), type: '元气少女', name: '江流' },
  { photo: require('@/assets/主播/元气少女/清冷.jpeg'), audio: require('@/assets/主播/元气少女/清冷.mp3'), type: '元气少女', name: '清冷' },
  { photo: require('@/assets/主播/元气少女/温火.jpeg'), audio: require('@/assets/主播/元气少女/温火.mp3'), type: '元气少女', name: '温火' },
  { photo: require('@/assets/主播/元气少女/炫炫.jpeg'), audio: require('@/assets/主播/元气少女/炫炫.mp3'), type: '元气少女', name: '炫炫' },
  { photo: require('@/assets/主播/元气少女/筱筱.jpeg'), audio: require('@/assets/主播/元气少女/筱筱.mp3'), type: '元气少女', name: '筱筱' },
  { photo: require('@/assets/主播/元气少女/雯陌.jpeg'), audio: require('@/assets/主播/元气少女/雯陌.mp3'), type: '元气少女', name: '雯陌' },
  { photo: require('@/assets/主播/元气少女/黑柒.jpeg'), audio: require('@/assets/主播/元气少女/黑柒.mp3'), type: '元气少女', name: '黑柒' },
  { photo: require('@/assets/主播/元气少女/六酒.png'), audio: require('@/assets/主播/元气少女/六酒.mp3'), type: '元气少女', name: '六酒' },
  { photo: require('@/assets/主播/元气少女/豆豆.png'), audio: require('@/assets/主播/元气少女/豆豆.mp3'), type: '元气少女', name: '豆豆' },
  { photo: require('@/assets/主播/元气少女/夏卿诺.jpeg'), audio: require('@/assets/主播/元气少女/夏卿诺.mp3'), type: '元气少女', name: '夏卿诺' },
  { photo: require('@/assets/主播/元气少女/特仑苏.jpeg'), audio: require('@/assets/主播/元气少女/特仑苏.mp3'), type: '元气少女', name: '特仑苏' },
  { photo: require('@/assets/主播/元气少女/颜泽汐.jpeg'), audio: require('@/assets/主播/元气少女/颜泽汐.mp3'), type: '元气少女', name: '颜泽汐' },
  { photo: require('@/assets/主播/元气少女/钱钱安.png'), audio: require('@/assets/主播/元气少女/钱钱安.mp3'), type: '元气少女', name: '钱钱安' },
  { photo: require('@/assets/主播/元气少女/胖子布莱尼.jpeg'), audio: require('@/assets/主播/元气少女/胖子布莱尼.mp3'), type: '元气少女', name: '胖子布莱尼' },
  { photo: require('@/assets/主播/可爱萝莉/奶包.jpeg'), audio: require('@/assets/主播/可爱萝莉/奶包.mp3'), type: '可爱萝莉', name: '奶包' },
  { photo: require('@/assets/主播/可爱萝莉/蠢蠢.jpeg'), audio: require('@/assets/主播/可爱萝莉/蠢蠢.mp3'), type: '可爱萝莉', name: '蠢蠢' },
  { photo: require('@/assets/主播/可爱萝莉/阿九.jpeg'), audio: require('@/assets/主播/可爱萝莉/阿九.mp3'), type: '可爱萝莉', name: '阿九' },
  { photo: require('@/assets/主播/可爱萝莉/雪鱼.jpeg'), audio: require('@/assets/主播/可爱萝莉/雪鱼.mp3'), type: '可爱萝莉', name: '雪鱼' },
  { photo: require('@/assets/主播/可爱萝莉/好梦.png'), audio: require('@/assets/主播/可爱萝莉/好梦.mp3'), type: '可爱萝莉', name: '好梦' }
]

</script>

<style lang="less" scoped>
main {
  margin: 2em auto;
  max-width: 200px;
  overflow: auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 3em 1em;
}
h2 {
  text-align: center;
  margin: 2em;
}
img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  display: inline-block;
  margin: 0 0;
}
audio {
  display: inline-block;
  width: 140px;
  height: 30px;
  margin: auto auto;
}

.button-sm {
  background-color: #CC1774;
  color: white;
  padding: 3px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 20px;
}

.d-flex {
  display:flex;
}
.align-items-center {
  align-items: center;
}
.justify-content-between {
  justify-content: space-between;
}

.m-0 {
  margin: 0px;
}
.ml-1 {
  margin-left: 0.25rem;
}
.mr-1 {
  margin-right: 0.25rem;
}

</style>