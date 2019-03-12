<template>
  <div class="detail">
    <div class="bg">
      <img :src="`${imgurl}${house.Image}`" alt="" v-if="house.Image">
      <!-- <i class="share"></i> -->
      <i class="gallery" @click="toggleGallery" :class="{active: house.IsCollection === 1}"></i>
    </div>
    <div class="main">
      <h2 class="title">{{house.Title}}</h2>
      <div class="ts-list">
        <span class="ts" v-for="item in house.Ts">{{item}}</span>
      </div>
      <div class="house-item info">
        <div class="item">
          <span class="t">可租时间</span>
          <span class="c">{{dealRecentTime(house.RecentTime)}}</span>
        </div>
        <div class="item">
          <span class="t">价格</span>
          <span class="c red">{{house.Price}}</span>
        </div>
        <div class="item">
          <span class="t">房型</span>
          <span class="c">{{house.TingWei}}</span>
        </div>
        <div class="item">
          <span class="t">总层数/当前层</span>
          <span class="c">{{house.Floor}}/{{house.FloorIndex}}</span>
        </div>
        <div class="item">
          <span class="t">面积</span>
          <span class="c">{{house.Measure}}平米</span>
        </div>
        <div class="item">
          <span class="t">朝向</span>
          <span class="c">{{house.Cx}}</span>
        </div>
      </div>
      <div class="house-item near">
        <h3 class="item-head">周边</h3>
        <div class="items">
          <div class="item" :class='{active: nearIndex === 0}' @click="changeNearItem(0)">
            <i></i>
            <p>交通</p>
          </div>
          <div class="item" :class='{active: nearIndex === 1}' @click="changeNearItem(1)">
            <i></i>
            <p>购物</p>
          </div>
          <div class="item" :class='{active: nearIndex === 2}' @click="changeNearItem(2)">
            <i></i>
            <p>娱乐</p>
          </div>
          <div class="item" :class='{active: nearIndex === 3}' @click="changeNearItem(3)">
            <i></i>
            <p>医疗</p>
          </div>
        </div>
        <div class="toggle-info" v-if="nearIndex === 0">{{transportInfo}}</div>
        <div class="toggle-info" v-if="nearIndex === 1">{{shoppingInfo}}</div>
        <div class="toggle-info" v-if="nearIndex === 2">{{entertainmentInfo}}</div>
        <div class="toggle-info" v-if="nearIndex === 3">{{medicalInfo}}</div>
      </div>
      <div class="house-item equip">
        <h3 class="item-head">配备</h3>
        <div class="list">
          <div class="item" v-for="item in house.Peipei">
            <img :src="item.ImageUrl" alt="图片">
            <p>{{item.Name}}</p>
          </div>
        </div>
      </div>
      <div class="house-item addr">
        <h3 class="item-head">地址信息</h3>
        <p class="addr">{{house.Adress}}</p>
        <iframe :src="`https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${house.LatiTude},${house.LongiTude};title:${house.CellName};addr:${house.Adress}&key=NAFBZ-CFNHJ-5ILFQ-FSJE7-4WCYT-42FGZ&referer=myapp`"></iframe>
      </div>
    </div>
    <div class="btns">
      <button class="btn" @click="appointment">预约看房</button>
      <a class="btn" :href="`tel:${house.Phone}`">电话咨询</a>
    </div>
  </div>
