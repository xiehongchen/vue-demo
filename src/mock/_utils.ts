/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-03-05 10:27:12
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-03-05 10:27:29
 * @FilePath: /vue-demo/src/mock/_utils.ts
 * @Description: 
 * 认真学习每一天
 */
import Mock from 'mockjs'

/** 返回成功数据 */
export const resultSuccess = (data: unknown) => {
  return Mock.mock({
    code: 200,
    data,
    message: '请求成功',
    success: true
  })
}

/** 返回失败数据 */
export const resultError = (data: unknown, message: string, code = 500) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false
  })
}