<template>
  <div class="container">
    <section class="sort_container">
      <div class="sort_item" :class="{choose_type:sortBy == 'location'}">
        <div class="sort_item_container" @click="chooseType('location')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'location'}">位置</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist" v-show="areas">
          <section v-show="sortBy == 'location'" class="category_container sort_detail_type">
            <section class="category_left">
              <ul>
                <li @click="changeType('distance')" :class="{category_active: categoryType == 'distance'}">距离</li>
                <li @click="changeType('area')" :class="{category_active: categoryType == 'area'}">区域</li>
                <li @click="changeType('subway')" :class="{category_active: categoryType == 'subway'}">地铁</li>
              </ul>
              <footer class="btn-wrap">
                <button @click="resetCategory">重置</button>
                <button @click="submit">确定</button>
              </footer>
            </section>
            <section class="category_mid">
              <ul v-show="categoryType == 'distance'">
                <li v-for="(item, index) in distanceList" :key="index" class="category_li" :class="{category_active: Distance == item}" @click="changeDistance(index)">{{item}}</li>
              </ul>
              <ul v-show="categoryType == 'area'">
                <li class="category_li" v-for="(item, index) in areas" :key="index" :class="{category_active: area == item.name}" @click="changeArea(item.name, index)">{{item.name}}</li>
              </ul>
              <ul v-show="categoryType == 'subway'">
                <li class="category_li" v-for="(item, index) in subwayList" :key="index" :class="{category_active: ParaXian == item.Name}" @click="changeXian(item.Name, index)">{{item.Name}}</li>
              </ul>
            </section>
            <section class="category_right">
              <ul v-show="categoryType == 'area' && subAreaList">
                <li v-for="(item, index) in subAreaList" :key="index" class="category_li" :class="{category_active: businessarea == item.name}" @click="changeBusinessArea(item.name)">{{item.name}}</li>
              </ul>
              <ul v-show="categoryType == 'subway' && zhanList">
                <li class="category_li" v-for="(item, index) in zhanList" :key="index" :class="{category_active: ParaZhan == item.Name}" @click="changeZhan(item.Name)">{{item.Name}}</li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'price'}">
        <div class="sort_item_container" @click="chooseType('price')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'price'}">价格</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'price'" class="price_container">
            <p>推荐价格</p>
            <div class="filter-wrap">
              <span v-for="(item, index) in priceList" class="filter" :key="index" @click="changePrice(index)" :class="{active: priceIndex == index}">{{item.name}}</span>
            </div>
            <div class="slider-wrap">
              <el-slider v-model="range" range :min="min" :max="max"></el-slider>
              <span class="indicator_left">{{indicatorLeft}}</span>
              <span class="indicator_right">{{indicatorRight}}</span>
            </div>
            <footer class="btn-wrap">
              <button @click="resetPrice">重置</button>
              <button @click="submit">确定</button>
            </footer>
          </section>
        </transition>
      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'filter'}">
        <div class="sort_item_container" @click="chooseType('filter')">
          <div class="sort_item_border last">
            <span :class="{category_title: sortBy == 'filter'}">筛选</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'filter'" class="filter_container">
            <div class="filter-item">
              <p class="title">出租方式</p>
              <span class="item" v-for="(item, index) in typeList" :key="index" :class="{active: Type == item.value}" @click="changeRentType(index)">{{item.name}}</span>
            </div>
            <div class="filter-item">
              <p class="title">户型</p>
              <span class="item" v-for="(item, index) in shiList" :key="index" :class="{active: Shi == item.value}" @click="changeShi(index)">{{item.name}}</span>
            </div>
            <div class="filter-item">
              <p class="title">特色</p>
              <span class="item" :class="{active: ParaTs == ''}" @click="clearTs">不限</span>
              <span class="item" v-for="(item, index) in tsList" :key="index" :class="{active: ParaTs.indexOf(item) >= 0}" @click="toggleTs(item)">{{item}}</span>
            </div>
            <footer class="btn-wrap">
              <button @click="resetFilter">重置</button>
              <button @click="submit">确定</button>
            </footer>
          </section>
        </transition>
      </div>
    </section>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
    <section class="house_list_container">
      <scroll ref="scroll" :data="houseList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
        <div class="list-content">
          <router-link class="item" v-for="(item,index) in houseList" :key="index" :to="`/house/detail/${item.Id}`">
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
    </section>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import api from '../fetch/api'
import Scroll from '@/components/scroll'

