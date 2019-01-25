<template>
  <div>
    <bill-item v-for="(item,index) in billList" :key="item.objectId" :bill="item"></bill-item>
    <div class="total" v-if="status === 0">
      <div class="mui-checkbox mui-left">
        <label>全选</label>
        <input type="checkbox" name="">
      </div>
      <div class="selected">
        <p>共选中0条账单</p>
        <p class="sum">合计&yen;0.00</p>
      </div>
      <el-button size="mini" disabled>支付</el-button>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import BillItem from '@/pages/BillItem'

export default {
  props: {
    status: Number,
    contractId: Number
  },
  components: {
    BillItem
  },
  data() {
    return {
      pageindex: 1,
      disabled: true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'billList'
    ])
  },
  created() {
    debugger
    this.getBillList()
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      this.index = Number(this.$route.query.index || 0)
    },
    status(val){
      this.getBillList()
    }
  },
  methods: {
    getBillList() {
      this.$store.dispatch("getBillList", {
        access_token: this.userInfo.token,
        PayStatus: this.status,
        pageindex: this.pageindex,
        pagesize: 10,
        ContractId: this.contractId
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.total {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: #fff;
  z-index: 99999;
  .mui-checkbox {
    float: left;
    label {
      line-height: 40px;
      padding-left: 50px;
      font-size: 14px;
    }
  }
  .selected {
    float: left;
    p {
      margin-bottom: 0;
    }
    .sum {
      color: #ff5252;
    }
  }
  button {
    float: right;
    margin-right: 20px;
    margin-top: 3px;
  }
}

</style>
