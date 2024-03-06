<template>
  <BasicTable v-bind="table">
    <template #expand="{ row }">
      <el-table :data="row.platforms" border stripe style="padding: 10px; width: 100%">
        <el-table-column label="平台名称" prop="name" />
        <el-table-column label="平台编码" prop="code" />
      </el-table>
    </template>
    <template #status="{ row }">
      <el-tag :type="row.status == 1 ? 'info' : 'danger'">{{ statusEnum[row.status] }}
      </el-tag>
    </template>
  </BasicTable>
</template>

<script setup lang="ts">
import * as demoService from './data.ts'
const statusEnum: any = {
  0: "禁用",
  1: "启用",
};
const ChannelEnum: any = {
 sms: "短信通知",
 dingtalk: "钉钉通知",
 email: "邮件通知",
};

const table = reactive({
  //支持el-table的所有属性
  props: {},
  //支持el-table的所有事件
  events: {},

  loader: (queryForm: any, pagenation: any): any => demoService.queryPage(queryForm, pagenation),
  //过滤条件选项
  filterItems: [
    {
      label: "渠道类型",
      field: "channelType",
      uiType: "selector",
      props: { options: ChannelEnum },
    },
    {
      label: "启用状态",
      field: "status",
      uiType: "selector",
      props: { options: statusEnum },
    },
    {
      label: "创建时间",
      field: ["stratTime", "endTime"],
      uiType: "dateTimePicker",
      props: {
        type: "daterange",
      },
    },
  ],

  columns: [
    { type: "selection", label: "全选" },
    { type: "index", label: "序号" },
    { type: "expand", label: "使用平台" },
    { label: "渠道名称", key: "channelName" },

    {
      label: "通知方式",
      key: "channelType",
      formatter: (row: { channelType: string | number; }) => ChannelEnum[row.channelType],
    },
    {
      label: "密钥",
      text: "查看密钥",
      click: () => {
        ElMessage.success("查看密钥");
      },
    },
    { label: "启用状态", slot: "status" },
    { label: "创建时间", key: "createTime" },
    { label: "创建人", key: "createBy" },
    { label: "更新时间", key: "updateTime" },
    { label: "更新人", key: "updateBy" },
  ],
  toolbar: [
    {
      text: "新增消息渠道",
      click: () => {
        console.log('新增消息渠道')
      },
    },
    {
      text: "批量删除",
      click: (table: any) => {
        console.log('批量删除', table)
      },
    },
  ],
  actions: [
    {
      text: "编辑",
      props: { type: "warning" },
      click: () => {
        console.log('点击')
      },
    },
    {
      text: (row: { status: number; }) => (row.status == 1 ? "禁用" : "启用"),
      props: (row: { status: number; }) => (row.status == 1 ? { type: "danger" } : { type: "success" }),
      confirm: (row: { status: number; channelName: any; }) => `确定${row.status == 1 ? "禁用" : "启用"}${row.channelName}吗?`,
      click: () => {
        console.log('点击')
      },
    },
  ],
});
</script>

<style lang="scss" scoped>

</style>