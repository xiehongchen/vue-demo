<template>
  <div>
    <h1>表格二次封装</h1>
    
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
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
const { loading, tableData, getTableData, pagination, changeCurrent, changePageSize } = useTable(
  (pagin) => getPersonList({ ...form, current: pagin.page, pageSize: pagin.size }),
  { immediate: true, formatResult: (data: any[]) => data.map((i) => ({ ...i, isEdit: false })) }
)
console.log('useTable>>>>>', loading)
console.log('tableData>>>>>', tableData)
console.log('getTableData>>>>', getTableData)
console.log('pagination>>>>', pagination)

watch(loading, (newVal) => {
  console.log('loading>>>>', newVal)
})

</script>

<style lang="scss" scoped>

</style>