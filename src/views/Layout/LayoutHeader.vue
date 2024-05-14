<template>
  <div class="box flex flex-row-between">
    <div class="" @click="clickCollapsed">
      <MenuFoldOutlined style="font-size: 20px;" v-if="setting.collapsed" />
      <MenuUnfoldOutlined style="font-size: 20px;" v-else />
    </div>
    <div class="menu">
      <div v-for="item in menuRoutes" :key="item.path" @click="goRouter(item)" class="item flex-center"
        :class="item.path === route.path ? 'active' : ''">
        {{ item.meta?.title }}
      </div>
    </div>
    <div class="search flex-center">
      <SearchOutlined style="font-size: 20px;margin-right: 20px;" @click="goRouter({ path: '/search' })" />
      <SettingOutlined style="font-size: 20px;" @click="showDrawer" />

    </div>
    <a-drawer v-model:open="open" class="custom-class" root-class-name="root-class-name" :root-style="{ color: 'blue' }"
 title="设置" placement="right" @after-open-change="afterOpenChange">
      <div style="margin: 5px 0;">
        布局切换
        <a-switch v-model:checked="checked" checked-children="简洁" un-checked-children="盒子"  @change="changeLayout" />
      </div>
      <div style="margin: 5px 0;">
        主题样式
        <a-switch v-model:checked="checkedTheme" @change="changeTheme" />
      </div>
      <div style="margin: 5px 0;">
        文章目录
        <a-switch v-model:checked="checkedArticle" checked-children="左边" 
          un-checked-children="右边" @change="changeArticle" />
      </div>
     
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { menuRoutes } from '@/router/routes'
import { navigate } from '@/utils/navigate'
import { useRoute } from 'vue-router'
import { useSetting } from '@/store/setting'
import { layout, theme, articleLayout } from '@/enum/setting'
const setting = useSetting()
const route = useRoute()
const clickCollapsed = () => {
  setting.collapsed = !setting.collapsed
}
const goRouter = (value: any) => {
  navigate(value.path)
}
const checked = ref<boolean>(false)
const checkedTheme = ref<boolean>(false)
const checkedArticle = ref<boolean>(false)
const changeLayout = () => {
  if (setting.themeLayout === layout.BOX) {
    setting.themeLayout = layout.SIMPLE
  } else {
    setting.themeLayout = layout.BOX
  }
}
const changeTheme = () => {
  console.log(setting.theme)
  if (setting.theme === theme.DARK) {
    setting.changeTheme(theme.LIGHT)
  } else {
    setting.changeTheme(theme.DARK)
  }
}
const changeArticle = () => {
  if (setting.articleLayout === articleLayout.LEFT) {
    setting.articleLayout = articleLayout.RIGHT
  } else {
    setting.articleLayout = articleLayout.LEFT
  }
}
const open = ref<boolean>(false);

const afterOpenChange = (bool: boolean) => {
  console.log('open', bool);
};

const showDrawer = () => {
  open.value = true;
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;

  .item {
    padding: 0 20px;
    cursor: pointer;
    color: #FFF;
  }

  .active {
    color: red;
  }
}
</style>