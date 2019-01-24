<template>
  <div class="bx-item mui-content-padded">
    <div class="mui-input-group">
      <div class="mui-input-row">
        <label>报修条目</label>
        <a href="#select" class="placeholder">报修条目</a>
      </div>
    </div>
    <input type="text" name="Project" v-model="Project">
    <input type="text" name="Image" v-model="Image">
    <input type="text" name="Remark" v-model="Remark">
    <button @click="replace">跳转</button>
    <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#">拍照或录像</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="#">选取现有的</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#picture"><b>取消</b></a>
				</li>
			</ul>
		</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      Project: this.$route.query.Project,
      Image: this.$route.query.Image,
      Remark: this.$route.query.Remark
    }
  },
  created() {
    this.$store.dispatch("getRepairSubjectList")
  },
  methods: {
    replace: function() {

      let data = {
        Project: this.Project,
        Remark: this.Remark,
        Image: this.Image,
        index: this.$route.query.index
      }
      console.log(data)
      this.$store.dispatch("setBxItem", data)
      this.$router.replace('/life/bx/')
    }
  },
  computed: {
    ...mapGetters([
      'repairSubjectList'
    ])
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';

</style>
