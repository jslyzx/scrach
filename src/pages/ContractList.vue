<template>
    <div>
        <contract v-for="(item,index) in contractList" :key="item.objectId" :contract="item" :redirect-url="redirectUrl"></contract>
    </div>
</template>
<script>
import Contract from '@/pages/Contract'

export default {
    props: {
        contractList: Array,
        redirectUrl: String
    },
    components: {
        Contract
    },
    data() {
        return {
        }
    }
}
</script>
<style lang="scss" scoped></style>
