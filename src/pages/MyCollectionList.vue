<template>
  <scroll ref="scroll" :data="collectionList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
    <div class="list-content">
      <router-link class="item" v-for="(item,index) in collectionList" :key="index" :to="`/house/detail/${item.Id}`">
        <img :src="`${imgurl}${item.Image}`">
        <div class="info">
          <p class="addr">{{item.Adress}}</p>
          <div class="characters">
            <span class="character">{{item.TingWei}}</span>
            <span class="character">{{item.Fx}}</span>
            <span class="character">朝{{item.Cx}}</span>
            <span class="character">{{item.Measure}}平米</span>
          </div>
          <p class="transport" v-if="item.JiaoTong.length > 0">距离{{item.JiaoTong[0].Xian}}{{item.JiaoTong[0].Zhan}}{{item.JiaoTong[0].Juli}}米</p>
          <p class="transport" v-else>{{item.area}}<span>{{item.businessarea}}</span></p>
          <div class="fors">
            <span class="for" v-for="ts in item.Ts">{{ts}}</span>
          </div>
          <p class="money">&yen;&nbsp;&nbsp;{{item.Price}}元</p>
        </div>
      </router-link>
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
      collectionList: []
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
    this.getCollectionList()
  },
  methods: {
    getCollectionList(type) {
      if (type === 'down') {
        this.pageindex = 1
      } else {
        this.pageindex++
      }
      api.queryCollectionList({
          access_token: this.userInfo.token,
          PageIndex: this.pageindex,
          PageSize: this.pagesize
        })
        .then(res => {
          if (type === 'down') {
            this.collectionList = res.numberData
          } else {
            this.collectionList = this.collectionList.concat(res.numberData)
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
        this.getCollectionList('down')
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        this.getCollectionList('up')
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
  top: px2rem(100px);
  .list-content {
    .item {
      padding: px2rem(20px) px2rem(35px);
      border-bottom: 2px solid #eee;
      overflow: hidden;
      display: block;
      img {
        float: left;
        width: px2rem(256px);
        height: px2rem(200px);
        margin-right: px2rem(26px);
      }
      .info {
        float: left;
        p {
          margin-bottom: 0;
          &.addr {
            color: #333;
            font-size: px2rem(28px);
          }
        }
        .characters {
          font-size: 12px;
          .character~.character {
            border-left: 1px solid #ccc;
            padding-left: 5px;
          }
        }
        .transport {
          font-size: 12px;
        }
        .fors {
          overflow: hidden;
          .for {
            padding: px2rem(6px) px2rem(16px);
            color: #EC6B66;
            font-size: px2rem(24px);
            text-align: center;
            border: 1px solid rgba(240, 121, 121, 1);
            box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.18);
            border-radius: 6px;
            float: left;
            height: px2rem(24px);
            line-height: px2rem(24px);
            box-sizing: content-box;
            margin-right: px2rem(6px);
          }
        }
        .money {
          color: #ff5252;
        }
      }
    }
  }
}

</style>
