import SvgIcon from '@/components/SvgIcon'

// 通过 require.context()函数来创建自己的context
const svgRequire = require.context('./svg', false, /\.svg$/)

// 返回一个require函数，可以接受以恶搞request的参数，用于require的导入

svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
