<template>
  <div class="detail mui-content">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">账单周期</span>
          <span class="c">{{billDetail.BeginTime | formatDate}} ~ {{billDetail.EndTime | formatDate}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">应付时间</span>
          <span class="c">{{billDetail.ShouldReceive | formatDate}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">支付状态</span>
          <span class="c">{{statusText}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">收款项</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="item" v-for="(item, index) in billDetail.list">
            <span class="item-t">{{item.BillType}}</span>
            <span class="item-c">{{item.Amount}}</span>
          </div>
        </div>
      </div>
      <div class="mui-card-footer">
        <span class="t">总计</span>
        <span>{{billDetail.Amount}}</span>
      </div>
    </div>
    <button type="button" class="mui-btn mui-btn-danger mui-btn-block" @click="submit">支付账单</button>
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
      'billDetail'
    ]),
    statusText() {
      if (this.billDetail.PayStatus === 0)
        return '待付款'
      else
        return '已收款'
    }
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      this.getDetail()
    }
  },
  methods: {
    ...mapActions({
      setPayReturnUrl: 'setPayReturnUrl'
    }),
    getDetail() {
      this.$store.dispatch('getBillDetail', { access_token: this.userInfo.token, Id: this.$route.params.id })
    },
    submit() {
      this.setPayReturnUrl(this.$route.fullPath)
      this.$router.push({
        name: 'pay',
        params: {
          Amount: this.billDetail.Amount,
          list: [{ Id: this.billDetail.Id, Amount: this.billDetail.Amount }]
        },
        query: {
          type: 'bill'
        }
      })
    }
  },
  created() {
    this.getDetail()
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.t {
  color: #333;
}
.c {
  margin-left: 20px;
  color: #999;
}
.item-c,
.item-t {
  font-size: 12px;
  display: inline-block;
  width: px2rem(120px);
  font-size: 12px;
}
.item-c {
  text-align: right;
  width: px2rem(160px);
}
button {
  position: fixed;
  bottom: 0;
  margin-bottom: 0;
}

</style>
