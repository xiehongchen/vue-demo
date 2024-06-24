import { RouteRecordRaw } from "vue-router"

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  }
]

export const ohterRoutes: RouteRecordRaw[] = [
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      ...menuRoutes
    ]
  }
]
