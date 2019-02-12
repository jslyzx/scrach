<template>
  <div>
    <el-date-picker v-model="month" type="month" @change="selectMonth">
    </el-date-picker>
    <div class="item" v-for="item in list">
      {{item.Date}}
    </div>
    <div class="mui-card">
      <div class="mui-card-header">
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '@/fetch/api'
import { formatDate } from '@/util/filter'
import '@/assets/css/elec-date.css'
export default {
  data() {
    return {
      month: formatDate(new Date(), 'yyyy-MM'),
      list: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.queryElecByMonth()
  },
  methods: {
    queryElecByMonth() {
      api.queryElecByMonth({
          access_token: this.userInfo.token,
          HouseId: this.$route.params.id,
          Month: this.month
        })
        .then(res => {
          console.log(res.numberData)
          if (res.numberData.length === 0) {
            mui.toast('没有查询到电费记录')
          } else {
            this.list = res.numberData
          }
        })
        .catch(error => {
          mui.toast('没有查询到电费记录')
        })
    },
    selectMonth(el) {
      var d = new Date(el);
      if (formatDate(d, 'yyyy-MM') > formatDate(new Date(), 'yyyy-MM')) {
        this.month = formatDate(new Date(), 'yyyy-MM')
        mui.toast('选择的时间不能大于当前时间')
      } else {
        this.queryElecByMonth()
      }
    }

  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.el-date-editor {
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 999;
  width: auto;


}
.el-input__inner {
  background: transparent;
  border: none;
  font-size: 0;
}
.mui-card {
  .mui-card-header {
    i {
      display: inline-block;
      float: left;
      width: px2rem(36px);
      height: px2rem(36px);
      background: url(../assets/images/time.png) no-repeat;
      background-size: contain;
    }
  }
}

</style>
