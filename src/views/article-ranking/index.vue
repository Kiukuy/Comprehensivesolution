<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :label="item.label"
          :prop="item.prop"
          :key="index"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template v-else-if="item.prop === 'action'" #default="{ row }">
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
import { ref, onActivated, watch, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

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

// 表格拖拽相关
onMounted(() => {
  initSortable(tableData, getListData)
})

const i18n = useI18n()
const router = useRouter()
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}
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

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
