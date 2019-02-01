<template>
  <div class="header" v-if="showHead">
    <div class="header-icon" v-show="backDisplay" @click="goBack"><i class="icon">&#xe622;</i></div>
    <div class="header-cont"><p>{{title}}</p></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      backDisplay: Boolean,
      showHead: Boolean
    },
    data() {
      return {
        
      }
    },
    methods: {
      goBack () {
        window.history.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/css/function';

.header{
  position: fixed;
  transform: translateZ(0);
  top: 0;
  z-index: 4;
  height: px2rem(100px);
  width: 100%;
  background: #FF5252;
  display: flex;
  flex-direction: row;
  .header-icon{
    flex:1;
    text-align: center;
    >i{
      line-height: px2rem(100px);
    }
    .map-icon{
      font-size: 22px;
    }
  }
  
  .header-cont {
    flex: 6;
    padding-left: px2rem(40px);
      >p{
        line-height: px2rem(100px);
        color: #ffffff;
        font-size:17px;
      }
    }
  }
</style>