<template>
  <div class="mui-content-padded" v-if="step === 1">
    <div class="mui-input-group">
      <div class="mui-input-row">
        <label>地址</label>
        <input type="text" readonly="readonly" :value="contract.HouseName">
      </div>
      <div class="mui-input-row">
        <label>租客姓名</label>
        <input type="text" readonly="readonly" :value="contract.Teant.Name">
      </div>
      <div class="mui-input-row">
        <label>合同周期</label>
        <span>{{contract.BeginTime | formatDate}} ~ {{contract.EndTime | formatDate}}</span>
      </div>
      <div class="mui-input-row">
        <label>离房日期</label>
        <el-date-picker v-model="TuifangTime" type="date" placeholder="请选择" value-format="yyyy-MM-dd" @change="selectTime" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </div>
    <div class="mui-input-group">
      <div class="mui-input-row">
        <label>手机号码</label>
        <button type="button" class="fr" v-show="!sendCode" @click="getVerifiCode">获取验证码</button>
        <span v-show="sendCode" class="timeout">{{timeOut}}秒</span>
        <input type="text" :value="userInfo.username" readonly="readonly" class="size-sm">
      </div>
      <div class="mui-input-row">
        <label>验证码</label>
        <input type="text" v-model="yzm">
      </div>
    </div>
    <button type="button" class="submit" @click="submit">下一步</button>
  </div>
  <div v-else>
    <div class="total">
      <span>总计</span>
      <span>{{Amount || 100}}</span>
      <span>元</span>
    </div>
    <div class="mui-card list" v-if="tuikuanList.length > 0 || shoukuanList.length > 0">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse" v-if="tuikuanList.length > 0">
          <a class="mui-navigate-right item-name" href="javascript:;">退款项</a>
          <div class="mui-collapse-content">
            <ul class="mui-table-view">
              <li class="mui-table-view-cell" v-for="item in tuikuanList" :key="item.Id">
                {{item.Name}}
                <span class="right">{{item.Amount}}</span>
              </li>
            </ul>
          </div>
        </li>
        <li class="mui-table-view-cell mui-collapse" v-if="shoukuanList.length > 0">
          <a class="mui-navigate-right item-name" href="javascript:;">收款项</a>
          <div class="mui-collapse-content">
            <ul class="mui-table-view">
              <li class="mui-table-view-cell" v-for="item in shoukuanList" :key="item.Id">
                {{item.Name}}
                <span class="right">{{item.Amount}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="mui-card account">
      <a class="item-name">收款账户</a>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell cell-item">
          银行名称
        </li>
        <li class="mui-table-view-cell cell-content">
          <a class="mui-navigate-right" href="#select">
            <input type="text" readonly="readonly" v-model="BankName">
          </a>
        </li>
        <li class="mui-table-view-cell cell-item">
          银行卡账户名
        </li>
        <li class="mui-table-view-cell cell-content">
          <input type="text" placeholder="银行卡账户名" v-model="AmountName">
        </li>
        <li class="mui-table-view-cell cell-item">
          银行卡账号
        </li>
        <li class="mui-table-view-cell cell-content">
          <input type="text" placeholder="银行卡账号" v-model="Account">
        </li>
      </ul>
    </div>
    <div id="select" class="mui-popover mui-popover-action mui-popover-bottom">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" v-for="item in bankList">
          <a @click="choose(item.Name)">{{item.Name}}</a>
        </li>
      </ul>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a @click="hide"><b>取消</b></a>
        </li>
      </ul>
    </div>
    <button type="button" class="submit" @click="audit">提交审核</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
import _ from 'lodash'
export default {
  data() {
    return {
      ContractId: 0,
      contract: {
        Teant: {},
        Yajin: [],
        Otherfee: []
      },
      TuifangTime: '',
      yzm: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      sendCode: false,
      timeOut: 60,
      step: 1,
      Amount: 0,
      list: [],
      Account: '',
      AmountName: '',
      BankName: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'bankList'
    ]),
    tuikuanList() {
      return _.filter(this.list, function(item) { return item.Type === 0 })
    },
    shoukuanList() {
      return _.filter(this.list, function(item) { return item.Type === 1 })
    }
  },
  created() {
    this.getContractDetail()
    this.$store.dispatch("queryBankList")
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应      debugger
      if (to.path === '/life/tuizu') {
        this.getContractDetail()
      }
    }
  },
  methods: {
    getContractDetail() {
      this.ContractId = Number(this.$route.query.ContractId)
      api.getContractDetail(this.ContractId)
        .then((res) => {
          this.contract = res.numberData
        })
        .catch((error) => {
          console.lgo(error)
        })
    },
    queryTuizu() {
      api.queryTuizu({
          contractid: this.ContractId,
          EndTime: this.contract.EndTime,
          Tuizutime: this.TuifangTime
        })
        .then((res) => {
          this.Amount = res.numberData.amount
          this.list = res.numberData.list
        })
        .catch((error) => {
          console.log(error)
        })
    },
    selectTime: function(el) {
      var d = new Date(el);
      if (d < new Date().getTime()) {
        this.TuifangTime = ''
        mui.toast('选择的时间不能小于当前时间')
      }
    },
    getVerifiCode() {
      api.RegistVerifiCode({
          Phone: this.userInfo.username,
          Type: 5
        })
        .then(res => {
          this.sendCode = true
          this.setTimeOut()
        })
        .catch(err => {
          mui.alert('短信发送失败')
        })

    },
    setTimeOut() {
      let timer = setTimeout(() => {
        this.setTimeOut()
        if (this.timeOut > 0) {
          this.timeOut--
        }
      }, 1000)
      if (this.timeOut <= 0) {
        this.sendCode = false
        this.timeOut = 60
        clearTimeout(timer)
      }
    },
    submit() {
      if (!this.TuifangTime) {
        mui.alert('请填写离房日期')
        return
      }
      if (!this.yzm) {
        mui.alert('请填写验证码')
        return
      }
      api.verifyYzm({
          yzm: this.yzm,
          username: this.userInfo.username,
          type: 5
        })
        .then((res) => {
          if (res.Code === 0) {
            this.step = 2
            this.queryTuizu()
            return
          } else {
            mui.alert(res.Message)
          }
        })
        .catch((error) => {
          mui.alert('发送失败，请重试')
        })
    },
    choose(e) {
      this.BankName = e
      mui('#select').popover('hide')
    },
    hide: function() {
      mui('#select').popover('hide')
    },
    audit() {
      let data = {
        TuifangTime: this.TuifangTime,
        Amount: this.Amount,
        ContractId: this.ContractId,
        list: this.list,
        Account: this.Account,
        AmountName: this.AmountName,
        BankName: this.BankName
      }
      api.approveTuizu(data)
        .then(res => {
          if (res.Code === 0) {
            mui.toast(res.Message)
            this.$router.replace('/life')
          } else {
            mui.alert(res.Message)
          }
        })
        .catch(error => {

        })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.mui-input-group {
  margin-top: 10px;
  .mui-input-row {
    input {
      font-size: 14px;
    }
    label {
      line-height: initial;
    }
    span {
      font-size: 14px;
      line-height: 40px;
    }
    .size-sm {
      width: 35%;
    }
    .fr {
      float: right;
      position: relative;
      top: 3px;
    }
    .timeout {
      float: right;
      width: 96px;
      display: inline-block;
      text-align: center;
    }
  }
}
.submit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
  height: px2rem(100px);
  background: #FF5252;
  color: #fff;
  font-size: px2rem(36px);
  line-height: px2rem(100px);
  text-align: center;
  letter-spacing: 20px;
  padding: 0;
}
.total {
  width: px2rem(575px);
  height: px2rem(108px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 1px rgba(252, 130, 130, 0.35);
  border-radius: px2rem(16px);
  margin: 10px auto;
  font-size: px2rem(36px);
  line-height: px2rem(108px);
  text-align: center;
  span:nth-child(1) {
    color: #FF5252;
  }
  span:nth-child(2) {
    color: #4DBAF5;
    margin-left: px2rem(60px);
  }
  span:nth-child(3) {
    color: #999;
    margin-left: px2rem(10px);
  }
}
.list {

  .mui-collapse {

    .right {
      float: right;
      margin-right: 20px;
    }
    .mui-table-view-cell {
      color: #4DBAF5;
      font-size: px2rem(36px);
    }
  }
}
.item-name {
  color: #FF5252 !important;
  font-size: px2rem(36px);
}
.account {
  padding-top: 20px;
  .item-name {
    margin-left: 16px;
  }
  .cell-item {
    color: #4DBAF5;
    padding-bottom: 0;
    &:after {
      content: none;
    }
  }
  .cell-content {
    input {
      width: 80%;
      height: 30px;
      background-color: #E8E8E8;
      margin-bottom: 0;
    }
    .mui-navigate-right:after {
      right: 50px;
      top: 27px;
    }
    &:after {
      content: none;
    }
  }
}

</style>
