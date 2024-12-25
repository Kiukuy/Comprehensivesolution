import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户资料，则需要获取
      if (!store.getters.hasUserInfo) {
        // 触发获取用户资料的action
        await store.dispatch('user/getUserInfo')
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
