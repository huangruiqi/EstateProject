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

Vue.prototype.$store = store;

import '@/icons' // icon
import '@/permission' // permission control

import fontSize from './utils/fontSize'
import getUrl from "./utils/urlGet";

import $ from 'jquery'
import global from './Global.vue'
import './utils/global'
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

Vue.prototype.GLOBAL = global

Vue.use(ElementUI, { locale })

Vue.prototype.$axios = Axios
// this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.use(getUrl);
Axios.defaults.baseURL = global.BASE_URL
Axios.defaults.withCredentials = true;
Vue.prototype.$axios = Axios
Vue.config.productionTip = false


// http请求拦截器
Axios.interceptors.request.use(config => {
  store.dispatch('changeLoad', {display: true})
  return config
}, error => {
  store.dispatch('changeLoad', { display: false })
  return Promise.reject(error)
})
// http响应拦截器
Axios.interceptors.response.use(res => {// 响应成功关闭loading
  store.dispatch('changeLoad', { display: false })
  return res
}, error => {
  store.dispatch('changeLoad', { display: false })
  return Promise.reject(error)
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
