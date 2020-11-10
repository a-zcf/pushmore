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
          <span v-show="remainingTime" class="remaining-time"
            >(名片即将到期，请更新...)<i
              class="iconfont icon-dian-red remaining-icon"
            ></i
          ></span>
        </span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
      <div class="list none-border" @click="myReward">
        <i class="iconfont icon-jiangli icon icon-right"></i>
        <span class="middle-text">我的奖励</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
    </div>

    <div class="reminder">
      <i class="iconfont icon-jinggao reminder-icon"></i>
      <span>温馨提示：本活动含有烟草内容，十八岁以下人士请勿扫码参与！</span>
    </div>

    <div class="activity-rules-desc" id="rules">
      <h3>活动规则</h3>
      <p>
        1、加入推多多团队：扫码好友推多多二维码名片，加入推多多活动；扫描活动规格二维码，激活推广资格，系统生成推多多名片，可将名片发放给好友邀请参与活动，参与越多，奖励越多。
      </p>
      <p>
        2、推多多奖励标准：将推荐人推广名片发放给好友扫描，邀请好友进入推多多活动系统。进入活动系统后，好友扫描活动规格“中支凌云、刘三姐”二维码，推荐人可获得一个正式成员，推荐人每发展四个正式成员，可获得精美礼品一份。
      </p>
      <p>
        3、推荐人仅能发展进入系统后，还没未扫描活动规格二维码的好友做为正式成员；每个成员有且仅有一个上级推荐人，成员绑定上级推荐人后不可更改；加入推多多活动系统后，扫描活动规格二维码成为正式成员，正式成员可自行发展自己团队获得相应奖励。
      </p>
      <p>
        4、进入推多多活动后，单规格推荐满40个正式成员，则该规格推多多活动结束。
      </p>
      <p>5、如系统有疑问，可微信留言或拨打4008792099客服热线垂询。</p>
    </div>

    <van-overlay :show="show">
      <div class="show">
        <h3>绑定账号</h3>
        <div class="field">
          <van-field
            v-model="licenese"
            type="text"
            clearable
            label="许可证号"
            placeholder="请输入许可证号"
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

    <van-overlay :show="show1" @click="show = false" class="overlay">
      <div class="wrapper">
        <h3>恭喜您!</h3>
        <p class="p1">获得推多多活动资格</p>
        <p class="p2" @click="myReward">点击进入“我的奖励”领取龙币吧 》》</p>
      </div>
      <van-icon name="clear" class="clear" @click="clickClear" />
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
} from "../../api/api";
import wx from "weixin-js-sdk";
export default {
  name: "IndexInfo",
  data() {
    return {
      user: "",
      show: false,
      show1: false,
      show2: false,
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
    that.$getRequest(myUnreceiveAaward).then((res) => {
      if (res.data.code === 0) {
        if (res.data.countNum > 0) {
          that.show1 = true;
        } else {
          that.show1 = false;
        }
      }
    });
  },
  methods: {
    getUserInfo() {
      let that = this;
      that.$getRequest(userInfo).then((res) => {
        if (res.data.code === 0) {
          that.user = res.data.user;
          let {
            headimgurl,
            nickname,
            parentNick,
            tddCode,
            isbind,
            recommendUrl,
            recommendUrlTime,
            isable,
          } = res.data.user;
          that.headimgurl = headimgurl;
          that.nickname = nickname;
          that.tddCode = tddCode;
          that.parentNick = parentNick;
          if (isbind === "0") {
            that.show = true;
          } else {
            that.show = false;
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
        that.$toast("请输入正确的许可证号！");
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
    clickClear() {
      this.show1 = false;
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