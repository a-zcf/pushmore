import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/store'
import router from './router/index'
import MescrollVue from 'mescroll.js/mescroll'
import Qs from 'qs'
import './utils/rem'
import './assets/icon/iconfont.css'
import { getRequest, postRequest } from './utils/request'
Vue.use(Vuex)
Vue.component('mescroll-vue', MescrollVue)
import { 
  Button,
  Tabbar, 
  TabbarItem,
  NoticeBar,
  Tab, 
  Tabs,
  Swipe, 
  SwipeItem,
  Stepper,
  Icon,
  Popup,
  Toast,
  TreeSelect,
  Field,
  Area,
  Switch,
  Cell, 
  CellGroup,
  RadioGroup, 
  Radio,
  Checkbox, 
  CheckboxGroup,
  Dialog,
  Badge
} from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NoticeBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Stepper);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(TreeSelect);
Vue.use(Field);
Vue.use(Area);
Vue.use(Switch);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Dialog);
Vue.use(Badge);


Vue.config.productionTip = false
Vue.prototype.$getRequest = getRequest // get请求
Vue.prototype.$postRequest = postRequest // post请求
Vue.prototype.$qs = Qs

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
