<template>
  <div>
    <div v-if="userContractList.length === 1 || typeof this.$route.query.index !== 'undefined'">
      <div class="tab-wrap">
        <a href="javascript:;" :class="{active: !PayStatus}" @click="changeTab($event)">未付账单</a>
        <a href="javascript:;" :class="{active: PayStatus}" @click="changeTab($event)">历史账单</a>
      </div>
      <div class="list">
        
      </div>
    </div>
    <div v-else>
      <contract-list :contract-list="userContractList" :redirect-url="url"></contract-list>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import ContractList from '@/pages/ContractList'
import BillList from '@/pages/BillList'
export default {
  data() {
    return {
      url: '/life/bill',
      index: typeof this.$route.query.index !== 'undefined' ? Number(this.$route.query.index) : 0,
      ContractId: 0,
      PayStatus: 0,
      pagesize: 10,
      pageindex: 1
    }
  },
  components: {
    ContractList,
    BillList
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'billList',
      'userContractList'
    ])
  },
  watch: {
    userContractList: {
      handler: function(newVal, oldVal) {
        var data = newVal[this.index]
        this.ContractId = data.Id
      }
    }
  },
  created() {
    this.$store.dispatch("getBillList", { access_token: this.userInfo.token, PayStatus: 0, pageindex: 1, pagesize: 10, ContractId: 349 })
    this.$store.dispatch("getUserContractList", {
      access_token: this.userInfo.token,
      iskaimen: 0
    })
  },
  methods: {
    changeTab(e) {
      if (e.currentTarget.className !== 'active') {
        this.PayStatus = (1 - this.PayStatus)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.tab-wrap {
  background: #fff;
  height: px2rem(90px);
  line-height: px2rem(90px);
  a {
    font-size: 16px;
    color: #999;
    padding: px2rem(25px) px2rem(23px);
    &:nth-child(1) {
      margin-left: px2rem(140px);
      margin-right: px2rem(180px);
    }
    &:link,
    &:hover {
      text-decoration: none;
    }
  }
  .active {
    color: #FF5252;
    border-bottom: 1px solid #FF5252;
  }

}

</style>
