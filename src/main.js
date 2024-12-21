import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './style/index.scss'
import './style/update-element.scss'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
