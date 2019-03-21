<template>
  <div class="main">
    <img src="../assets/images/success.png">
    <p>支付成功</p>
    <p v-if="typeof WeixinJSBridge == 'undefined'">支付成功,请在微信中打开公众号"{{wxName}}"</p>
    <p v-else>支付成功，即将跳转</p>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      wxName: window.g.wxName
    }
  },
  created() {
    if(typeof WeixinJSBridge !== "undefined"){
      this.$router.replace(that.payReturnUrl)
    }
  },
  computed: {
    ...mapGetters([
      'payReturnUrl'
    ]),
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  img {
    width: px2rem(300px);
    display: block;
    margin: px2rem(60px) auto;
  }
  p {
    text-align: center;
    color: #FF5252;
  }
}

</style>
