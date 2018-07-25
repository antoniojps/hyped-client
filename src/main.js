import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import '@/assets/scss/dark-theme-chalk/src/index.scss'
import '@/assets/scss/styles.scss'
import '@/components'

Vue.config.productionTip = false

// plugins
Vue.use(Element)

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App),
}).$mount('#app')
