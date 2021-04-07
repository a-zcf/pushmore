<template>
  <div class="orderdetails">
    <div class="head_address">
      <van-icon name="map-marked" class="map_marked" />
      <div class="address_text">
        <p class="consignee_p1">
          <span class="consignee">
          收货人：{{order.consignee}}
          </span></p>
        <p class="consignee_p1">电话：{{order.phone}}</p>
        <p class="consignee_p2">收货地址：{{order.province+order.city+order.county+order.address}}</p>
      </div>
    </div>
    <div class="detaillist">
      <ul>
        <li v-for="(item,index) in detaillist" :key="index">
          <img :src="item.spuImg"/>
          <div class="detaillist_cont">
            <p class="skuTitle">{{item.skuTitle}}</p>
            <p class="price_num"><span class="price">￥{{item.price}}</span><span class="num">x{{item.num}}</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="skuTotalPrice">
      <p>订单总额：<b>￥{{order.skuTotalPrice}}</b></p>
      <p>支付总额：<b>￥{{order.actualPrice}}</b></p>
    </div>
    <div class="order_information">
      <h3>订单信息</h3>
      <p><span class="left">订单号：</span><span class="right">{{order.orderNo}}</span></p>
      <p><span class="left">支付状态：</span><span class="right">{{order.orderStatus===0?'未支付':'' || order.orderStatus===1?'处理中':'' || order.orderStatus===2?'已完成':''}}</span></p>
      <p><span class="left">下单提示：</span><span class="right">{{order.memo}}</span></p>
      <p><span class="left">下单时间：</span><span class="right">{{order.createTime}}</span></p>
    </div>
  </div>
</template>

<script>
import {orderDetail} from '../../api/api'
export default {
  name:'orderdetails',
  data(){
      return{
        order:{
            orderNo:'', // 订单号
            orderStatus: 0,//0未支付 1、处理中 2已完成
            skuTotalPrice: 0,//订单总额
            actualPrice: 0,//支付总额
            province: "",//省份
            city: "",//市区
            county: "",//区县
            address: "",//详细地址
            memo: "",//下单提示
            consignee: "",//收货人
            phone: "",//收货人手机
            createTime: "",
        },
        detaillist:[],
      }
  },
  mounted(){
    let id = this.$route.query.id
    this.$getRequest(orderDetail,{id:id}).then(res => {
        if(res.data.code === 0){
          this.order = res.data.order
          this.detaillist = this.order.detaillist
        }
    })
  },
  methods:{
      
  }
}
</script>

<style>

</style>