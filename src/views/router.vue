<template>
  <div>
    <a href="#/table">table</a>
    <a href="#/form">form</a>
    <component :is="currentView" />
  </div>
</template>

<script setup>
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
  return routes[currentPath.value.slice(1)] || Table
})
</script>

<style lang="scss" scoped>

</style>