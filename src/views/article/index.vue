<template>
  <div class="flex box">
    <div class="info flex-column flex-row-center flex-col-center">
      <div class="flex flex-col-center">
        <CalendarFilled style="font-size: 15px" />
        <!-- 创建时间 -->
        <div class="m-5">{{ info.date }}</div>
        <EditFilled style="font-size: 15px" />
        <!-- 更新时间 -->
        <div class="m-5">{{ info.updateDate }}</div>
      </div>
      <div class="flex flex-col-center">
        <TagFilled style="font-size: 15px" />
        <!-- 标签 -->
        <div class="m-5" v-for="tag in info.tags" :key="tag">{{ tag }}</div>
        <AppstoreFilled style="font-size: 15px" />
        <!-- 分类 -->
        <div class="m-5" v-for="cate in info.category" :key="cate">{{ cate }}</div>
      </div>
    </div>
  </div>
  <MdPreview class="preview" :modelValue="state.text" :editorId="state.id" />
  <MdCatalog class="catelog" :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup lang="ts">
import { CalendarFilled, TagFilled, AppstoreFilled, EditFilled } from '@ant-design/icons-vue'
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { useRoute } from "vue-router";
import { useArticle } from '@/store/article'
const article = useArticle()
console.log('article', article.info)
const info: any = article.info
const route = useRoute();
const currentName: ComputedRef = computed(() => {
  return route.params.name;
});

export type Themes = 'light' | 'dark';
const state = reactive({
  theme: "dark" as Themes,
  text: '',
  id: "editor",
});
watchEffect(() => {
  if (route.path.startsWith("/doc/")) {
    // import(/* @vite-ignore */ "/markdown/" + currentName.value + ".md?raw")
    //   .then((e) => {
    //     console.log('e', e)
    //     state.text = e.default;
    //   })
    //   .catch((error) => {
    //     console.log('error', error)
    //   });
    // 前缀
    let prefix = "/";
    if (process.env.NODE_ENV === 'production') {
      prefix = "/vue-demo" + prefix;
    }
    const mrk = new Request(prefix + currentName.value + ".md");
    fetch(mrk)
      .then((response) => {
        console.log('response', response)
        return response.text();
      })
      .then((text) => {
        console.log('text', text)
        state.text = text.replace(/---[\s\S]*?---/, '')
      });
  }
});

const scrollElement = document.documentElement;
</script>
<style lang="scss" scoped>
.box {
  width: calc(100% - 200px);
  box-sizing: border-box;
  padding: 10px 20px;
  .info {
    margin: 0 auto;
    color: #FFF;
    font-size: 20px;
    width: 80%;
    padding: 10px 20px;
    .m-5 {
      margin: 5px 20px 5px 10px;
    }
  }
}

:deep(.md-editor-preview-wrapper) {
  display: flex;
  justify-content: center;
  width: calc(100% - 200px);

  .md-editor-preview {
    background-color: #FFF;
    width: 70%;
    padding: 20px;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
}
.preview  {
  background: transparent;
}

.catelog {
  position: fixed;
  background-color: #FFF;
  right: 0;
  top: 200px;
  width: 200px;
  padding: 20px;
  height: 80%;
  overflow: auto;
}

</style>
