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
        <span>目前可兑换礼品数</span>
        <span class="right-text">{{activityInfoData.prize}}</span>
      </div>
      <div class="duihuan" @click="exchangeRules">去兑换</div>
    </div>

    <div class="progress-bar">
      <ul>
        <li>
          <p class="li-p"><span :class="activityInfoData.maxInvitees <= 10 || activityInfoData.maxInvitees > 10?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'" ></span><span class="iconfont icon-hengxian1"></span></p>
          <p>正式1</p>
        </li>
        <li>
          <p class="li-p"><span :class="activityInfoData.maxInvitees == 20 || activityInfoData.maxInvitees > 20?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'" ></span><span class="iconfont icon-hengxian1"></span></p>
          <p>正式2</p>
        </li>
        <li>
          <p class="li-p"><span :class="activityInfoData.maxInvitees == 30 || activityInfoData.maxInvitees >30?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'" ></span><span class="iconfont icon-hengxian1"></span></p>
          <p>正式3</p>
        </li>
        <li>
          <p class="li-p"><span :class="activityInfoData.maxInvitees == 40?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'" ></span></p>
          <p>正式4</p>
        </li>
      </ul>
      <!-- <van-steps :active="active" active-icon="passed" inactive-icon="passed" active-color="#38f">
        <van-step>领奖进度</van-step>
        <van-step>正式1</van-step>
        <van-step>正式2</van-step>
        <van-step>正式3</van-step>
        <van-step>正式4</van-step>
      </van-steps> -->
    </div>

    <div class="menu-list">
      <div class="list" @click="myTeam">
        <i class="iconfont icon-tuandui icon"></i>
        <span class="middle-text">我的团队</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
      <div class="list">
        <i class="iconfont icon-two-dimensional-code icon icon-middle"></i>
        <span class="middle-text">推广名片</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
      <div class="list none-border" @click="orderManagement">
        <i class="iconfont icon-dingdan icon icon-right"></i>
        <span class="middle-text">订单管理</span>
        <i class="iconfont icon-gengduo icon-more"></i>
      </div>
    </div>

    <div class="activity-rules-desc">
      <h3>活动规则</h3>
      <p>1、本活动含有烟草内客：十八岁以下人士请勿扫码参与本活动含有烟草内客，十八岁以下人士请勿扫码参与！本活动含有烟草内客，十八岁以下人士请勿扫码参与！</p>
      <p>2、本活动含有烟草内客：十八岁以下人士请勿扫码参与本活动含有烟草内客，十八岁以下人士请勿扫码参与！本活动含有烟草内客，十八岁以下人士请勿扫码参与！</p>
    </div>

    <div class="reminder">
      <i class="iconfont icon-jinggao reminder-icon"></i>
      <span>温馨提示：本活动含有烟草内客，十八岁以下人士请勿扫码参与！</span>
    </div>

    <van-overlay :show="show2">
      <div class="exchange-rules">
        <h3 class="title">填写礼包数</h3>
        <p class="exchange-number">你当前可兑换礼包数：<span>{{activityInfoData.prize}}</span></p>
        <div class="this-exchange">
          <span class="this-text">本次兑换：</span>
          <div class="stepper">
            <p class="strip"><van-stepper class="step" min="0" integer :value="stepValue" async-change @change="onChangeStep" :disable-plus = 'prohibitStep' disabled-input /><span>条</span></p>
            <p class="strip marg-top"><van-stepper class="step" min="0" integer :value="shareValue" async-change @change="onChangeShare" :disable-plus = 'prohibitShare' disabled-input /><span>份</span></p>
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
        <h3 class="title">信息确认</h3>
        <p class="exchange-number">你本次兑换明细：<span>{{stepValue}}条+{{shareValue}}份礼包</span></p>
        <p class="exchange-number">填写邮寄信息：</p>
        <van-field v-model="consignee" type="text" label="收货人：" />
        <van-field v-model="phone" type="tel" label="号码：" />
        <!-- <van-cell is-link>展示弹出层</van-cell> -->
      <van-field
        readonly
        clickable
        label="选择区域："
        :value="valueArea"
        placeholder="请选择所在地区"
        @click="showPopup"
      />
      <van-field v-model="detailedAddress" type="text" label="详细地址：" />
      <div class="but">
          <button class="butts bgkhui" @click="returnModify">返回修改</button>
          <button class="butts bgkblue" @click="submission">确认提交</button>
        </div>
      <van-popup v-model="show1" :close-on-click-overlay="closeOnClickOverlay" position="bottom">
        <van-area
          :area-list="areaList"
          :columns-num="colNum"
          @cancel="cancelFn"
          @confirm="confirmFn"
          title="请选择区域"
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
  </div>
