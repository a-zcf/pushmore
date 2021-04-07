<template>
  <div class="newaddress">
    <div class="address_field">
      <van-field
        v-model="name"
        type="text"
        label="收货人："
        clearable
        placeholder="请输入收货人姓名"
      />
      <van-field
        v-model="phone"
        type="tel"
        label="号码："
        clearable
        placeholder="请输入收货人号码"
      />
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
        placeholder="街道门牌、楼层房间号等信息"
      />
    </div>
    <van-cell center title="设为默认收货地址">
      <template #right-icon>
        <van-switch v-model="checked" size="24" @change="defaultState" />
      </template>
    </van-cell>
    <button class="address_but" @click="postAddOrUpadteDdress">添加</button>
    <van-popup v-model="show" position="bottom" close-on-click-overlay>
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
</template>

<script>
import AeraInfo from "../../utils/area";
import { addOrUpadteDdress } from "../../api/api";
export default {
  name: "newaddress",
  data() {
    return {
      show: false,
      arrArea: [], //存放地区数组
      areaList: AeraInfo,
      valueArea: "", //地区值
      colNum: 3, // 显示列数，3-省市区，2-省市，1-省
      checked: false,
      name: "",
      phone: "",
      adrress: "",
      province: "",
      city: "",
      county: "",
      defaultAddress: 0,
      name: "",
      phone: "",
      isDisable: true, // 防止重复提交
      radio: "",
    };
  },
  mounted() {
    this.radio = this.$route.query.radio;
  },
  methods: {
    postAddOrUpadteDdress() {
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
      if (this.isDisable == false) {
        return;
      }
      this.isDisable = false;
      let params = {
        address: this.adrress,
        province: this.province,
        city: this.city,
        county: this.county,
        defaultAddress: this.defaultAddress,
        name: this.name,
        phone: this.phone,
      };
      this.$postRequest(addOrUpadteDdress, params).then((res) => {
        this.isDisable = true;
        if (res.data.code === 0) {
          this.address = res.data.address;
          this.$toast("添加地址成功！");
          this.name = "";
          this.phone = "";
          (this.valueArea = ""), (this.adrress = "");
        } else {
          console.log(res.data.msg);
        }
      });
    },
    defaultState() {
      if (this.checked == true) {
        this.defaultAddress = 1;
      } else {
        this.defaultAddress = 0;
      }
    },
    // 显示地区
    showPopup() {
      this.show = true;
    },
    // 隐藏选择地区取消按钮
    cancelFn() {
      this.show = false;
    },
    // 选择地区确定按钮
    confirmFn(event) {
      this.show = false;
      this.arrArea = event;
      this.province = event[0].name;
      this.city = event[1].name;
      this.county = event[2].name;
      let addrInfo = event[0].name + "-" + event[1].name + "-" + event[2].name;
      this.valueArea = addrInfo;
    },
  },
};
</script>

<style>
</style>