<template>
  <div class="mui-card bill-item" v-if="isShow">
    <div class="mui-card-header">账单周期：{{bill.BeginTime | formatDate}} ~ {{bill.EndTime | formatDate}}</div>
    <div class="mui-card-content">
      <div class="mui-checkbox mui-left" v-if="status === 0">
        <input type="checkbox" @click="select($event, bill.Id)" :checked="checkedIds.indexOf(bill.Id) > -1">
      </div>
      <router-link class="mui-card-content-inner" :to="{path: '/life/bill/' + bill.Id}">
        <p>金额：{{bill.Amount}}元</p>
        <p>应付时间：{{timeText}}</p>
        <p class="status" v-text="statusText"></p>
      </router-link>
    </div>
  </div>
</template>
<script>
import {
  formatDate
} from '@/util/filter'
export default {

  data() {
    return {

    }
  },
  props: {
    bill: Object,
    checkedIds: Array,
    status: Number,
    showMore: Boolean
  },
  computed: {
    yqDate() {
      var a = new Date(this.bill.ShouldReceive)
      var b = Math.floor((new Date().getTime() - a) / 1000 / 60 / 60 / 24)
      return b
    },
    isYq() {
      return new Date(this.bill.ShouldReceive).getTime() < new Date().getTime()
    },
    statusText() {
      if (this.bill.PayStatus === 1) {
        return '已支付'
      } else if (new Date(this.bill.ShouldReceive).getTime() < new Date().getTime()) {
        return '已逾期' + this.yqDate + '天'
      } else {
        return '--'
      }
    },
    timeText() {
      var today = formatDate(new Date())
      var ShouldReceive = formatDate(this.bill.ShouldReceive)
      if (today > ShouldReceive) {
        return ShouldReceive + '前'
      } else if (today === ShouldReceive) {
        return '今日支付'
      } else {
        return '未支付'
      }
    },
    isShow() {
      if (this.showMore) return true
      if (formatDate(this.bill.ShouldReceive, 'yyyy-MM') > formatDate(new Date(), 'yyyy-MM')) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    select(e, billId) {
      var t = e.currentTarget
      this.$emit('sendData', {
        type: t.checked ? 0 : 1,
        id: billId
      })
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
