import { isFunction } from "@/utils/utils"

export type FixedType = "left" | "right" | "none" | boolean;

export type ElColumnType = "selection" | "index" | "expand";

export type CustomColumnType = "text" | "action";

export type ColumnType = ElColumnType | CustomColumnType;

export type Action = {
  text: Function & string;
  click: Function;
} & {
  [key: string]: string;
};

export interface TColumn {
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

export type TableType = "VXE-TABLE" | "EL-TABLE";

export type TColumnConfig = {};

export const actionColumn: TColumn = {
  label: "操作",
  fixed: "right",
  type: "action",
  visiable: true,
  actions: [],
};

export const computedActionName = (button: Action, row: TColumn) => {
  return !isFunction(button.text)
    ? button.text
    : computed(() => button.text(row)).value?.replace(/\"/g, "");
};

const tableColumns = ref<Array<TColumn>>([]);

export const specificTypes = ["selection", "index", "expand"];

const calcColumnWidth = (columnsLength: number) => {
  if (columnsLength <= 6) return `${100 / columnsLength}%`;
  return `${12}%`;
};

const formatColumns = (columns: Array<TColumn>, actions: any[] = []) => {
  const hasAction = actions?.length > 0;

  actionColumn.actions = [...actions];

  const _columns = hasAction ? [...columns, actionColumn] : [...columns];

  const newColumns = [];

  for (let column of _columns) {
    column = Object.assign({}, column);

    if (column.visiable == false) {
      continue;
    }

    column.property = column.key || column.slot;
    column.align = column.align || "center";
    column.visiable = true;
    column.width = column.width || "auto" || calcColumnWidth(_columns.length);

    if (specificTypes.includes(column.type!)) {
      column.width = column.width || 60;
    }

    if (column.type === "expand") {
      column.slot = column.slot || "expand";
    }

    if (column.type === "action") {
      column.minWidth = 100;
      column.fixed = "right";
    }

    newColumns.push(column);
  }
  return newColumns;
};

const updateTableColumns = (columnSettings: any[]) => {
  if (columnSettings.length == 0) return false;

  const columnSettingMap = new Map();

  columnSettings.forEach((col) => columnSettingMap.set(col.field, col));

  tableColumns.value = tableColumns.value.map((col) => {
    const colSetting = columnSettingMap.get(col.key) || {};
    Object.keys(colSetting).forEach((key) => {
      if (key in col) {
        (col as {[key: string]: any})[key] = colSetting[key];
      }
    });
    return col;
  });

  return true;
};

export function useColumn(columns: Array<TColumn>, actions: any[]) {
  tableColumns.value = formatColumns(columns, actions);
  console.log("tableColumns", tableColumns);
  return {
    tableColumns,
    updateTableColumns,
    computedActionName,
  };
}
