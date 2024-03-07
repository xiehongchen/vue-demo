<template>
  <h1>表单二次封装</h1>
  <basic-form ref="basicFormRef" :options="formData" :props="formData.props" :events="formData.events">
    <!-- 使用插槽覆盖掉组件里的，record就是传参 -->
    <template #name="{record}">
      {{ record }}
    </template>
  </basic-form>
  <el-button @click="save">保存</el-button>
</template>

<script lang="ts" setup>
const basicFormRef = ref()
const data = computed(() => formData.data)
const save = () => {
  console.log('basicFormRef', basicFormRef.value.formRef)
  basicFormRef.value.formRef.validate((valid: boolean) => {
    if (valid) {
      console.log('data', data.value)
    } else {
      console.log('校验错误')
    }
  })
}
const formData = reactive({
  // el-form原生属性
  props: {

  },
  // el-form原生事件
  events: {},
  // 校验规则
  rules: {
    // website: [
    //   { required: true, message: '请输入', trigger: 'blur' },
    //   { min: 3, max: 5, message: '长度在3到5', trigger: 'blur' },
    // ]
  },
  formList: [
    // {
    //   prop: 'website',
    //   label: '网站',
    //   type: {
    //     name: 'input',
    //     placeholder: '请输入网站',
    //     prepend: 'www',
    //     append: 'com'
    //   }
    // },
    // {
    //   prop: 'name',
    //   label: '姓名',
    //   type: {
    //     name: 'input'
    //   }
    // },
    // {
    //   prop: 'image',
    //   label: '图片',
    //   type: {
    //     name: 'image'
    //   }
    // },
    // {
    //   prop: 'video',
    //   label: '视频',
    //   type: {
    //     name: 'video'
    //   },
    //   style: {
    //     width: '100',
    //     height: '100'
    //   }
    // },
    // {
    //   prop: 'radio',
    //   label: '单选',
    //   type: {
    //     name: 'radio',
    //     radios: [
    //       {
    //         value: '测试',
    //         label: '1'
    //       },
    //       {
    //         value: '测试2',
    //         label: '2'
    //       },
    //       {
    //         value: '测试3',
    //         label: '3'
    //       },
    //     ]
    //   }
    // },
    // {
    //   prop: 'checkbox',
    //   label: '多选',
    //   type: {
    //     name: 'checkbox',
    //     checkbox: [
    //       {
    //         value: '测试',
    //         label: '1'
    //       },
    //       {
    //         value: '测试2',
    //         label: '2'
    //       },
    //       {
    //         value: '测试3',
    //         label: '3'
    //       },
    //     ]
    //   }
    // },
    {
      prop: 'select',
      label: '选择器',
      type: {
        name: 'select',
        select: [
          {
            value: '测试',
            label: '1'
          },
          {
            value: '测试2',
            label: '2'
          },
          {
            value: '测试3',
            label: '3'
          },
        ]
      }
    },
    {
      prop: 'switch',
      label: '开关',
      type: {
        name: 'switch'
      }
    },
    {
      prop: 'time',
      label: '时间',
      type: {
        name: 'time-select',
        start: '00:00',
        end: '12:00',
        step: '00:10'
      }
    },
    {
      prop: 'date',
      label: '日期',
      type: {
        name: 'date',
      }
    },
  ],
  data: {
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
