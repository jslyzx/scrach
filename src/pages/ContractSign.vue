<template>
  <div>
    <div class="md-wrap" id="content">
    </div>
    <button type="button" class="mui-btn mui-btn-danger mui-btn-block" @click="sign">签约</button>
  </div>
</template>
<script>
import api from '../fetch/api'
import {
  mapGetters
} from 'vuex'
import marked from 'marked'
import '../assets/css/markdown.css'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    api.getContractTemplate({
        access_token: this.userInfo.token,
        Id: this.$route.params.id
      })
      .then((res) => {
        document.getElementById('content').innerHTML =
          marked(res.numberData.content)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    sign() {
      api.signContract({
          access_token: this.userInfo.token,
          Id: this.$route.params.id
        })
        .then((res) => {
          if (res.Code === 1) {
            mui.alert(res.Message)
          } else {
            mui.alert('签约成功')
          }
          console.log(res.numberData)

        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>
<style scoped lang="scss">
button{
  position: fixed;
  bottom: 0;
  margin-bottom: 0;
}
</style>
