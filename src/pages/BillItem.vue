<template>
  <div class="bill-item">
  	{{bill.Id}}
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
  	bill: Object
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';

</style>
