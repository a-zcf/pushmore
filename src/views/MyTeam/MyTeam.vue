<template>
  <div class="my-team">
    <div class="head-img">
      <img src="../../assets/img/headImg.png" />
    </div>

        <h3 class="title">~~已扫码活动指定规格的用户~~</h3>
        <div class="list">
            <ul>
              <li>
                <img class="head-portrait" src="" />
                <span class="name formal-name">XXXXX</span>
                <span class="sweep-code">
                  <p class="code">已扫码中支凌云</p>
                  <p class="time">扫码时间：2020-11-02 11:00:00</p>
                </span>
              </li>
              <!-- <van-divider v-if="formalList==''">暂无相关数据~~</van-divider> -->
            </ul>
        </div>

  </div>
</template>

<script>
import {} from '../../api/api'
export default {
  name: "MyTeam",
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style>
</style>