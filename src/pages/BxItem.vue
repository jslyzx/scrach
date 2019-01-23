<template>
  <div class="bx-item">
    <div>$route.query.Project</div>
    <div>$route.query.Remark</div>
    <div>$route.query.Image</div>
    <button @click="replace">跳转</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  methods: {
  	replace: function(){
  		this.$store.dispatch("setBxItem",{Project: 'xxx', Remark: 'frerere', Image: 'rererer'})
  		this.$router.replace('/life/bx/')
  	}
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';

</style>
