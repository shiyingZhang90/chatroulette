<template lang="pug">
div(class="h-100 position-relative")
  div(:style="{ backgroundImage: 'url(' + require('@/assets/ad/background3.jpeg') + ')'}", class="background-image h-70")
  div(class="position-absolute", style={ top: 0, left: auto, right: auto}, class="h-70 w-100")
    b-card(overlay :img-src="LOGO[0]", img-alt="Card Image", text-variant="white",style="max-width: 30%;", class="sign_form")
      div(class="m-sign-up align-items-center")
        b-form(@submit="submit" , v-if="show")
          b-form-group(id="input-group-1", label="Customize chat partner now", label-for="input-1", )
              b-form-input(id="input-1", type="email", placeholder="Enter email", required)
                v-model="form.email"
          b-button(type="submit", href="#" variant="primary" @click="submit") Customize Now
  h3(class="") 本月排行榜
  div(class="d-flex justify-content-around")
    b-card(v-for="person in PROFILES", img-top, tag="article" style="max-width: 30%;" class="mb-2 text-center", border-variant="light")
      b-img(:src="person.photo", fluid, rounded="circle",v-bind="mainProps")
      b-card-text {{person.name}}
</template>

<script>
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'
import Vue from 'vue'
import { callApi } from '../api.js'
import Profile from '../components/profile-single.vue'
Vue.use(VueScrollProgressBar)
export default {
  components: { Profile },
  data () {
    return {
      groups: [],
      LOGO,
      PROFILES,
      mainProps: { width: 150, height: 100, class: 'm1' },
      show: true
    }
  },
  computed: {
    hasSubmitted () {
      return this.$route.path.split('/')[2] === 'complete'
    }
  },
  methods: {
    clickMethod () {
    // this.$router.push('home');
    },
    submit () {
      // alert(JSON.stringify(this.form))
      this.$ga.event('Landing', 'Register')
      callApi('config/user', {
        user_description: `Registered via the ${this.adType} ad.`,
        user_email: this.email,
        updated_ts: Math.round(new Date().getTime() / 1000)
      }, 'POST').catch((error) => {
        console.error('Submit error.', error)
      }).then(() => {
        this.$router.push(`${this.$route.path}/complete`)
      })
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
const LOGO = [
  require('@/assets/ad/LOGO.png'),
  require('@/assets/ad/background1.jpeg'),
  require('@/assets/ad/background2.jpeg'),
  require('@/assets/ad/background3.jpeg'),
  require('@/assets/ad/background4.jpeg')
]
const PROFILES = [
  { photo: require('@/assets/主播/元气少女/颜泽汐.jpeg'), audio: require('@/assets/主播/元气少女/颜泽汐.mp3'), type: '元气少女', name: '颜泽汐', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/钱钱安.png'), audio: require('@/assets/主播/元气少女/钱钱安.mp3'), type: '元气少女', name: '钱钱安', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/胖子布莱尼.jpeg'), audio: require('@/assets/主播/元气少女/胖子布莱尼.mp3'), type: '元气少女', name: '胖子布莱尼', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/奶包.jpeg'), audio: require('@/assets/主播/可爱萝莉/奶包.mp3'), type: '可爱萝莉', name: '奶包', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/阿九.jpeg'), audio: require('@/assets/主播/可爱萝莉/阿九.mp3'), type: '可爱萝莉', name: '阿九', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/雪鱼.jpeg'), audio: require('@/assets/主播/可爱萝莉/雪鱼.mp3'), type: '可爱萝莉', name: '雪鱼', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/好梦.png'), audio: require('@/assets/主播/可爱萝莉/好梦.mp3'), type: '可爱萝莉', name: '好梦', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' }
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
h3 {
  text-align: center;
  margin-top: 1em;
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
.background-image {
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;

  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.h-70{
  height: 70%;
}
.blur-content{
  filter: blur(5px);
}
.sign_form {
  margin-left: 10%;
  margin-top: 10%;
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
.m-sign-up {
  margin-top: 50%;
  text-align: center;
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