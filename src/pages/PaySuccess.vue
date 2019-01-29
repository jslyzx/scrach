<template>
  <div></div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {

    }
  },
  created() {
    var that = this
    mui.alert('支付成功', '即将跳转', function() {
      that.$router.replace(that.payReturnUrl)
    })
  },
  computed:{
  	...mapGetters([
      'payReturnUrl'
    ]),
  }
}

</script>
<style lang="scss" scoped></style>
