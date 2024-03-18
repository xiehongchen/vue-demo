<template>
  <div>
    <test></test>
  </div>
</template>

<script setup lang='ts'>
console.log('父组件-----setup')
onMounted(() => {
  console.log('父组件----mounted')
})
// import usePagination from '@/hooks/usePagination'
// import { getPersonList } from '@/apis'

// const { pagination, setTotal, changeCurrent, changePageSize } = usePagination(
//   () => (pagin: any) => getPersonList({ current: pagin.page, pageSize: pagin.size }))
</script>

<style scoped lang='scss'>

</style>