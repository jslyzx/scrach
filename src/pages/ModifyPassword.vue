<template>
  <div class="login">
    <div class="login-form">
      <form action="#">
        <div class="user-pasw common-div">
          <span class="pasw-icon common-icon">
                        <i class="icon">&#xe687;</i>
                    </span>
          <input type="password" v-model="newpassword" placeholder="新密码" />
        </div>
        <div class="user-code common-div">
          <span class="pasw-icon common-icon">
                        <i class="icon">&#xe687;</i>
                    </span>
          <input type="password" v-model="repeatpassword" placeholder="确认密码" />
        </div>
        <div class="user-code common-div">
          <span class="pasw-icon common-icon">
                        <i class="icon">&#xe687;</i>
                    </span>
          <input type="text" style="width: 50%;" v-model="verificode" placeholder="验证码" />
          <span class="verifi-code" @click="getVerifiCode" v-show="!sendCode">
                        获取验证码
                    </span>
          <span class="verifi-code readonly" v-show="sendCode">
                        {{timeOut}}秒重新获取
                    </span>
        </div>
        <div class="login-btn" @click="submit" :class="{active: active}">确定</div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'

export default {

  data() {
    return {
      newpassword: '',
      repeatpassword: '',
      verificode: '',
      sendCode: false,
      timeOut: 60
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    active() {
      return this.newpassword !== '' && this.verificode !== '' && this.repeatpassword !== ''
    }
  },
  methods: {
    getVerifiCode() {
      api.RegistVerifiCode({
          Phone: this.userInfo.username,
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
      if (!this.newpassword || !this.repeatpassword) {
        return
      }
      if (this.newpassword !== this.repeatpassword) {
        mui.alert('两次输入密码不一致')
        return
      }
      let data = {
        access_token: this.userInfo.token,
        yzm: this.verificode,
        newpassword: this.newpassword
      }
      this.$store.dispatch('setLoadingState', true)
      api.updatePassword(data)
        .then(res => {
          this.$store.dispatch('setLoadingState', false)
          if (res.Code === 0) { //成功
            mui.toast('密码修改成功')
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
      background-color: #eee;
      color: #fff;
      font-size: 20px;
      text-align: center;
      height: px2rem(100px);
      line-height: px2rem(100px);
      margin-bottom: px2rem(50px);
      border-radius: 4px;
      &.active {
        background-color: #0bd38a;
      }
    }
  }
}

</style>
