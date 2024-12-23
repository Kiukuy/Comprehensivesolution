/**
 * 保存localStorage
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除localStorage
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有localStorage
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
