<script setup>
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() =>
  generateMenus(filterRoutes(router.getRoutes(router.getRoutes)))
)
console.log(routes.value)
</script>

<template>
  <!-- 一级menu菜单 -->
  <el-menu
    :uniqueOpened="true"
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
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
