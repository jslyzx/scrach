<template>
  <div>
    <div class="md-wrap" id="content">
    </div>
    <button type="button" class="mui-btn mui-btn-danger mui-btn-block" @click="sign">签约</button>
  </div>
</template>
<script>
import api from '../fetch/api'
import marked from 'marked'
import '../assets/css/markdown.css'
let Base64 = require('js-base64').Base64

export default {
  data() {
    return {
      contractId: Base64.decode(this.$route.params.id),
      domain: ''
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const url = await api.querySignUrl(this.contractId)
      this.domain = url.numberData.url
      const currUrl = location.origin
      if (this.domain === currUrl || this.domain.indexOf(currUrl) > -1) {
        api.getContractTemplate({
            Id: this.contractId
          })
          .then((res) => {
            document.getElementById('content').innerHTML =
              marked(res.numberData.content)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        location.href = this.domain + 'user/contract/sign/' + this.$route.params.id
      }
    },
    sign() {
      this.$store.dispatch('setLoadingState', true)
      api.signContract({
          Id: this.contractId
        })
        .then((res) => {
          this.$store.dispatch('setLoadingState', false)
          if (res.Code === 1) {
            mui.alert(res.Message)
          } else if (res.numberData.onlinesign === 1) {
            const div = document.createElement('div');
            div.innerHTML = res.numberData.form; // html code
            document.body.appendChild(div);
            document.forms.zqwssubmit.submit();
          } else {
            //签约成功
            this.$router.push('/contract/sign/success')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>
<style scoped lang="scss">
button {
  position: fixed;
  bottom: 0;
  margin-bottom: 0;
}

</style>
