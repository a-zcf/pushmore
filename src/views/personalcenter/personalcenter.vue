<template>
  <div class="personalcenter">
    <div class="head">
      <img :src="userInof.headimgurl" />
      <p>
        <span><b>{{userInof.nickname}}</b></span>
        <i class="iconfont icon-xingbie"
        :style="userInof.sex===0 || userInof.sex===null||userInof.sex===1?'color:#0066cb;':''||
        userInof.sex===12?'color:#FFC0CB;':''">
        </i>
      </p>
    </div>
    <div class="myorderlist" @click="myOrderList">
      <van-icon name="records" class="records"/>
      <span class="myorderlist_text">我的订单列表</span>
      <van-icon name="arrow" />
    </div>
    <div class="myorderlist" @click="commodityAdmin">
      <van-icon  name="apps-o" class="apps-o"/>
      <span class="myorderlist_text">商品管理</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import {info} from '../../api/api'
export default {
  name:'personalcenter',
  data () {
      return {
       userInof:{
         id:0,
         openid:'',
         nickname:'',
         sex:12,
         headimgurl:''
       }
      }
  },
   mounted(){
    this.$getRequest(info).then(res => {
      if(res.data.code === 0){
        this.userInof = res.data.user
      }else{

      }
    })
 },
 methods:{
   myOrderList(){
     this.$router.push({
       path:'/orderlist'
     })
   },
   commodityAdmin(){
     this.$router.push({
       path:'/commodityadmin'
     })
   },
 }
}
</script>

<style>

</style>