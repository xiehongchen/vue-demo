<template>
  <div class="page">
    <div class="search-box">
      <a-input-search
        v-model:value="searchValue"
        style="width: 200px;"
        @search="onSearch"
      />
    </div>
    <div class="result-box">
      <div v-for="item in resultList" :key="item.title" @click="goDoc(item)">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { list } from '../data.ts'
import { useRouter } from 'vue-router';
import { useArticle } from '@/store/article'
const article = useArticle()

const router = useRouter()
const goDoc = (item: { title: string }) => {
  article.info = item
  router.push({ name: 'doc', params: { name: item.title } })
}
const searchValue = ref('')
const resultList = ref<any[]>([])
const onSearch = () => {
  console.log('value', searchValue.value)
  resultList.value = list.filter(item => {
    return item.title.includes(searchValue.value)
  }) as any
  console.log('image.png', resultList.value)
}

</script>

<style lang="scss" scoped>
.page {
  .result-box {
    padding-top: 20px;
    min-height: 200px;
  }
}
</style>