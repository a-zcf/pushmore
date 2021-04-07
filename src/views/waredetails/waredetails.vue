<template>
  <div class="waredetails">
    <div class="slide">
      <van-swipe @change="onChange">
        <van-swipe-item>
          <img class="img" :src="goods.img" />
        </van-swipe-item>
        <!-- <template #indicator>
        <div class="custom-indicator">
        {{ current + 1 }}/1
        </div>
      </template> -->
      </van-swipe>
      <div class="details_con">
        <h3>{{ goods.title }}</h3>
        <p class="share_piece">
          <span class="yuanjia">原价：{{ goods.originalPrice }}</span>
          <span>销量：{{ goods.sales == null ? "0" : goods.sales }}</span>
        </p>
        <div class="details_exchange_but">
          <span
            >现价：<b>{{ goods.price }}</b></span
          >
          <van-stepper
            v-model="value"
            min="1"
            theme="round"
            button-size="22"
            disable-input
            @plus="addCart()"
            @minus="subCart()"
          />
        </div>
      </div>
      <div class="commodity_details">
        <h3>商品详情</h3>
        <p v-html="goods.detail"></p>
        <p v-html="goods.description"></p>
        <!-- <img :src="image" /> -->
      </div>
      <div class="commodity_details bottom_px">
        <h3>重要提示</h3>
        <p>
          推多多奖励标准：将推荐人推广名片发放给好友扫描，邀请好友进入推多多活动系统。进入活动系统后，好友扫描活动规格“中支凌云、刘三姐”二维码，推荐人可获得一个正式成员，推荐人每发展四个正式成员，可获得精美礼品一份。
        </p>
        <!-- <img :src="image" /> -->
      </div>
    </div>
    <div class="exchange_but exchange_but01">
      <span class="but_text01"
        >共计<b>{{ totalAmout }}</b
        >龙币</span
      >
      <!-- <span class="but_text02">剩余2000龙币</span> -->
      <!-- <button class="but" @click="orderConfirm">({{ totalNum }})</button> -->
      <div class="cart" @click="orderConfirm">
        <van-icon name="shopping-cart-o" class="cart-icon" />
        <van-badge :content="totalNum" max="99" class="badge" />
      </div>
    </div>
  </div>
</template>

<script>
import { goodsDetail, cartList, addCart, subCart } from "../../api/api";
export default {
  name: "waredetails",
  data() {
    return {
      current: 0,
      detailsId: "",
      goods: "",
      totalAmout: "",
      totalNum: 0, // 总商品数
      value: 0,
      cartLists: [],
      supplierId: "",
    };
  },
  mounted() {
    let that = this;
    that.supplierId = window.localStorage.getItem("supplierId");
    this.detailsId = this.$route.query.id;
    this.$getRequest(goodsDetail, { id: this.detailsId }).then((res) => {
      if (res.data.code == "0") {
        this.goods = res.data.goods;
      } else {
        console.log(res.data.msg);
      }
    });
    this.getCartList();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    /* 购物车 */
    getCartList() {
      let that = this;
      this.$getRequest(cartList, { supplierId: that.supplierId }).then(
        (res) => {
          if (res.data.code === 0) {
            this.totalAmout = res.data.totalAmout;
            this.totalNum = res.data.totalNum;
            this.cartLists = res.data.list;
          } else {
            console.log("错误：" + res.data.msg);
          }
        }
      );
    },
    /* 加1 */
    addCart() {
      let that = this;
      this.$getRequest(addCart, {
        skuId: this.detailsId,
        supplierId: that.supplierId,
      }).then((res) => {
        if (res.data.code === 0) {
          // alert('加1')
          this.getCartList();
        } else {
        }
      });
    },
    /* 减1 */
    subCart() {
      let that = this;
      that
        .$getRequest(subCart, {
          skuId: that.detailsId,
          supplierId: that.supplierId,
        })
        .then((res) => {
          if (res.data.code === 0) {
            that.getCartList();
          } else {
          }
        });
    },
    /* 确认订单 */
    orderConfirm() {
      this.$router.push({
        path: "/cart",
      });
      // let nums = [];
      // let ids = [];
      // let skuIds = [];
      // for (let i = 0; i < this.cartLists.length; i++) {
      //   nums.push(this.cartLists[i].num);
      //   skuIds.push(this.cartLists[i].skuId);
      // }
      // this.$router.push({
      //   path: "/orderconfirm",
      //   query: { nums: nums, skuIds: skuIds },
      // });
    },
  },

  beforeDestroy() {},
};
</script>

<style>
</style>