<template>
  <div class="mui-content-padded">
    <div class="mui-input-group">
      <div class="mui-input-row">
        <label>报修人</label>
        <input type="text" name="Name" v-model="contract.Name" class="mui-input-clear">
      </div>
      <div class="mui-input-row">
        <label>联系方式</label>
        <input type="text" name="Phone" v-model="contract.Phone" class="mui-input-clear">
      </div>
      <div class="mui-input-row">
        <label>期望上门时间</label>
        <el-date-picker v-model="AppiontTime" type="datetime" placeholder="请选择" value-format="yyyy-MM-dd HH:mm" @change="selectTime" :picker-options="pickerOptions">
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
      <div class="mui-input-group mui-table-view-cell" v-for="(item,index) in itemList">
        <div class="mui-slider-right mui-disabled">
          <a class="mui-btn mui-btn-red">删除</a>
        </div>
        <div class="mui-slider-handle">
          <div class="mui-input-row">
            <div class="mui-navigate-right" @click="enterDetail(item)">
              <label>报修科目</label>
              <span class="placeholder">报修科目</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <input type="hidden" name="HouseId" v-model="contract.HouseId">
    <button type="button" @click="submit" class="submit">提交</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as _ from '../util/tool'
const REG_PHONE = /^1[34578]\d{9}$/

export default {
  props: {
    contract: Object
  },
  data() {
    return {
      AppiontTime: '',
      Name: '',
      Phone: '',
      HouseId: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      itemList: []
    }
  },
  watch: {
    contract: {
      handler: function(newVal, oldVal) {
        this.Name = newVal.Name
        this.Phone = newVal.Phone
        this.HouseId = newVal.HouseId
      }
    }
  },
  created() {
    this.$store.dispatch("getRepairSubjectList")
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'repairSubjectList'
    ])
  },
  methods: {
    submit: function() {
      let data = {
        Name: this.contract.Name,
        Phone: this.contract.Phone,
        AppiontTime: this.AppiontTime
      }
      console.log(data)
      if(data.Name === ''){
        _.toast('请输入报修人姓名')
        return false
      }
      if(data.Phone === ''){
        _.toast('请输入手机号')
        return false
      }
      if(!REG_PHONE.test(data.Phone)){
        _.toast('请输入正确的手机号')
        return false
      }
      if(data.AppiontTime === ''){
        _.toast('请选择上门时间')
        return false
      }
      if(this.itemList.length === 0){
        _.toast('请添加报修内容')
        return false
      }
    },
    selectTime: function(el) {
      var d = new Date(el);
      if (d < new Date().getTime()) {
        this.time = ''
        _.toast('选择的时间不能小于当前时间')
      }
    },
    addItem: function() {
      this.itemList.push({
        Remark: '',
        Project: '',
        Image: ''
      })
    },
    enterDetail: function(item){
      console.log(item)
      this.$router.push({path: '/life/bx/item', params: item})
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
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
.mui-table-view{
  .mui-input-group{
    margin-bottom: 0;
  }
}
</style>
