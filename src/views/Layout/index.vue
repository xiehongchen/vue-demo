<template>
  <div>123</div>
</template>

<script setup lang="ts">
</script>

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
