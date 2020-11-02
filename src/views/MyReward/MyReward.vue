<template>
  <div class="order-admin">
        <ul>
          <li>
            <img class="order-img" src="../../assets/img/libao.png"/>
            <div class="order-right">
              <p class="exchange-number">
                恭喜获得+28龙币
              </p>
              <p class="rece-address">
                <span class="address">抽奖时间：2020-11-02 11:30:30</span>
                <span class="state">
                  已领取
                </span>
              </p>
           </div>
          </li>
          <!-- <van-divider v-if="list==''">暂无数据~~</van-divider> -->
        </ul>
  </div>
</template>

<script>
import {} from '../../api/api'
export default {
     name:'MyReward',
     data() {
         return{

         }
     },
     mounted(){
     },
     methods:{
     }
}
</script>

<style>

</style>