</template>

<script>
import AeraInfo from "../../utils/area";
import {IndexInfo,Exhcange,GetExchangeRule} from "../../api/api";
export default {
  name: "IndexInfo",
  data() {
    return {
      show: false, // 进入活动弹框
      show1: false, // 显示地区上拉框
      show2: false, // 兑换规则弹框
      show3: false, // 信息确提弹框
      colNum: 3, // 显示列数，3-省市区，2-省市，1-省
      closeOnClickOverlay: false, // 是否在点击遮罩层后关闭
      areaList: AeraInfo, //引用地区信息
      valueArea: "", //地区值
      arrArea: [], //存放地区数组
      activityId: "", // 活动Id
      active: 0,
      stepValue: 0, // 条烟值
      shareValue:0, // 份烟值
      consignee:'', // 收货人
      phone: '', // 手机号码
      detailedAddress: '', // 详细地址
      userInfoData:'', 
      activityInfoData:'',
      prohibitStep: true,
      prohibitShare:true,
      disabledinp:true,
    };
  },
  mounted() {
    this.activityId = this.$route.query.activityId;
    this.postIndexInfoData();
    this.getExchangeRuleData();
    this.tankuan();
  },
  methods: {
    // 计步器条值
    onChangeStep: function(stepValue){
        this.stepValue = stepValue;
    },
    // 计步器份值
    onChangeShare: function(shareValue){
        this.shareValue = shareValue;
    },
    //计步器取消按钮
    cancel:function(){
       this.show2 = false
    },
    //计步器确定按钮
    determine:function(){
       this.show2 = false,
       this.show3 = true
    },
    // 计步器返回修改按钮
    returnModify: function (){
      this.show2 = true,
      this.show3 = false
    },
    // 计步器确认提交按钮
    submission: function (){
      // this.show2 = true,
      this.show3 = false
    },
    
    // 首页数据
    postIndexInfoData: function() {
      this.$postRequest(IndexInfo, {activityId: this.activityId}).then(res => {
          if (res.data.code === '0000') {
            let userInfo = res.data.data.userInfo
            let activityInfo = res.data.data.activityInfo
            console.log(activityInfo)
            this.userInfoData = {id:userInfo.id, headImg:userInfo.headImg,nickName:userInfo.nickName,recommender:userInfo.recommender}
            this.activityInfoData = {
              prize:activityInfo.prize,
              rank:activityInfo.rank,
              invitees:activityInfo.invitees,
              maxInvitees:activityInfo.maxInvitees = 40,
              everyAwardCount:activityInfo.everyAwardCount,
              isComplete:activityInfo.isComplete
              }
              console.log(this.activityInfoData.maxInvitees)
            // this.activityInfoData.prize = 1
            if (this.activityInfoData.prize >= 5) {
                 this.prohibitStep = false
            } else {
              this.prohibit = true
            }
            if (this.activityInfoData.prize > 0) {
              this.prohibitShare = false
            } else {
              this.prohibitShare = true
            }
          }
        });
    },

    getExchangeRuleData () {
      this.$getRequest(GetExchangeRule,{activityId: this.activityId}).then(res => {
        console.log(res)
      })
    },

    // 跳转我的团队
    myTeam () {
      this.$router.push({path:'/MyTeam',query:{activityId:this.activityId}})
    },
    // 跳转订单管理
    orderManagement () {
        this.$router.push({path:'/OrderAdmin'})
    },
    // 进入活动弹框显示
    tankuan() {
      this.show = false;
    },
    // 兑换规则提示框
    exchangeRules() {
      this.show2 = true;
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