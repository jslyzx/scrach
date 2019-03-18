<template>
  <scroll ref="scroll" :data="appointmentList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
    <div class="list-content">
      <div class="mui-card" v-for="(item,index) in appointmentList" :key="item.objectId">
        <div class="mui-table-view">
          <div class="mui-table-view-cell">
            <p><span class="item-t">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</span><span class="item-c">{{item.House}}</span></p>
            <p><span class="item-t">预约时间:</span><span class="item-c">{{item.date | formatDate}}</span></p>
            <p><span class="item-t">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:</span><span class="item-c">{{item.Phone}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
import Scroll from '@/components/scroll'
export default {
  data() {
    return {
      pageindex: 0,
      pagesize: 5,
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
      appointmentList: []
    }
  },
  components: {
    Scroll
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    scrollbarObj: function() {
      return this.scrollbar ? {
        fade: this.scrollbarFade
      } : false
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
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    }
  },
  watch: {
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
  created() {
    this.getAppointList()
  },
  methods: {
    getAppointList(type) {
      if (type === 'down') {
        this.pageindex = 1
      } else {
        this.pageindex++
      }
      api.queryAppointmentList({
          access_token: this.userInfo.token,
          pageindex: this.pageindex,
          pagesize: this.pagesize
        })
        .then(res => {
          if (type === 'down') {
            this.appointmentList = res.numberData
          } else {
            this.appointmentList = this.appointmentList.concat(res.numberData)
          }
        })
        .catch(err => {

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
        this.getAppointList('down')
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        this.getAppointList('up')
      }, 1500)
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
.list-wrapper {
  background: #eee;
  top: px2rem(100px);
  .list-content {
    background: #eee;
    .item-t {
      color: #333;
      font-size: px2rem(32px);
    }
    .item-c {
      color: #999;
      font-size: px2rem(32px);
      margin-left: px2rem(10px);
    }
  }
}

</style>
