<template>
  <el-table ref="tableRef" :data="options.data" v-loading="loading" 
    v-on="Object.assign({}, $attrs.events)" v-bind="Object.assign({}, $attrs.props)">
    <template v-for="column in options.columns">
      <!-- 操作 -->
      <el-table-column v-if="column.prop === 'action'" v-bind="column">
        <template v-for="button in column.actions" v-bind="column" #default="scope">
          <action-button :button="button" :scope="scope" @click="() => button.click(scope, tableRef)"></action-button>
        </template>
      </el-table-column>
      <!-- 有点击事件 -->
      <el-table-column v-else-if="isFunction(column.click)" v-bind="column">
        <template #default="{ row, col, index }">
          <el-button v-bind="Object.assign({}, column.props || {})" @click="column.click(row, col, index)">
            {{ isFunction(column.text) ? column.text(row, col, index) : column.text }}
          </el-button>
        </template>
      </el-table-column>
      <!-- 有插槽 -->
      <el-table-column v-else-if="column.slot" v-bind="column">
        <template #default="{ row, col, $index }">
          <slot :name="column.slot" :row="row" :col="col" :index="$index" :key="$index"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else v-bind="column"></el-table-column>
    </template>

  </el-table>
</template>

<script setup lang='ts'>
import { isFunction } from '@/utils/utils';

defineProps({
  options: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const tableRef = ref()
defineExpose({
  tableRef
})
</script>

<style scoped lang='scss'>

</style>