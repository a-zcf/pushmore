<template>
  <div class="pushmore-index index-er">
    <div class="head">
      <img :src="headimgurl != '' ? headimgurl : headless" />
      <div class="head-text" v-if="user != ''">
        <p>
          <label>昵称：</label>
          <span>{{ nickname }}</span>
        </p>
        <p>
          <label>ID：</label>
          <span>{{ tddCode }}</span>
        </p>
        <p>
          <label>推荐人：</label>
          <span>{{ parentNick != null ? parentNick : "暂无推荐人" }}</span>
        </p>
      </div>
      <h3 v-else>登录</h3>
    </div>

    <div class="menu-list">
      <div class="list" @click="myTeam">
        <i class="iconfont icontuandui icon"></i>
        <span class="middle-text">我的团队</span>
        <i class="iconfont icongengduo icon-more"></i>
      </div>
      <div class="list" @click="myQrCode">
        <i class="iconfont icontwo-dimensional-code icon icon-middle"></i>
        <i class="iconfont iconAppIcon-copy card-circle"></i>
        <i class="iconfont iconshouzhixuanzhong-copy card-finger"></i>
        <span class="middle-text">
          <span class="card">推广名片</span>
          <span v-show="remainingTime" class="remaining-time"
            >(名片即将到期，请更新...)<i
              class="iconfont icondian-red remaining-icon"
            ></i
          ></span>
        </span>
        <i class="iconfont icongengduo icon-more"></i>
      </div>
      <div class="list none-border" @click="myReward">
        <i class="iconfont iconjiangli icon icon-right"></i>
        <span class="middle-text">我的奖励</span>
        <i class="iconfont icongengduo icon-more"></i>
      </div>
      <div class="list none-border" @click="pointsMall">
        <i class="iconfont iconjifenshangcheng- icon icon-right" :style="'color:#fc5566'"></i>
        <span class="middle-text">龙币商城</span>
        <i class="iconfont icongengduo icon-more"></i>
      </div>
    </div>

    <div class="reminder">
      <i class="iconfont iconjinggao reminder-icon"></i>
      <span>温馨提示：本活动含有烟草内容，十八岁以下人士请勿扫码参与！</span>
    </div>

    <div class="activity-rules-desc" id="rules">
      <h3>活动规则</h3>
      <p>
        1、如何加入团队：被邀请人扫描推荐人的推广名片后，即可加入推荐人的团队，参与到“寻找龙的传人”推广活动中。被邀请人进入活动主页，点击“推广名片”，即可生成自己的推广名片，将推广名片发放给好友邀请加入自己团队，推荐的越多，奖励的越多。
      </p>
      <p>
        2、活动奖励标准：每推荐一个用户扫描推广名片加入到团队，推荐人和被邀请者可各获得50龙币奖励。
      </p>
      <p>
        3、龙币的领取和使用：领取龙币需扫描真龙包装盒二维码，成为真龙会员后，即可领取龙币，龙币领取有效期为发放即日起1个月内，累计龙币到“龙币商城”兑换相应礼品。
      </p>
      <p>
        4、每个成员有且仅有一个上级推荐人，成员绑定上级推荐人后不可更改，正式成员可自行发展自己团队获得相应奖励。
      </p>
      <p>5、加入活动后，推荐满30个成员后，“寻找龙的传人”活动自动结束。</p>
      <p>6、如系统有疑问，可咨询“真龙”微信在线客服或拨打4008792099客服热线</p>
    </div>

    <van-overlay :show="show">
      <div class="show">
        <h3>绑定账号</h3>
        <div class="field">
          <van-field
            v-model="licenese"
            type="text"
            clearable
            label="客户编码"
            placeholder="请输入客户编码"
          />
        </div>
        <div class="show-but">
          <button class="but" @click="clickClose">关闭</button>
          <button class="but" @click="submitBindRecomend" :disabled="isDisable">
            确定
          </button>
        </div>
      </div>
    </van-overlay>

    <van-dialog
      v-model="show2"
      title="提示"
      cancel-button-text="退出"
      confirm-button-text="继续"
      show-cancel-button
      class="dialog"
      @cancel="clickClose"
    >
      <p class="con">您已达到活动邀请用户限制30个，活动已结束</p>
    </van-dialog>

    <van-overlay :show="show3" @click="show3 = false" class="overlay">
      <div class="wrapper first">
        <h3>恭喜您！</h3>
        <p class="p1" >{{isfirstin === '1'?'成功加入“寻找龙的传人”活动':'获得活动推广奖励'}}</p>
        <p class="p3">
          <span class="jinbi">获得</span>
          <span class="jinbi size">+{{totalScore}}</span>
          <span>奖励</span>
          </p>
         <button class="first-but" @click="receiveTotalScore">领取</button>
      </div>
      <van-icon name="clear" class="clear" @click="clickClear" />
    </van-overlay>
    <van-overlay :show="show5" @click="show5 = false" class="overlay">
      <div class="wrapper">
        <h3>您还不是积分会员！</h3>
        <p class="p1 p-font">龙币领取失败!为您保留一个月的领取有效期，超期未领取，视为自动放弃。</p>
        <p class="p2" @click="clickPointsmall">赶快扫描烟盒码，完成会员注册吧！</p>
      </div>
      <van-icon name="clear" class="clear" @click="clickClear"/>
    </van-overlay>
  </div>
