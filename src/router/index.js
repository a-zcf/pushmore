import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import ('@/views/index/index');
const Cart = () => import ('@/views/cart/cart');
const Information = () => import ('@/views/information/information');
const PersonalCenter = () => import ('@/views/personalcenter/personalcenter');
const Details = () => import ('@/views/waredetails/waredetails');
const Orderconfirm = () => import ('@/views/orderconfirm/orderconfirm');
const Addresslist = () => import ('@/views/addresslist/addresslist');
const Newaddress = () => import ('@/views/newaddress/newaddress');
const Addressedit = () => import ('@/views/addressedit/addressedit');
const Generateorder = () => import ('@/views/generateorder/generateorder');
const Orderlist = () => import ('@/views/orderlist/orderlist');
const Orderdetails = () => import ('@/views/orderdetails/orderdetails');
const Commodityadmin = () => import ('@/views/commodityadmin/commodityadmin');

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', name: 'index', component: Index, meta: {title: '首页',navShow: true}},
    {path: '/cart', name: 'cart', component: Cart, meta: {title: '购物车',navShow: true}},
    {path: '/information', name: 'information', component: Information, meta: {title: '商家信息',navShow: true}},
    {path: '/personalcenter', name: 'personalcenter', component: PersonalCenter, meta: {title: '个人中心',navShow: true}},
    {path: '/waredetails', name: 'waredetails', component: Details, meta: {title: '商品详情'}},
    {path: '/orderconfirm', name: 'orderconfirm', component: Orderconfirm, meta: {title: '确认订单',keepAlive: false}},
    {path: '/addresslist', name: 'addresslist', component: Addresslist, meta: {title: '收货地址',keepAlive: false}},
    {path: '/newaddress', name: 'newaddress', component: Newaddress, meta: {title: '新增地址',keepAlive: false}},
    {path: '/addressedit', name: 'addressedit', component: Addressedit, meta: {title: '编辑地址',keepAlive: false}},
    {path: '/generateorder', name: 'generateorder', component: Generateorder, meta: {title: '生成订单'}},
    {path: '/orderlist', name: 'orderlist', component: Orderlist, meta: {title: '用户订单列表'}},
    {path: '/orderdetails', name: 'orderdetails', component: Orderdetails, meta: {title: '订单详情'}},
    {path: '/commodityadmin', name: 'commodityadmin', component: Commodityadmin, meta: {title: '商品管理'}},
  ]
})
