<template>
  <div class="menu">
    <div v-for="item in menuRoutes" :key="item.path" @click="goRouter(item)" 
      class="item" :class="item.path === route.path ? 'active' : ''">
      {{ item.meta?.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuRoutes } from '@/router/routes'
import { navigate } from '@/utils/navigate'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log('router', route)
const goRouter = (value: any) => {
  console.log('value', value)
  navigate(value.path)
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  .item {
    padding: 0 20px;
    cursor: pointer;
  }
  .active {
    color: red;
  }
}
</style>