<template>
  <div>
    <h1>表格封装</h1>
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
const { loading, tableData, getTableData, pagination } = useTable(
  (pagin) => getPersonList({ ...form, current: pagin.page, pageSize: pagin.size }),
  { immediate: true, formatResult: (data: any[]) => data.map((i) => ({ ...i, isEdit: false })) }
)
console.log('useTable>>>>>', loading)
console.log('tableData>>>>>', tableData)
console.log('getTableData>>>>', getTableData)
console.log('pagination>>>>', pagination)

</script>

<style lang="scss" scoped>

</style>