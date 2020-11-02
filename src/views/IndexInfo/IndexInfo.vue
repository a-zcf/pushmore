<template>
  <div class="pushmore-index index-er">
    <div class="head">
      <img src="" />
      <div class="head-text">
        <p>
          <label>昵称：</label>
          <span>XXXXX</span>
        </p>
        <p>
          <label>ID：</label>
          <span>XXXXX</span>
        </p>
        <p>
          <label>推荐人：</label>
          <span>XXXXXX</span>
        </p>
      </div>
    </div>
    

    <div class="menu-list">
      <div class="list" @click="myTeam">
        <i class="iconfont icon-tuandui icon"></i>
        <span class="middle-text">我的团队</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
      <div class="list" @click="myQrCode">
        <i class="iconfont icon-two-dimensional-code icon icon-middle"></i>
        <i class="iconfont icon-AppIcon-copy card-circle"></i>
        <i class="iconfont icon-shouzhixuanzhong-copy card-finger"></i>
        <span class="middle-text">
          <span class="card">推广名片</span>
          <span v-show="remainingTime" class="remaining-time">(名片即将到期，请更新...)<i class="iconfont icon-dian-red remaining-icon"></i></span>
        </span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
      <!-- <div class="list none-border" @click="orderManagement">
        <i class="iconfont icon-dingdan icon icon-right"></i>
        <span class="middle-text">订单管理</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div> -->
      <div class="list none-border" @click="myReward">
        <i class="iconfont icon-jiangli icon icon-right"></i>
        <span class="middle-text">我的抽奖</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
    </div>

    <div class="reminder">
      <i class="iconfont icon-jinggao reminder-icon"></i>
      <span>温馨提示：本活动含有烟草内容，十八岁以下人士请勿扫码参与！</span>
    </div>

   <div class="activity-rules-desc" id="rules">
      <h3>活动规则</h3>
      <p>1、加入推多多团队：扫码好友推多多二维码名片，加入推多多活动；扫描活动规格二维码，激活推广资格，系统生成推多多名片，可将名片发放给好友邀请参与活动，参与越多，奖励越多。</p>
      <p>2、推多多奖励标准：将推荐人推广名片发放给好友扫描，邀请好友进入推多多活动系统。进入活动系统后，好友扫描活动规格“中支凌云、刘三姐”二维码，推荐人可获得一个正式成员，推荐人每发展四个正式成员，可获得精美礼品一份。</p>
      <p>3、推荐人仅能发展进入系统后，还没未扫描活动规格二维码的好友做为正式成员；每个成员有且仅有一个上级推荐人，成员绑定上级推荐人后不可更改；加入推多多活动系统后，扫描活动规格二维码成为正式成员，正式成员可自行发展自己团队获得相应奖励。</p>
      <p>4、进入推多多活动后，单规格推荐满40个正式成员，则该规格推多多活动结束。</p>
      <p>5、如系统有疑问，可微信留言或拨打4008792099客服热线垂询。</p>
    </div>
    
  </div>
</template>

<script>
import AeraInfo from "../../utils/area";
import {} from "../../api/api";
import wx from 'weixin-js-sdk'
export default {
  inject: ['reload'], // 引入方法
  name: "IndexInfo",
  data() {
    return {
      remainingTime:false,
    };
  },
  mounted() {
      let that = this
     // 解决input呼出键盘页面被顶起和压缩问题
    var hrt = document.documentElement.clientHeight;
      this.$nextTick(() => {
      document.getElementById('app').style.height= hrt+'px'
    })
  },
  methods: {
    // 跳转我的奖励
    myReward() {
      this.$router.push({ path: "/MyReward" });
    },
    // 跳转我的团队
    myTeam() {
      this.$router.push({
        path: "/MyTeam",
        query: {}
      });
    },
    // 跳转订单管理
    // orderManagement() {
    //   this.$router.push({ path: "/OrderAdmin" });
    // },
    // 跳转我的推广码
    myQrCode() {
      let that = this;
      that.$router.push({path: "/MyQrCode",query: {}});
    },
  },
  beforeDestroy(){
  }
};
</script>

<style >
</style>