import request from '@/utils/request'

/**
 * 获取项目功能
 */
export const features = () => {
  return request({
    url: '/user/feature'
  })
}
/**
 * 获取项目章节
 */
export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
