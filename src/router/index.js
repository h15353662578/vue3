import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/vab',
    component: Layout,
    redirect: '/vab/table',
    alwaysShow: true,
    meta: {
      title: '表单',
      icon: 'centos-line',
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/vab/table'),
        meta: {
          title: '商品表',
          icon: 'drive-fill',
        },
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/vab/icon'),
        meta: {
          title: '用户表',
          icon: 'wechat-line'
        },
      },

      {
        path: 'orderuser',
        name: 'orderuser',
        component: () => import('@/views/vab/orderuser'),
        meta: {
          title: '用户订单信息表',
          icon: 'contacts-line',
        }
      },
      {
        path: 'ord',
        name: 'ord',
        component: () => import('@/views/vab/ord'),
        meta: {
          title: '订单信息',
          icon: 'bar-chart-horizontal-fill',
        }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/vab/order'),
        meta: {
          title: '订单表',
          icon: 'codepen-fill',
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/vab/user'),
        meta: {
          title: '新建用户',
          icon: 'account-circle-line'
        },
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/views/vab/addstore'),
        meta: {
          title: '新建商品',
          icon: 'shopping-bag-2-line'
        },
      },
      {
        path: 'test',
        name: 'test',
        link: 'http://127.0.0.1:5500/src/app/pages/test/test.html',
        meta: {
          title: 'test',
        }
      },
    ],
  },

  {
    path: '/error',
    name: 'Error',
    component: Layout,
    redirect: '/error/403',
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/403'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
        },
      },
    ],
  },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
