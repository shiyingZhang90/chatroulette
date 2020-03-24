import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSelectImage from 'vue-select-image'
import VueAnalytics from 'vue-analytics'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
require('vue-select-image/dist/vue-select-image.css')
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSelectImage)
Vue.use(VueAnalytics, {
  id: 'UA-161594606-1',
  router,
  autoTracking: {
    screenview: true,
    prependBase: false
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
