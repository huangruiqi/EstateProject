// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueVideoPlayer from 'vue-video-player'
import fontSize from './ultis/fontSize'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import jquery from 'jquery'
import './assets/bootstrap.min'  
import global from './Global.vue'
import luyou from './Global.vue'
import './ultis/global'
import VueLazyComponent from '@xunlei/vue-lazy-component'
import VueLazyload from 'vue-lazyload'
import pic from './assets/img/index/loading.jpg'
import Contact from './components/haveContact'
// import './styles/mixin.scss'


Vue.use(VueLazyload, {
  preload: 1.3,//预加载的宽高
  loading: pic,
  error: pic,
  attempt: 3,//尝试加载的次数
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'], //你想让vue监听的事件
})

Vue.use(VueLazyComponent)


Vue.prototype.GLOBAL = global
Axios.defaults.baseURL = global.BASE_URL
Vue.prototype.$axios = Axios;
Vue.use(VueVideoPlayer);
Vue.use(luyou)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Contact},
  template: '<App/>'
})
