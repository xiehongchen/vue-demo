import { RouteRecordRaw } from "vue-router"
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layout/index.vue')
  },
]
