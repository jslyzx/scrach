<template>
  <div class="user">
    <div class="head" @click="login">
      <img src="../assets/images/user-image.png">
      <div class="right">
        <p class="user-name">{{userInfo.username}}</p>
        <p class="id">ID:{{userInfo.Id}}</p>
      </div>
    </div>
    <div class="links">
      <router-link class="item" :to="{path: '/user/appoint-list'}">
        <p class="num">{{appointmentcount}}</p>
        <p class="name">我的预约</p>
      </router-link>
      <a class="item" href="javascript:;"  @click="todo">
        <p class="num">0.00</p>
        <p class="name">我的优惠券</p>
      </a>
      <router-link class="item" href="javascript:;" :to="{path: '/user/collection-list'}">
        <p class="num">{{collectioncount}}</p>
        <p class="name">我的收藏</p>
      </router-link>
    </div>
    <div class="tabs mui-content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell tab">
          <router-link class="mui-navigate-right" to="/user/idcard">
            <i class="sfrz"></i>身份认证
          </router-link>
        </li>
        <li class="mui-table-view-cell tab">
          <router-link class="mui-navigate-right" to="/user/repair-list">
            <i class="bx"></i>我的报修
          </router-link>
        </li>
        <li class="mui-table-view-cell tab">
          <router-link class="mui-navigate-right" to="/user/contract-list">
            <i class="ht"></i>我的合同
          </router-link>
        </li>
        <li class="mui-table-view-cell tab">
          <router-link class="mui-navigate-right" to="/life/tuizu">
            <i class="tz"></i>退租
          </router-link>
        </li>
        <li class="mui-table-view-cell tab">
          <router-link class="mui-navigate-right" to="/user/settings">
            <i class="sz"></i>设置
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import api from '../fetch/api.js'

export default {
  data() {
    return {
      collectioncount: 0,
      appointmentcount: 0
    }
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ])
  },
  created() {
    if (this.loginStatus) {
      api.getUserData(this.userInfo.token)
        .then(res => {
          const d = res.numberData
          this.collectioncount = d.collectioncount
          this.appointmentcount = d.appointmentcount
        })
        .catch(error => {

        })
    }
  },
  methods: {
    login() {
      if (!this.loginStatus)
        this.$router.push({ path: '/user/login', query: { redirect: '/user' } })
    },
    todo() {
      mui.toast('待开发')
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.user {
  .head {
    height: px2rem(240px);
    padding-top: px2rem(57px);
    padding-left: px2rem(38px);
    background: #FF5252;
    overflow: hidden;
    img {
      width: px2rem(136px);
      float: left;
      margin-right: px2rem(28px);
    }
    .right {
      float: left;
      p {
        color: #fff;
        margin-bottom: 0;
        &.user-name {
          margin-top: px2rem(13px);
          font-size: px2rem(34px);
          margin-bottom: px2rem(20px);
        }
        &.id {
          font-size: px2rem(24px);
          border: 2px solid rgba(255, 255, 255, 0.22);
          border-radius: px2rem(25px);
          padding: px2rem(5px) px2rem(15px);
        }
      }

    }
  }
  .links {
    display: flex;
    background: #fff;
    .item {
      display: block;
      flex: auto;
      p {
        text-align: center;
        margin: 5px 0;
        &.num {
          font-size: px2rem(34px);
          color: #F12D38;
        }
        &.name {
          font-size: px2rem(28px);
          color: #333;
        }
      }
    }
  }
  .tabs {
    .tab {
      a {
        font-size: px2rem(28px);
        color: #222423;
        i {
          display: inline-block;
          width: px2rem(56px);
          height: px2rem(56px);
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          top: px2rem(15px);
          margin-right: px2rem(33px);
          &.sfrz {
            background-image: url('../assets/images/gerenziliao.png');
          }
          &.bx {
            background-image: url('../assets/images/baoxiu.png');
          }
          &.ht {
            background-image: url('../assets/images/hetong.png');
          }
          &.tz {
            background-image: url('../assets/images/tuifang.png');
          }
          &.sz {
            background-image: url('../assets/images/shezhi.png');
          }
        }
      }

    }
  }
}

</style>
