import Vue from 'vue'
import Router from 'vue-router'

const IndexInfo = () => import ('@/views/IndexInfo/IndexInfo')
const NonConformity = () => import ('@/views/NonConformity/NonConformity')
const OrderAdmin = () => import ('@/views/OrderAdmin/OrderAdmin')
const MyTeam = () => import ('@/views/MyTeam/MyTeam')
const Transition = () => import ('@/views/Transition/Transition')
const MyQrCode = () => import ('@/views/MyQrCode/MyQrCode')

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', name: 'Transition', component: Transition, meta: {title: '推多多'}},
    {path: '/IndexInfo', name: 'IndexInfo', component: IndexInfo, meta: {title: '推多多首页'}},
    {path: '/NonConformity', name: 'NonConformity', component: NonConformity, meta: {title: '不符合对象'}},
    {path: '/OrderAdmin', name: 'OrderAdmin', component: OrderAdmin, meta: {title: '订单管理'}},
    {path: '/MyTeam', name: 'MyTeam', component: MyTeam, meta: {title: '我的团队'}},
    {path: '/MyQrCode', name: 'MyQrCode', component: MyQrCode, meta: {title: '我的推广码'}},
  ]
})
