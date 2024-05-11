<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue'
import LayoutSider from './LayoutSider.vue';
import { useSetting } from '@/store/setting'
import { layout } from '@/enum/setting'
const setting = useSetting()
const collapsed = computed(() => setting.collapsed)
const themeLayout = computed(() => setting.themeLayout)
</script>

<template>
  <a-layout class="layout">
    <div v-if="themeLayout === layout.BOX" class="bg-image"></div>
    <a-layout-header class="header">
      <LayoutHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="300" v-model:collapsed="collapsed" :trigger="null" collapsible :collapsedWidth="0" class="sider flex-center">
        <LayoutSider />
      </a-layout-sider>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.layout {
  position: relative;
  background-color: #fafafa;
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/preview.jpg');
    background-size: cover;
    background-position: center;
  }
}

.header {
  height: $base-menu-height;
  background-color: transparent;
  position: relative;

}

.sider {
  text-align: center;
  background-color: transparent;
  width: 500px;
}

.content {
  padding: 20px;
  height: calc(100vh - $base-menu-height);
  background-color: transparent;
  position: relative;
}
</style>
