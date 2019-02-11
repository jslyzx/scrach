<template>
  <div>
    <div class="tab-wrap">
      <a href="javascript:;" :class="{active: undone}" @click="changeTab($event, 0)">未租合同</a>
      <a href="javascript:;" :class="{active: !undone}" @click="changeTab($event, 1)">历史合同</a>
    </div>
    <scroll ref="scroll" :data="contractList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)">
      <div class="list-content">
        <contract-item v-for="(item,index) in contractList" :key="item.objectId" :contract="item"></contract-item>
      </div>
    </scroll>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
import Scroll from '@/components/scroll'
import ContractItem from '@/components/ContractItem'
export default {
  components: {
    Scroll,
    ContractItem
  },
  data() {
    return {
      status: 5, //5在租，7历史
      contractList: [],
      pullDownRefresh: false,
      pullUpLoad: false,
      scrollbarObj: { fade: true },
      pullDownRefreshObj: false,
      pullUpLoadObj: false,
      startY: 0,
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce']
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    undone() {
      return this.status === 5
    }
  },
  created() {
    this.getContractList()
  },
  watch: {
    status(val) {
      this.contractList = []
      this.getContractList()
    },
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    startY() {
      this.rebuildScroll()
    }
  },
  methods: {
    getContractList() {
      var params = {
        access_token: this.userInfo.token,
        iskaimen: 0,
        Status: this.status
      }
      api.getContractList(params).then((res) => {
        if (res.numberData && res.numberData.length > 0) {
          this.contractList = res.numberData
        } else {
          this.contractList = []
          mui.toast('暂无数据')
        }
      })
    },
    changeTab(e, type) {
      if (e.currentTarget.className !== 'active') {
        if (type === 0)
          this.status = 5
        else
          this.status = 7
      }
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
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
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
.list-wrapper{
	background: #eee;
	.list-content{
		background: #eee;
	}
}
</style>
