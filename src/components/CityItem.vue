<template>
  <div>
    <li :data-group="name" class="mui-table-view-divider mui-indexed-list-group">{{name}}</li>
    <li :data-value="sub.Id" class="mui-table-view-cell mui-indexed-list-item" v-for="sub in list" @click="selectCity(sub.RegionName)">{{sub.RegionName}}</li>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
export default {
  data() {
    return {

    }
  },
  props: {
    name: String,
    list: Array
  },
  methods: {
    ...mapActions(['setCity']),
    selectCity(city) {
      this.$store.dispatch('setCity', city)
      this.$router.push('/home')
    }
  }
}

</script>
<style lang="scss" scoped></style>
