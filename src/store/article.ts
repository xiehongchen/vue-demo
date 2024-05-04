import { defineStore } from "pinia";

export const useArticle = defineStore('article', {
  state: () => ({
    info: {},
    articleNum: 0,
    projectNum: 0
  })
})