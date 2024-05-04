import { defineStore } from "pinia";

export const useArticle = defineStore('article', {
  state: () => ({
    info: {}
  })
})