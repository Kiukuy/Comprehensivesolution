import { ref } from 'vue'
import Sortable from 'sortablejs'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

// 排序相关
export const tableRef = ref(null)

/**
 * 初始化排序
 */
export const initSortable = (tableData, cb) => {
  // 设置拖拽效果
  // 1.要拖拽的元素
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper > .el-scrollbar > .el-scrollbar__wrap > .el-scrollbar__view > table > tbody'
  )[0]
  // 2.配置对象
  Sortable.create(el, {
    // 拖拽时类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      // 修改数据
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success({
        message: i18n.global.t('msg.article.sortSuccess'),
        type: 'success'
      })
      tableData.value = []
      cb && cb()
    }
  })
}
