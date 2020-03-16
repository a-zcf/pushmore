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
      <p class="rank">发展人数{{activityInfoData.rank}}人</p>
      <ul>
        <li>
          <p class="li-p">
            <span
              :class="activityInfoData.maxInvitees <= 10 || activityInfoData.maxInvitees > 10?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'"
            ></span>
            <span
              :class="activityInfoData.maxInvitees >= 20 || activityInfoData.maxInvitees > 20?'iconfont icon-hengxian1 backgroundBlue':'iconfont icon-hengxian1 greyColor'"
            ></span>
          </p>
          <p
            class="zhengshi"
            :class="activityInfoData.maxInvitees <= 10 || activityInfoData.maxInvitees > 10?'backgroundBlue':'greyColor'"
          >正式1</p>
        </li>
        <li>
          <p class="li-p">
            <span
              :class="activityInfoData.maxInvitees == 20 || activityInfoData.maxInvitees > 20?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'"
            ></span>
            <span
              :class="activityInfoData.maxInvitees >= 30 || activityInfoData.maxInvitees > 30?'iconfont icon-hengxian1 backgroundBlue':'iconfont icon-hengxian1 greyColor'"
            ></span>
          </p>
          <p
            class="zhengshi"
            :class="activityInfoData.maxInvitees >= 20 || activityInfoData.maxInvitees > 20?'backgroundBlue':'greyColor'"
          >正式2</p>
        </li>
        <li>
          <p class="li-p">
            <span
              :class="activityInfoData.maxInvitees == 30 || activityInfoData.maxInvitees >30?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'"
            ></span>
            <span
              :class="activityInfoData.maxInvitees >= 40 || activityInfoData.maxInvitees > 40?'iconfont icon-hengxian1 backgroundBlue':'iconfont icon-hengxian1 greyColor'"
            ></span>
          </p>
          <p
            class="zhengshi"
            :class="activityInfoData.maxInvitees >= 30 || activityInfoData.maxInvitees > 30?'backgroundBlue':'greyColor'"
          >正式3</p>
        </li>
        <li>
          <p class="li-p">
            <span
              :class="activityInfoData.maxInvitees >= 40?'iconfont icon-chenggong buzhou-text01':'iconfont icon-chenggong buzhou-text'"
            ></span>
          </p>
          <p
            class="zhengshi"
            :class="activityInfoData.maxInvitees >= 40?'backgroundBlue':'greyColor'"
          >正式4</p>
        </li>
        <li class="details" @click="myTeam">详情</li>
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
                disabled-input
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
                disabled-input="true"
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
        <h3 class="title">信息确认</h3>
        <p class="exchange-number">
          你本次兑换明细：
          <span>{{stepValue}}条+{{shareValue}}份礼包</span>
        </p>
        <p class="exchange-number">填写邮寄信息：</p>
        <van-field v-model="name" type="text" label="收货人：" />
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
        <van-field v-model="adrress" type="text" label="详细地址：" />
        <div class="but">
          <button class="butts bgkhui" @click="returnModify">返回修改</button>
          <button class="butts bgkblue" @click="postExhcangeData">确认提交</button>
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
import { IndexInfo, Exhcange, GetExchangeRule } from "../../api/api";
export default {
  name: "IndexInfo",
  data() {
    return {
      test:false,
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
      shareValue: 0, // 份烟值
      userInfoData: "",
      activityInfoData: {
        prize:0,
        maxInvitees:0,
         rank:0,
      },
      prohibitStep: true, // 隐藏加号按钮
      prohibitShare: true, // 隐藏加号按钮
      disabledinp: true,
      everyBarNeedBoxCount: 0, // 每条所需的份数
      exchangeNumForBar:0, //----兑换条数
      exchangeNumForBox:0, //----兑换份数
      name:"", // 收货人
      phone:"", // 号码
      adrress:"", // 地址
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
    onChangeStep: function(stepValue) {
      this.stepValue = stepValue;
    },
    // 计步器份值
    onChangeShare: function(shareValue) {
      this.shareValue = shareValue;
    },
    // 条加按钮
    stripPlus() {
      this.activityInfoData.prize = this.activityInfoData.prize - this.everyBarNeedBoxCount;
      if (this.activityInfoData.prize < this.everyBarNeedBoxCount || this.activityInfoData.prize < 5) {
        this.prohibitStep = true;
      }else{
        this.prohibitStep = false;
      }
      if(this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
        } else {
        this.prohibitShare = false;
      }
    },
    //条减按钮
    stripMinus(){
      this.activityInfoData.prize = this.activityInfoData.prize + this.everyBarNeedBoxCount;
      if (this.activityInfoData.prize < this.everyBarNeedBoxCount && this.activityInfoData.prize < 5) {
        this.prohibitStep = true;
      }else{
        this.prohibitStep = false;
      }
      if(this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
        } else {
        this.prohibitShare = false;
      }
    },
    // 份加按钮
    sharePlus() {
       this.activityInfoData.prize = this.activityInfoData.prize - 1;
      if(this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
        } else {
        this.prohibitShare = false;
      }
      if (this.activityInfoData.prize < this.everyBarNeedBoxCount || this.activityInfoData.prize < 5) {
        this.prohibitStep = true;
      }else{
        this.prohibitStep = false;
      }
    },
    // 份减按钮
    shareMinus(){
      this.activityInfoData.prize = this.activityInfoData.prize + 1;
      if(this.activityInfoData.prize <= 0) {
        this.prohibitShare = true;
        } else {
        this.prohibitShare = false;
      }
      if (this.activityInfoData.prize < this.everyBarNeedBoxCount && this.activityInfoData.prize < 5) {
        this.prohibitStep = true;
      }else{
        this.prohibitStep = false;
      }
    },
    // 兑换
    postExhcangeData() {
      if(this.stepValue == 0 && this.shareValue == 0){
      this.$toast('请选择条或份礼包');
        return false
      }
      if(this.name == ''){
      this.$toast('请输入收货人名称！');
        return false
      }
      if(this.phone == ''){
      this.$toast('请输入收货人号码！');
        return false
      }
      if(this.valueArea == ''){
      this.$toast('请选择您的区域！');
        return false
      }
      if(this.adrress == ''){
      this.$toast('请输入的的详细地址（例如：街道及门牌号）！');
        return false
      }
      let params = {
          activityId:this.activityId,
          exchangeNumForBar: this.stepValue, // 条
          exchangeNumForBox:this.shareValue, // 份
          name:this.name,
          phone:this.phone,
          adrress:this.valueArea + this.adrress
      }
      this.$postRequest(Exhcange,params).then(res => {
        console.log(res)
        if(res.data.code === '0000') {
          this.$toast.success('兑换成功！')
          setTimeout(() => {
            this.show3 = false
          },1000)
          this.stepValue = '', // 条
          this.shareValue = '', // 份
          this.name = '',
          this.phone = '',
          this.valueArea = '',
          this.adrress = ''
        }else{
          this.$toast.fail('兑换失败！');
        }
      })
    },
    //计步器取消按钮
    cancel: function() {
      this.show2 = false;
    },
    //计步器确定按钮
    determine: function() {
      (this.show2 = false), (this.show3 = true);
    },
    // 计步器返回修改按钮
    returnModify: function() {
      (this.show2 = true), (this.show3 = false);
    },
    // 计步器确认提交按钮
    submission: function() {
      // this.show2 = true,
      this.show3 = false;
    },

    // 首页数据
    postIndexInfoData: function() {
      this.$postRequest(IndexInfo, { activityId: this.activityId }).then(
        res => {
          console.log(res)
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
              prize: activityInfo.prize ,
              rank: activityInfo.rank,
              invitees: activityInfo.invitees,
              maxInvitees: activityInfo.maxInvitees,
              everyAwardCount: activityInfo.everyAwardCount,
              isComplete: activityInfo.isComplete
            };
            if (this.activityInfoData.prize < this.everyBarNeedBoxCount || this.activityInfoData.prize < 5) {
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

    getExchangeRuleData() {
      this.$getRequest(GetExchangeRule, { activityId: this.activityId }).then(
        res => {
          if (res.data.code === "0000") {
            this.everyBarNeedBoxCount = res.data.data.rule.everyBarNeedBoxCount;
          }
        }
      );
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
      this.$router.push({ path: "/MyQrCode",query: { activityId: this.activityId } });
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