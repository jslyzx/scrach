<template>
  <div class="main">
    <div v-if="!search">
      <p class="title">工作地点</p>
      <input type="text" v-model="location" class="location" @click="toSearch">
      <el-button type="danger" :disabled="!/[\S]+/.test(location)" @click="commitQuery">立即找房</el-button>
    </div>
    <div v-else>
      <div class="search-wrap">
        <div>
          <input type="text" v-model="location" @keyup="change(location)">
          <i class="search-icon"></i>
          <i class="clear-icon" @click="clearInput"></i>
        </div>
      </div>
      <div class="tips">
        <div class="tip" v-for="(item,index) in tipList" :key="index" @click="selectItem(item.name)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import api from '../fetch/api'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      location: '',
      search: false,
      tipList: [],
      searchQueryIsDirty: false,
      isCalculating: false
    }
  },
  watch: {
  	'$route'(to, from) {
      // 对路由变化作出响应...
      if (to.path === '/work/nearby') {
        this.location = ''
        this.search = false
      }
    },
    searchQuery: function() {
      this.searchQueryIsDirty = true
      this.expensiveOperation()
    }
  },
  computed: {
    ...mapGetters([
      'city'
    ])
  },
  methods: {
    ...mapActions(['setSearchText']),
    toSearch() {
      this.search = true
    },
    change(e) {
      if (!this.isCalculating && !this.searchQueryIsDirty && this.location !== '') {
        this.querySearch()
      }
    },
    expensiveOperation: _.debounce(function() {
      this.isCalculating = true
      setTimeout(function() {
        this.isCalculating = false
        this.searchQueryIsDirty = false
      }.bind(this), 1000)
    }, 500),
    querySearch() {
      api.searchWorkNear({
          name: this.location,
          cityname: this.city
        })
        .then(res => {
          this.tipList = res.numberData
        })
        .catch(error => {

        })
    },
    clearInput() {
      this.location = ''
      this.tipList = []
    },
    selectItem(name) {
      this.location = name
      this.search = false
    },
    commitQuery() {
      this.$store.dispatch('setSearchText', this.location)
      this.$router.push('/zhaofang')
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.main {
  .title {
    text-align: center;
    margin-top: px2rem(50px);
    margin-bottom: px2rem(40px);
  }
  .location {
    width: 80%;
    display: block;
    margin: px2rem(40px) auto;
  }
  button {
    width: 80%;
    display: block;
    margin: px2rem(40px) auto;
  }
  .search-wrap {
    background-color: #fff;
    padding: 10px;
    div {
      width: 80%;
      position: relative;
      margin: 0 auto;
      input {
        display: block;
        margin-bottom: 0;
        background-color: #eee;
        padding-left: 35px;
        padding-right: 35px;
      }
      .search-icon {
        background-image: url(../assets/images/search_hint.png);
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 10px;
        left: 10px;
      }
      .clear-icon {
        background-image: url(../assets/images/ib_close.png);
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
  .tips {
    margin-top: 10px;
    background-color: #fff;
    .tip {
      height: px2rem(80px);
      line-height: px2rem(80px);
      font-size: px2rem(30px);
      padding-left: px2rem(20px);
    }
  }
}

</style>
