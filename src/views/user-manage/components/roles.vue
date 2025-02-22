<script setup>
import { roleList, userRoles } from '@/api/role'
import { updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue', 'updateRole'])

// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)

// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)

/**
 * 关闭
 */
const closed = () => {
  emit('update:modelValue', false)
}
/**
 * 确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  // 处理数据结构
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })

  await updateRole(props.userId, roles)
  closed()
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 角色更新成功
  emit('updateRole')
}
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" @click="onConfirm">{{
        $t('msg.universal.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
