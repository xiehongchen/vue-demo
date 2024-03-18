<template>
  <div class="box">
    <el-button class="color">颜色</el-button>
    <el-button @click="click">切换</el-button>
    <div v-for="item in list" :key="item">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
const list = [1,2,3,4,6]
const click = () => {
  list[2] = 8
}

</script>

<style lang="scss" scoped>
.box {
  --fontColor: #f00;
  .color {
    background: var(--fontColor);
  }
}
</style>