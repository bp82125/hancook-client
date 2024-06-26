import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vue-search-select/dist/VueSearchSelect.css'
import 'vue-select/dist/vue-select.css'
import '../node_modules/flowbite-vue/dist/index.css'
import { VueFire } from 'vuefire'
import { firebaseApp } from '@/plugins/firebase'
import VueLazyLoad from 'vue3-lazyload'
import 'flowbite'

import VueApexCharts from 'vue3-apexcharts'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueLazyLoad)
app.use(VueApexCharts)
app.use(Toast)
app.use(VueFire, {
  firebaseApp,
  modules: []
})
app.use(VueSidebarMenu)
app.use(VueCookies, {
  expires: '2h'
})

app.mount('#app')
