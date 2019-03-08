<template>
  <div>
    <li :data-group="name" class="mui-table-view-divider mui-indexed-list-group">{{name}}</li>
    <li :data-value="sub.Id" class="mui-table-view-cell mui-indexed-list-item" v-for="sub in list">{{sub.RegionName}}</li>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
  	name: String,
  	list: Array
  }
}

</script>
<style lang="scss" scoped></style>
