<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue'
import LayoutSider from './LayoutSider.vue';

</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <LayoutHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="sider"><LayoutSider /></a-layout-sider>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.header {
  text-align: center;
  color: #fff;
  height: 64px;
  background-color: #7dbcea;
  display: flex;
  justify-content: center;
}
.sider {
  text-align: center;
  color: #fff;
  background-color: #3ba0e9;
}
.content {
  text-align: center;
  height: calc(100vh - 46px);
  color: #fff;
  background-color: #108ee9;
}
</style>
