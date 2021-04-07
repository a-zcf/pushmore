<template>
  <div class="generateorder">
      <div class="success_icon">
          <van-icon name="checked" class="checked"/>
          <p>恭喜您！生成订单成功！</p>
      </div>
      <div class="order_code">
        <img :src="url" />
        <p>请扫上面二维码支付</p>
      </div>
      <p class="order_number">订单号：{{orderNo}}</p>
  </div>
</template>

<script>
export default {
  name:'generateorder',
  data(){
      return{
        orderNo:'',
        url:'',
      }
  },
  mounted(){
    this.orderNo = this.$route.query.orderNo
    this.url = this.$route.query.url
  },
  methods:{

  }
}
</script>

<style>

</style>