<template>
  <router-link :to="{ path: '/user/contract/detail/' + contract.Id }" class="mui-card">
    <div class="mui-table-view">
      <div class="mui-table-view-cell">
        <p><span class="item-t">合同周期:</span><span class="item-c">{{contract.BeginTime | formatDate}} ~ {{contract.EndTime | formatDate}}</span></p>
        <p><span class="item-t">租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金:</span><span class="item-c">{{contract.Recent}}元</span></p>
        <p><span class="item-t">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</span><span class="item-c">{{contract.HouseName}}</span></p>
        <p class="status">{{statusText}}</p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    contract: Object
  },
  data() {
    return {

    }
  },
  computed: {
    statusText() {
      switch (this.contract.Status) {
        case 1:
          return '待签约'
          break
        case 4:
          return '待搬入'
          break
        case 5:
          return '在租'
          break
        case 6:
          return '已到期'
          break
        case 7:
          return '已退租'
          break
        case 8:
          return '已作废'
          break
        case 9:
          return '退租中'
          break
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
a {
  display: block;
}
.item-t {
  color: #333;
  font-size: px2rem(32px);
}
.item-c {
  color: #999;
  font-size: px2rem(32px);
  margin-left: px2rem(10px);
}
.status {
  position: absolute;
  top: 40px;
  right: 20px;
  color: #FF5252;
}

</style>
