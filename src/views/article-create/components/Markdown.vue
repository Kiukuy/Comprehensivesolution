<script setup>
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

// Editor实例
let mkEditor
// 处理离开页面切换语言导致dom无法获取
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})
watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

const store = useStore()
// 初始化mkEditor
const initEditor = () => {
  mkEditor = new MkEditor({
    // 实例
    el,
    // 高度
    height: '500px',
    // 样式
    previewStyle: 'vertical',
    // 语言
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 创建文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  mkEditor.reset()
  emits('onSuccess')
}

// 编辑相关
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
