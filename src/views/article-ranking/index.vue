<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.publicDate')">
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row)">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        v-model:page-size="size"
        v-model:current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据方法
const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watch([page, size], () => {
  getListData()
})
// 监听语言切换
watchSwitchLang(getListData)
// 处理数据不重新加载的问题
onActivated(getListData)

const onShowClick = (row) => {}
const onRemoveClick = (row) => {}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    justify-content: center;
    ::v-deep .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
        inset !important;
      &.is-focus {
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
      }
    }
  }
}
</style>
