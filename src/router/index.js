import Vue from 'vue'
import Router from 'vue-router'

const IndexInfo = () => import ('@/views/IndexInfo/IndexInfo')
const OrderAdmin = () => import ('@/views/OrderAdmin/OrderAdmin')
const MyReward = () => import ('@/views/MyReward/MyReward')
const MyTeam = () => import ('@/views/MyTeam/MyTeam')
const MyQrCode = () => import ('@/views/MyQrCode/MyQrCode')
const ExchangeSuccess = () => import ('@/views/ExchangeSuccess/ExchangeSuccess')

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', name: 'IndexInfo', component: IndexInfo, meta: {title: '广西区内推多多首页'}},
    {path: '/OrderAdmin', name: 'OrderAdmin', component: OrderAdmin, meta: {title: '订单管理'}},
    {path: '/MyTeam', name: 'MyTeam', component: MyTeam, meta: {title: '我的团队'}},
    {path: '/MyQrCode', name: 'MyQrCode', component: MyQrCode, meta: {title: '我的推广码'}},
    {path: '/MyReward', name: 'MyReward', component: MyReward, meta: {title: '我的奖励'}},
    {path: '/ExchangeSuccess', name: 'ExchangeSuccess', component: ExchangeSuccess, meta: {title: ''}},
  ]
})
