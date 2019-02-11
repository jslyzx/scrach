<template>
  <!-- <div class="main">
    <div>
      <img src="../assets/images/user-image.png">
      <span>{{idCard.Name}}</span>
    </div>
    <p>身份证号 <span>{{idCard.Document}}</span></p>
  </div> -->
  <div class="mui-card">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        姓名
        <span>{{idCard.Name}}</span>
      </li>
      <li class="mui-table-view-cell">
        证件类型
        <span>身份证</span>
      </li>
      <li class="mui-table-view-cell">
        证件编号
        <span>{{idCard.Document}}</span>
      </li>
      <li class="mui-table-view-cell">
        性别
        <span>{{sexText}}</span>
      </li>
    </ul>
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
    ]),
    sexText() {
      return this.idCard.Sex === 0 ? '男' : '女'
    }
  },
  created() {
    this.$store.dispatch('getIdCard', this.userInfo.token)
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
span{
  float: right;
}

</style>
