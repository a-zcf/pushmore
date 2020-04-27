<template>
  <div class="my-qr-code">
     <img class="codeImg" :src="url" />
  </div>
</template>

<script>
import {MyCard, UpdateMyCard} from '../../api/api'
export default {
  name:'MyQrCode',
  data() {
      return {
        activityId:0,
        url:'',
      }
  },
  mounted() {
     this.url = this.$route.query.url
  },
  methods:{

  }
}
</script>

<style>

</style>