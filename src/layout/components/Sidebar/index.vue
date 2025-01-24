<script setup>
import SidebarMenu from './SidebarMenu.vue'
import InTp from '@/icons/images/InTp.jpg'
const logoHeight = 44
</script>

<template>
  <div>
    <div class="logo-container">
      <el-avatar :size="logoHeight" shape="square" :src="InTp"></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">My-admin</h1>
    </div>
    <SidebarMenu></SidebarMenu>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
