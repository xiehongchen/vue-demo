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

const routes: RouteRecordRaw[] = []

const views = import.meta.glob('./../views/*.vue')
for (const path in views) {
  const match = path.match(/(\/[^/]+)\.vue$/) as string[]
  routes.push({
    path: match[1],
    // /* @vite-ignore */抑制警告
    component: () => import(/* @vite-ignore */`${path}`)
  })
}

console.log('routes', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router