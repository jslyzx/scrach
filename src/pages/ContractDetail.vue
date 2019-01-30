<template>
  <div class="detail">
    <h1 class="title">签约人：{{contract.Teant.Name}}</h1>
    <div class="item">
      <p>
        <span class="left">合同周期</span>
        <span class="right">{{contract.BeginTime | formatDate}} ~ {{contract.EndTime | formatDate}}</span>
      </p>
      <p>
        <span class="left">地址</span>
        <span class="right">{{contract.HouseName}}</span>
      </p>
    </div>
    <div class="item">
      <p class="item-head">押金</p>
      <p>
        <span class="left">付款方式</span>
        <span class="right">{{pinText}}</span>
      </p>
      <p>
        <span class="left">房租</span>
        <span class="right">{{contract.Recent}}元</span>
      </p>
      <p v-for="(item) in contract.Yajin">
        <span class="left">{{item.Name}}</span>
        <span class="right">{{item.Amount}}元</span>
      </p>
    </div>
    <div class="item" v-if="contract.Otherfee && contract.Otherfee.length > 0">
      <p class="item-head">杂费信息</p>
      <p v-for="(item) in Otherfee">
        <span class="left">{{item.Name}}</span>
        <span class="right">{{item.Amount}}元</span>
      </p>
    </div>
    <div class="item">
      <p class="item-head">租客信息</p>
      <p>
        <span class="left">姓名</span>
        <span class="right">{{contract.Teant.Name}}</span>
      </p>
      <p>
        <span class="left">性别</span>
        <span class="right">{{sexText}}</span>
      </p>
      <p>
        <span class="left">手机号</span>
        <span class="right">{{contract.Teant.Phone}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import api from '../fetch/api'
export default {
  data() {
    return {
      id: this.$route.params.id,
      contract: {
      	Teant: {},
      	Yajin: [],
      	Otherfee: []
      }
    }
  },
  created() {
    this.getContractDetail()
  },
  watch: {
    '$route'(to, from) {
      if(to.name === 'ContractDetail'){
      	this.getContractDetail()
      }
    }
  },
  computed: {
  	pinText(){
  		return (this.contract.Pinlv === 0 ? '零' : '一') + '月一付'
  	},
  	sexText(){
  		return this.contract.Sex === 0 ? '男' : '女'
  	}
  },
  methods: {
    getContractDetail() {
      api.getContractDetail(this.id)
        .then((res) => {
          this.contract = res.numberData
        })
        .catch((error) => {
          console.lgo(error)
        })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.detail {
  background: #fff;
  position: absolute;
  top: px2rem(100px);
  bottom: 0;
  left: 0;
  right: 0;
  padding: px2rem(46px) px2rem(35px) 0 px2rem(29px);
  .title {
    color: #FF5252;
    border-bottom: 1px solid #FF5252;
    font-size: px2rem(42px);
    padding-bottom: px2rem(10px);
  }
  .item {
    margin-top: 20px;
    p {
      overflow: hidden;
      margin-bottom: 0;
      &.item-head {
        color: #000;
        font-weight: bold;
      }
      .left {
        float: left;
        color: #333;
      }
      .right {
        float: right;
        color: #666;
      }
    }
  }

}

</style>
