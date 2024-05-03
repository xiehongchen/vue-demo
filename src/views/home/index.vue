<template>
  <div>主页</div>
  <button @click="go">点击</button>
</template>

<script setup lang="ts">
// import router from '@/router'
import { useRouter } from 'vue-router';
const router = useRouter()
const go = () => {
  router.push({ name: 'doc', params: { name: 'test' } })
}
</script>

<style lang="scss" scoped>

</style>