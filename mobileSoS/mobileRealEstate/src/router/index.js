import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index',
    },
    {
      path: '/index',
      component: resolve => require(['../views/homePage/home'], resolve)
    },
    {
      path: '/houseType',
      component: resolve => require(['../views/houseTypePage/components/houseIndex'], resolve),
      children: [{
          path: '/',
          redirect: 'prototype'
        },
        {
          path: 'prototype',
          component: resolve => require(['../views/houseTypePage/prototypeRoomPage/proto'], resolve)
        },
        {
          path: 'plan',
          component: resolve => require(['../views/houseTypePage/planPage/plan'], resolve)
        },
        {
          path: 'three',
          component: resolve => require(['../views/houseTypePage/3dPage/three'], resolve)
        }
      ]
    },
    {
      path: '/nearBy',
      component: resolve => require(['../views/nearByPage/components/nearBy'], resolve),
      children: [{
          path: '/',
          redirect: 'park/around'
        },
        {
          path: 'park',
          redirect: 'park/around'
        },
        {
          path: 'park/around',
          component: resolve => require(['../views/nearByPage/parkPage/common'], resolve)
        },
        {
          path: 'park/parkView',
          component: resolve => require(['../views/nearByPage/parkPage/park'], resolve)
        }
      ]
    },
    {
      path: '/projectIntroduce',
      name: 'projectIntroduce',
      component: resolve => require(['../views/projectIntroduce/projectIntro'], resolve)
    },
    {
      path: '/brand',
      component: resolve => require(['../views/brand/common'], resolve),
      children: [
        {
          path: '/',
          redirect: 'brandIntro',
        },
        {
          path: 'brandIntro',
          name: 'brandIntro',
          component: resolve => require(['../views/brand/brandIntro'], resolve)
        },
        {
          path: 'brandHonor',
          name: 'brandHonor',
          component: resolve => require(['../views/brand/brandHonor'], resolve)
        },
        {
          path: 'brandHistory',
          name: 'brandHistory',
          component: resolve => require(['../views/brand/brandHistory'], resolve)
        },
        {
          path: 'brandCulture',
          name: 'brandCulture',
          component: resolve => require(['../views/brand/brandCulture'], resolve)
        },
        {
          path: 'mp4',
          component: resolve => require(['../views/brand/brandvideo'], resolve)
        }
      ]
    },
  ]
})
