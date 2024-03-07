<template>
    <el-image v-bind="$attrs" :style="{ width, height, borderRadius: rounded ? '50%' : '0' }" preview-teleported>
    <template #placeholder>
      <div class="image-slot">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </div>
    </template>

    <template #error>
      <div class="image-slot">
        <el-icon>
          <Picture />
        </el-icon>
      </div>
    </template>
  </el-image>
</template>

<script setup lang="ts">
defineProps({
  // 图片宽度
  width: {
    type: String,
    default: '90px'
  },
  // 图片高度
  height: {
    type: String,
    default: '90px'
  },
  // 图标圆角
  rounded: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.el-image {
  vertical-align: top;
  font-size: 0;

  :deep(.el-icon) {
    font-size: 16px;
  }

  :deep(.image-slot) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color-light);
  }
}
</style>