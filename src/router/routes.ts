import { RouteRecordRaw } from "vue-router"
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Layout/index.vue')
  }
]
