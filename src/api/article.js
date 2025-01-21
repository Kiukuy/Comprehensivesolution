import request from '@/utils/request'

/**
 * 获取列表数据
 */
export const getArticleList = (params) => {
  return request({
    url: '/article/list',
    params
  })
}
