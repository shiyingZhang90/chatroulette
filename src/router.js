import Vue from 'vue'
import Router from 'vue-router'
import Chatroom from './views/Chatroom.vue'
import Ad from './views/Ad.vue'
import Profiles from './views/Profiles.vue'

Vue.use(Router)

const routes = [
  {
    path: '/chatroom',
    name: 'home',
    component: Chatroom
  },

  { path: '/chat', component: Ad },
  { path: '/service', component: Ad },
  { path: '/serviceyt', component: Ad },
  { path: '/chat/complete', component: Ad },
  { path: '/service/complete', component: Ad },
  { path: '/serviceyt/complete', component: Ad },
  { path: '/chatroom', component: Chatroom },
  { path: '/profiles', component: Profiles }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
