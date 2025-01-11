<template>
  <el-config-provider :locale="store.getters.language === 'en' ? en : zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from './utils/i18n'

const store = useStore()
generateNewStyle(store.getters.mainColor).then((newCssStyle) => {
  writeNewStyle(newCssStyle)
})
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
