import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import installElementPlus from '@/plugins/element'
import '@/styles/index.scss'
import '@/styles/update-element.scss'
import installIcons from '@/icons'
import '@/permission'
import i18n from '@/i18n'
import installFilter from '@/filters'
import installDirective from '@/directives'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
