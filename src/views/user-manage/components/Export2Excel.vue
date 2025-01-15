<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { getUserManageAllList } from '@/api/user-manage'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filters'

defineProps({
  modelValue: {
    type: Boolean,
    requried: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
 * 指定默认文件名
 */
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

/**
 * 关闭
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}
/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 数据
  const allUser = (await getUserManageAllList()).list
  const data = formatJson(USER_RELATIONS, allUser)
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据(二维数组结构)
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
  closed()
}
// 将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间处理
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
::v-deep .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset !important;
  &.is-focus {
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
  }
}
</style>
