<template>
  <div class="commodityadmin">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <div class="edit-preservation">
        <span
          class="edit-prese-text"
          @click="states == false ? togg() : toggleAll()"
          >{{ states == false ? "编辑" : "保存" }}</span
        >
      </div>
      <ul>
        <van-checkbox-group v-model="result" class="ul" :max="3">
          <li v-for="(item, index) in list" :key="index">
            <div class="img-checkbox">
              <van-checkbox
                :name="item.id"
                v-show="states"
                class="checked"
                shape="square"
                ref="checkboxes"
                @click="clickChecked(index)"
              ></van-checkbox>
              <img class="comm-img" :src="item.img" />
            </div>
            <div class="comm-info">
              <span class="comm-name">{{ item.title }}</span>
              <span class="comm-price">￥{{ item.price }}</span>
            </div>
          </li>
        </van-checkbox-group>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import { getGoodsList, saveShowsmokeGoodList } from "../../api/api";
export default {
  name: "commodityadmin",
  data() {
    return {
      checked: 0,
      states: false,
      result: [],
      list: [],
      supplierId: 0,
      keeperOpenid: "",
      mescroll: null,
      mescrollDown: {
        use: false,
      },
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 1,
        page: {
          num: 1,
          size: 10,
          time: null,
        },
        empty: {
          warpId: "mescroll",
          tip: "暂无相关数据",
        },
        htmlNodata: '<p class="upwarp-nodata">-- 已加载完 --</p>',
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>',
      },
    };
  },
  mounted() {
    let that = this;
    let openid = that.getUrlSplit("keeperOpenid");
    let mySupplierId = that.getUrlSplit("suplierId");
    if (openid != "" && openid != null && typeof openid != "undefined") {
      that.keeperOpenid = openid;
    } else {
      that.keeperOpenid = "";
    }
    if (
      mySupplierId != "" &&
      mySupplierId != null &&
      typeof mySupplierId != "undefined"
    ) {
      window.localStorage.removeItem("supplierId");
      window.localStorage.setItem("supplierId", mySupplierId);
      that.supplierId = mySupplierId;
    } else {
      mySupplierId = window.localStorage.getItem("supplierId");
      if (
        mySupplierId != "" &&
        mySupplierId != null &&
        typeof mySupplierId != "undefined"
      ) {
        that.supplierId = mySupplierId;
      } else {
        that.supplierId = 1;
      }
    }
    that.mescroll.resetUpScroll();
  },
  methods: {
    getUrlSplit(name) {
      let url = window.location.href.split("?");
      let u = url[1].split("&");
      for (let i = 0; i < u.length; i++) {
        let arr = u[i].split("=");
        if (arr[0] == name) {
          return arr[1];
        }
      }
      return null;
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      let panems = {
        pageNum: page.num, //页码 （可选）
        pageSize: page.size, //每页显示记录数 （可选）
        supplierId: this.supplierId, //（必选）
        keeperOpenid: this.keeperOpenid, //店主openid
      };
      this.$getRequest(getGoodsList, panems).then((res) => {
        if (res.data.code === 0) {
          let arr = res.data.page.list;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].showFlag === 1) {
              this.result.push(arr[i].id);
            }
          }
          if (page.num === 1) this.list = [];
          this.list = this.list.concat(arr);
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        } else {
          this.mescroll.endErr();
        }
      });
    },
    togg() {
      let that = this;
      that.states = that.states == false ? true : false;
    },
    toggleAll() {
      let that = this;
      that.states = that.states == false ? true : false;
      if (that.result.length > 3) {
        that.$toast.fail("不能超过3个商品数量哦！");
        that.states = true;
        return false;
      }
      if (that.states == false) {
        let showFlag = [];
        for (let i = 0; i < that.result.length; i++) {
          showFlag.push(1);
        }
        let panems = {
          showFlag: showFlag,
          spuIds: that.result,
          supplierId: that.supplierId,
          keeperOpenid: that.keeperOpenid,
        };
        that.$postRequest(saveShowsmokeGoodList, panems).then((res) => {
          if (res.data.code === 0) {
            that.$toast("保存成功！");
          } else {
            that.$toast.fail(res.data.msg);
          }
        });
      }
    },
    clickChecked(index) {
      let that = this;
      if (that.$refs.checkboxes[index].checked == true) {
        if (that.result.length > 3) {
          that.$dialog
            .alert({
              title: "提示",
              message: "不能超过3个商品数量哦！",
            })
            .then(() => {});
        }
      }
    },
  },
};
</script>

<style>
</style>