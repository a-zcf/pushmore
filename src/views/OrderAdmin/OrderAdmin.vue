<template>
  <div class="order-admin">
        <ul>
          <li v-for="(item,index) in exchangeList" :key="index">
            <img class="order-img" src=""/>
            <div class="order-right">
              <p class="exchange-number">兑换数量：{{item.exchangeNum}}/份</p>
              <p class="rece-address">
                <span class="address">收货地址：{{item.adrress}}</span>
                <span class="state">{{item.status === '0'?'未发货':'已发货'}}</span>
              </p>
              <p class="shr-dhsj">收货人：{{item.name}}</p>
              <p class="shr-dhsj">兑换时间：{{item.exchangeTime}}</p>
            </div>
          </li>
          <van-divider v-if="exchangeList==''">暂无订单数据~~</van-divider>
        </ul>
  </div>
</template>

<script>
import {ExchangeList} from '../../api/api'
export default {
  name: "OrderAdmin",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      exchangeList: [],
    };
  },
  mounted() {
    this.postExchangeListData()
  },
  methods: {
    postExchangeListData(){
      this.$postRequest(ExchangeList).then(res => {
            if (res.data.code === '0000') {
              this.exchangeList = res.data.data.list
            }
      })
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style>
</style>