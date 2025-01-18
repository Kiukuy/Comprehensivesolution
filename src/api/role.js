import request from '@/utils/request'

/**
 * 获取所有角色
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取所有权限
 */
export const pemissionList = () => {
  return request({
    url: '/permission/list'
  })
}

/**
 * 获取指定用户角色
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = roleId => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 为角色修改权限
 */
export const distributePermission = data => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
