<template>
  <el-popconfirm v-if="confirmProps" v-bind="confirmProps" @confirm="handleConfirm(button, props.scope)">
      <template #reference>
          <el-button v-bind="buttonProps">
              {{ computedActionName(button, props.scope.row) }}
          </el-button>
      </template>
  </el-popconfirm>
  <el-button v-else v-bind="buttonProps" @click="handleConfirm(button, props.scope)">
      {{ computedActionName(button, props.scope.row) }}
  </el-button>
</template>
<script setup lang="ts">
import { Action, TColumn } from "./TableColumns";
import { isFunction, isString, isObject } from "@/utils/utils";

const props = withDefaults(
  defineProps<{ button: Action; scope: { row: any; col: any; $index: number } }>(),
  {}
);

const buttonProps = computed(() => {
  let customeProps: any = props.button.props || {};

  return Object.assign(
      {
          marginRight: "10px",
          type: "primary",
          size: "small",
      },
      isFunction(customeProps) ? customeProps(props.scope.row) : customeProps
  );
});

// 气泡确认框
const confirmProps = computed(() => {
  const propsConfirm: any = props.button.confirm;
  if (propsConfirm === undefined) {
      return false;
  }

  if (!isString(propsConfirm) && !isObject(propsConfirm) && !isFunction(propsConfirm)) {
      console.error("confirmProps 类型错误");
      return {};
  }

  if (isString(propsConfirm)) {
      return {
          title: propsConfirm,
      };
  }

  if (isFunction(propsConfirm)) {
      const res = propsConfirm(props.scope.row);
      if (isObject(res)) {
          return res;
      }
      if (isString(res)) {
          return {
              title: res,
          };
      }
  }

  if (isObject(propsConfirm) && propsConfirm.title !== undefined) {
      return isFunction(propsConfirm.title)
          ? {
              ...propsConfirm,
              title: propsConfirm.title(props.scope.row),
          }
          : propsConfirm;
  }
  console.error("confirmProps 类型错误");
});

const emits = defineEmits(["click"]);

const handleConfirm = (button: { click: any; }, _scope: any) => {
  if (isFunction(button.click)) {
      emits("click");
  }
};

const computedActionName = (button: Action, row: TColumn) => {
  return !isFunction(button.text)
      ? button.text
      : computed(() => button.text(row)).value?.replace(/\"/g, "");
};
</script>
