<template>
  <div class="cart">
    <div class="slide">
      <div class="cart_list">
        <!-- <div class="shop_name">
          <img class="shop_img" :src="image" />
          <h3>丹泉酒业-旗舰店</h3>
          <van-icon name="arrow" class="icon_arrow" />
        </div> -->
        <div class="list">
          <ul>
            <li v-for="(item, index) in cartLists" :key="index">
              <img :src="item.img" />
              <div class="list_cont">
                <h3>{{ item.title }}</h3>
                <div class="list_stepper">
                  <p class="stepper_price">
                    <span class="price">￥{{ item.price }}</span>
                    <span class="num">x{{ item.num }}</span>
                  </p>
                  <van-stepper
                    theme="round"
                    :value="item.num"
                    min="0"
                    button-size="22"
                    disable-input
                    @plus="addCart(item.skuId)"
                    @minus="subCart(item.skuId)"
                  />
                </div>
              </div>
            </li>
            <!-- <li>
              <img :src="image" />
              <div class="list_cont">
                <h3>真龙海韵香烟口感顺滑珍珠纳米过滤嘴焦油含量5mg</h3>
                <div class="list_stepper">
                  <span>5000龙币</span>
                  <van-stepper theme="round" :value="value" button-size="22" disable-input
                  />
                </div>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <!-- <div class="cart_list">
        <div class="shop_name">
          <img class="shop_img" :src="image" />
          <h3>丹泉酒业-旗舰店</h3>
          <van-icon name="arrow" class="icon_arrow" />
        </div>
        <div class="list">
          <ul>
            <li>
              <img :src="image" />
              <div class="list_cont">
                <h3>真龙海韵香烟口感顺滑珍珠纳米过滤嘴焦油含量5mg</h3>
                <div class="list_stepper">
                  <span>5000龙币</span>
                  <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                </div>
              </div>
            </li>
            <li>
              <img :src="image" />
              <div class="list_cont">
                <h3>真龙海韵香烟口感顺滑珍珠纳米过滤嘴焦油含量5mg</h3>
                <div class="list_stepper">
                  <span>5000龙币</span>
                  <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
    <div class="exchange_but">
      <span class="but_text01"
        >共计<b>{{ totalAmout }}</b
        >商品</span
      >
      <!-- <span class="but_text02">共计0件</span> -->
      <button class="but" @click="orderConfirm">结算({{ totalNum }})</button>
    </div>
  </div>
</template>

<script>
import { cartList, addCart, subCart } from "../../api/api";
export default {
  name: "cart",
  data() {
    return {
      image: require("../../assets/img/head-1.png"),
      value: 0,
      cartLists: [], // 列表
      totalAmout: 0, // 总额
      totalNum: 0, // 总商品数
      supplierId: "",
    };
  },
  mounted() {
    let that = this;
    that.supplierId = window.localStorage.getItem("supplierId");
    that.getCartList();
  },
  methods: {
    getCartList() {
      let that = this;
      this.$getRequest(cartList, { supplierId: that.supplierId }).then(
        (res) => {
          if (res.data.code === 0) {
            this.cartLists = res.data.list;
            this.totalAmout = res.data.totalAmout;
            this.totalNum = res.data.totalNum;
          } else {
          }
        }
      );
    },
    addCart(skuId) {
      let that = this;
      this.$getRequest(addCart, {
        skuId: skuId,
        supplierId: that.supplierId,
      }).then((res) => {
        if (res.data.code === 0) {
          this.getCartList();
        } else {
        }
      });
    },
    /* 减1 */
    subCart(skuId) {
      let that = this;
      this.$getRequest(subCart, {
        skuId: skuId,
        supplierId: that.supplierId,
      }).then((res) => {
        if (res.data.code === 0) {
          this.getCartList();
        } else {
        }
      });
    },
    /* 确认订单 */
    orderConfirm() {
      let nums = [];
      let skuIds = [];
      for (let i = 0; i < this.cartLists.length; i++) {
        nums.push(this.cartLists[i].num);
        skuIds.push(parseInt(this.cartLists[i].skuId));
      }
      if (nums.length === 0 && skuIds.length === 0) {
        this.$toast.fail("您还未选择商品");
        return false;
      }
      this.$router.push({
        path: "/orderconfirm",
        query: { nums: nums, skuIds: skuIds },
      });
    },
  },
};
</script>

<style>
</style>