<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/route'
import { generateRoutes } from './FuseData'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

// 检索数据源
const router = useRouter()
let searchPool = computed(() => {
  const filRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filRoutes)
})

/**
 * 搜索库相关
 */
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

const headerSearchSelectRef = ref(null)
const isShow = ref(false)
// 搜索栏展开
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

const search = ref('')
// 搜索结果
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
const onSelectChange = (val) => {
  router.push(val.path)
}
/**
 * 关闭search的处理事件
 */
const onClose = (event) => {
  if (
    event.target.className ===
      'el-select__selected-item el-select__placeholder is-transparent' ||
    event.target.tagName === 'SPAN'
  ) {
    return
  }

  // if (headerSearchSelectRef.value === event.target) {
  //   return
  // }
  // headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
/**
 * 监听search打开, 处理close事件
 */
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 处理国际化
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filRoutes)
  })
  initFuse(searchPool.value)
})
</script>

<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      id="guide-search"
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-select__wrapper {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
