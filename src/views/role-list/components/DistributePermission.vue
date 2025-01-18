<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { pemissionList, rolePermission, distributePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

/**
 * 关闭
 */
const closed = () => {
  emit('update:modelValue', false)
}
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}
/**
 * 所有权限
 */
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await pemissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

/**
 * 属性结构配置
 */
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 获取当前用户角色的权限
const treeRef = ref(null)
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.roleDialogTitle')"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
