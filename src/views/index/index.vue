<template>
  <div class="index">
    <div class="slide">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in adList" :key="index">
          <img :src="item.adImgurl" />
        </van-swipe-item>
      </van-swipe>
      <van-tabs class="van_list" animated>
        <van-tab
          v-for="(item, index) in categoryList"
          :key="index"
          :title="item.titile"
        >
          <ul>
            <li
              v-for="(it, index) in item.list"
              :key="index"
              @click="wareDetails(it.id)"
            >
              <img :src="it.img" class="list-img" />
              <h3>{{ it.title }}</h3>
              <p>
                <span class="price">￥{{ it.price }}</span>
                <!-- <van-stepper
                  class="stepper_but"
                  theme="round"
                  button-size="19"
                  disable-input
                  :value="value"
                  min="0"
                  @plus="addCart(it.id, it.price)"
                  @minus="subCart(it.id)"
                /> -->
              </p>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="exchange_but">
      <span class="but_text01"
        >合计<b>￥{{ totalAmout }}</b></span
      >
      <span class="but_text02">剩余2000龙币</span>
      <button class="but" @click="orderConfirm">结算({{ totalNum }})</button> -->
    <!-- </div> -->
  </div>
</template>

<script>
import {
  adList,
  categoryList,
  goodsList,
  goodsDetail,
  addCart,
  subCart,
  cartList,
} from "../../api/api";
export default {
  name: "index",
  data() {
    return {
      value: 0,
      active: 0,
      // notice: "",
      adList: [], // 广告图
      categoryList: [], // 商品分类
      goodsList: [],
      totalAmout: 0,
      totalNum: 0,
      cartLists: [],
      supplierId: "",
    };
  },
  mounted() {
    let that = this;
    // let list = [
    //   "1、在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。2、测试测试测试",
    // ];
    // let lists = [];
    // for (let i = 0; i < list.length; i++) {
    //   lists.push(list[i]);
    //   this.notice = lists.toString();
    // }
    const query = this.$qs.parse(location.search.substring(1));
    let tpSupplierId = query.supplierId;
    if (
      tpSupplierId != "" &&
      tpSupplierId != null &&
      typeof tpSupplierId != "undefined"
    ) {
      window.localStorage.removeItem("supplierId");
      window.localStorage.setItem("supplierId", tpSupplierId);
      that.supplierId = tpSupplierId;
    } else {
      tpSupplierId = window.localStorage.getItem("supplierId");
      if (
        tpSupplierId != "" &&
        tpSupplierId != null &&
        typeof tpSupplierId != "undefined"
      ) {
        that.supplierId = tpSupplierId;
      } else {
        that.supplierId = 1;
      }
    }
    this.getadList();
    this.getCategoryList();
    this.getGoodsList();
    this.getGoodsDetail();
    this.getCartList();
  },
  methods: {
    /* 广告图列表 */
    getadList() {
      this.$getRequest(adList).then((res) => {
        if (res.data.code === 0) {
          this.adList = res.data.list;
        } else {
        }
      });
    },
    /* 商品分类 */
    getCategoryList() {
      let that = this;
      this.$getRequest(categoryList, { supplierId: that.supplierId }).then(
        (res) => {
          if (res.data.code === 0) {
            this.categoryList = res.data.list;
          } else {
          }
        }
      );
    },
    /* 商品列表 */
    getGoodsList() {
      let that = this;
      this.$getRequest(goodsList, {
        supplierId: that.supplierId,
        categoryId: "",
      }).then((res) => {
        if (res.data.code === 0) {
          this.goodsList = res.data.page.list;
        } else {
        }
      });
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
          }
        }
      );
    },
    /* 加1 */
    addCart(id, price) {
      let that = this;
      this.$getRequest(addCart, {
        skuId: id,
        supplierId: that.supplierId,
      }).then((res) => {
        if (res.data.code === 0) {
          this.getCartList();
        } else {
        }
      });
    },
    /* 减1 */
    subCart(id) {
      let that = this;
      this.$getRequest(subCart, {
        skuId: id,
        supplierId: that.supplierId,
      }).then((res) => {
        if (res.data.code === 0) {
          this.getCartList();
        } else {
        }
      });
    },
    /* 商品详情 */
    getGoodsDetail() {
      this.$getRequest(goodsDetail, { id: 1 }).then((res) => {
        if (res.data.code === 0) {
        } else {
        }
      });
    },

    /*跳转商品详情页*/
    wareDetails(id) {
      this.$router.push({ path: "/waredetails", query: { id: id } });
    },
    /* 确认订单 */
    orderConfirm() {
      let nums = [];
      let skuIds = [];
      for (let i = 0; i < this.cartLists.length; i++) {
        nums.push(this.cartLists[i].num);
        skuIds.push(this.cartLists[i].skuId);
      }
      this.$router.push({
        path: "/orderconfirm",
        query: { nums: nums, skuIds: skuIds },
      });
    },
  },
};
</script>

<style >
</style>