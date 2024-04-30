<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
    @click="goRouter"
  >
    <a-menu-item v-for="item in menuRoutes" :key="item.path">{{ item.meta?.title }}</a-menu-item>
  </a-menu>
</template>

<script setup lang="ts">
import { menuRoutes } from '@/router/routes'
import { navigate } from '@/utils/navigate'
console.log('menuRoutes', menuRoutes)


const selectedKeys = ref<string[]>(['/home']);
const goRouter = (value) => {
  console.log('value', value)
}
</script>

<style lang="scss" scoped>

</style>