<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
// 生成数组数据
const breadcrumData = ref([])
const getBreadcrumData = () => {
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumData()
  },
  { immediate: true }
)

// 处理点击事件
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 将来需要进行主体替换
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumData"
        :key="item.path"
      >
        <span v-if="index === breadcrumData.length - 1" class="no-redirect">{{
          generateTitle(item.meta.title)
        }}</span>
        <span v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
