<template>
  <div class="table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tableData: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>

</style>