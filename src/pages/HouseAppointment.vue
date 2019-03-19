<template>
  <div class="appointment">
    <div class="banner">
      <img :src="`${this.imgurl}${house.Image}`" alt="房源图片" v-if="house.Image">
      <div class="desc">
        <p class="title">{{house.Title}}</p>
        <p class="money"><i>{{house.Price}}</i>/月</p>
      </div>
    </div>
    <div class="mui-content-padded">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>楼层</label>
          <input type="text" v-model="house.listview[3].Value" class="mui-input-clear" readonly="readonly">
        </div>
        <div class="mui-input-row">
          <label>称呼<span class="required">*</span></label>
          <input type="text" v-model="form.Name" class="mui-input-clear">
        </div>
        <div class="mui-input-row">
          <label>看房时间<span class="required">*</span></label>
          <el-date-picker v-model="form.date" type="datetime" placeholder="请选择" value-format="yyyy-MM-dd HH:mm" @change="selectTime" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="mui-input-row">
          <label>电话<span class="required">*</span></label>
          <input type="text" v-model="form.Phone" class="mui-input-clear">
        </div>
      </div>
    </div>
    <div class="mui-content-padded">
      <textarea placeholder="留言" v-model="form.Content"></textarea>
    </div>
    <button type="button" @click="submit" class="mui-btn mui-btn-danger mui-btn-block">提交</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
export default {
  data() {
    return {
      house: {
        listview: [0, 0, 0, 0],
        CompanyId: 0
      },
      form: {
        Name: '',
        date: '',
        Phone: '',
        Content: '',
        HouseId: this.$route.params.id
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    this.getHouseDetail()
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ])
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.name === 'HouseAppointment') {
        this.getHouseDetail()
      }
    },
  },
  methods: {
    getHouseDetail() {
      api.getHouseDetail({
          access_token: this.userInfo.token,
          Id: this.$route.params.id
        })
        .then(res => {
          this.house = res.numberData
        })
    },
    selectTime: function(el) {
      var d = new Date(el);
      if (d < new Date().getTime()) {
        this.form.date = ''
        mui.toast('选择的时间不能小于当前时间')
      }
    },
    submit() {
      if (this.form.Name === '') {
        mui.toast('预约人姓名不能为空')
        return false
      }
      if (this.form.date === '') {
        mui.toast('看房时间不能为空')
        return false
      }
      if (this.form.Phone === '') {
        mui.toast('联系方式不能为空')
        return false
      }
      if (this.form.Content === '') {
        mui.toast('留言不能为空')
        return false
      }
      this.form.access_token = this.userInfo.token
      this.form.CompanyId = this.house.CompanyId
      api.saveAppointment(this.form)
        .then(res => {
          mui.toast('提交预约成功')
          this.$router.replace('/house/detail/' + this.$route.params.id)
        })
        .catch(err => {

        })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.appointment {
  .banner {
    height: px2rem(390px);
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .desc {
      height: px2rem(90px);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .5);
      overflow: hidden;
      p {
        font-size: px2rem(36px);
        color: #fff;
        line-height: px2rem(90px);
        &.title {
          float: left;
          max-width: px2rem(480px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: px2rem(40px);
        }
        &.money {
          float: right;
          margin-right: px2rem(40px);
          i {
            font-style: normal;
            color: #FF5252;
          }
        }
      }
    }
  }
  .mui-content-padded {
    label {
      .required {
        color: #FF5252;
        margin: 0 5px;
        vertical-align: -webkit-baseline-middle;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}

</style>
