import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/store'
import router from './router/index'
import './utils/rem'
import './assets/icon/iconfont.css'
import { getRequest, postRequest } from './utils/request'
Vue.use(Vuex)

import { 
  Loading,
  List,
  Tab,
  Tabs,
  Overlay,
  Popup,
  Area,
  Field,
  Toast,
  Step, 
  Steps,
  Stepper,
  Dialog,
  Divider,
  Button,
  Swipe, 
  SwipeItem,
 } from 'vant';
Vue.use(Loading);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Overlay);
Vue.use(Popup);
Vue.use(Area);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Stepper);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.config.productionTip = false
Vue.prototype.$getRequest = getRequest // get请求
Vue.prototype.$postRequest = postRequest // post请求

router.beforeEach((to, from, next) => {
  // 路由发生改变修改页面的title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
