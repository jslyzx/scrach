<template>
  <div class="mui-content">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="/user/idcard">修改手机号</router-link>
      </li>
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="/user/idcard">修改密码</router-link>
      </li>
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="/user/idcard">意见反馈</router-link>
      </li>
    </ul>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell exit">退出登录</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters['userInfo']
  }
}

</script>
<style lang="scss" scoped>
	.exit{
		margin-top: 20px;
		text-align: center;
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>
