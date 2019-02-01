<template>
  <div class="main">
    <textarea v-model="content"></textarea>
    <button type="button" @click="submit">提交</button>
  </div>
</template>
<script>
import api from '../fetch/api'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    submit() {
      if (!this.content) {
        mui.alert('请填写反馈内容')
        return
      }
      api.saveFeeback({
          access_token: this.userInfo.token,
          content: this.content
        })
        .then(res => {
          if (res.Code === 0) {
            mui.toast(res.Message)
            this.$router.push('/user')
          } else {
            mui.alert(res.Message)
          }
        })
        .catch(error => {
          mui.alert('提交错误，请重新提交')
        })
    }
  }
}

</script>
<style lang="scss" scoped>
.main {
  padding: 10px;
  textarea {
    height: 150px;
  }
  button {
    background-color: #FF5252;
    color: #fff;
    display: block;
    width: 80%;
    margin: 0 auto;
  }
}

</style>
