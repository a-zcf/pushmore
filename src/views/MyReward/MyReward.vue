<template>
  <div class="order-admin">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <img class="order-img" src="../../assets/img/libao.png"/>
            <div class="order-right">
              <p class="exchange-number">
                {{item.giftType=='0'?'获得' + item.name : item.name}}
              </p>
              <p class="rece-address">
                <span class="address">抽奖时间：{{item.scratchTime}}</span>
                <span class="state" @click="item.status=='-2' || item.status=='-1' ? noLottery(item.id,item.status):'' || item.status=='0' || item.status=='1'?releaseStatus(item.url,item.giftType,item.status):''">
                  {{item.status=='-2'?'未抽奖':'' || item.status=='-1'?'未领取':'' || item.status=='0'?'发放中':'' || item.status=='1'?'发放成功':''}}
                </span>
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
       releaseStatus(url,giftType,status){
         if(giftType=='0' && status=='0' || giftType=='0' && status=='1'){
           this.$dialog.alert({title: '提示', message: '请到微信服务通知查看红包领取状态',confirmButtonText:'确定'});
         }else{
           window.location.href = url
         }
       },
       noLottery(id,status){
          this.$router.push({path: '/ExchangeSuccess',query:{giftId:id,status:status}})
       }
     }
}
</script>

<style>

</style>