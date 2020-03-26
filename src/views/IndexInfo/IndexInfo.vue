<template>
  <div class="pushmore-index index-er">
    <div class="head">
      <img :src="userInfoData.headImg" />
      <div class="head-text">
        <p>
          <label>昵称：</label>
          <span>{{userInfoData.nickName}}</span>
        </p>
        <p>
          <label>ID：</label>
          <span>{{userInfoData.id}}</span>
        </p>
        <p>
          <label>推荐人：</label>
          <span>{{userInfoData.recommender}}</span>
        </p>
      </div>
    </div>

    <div class="active-area">
      <div class="area">
        <i class="iconfont icon-jiangli icon-i"></i>
        <span>目前剩余可兑换礼品数</span>
        <span class="right-text">{{activityInfoData.prize}}</span>
      </div>
      <div class="duihuan" :style="activityInfoData.prize <= 0 ?'background-color: #999;':'background-color: #ff6600;'" @click="exchangeRules">去兑换</div>
    </div>

    <div class="progress-bar">
      <p class="rank">发展人数{{activityInfoData.maxInvitees}}人</p>
      <ul>
        <li>
          <p class="award-progress">
            <span class="progress">领奖<br/>进度</span>
            <span class="horizontal-line" style="height:6px;">
              <i :class="eachAward == 0.25 || eachAward > 0.25?'line-ibgk':''" style="height:2px;"></i>
            </span>
          </p>
        </li>
        <li>
          <p class="bar-p">
            <span :class="eachAward == 0.25 || eachAward < 0.5 && eachAward > 0.25?'bar-span bgk-bar':'bar-span'">
              <i :class="eachAward == 0.25 || eachAward > 0.25?'iconfont icon-chenggong bar-spancolor':'iconfont icon-chenggong'"></i>
            </span>
            <span class="horizontal-line">
              <i :class="eachAward == 0.5 || eachAward > 0.5?'line-ibgk':''"></i>
            </span>
          </p>
          <p :class="eachAward == 0.25 || eachAward > 0.25?'bar-spancolor':''">正式1</p>
        </li>
        <li>
          <p class="bar-p">
            <span :class="eachAward == 0.5 || eachAward < 0.75 && eachAward > 0.5?'bar-span bgk-bar':'bar-span'">
              <i :class="eachAward == 0.5 || eachAward > 0.5?'iconfont icon-chenggong bar-spancolor':'iconfont icon-chenggong'"></i>
            </span>
            <span class="horizontal-line">
              <i :class="eachAward >= 0.75 || eachAward > 0.75 ?'line-ibgk':''"></i>
            </span>
          </p>
          <p :class="eachAward >= 0.5 || eachAward > 0.5?'bar-spancolor':''">正式2</p>
        </li>
        <li>
          <p class="bar-p">
            <span :class="eachAward == 0.75 || eachAward < 1 && eachAward > 0.75?'bar-span bgk-bar':'bar-span'">
              <i :class="eachAward == 0.75 || eachAward >0.75?'iconfont icon-chenggong bar-spancolor':'iconfont icon-chenggong'"></i>
            </span>
            <span class="horizontal-line">
              <i :class="eachAward >= 1 || eachAward > 1?'line-ibgk':''"></i>
            </span>
          </p>
          <p :class="eachAward >= 0.75 || eachAward > 0.75?'bar-spancolor':''">正式3</p>
        </li>
        <li>
          <p class="bar-p">
            <span :class="eachAward == 1 || eachAward > 1?'bar-span bgk-bar':'bar-span'">
              <i :class="eachAward == 1 || eachAward > 1?'iconfont icon-chenggong bar-spancolor':'iconfont icon-chenggong'"></i>
              </span>
          </p>
          <p :class="eachAward >= 1 || eachAward > 1?'bar-spancolor':''">正式4</p>
        </li>
        <li class="details" @click="myTeam">查看</li>
      </ul>
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
      <div class="list none-border" @click="orderManagement">
        <i class="iconfont icon-dingdan icon icon-right"></i>
        <span class="middle-text">订单管理</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
    </div>

    <div class="reminder">
      <i class="iconfont icon-jinggao reminder-icon"></i>
      <span>温馨提示：本活动含有烟草内客，十八岁以下人士请勿扫码参与！</span>
    </div>

   <div class="activity-rules-desc" v-show="hideshow">
      <h3>活动规则</h3>
      <p>1、本活动含有烟草内客：十八岁以下人士请勿扫码参与本活动含有烟草内客，十八岁以下人士请勿扫码参与！本活动含有烟草内客，十八岁以下人士请勿扫码参与！</p>
      <p>2、本活动含有烟草内客：十八岁以下人士请勿扫码参与本活动含有烟草内客，十八岁以下人士请勿扫码参与！本活动含有烟草内客，十八岁以下人士请勿扫码参与！</p>
    </div>

    <van-overlay :show="show2">
      <div class="exchange-rules">
        <h3 class="title">填写礼包数</h3>
        <p class="exchange-number">
          你当前可兑换礼包数：
          <span>{{activityInfoData.prize}}</span>
        </p>
        <div class="this-exchange">
          <span class="this-text">本次兑换：</span>
          <div class="stepper">
            <p class="strip">
              <van-stepper
                class="step"
                min="0"
                :value="stepValue"
                async-change
                @change="onChangeStep"
                :disable-plus="prohibitStep"
                disable-input
                @plus="stripPlus"
                @minus="stripMinus"
              />
              <span>条</span>
            </p>
            <p class="strip marg-top">
              <van-stepper
                class="step"
                min="0"
                :value="shareValue"
                async-change
                @change="onChangeShare"
                :disable-plus="prohibitShare"
                disable-input
                @plus="sharePlus"
                @minus="shareMinus"
              />
              <span>份</span>
            </p>
            <p></p>
          </div>
        </div>
        <div class="tips">
          <span class="tips-text">温馨提示：</span>
          <div>
            <p>1、成条兑换可得到额外奖励；</p>
            <p>2、1份礼品包2包品吸烟</p>
          </div>
        </div>
        <div class="but">
          <button class="butts bgkhui" @click="cancel">取消</button>
          <button class="butts bgkblue" @click="determine">确定</button>
        </div>
      </div>
    </van-overlay>

    <van-overlay :show="show3">
      <div class="exchange-rules">
        <i class="iconfont icon-guanbi guanbi" @click="guanbiBut"></i>
        <h3 class="title">信息确认</h3>
        <p class="exchange-number">
          你本次兑换明细：
          <span>{{stepValue}}条+{{shareValue}}份礼包</span>
        </p>
        <p class="exchange-number">填写邮寄信息：</p>
        <van-field v-model="name" type="text" label="收货人：" clearable placeholder="请输入收货人姓名" />
        <van-field v-model="phone" type="tel" label="号码：" clearable placeholder="请输入收货人号码" />
        <!-- <van-cell is-link>展示弹出层</van-cell> -->
        <van-field
          readonly
          clickable
          label="选择区域："
          :value="valueArea"
          placeholder="请选择所在地区"
          @click="showPopup"
        />
        <van-field
          v-model="adrress"
          type="text"
          label="详细地址："
          clearable
          placeholder="请输入详细地址（例如：街道门牌号等）"
        />
        <div class="but">
          <button class="butts bgkhui" @click="returnModify">返回修改</button>
          <button class="butts bgkblue" @click="postExhcangeData">确认提交</button>
        </div>
        <van-popup v-model="show1" position="bottom" close-on-click-overlay>
          <van-area
            :area-list="areaList"
            :columns-num="colNum"
            @cancel="cancelFn"
            @confirm="confirmFn"
            title="请选择区域"
            value="450000"
          />
        </van-popup>
      </div>
    </van-overlay>

    <van-overlay :show="show">
      <div class="prize-guidance">
        <h3>恭喜您！</h3>
        <p class="guidance-text">获得推多多活动资格</p>
        <p class="jinruhuodong">赶快《点击》进入活动领取奖品吧！</p>
      </div>
      <div class="close-but">
        <span class="iconfont icon-guanbi" @click="show = false"></span>
      </div>
    </van-overlay>

    <van-dialog v-model="show4" title="提示" show-confirm-button>
        <p class="is-complete">活动已完成，无需继续邀请，继续邀请不积累奖励!</p>
    </van-dialog>
  </div>
