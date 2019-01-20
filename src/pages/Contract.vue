<template>
    <div class="contract">
        <router-link :to="{ path: '/life/fgy', query: {houseId: contract.HouseId} }">
            <div class="item"><span>合同周期:</span><span>{{contract.BeginTime | formatDate}} ~ {{contract.EndTime | formatDate}}</span></div>
            <div class="item"><span>租金:</span><span>{{contract.Recent}}元</span></div>
            <div class="item"><span>地址:</span><span>{{contract.HouseName}}</span></div>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        contract: Object
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.contract {
    width: px2rem(722px);
    height: px2rem(194px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 2px 0px rgba(252, 130, 130, 0.14);
    border-radius: 16px;
    margin: px2rem(14px) auto;

    a{
    	display: block;
    }
}
</style>
