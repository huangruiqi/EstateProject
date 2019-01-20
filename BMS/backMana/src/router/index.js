import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/loginIn/login'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/guidePage/index',
    meta: {
      requireAuth: true,
    },
  },
  // {  
  //   path: '/proSelect',
  //   component: Layout,            
  //   meta: {
  //     requireAuth: true,
  //   },
  //   redirect: '/proSelect/index',
  //   children: [{
  //     path: 'index',
  //     name: 'proSelect',
  //     component: () => import('@/views/projectSelect/index'),
  //     meta: {
  //       title: '项目选择',
  //       icon: 'table'
  //     }
  //   }]
  // },
  {
    path: '/guidePage',
    component: Layout,
    redirect: '/guidePage',
    meta: {
      requireAuth: true,
    },
    children: [{
      path: 'index',
      name: 'guidePage',
      component: () => import('@/views/guidePage/index'),
      meta: { title: '引导页管理', icon: 'example' }
    }]
  },
  {
    path: '/homePage',
    component: Layout,
    name: 'index',
    redirect: '/homePage/index',
    meta: { title: '首页管理', icon: 'home' },
    children: [{
      path: 'index',
      name: 'homePage',
      component: () => import('@/views/homepage/index'),
      meta: { title: '电脑端', icon: 'form' }
    },
    {
      path: 'mobile',
      name: 'mobile',
      component: () => import('@/views/homepage/mobile'),
      meta: { title: '移动端', icon: 'form' }
    }]
  },
  {
    path: '/houseDis',
    component: Layout,
    redirect: '/houseDis',
    name: 'houseDis',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/houseDis/index'),
        meta: { title: '户型展示', icon: 'project' }
      }
    ]
  },

  {
    path: '/company',
    name: 'Form',
    component: Layout,
    redirect: './company/comapnyRe',
    meta: { title: '品牌概况', icon: 'brand' },
    children: [
      {
        path: 'companyRe',
        name: 'companyRe',
        component: () => import('@/views/form/companyRe/index'),
        meta: { title: '企业简介', icon: 'form' }
      },
      {
        path: 'companyHo',
        name: 'companyHo',
        component: () => import('@/views/form/companyHo/index'),
        meta: { title: '品牌荣耀', icon: 'form' }
      },
      {
        path: 'companyHis',
        name: 'companyHis',
        component: () => import('@/views/form/companyHis/index'),
        meta: { title: '发展历程', icon: 'form' }
      },
      {
        path: 'companyCul',
        name: 'companyCul',
        component: () => import('@/views/form/companyCul/index'),
        meta: { title: '企业文化', icon: 'form' }
      }
    ]
  },
  {
    path: '/proInt',
    component: Layout,
    redirect: '/proInt/index',
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'index',
        name: 'proInt',
        component: () => import('@/views/proInt/index'),
        meta: { title: '项目介绍', icon: 'table' }
      }
    ]
  },
  {
    path: '/around',
    component: Layout,
    name: 'near',
    redirect: '/around/park',
    meta: { title: '楼盘周边', icon: 'around' },
    children: [
      {
        path: 'park',
        name: 'park',
        component: () => import('@/views/around/park'),
        meta: { title: '园林景观', icon: 'form' }
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/around/map'),
        meta: { title: '周边设施', icon: 'form' }
      }
    ]
  },
  {
    path: '/proManage',
    component: Layout,
    meta: {
      requireAuth: true,
    },
    redirect: '/proManage/index',
    children: [
      {
        path: 'index',
        name: 'proManage',
        component: () => import('@/views/projectManage/index'),
        meta: { title: '项目管理', icon: 'table' }
      }
    ]
  },
  
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

