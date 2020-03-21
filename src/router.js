import Vue from 'vue'
import Router from 'vue-router'
import Chatroom from './views/Chatroom.vue'
import Ad from './views/Ad.vue'
import landing from './components/landing.vue'
import Profiles from './views/Profile-scroll.vue'
import Chatroom_vlogger from './views/Chatroom_vlogger.vue'

Vue.use(Router)

const routes = [
  {
    path: '/chatroom',
    name: 'home',
    component: Chatroom
  },

  { path: '/chat', component: Ad },
  { path: '/service', component: landing },
  { path: '/serviceyt', component: Ad },
  { path: '/chat/complete', component: Ad },
  { path: '/service/complete', component: Profiles },
  { path: '/serviceyt/complete', component: Ad },
  { path: '/chatroom', component: Chatroom },
  { path: '/profiles', component: Profiles },
  { path: '/chat_vlogger', component: Chatroom_vlogger }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
