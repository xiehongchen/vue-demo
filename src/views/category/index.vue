<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel v-for="item, index in cateList" :key="index" :header="item.title">
      <div v-for="info in item.data" :key="info.title" @click="goDoc(info)">
        {{ info.title }}
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import { cateList } from '../data.ts'
import { useRouter } from 'vue-router';
import { useArticle } from '@/store/article'
const article = useArticle()
const router = useRouter()
const goDoc = (item: { title: string }) => {
  article.info = item
  router.push({ name: 'doc', params: { name: item.title } })
}
// const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const activeKey = ref(['1']);
</script>

<style lang="scss" scoped>
.ant-collapse {
  margin: 20px;
  :deep(.ant-collapse-content) {
    background: transparent;
  }
}
</style>