<template>
  <div class="main">
    <div>
      <img src="../assets/images/user-image.png">
      <span>{{idCard.Name}}</span>
    </div>
    <p>身份证号 <span>{{idCard.Document}}</span></p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'idCard'
    ])
  },
  created() {
    this.$store.dispatch('getIdCard', this.userInfo.token)
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.main {
  padding: px2rem(30px);
  div {
    line-height: px2rem(100px);
    img {
      width: px2rem(100px);
      height: px2rem(100px);
      vertical-align: top;
    }
    span {
      color: #666;
      font-size: px2rem(36px);
      margin-left: px2rem(20px);
    }
  }
  p {
  	font-size: px2rem(48px);
  	color: #333;
  	margin-top: px2rem(40px);
  	span{
  		margin-left: px2rem(10px);
  	}
  }
}

</style>
