import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      next('/')
    } else {
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
