<template>
    <div>
        <bill-item v-for="(item,index) in billList" :key="item.objectId" :bill="item"></bill-item>
    </div>
</template>
<script>
import BillItem from '@/pages/BillItem'

export default {
    props: {
        billList: Array
    },
    components: {
        BillItem
    },
    data() {
        return {
        }
    }
}
</script>
<style lang="scss" scoped></style>