export default {
  components: {
    Scroll
  },
  data() {
    return {
      sortBy: "", // 筛选的条件
      areas: null,
      categoryType: null,
      distanceList: ['不限', '500m', '1000m', '2000m', '3000m'],
      subwayList: null,
      Distance: '',
      area: '',
      businessarea: '',
      subAreaList: null,
      ParaXian: '',
      ParaZhan: '',
      zhanList: null,
      priceIndex: 0,
      priceList: [{
        name: '不限',
        value: [0, 8050]
      }, {
        name: '500以下',
        value: [0, 500]
      }, {
        name: '500~1000',
        value: [500, 1000]
      }, {
        name: '1000~1500',
        value: [1000, 1500]
      }, {
        name: '1500~2000',
        value: [1500, 2000]
      }, {
        name: '2000~2500',
        value: [2000, 2500]
      }, {
        name: '2500~3000',
        value: [2500, 3000]
      }, {
        name: '3000~5000',
        value: [3000, 5000]
      }, {
        name: '5000~8000',
        value: [5000, 8000]
      }, {
        name: '8000以上',
        value: [8000, 8050]
      }],
      range: [0, 8050],
      min: 0,
      max: 8050,
      Type: this.$route.query.Type || '',
      Shi: '',
      ParaTs: '',
      typeList: [{
        name: '不限',
        value: 0
      }, {
        name: '整租',
        value: 1
      }, {
        name: '合租',
        value: 2
      }, {
        name: '品牌公寓',
        value: 3
      }],
      shiList: [{
        name: '不限',
        value: 0
      }, {
        name: '一室',
        value: 1
      }, {
        name: '二室',
        value: 2
      }, {
        name: '三室',
        value: 3
      }, {
        name: '四室及以上',
        value: 4
      }],
      tsList: ['朝南', '独卫', '带阳台'],
      houseList: [],
      pageindex: 0,
      pagesize: 3,
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
      pullUpLoadNoMoreTxt: '没有更多数据了'
    }
  },
  computed: {
    ...mapGetters([
      'search',
      'city'
    ]),
    indicatorLeft() {
      return '￥' + this.range[0]
    },
    indicatorRight() {
      return this.range[1] === 8050 ? '不限' : '￥' + this.range[1]
    },
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
    this.initData();
    this.queryHouseList()
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.path === '/zhaofang') {
        this.Type = this.$route.query.Type
        this.queryHouseList()
      }
    },
    search: {
      handler(newVal, oldVal) {
        // this.getSearchTips()
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
  methods: {
    async initData() {
      const a = await api.queryArea(this.city)
      this.areas = a.numberData.districts[0].districts[1].districts
      const b = await api.queryMetro(this.city)
      this.subwayList = b.numberData
    },
    async chooseType(type) {
      if (this.sortBy !== type) {
        this.sortBy = type
      } else {
        //再次点击相同选项时收回列表
        this.sortBy = ""
      }
    },
    //选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
    selectFirstCategory(name, index) {
      //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
      this.secondCategory = this.areas[index].districts;
    },
    selectSecondCategory(name, index) {
      this.thirdCategory = this.secondCategory[index].districts
    },
    changeType(categoryType) {
      this.categoryType = categoryType
    },
    changeDistance(index) {
      this.Distance = this.distanceList[index]
    },
    changeArea(name, index) {
      this.area = name
      this.subAreaList = this.areas[index].districts
    },
    changeBusinessArea(name) {
      this.businessarea = name
    },
    changeXian(name, index) {
      this.ParaXian = name
      this.zhanList = _.concat({
        Name: '不限'
      }, this.subwayList[index].list)
    },
    changeZhan(name) {
      this.ParaZhan = name
    },
    changePrice(index) {
      this.priceIndex = index
      this.range = this.priceList[index].value
    },
    changeRentType(index) {
      this.Type = index
    },
    changeShi(index) {
      this.Shi = index
    },
    clearTs() {
      this.ParaTs = ''
    },
    toggleTs(name) {
      name += ';'
      if (this.ParaTs.indexOf(name) > -1) {
        this.ParaTs = this.ParaTs.replace(name, '')
      } else {
        this.ParaTs += name
      }
    },
    resetCategory() {
      this.Distance = ''
      this.area = ''
      this.businessarea = ''
      this.ParaXian = ''
      this.ParaZhan = ''
    },
    resetPrice() {
      this.priceIndex = 0
      this.range = [0, 8050]
    },
    resetFilter() {
      this.Type = 0
      this.Shi = 0
      this.ParaTs = ''
    },
    submit() {
      this.queryHouseList()
    },
    queryHouseList(type) {
      if (type === 'down') {
        this.pageindex = 1
      } else {
        this.pageindex++
      }
      api.searchHouse({
          pageindex: this.pageindex,
          pagesize: this.pagesize,
          city: this.city,
          area: this.area,
          MinPrice: this.range[0],
          MaxPrice: this.range[1] === 8055 ? 999999 : this.range[1],
          businessarea: this.businessarea,
          Distance: this.Distance,
          ParaXian: this.ParaXian,
          ParaZhan: this.ParaZhan,
          Type: this.Type,
          Shi: this.Shi,
          ParaTs: this.ParaTs,
          CompanyId: window.g.CompanyId
        })
        .then(res => {
          if (type === 'down') {
            this.houseList = res.numberData
          } else {
            this.houseList = this.houseList.concat(res.numberData)
          }
        })
        .catch(error => {

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
        this.queryHouseList('down')
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        this.queryHouseList('up')
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
.container {
  .sort_container {
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    position: fixed;
    top: px2rem(100px);
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
    .sort_item {
      font-size: px2rem(30px);
      color: #444;
      width: 33.3%;
      height: px2rem(75px);
      text-align: center;
      .sort_item_container {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 14;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: px2rem(15px);
        .sort_item_border {
          height: px2rem(45px);
          border-right: 1px solid #e4e4e4;
          &.last {
            border-right: none;
          }
        }
      }
      .sort_icon {
        vertical-align: middle;
        transition: all 0.3s;
        fill: #666;
      }
    }
    .choose_type {
      .sort_item_container {
        .category_title {
          color: #ff5252;
        }
        .sort_icon {
          transform: rotate(180deg);
          fill: #ff5252;
        }
      }
    }
    .showlist-enter-active,
    .showlist-leave-active {
      transition: all 0.3s;
      transform: translateY(0);
    }
    .showlist-enter,
    .showlist-leave-active {
      opacity: 0;
      transform: translateY(-100%);
    }
    .sort_detail_type {
      width: 100%;
      position: absolute;
      display: flex;
      top: px2rem(75px);
      left: 0;
      border-top: 1px solid #e4e4e4;
      background-color: #fff;
    }
    .category_container {
      .category_left {
        flex: 1;
        background-color: #fff;
        height: px2rem(750px);
        overflow-y: auto;
        .btn-wrap {
          position: absolute;
          top: px2rem(750px);
          left: 0;
          right: 0;
          bottom: px2rem(-100px);
          background-color: #fff;
          button {
            width: px2rem(250px);
            height: px2rem(80px);
            background-color: #FF5252;
            color: #fff;
          }
        }
      }
      .category_mid {
        flex: 1;
        background-color: #fff;
        height: px2rem(750px);
        overflow-y: auto;
      }
      .category_right {
        flex: 1;
        background-color: #fff;
        height: px2rem(750px);
        overflow-y: auto;
      }
      .category_active {
        background-color: #f1f1f1;
        color: #FF5252;
      }
      ul>li {
        text-align: left;
        padding-left: px2rem(10px);
        font-size: px2rem(30px);
        height: px2rem(60px);
        line-height: px2rem(60px);
      }
      .confirm_filter {
        display: flex;
        background-color: #f1f1f1;
        width: 100%;
        padding: 0.3rem 0.2rem;
        .filter_button_style {
          width: 50%;
          height: 1.8rem;
          font-size: 0.8rem;
          line-height: 1.8rem;
          border-radius: 0.2rem;
        }
        .clear_all {
          background-color: #fff;
          margin-right: 0.5rem;
          border: 1px solid #fff;
        }
        .confirm_select {
          background-color: #56d176;
          color: #fff;
          border: 1px solid #56d176;
          span {
            color: #fff;
          }
        }
      }
    }
    .price_container {
      width: 100%;
      position: absolute;
      top: px2rem(75px);
      left: 0;
      border-top: 1px solid #e4e4e4;
      background-color: #fff;
      >p {
        width: 100%;
        text-align: center;
        margin-top: 10px;
        color: #333;
      }
      .filter-wrap {
        overflow: hidden;
        .filter {
          padding: 5px;
          color: #333;
          font-size: 12px;
          border: 1px solid #aaa;
          float: left;
          margin: 10px;
          &.active {
            color: #FF5252;
            border-color: #FF5252;
          }
        }
      }
      .slider-wrap {
        width: 85%;
        margin: px2rem(40px) auto;
        .indicator_left {
          float: left;
        }
        .indicator_right {
          float: right;
        }
      }
      .btn-wrap {
        margin-top: px2rem(100px);
        margin-bottom: px2rem(30px);
        button {
          width: 3.33333rem;
          height: 1.06667rem;
          background-color: #FF5252;
          color: #fff;
        }
      }
    }
    .filter_container {
      width: 100%;
      position: absolute;
      top: px2rem(75px);
      left: 0;
      border-top: 1px solid #e4e4e4;
      background-color: #fff;
      .filter-item {
        margin-top: 10px;
        overflow: hidden;
        .item {
          padding: 5px;
          color: #333;
          font-size: 12px;
          border: 1px solid #aaa;
          float: left;
          margin: 10px;
          &.active {
            color: #FF5252;
            border-color: #FF5252;
          }
        }
      }
      .btn-wrap {
        margin-top: px2rem(100px);
        margin-bottom: px2rem(30px);
        button {
          width: 3.33333rem;
          height: 1.06667rem;
          background-color: #FF5252;
          color: #fff;
        }
      }
    }
  }
  .showcover-enter-active,
  .showcover-leave-active {
    transition: opacity 0.3s;
  }
  .showcover-enter,
  .showcover-leave-active {
    opacity: 0;
  }
  .back_cover {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .house_list_container {
    .list-wrapper {
      top: px2rem(175px);
      bottom: px2rem(98px);
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
  }
}

</style>
