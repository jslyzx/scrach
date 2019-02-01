<template>
  <div>
    <el-carousel type="card" height="130px" :autoplay="autoplay" @change="changeLock">
      <el-carousel-item v-for="item in lockList" :key="item.LocalId">
        <div class="item">
          <img src="../assets/images/lock-close.png">
          <h3>{{ item.Name }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="type-wrap">
      <button type="button" @click="changeType(1)" :class="{active: selected}">短期</button>
      <button type="button" @click="changeType(2)" :class="{active: !selected}">长期</button>
    </div>
    <div class="main">
      <p>获取房间密码</p>
      <div class="pwd-wrap">
        <input type="text" v-model="password" readonly="readonly">
        <span @click="getPassword">获取动态密码</span>
      </div>
      <p class="desc" v-show="type === 1">密码有效期24小时</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
import Scroll from '@/components/scroll'
export default {
  data() {
    return {
      lockList: [],
      ContractId: 0,
      HouseId: 0,
      autoplay: false,
      lockId: 0,
      type: 1,
      password: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    selected() {
      return this.type === 1
    }
  },
  components: {
    Scroll
  },
  created() {
    this.HouseId = Number(this.$route.query.HouseId)
    this.getLockList(this.HouseId)
  },
  methods: {
    getLockList(id) {
      api.getLockList({
          access_token: this.userInfo.token,
          Id: id
        })
        .then((res) => {
          this.lockList = res.numberData
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeLock(e) {
      this.lockId = this.lockList[e].LocalId
    },
    changeType(type) {
      this.type = type
    },
    getPassword() {
      api.getkeyboardPwd({
          access_token: this.userInfo.token,
          lockId: this.lockId,
          UserName: this.userInfo.username,
          Type: this.type
        })
        .then((res) => {
          this.password = res.numberData.keyboardPwd
        })
        .catch((error) => {
          mui.alert('获取失败，请重新获取')
        })
    }
  }
}

</script>
<style lang="scss" scoped>
.item {
  img {
    display: block;
    margin: 10px auto;
  }
  h3 {
    font-size: 14px;
    text-align: center;
  }
}
.type-wrap {
  padding-top: 8px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.16);
  button {
    width: 56px;
    height: 24px;
    border: none;
    line-height: 24px;
    padding: 0;
    margin-left: 40px;
    &~button {
      margin-left: 20px;
    }
    &.active {
      border: 2px solid rgba(255, 82, 82, 1);
      border-radius: 11px;
    }
  }
}
.main {
  padding: 44px 0 0 25px;
  p {
    color: #333;
  }
  .pwd-wrap {
    position: relative;
    input {
      width: 320px;
      height: 40px;
    }
    span {
      position: absolute;
      right: 26px;
      top: 1px;
      display: inline-block;
      width: 80px;
      height: 38px;
      background-color: #FF5252;
      color: #fff;
      line-height: 38px;
      text-align: center;
    }
  }
  .desc {
    color: #999;
  }
}

</style>
