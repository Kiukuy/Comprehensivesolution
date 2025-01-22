import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户资料，则需要获取
      if (!store.getters.hasUserInfo) {
        // 触发获取用户资料的action
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的权限
        const filterRouters = await store.dispatch(
          'permission/filterRouters',
          permission.menus
        )
        // 利用addRoute循环添加
        filterRouters.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由后，需要进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
