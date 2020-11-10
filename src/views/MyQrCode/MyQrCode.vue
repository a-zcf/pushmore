<template>
  <div class="my-qr-code">
     <img class="codeImg" :src="url" />
  </div>
</template>

<script>
import {} from '../../api/api'
export default {
  name:'MyQrCode',
  data() {
      return {
        url:''
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