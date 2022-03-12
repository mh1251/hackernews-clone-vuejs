import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import './icons.js'
import router from "./router/router.js";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(router)
Vue.config.productionTip = false
export const eventBus = new Vue();


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
