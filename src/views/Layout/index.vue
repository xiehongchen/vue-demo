<template>
      <a-layout>
      <!-- <a-layout-sider :style="siderStyle">Sider</a-layout-sider> -->
      <a-layout>
        <a-layout-header :style="headerStyle">Header</a-layout-header>
        <a-layout-content :style="contentStyle">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>

</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#000',
  height: 60,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#FFF',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  color: '#000',
  backgroundColor: '#fff',
};

// const siderStyle: CSSProperties = {
//   textAlign: 'center',
//   lineHeight: '100vh',
//   color: '#fff',
//   backgroundColor: '#3ba0e9',
// };

</script>

<style scoped lang="scss">

</style>
