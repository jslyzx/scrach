<template>
  <div>
    <div v-if="fgy">
      <img src="../assets/images/user-image.png" class="user-image">
      <div class="item">
        <span class="item-t">姓名</span>
        <span>{{fgy.RealName}}</span>
      </div>
      <div class="item">
        <span class="item-t">电话</span>
        <a :href="tel"><i></i>{{fgy.Mobile}}</a>
      </div>
    </div>
    <div v-else>
      <img src="../assets/images/user-image.png" class="user-image">
      <div class="item">
        <span class="item-t">姓名</span>
        <span>--</span>
      </div>
      <div class="item">
        <span class="item-t">电话</span>
        <span>--</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {
  created() {
    if (this.$route.query.HouseId) {
      this.$store.dispatch("getFgy", { access_token: this.userInfo.token, HouseId: this.$route.query.HouseId })
    }
  },
  data() {
    return {
      url: '/life/fgy'
    }
  },
  computed: {
    ...mapGetters([
      'fgy',
      'userInfo'
    ]),
    tel() {
      return 'tel:' + this.fgy.Mobile
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.user-image {
  width: px2rem(136px);
  height: px2rem(136px);
  display: block;
  margin: px2rem(40px) auto;
}
.item {
  margin-left: px2rem(40px);
  height: px2rem(30px);
  line-height: px2rem(30px);
  margin-bottom: px2rem(30px);
  font-size: 14px;

  .item-t {
    margin-right: px2rem(50px);
  }
}
a{
  i{
    background: url(../assets/images/tel-icon.png) no-repeat left center;
    display: inline-block;
    width: px2rem(40px);
    height: px2rem(40px);
    background-size: cover;
    vertical-align: bottom;
  }
  
}
</style>
