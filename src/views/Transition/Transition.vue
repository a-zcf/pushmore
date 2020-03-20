<template>
  <div></div>
</template>

<script>
import {HadpartIn} from "../../api/api";
export default {
  name: "Transition",
  data() {
    return {
      had: false, // 是否参与活动
    };
  },
  mounted() {
    this.getHadpartInData();
  },
  methods: {
    // 是否参与活动
    getHadpartInData: function() {
      this.$getRequest(HadpartIn).then(res => {
        console.log(res)
        if (res.data.code === "0000") {
          this.had = res.data.data.result.had;
         let activityId = res.data.data.result.activityId;
          if (this.had == true) {
            this.$toast.loading({
              message: "请稍等...",
              forbidClick: true,
              loadingType: "spinner"
            });
            setTimeout(() => {
              this.$router.push({ path: "/IndexInfo", query:{activityId:activityId}});
            }, 1000);
          } else {
            setTimeout(() => {
            this.$router.push({ path: "/NonConformity" });
            }, 1000);
          }
        }
      });
    }
  }
};
</script>

<style>
</style>