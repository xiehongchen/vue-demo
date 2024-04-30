<template>
  <div>
    <h1>axios封装</h1>
    <div class="app">
    <button @click="get">发送get请求</button>
    <button @click="post">发送post请求</button>
    <button @click="more">发送多个请求</button>
    <button @click="retryGet">重复执行GET请求</button>
  </div>
  </div>
</template>

<script setup lang='ts'>
import useRequest from '@/utils/axios/index'


const get = () => {
  useRequest.get({
    url: '/a'
  }).then((res) => console.log('GET:', res))
}

const post = () => {
  useRequest.post({
    url: '/b',
    data: {
      message: 'POST'
    }
  }).then((data) => console.log('POST:', data))
}

const retryGet = () => {
  useRequest.get({
    url: '/c'
  }).then((res) => console.log('GET:', res)).catch(err => {
    console.log('Err', err)
  })
}
const more = () => {
  post()
  get()
  d()
  e()
}
const d = () => {
  useRequest.post({
    url: '/d',
    data: {
      message: 'POST'
    }
  }).then((data) => console.log('POST:', data)).catch(err => {
    console.log('Err', err)
  })
}
const e = () => {
  useRequest.post({
    url: '/e',
    data: {
      message: 'POST'
    }
  }).then((data) => console.log('POST:', data)).catch(err => {
    console.log('Err', err)
  })
}
</script>

<style scoped lang='scss'>

</style>