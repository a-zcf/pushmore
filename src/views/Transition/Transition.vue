<template>
  <div></div>
</template>

<script>
   import {HadpartIn} from '../../api/api'
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
    getHadpartInData () {
      this.$getRequest(HadpartIn).then(res => {
        if (res.data.code === "0000") {
         this.had = res.data.data.result.had;
         let activityIds = res.data.data.result.activityIds;
            this.$toast.loading({
              message: "请稍等...",
              forbidClick: true,
              loadingType: "spinner"
            });
            setTimeout(() => {
              this.$router.push({ path: "/IndexInfo", query:{activityIds:activityIds, had:this.had}});
            }, 1000);
        }
      });
    }
  }
};
</script>

<style>
</style>