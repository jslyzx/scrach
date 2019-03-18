<template>
  <div>
    <div class="item" v-for="item in tipList" @click="research(item.Name)">{{item.Name}}</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import api from '../fetch/api'
export default {
  data() {
    return {
      tipList: []
    }
  },
  computed: {
    ...mapGetters(['search'])
  },
  created() {

  },
  watch: {
    search: {
      handler(newVal, oldVal) {
        if (newVal !== '')
          this.getSearchTips()
      }
    },
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.path === '/house/search' && from.path === '/zhaofang') {
        this.search = ''
        this.tipList = []
        this.$store.dispatch('setSearchText', '')
      }
    }
  },
  methods: {
    ...mapActions(['setSearchText']),
    getSearchTips() {
      api.getSearchTips(this.search)
        .then(res => {
          console.log(res.numberData)
          this.tipList = res.numberData
          if (this.tipList.length === 0) {
            mui.toast('没有查到数据')
          }
        })
        .catch(err => {

        })
    },
    research(name) {
      this.$store.dispatch('setSearchText', name)
      this.$router.replace('/zhaofang')
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.item {
  background: #fff;
  height: px2rem(80px);
  line-height: px2rem(80px);
  font-size: px2rem(30px);
  padding-left: px2rem(20px);
  margin-top: px2rem(10px);
}

</style>
