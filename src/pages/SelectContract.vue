<template>
  <div>
    <contract v-for="(item,index) in contractList" :key="item.objectId" :contract="item" :redirect-url="redirectUrl"></contract>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Contract from '@/components/Contract'
import api from '../fetch/api'

export default {
  components: {
    Contract
  },
  data() {
    return {
      contractList: [],
      redirectUrl: this.$route.query.redirect
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getContractList()
  },
  methods: {
    getContractList() {
      api.getContractList({
          access_token: this.userInfo.token,
          iskaimen: 0,
          Status: 5
        })
        .then((res) => {
            this.contractList = res.numberData
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>
<style lang="scss" scoped></style>
