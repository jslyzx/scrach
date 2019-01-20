<template>
    <div>
        <div v-if="this.$route.query.houseId">
            <ul v-if="fgy">
                <li><span>姓名</span><span>{{fgy.RealName}}</span></li>
                <li><span>电话</span><span>{{fgy.Mobile}}</span></li>
            </ul>
            <ul v-else>
                <li><span>姓名</span><span>--</span></li>
                <li><span>电话</span><span>--</span></li>
            </ul>
        </div>
        <div v-else>
            <contract-list :contract-list="userContractList"></contract-list>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import ContractList from '@/pages/ContractList'

export default {
    components: {
        ContractList
    },
    created(){
        if(this.$route.query.houseId){
            this.$store.dispatch("getFgy", {access_token: this.userInfo.token, HouseId: this.$route.query.houseId})
        }
    },
    data() {
        return {
            name: '--',
            phone: '--'
        }
    },
    computed: {
        ...mapGetters([
            'userContractList',
            'fgy',
            'userInfo'
        ])
    }
}
</script>
<style lang="scss" scoped></style>
