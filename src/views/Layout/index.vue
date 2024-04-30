<script setup lang="ts">
import type { CSSProperties } from 'vue';
import LayoutHeader from './LayoutHeader.vue'
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

</script>

<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <LayoutHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="siderStyle">Sider</a-layout-sider>
      <a-layout-content :style="contentStyle">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">

</style>
