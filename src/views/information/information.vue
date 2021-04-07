<template>
  <div class="information">
     <div class="head">
       <img :src="shopInfo.headImg"/>
       <div class="head_con">
         <p class="head_title">{{shopInfo.supplierName}}</p>
         <!-- <p class="head_km">
           <van-icon name="location-o" />
           <span>1.2km</span>
         </p> -->
       </div>
     </div>
     <div class="business_address">
       <span class="address_left">商家地址：</span>
       <span class="address_cont">{{shopInfo.address}}</span>
       <span class="iconfont icon-daohang_huabanfuben address_right" @click="daoHang"></span>
     </div>
     <div class="business_phone">
       <p class="phone"><span>商家电话：</span><a :href="'tel:' + shopInfo.phone"><span>{{shopInfo.phone}}</span><van-icon name="phone-o" class="phone_right"/></a></p>
       <!-- <p class="business_hours">
         <span>营业时间：</span>
         <span>08:00-21:00</span>
       </p> -->
     </div>
  </div>
</template>

<script>
import {shopInfo} from '../../api/api'
export default {
  name:'information',
  data () {
      return {
          img:require('../../assets/img/head-1.png'),
          shopInfo:{
           id:0,
           address:'',
           headImg:'',
           lat:'',
           lnt:'',
           licence:'',
           licenceImg:'',
           payImg:'',
           phone:'',
           supplierName:'',
          },
          supplierId:''
      }
  },
  mounted(){
    let that = this
    that.supplierId = window.localStorage.getItem('supplierId')
    this.$getRequest(shopInfo,{id:that.supplierId}).then(res => {
      if(res.data.code === 0){
        this.shopInfo = res.data.shopInfo
      }else{

      }
    })
  },
  methods:{
    daoHang(){
      window.location.href = 'http://api.map.baidu.com/marker?location='+this.shopInfo.lat+','+this.shopInfo.lnt+ '&title=' +this.shopInfo.supplierName+'&content='+this.shopInfo.address+'&output=html'
    }
  }
}
</script>

<style>

</style>