import path from 'path'
/**
 * 返回所有子路由
 */

const getChildrenRoute = (routes) => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = routes => {
  const childernRoutes = getChildrenRoute(routes)
  return routes.filter(route => !childernRoutes.find(childernRoute => childernRoute.path === route.path))
}

/**
 * 判断数据是否为空值
 */
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes, basePath = '') {
  const result = []
  routes.forEach(item => {
    if (isNull(item.meta) && isNull(item.children)) return
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children, item.path))
      return
    }
    const routePath = path.resolve(basePath, item.path)
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
    }

    if (route.meta.icon && route.meta.title) {
      result.push(route)
    }

    if (item.children) {
      route.children.push(...generateMenus(item.children, routePath))
    }
  })
  return result
}
