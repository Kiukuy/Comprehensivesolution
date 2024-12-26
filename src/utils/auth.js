import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from './storage'

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 请求时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 判断是否超时
 */
export function isCheckTimeout() {
  // 获得当前时间戳
  const currentTime = Date.now()
  // 获得保存的时间戳
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
