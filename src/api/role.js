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
