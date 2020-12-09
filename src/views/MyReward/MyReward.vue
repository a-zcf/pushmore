<template>
  <div class="order-admin">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" id="mescroll">
    <ul class="order-list">
      <li v-for="(item,index) in list" :key="index">
        <div class="left">
          <span class="left-top">
            {{item.awardsType === '1'?'加入活动获得':''||item.awardsType === '2'?'推荐扫码获得':''||item.awardsType === '3'?'绑定成为顶级推主获得':''}}+{{item.prizeName}}
            </span>
          <span class="left-bottom">{{item.createTime}}</span>
        </div>
        <button class="right" @click="clickReceive(item.id,item.status)" :style="item.status=='0'?'background-color: #ff6600;':'background-color:#00cc99'">{{item.status=='0'?'点击领取':'已领取'}}</button>
      </li>
    </ul>
    </mescroll-vue>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <h3>恭喜您！</h3>
        <p class="p1">成功领取龙币</p>
        <p class="p2" @click="clickPointsmall">赶快进入龙币商城兑换商品吧 》》</p>
      </div>
      <van-icon name="clear" class="clear" @click="clickClear"/>
    </van-overlay>
    <van-overlay :show="show1" @click="show1 = false">
      <div class="wrapper">
        <h3>您还不是积分会员！</h3>
        <p class="p1">领取龙币失败</p>
        <p class="p2" @click="clickPointsmall">为你保留一个月的有效时间，赶快前往注册会员吧 》》</p>
      </div>
      <van-icon name="clear" class="clear" @click="clickClear"/>
    </van-overlay>
  </div>
</template>

<script>
import { myAarwordsList,checkMember,getAwards } from "../../api/api";
export default {
  name: "MyReward",
  data() {
    return {
      show:false,
      show1:false,
      url:'',
      list:[],
      mescroll: null,
      mescrollDown: {
        use: false,
      },
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 1,
        page: {
            num: 0, 
            size: 10,
            time: null
        },
        empty: {
            warpId: "mescroll",
            tip: '暂无相关数据',
        },
        htmlNodata: '<p class="upwarp-nodata">-- 已加载完 --</p>',
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>',
      }
    };
  },
  mounted() {
    let that = this
    that.mescroll.resetUpScroll();
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback(page,mescroll) {
        this.$getRequest(myAarwordsList,{pageNum:page.num,pageSize:page.size}).then(res => {
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
      clickReceive(id,status){
        let that = this
        if(status === "0"){
          that.$getRequest(checkMember).then( res => {
            if(res.data.code === 0){
               that.$getRequest(getAwards,{id:id}).then( res => {
                 if(res.data.code === 0){
                   that.url = res.data.url
                   that.show = true
                   that.mescroll.resetUpScroll();
                 }else{
                   that.$toast.fail(res.data.msg);
                 }
               })
            }else if(res.data.code === 105){
              that.url = res.data.url
              that.show1 = true
            }else{
              
            }
          })
        }else{
          that.$dialog.alert({
            message: '您好！您已领取了该奖励！',
            theme: 'round-button',
          }).then(() => {
          });
        }
      },
      clickClear(){
        this.show = false
        this.show1 = false
      },
      // 重定向积分商城
      clickPointsmall(){
        window.location.href = this.url 
      }
  },
};
</script>

<style>
</style>