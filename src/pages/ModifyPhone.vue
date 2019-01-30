<template>
  <div class="login">
    <div class="login-form">
      <form action="#">
        <div class="user-name common-div">
          <span class="eamil-icon common-icon">
      <i class="icon">&#xe601;</i>
          </span>
          <input type="text" readonly="readonly" v-model="userInfo.username" />
        </div>
        <div class="user-pasw common-div">
          <span class="pasw-icon common-icon">
                        <i class="icon">&#xe687;</i>
                    </span>
          <input type="text" v-model="newphone" placeholder="新手机号码" />
        </div>
        <div class="user-code common-div">
          <span class="pasw-icon common-icon">
                        <i class="icon">&#xe687;</i>
                    </span>
          <input type="text" style="width: 50%;" v-model="yzm" placeholder="验证码" />
          <span class="verifi-code" @click="getVerifiCode" v-show="!sendCode">
                        获取验证码
                    </span>
          <span class="verifi-code readonly" v-show="sendCode">
                        {{timeOut}}秒重新获取
                    </span>
        </div>
        <div class="login-btn" @click="submit">确定</div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
const REG_PHONE = /^1[34578]\d{9}$/

import api from '../fetch/api'
import * as _ from '../util/tool'

export default {

  data() {
    return {
      newphone: '',
      yzm: '',
      sendCode: false,
      timeOut: 60
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions({ setUserInfo: 'setUserInfo' }),
    getVerifiCode() {
      if (!this.newphone) {
        mui.alert('请输入手机号')
        return
      }
      if (!REG_PHONE.test(this.newphone)) {
        mui.alert('请输入有效手机号')
        return
      }
      api.RegistVerifiCode({
          Phone: this.newphone,
          Type: 3
        })
        .then(res => {
          this.sendCode = true
          this.setTimeOut()
        })
        .catch(err => {
          _.alert('短信发送失败')
        })

    },
    setTimeOut() {
      let timer = setTimeout(() => {
        this.setTimeOut()
        if (this.timeOut > 0) {
          this.timeOut--
        }
      }, 1000)
      if (this.timeOut <= 0) {
        this.sendCode = false
        this.timeOut = 60
        clearTimeout(timer)
      }
    },
    submit() {
      if (!this.newphone || !this.yzm) {
        mui.alert('请填写完整')
        return
      }
      let data = {
        access_token: this.userInfo.token,
        newphone: this.newphone,
        username: this.userInfo.username,
        yzm: this.yzm
      }
      this.$store.dispatch('setLoadingState', true)
      api.updatePhone(data)
        .then(res => {
          this.$store.dispatch('setLoadingState', false)
          if (res.Code === 0) { //成功
            this.setUserInfo(res.numberData)
            this.$router.replace('/home') //登录成功跳转首页
          } else {
            mui.toast(res.Message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';


.login {
  position: absolute;
  top: px2rem(100px);
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #323542;
  padding-bottom: px2rem(260px);
  padding-top: px2rem(60px);
  .login-form {
    width: px2rem(600px);
    height: auto;
    margin: 0 auto;
    .common-div {
      width: 100%;
      height: px2rem(80px);
      overflow: hidden;
      border-radius: 4px;
      margin-bottom: px2rem(50px);
      >.common-icon {
        float: left;
        width: px2rem(40px);
        height: px2rem(40px);
        line-height: px2rem(40px);
        overflow: hidden;
        margin: px2rem(20px);
        text-align: center;
        img {
          width: 100%;
          height: auto;
        }
      }
      >input {
        float: left;
        line-height: px2rem(80px);
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 16px;
        color: #fff;
        width: auto;
        margin-bottom: 0;
      }
      .verifi-code {
        display: inline-block;
        width: px2rem(200px);
        height: px2rem(80px);
        line-height: px2rem(80px);
        background: #0bd38a;
        color: #fff;
        text-align: center;
        padding-left: px2rem(20px);
      }
      .readonly {
        background: #eee;
        color: #555;
      }
    }
    .user-name,
    .user-pasw,
    .user-code {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .login-btn {
      background-color: #0bd38a;
      color: #fff;
      font-size: 20px;
      text-align: center;
      height: px2rem(100px);
      line-height: px2rem(100px);
      margin-bottom: px2rem(50px);
      border-radius: 4px;
    }
  }
}

</style>
