<template>
  <div id="app">
    <v-toast v-show="showToast"></v-toast>
    <v-alert v-show="showAlert"></v-alert>
    <v-loading v-show="loading"></v-loading>
    <v-header :title="title" :back-display="backDisplay" :show-head="showHead" :is-home="isHome"></v-header>
    <div class="content" :class="{tabar: tabar}">
      <transition name="slide-left">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="slide-left">
        <keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
    </div>
    <v-tabar></v-tabar>
  </div>
</template>
<script>
import tabar from '@/components/tabar'
import header from '@/components/header'
import toast from '@/components/toast'
import alert from '@/components/alert'
import loading from '@/components/loading'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    'v-tabar': tabar,
    'v-header': header,
    'v-toast': toast,
    'v-alert': alert,
    'v-loading': loading,
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'showToast',
      'showAlert'
    ]),
    title() {
      if (this.$route.name === 'SelectContract')
        return '选择合同'
      if (this.$route.name === 'billList')
        return '账单列表'
      if (this.$route.name === 'elec')
        return '电费充值'
      if (this.$route.name === 'repair')
        return '报修'
      if (this.$route.name === 'repairItem')
        return '报修科目维护'
      if (this.$route.name === 'Kaimen')
        return '开门'
      if (this.$route.name === 'fgy')
        return '房管员'
      if (this.$route.name === 'tuizu')
        return '退租'
      if (this.$route.name === 'IdCard')
        return '身份认证'
      if (this.$route.name === 'myRepairList')
        return '我的报修'
      if (this.$route.name === 'MyContractList')
        return '我的合同'
      if (this.$route.name === 'settings')
        return '设置'
      if (this.$route.name === 'ContractDetail')
        return '合同详情'
      if (this.$route.name === 'ModifyPhone')
        return '修改手机号'
      if (this.$route.name === 'ModifyPassword')
        return '修改密码'
      if (this.$route.name === 'remark')
        return '意见反馈'
      if (this.$route.name === 'tuizuDetail')
        return '退租详情'
      if (this.$route.name === 'ElecQuery')
        return '电费查询'
      if (this.$route.name === 'HouseAppointment')
        return '预约看房'
      if (this.$route.name === 'TuoGuan')
        return '房屋托管'

      switch (this.$route.path.split('/')[1]) {
        case '':
          return "飞鸟快租"
        case 'home':
          return "飞鸟快租"
        case 'sport':
          return "找房"
        case 'life':
          return "生活"
        case 'user':
          return "我的"
      }
    },
    tabar() {
      return this.$route.path.split('/').length > 2 ? false : true
    },
    backDisplay() {
      return this.$route.path.split('/').length > 2 ? true : false
    },
    showHead() {
      return this.$route.meta.other ? false : true
    },
    isHome() {
      switch (this.$route.path.split('/')[1]) {
        case '':
          return true
        case 'home':
          return true
        case 'sport':
          return false
        case 'life':
          return false
        case 'user':
          return false
        default:
          return false
      }
    }
  }
}

</script>
<style lang="scss">
@import './assets/css/function';

@font-face {
  font-family: 'icon';
  /* project id 172436 */
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot');
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.woff') format('woff'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.svg#iconfont') format('svg');
}
.icon {
  font-family: "icon" !important;
  font-size: 18px;
  font-style: normal;
  color: #ffffff;
}

html,
body {
  height: 100%;
}

a.active {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background: #eee;
  .content {
    padding-top: px2rem(100px);
    background: #eee;
  }
  .tabar {
    //margin-bottom: px2rem(120px);
  }
  //渐变动效
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all .1s ease-in;
    opacity: 1;
  }
  .slide-left-enter,
  .slide-left-leave-active {
    opacity: 0;
  }

  //左滑动效
  // .slide-left-enter-active {
  //   animation: slideLeft .3s;
  // }
}

@keyframes slideLeft {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

</style>
