<template>
  <div class="order-admin">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <img class="order-img" src="../../assets/img/libao.png"/>
            <div class="order-right">
              <p class="exchange-number">{{item.giftType==0?'获得'+item.name:item.name}}</p>
              <p class="rece-address">
                <span class="address">抽奖时间：{{item.scratchTime}}</span>
                <span class="state" v-if="item.status=='-2'" @click="noLottery(item.id)">未抽奖</span>
                <span class="state" v-if="item.status=='-1'" @click="clickReceive(item.url)">未领取</span>
                <span class="state" v-if="item.status=='0'">发放中</span>
                <span class="state" v-if="item.status=='1'">发放成功</span>
              </p>
           </div>
          </li>
          <van-divider v-if="list==''">暂无数据~~</van-divider>
        </ul>
  </div>
</template>

<script>
import {MyGiftList} from '../../api/api'
export default {
     name:'MyReward',
     data() {
         return{
           list:[],
         }
     },
     mounted(){
        this.getMyGiftListData();
     },
     methods:{
       getMyGiftListData() {
         this.$postRequest(MyGiftList).then(res => {
          if(res.data.code == '0000') {
            this.list = res.data.data.list
          }
         })
       },
       clickReceive(url){
          window.location.href = url
       },
       noLottery(id){
          this.$router.push({path: '/ExchangeSuccess',query:{giftId:id}})
       }
     }
}
</script>

<style>

</style>