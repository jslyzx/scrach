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
        <div class="mui-navigate-right">
          <label>期望上门时间</label>
          <date-picker :option="option" :date="startTime"></date-picker>
          <!-- <span @click="selectTime" class="placeholder" v-text="time" id="selectTime"></span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import myDatepicker from 'vue-datepicker'

export default {
  props: {
    contract: Object
  },
  components: {
    'date-picker': myDatepicker
  },
  data() {
    return {
      time: '请选择时间',
      option: {
        type: 'min',
        format: 'YYYY-MM-DD HH:mm',
        placeholder: '请选择'
      },
      startTime: {
        time: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    selectTime() {
      var dt = this.mui('#selectTime').DtPicker({});
      debugger
      dt.show(function(rs) {
        this.time = rx.text
      })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
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

</style>
