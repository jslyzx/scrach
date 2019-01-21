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
        <img src="../assets/images/zhangdan.png">
        <span>账单</span>
      </div>
      <div class="item">
        <img src="../assets/images/cz.png">
        <span>电费充值</span>
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
  .list{
  	display: flex;
  	align-content: flex-start;
  	justify-content: space-around;

  	.item{
  		flex: 0 1 px2rem(155px);
	    text-align: center;
	    font-size: 14px;
		margin-top: px2rem(30px);
		margin-bottom: px2rem(60px);

	    img{
	    	width: px2rem(155px);
    		height: px2rem(155px);
    		margin-bottom: px2rem(10px);
	    }
  	}
  }

}

</style>
