<template>
  <el-form ref="formRef" :model="options.data" :rules="options.rules" :label-width="options.label.width"
    v-on="Object.assign({}, $attrs.events)" v-bind="Object.assign({}, $attrs.props)">
    <el-form-item v-for="(item, index) in options.formList" :key="index" :prop="item.prop" :label="item.label">
      <template #label="{ label }">
        {{ label }}
      </template>
      <!-- 设置具名插槽，传参为record，当使用template时会占据这个位置 -->
      <slot :name="item.prop" :record="options.data[item.prop]">
        <!-- 输入框 -->
        <el-input v-if="item.type?.name === 'input'" v-model="options.data[item.prop]">
          <template v-if="item.type?.prepend" #prepend>
            {{ item.type?.prepend }}
          </template>
          <template v-if="item.type?.append" #append>
            {{ item.type?.append }}
          </template>
        </el-input>
        <!-- 图片 -->
        <div v-if="item.type?.name === 'image'">
          <basic-image v-for="(src, index) in options.data[item.prop]" :key="index" :src="src"
          :preview-src-list="options.data[item.prop]" preview-teleported></basic-image>
          <basic-image v-if="!options.data[item.prop]"></basic-image>
        </div>
        <!-- 视频 -->
        <div v-if="item.type?.name === 'video'">
          <video v-bind="item?.style" v-if="!!options.data[item.prop]" :src="options.data[item.prop]" controls></video>
          <basic-image v-else></basic-image>
        </div>
        <!-- 单选框 -->
      </slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
const attrs = useAttrs()
console.log('attrs', attrs)
defineProps({
  options: {
    type: Object,
    required: true
  }
})
const formRef = ref()
defineExpose({
  formRef
})
</script>

<style scoped lang='scss'>

</style>