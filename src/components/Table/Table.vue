<template>
  <el-table ref="tableInstance" :data="props.data" :loading="props.isLoading" v-on="Object.assign({}, $attrs.events)"
    v-bind="Object.assign(
      {
        tableLayout: 'auto',
        maxHeight: `${props.tableHeight}px`,
        border: true,
        stripe: true,
        resizable: true,
        key: Date.now(), //不配置key会存在数据更新页面不更新
      },
      $attrs.props || {}
    )
      ">
    <template v-for="column in props.columns">
      <!-- 操作 -->
      <el-table-column v-if="column.type == 'action'" v-bind="column" #default="scope">
        <template v-for="button in column.actions">
          <action-button :button="button" :scope="scope" @click="() => button.click(scope, exposeObject)">
          </action-button>
        </template>
      </el-table-column>
      <el-table-column v-else-if="isFunction(column.click)" v-bind="column">
        <template #default="{ row, col, index }">
          <el-button v-bind="Object.assign({ type: 'primary', size: 'small' }, column.props || {})"
            @click="column.click && column.click(row, col, index)">
            {{
              isFunction(column.text)
              ? (typeof column.text === 'function' ? column.text(row, col, index) : column.text)
              : column.text ?? (column.key && row[column.key])
            }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column v-else-if="column.slot" v-bind="column">
        <template #default="{ row, col, $index }">
          <slot :name="column.slot" :row="row" :col="col" :index="$index" :key="$index">
              </slot>
        </template>
      </el-table-column>

      <el-table-column v-else v-bind="column"> </el-table-column>
    </template>
  </el-table>
</template>
<script setup lang="ts">
import { isFunction } from "@/utils/utils";
import ActionButton from "./ActionButton.vue";
import { TableInstance } from "element-plus";
import { toValue } from "vue";

type FixedType = "left" | "right" | "none" | boolean;
type Action = {
  text: Function & string;
  click: Function;
} & {
  [key: string]: string;
};

interface TColumn {
  props: {};
  label: string; // 列标题 可以是函数或字符串，根据需要在页面上显示在列
  key?: string;
  property?: string; // 列的属性, 如果没有指定，则使用列名称 如果是函数
  slot?: string;
  align?: string;
  width?: number | string; // 列宽度 可选参数，默认为100 可以是整数或浮点数，但不
  minWidth?: number | string; // 最小列宽度 可选参数，默认为10 可以是整数或浮点
  fixed?: FixedType; // 列宽对齐方式 left right none 默认为left 可选参数，表示对齐方
  type?: string;
  actions?: any[];
  visiable?: boolean;
  click?: Function;
  text?: Function | string;
}
export interface Props {
  columns?: TColumn[];
  actions?: Action[];
  data?: any;
  isLoading: boolean;
  tableHeight: number;
 }

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  actions:()=>[],
  data: () => [],
  tableHeight: 200,
  isLoading: false,
});

const emit = defineEmits(["refresh"]);

const refresh = () => {
  emit("refresh");
};

const tableInstance = ref<TableInstance>();

const exposeObject: any = reactive({
  instance: tableInstance,
  refresh,
  selectionRows: toValue(computed(() => tableInstance.value?.getSelectionRows())),
});

defineExpose(exposeObject);
</script>
