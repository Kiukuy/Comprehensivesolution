import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加icode
    config.headers.icode = 'helloqianduanxunlianying'
    // 添加header
    if (store.getters.token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('Token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    // 根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理token超时问题
    if (error.response && error.response.data && error.response.data === 401) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误消息
    return Promise.reject(error)
  }
)

export default service
