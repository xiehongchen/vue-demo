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
          <video v-bind="item?.style" v-if="!!options.data[item.prop]" 
            :src="options.data[item.prop]" controls></video>
          <basic-image v-else></basic-image>
        </div>
        <!-- 单选框 -->
        <el-radio-group v-if="item.type?.name === 'radio'" v-model="options.data[item.prop]">
          <el-radio v-for="radio in item.type?.radios" :key="radio.label" v-bind="radio">
            {{ radio.value }}
          </el-radio>
        </el-radio-group>
        <!-- 多选框 -->
        <el-checkbox-group v-if="item.type?.name === 'checkbox'" v-model="options.data[item.prop]">
          <el-checkbox v-for="checkbox in item.type?.checkbox" :key="checkbox.label" v-bind="checkbox">
            {{ checkbox.value }}
          </el-checkbox>
        </el-checkbox-group>
        <!-- 选择器 -->
        <el-select v-if="item.type?.name === 'select'" v-model="options.data[item.prop]">
          <el-option v-for="select in item.type?.select" :key="select.value" 
            :label="select.label" :value="select.value"></el-option>
        </el-select>
        <!-- 开关 -->
        <el-switch v-if="item.type?.name === 'switch'" v-model="options.data[item.prop]"></el-switch>
        <!-- 时间选择 -->
        <el-time-select v-if="item.type?.name === 'time-select'" v-model="options.data[item.prop]"
          :start="item.type?.start" :end="item.type?.end" :step="item.type?.step"/>
          <!-- 日期选择 -->
          <el-date-picker v-if="item.type?.name === 'date'" v-model="options.data[item.prop]" />
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