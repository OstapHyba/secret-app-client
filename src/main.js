import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Form from './components/form/Form.vue'
import Result from './components/result/Result.vue'
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

const Test = { template: '<h1>test</h1>' }

const routes = [
  { path: '/', component: Form, name: 'Form' },
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
