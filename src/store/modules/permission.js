import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRouters(context, menu) {
      const routes = []
      // 路由权限分配
      menu.forEach((key) => {
        // 权限名与路由的name匹配
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      // 最后添加不匹配路由进入404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
