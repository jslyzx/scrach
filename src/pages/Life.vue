<template>
  <div class="life">
    <div class="list">
      <div class="item">
        <router-link to='/life/bx'>
          <img src="../assets/images/bx.png">
          <span>报修</span>
        </router-link>
      </div>
      <div class="item">
        <router-link to='/life/bill'>
          <img src="../assets/images/zhangdan.png">
          <span>账单</span>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/life/elec">
          <img src="../assets/images/cz.png">
          <span>电费充值</span>
        </router-link>
      </div>
    </div>
    <div class="list">
      <div class="item">
        <img src="../assets/images/tz.png">
        <span>退租</span>
      </div>
      <div class="item">
        <img src="../assets/images/km.png">
        <span>开门</span>
      </div>
      <div class="item">
        <router-link to='life/fgy'>
          <img src="../assets/images/fgy.png">
          <span>房管员</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  created() {},
  data() {
    return {

    }
  },
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';

.life {
  position: absolute;
  left: 0;
  right: 0;
  top: px2rem(100px);
  bottom: px2rem(98px);
  background: #fff;
  .list {
    display: flex;
    align-content: flex-start;
    justify-content: space-around;

    .item {
      flex: 0 1 px2rem(120px);
      text-align: center;
      font-size: 14px;
      margin-top: px2rem(30px);
      margin-bottom: px2rem(60px);

      img {
        width: px2rem(100px);
        height: px2rem(100px);
        margin-bottom: px2rem(10px);
      }
    }
  }

}

</style>
