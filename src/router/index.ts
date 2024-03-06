/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-03-04 15:06:00
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-03-04 16:11:33
 * @FilePath: /vue-demo/src/router/index.ts
 * @Description: 
 * 认真学习每一天
 */
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
 {
  path: '/table',
  component: () => import('@/views/table.vue')
 },
 {
  path: '/table2',
  component: () => import('@/views/table2.vue')
 },
 {
  path: '/axios',
  component: () => import('@/views/axios.vue')
 },
 {
  path: '/form',
  component: () => import('@/views/form.vue')
 }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router