</template>
<script>
import api from '../fetch/api'
import { formatDate } from '@/util/filter'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      house: {
        Image: '',
        JiaoTong: [],
        Zhoubian: [],
        Peipei: [],
        IsCollection: 0
      },
      imgurl: this.imgurl,
      nearIndex: 0
    }
  },
  created() {
    this.getHouseDetail()
  },
  computed: {
    ...mapGetters(['userInfo', 'loginStatus']),
    transportInfo() {
      if (this.house.JiaoTong && this.house.JiaoTong.length > 0) {
        return '距离' + this.house.JiaoTong[0].Xian + this.house.JiaoTong[0].Zhan + this.house.JiaoTong[0].Juli + '米'
      } else {
        return '暂无设施'
      }
    },
    shoppingInfo() {
      if (this.house.Zhoubian && this.house.Zhoubian[0]) {
        return this.house.Zhoubian[0].Value
      } else {
        return '暂无设施'
      }
    },
    entertainmentInfo() {
      if (this.house.Zhoubian && this.house.Zhoubian[1]) {
        return this.house.Zhoubian[1].Value
      } else {
        return '暂无设施'
      }
    },
    medicalInfo() {
      if (this.house.Zhoubian && this.house.Zhoubian[2]) {
        return this.house.Zhoubian[2].Value
      } else {
        return '暂无设施'
      }
    }
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.name === 'HouseDetail') {
        this.getHouseDetail()
      }
    },
  },
  methods: {
    getHouseDetail() {
      api.getHouseDetail({
          access_token: this.userInfo.token,
          Id: this.$route.params.id
        })
        .then(res => {
          console.log(res.numberData)
          this.house = res.numberData
        })
    },
    dealRecentTime(time) {
      if (!time) return '立即可租'
      var today = formatDate(new Date())
      var canRent = formatDate(time)
      if (today < canRent) {
        return canRent + '前可租'
      } else {
        return '暂不可租'
      }
    },
    changeNearItem(val) {
      if (this.nearIndex !== val) {
        this.nearIndex = val
      }
    },
    toggleGallery() {
      if (!this.loginStatus) {
        this.$router.push({
          path: '/user/login',
          query: { redirect: this.$route.fullPath } //登录重定向
        })
      } else {
        if (this.house.IsCollection === 0) {
          api.collectHouse({
              access_token: this.userInfo.token,
              HouseId: this.$route.params.id
            })
            .then(res => {
              if (res.Code === 0) {
                this.house.IsCollection = 1
                mui.toast('收藏成功')
              } else {
                mui.toast('收藏失败')
              }
            })
            .catch(error => {
              mui.toast('收藏失败')
            })
        } else {
          api.cancelCollect({
              access_token: this.userInfo.token,
              HouseId: this.$route.params.id
            })
            .then(res => {
              if (res.Code === 0) {
                this.house.IsCollection = 0
                mui.toast('取消收藏成功')
              } else {
                mui.toast('取消收藏失败')
              }
            })
            .catch(error => {
              mui.toast('取消收藏失败')
            })
        }
      }
    },
    appointment() {
      if (!this.loginStatus) {
        this.$router.push({
          path: '/user/login',
          query: { redirect: '/house/appointment/' + this.$route.params.id } //登录重定向
        })
      } else {
        this.$router.push('/house/appointment/' + this.$route.params.id)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.detail {
  background-color: #fff;
  margin-top: px2rem(-100px);
  .bg {
    position: relative;
    height: px2rem(480px);
    img {
      width: 100%;
      height: 100%;
    }
    >i {
      display: inline-block;
      position: absolute;
      background-size: contain;
    }
    .share {
      width: px2rem(30px);
      height: px2rem(29px);
      background-image: url(../assets/images/fenxiang.png);
      right: px2rem(100px);
      top: px2rem(43px);
    }
    .gallery {
      width: px2rem(37px);
      height: px2rem(36px);
      background-image: url(../assets/images/shoucang1.png);
      right: px2rem(36px);
      top: px2rem(40px);
      &.active {
        background-image: url(../assets/images/shoucang2.png);
      }
    }
  }
  .main {
    .title {
      margin-top: px2rem(43px);
      margin-left: px2rem(46px);
      margin-bottom: px2rem(41px);
      color: #333;
      font-size: px2rem(36px);
    }
    .ts-list {
      overflow: hidden;
      padding-left: px2rem(40px);
      .ts {
        float: left;
        border: 1px solid rgba(255, 82, 82, 1);
        border-radius: 10px;
        padding: px2rem(10px) px2rem(32px);
        text-align: center;
        color: rgba(255, 82, 82, 1);
        font-size: px2rem(28px);
        margin-right: px2rem(20px);
      }
    }
    .house-item {
      margin-top: px2rem(40px);
      border-top: 1px solid #EEEEEE;
      &.info {
        padding-left: px2rem(60px);
        overflow: hidden;
        .item {
          width: 50%;
          float: left;
          font-size: px2rem(28px);
          border-top: 1px solid #EEEEEE;
          margin-bottom: -21px;
          padding: px2rem(20px) 0;
          .t {
            color: #333;
            display: inline-block;
            min-width: px2rem(112px);
            text-align: justify;
            float: left;
            &:after {
              content: " ";
              display: inline-block;
              width: 100%;
            }
          }
          .c {
            color: #666;
            margin-left: px2rem(40px);
            &.red {
              color: #FF5252;
            }
          }
          &:nth-child(1),
          &:nth-child(2) {
            border-top: none;
          }
        }
      }
      &.near {
        .items {
          display: flex;
          .item {
            flex: auto;
            text-align: center;
            i {
              display: inline-block;
              background-size: contain;

            }
            &:nth-child(1) i {
              background-image: url(../assets/images/jiaotong.png);
              width: px2rem(80px);
              height: px2rem(74px);
            }
            &:nth-child(2) i {
              background-image: url(../assets/images/gouwu.png);
              width: px2rem(72px);
              height: px2rem(81px);
            }
            &:nth-child(3) i {
              background-image: url(../assets/images/yule.png);
              width: px2rem(86px);
              height: px2rem(62px);
            }
            &:nth-child(4) i {
              background-image: url(../assets/images/yiliao.png);
              width: px2rem(80px);
              height: px2rem(80px);
            }
            p {
              font-size: px2rem(28px);
              color: #333;
            }
            &.active p {
              color: #FF5252;
            }
          }
        }
        .toggle-info {
          width: px2rem(680px);
          height: px2rem(80px);
          margin: 0 auto;
          background-color: #eee;
          border-radius: 10px;
          color: #333;
          font-size: px2rem(28px);
          padding-top: px2rem(26px);
          padding-left: px2rem(34px);
        }
      }
      &.equip {
        .list {
          overflow: hidden;
          padding-left: px2rem(60px);
          .item {
            float: left;
            img {
              height: px2rem(80px);
            }
            p {
              font-size: px2rem(28px);
              color: #666;
            }
            &~.item {
              margin-left: px2rem(90px);
            }
          }
        }
      }
      &.addr {
        .addr {
          font-size: px2rem(28px);
          color: #333;
          margin-bottom: px2rem(35px);
          margin-left: px2rem(53px);
        }
        iframe {
          width: 100%;
          height: px2rem(800px);
        }
      }
      .item-head {
        color: #333;
        font-size: px2rem(36px);
        padding-top: px2rem(43px);
        margin-left: px2rem(54px);
        margin-bottom: px2rem(34px);
      }
    }

  }
  .btns {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(80px);
    display: flex;
    .btn {
      flex: 1;
      line-height: px2rem(80px);
      text-align: center;
      font-size: px2rem(28px);
      color: #fff;
      padding: 0;
      border: 1px solid #ccc;
      border-radius: 3px;
      &:nth-child(1) {
        background-color: #FF5252;
      }
      &:nth-child(2) {
        background-color: #00B7EE;
      }
    }
  }
}

</style>
