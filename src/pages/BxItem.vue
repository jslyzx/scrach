<template>
  <div class="bx-item">
    <input type="text" name="Project" v-model="Project">
    <input type="text" name="Image" v-model="Image">
    <input type="text" name="Remark" v-model="Remark">
    <button @click="replace">跳转</button>
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
  methods: {
  	replace: function(){
  		
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
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';

</style>
