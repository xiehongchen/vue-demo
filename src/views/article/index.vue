<template>
  <MdPreview :modelValue="state.text" :editorId="state.id" />
  <MdCatalog
    :editorId="state.id"
    :scrollElement="scrollElement"
    :theme="state.theme"
  />
</template>

<script setup lang="ts">
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { useRoute } from "vue-router";
const route = useRoute();
const currentName: ComputedRef = computed(() => {
  return route.params.name;
});

export type Themes = 'light' | 'dark';
const state = reactive({
  theme: "dark" as Themes, 
  text: '',
  id: "my-editor",
});
watchEffect(() => {
  if (route.path.startsWith("/doc/")) {
    // import(/* @vite-ignore */ "../markdown/" + currentName.value + ".md?raw")
    //   .then((e) => {
    //     state.text = e.default;
    //   })
    //   .catch(() => {});
    const mrk = new Request("../markdown/" + currentName.value + ".md");
    console.log('mrk', mrk)
    fetch(mrk)
      .then((response) => {
        console.log('response', response)
        return response.text();
      })
      .then((text) => {
        console.log('text', text)
        state.text = text;
      });
  }
});

const scrollElement = document.documentElement;
</script>
<style lang="scss" scoped>
:deep(.md-editor-preview-wrapper) {
  display: flex;
  justify-content: center;
  width: calc(100% - 200px);

  .md-editor-preview {
    width: 60%;
  }
}

.md-editor-catalog-dark {
  position: fixed;
  right: 0;
  top: 0;
  width: 200px;
  padding: 20px;
  height: 80%;
  overflow: auto;
}
</style>
