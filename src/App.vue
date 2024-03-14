<script setup lang="ts">

</script>

<template>
  <div class="app">
    <router-link to="/table">useTable-表格</router-link>
    <router-link to="/table2">封装-表格</router-link>
    <router-link to="/axios">axios封装</router-link>
    <router-link to="/form">表单-封装</router-link>
    <router-link to="/page">分页-封装</router-link>
    <router-link to="/color">前端换肤</router-link>
    <router-link to="/router">简易router</router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
a {
  margin-right: 20px;
}
</style>
