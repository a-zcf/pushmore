<template>
  <div class="my-qr-code">
     
  </div>
</template>

<script>
export default {
  name:'MyQrCode',
  data() {
      return {
        activityId:0,
      }
  },
  mounted() {
     this.activityId = this.$route.query.activityId
  },
  methods:{

  }
}
</script>

<style>

</style>