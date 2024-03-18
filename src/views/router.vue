<template>
  <div>
    <a href="#/table">table</a>
    <a href="#/form">form</a>
    <component :is="currentView" />
  </div>
</template>

<script setup lang="ts">
import Table from './table.vue'
import Form from './form.vue'

const routes = {
  '/form': Form,
  '/table': Table
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
  console.log('currentPath', currentPath.value)
})

const currentView = computed(() => {
  return (routes as Record<string, any>)[currentPath.value.slice(1)] || Table
})
</script>

<style lang="scss" scoped>

</style>