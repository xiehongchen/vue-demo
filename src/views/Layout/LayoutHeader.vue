<template>
  <div class="box flex flex-row-between">
    <div class="" @click="clickCollapsed">
      <MenuFoldOutlined v-if="setting.collapsed" />
      <MenuUnfoldOutlined v-else />
    </div>
    <div class="menu">
      <div v-for="item in menuRoutes" :key="item.path" @click="goRouter(item)" class="item flex-center"
        :class="item.path === route.path ? 'active' : ''">
        {{ item.meta?.title }}
      </div>
    </div>
    <div class="search">头部</div>
  </div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { menuRoutes } from '@/router/routes'
import { navigate } from '@/utils/navigate'
import { useRoute } from 'vue-router'
import { useSetting } from '@/store/setting'
const setting = useSetting()
const route = useRoute()
const clickCollapsed = () => {
  setting.collapsed = !setting.collapsed
}
const goRouter = (value: any) => {
  navigate(value.path)
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;

  .item {
    padding: 0 20px;
    cursor: pointer;
  }

  .active {
    color: red;
  }
}
</style>