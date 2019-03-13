<template>
  <div class="header" v-if="showHead">
    <div class="header-icon" v-if="backDisplay && (type === 2 || type === 3)" @click="goBack"><i class="icon">&#xe622;</i></div>
    <div class="header-cont" v-if="type === 3">
      <p>{{title}}</p>
    </div>
    <div class="header-cont" v-if="type === 0" @click="locate">
      <p>{{city}}</p><i class="location"></i>
    </div>
    <div class="header-cont search" v-if="type === 1">
      <div class="wrap">
        <input type="text" v-model="search" @click="jumpSearch" readonly="readonly">
        <i class="search-icon"></i>
        <i class="clear" @click="clear"></i>
      </div>
    </div>
    <div class="header-cont search" v-if="type === 2">
      <div class="wrap">
        <input type="text" v-model="aa" @keyup="enter(aa)">
        <i class="search-icon"></i>
        <i class="clear" @click="clear"></i>
      </div>
    </div>
    <a v-if="type === 2" class="cancel" @click="cancel">取消</a>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  props: {
    title: String,
    backDisplay: Boolean,
    showHead: Boolean,
    type: Number
  },
  data() {
    return {
      aa: '',
      searchQueryIsDirty: false,
      isCalculating: false
    }
  },
  watch: {
    type: {
      handler(newVal, oldVal) {
        this.aa = ''
      }
    },
    searchQuery: function() {
      this.searchQueryIsDirty = true
      this.expensiveOperation()
    }
  },
  computed: {
    ...mapGetters(['city', 'search'])
  },
  methods: {
    ...mapActions(['setSearchText']),
    goBack() {
      window.history.back()
    },
    locate() {
      this.$router.push('/city/select?type=home')
    },
    jumpSearch() {
      this.$router.push('/hosue/search')
    },
    clear() {
      this.$store.dispatch('setSearchText', '')
      this.aa = ''
    },
    cancel() {
      this.$store.dispatch('setSearchText', '')
      this.$router.push('/zhaofang')
    },
    enter(e) {
      if (!this.isCalculating && !this.searchQueryIsDirty && this.aa !== '') {
        this.$store.dispatch('setSearchText', e)
      }
    },
    expensiveOperation: _.debounce(function() {
      this.isCalculating = true
      setTimeout(function() {
        this.isCalculating = false
        this.searchQueryIsDirty = false
      }.bind(this), 1000)
    }, 500)
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';

.header {
  position: fixed;
  transform: translateZ(0);
  top: 0;
  z-index: 4;
  height: px2rem(100px);
  width: 100%;
  background: #FF5252;
  display: flex;
  flex-direction: row;
  .header-icon {
    flex: 1;
    text-align: center;
    >i {
      line-height: px2rem(100px);
    }
    .map-icon {
      font-size: 22px;
    }
  }

  .header-cont {
    flex: 6;
    padding-left: px2rem(40px);
    >p {
      line-height: px2rem(100px);
      color: #ffffff;
      font-size: 17px;
      float: left;
    }
    .location {
      display: inline-block;
      width: px2rem(36px);
      height: px2rem(42px);
      background: url(../assets/images/dingwei.png) no-repeat;
      background-size: contain;
      cursor: pointer;
      margin-top: px2rem(24px);
      margin-left: px2rem(10px);
    }
    &.search {
      padding-left: 0;
      .wrap {
        width: 80%;
        height: px2rem(80px);
        box-sizing: border-box;
        margin: px2rem(10px) auto;
        position: relative;
        input {
          height: 100%;
          display: block;
          padding-left: px2rem(70px);
        }
        .search-icon {
          display: inline-block;
          width: px2rem(40px);
          height: px2rem(40px);
          background-image: url(../assets/images/search_hint.png);
          background-repeat: no-repeat;
          background-size: contain;
          position: absolute;
          top: px2rem(20px);
          left: px2rem(20px);
        }
        .clear {
          display: inline-block;
          width: px2rem(40px);
          height: px2rem(40px);
          background-image: url(../assets/images/ib_close.png);
          background-repeat: no-repeat;
          background-size: contain;
          position: absolute;
          top: px2rem(20px);
          right: px2rem(20px);
        }

      }
    }
  }
  .cancel {
    color: #fff;
    line-height: px2rem(100px);
    font-size: px2rem(30px);
    flex-basis: px2rem(80px);
  }
}

</style>
