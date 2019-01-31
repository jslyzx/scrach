<template>
  <div v-if="userContractList.length === 1 || typeof this.$route.query.index !== 'undefined'">
    <scroll ref="scroll" :data="lockList" :direction="horizontal" :scrollbar="{fade:true}">
      <div class="list-content" v-for="(item) in lockList">
        <div class="item">
          {{item.Name}}
        </div>
      </div>
    </scroll>
  </div>
  <div v-else>
    <contract-list :contract-list="userContractList" :redirect-url="url"></contract-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
import ContractList from '@/pages/ContractList'
import Scroll from '@/components/scroll'
export default {
  data() {
    return {
      lockList: [],
      url: '/life/kaimen',
      ContractId: 0,
      HouseId: 0,
      index: undefined
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userContractList'])
  },
  components: {
    ContractList,
    Scroll
  },
  created() {
    this.$store.dispatch("getUserContractList", {
      access_token: this.userInfo.token,
      iskaimen: 0,
      Status: 5
    })
  },
  beforeRouteEnter(to, from, next) {
    debugger
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      console.log(vm.userContractList); //当前组件的实例
    });
  },
  methods: {
    getLockList(id) {
      api.getLockList({
          access_token: this.userInfo.token,
          Id: id
        })
        .then((res) => {
          this.lockList = res.numberData
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.path === '/life/kaimen' && from.path === '/life/kaimen' && (typeof to.query.index !== 'undefined' || this.userContractList.length === 1)) {
        this.index = Number(to.query.index || 0)
        this.ContractId = this.userContractList[this.index].Id
        this.HouseId = this.userContractList[this.index].HouseId
        this.getLockList(this.HouseId)
      } else {
        this.index = undefined
        this.ContractId = 0
        this.HouseId = 0
        this.lockList = []
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>
