import Vue from 'vue'

import Axios from 'axios'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import fontSize from './utils/fontSize'
import getUrl from "./utils/urlGet";

import $ from 'jquery'
import global from './Global.vue'
import './utils/global'

Vue.prototype.GLOBAL = global

Vue.use(ElementUI, { locale })

Vue.prototype.$axios = Axios
// this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.use(getUrl);
Axios.defaults.baseURL = global.BASE_URL
Vue.prototype.$axios = Axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
