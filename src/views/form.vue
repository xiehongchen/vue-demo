<template>
  <h1>表单二次封装</h1>
  <basic-form :options="formData" :props="formData.props" :events="formData.events">
    <!-- 使用插槽覆盖掉组件里的，record就是传参 -->
    <template #name="{record}">
      {{ record }}
    </template>
  </basic-form>
</template>

<script lang="ts" setup>
const formData = reactive({
  // el-form原生属性
  props: {

  },
  // el-form原生事件
  events: {},
  formList: [
    {
      prop: 'website',
      label: '网站',
      type: {
        name: 'input',
        placeholder: '请输入网站',
        prepend: 'www',
        append: 'com'
      }
    },
    {
      prop: 'name',
      label: '姓名',
      type: {
        name: 'input'
      }
    },
    {
      prop: 'image',
      label: '图片',
      type: {
        name: 'image'
      }
    },
    {
      prop: 'video',
      label: '视频',
      type: {
        name: 'video'
      },
      style: {
        width: '100',
        height: '100'
      }
    },
  ],
  data: {
    name: '123123',
    video: 'src/assets/test.mp4',
    // image: ['https://img0.baidu.com/it/u=256816879,771155532&fm=253&fmt=auto&app=120&f=JPEG?w=1204&h=800', 'https://img0.baidu.com/it/u=3628503530,464378779&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800']
  },
  label: {
      width: '200px'
  },
})
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
