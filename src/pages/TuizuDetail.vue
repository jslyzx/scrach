<template>
  <div class="detail mui-content">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">状态</span>
          <span class="c">{{statusText}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">离店时间</span>
          <span class="c">{{detail.TuifangTime | formatDate}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">银行</span>
          <span class="c">{{detail.BankName}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">账户名</span>
          <span class="c">{{detail.AmountName}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">卡号</span>
          <span class="c">{{detail.Account}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card" v-if="detail.Status === 1 || detail.Status === 2">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">审核结果</span>
          <span class="c">{{detail.result}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span class="t">退款金额</span>
          <span class="c">{{detail.Amount}}</span>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-collapse">
              <a class="mui-navigate-right">查看退款项</a>
              <div class="mui-collapse-content">
                <div class="item" v-for="(item) in detail.list">
                  <span class="t">{{item.Name}}</span>
                  <span class="c">{{item.Amount}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
export default {
  data() {
    return {
      detail: {
        Account: '',
        TuifangTime: '',
        Amount: 0,
        result: '',
        Status: 0,
        list: [],
        BankName: '',
        AmountName: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    statusText() {
      switch (this.detail.Status) {
        case 0:
          return '审核中'
          break
        case 1:
          return '审核失败'
          break
        case 2:
          return '审核成功'
          break
      }
    }
  },
  created() {
    this.getTuizuDetail()
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if(to.matched[0].path === '/life/tuizu/:id'){
      	this.getTuizuDetail()
      }
      
    }
  },
  methods: {
    getTuizuDetail() {
      api.queryTuizuDetail({
          access_token: this.userInfo.token,
          ContractId: this.$route.params.id
        })
        .then(res => {
          console.log(res.numberData)
          this.detail = res.numberData
        })
        .catch(error => {
          mui.toast('获取信息失败')
        })
    }
  }
}

</script>
<style lang="scss" scoped>
	.c{
		float: right;
	}
</style>
