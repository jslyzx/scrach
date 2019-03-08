<template>
  <div class="main">
    <img src="../assets/images/success.png">
    <p>签约成功</p>
    <p>签约成功,关注公众号"{{wxName}}"进行在线缴费</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wxName: window.g.wxName
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
