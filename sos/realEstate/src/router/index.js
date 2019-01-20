import Vue from 'vue'
import Router from 'vue-router'
import contact from '../components/haveContact'
// import guidePage from "../views/guidePage/guide"
// import homePage from "../views/homePage/home"

// import projectIntroduce from "../views/projectIntroducePage/projectIntro"

// import brand from "../views/brandPage/components/index"
// import honor from "../views/brandPage/brandHonorPage/honor"
// import culture from "../views/brandPage/culturePage/culture"
// import develop from "../views/brandPage/developPage/develop"
// import enterprise from "../views/brandPage/enterpriseIntroducePage/enterprise"
// import mp4 from "../views/brandPage/enterpriseIntroducePage/videoplay"

// import houseType from "../views/houseTypePage/components/index"
// import prototype from "../views/houseTypePage/prototypeRoomPage/index"
// import plan from "../views/houseTypePage/planPage/index"
// import three from "../views/houseTypePage/3dPage/index"

// import nearBy from "../views/nearByPage/components/index"
// import common from "../views/nearByPage/parkPage/common"
// import park from "../views/nearByPage/parkPage/park"
// import neighberhood from "../views/nearByPage/neighberhoodPage/index"


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/guidePage/guide'], resolve)


    },
    {
      path: '/index',
      component: resolve => require(['../views/homePage/home'], resolve)

    },
    {
      path: '/projectIntroduce',
      component: resolve => require(['../views/projectIntroducePage/projectIntro'], resolve)


    },
    {
      path: '/brand',
      component: resolve => require(['../views/brandPage/components/index'], resolve),


      children: [
        {
          path: '/',
          redirect: 'enterprise'
        },
        {
          path: 'enterprise',
          component: resolve => require(['../views/brandPage/enterpriseIntroducePage/enterprise'], resolve)


        },
        {
          path: 'honor',
          component: resolve => require(['../views/brandPage/brandHonorPage/honor'], resolve)


        },
        {
          path: 'develop',
          component: resolve => require(['../views/brandPage/developPage/develop'], resolve)


        },
        {
          path: 'culture',
          component: resolve => require(['../views/brandPage/culturePage/culture'], resolve)


        }
      ]
    },
    {
      name: 'house',
      path: '/houseType',
      component: resolve => require(['../views/houseTypePage/components/index'], resolve),
      children: [
        {
          path: '/',
          redirect: 'prototype'
        },
        {
          path: 'prototype',
          component: resolve => require(['../views/houseTypePage/prototypeRoomPage/index'], resolve)
        },
        {
          name: 'plan',
          path: 'plan',
          component: resolve => require(['../views/houseTypePage/planPage/index'], resolve)
        },
        {
          path: 'three',
          component: resolve => require(['../views/houseTypePage/3dPage/index'], resolve)
        }
      ]
    },
    {
      path: '/nearBy',
      component: resolve => require(['../views/nearByPage/components/index'], resolve),


      children: [
        {
          path: '/',
          redirect: 'park/common'
        },
        {
          path: 'park',
          redirect: 'park/common'
        },
        {
          path: 'park/common',
          component: resolve => require(['../views/nearByPage/parkPage/common'], resolve)


        },
        {
          path: 'park/parkView',
          component: resolve => require(['../views/nearByPage/parkPage/park'], resolve)



        },
        {
          path: 'neighberhood',
          component: resolve => require(['../views/nearByPage/neighberhoodPage/index'], resolve)


        }
      ]
    },
    {
      path: '/mp4',
      component: resolve => require(['../views/brandPage/enterpriseIntroducePage/videoplay'], resolve)



    }
  ]
})
