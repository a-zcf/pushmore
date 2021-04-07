<template>
  <div class="addresslist">
    <div class="new_address" @click="newAddress">
      <van-icon name="plus" /><span>新增地址</span>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="li_list">
            <div
              class="returnOrder"
              @click="
                returnOrder(
                  item.id,
                  item.name,
                  item.phone,
                  item.province,
                  item.city,
                  item.county,
                  item.address
                )
              "
            >
              <span class="surname">{{ item.name.charAt(0) }}</span>
              <div class="address_cont">
                <p class="name_phone">
                  <span class="name">{{ item.name }}</span
                  ><span class="">{{ item.phone }}</span>
                </p>
                <p class="address_text">
                  <span class="default" v-if="item.defaultAddress == 1"
                    >默认</span
                  ><span class="text">{{
                    item.province + item.city + item.county + item.address
                  }}</span>
                </p>
              </div>
            </div>
            <van-icon
              name="edit"
              class="edit_address"
              @click="addressEdit(item.id, item.userId)"
            />
          </div>
          <div class="moren">
            <van-radio-group v-model="radio">
              <van-radio
                :name="item.id"
                label-disabled
                @click="getSetDefaut(item.id)"
                >设为默认收货地址</van-radio
              >
            </van-radio-group>
            <van-icon
              name="delete"
              class="checked"
              @click="getDeleteAddress(item.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { addressList, setDefaut, deleteAddress } from "../../api/api";
export default {
  name: "addresslist",
  data() {
    return {
      image: require("../../assets/img/head-1.png"),
      list: [],
      radio: "",
      nums: [],
      skuIds: [],
    };
  },
  mounted() {
    this.radio = this.$route.query.id;
    this.nums = this.$route.query.nums;
    this.skuIds = this.$route.query.skuIds;
    this.getAddressList();
  },
  methods: {
    getAddressList() {
      this.$getRequest(addressList).then((res) => {
        if (res.data.code === 0) {
          this.list = res.data.list;
        } else {
        }
      });
    },
    newAddress() {
      this.$router.push({
        path: "/newaddress",
        query: { radio: this.radio },
      });
    },
    addressEdit(id, userId) {
      this.$router.push({
        path: "/addressedit",
        query: { id: id, userId: userId, radio: this.radio },
      });
    },
    getSetDefaut(id) {
      this.$getRequest(setDefaut, { id: id }).then((res) => {
        if (res.data.code === 0) {
          this.getAddressList();
        } else {
          this.$toast("设置失败！");
        }
      });
    },
    getDeleteAddress(id) {
      this.$getRequest(deleteAddress, { id: id }).then((res) => {
        if (res.data.code === 0) {
          this.getAddressList();
        } else {
          this.$toast("设置失败！");
        }
      });
    },
    returnOrder(id, name, phone, province, city, county, address) {
      let list = {
        id: id,
        name: name,
        phone: phone,
        province: province,
        city: city,
        county: county,
        address: address,
      };
      this.$router.push({
        path: "/orderconfirm",
        query: { list: list, nums: this.nums, skuIds: this.skuIds },
      });
    },
  },
};
</script>

<style>
</style>