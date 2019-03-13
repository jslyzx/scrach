<template>
  <div>
    <section class="sort_container"></section>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
    <section class="shop_list_container"></section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api'
export default {
  data() {
    return {
      sortBy: "", // 筛选的条件
    }
  },
  computed: {
    ...mapGetters(['search'])
  },
  created() {
    this.initData();
  },
  watch: {
    search: {
      handler(newVal, oldVal) {
        // this.getSearchTips()
      }
    }
  },
  methods: {
    async initData() {
      
    }
  }
}

</script>
<style lang="scss" scoped></style>
