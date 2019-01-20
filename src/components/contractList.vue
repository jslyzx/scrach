<template>
    <div>
        <contract v-for="(item,index) in contractList" :key="item.objectId" :contract="item"></contract>
    </div>
</template>
<script>
import contract from '@/components/contract'

export default {
    props: {
        contractList: Array
    },
    components: {
        contract
    },
    data() {
        return {
        }
    }
}
</script>
<style lang="scss" scoped></style>
