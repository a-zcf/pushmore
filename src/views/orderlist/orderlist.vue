<template>
  <div class="orderlist">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" id="mescroll">
    <div class="slide">
      <div class="list">
          <ul>
              <li v-for="(item,index) in list" :key="index">
                <p class="left_right">
                 <span class="order_status">{{item.orderStatus===0?'未支付':'' || item.orderStatus===1?'处理中':'' || item.orderStatus===2?'已完成':''}}</span>
                 <span class="channel">{{item.channel}}</span>
                </p>
                <p>下单时间：{{item.createTime}}</p>
                <p>订单号：{{item.orderNo}}</p>
                <p class="order_address">地址：{{item.province+item.city+item.county+item.address}}</p>
                <p class="left1_right1">
                    <span class="consignee">收货人：{{item.consignee}}</span>
                    <span>收货人手机：{{item.phone}}</span>
                </p>
                <p class="left1_right1 memo_price">
                    <span class="memo">{{item.memo}}</span>
                    <span class="skuTotalPrice">￥{{item.skuTotalPrice}}</span>
                </p>
                <p class="more" @click="orderDetails(item.id)"><span>订单详情</span><van-icon class="arrow" name="arrow" /></p>
              </li>
          </ul>
      </div>
    </div>
    </mescroll-vue>
  </div>
</template>

<script>
import {orderList} from '../../api/api'
export default {
    name:'orderlist',
    data(){
        return{
          list:[],
          mescroll: null,
          mescrollDown: {
           use: false,
          },
          mescrollUp: {
            callback: this.upCallback,
            noMoreSize: 1,
            page: {
                num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                size: 10,//每页数据条数,默认10
                time : null // 加载第一页数据服务器返回的时间 (可空); 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
            },
            empty: {
                warpId: "mescroll",
                tip: '暂无相关数据',
            },
            htmlNodata: '<p class="upwarp-nodata">-- 已加载完 --</p>',
            htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>',
          }
        }
    },
    mounted(){
      this.mescroll.resetUpScroll();
    },
    methods:{
        mescrollInit (mescroll) {
            this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
        },
      upCallback(page,mescroll) {
        this.$getRequest(orderList,{pageNum:page.num,pageSize:page.size}).then(res => {
            if(res.data.code === 0){
                let arr = res.data.page.list
                if(page.num === 1) this.list = []
                this.list = this.list.concat(arr)
                this.$nextTick(() => {
                this.mescroll.endSuccess(arr.length);
              })
            }else{
            
            }
        })
      },
      orderDetails(id){
        this.$router.push({
            path:'/orderdetails',
            query:{id:id}
        })
      }
    }
}
</script>

<style scoped lang="less">
</style>