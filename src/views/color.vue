<template>
  <div class="box">
    <el-button class="color">颜色</el-button>
    <el-button @click="">切换</el-button>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.box {
  --fontColor: #f00;
  .color {
    background: var(--fontColor);
  }
}
</style>