<template>
  <div class="orderconfirm">
    <div class="slide">
      <div v-if="address != null" class="head_address" @click="addressList">
        <van-icon name="map-marked" class="map_marked" />
        <div class="address_text">
          <p class="consignee_p1">
            <span class="consignee"> 收货人：{{ address.name }} </span>
          </p>
          <p class="consignee_p2">电话：{{ address.phone }}</p>
          <p class="consignee_p2">
            收货地址：{{
              address.province + address.city + address.county + address.address
            }}
          </p>
        </div>
        <van-icon name="arrow" class="arrow" />
      </div>
      <div v-if="address == null" class="new_address" @click="newAddress">
        <van-icon name="plus" /><span>新增地址</span>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item, index) in orderList" :key="index">
            <img :src="item.img" />
            <div class="list_cont">
              <h3>{{ item.title }}</h3>
              <div class="list_stepper">
                <p class="stepper_price">
                  <span class="price">￥{{ item.price }}</span>
                  <span class="num">x{{ item.num }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <span class="totalNum">共{{ totalNum }}件</span>
      <span class="totalAmout"
        >合计：<b>￥{{ totalAmout }}</b></span
      >
      <button class="generate_order" @click="postGenerateOrder">
        生成订单
      </button>
    </div>
  </div>
</template>

<script>
import { preOrder, createOrder } from "../../api/api";
export default {
  name: "orderconfirm",
  data() {
    return {
      image: require("../../assets/img/head-1.png"),
      orderList: [],
      totalAmout: 0,
      totalNum: 0,
      address: {
        id: 0,
        province: "",
        city: "",
        county: "",
        address: "",
        phone: "",
        name: "",
      },
      nums: [],
      skuIds: [],
      supplierId: "",
    };
  },
  mounted() {
    let that = this;
    that.supplierId = window.localStorage.getItem("supplierId");
    this.nums = this.$route.query.nums;
    this.skuIds = this.$route.query.skuIds;
    this.address = this.$route.query.list;
    if (this.nums == "" || this.skuIds == "") {
      return;
    }
    this.$postRequest(preOrder, {
      num: this.nums,
      skuId: this.skuIds,
      supplierId: that.supplierId,
      types: "cart",
    }).then((res) => {
      if (res.data.code === 0) {
        this.orderList = res.data.list;
        this.totalAmout = res.data.totalAmout;
        this.totalNum = res.data.totalNum;
        this.address = res.data.address;
      } else {
        console.log(res.data.msg);
      }
    });
  },
  methods: {
    /* 跳转地址列表 */
    addressList() {
      this.$router.push({
        path: "/addresslist",
        query: { id: this.address.id, nums: this.nums, skuIds: this.skuIds },
      });
    },
    newAddress() {
      this.$router.push({
        path: "/addresslist",
      });
    },
    postGenerateOrder() {
      let that = this;
      if (this.address == null) {
        this.$toast("请您填写收货地址！");
        return;
      }
      if (this.orderList.length == 0) {
        this.$toast("您还未选择商品！");
        return;
      }
      let params = {
        num: this.nums,
        skuId: this.skuIds,
        addressId: this.address.id,
        memo: "cart",
        supplierId: that.supplierId,
        types: "cart",
      };
      this.$postRequest(createOrder, params).then((res) => {
        if (res.data.code === 0) {
          console.log(res);
          this.$router.push({
            path: "/generateorder",
            query: { orderNo: res.data.orderNo, url: res.data.url },
          });
        } else {
          console.log(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>