// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Container, Main, Form, FormItem, Input, Menu, MenuItem, Submenu, Dialog, Radio,
  RadioGroup, RadioButton, Select, Message, Dropdown, DropdownItem, DropdownMenu, Notification,
  DatePicker, MessageBox, Pagination, Loading, Tabs, TabPane} from 'element-ui'
import './assets/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
/*
* development
* */
// axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://localhost:8081/api/v1/'
/*
* product
* */
axios.defaults.withCredentials = false
axios.defaults.baseURL = 'http://thawne.pythonanywhere.com/api/v1/'

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
Vue.config.productionTip = false
locale.use(lang)
Vue.use(VueAxios, axios)
Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Select)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$load = Loading
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
