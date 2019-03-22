<template>
  <div class="main">
    <img src="../assets/images/success.png">
    <p v-if="inWx">支付成功，即将跳转</p>
    <p v-else>支付成功</p>
    <button v-if="inWx" class="mui-btn mui-btn-danger mui-btn-block" @click="returnAction">确定</button>
    <p v-else>请在微信中打开公众号"{{wxName}}"</p>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      wxName: window.g.wxName,
      inWx: typeof WeixinJSBridge !== 'undefined'
    }
  },
  created() {
    if (this.inWx) {
      setTimeout(this.returnAction, 5000)
    }
  },
  computed: {
    ...mapGetters([
      'payReturnUrl'
    ])
  },
  methods: {
    returnAction() {
      this.$router.replace(this.payReturnUrl)
    }
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
