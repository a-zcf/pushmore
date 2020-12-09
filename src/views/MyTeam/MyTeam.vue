<template>
  <div class="my-team">
    <div class="head-img">
      <img src="../../assets/img/headImg.jpg" />
    </div>
        <h3 class="title">~~ 目前团队人数{{totalCount}}人 ~~</h3>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" id="mescroll">
            <ul class="list">
              <li v-for="(item,index) in list" :key="index">
                <img :src="item.headimgurl" class="list-img">
                <div class="name-time">
                  <span class="name">{{item.nickname}}</span>
                  <span class="time">邀请时间：{{item.createTime}}</span>
                </div>
              </li>
            </ul>
        </mescroll-vue>
  </div>
</template>

<script>
import {myTeam} from '../../api/api'
export default {
  name: "MyTeam",
  data() {
    return {
      list:[],
          mescroll: null,
          mescrollDown: {
           use: false,
          },
          mescrollUp: {
            callback: this.upCallback,
            noMoreSize: 1,
            page: {
                num: 0, 
                size: 10,
                time: null
            },
            empty: {
                warpId: "mescroll",
                tip: '暂无相关数据',
            },
            htmlNodata: '<p class="upwarp-nodata">-- 已加载完 --</p>',
            htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>',
          },
          totalCount:''
    };
  },
  mounted() {
    let that = this
    that.mescroll.resetUpScroll();
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback(page,mescroll) {
        this.$getRequest(myTeam,{currPage:page.num,pageSize:page.size}).then(res => {
            if(res.data.code === 0){
                let arr = res.data.page.list
                this.totalCount = res.data.page.totalCount
                if(page.num === 1) this.list = []
                this.list = this.list.concat(arr)
                this.$nextTick(() => {
                this.mescroll.endSuccess(arr.length);
              })
            }else{
            
            }
        })
      },
  }
};
</script>

<style>
</style>