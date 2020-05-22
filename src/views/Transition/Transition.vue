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
          let result = res.data.data.result
         this.had = result.had;
         let activityIds = result.activityIds;
         let needLocationCheck = result.needLocationCheck
            this.$toast.loading({
              message: "请稍等...",
              forbidClick: true,
              loadingType: "spinner"
            });
              this.$router.push({ path: "/IndexInfo", query:{activityIds:activityIds, had:this.had,needLocationCheck:needLocationCheck}});
        }
      });
    }
  }
};
</script>

<style>
</style>