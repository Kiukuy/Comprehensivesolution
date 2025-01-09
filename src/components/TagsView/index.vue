<script setup>
import { useRoute } from 'vue-router'
import { CircleClose } from '@element-plus/icons-vue'
import { ref, reactive, watch } from 'vue'
import ContextMenu from './ContextMenu.vue'
import { useStore } from 'vuex'

const route = useRoute()
/**
 * 是否被选中
 */
const isActive = (tag) => tag.path === route.path

const store = useStore()
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}

// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})
// 展示menu
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

// 关闭tag菜单
const closeMenu = () => {
  visible.value = false
}
// 监听tag菜单
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
        background: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      v-for="(tag, index) of $store.getters.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <CircleClose
        class="el-icon-class"
        v-show="!isActive(tag)"
        @click.stop.prevent="onCloseClick(index)"
      />
    </router-link>
    <ContextMenu
      :style="menuStyle"
      :index="selectIndex"
      v-show="visible"
    ></ContextMenu>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &.first-of-type {
      margin-left: 15px;
    }
    &.last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close按钮
    .el-icon-class {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: -3.9px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cublic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
