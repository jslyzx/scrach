<template>
  <div v-if="userContractList.length === 1 || typeof this.$route.query.index !== 'undefined'">
    <div class="mui-content-padded">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>报修人</label>
          <input type="text" name="Name" v-model="form.Name" class="mui-input-clear">
        </div>
        <div class="mui-input-row">
          <label>联系方式</label>
          <input type="text" name="Phone" v-model="form.Phone" class="mui-input-clear">
        </div>
        <div class="mui-input-row">
          <label>期望上门时间</label>
          <el-date-picker v-model="form.AppiontTime" type="datetime" placeholder="请选择" value-format="yyyy-MM-dd HH:mm" @change="selectTime" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="mui-input-group">
        <div class="mui-input-row" @click="addItem">
          <label>报修内容</label>
          <i class="add"></i>
        </div>
      </div>
      <div class="mui-table-view">
        <div class="mui-input-group mui-table-view-cell" v-for="(item,index) in form.itemList">
          <div class="mui-slider-right mui-disabled">
            <a class="mui-btn mui-btn-red" @click="deleteItem(index)">删除</a>
          </div>
          <div class="mui-slider-handle">
            <div class="mui-input-row">
              <div class="mui-navigate-right" @click="enterDetail(item, index)">
                <label>报修科目</label>
                <span class="placeholder" v-if="item.Project === ''">报修科目</span>
                <span v-else>{{item.Project}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="hidden" name="HouseId" v-model="form.HouseId">
      <button type="button" @click="submit" class="submit">提交</button>
    </div>
  </div>
  <div v-else>
    <contract-list :contract-list="userContractList" :redirect-url="url"></contract-list>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import ContractList from '@/pages/ContractList'
import api from '../fetch/api'
import * as _ from '../util/tool'
const REG_PHONE = /^1[34578]\d{9}$/

export default {
  data() {
    return {
      url: '/life/bx',
      index: Number(this.$route.query.index || 0),
      form: {
        Name: '',
        Phone: '',
        AppiontTime: '',
        HouseId: 0,
        itemList: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  components: {
    ContractList
  },
  created() {
    this.$store.dispatch("getUserContractList", {
      access_token: this.userInfo.token,
      iskaimen: 0,
      Status: 5
    })
    this.$store.dispatch("getRepairSubjectList")
  },
  computed: {
    ...mapGetters([
      'userContractList',
      'userInfo',
      'bxItem',
      'repairSubjectList'
    ])
  },
  beforeRouteLeave(to, from, next){
    if(to.path === '/life/bx/item'){
      if(!from.meta.keepAlive){
        from.meta.keepAlive = true
      }
      next()
    }else{
      from.meta.keepAlive = false
      to.meta.keepAlive = false
      this.$destroy()
      next()
    }
  },
  watch: {
    userContractList: {
      handler: function(newVal, oldVal) {
        var data = newVal[this.index]
        this.form.Name = data.Name
        this.form.HouseId = data.HouseId
        this.form.Phone = data.Phone
      }
    },
    bxItem: {
      handler: function(newVal, oldVal) {
        console.log(newVal)
        var ori = this.form.itemList[newVal.index]
        ori.Project = newVal.Project
        ori.Image = newVal.Image
        ori.Remark = newVal.Remark
      }
    }
  },
  methods: {
    submit: function() {
      let data = {
        Name: this.form.Name,
        Phone: this.form.Phone,
        AppiontTime: this.form.AppiontTime,
        HouseId: this.form.HouseId,
        list: this.form.itemList
      }
      console.log(data)
      if (data.Name === '') {
        _.toast('请输入报修人姓名')
        return false
      }
      if (data.Phone === '') {
        _.toast('请输入手机号')
        return false
      }
      if (!REG_PHONE.test(data.Phone)) {
        _.toast('请输入正确的手机号')
        return false
      }
      if (data.AppiontTime === '') {
        _.toast('请选择上门时间')
        return false
      }
      if (data.list.length === 0) {
        _.toast('请添加报修内容')
        return false
      }
      api.saveBx(data)
        .then(res => {
          if (res.Code === 0) { //成功
            _.toast('添加报修成功', 'success')
            this.$router.replace('/life')
          } else {
            _.toast(res.Message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    selectTime: function(el) {
      var d = new Date(el);
      if (d < new Date().getTime()) {
        this.form.AppiontTime = ''
        _.toast('选择的时间不能小于当前时间')
      }
    },
    addItem: function() {
      this.form.itemList.push({
        Remark: '',
        Project: '',
        Image: ''
      })
    },
    enterDetail: function(item, index) {
      this.$router.push({
        path: '/life/bx/item',
        query: {
          Project: item.Project,
          Image: item.Image,
          Remark: item.Remark,
          index: index
        }
      })
    },
    deleteItem: function(index) {
      this.form.itemList.splice(index, 1)
      return false
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
* {
  touch-action: none;
}
.mui-input-group {
  margin-bottom: px2rem(20px);
  .mui-navigate-right {
    overflow: hidden;
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      float: right;
      margin-right: 30px;
    }
    .placeholder {
      color: #999;
    }
  }
  .add {
    background: url(../assets/images/add-icon.png) no-repeat;
    float: right;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-size: contain;
    position: relative;
    top: 11px;
    right: 11px;
  }
}

.submit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
  height: px2rem(100px);
  background: #FF5252;
  color: #fff;
  font-size: px2rem(36px);
  line-height: px2rem(100px);
  text-align: center;
  letter-spacing: 20px;
}

.mui-table-view {
  .mui-input-group {
    margin-bottom: 0;
  }
}

</style>
