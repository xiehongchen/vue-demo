import { defineStore } from "pinia";
import { layout, theme } from '@/enum/setting'

export const useSetting = defineStore('setting', {
  state: () => ({
    collapsed: false,
    themeLayout: layout.BOX,
    theme: theme.LIGHT
  }),
  actions: {
    // 先删除之前的主题，再赋值新主题
    changeTheme (newTheme: theme) {
      document.documentElement.classList.remove(this.theme)
      this.theme = newTheme
      document.documentElement.classList.add(newTheme)
    }
  }
})