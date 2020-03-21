<template lang="pug">
main
  Profile(:person="PROFILES[3]" )
</template>

<script>
import Profile from '../components/profile-single.vue'
export default {
  components: { Profile },
  data () {
    return {
      groups: [],
      PROFILES
    }
  },
  created () {
    const map = new Map()
    for (const person of PROFILES) {
      if (!map.has(person.type)) {
        map.set(person.type, [])
      }
      map.get(person.type).push(person)
    }

    this.groups = Array.from(map.values())
  }
}
const PROFILES = [
  { photo: require('@/assets/主播/御姐风/九叶.jpeg'), audio: require('@/assets/主播/御姐风/九叶.mp3'), type: '御姐风', name: '九叶', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/御姐风/半梦.jpeg'), audio: require('@/assets/主播/御姐风/半梦.mp3'), type: '御姐风', name: '半梦', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/御姐风/歪歪.jpeg'), audio: require('@/assets/主播/御姐风/歪歪.mp3'), type: '御姐风', name: '歪歪', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/御姐风/门儿.jpeg'), audio: require('@/assets/主播/御姐风/门儿.mp3'), type: '御姐风', name: '门儿', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/御姐风/风伶.jpeg'), audio: require('@/assets/主播/御姐风/风伶.mp3'), type: '御姐风', name: '风伶', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/Touma.jpeg'), audio: require('@/assets/主播/元气少女/Touma.mp3'), type: '元气少女', name: 'Touma', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/北北.jpeg'), audio: require('@/assets/主播/元气少女/北北.mp3'), type: '元气少女', name: '北北', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/千浔.jpeg'), audio: require('@/assets/主播/元气少女/千浔.mp3'), type: '元气少女', name: '千浔', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/月筝.jpeg'), audio: require('@/assets/主播/元气少女/月筝.mp3'), type: '元气少女', name: '月筝', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/江流.jpeg'), audio: require('@/assets/主播/元气少女/江流.mp3'), type: '元气少女', name: '江流', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/清冷.jpeg'), audio: require('@/assets/主播/元气少女/清冷.mp3'), type: '元气少女', name: '清冷', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/温火.jpeg'), audio: require('@/assets/主播/元气少女/温火.mp3'), type: '元气少女', name: '温火', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/炫炫.jpeg'), audio: require('@/assets/主播/元气少女/炫炫.mp3'), type: '元气少女', name: '炫炫', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/筱筱.jpeg'), audio: require('@/assets/主播/元气少女/筱筱.mp3'), type: '元气少女', name: '筱筱', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/雯陌.jpeg'), audio: require('@/assets/主播/元气少女/雯陌.mp3'), type: '元气少女', name: '雯陌', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/黑柒.jpeg'), audio: require('@/assets/主播/元气少女/黑柒.mp3'), type: '元气少女', name: '黑柒', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/六酒.png'), audio: require('@/assets/主播/元气少女/六酒.mp3'), type: '元气少女', name: '六酒', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/豆豆.png'), audio: require('@/assets/主播/元气少女/豆豆.mp3'), type: '元气少女', name: '豆豆', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/夏卿诺.jpeg'), audio: require('@/assets/主播/元气少女/夏卿诺.mp3'), type: '元气少女', name: '夏卿诺', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/特仑苏.jpeg'), audio: require('@/assets/主播/元气少女/特仑苏.mp3'), type: '元气少女', name: '特仑苏', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/颜泽汐.jpeg'), audio: require('@/assets/主播/元气少女/颜泽汐.mp3'), type: '元气少女', name: '颜泽汐', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/钱钱安.png'), audio: require('@/assets/主播/元气少女/钱钱安.mp3'), type: '元气少女', name: '钱钱安', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/元气少女/胖子布莱尼.jpeg'), audio: require('@/assets/主播/元气少女/胖子布莱尼.mp3'), type: '元气少女', name: '胖子布莱尼', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/奶包.jpeg'), audio: require('@/assets/主播/可爱萝莉/奶包.mp3'), type: '可爱萝莉', name: '奶包', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/蠢蠢.jpeg'), audio: require('@/assets/主播/可爱萝莉/蠢蠢.mp3'), type: '可爱萝莉', name: '蠢蠢', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/阿九.jpeg'), audio: require('@/assets/主播/可爱萝莉/阿九.mp3'), type: '可爱萝莉', name: '阿九', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/雪鱼.jpeg'), audio: require('@/assets/主播/可爱萝莉/雪鱼.mp3'), type: '可爱萝莉', name: '雪鱼', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' },
  { photo: require('@/assets/主播/可爱萝莉/好梦.png'), audio: require('@/assets/主播/可爱萝莉/好梦.mp3'), type: '可爱萝莉', name: '好梦', attribute: '属性：攻', talent: '特长：鸡儿特长', hobby: '喜欢：打游戏', recommendation: '自我推荐：唱歌哄睡讲故事扯犊子都可以。', outlooking: '外表描述：攻的压批' }
]
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
  width: 240px;
  height: 260px;
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
