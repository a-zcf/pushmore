<template>
  <div class="my-team">
    <div class="head-img">
      <img src="../../assets/img/headImg.png" />
    </div>

    <van-tabs v-model="active">
      <van-tab title="发展客户">
        <h3 class="title">~~已扫码推客名片的用户~~</h3>
        <div class="list">
            <ul>
              <li v-for="(item,index) in developList" :key="index">
                <img class="head-portrait" :src="item.headImg" />
                <span class="name formal-name">{{item.nickName}}</span>
                <span class="sweep-code">
                  <p class="code">{{item.status==='0'?'未扫码':'已扫码'}}{{item.brandName}}</p>
                  <p class="time">邀请时间：{{item.scanTime}}</p>
                </span>
              </li>
              <van-divider v-if="developList==''">暂无相关数据~~</van-divider>
            </ul>
        </div>
      </van-tab>
      <van-tab title="正式客户">
        <h3 class="title">~~已扫码活动指定规格的用户~~</h3>
        <div class="list">
            <ul>
              <li v-for="(item,index) in formalList" :key="index">
                <img class="head-portrait" :src="item.headImg" />
                <span class="name formal-name">{{item.nickName}}</span>
                <span class="sweep-code">
                  <p class="code">{{item.status==='0'?'未扫码':'已扫码'}}{{item.brandName}}</p>
                  <p class="time">扫码时间：{{item.scanTime}}</p>
                </span>
              </li>
              <van-divider v-if="formalList==''">暂无相关数据~~</van-divider>
            </ul>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import {MyTeam} from '../../api/api'
export default {
  name: "MyTeam",
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      activityId:'',
      formalList: [],
      developList:[],
      formalCount:0,
      developCount:0,
      had:false
    };
  },
  mounted() {
      this.activityId = this.$route.query.activityId;
      this.postMyTeamData();
  },
  methods: {
    postMyTeamData() {
      this.$postRequest(MyTeam, {activityId:this.activityId}).then(res => {
          if (res.data.code === '0000') {
              this.formalList = res.data.data.formal.list
              this.formalCount = res.data.data.formal.count
              this.developList = res.data.data.develop.list
              this.developCount = res.data.data.develop.count
          }
      })
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style>
</style>