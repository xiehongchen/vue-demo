<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel v-for="item, index in result" :key="index" :header="item.title">
      <div v-for="info in item.data" :key="info.title" @click="goDoc(info)">
        {{ info.title }}
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import data from '../data.json'
import { useRouter } from 'vue-router';
import { useArticle } from '@/store/article'
const article = useArticle()
const router = useRouter()
const temp = new Set(...data.map(item => item.category))
const array = Array.from(temp, title => ({ title, data: [] }))
console.log('123', temp, array)
const goDoc = (item: { title: string }) => {
  article.info = item
  router.push({ name: 'doc', params: { name: item.title } })
}
// const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const activeKey = ref(['1']);
interface Item {
    title: string;
    date: string;
    updateDate: string;
    tags: string[];
    summary: string;
    category: string[];
    image: string;
}

interface CategoryData {
    title: string;
    data: Item[];
}
const result: CategoryData[] = data.reduce<CategoryData[]>((acc, item) => {
    item.category.forEach(category => {
        const existingCategory = acc.find(c => c.title === category);
        if (existingCategory) {
            existingCategory.data.push(item);
        } else {
            acc.push({ title: category, data: [item] });
        }
    });
    return acc;
}, []);
</script>

<style lang="scss" scoped>
.ant-collapse {
  margin: 20px;
  :deep(.ant-collapse-content) {
    background: transparent;
  }
}
</style>