</template>

<script>
import AeraInfo from "../../utils/area";
import { IndexInfo, Exhcange, GetExchangeRule,MyCard, UpdateMyCard } from "../../api/api";
export default {
  name: "IndexInfo",
  data() {
    return {
      clearable: false,
      show: false, // 进入活动弹框
      show1: false, // 显示地区上拉框
      show2: false, // 兑换规则弹框
      show3: false, // 信息确提弹框
      show4: false, // 达到邀请数弹框
      colNum: 3, // 显示列数，3-省市区，2-省市，1-省
      closeOnClickOverlay: false, // 是否在点击遮罩层后关闭
      areaList: AeraInfo, //引用地区信息
      valueArea: "", //地区值
      arrArea: [], //存放地区数组
      activityId: "", // 活动Id
      active: 0,
      stepValue: 0, // 条烟值
      shareValue: 0, // 份烟值
      userInfoData: "",
      activityInfoData:{
        prize:0,
        rank:0,
        maxInvitees:0,
      },
      prohibitStep: true, // 隐藏加号按钮
      prohibitShare: true, // 隐藏加号按钮
      disabledinp: true,
      everyBarNeedBoxCount: 0, // 每条所需的份数
      exchangeNumForBar: 0, //----兑换条数
      exchangeNumForBox: 0, //----兑换份数
      name: "", // 收货人
      phone: "", // 号码
      adrress: "", // 地址
      docmHeight: document.documentElement.clientHeight || document.body.clientHeight,
      showHeight: document.documentElement.clientHeight || document.body.clientHeight,
      hideshow:true, //显示或者隐藏footer
      url:'', // 推荐码地址
      expiredTime: '',
      remainingTime:false,
      eachAward:0, // 进度
      timeExpired: 24*60*60
    };
  },
  watch: {
    //监听显示高度
   showHeight:function() {
     if(this.docmHeight > this.showHeight){
      //隐藏
       this.hideshow=false
     }else{
      //显示
       this.hideshow=true
     }
   }
 },
  mounted() {
    //监听事件
   window.onresize = ()=>{
     return(()=>{
       this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
   })()
   }
    this.activityId = this.$route.query.activityId;
    this.postIndexInfoData();
    this.getExchangeRuleData();
    this.tankuan();
    this.postMyCardData();
  },
  methods: {
    // 计步器条值
    onChangeStep: function(stepValue) {
      this.stepValue = stepValue;
    },
    // 计步器份值
    onChangeShare: function(shareValue) {
      this.shareValue = shareValue;
    },
    // 条加按钮
    stripPlus() {
      this.activityInfoData.prize =this.activityInfoData.prize - this.everyBarNeedBoxCount;
      if (
        this.activityInfoData.prize < this.everyBarNeedBoxCount ||
        this.activityInfoData.prize < 5
      ) {
        this.prohibitStep = true;
      } else {
        this.prohibitStep = false;
      }
      if (this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
      } else {
        this.prohibitShare = false;
      }
    },
    //条减按钮
    stripMinus() {
      this.activityInfoData.prize = this.activityInfoData.prize + this.everyBarNeedBoxCount;
      if (
        this.activityInfoData.prize < this.everyBarNeedBoxCount &&
        this.activityInfoData.prize < 5
      ) {
        this.prohibitStep = true;
      } else {
        this.prohibitStep = false;
      }
      if (this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
      } else {
        this.prohibitShare = false;
      }
    },
    // 份加按钮
    sharePlus() {
      this.activityInfoData.prize = this.activityInfoData.prize - 1;
      if (this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
      } else {
        this.prohibitShare = false;
      }
      if (
        this.activityInfoData.prize < this.everyBarNeedBoxCount ||
        this.activityInfoData.prize < 5
      ) {
        this.prohibitStep = true;
      } else {
        this.prohibitStep = false;
      }
    },
    // 份减按钮
    shareMinus() {
      this.activityInfoData.prize = this.activityInfoData.prize + 1;
      if (this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
      } else {
        this.prohibitShare = false;
      }
      if (
        this.activityInfoData.prize < this.everyBarNeedBoxCount &&
        this.activityInfoData.prize < 5
      ) {
        this.prohibitStep = true;
      } else {
        this.prohibitStep = false;
      }
    },
    // 关闭兑换弹框
    guanbiBut() {
      this.show3 = false,
        this.stepValue = 0, // 条
        this.shareValue = 0, // 份
        this.name = "",
        this.phone = "",
        this.valueArea = "",
        this.adrress = "",
        this.postIndexInfoData();
    },
    // 兑换
    postExhcangeData() {
      if (this.stepValue == 0 && this.shareValue == 0 || this.stepValue == '' && this.shareValue == '') {
        this.$toast("请选择兑换条数或份礼包数");
        return false;
      }
      if (this.name == "" || this.name == null) {
        this.$toast("请输入收货人名称！");
        return false;
      }
      if (this.phone == "" || this.phone == null) {
        this.$toast("请输入收货人号码！");
        return false;
      }
      if (this.valueArea == "" || this.valueArea == null) {
        this.$toast("请选择您的区域！");
        return false;
      }
      if (this.adrress == "" || this.adrress == null) {
        this.$toast("请输入的的详细地址（例如：街道及门牌号）！");
        return false;
      }
      let params = {
        activityId: this.activityId,
        exchangeNumForBar: this.stepValue, // 条
        exchangeNumForBox: this.shareValue, // 份
        name: this.name,
        phone: this.phone,
        adrress: this.valueArea + this.adrress
      };
      this.$postRequest(Exhcange, params).then(res => {
        if (res.data.code === "0000") {
          this.$toast.success(res.data.message);
          setTimeout(() => {
            this.show3 = false;
          }, 1000);
            this.stepValue = 0, // 条
            this.shareValue = 0, // 份
            this.name = "",
            this.phone = "",
            this.valueArea = "",
            this.adrress = ""
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    //计步器取消按钮
    cancel: function() {
      this.show2 = false;
      this.stepValue = 0, // 条
      this.shareValue = 0, // 份
      this.postIndexInfoData();
    },
    //计步器确定按钮
    determine: function() {
      this.show2 = false, 
      this.show3 = true;
    },
    // 计步器返回修改按钮
    returnModify: function() {
      this.show2 = true, 
      this.show3 = false;
    },

    // 首页数据
    postIndexInfoData: function() {
      this.$postRequest(IndexInfo, { activityId: this.activityId }).then(
        res => {
          if (res.data.code === "0000") {
            let userInfo = res.data.data.userInfo;
            let activityInfo = res.data.data.activityInfo;
            this.userInfoData = {
              id: userInfo.id,
              headImg: userInfo.headImg,
              nickName: userInfo.nickName,
              recommender: userInfo.recommender
            };
            this.activityInfoData = {
              prize: activityInfo.prize,
              rank: activityInfo.rank,
              invitees: activityInfo.invitees,
              maxInvitees: activityInfo.maxInvitees,
              everyAwardCount: activityInfo.everyAwardCount,
              isComplete: activityInfo.isComplete
            };
            this.eachAward =  this.activityInfoData.invitees / this.activityInfoData.everyAwardCount
            if(this.activityInfoData.isComplete == 1) {
                this.show4 = true
            }
            if (
              this.activityInfoData.prize < this.everyBarNeedBoxCount ||
              this.activityInfoData.prize < 5
            ) {
              this.prohibitStep = true;
            } else {
              this.prohibitStep = false;
            }
            if (this.activityInfoData.prize <= 0) {
              this.prohibitShare = true;
            } else {
              this.prohibitShare = false;
            }
          }
        }
      );
    },
   // 兑换规则
    getExchangeRuleData() {
      this.$getRequest(GetExchangeRule, { activityId: this.activityId }).then(
        res => {
          if (res.data.code === "0000") {
            this.everyBarNeedBoxCount = res.data.data.rule.everyBarNeedBoxCount;
          }
        }
      );
    },
    // 我的推荐码
    postMyCardData() {
         this.$postRequest(MyCard,{activityId:this.activityId}).then(res => {
           if (res.data.code == '0000') {
             this.url = res.data.data.code.url
             this.expiredTime = res.data.data.code.expiredTime
             if (this.expiredTime < this.timeExpired) {
               this.remainingTime = true
             } else {
                this.remainingTime = false
             }
           }
         })
       },
    // 更新名片
    postUpdateMyCard() {
       this.$postRequest(UpdateMyCard,{activityId:this.activityId}).then(res => {
        if (res.data.code == '0000') {
          this.$toast.success('名片更新成功！')
        } else {
          this.$toast.fail(res.data.message)
        }
       })
    },
    // 跳转我的团队
    myTeam() {
      this.$router.push({
        path: "/MyTeam",
        query: { activityId: this.activityId }
      });
    },
    // 跳转订单管理
    orderManagement() {
      this.$router.push({ path: "/OrderAdmin" });
    },
    // 跳转我的推广码
    myQrCode() {
      if(this.expiredTime < this.timeExpired) {
        this.postUpdateMyCard()
        this.$router.push(
          {
            path: "/MyQrCode",query: { url: this.url}
          });
        return false
      } else {
        this.$router.push(
          {
            path: "/MyQrCode",query: { url: this.url}
          });
      }
    },
    // 进入活动弹框显示
    tankuan() {
      this.show = false;
    },
    // 兑换规则提示框
    exchangeRules() {
      if(this.activityInfoData.prize <= 0) {
        this.show2 = false
      } else {
        this.show2 = true;
      }
    },
    // 显示地区
    showPopup() {
      this.show1 = true;
    },
    // 隐藏选择地区取消按钮
    cancelFn() {
      this.show1 = false;
    },
    // 选择地区确定按钮
    confirmFn(event) {
      this.show1 = false;
      this.arrArea = event;
      let addrInfo = event[0].name + "-" + event[1].name + "-" + event[2].name;
      this.valueArea = addrInfo;
    }
  }
};
</script>

<style >
</style>