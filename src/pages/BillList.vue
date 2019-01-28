<template>
  <div>
    <scroll ref="scroll" :data="billList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
      <div class="list-content">
        <bill-item v-for="(item,index) in billList" :key="item.objectId" :bill="item" :checkedIds="checkedIds" v-on:sendData="getData"></bill-item>
      </div>
    </scroll>
    <div class="total" v-if="status === 0">
      <div class="mui-checkbox mui-left">
        <label>全选</label>
        <input type="checkbox" name="" @click="checkAll($event)" :checked="allSelected">
      </div>
      <div class="selected">
        <p>共选中0条账单</p>
        <p class="sum">合计&yen;0.00</p>
      </div>
      <el-button size="mini" :disabled="disabled" @click="submit">支付</el-button>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import api from '../fetch/api'
import { removeItemFormArray } from '@/util/array'
import BillItem from '@/pages/BillItem'
import Scroll from '@/components/scroll'
import _ from 'lodash'

export default {
  props: {
    status: Number,
    contractId: Number
  },
  components: {
    BillItem,
    Scroll
  },
  data() {
    return {
      pageindex: 0,
      billList: [],
      scrollbar: true,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      startY: 0,
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      checkedIds: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    scrollbarObj: function() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt }
      } : false
    },
    allSelected: function() {
      return _.difference(_.map(this.billList, 'Id'), this.checkedIds).length === 0
    },
    disabled: function() {
      return this.checkedIds.length === 0
    }
  },
  created() {
    this.getBillList()
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      this.index = Number(this.$route.query.index || 0)
      this.checkedIds = []
    },
    status(val) {
      this.billList = [];
      this.getBillList()
    },
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler(val) {
        const scroll = this.$refs.scroll.scroll
        if (val) {
          scroll.openPullDown()
        } else {
          scroll.closePullDown()
        }
      },
      deep: true
    },
    pullUpLoadObj: {
      handler(val) {
        const scroll = this.$refs.scroll.scroll
        if (val) {
          scroll.openPullUp()
        } else {
          scroll.closePullUp()
        }
      },
      deep: true
    },
    startY() {
      this.rebuildScroll()
    }
  },
  methods: {
    getBillList(type) {
      this.pageindex++
      var params = {
        access_token: this.userInfo.token,
        PayStatus: this.status,
        pageindex: this.pageindex,
        pagesize: 10,
        ContractId: this.contractId
      }
      api.getBillList(params).then((res) => {
        if (res.numberData && res.numberData.length > 0) {
          if (type === 'down') {
            this.billList.unshift(...res.numberData)
          } else {
            this.billList = this.billList.concat(res.numberData)
          }
        } else {
          if (type) {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          } else {
            mui.toast('暂无数据')
          }
        }
      })
    },
    scrollTo() {
      // expect a number, not string
      const scrollToTime = Number(this.scrollToTime)
      const scrollToY = Number(this.scrollToY)
      const scrollToX = Number(this.scrollToX)
      this.$refs.scroll.scrollTo(scrollToX, scrollToY, scrollToTime, ease[this.scrollToEasing])
    },
    autoPullDownRefresh() {
      this.$refs.scroll.autoPullDownRefresh()
    },
    onPullingDown() {
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        this.getBillList('down')
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        this.getBillList('up')
      }, 1500)
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    },
    submit() {
        
    },
    getData(data) {
      if (data.type === 0) { //新增
        this.checkedIds.push(data.id)
      } else { //删除
        removeItemFormArray(this.checkedIds, data.id)
      }
    },
    checkAll(e) {
      var t = e.currentTarget
      if (t.checked) {
        this.checkedIds = _.map(this.billList, 'Id')
      } else {
        this.checkedIds = []
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.total {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: px2rem(100px);
  background: #fff;
  z-index: 99999;
  .mui-checkbox {
    float: left;
    label {
      line-height: px2rem(100px);
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
