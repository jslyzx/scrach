<template>
    <div class="contract">
        <router-link :to="{ path: redirectUrl, query: {houseId: contract.HouseId,name: contract.Name,phone: contract.Phone} }">
            <div class="item"><span>合同周期:</span><span>{{contract.BeginTime | formatDate}} ~ {{contract.EndTime | formatDate}}</span></div>
            <div class="item"><span>租金:</span><span>{{contract.Recent}}元</span></div>
            <div class="item"><span>地址:</span><span>{{contract.HouseName}}</span></div>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        contract: Object,
        redirectUrl: String
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
    margin: px2rem(20px) auto;
    padding: px2rem(20px) 0 0 px2rem(38px);
    box-sizing: border-box;

    .item{
        height: px2rem(30px);
        line-height: px2rem(56px);
        font-size: px2rem(30px);
        margin-bottom: px2rem(25px);
    }

    a{
    	display: block;
    }
}
</style>
