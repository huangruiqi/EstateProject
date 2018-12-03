// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import fontSize from './utils/fontSize'
import global from './http/Global.vue'
import getElement from './utils/getElement'
import $ from 'jquery'

Vue.prototype.$get = getElement

Vue.prototype.GLOBAL = global
Axios.defaults.baseURL = global.BASE_URL
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
