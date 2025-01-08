const whiteList = ['/login', 'import', '/404', '401']

/**
 * path是否需要被缓存
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
