<template>
  <div v-if="userContractList.length === 1 || typeof this.$route.query.index !== 'undefined'">
    <contract-form :contract="userContractList[0]"></contract-form>
  </div>
  <div v-else>
    <contract-list :contract-list="userContractList" :redirect-url="url"></contract-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ContractList from '@/pages/ContractList'
import ContractForm from '@/pages/ContractForm'

export default {
  data() {
    return {
      url: '/life/bx'
    }
  },
  components: {
    ContractList,
    ContractForm
  },
  created() {
    // var that = this
    // var index = typeof this.$route.query.index !== 'undefined' ? this.$route.query.index : 0
    // var promise = this.$store.dispatch("getUserContractList", { access_token: this.userInfo.token, iskaimen: 0 })
    // promise.then(function(list){
    //   that.HouseId = list[index].HouseId,
    //   that.Name = list[index].Name,
    //   that.Phone = list[index].Phone
    // })
    this.$store.dispatch("getUserContractList", { access_token: this.userInfo.token, iskaimen: 0 })
  },
  computed: {
    ...mapGetters([
      'userContractList',
      'userInfo'
    ])
  }
}

</script>
<style lang="scss" scoped></style>