</template>

<script>
import AeraInfo from "../../utils/area";
import {
  userInfo,
  bindRecomend,
  myCard,
  updateMyCard,
  myUnreceiveAaward,
  checkMember,
  getAwardsAll
} from "../../api/api";
import wx from "weixin-js-sdk";
export default {
  name: "IndexInfo",
  data() {
    return {
      user: "",
      show: false,
      show2: false,
      show3: false,
      show5: false,
      headimgurl: "",
      nickname: "",
      tddCode: "",
      parentNick: "",
      headless: require("../../assets/img/Headless.png"),
      licenese: "",
      url: "",
      expiredTime: "",
      remainingTime: false,
      timeExpired: 24 * 60 * 60, // 计算名片过期时间
      isDisable: false,
      totalScore:"",
      isfirstin:"",
      pointsMallUrl:"",
      userUrl:"",
    };
  },
  mounted() {
    let that = this;
    that.getUserInfo();
    that.$getRequest(myCard).then((res) => {
      if (res.data.code === 0) {
        that.url = res.data.url;
        that.expiredTime = res.data.expiredTime;
        if (that.expiredTime < that.timeExpired) {
          that.remainingTime = true;
        } else {
          that.remainingTime = false;
        }
      }
    });
    
  },
  methods: {
    getUserInfo() {
      let that = this;
      that.$getRequest(userInfo).then((res) => {
        if (res.data.code === 0) {
          let {
            headimgurl,
            nickname,
            parentNick,
            tddCode,
            isbind,
            recommendUrl,
            recommendUrlTime,
            isable,
            isfirstin
          } = res.data.user;
          if (isbind === "0") {
            that.show = true;
          } else {
            that.show = false;
            that.user = res.data.user;
            that.userUrl = res.data.url;
            that.headimgurl = headimgurl;
            that.nickname = nickname;
            that.tddCode = tddCode;
            that.parentNick = parentNick;
            that.isfirstin = isfirstin;
            if(isfirstin === "0"){
              that.getMyUnreceiveAaward()
            }else if(isfirstin === "1"){
              that.getMyUnreceiveAaward()
            }else{
              
            }
          }
          if (isable === 0) {
            that.show2 = true;
          } else {
            that.show2 = false;
          }
        } else {
        }
      });
    },
    // 绑定
    submitBindRecomend() {
      let that = this;
      if (
        that.licenese === "" ||
        typeof that.licenese === undefined ||
        that.licenese === null
      ) {
        that.$toast("请输入正确的客户编码！");
        return;
      }
      let params = {
        licenese: that.licenese,
      };
      that.isDisable = true;
      that.$postRequest(bindRecomend, params).then((res) => {
        setTimeout(() => {
          that.isDisable = false;
        }, 2000);
        if (res.data.code === 0) {
          that.$toast.success("绑定成功！");
          that.show = false;
          that.licenese = "";
          that.getUserInfo();
        } else {
          that.$toast.fail(res.data.msg);
        }
      });
    },
    getMyUnreceiveAaward(){
      let that = this
      that.$getRequest(myUnreceiveAaward).then((res) => {
        if (res.data.code === 0) {
          if (res.data.countNum > 0) {
            that.totalScore = res.data.totalScore
            that.show3 = true;
          } else {
            that.show3 = false;
          }
        }
      });
    },
    // 领取全部金币
    receiveTotalScore(){
      let that = this
      that.isDisable = true;
      that.$getRequest(checkMember).then( res => {
        setTimeout(() => {
          that.isDisable = false;
        }, 2000);
        if(res.data.code === 0){
            that.$getRequest(getAwardsAll).then( res => {
              if(res.data.code === 0){
                that.$toast.success('领取成功！');
                that.show3 = false
              }else{
                that.$toast.fail(res.data.msg);
              }
            })
        }else if(res.data.code === 105){
            that.pointsMallUrl = res.data.url
            that.show5 = true
        }else{

        }
      })
    },
    clickClear() {
      this.show3 = false;
      this.show5 = false;
    },
    // 重定向积分商城
      clickPointsmall(){
        window.location.href = this.pointsMallUrl
      },
    //关闭绑定框
    clickClose() {
      wx.closeWindow();
    },
    // 跳转我的奖励
    myReward() {
      this.$router.push({ path: "/MyReward" });
    },
    // 跳转我的团队
    myTeam() {
      this.$router.push({
        path: "/MyTeam",
      });
    },
    // 跳转我的团队
    pointsMall() {
      window.location.href = this.userUrl
    },
    // 跳转我的推广码
    myQrCode() {
      let that = this;
      if (that.expiredTime < that.timeExpired) {
        that.$postRequest(updateMyCard).then((res) => {
          if (res.data.code === 0) {
            that.$toast.success("名片更新成功！");
            that.$router.push({ path: "/MyQrCode", query: { url: that.url } });
          } else {
            that.$toast.fail(res.data.message);
          }
        });
      } else {
        that.$router.push({
          path: "/MyQrCode",
          query: { url: that.url },
        });
      }
    },
  },
  beforeDestroy() {},
};
</script>

<style >
</style>