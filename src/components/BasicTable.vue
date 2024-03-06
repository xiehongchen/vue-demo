<template>
  <div>
    <BasicTable ref="tableRef" :data="data" :isLoading="loading" :tableHeight="height" :columns="columns"></BasicTable>
  </div>
</template>

<script setup lang="ts">
import BasicTable from '@/components/Table/index.vue'

export interface Action {
  text: string | Function;
  click: (row: any, table: any) => {};
  props: any;
}

export interface IProps {
  loader: Function | Array<any>;
  filterItems?: any[];
  columns: any[];
  actions?: Action[];
  toolbar?: Action[];
  tableHeight?: string;
  props?: any;
  events?: any;
}


const loading = ref(false)
const height = ref(400)
const columns = reactive([
{ type: "selection", label: "全选" },
    { type: "index", label: "序号" },
    { type: "expand", label: "使用平台" },
    { label: "渠道名称", prop: "channelName" },
    {
      label: "通知方式",
      prop: "channelType"
    },
    {
      label: "密钥",
      text: "查看密钥",
      click: () => {
        ElMessage.success("查看密钥");
      },
    },
    { label: "启用状态", slot: "status" },
    { label: "创建时间", prop: "createTime" },
    { label: "创建人", prop: "createBy" },
    { label: "更新时间", prop: "updateTime" },
    { label: "更新人", prop: "updateBy" },
])
const data = reactive([
{
   id: 1,
   channelType: "sms",
   channelName: "阿里短信通知",
   platforms: '',
   status: 1,
   createTime: "2021-09-07 00:52:15",
   updateTime: "2021-11-07 00:52:15",
   createBy: "vshen",
   updateBy: "vshen",
   ext: {
     url: "https://sms.aliyun.com",
     account: "vshen",
     password: "vshen57",
     sign: "signVhsen123124",
   },
 },
 {
   id: 2,
   channelType: "dingtalk",
   channelName: "预警消息钉钉通知",
   platforms: '',
   status: 1,
   createTime: "2021-11-10 00:52:15",
   updateTime: "2021-11-07 00:52:15",
   createBy: "vshen",
   updateBy: "vshen",
   ext: {
     accessType: "webhook",
     address: "https://dingtalk.aliyun.com",
   },
 },
 {
   id: 3,
   channelType: "email",
   channelName: "预警消息邮件通知",
   platforms: '',
   status: 0,
   ext: {
     host: "https://smpt.aliyun.com",
     account: "vshen@qq.com",
     password: "vshen@360.com",
   },
   createTime: "2021-11-07 00:52:15",
   updateTime: "2021-11-07 00:52:15",
   createBy: "vshen",
   updateBy: "vshen",
 },
])
</script>

<style lang="scss" scoped>

</style>