/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-23 15:08:49
 * @FilePath: /vue3-music/src/router/routes.ts
 * @Description: 
 * 认真学习每一天
 */
import { RouteRecordRaw } from "vue-router"

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/index.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/views/tags/index.vue'),
    meta: {
      title: '标签'
    }
  },
  {
    path: '/dates',
    name: 'dates',
    component: () => import('@/views/dates/index.vue'),
    meta: {
      title: '归档'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: '关于'
    }
  }
]

export const ohterRoutes: RouteRecordRaw[] = [
  {
    path: '/doc/:name',
    name: 'doc',
    component: () => import('@/views/article/index.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
  }
]
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      ...menuRoutes,
      ...ohterRoutes
    ],
  },
]
