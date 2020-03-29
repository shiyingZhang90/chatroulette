import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSelectImage from 'vue-select-image'
import VueAnalytics from 'vue-analytics'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as facemesh from '@tensorflow-models/facemesh'
import * as tf from '@tensorflow/tfjs-core'
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm'
import Stats from 'stats.js'
import LoadScript from 'vue-plugin-load-script'
import VueWorker from 'vue-worker'
import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.component('vue-friendly-iframe', VueFriendlyIframe);
Vue.use(VueWorker) 
Vue.use(LoadScript);
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
