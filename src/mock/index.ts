/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-03-04 18:31:39
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-03-05 10:24:29
 * @FilePath: /vue-demo/src/mock/index.ts
 * @Description: 
 * 认真学习每一天
 */

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import axiosModule from './axios/index'
import personModule from './person/index'

export function setupProdMockServer() {
  createProdMockServer([
    ...axiosModule,
    ...personModule
  ])
}