<template>
  <mescroll-vue ref="mescroll" @init="mescrollInit" :up="mescrollUp">
    <div class="banner">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item" v-for="(item,index) in lunbo" :key="index"><img :src="`http://${item.Image}`" alt="..."></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="guides">
      <router-link class="item" to="/zhaofang?Type=2">
        <i></i>
        <p>合租</p>
      </router-link>
      <router-link class="item" to="/zhaofang?Type=1">
        <i></i>
        <p>整租</p>
      </router-link>
      <router-link class="item" to="/zhaofang?Type=3">
        <i></i>
        <p>品牌公寓</p>
      </router-link>
      <div class="item" @click="todo">
        <i></i>
        <p>地图找房</p>
      </div>
      <router-link class="item" to="/work/nearby">
        <i></i>
        <p>公司附近</p>
      </router-link>
      <div class="item" @click="todo">
        <i></i>
        <p>我要发布</p>
      </div>
      <router-link class="item" to="/life/kaimen">
        <i></i>
        <p>我要开门</p>
      </router-link>
      <router-link class="item" :to="{path: '/house/tg'}">
        <i></i>
        <p>房屋托管</p>
      </router-link>
    </div>
    <div class="list">
      <div class="list-head">
        <i></i>
        <span class="title">热门房源</span>
        <router-link class="more" to="/zhaofang">更多<i></i></router-link>
      </div>
      <div id="dataList" class="data-list">
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
    </div>
  </mescroll-vue>
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
import MescrollVue from 'mescroll.js/mescroll.vue'

export default {
  components: {
    swiper,
    swiperSlide,
    MescrollVue
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          tip: '暂无房源~'
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: 5000,
        loop: true
      },
      imgurl: this.imgurl,
      lunbo: [],
      houseList: []
    }
  },
  computed: {
    ...mapGetters([
      'city'
    ])
  },
  created() {
    this.getLocation()
    // this.getHomeData()
  },
  watch: {
    city: {
      handler() {
        this.mescroll.triggerDownScroll()
      }
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
      }, function() {});
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    todo() {
      mui.toast('待开发')
    },
    upCallback(page, mescroll) {
      api.queryHomeData({
          pageindex: page.num,
          pagesize: page.size,
          city: this.city,
          CompanyId: window.g.CompanyId
        })
        .then(res => {
          if (page.num === 1) this.houseList = []
          this.houseList = this.houseList.concat(res.numberData.HouseZK)
          this.lunbo = res.numberData.lunbo
          this.$nextTick(() => {
            mescroll.endSuccess(res.numberData.HouseZK.length)
          })
        })
        .catch(error => {
          // 联网异常,隐藏上拉和下拉的加载进度
          mescroll.endErr()
        })
    }
  }
}

</script>
<style scoped lang="scss">
@import '../assets/css/function';
.mescroll {
  position: fixed;
  top: px2rem(100px);
  bottom: px2rem(98px);
  height: auto;
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
          height: px2rem(380px);
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
    z-index: 99999;
    background: #fff;
    top: px2rem(-180px);
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
    margin: px2rem(-140px) px2rem(28px) px2rem(39px) px2rem(39px);
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
    .data-list {
      padding-top: px2rem(20px);
      .item {
        overflow: hidden;
        margin-bottom: px2rem(20px);
        display: block;
        img {
          width: px2rem(268px);
          height: px2rem(186px);
          border-radius: 4px;
          float: left;
        }
        .info {
          float: left;
          margin-left: px2rem(10px);
          p {
            margin-bottom: 0;
            max-width: px2rem(400px);
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
