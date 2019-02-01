<template>
  <div>
    <div class="tab-wrap">
      <a href="javascript:;" :class="{active: !PayStatus}" @click="changeTab($event)">未付账单</a>
      <a href="javascript:;" :class="{active: PayStatus}" @click="changeTab($event)">历史账单</a>
    </div>
    <div class="list">
      <bill-list :status="PayStatus" :contract-id="ContractId"></bill-list>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import BillList from '@/pages/BillList'
export default {
  data() {
    return {
      ContractId: 0,
      PayStatus: 0
    }
  },
  components: {
    BillList
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.ContractId = Number(this.$route.query.ContractId)
  },
  methods: {
    changeTab(e) {
      if (e.currentTarget.className !== 'active') {
        this.PayStatus = (1 - this.PayStatus)
      }
    }
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.path === '/life/bill') {
        this.ContractId = Number(this.$route.query.ContractId)
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
