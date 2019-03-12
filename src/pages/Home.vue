<template>
  <div class="home">
    <div class="banner">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item"><img src="../assets/images/a4.jpg" alt="..."></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="guides">
      <div class="item">
        <i></i>
        <p>合租</p>
      </div>
      <div class="item">
        <i></i>
        <p>整租</p>
      </div>
      <div class="item">
        <i></i>
        <p>品牌公寓</p>
      </div>
      <div class="item">
        <i></i>
        <p>地图找房</p>
      </div>
      <div class="item">
        <i></i>
        <p>公司附近</p>
      </div>
      <div class="item" @click="todo">
        <i></i>
        <p>我要发布</p>
      </div>
      <div class="item">
        <i></i>
        <p>我要开门</p>
      </div>
      <router-link class="item" :to="{path: '/house/tg'}">
        <i></i>
        <p>房屋托管</p>
      </router-link>
    </div>
    <div class="list">
      <div class="list-head">
        <i></i>
        <span class="title">热门房源</span>
        <span class="more">更多<i></i></span>
      </div>
      <scroll ref="scroll" :data="houseList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
        <div class="list-content">
          <router-link class="item" v-for="(item,index) in houseList" :key="item.objectId" :to="`/house/detail/${item.Id}`">
            <img :src="`${imgurl}${item.Image}`">
            <div class="info">
              <p class="addr">地址<span>{{item.Adress}}</span></p>
              <p class="transport" v-if="item.JiaoTong.length > 0">距离{{item.JiaoTong[0].Xian}}{{item.JiaoTong[0].Zhan}}{{item.JiaoTong[0].Juli}}米</p>
              <p class="transport" v-else>{{item.area}}<span>{{item.businessarea}}</span></p>
              <div class="fors">
                <span class="for" v-for="ts in item.Ts">{{ts}}</span>
              </div>
              <p class="money">&yen;&nbsp;&nbsp;{{item.Price}}/月</p>
            </div>
          </router-link>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import api from '../fetch/api'
import {
  swiper,
  swiperSlide
} from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import Scroll from '@/components/scroll'

export default {
  components: {
    swiper,
    swiperSlide,
    Scroll
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: 5000,
        loop: true
      },
      imgurl: this.imgurl,
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
      pageindex: 0,
      pagesize: 30,
      lunbo: [],
      houseList: []
    }
  },
  computed: {
    ...mapGetters([
      'city'
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
  created() {
    this.getLocation()
    this.getHomeData()
  },
  watch: {
    city: {
      handler() {
        this.getHomeData()
      }
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
  mounted() {

  },
  methods: {
    ...mapActions([
      'setCity'
    ]),
    getLocation() {
      var that = this
      if (this.city) return
      var geolocation = new qq.maps.Geolocation()
      geolocation.getIpLocation(function(position) {
        that.$store.dispatch('setCity', position.city)
        getFlag = true;
      }, function() {
        console.log('定位失败')
      });
    },
    getHomeData(type) {
      if (type === 'down') {
        this.pageindex++
      } else {
        this.pageindex = 1
      }
      api.queryHomeData({
          pageindex: this.pageindex,
          pagesize: this.pagesize,
          city: this.city
        })
        .then(res => {
          const data = res.numberData
          if (this.lunbo.length === 0) {
            this.lunbo = data.lunbo
          }
          this.houseList = data.HouseZK
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
        this.getHomeData('down')
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        this.getHomeData('up')
      }, 1500)
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    },
    todo() {
      mui.toast('待开发')
    }
  }
}

</script>
<style scoped lang="scss">
@import '../assets/css/home';
@import '../assets/css/function';
.home {
  background-color: #fff;
  .banner {
    .swiper-box {
      width: 100%;
      height: px2rem(380px);
      margin: 0 auto;
      .swiper-item {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .swiper-pagination {
        bottom: 5px;
        .swiper-pagination-bullet-active {
          background: #76d49b;
        }
      }
    }
  }
  .guides {
    width: px2rem(693px);
    height: px2rem(302px);
    border-radius: 4px;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.35), 0px -2px 2px 0px rgba(0, 0, 0, 0.17);
    margin: 0 auto;
    position: relative;
    z-index: 100;
    background: #fff;
    top: px2rem(-80px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .item {
      display: inline-block;
      width: 25%;
      height: 40%;
      margin: 0 auto;
      text-align: center;
      i {
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;
      }
      &:nth-child(1) i {
        background-image: url(../assets/images/hz.png);
        width: px2rem(62px);
        height: px2rem(58px);
      }
      &:nth-child(2) i {
        background-image: url(../assets/images/zz.png);
        width: px2rem(64px);
        height: px2rem(63px);
      }
      &:nth-child(3) i {
        background-image: url(../assets/images/gy.png);
        width: px2rem(58px);
        height: px2rem(58px);
      }
      &:nth-child(4) i {
        background-image: url(../assets/images/zf.png);
        width: px2rem(58px);
        height: px2rem(60px);
      }
      &:nth-child(5) i {
        background-image: url(../assets/images/fj.png);
        width: px2rem(62px);
        height: px2rem(62px);
      }
      &:nth-child(6) i {
        background-image: url(../assets/images/fb.png);
        width: px2rem(62px);
        height: px2rem(60px);
      }
      &:nth-child(7) i {
        background-image: url(../assets/images/kaimen.png);
        width: px2rem(55px);
        height: px2rem(56px);
      }
      &:nth-child(8) i {
        background-image: url(../assets/images/tg.png);
        width: px2rem(58px);
        height: px2rem(58px);
      }
    }
  }
  .list {
    margin: px2rem(-39px) px2rem(28px) px2rem(39px) px2rem(39px);
    .list-head {
      overflow: hidden;
      &>i {
        display: inline-block;
        width: px2rem(5px);
        height: px2rem(38px);
        background: rgba(217, 93, 113, 1);
        border-radius: 3px;
        float: left;
      }
      .title {
        color: rgba(51, 51, 51, 1);
        font-size: px2rem(36px);
        float: left;
        margin-left: px2rem(18px);
        font-weight: bold;
      }
      .more {
        float: right;
        font-size: px2rem(28px);
        color: rgba(153, 153, 153, 1);
        i {
          display: inline-block;
          width: px2rem(19px);
          height: px2rem(35px);
          background: url(../assets/images/gengduo.png) no-repeat;
          background-size: contain;
          margin-left: px2rem(22px);
          vertical-align: text-bottom;
          cursor: pointer;
        }
      }
    }
    .list-content {
      background-color: #fff;
      padding-left: px2rem(20px);
      padding-right: px2rem(29px);
      .item {
        overflow: hidden;
        margin-bottom: px2rem(20px);
        img {
          width: px2rem(268px);
          height: px2rem(186px);
          border-radius: 4px;
          float: left;
        }
        .info {
          float: left;
          margin-left: px2rem(25px);
          p {
            margin-bottom: 0;
            &.addr {
              color: #333;
              font-size: px2rem(28px);
            }
            span {
              margin-left: px2rem(10px);
            }
          }
          .fors {
            margin-top: px2rem(14px);
            margin-bottom: px2rem(14px);
            overflow: hidden;
            .for {
              padding: px2rem(10px) px2rem(16px);
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
            font-size: px2rem(28px);
            color: rgba(247, 135, 131, 1);
          }
        }
      }

    }
  }
}

</style>
