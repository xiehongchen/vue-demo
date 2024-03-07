<template>
  <div>
    <h1>表格二次封装</h1>
    <basic-table :options="options" :loading="loading" :props="options.props" :events="options.events"></basic-table>
    <el-pagination
      background 
      layout="prev, pager, next" 
      :total="pagination.total" 
      v-model:page-size="pagination.pageSize"
      v-model:current-page="pagination.current"
      @current-change="changeCurrent"
      @size-change="changePageSize" />
  </div>
</template>

<script setup lang="ts">
import { getPersonList } from '@/apis'
import useTable from '@/hooks/useTable'
import { reactive } from 'vue';

const form = reactive({
  name: '',
  status: ''
})
const { loading, tableData, pagination, changeCurrent, changePageSize } = useTable(
  (pagin) => getPersonList({ ...form, current: pagin.page, pageSize: pagin.size }),
  { immediate: true, formatResult: (data: any[]) => data.map((i) => ({ ...i, isEdit: false })) }
)

// 表格配置
const options = reactive({
  props: {},
  events: {},
  // 表格数据
  data: tableData,
  // 表格列
  columns: [
    { 
      prop: 'name', 
      label: '姓名',
      text: '查看姓名',
      click: (row: any) => {
        console.log('row', row)
      }
    },
    { prop: 'date', label: '日期' },
    { prop: 'address', label: '地址' },
    {
      label: '操作',
      prop: 'action',
      actions: [
        { text: '编辑' },
        { text: '删除' },
        {
          text: '查看',
          click: ({ row }: any, table: any) => {
            console.log('row', row)
            console.log('table', table)
          }
        }
      ]
    }
  ]

})

</script>

<style lang="scss" scoped>

</style>