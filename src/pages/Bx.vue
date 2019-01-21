<template>
  <div v-if="this.$route.query.houseId">
    {{$route.query.houseId}}
    <div class="mui-input-group">
      <div class="mui-input-row">
        <label>报修人</label>
        <input type="text" name="">
      </div>
    </div>
  </div>
  <div v-else>
    fd
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ContractList from '@/pages/ContractList'
import * as _ from '../util/tool'

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
