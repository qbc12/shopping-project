import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import TypeNav from './components/TypeNav/index.vue'
import Carousel from './components/Carousel/index.vue'
import Pagination from './components/Pagination/index.vue'
import store from './store/index'
import './mock/mockServe.js'
import "swiper/css/swiper.css";
import * as API from '@/api'
import { Button, MessageBox } from 'element-ui'
import VueLazyload from 'vue-lazyload'
import dota from './assets/lei.png'
import './plugins/validate'


Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: dota,
})
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
Vue.component(Button.name, Button)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')

