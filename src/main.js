import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Form from './components/form/Form.vue'
import Result from './components/result/Result.vue'
import page404NotFound from './components/errorPages/page404NotFound.vue'
import page500ServerError from './components/errorPages/page500ServerError.vue'
import translations from "./resources/translations"

Vue.use(VueI18n)
Vue.use(Vuelidate)
Vue.use(VueRouter)

Vue.config.formApiUrl = process.env.FORM_API_URL;

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations
})

const routes = [
  { path: '/', component: Form, name: 'Form' },
  { path: '/not-found', component: page404NotFound, name: 'NotFound' },
  { path: '/server-error', component: page404NotFound, name: 'ServerError' },
  { path: '/:hash', component: Result, name: 'Result' },
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  i18n,
  render: h => h(App),
  router
})
