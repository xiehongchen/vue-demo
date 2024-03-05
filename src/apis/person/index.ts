/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-03-04 17:28:05
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-03-05 10:48:36
 * @FilePath: /vue-demo/src/apis/person/index.ts
 * @Description: 
 * 认真学习每一天
 */
import useRequest from '@/utils/axios/index'
import type * as Person from './type'

export function getPersonList(data: {
  name?: string,
  status?: string,
  current: number,
  pageSize: number
}) {
  return useRequest.get<PageRes<Person.PersonItem[]>>({
    url: '/person/list',
    params: data
  })
}