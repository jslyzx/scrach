<template>
  <router-link :to="{ path: redirectUrl, query:{ContractId: contract.Id, HouseId: contract.HouseId, HouseName: contract.HouseName} }" class="mui-card">
    <div class="mui-table-view">
      <div class="mui-table-view-cell">
        <p><span class="item-t">合同周期:</span><span class="item-c">{{contract.BeginTime | formatDate}} ~ {{contract.EndTime | formatDate}}</span></p>
        <p><span class="item-t">租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金:</span><span class="item-c">{{contract.Recent}}元</span></p>
        <p><span class="item-t">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</span><span class="item-c">{{contract.HouseName}}</span></p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    contract: Object,
    redirectUrl: String
  },
  data() {
    return {

    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
a {
  display: block;
}
.item-t{
  color: #333;
  font-size: px2rem(32px);
}
.item-c{
  color: #999;
  font-size: px2rem(32px);
  margin-left: px2rem(10px);
}
</style>
