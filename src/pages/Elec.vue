<template>
  <div>
    <div v-if="userContractList.length === 1 || typeof this.$route.query.index !== 'undefined'">
      <div class="addr">地址：{{this.HouseName || ''}}</div>
      <div class="remain">
        <p>当前剩余</p>
        <p>{{this.Elec.surplus}}度</p>
      </div>
      <div class="mui-content">
        <div class="mui-card">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-collapse">
              <a class="mui-navigate-right" href="javascript:;">
  					度数
  					<span class="degree" v-text="degree"></span>
				</a>
              <div class="mui-collapse-content">
                <button type="button" class="mui-btn mui-btn-outlined" @click="changeDegree(50)">50度</button>
                <button type="button" class="mui-btn mui-btn-outlined" @click="changeDegree(100)">100度</button>
                <button type="button" class="mui-btn mui-btn-outlined" @click="changeDegree(150)">150度</button>
                <button type="button" class="mui-btn mui-btn-outlined" @click="changeDegree(200)">200度</button>
              </div>
            </li>
            <li class="mui-table-view-cell">
              单价
              <span>{{this.Elec.Price}}</span>
            </li>
            <li class="mui-table-view-cell">
              金额
              <span>{{this.totalPrice}}</span>
            </li>
          </ul>
        </div>
      </div>
      <button class="pay">充值</button>
    </div>
    <div v-else>
      <contract-list :contract-list="userContractList" :redirect-url="url"></contract-list>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import ContractList from '@/pages/ContractList'
import api from '../fetch/api'
export default {
  data() {
    return {
      url: '/life/elec',
      index: Number(this.$route.query.index || 0),
      HouseId: 0,
      HouseName: '',
      Elec: {
      	Price: 0,
      	surplus: 0
      },
      degree: 50
    }
  },
  components: {
    ContractList
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userContractList'
    ]),
    totalPrice: function() {
      return _.round(this.Elec.Price * this.degree, 2)
    }
  },
  created() {
    this.$store.dispatch("getUserContractList", {
      access_token: this.userInfo.token,
      iskaimen: 0
    })
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (typeof to.query.index !== 'undefined' && to.path === '/life/elec') {
        this.index = Number(this.$route.query.index || 0)
        this.HouseId = this.userContractList[this.index].HouseId
        this.HouseName = this.userContractList[this.index].HouseName
        this.initchongzhi()
      }

    }
  },
  methods: {
    initchongzhi() {
      api.initchongzhi({
          access_token: this.userInfo.token,
          HouseId: this.HouseId
        })
        .then((res) => {
          console.log(res)
          if (res.Code === 1) {
            mui.toast(res.Message)
          } else {
            this.Elec = res.numberData
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeDegree(val) {
      this.degree = val
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.addr {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 2px 0px rgba(252, 130, 130, 0.14);
  border-radius: 6px;
  width: px2rem(578px);
  height: px2rem(90px);
  margin: px2rem(50px) auto;
  color: #333;
  font-size: px2rem(32px);
  padding-left: px2rem(45px);
  line-height: px2rem(90px);
}
.remain {
  background: url('../assets/images/elec-circle.png') no-repeat;
  width: px2rem(230px);
  height: px2rem(258px);
  background-size: contain;
  margin: 0 auto;
  padding-top: px2rem(64px);
  p {
    text-align: center;
    color: #fff;
    font-size: px2rem(24px);
    &:last-child {
      font-size: px2rem(48px);
      margin-top: px2rem(18px);
    }
  }
}
.mui-table-view-cell {
  span {
    color: #999;
    font-size: px2rem(36px);
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
  &.mui-active {
    background: #fff;
  }
}
.pay {
  width: px2rem(560px);
  height: px2rem(76px);
  background: rgba(254, 82, 82, 1);
  border-radius: 10px;
  color: #fff;
  font-size: px2rem(36px);
  margin: px2rem(200px) auto 0;
  display: block;
  letter-spacing: 10px;
}

</style>
