<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown :title="title" :detail="detail" @onSuccess="onSuccess" />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor :title="title" :detail="detail" @onSuccess="onSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { articleDetail } from '@/api/article'
import { useRoute } from 'vue-router'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
}

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}

if (articleId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
  ::v-deep .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset !important;
    &.is-focus {
      box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
    }
  }
}
</style>
