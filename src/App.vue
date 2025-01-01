<template>
  <el-config-provider :locale="store.getters.language === 'en' ? en : zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useStore } from 'vuex'

const store = useStore()
</script>

<style></style>
