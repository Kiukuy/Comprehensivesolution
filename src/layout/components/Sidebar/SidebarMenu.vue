<script setup>
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  console.log(generateMenus(filterRouters(router.getRoutes())))
  return generateMenus(filterRouters(router.getRoutes()))
})
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<template>
  <!-- 一级menu菜单 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <!-- 子集菜单 -->
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<style lang="scss" scoped></style>
