import { watchSwitchLang } from '@/utils/i18n'
import getDynamicData from './DynamicData'
import { watch, ref } from 'vue'

// 暴露出动态列表数据
export const dynamicData = ref(getDynamicData())

// 监听语言的变化
watchSwitchLang(() => {
  // 重新获取国际化值
  dynamicData.value = getDynamicData()
  // 重新处理被勾选的列数据
  initSelectDynamicLabel()
})

// 创建被勾选的动态列数据
export const selectDynamicLabel = ref([])
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// 声明table的列数据
export const tableColumns = ref([])
// 监听选中项的变化，根据选中项动态改变 table列数据的值
watch(
  selectDynamicLabel,
  (val) => {
    tableColumns.value = []
    // 遍历选中项
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
