<template>
  <div class="login">
    <div class="login-form">
      <form action="#">
        <div class="user-name common-div">
          <span class="pasw-icon common-icon">
      <i class="icon">&#xe687;</i>
          </span>
          <input type="password" v-model="password" placeholder="原密码" />
        </div>
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
      password: '',
      repeatpassword: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    active() {
      return this.newpassword !== '' && this.password !== '' && this.repeatpassword !== ''
    }
  },
  methods: {
    submit() {
      if (!this.newpassword || !this.password || !this.repeatpassword) {
        return
      }
      if(this.password !== this.repeatpassword){
        mui.alert('两次输入密码不一致')
        return
      }
      let data = {
        access_token: this.userInfo.token,
        password: this.password,
        newpassword: this.newpassword
      }
      this.$store.dispatch('setLoadingState', true)
      api.updatePassword(data)
        .then(res => {
          this.$store.dispatch('setLoadingState', false)
          if (res.Code === 0) { //成功
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
