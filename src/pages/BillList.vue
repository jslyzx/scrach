<template>
    <div>
        <bill-item v-for="(item,index) in billList" :key="item.objectId" :bill="item"></bill-item>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import BillItem from '@/pages/BillItem'

export default {
    props: {
        status: Number,
        contractId: Number
    },
    components: {
        BillItem
    },
    data() {
        return {
            pageindex: 1
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'billList'
        ])
    },
    created() {
        this.$store.dispatch("getBillList", {
            access_token: this.userInfo.token,
            PayStatus: this.status,
            pageindex: this.pageindex,
            pagesize: 10,
            ContractId: this.contractId
        })
    },
    watch: {
        status: {
            handler(newVal, oldVal) {
                debugger
                this.$store.dispatch("getBillList", {
                    access_token: this.userInfo.token,
                    PayStatus: newVal,
                    pageindex: this.pageindex,
                    pagesize: 10,
                    ContractId: this.contractId
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>
