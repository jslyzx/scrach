<template>
  <div class="mui-content">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="/user/settings/modify-phone">修改手机号</router-link>
      </li>
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="/user/settings/modify-password">修改密码</router-link>
      </li>
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="/user/settings/remark">意见反馈</router-link>
      </li>
    </ul>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell exit" @click="exit">退出登录</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as _ from '../util/tool'
export default {
  data() {
    return {

    }
  },
  methods: {
    exit() {
      var that = this
      mui.confirm('确认退出当前账号？', '退出登录', function(e) {
        if (e.index) {
          that.$store.dispatch('setSignOut')
          _.alert('退出登录成功')
          setTimeout(() => {
            that.$router.replace('/user')
          }, 500)
        }
      })
    }
  },
  computed:{
    ...mapGetters([
      'userInfo'
    ])
  }
}

</script>
<style lang="scss" scoped>
.exit {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
}

</style>
