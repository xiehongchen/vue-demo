import { defineStore } from "pinia";

export const useSetting = defineStore('setting', {
  state: () => ({
    collapsed: true
  })
})