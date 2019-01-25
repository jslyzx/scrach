<template>
  <div class="mui-card bill-item">
    <div class="mui-card-header">账单周期：{{bill.BeginTime | formatDate}} ~ {{bill.EndTime | formatDate}}</div>
    <div class="mui-card-content">
      <div class="mui-checkbox mui-left">
        <input type="checkbox" name="" @click="select">
      </div>
      <router-link class="mui-card-content-inner" :to="{path: '/life/bill/' + bill.Id}">
        <p>金额：{{bill.Amount}}元</p>
        <p>应付时间：{{bill.ShouldReceive | formatDate}}</p>
        <p class="status" v-if="isYq">已逾期{{yqDate}}天</p>
        <p class="status" v-if="bill.PayStatus===1">已支付</p>
        <p class="status" v-else>--</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    bill: Object
  },
  computed: {
    yqDate() {
      var a = new Date(this.bill.ShouldReceive)
      var b = Math.floor((new Date().getTime() - a) / 1000 / 60 / 60 / 24)
      return b
    },
    isYq() {
      return new Date(this.bill.ShouldReceive).getTime() < new Date().getTime()
    }
  },
  methods: {
    select() {
      return false;
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.mui-card {
  display: block;
}
.status {
  position: absolute;
  top: 30px;
  right: 20px;
  color: #ff5252;
}
.mui-checkbox {
  height: 40px;
  width: 40px;
  float: left;
  top: 24px;
}
.mui-card-content-inner {
  float: right;
  width: calc(100% - 60px);
  padding-left: 0;
  margin-left: 20px;
}

</style>
