<template>
  <div v-if="userContractList.length > 1">
    <contract-list :contract-list="userContractList" :redirect-url="url"></contract-list>
  </div>
  <div v-else>
    <div class="mui-content-padded">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>报修人</label>
          <input type="text" name="">
        </div>
        <div class="mui-input-row">
          <label>报修人</label>
          <input type="text" name="">
        </div>
        <div class="mui-input-row">
          <label>报修人</label>
          <input type="text" name="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ContractList from '@/pages/ContractList'

export default {
  data() {
    return {
      url: '/life/bx'
    }
  },
  created() {
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
