<template>
    <div class="main elec">
        <el-date-picker v-model="month" type="month" @change="selectMonth">
        </el-date-picker>
        <div class="mui-card" v-for="item in list">
            <div class="mui-card-header">
                <i></i>
                <span class="title">时间</span>
                <span class="con">{{item.Date | formatDate}}</span>
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div>
                        <span class="title">分摊</span>
                        <span class="con">{{item.Apportion}}</span>
                    </div>
                    <div>
                        <span class="title"><i></i>总计</span>
                        <span class="con">{{item.Allpower.toFixed(2)}}</span>
                        <span class="title">金额</span>
                        <span class="con">{{item.Money}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import api from '@/fetch/api'
import {
    formatDate
} from '@/util/filter'
import '@/assets/css/elec-date.css'
export default {
    data() {
            return {
                month: formatDate(new Date(), 'yyyy-MM'),
                list: []
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        created() {
            this.queryElecByMonth()
        },
        methods: {
            queryElecByMonth() {
                api.queryElecByMonth({
                        access_token: this.userInfo.token,
                        HouseId: this.$route.params.id,
                        Month: this.month
                    })
                    .then(res => {
                        console.log(res.numberData)
                        if (res.numberData.length === 0) {
                            mui.toast('没有查询到电费记录')
                            this.list = res.numberData
                        } else {
                            this.list = res.numberData
                        }
                    })
                    .catch(error => {
                        mui.toast('没有查询到电费记录')
                    })
            },
            selectMonth(el) {
                var d = new Date(el);
                if (formatDate(d, 'yyyy-MM') > formatDate(new Date(), 'yyyy-MM')) {
                    this.month = formatDate(new Date(), 'yyyy-MM')
                    mui.toast('选择的时间不能大于当前时间')
                } else {
                    this.queryElecByMonth()
                }
            }

        }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.main{
  padding-bottom: px2rem(20px);
}
.el-date-editor {
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 999;
    width: auto;
}

.el-input__inner {
    background: transparent;
    border: none;
    font-size: 0;
}

.mui-card {
    .title {
        color: #333;
    }
    .con {
        color: #999;
    }
    .mui-card-header {
        justify-content: flex-start;
        font-size: px2rem(32px);
        i {
            display: inline-block;
            float: left;
            width: px2rem(36px);
            height: px2rem(36px);
            background: url(../assets/images/time.png) no-repeat;
            background-size: contain;
            margin-right: px2rem(20px);
        }
        .title {
            float: left;
        }
        .con{
          float: left;
          margin-left: px2rem(50px);
        }
    }
    .mui-card-content-inner {
        &>div {
            line-height: px2rem(45px);
        }
        .title {
            color: #333;
            i {
                display: inline-block;
                width: px2rem(36px);
                height: px2rem(36px);
                background: url(../assets/images/sum.png) no-repeat;
                background-size: contain;
                vertical-align: text-bottom;
                margin-right: px2rem(20px);
            }
        }
        .con {
            color: #999;
            display: inline-block;
            width: px2rem(30px);
            text-align: right;
            margin-left: 20px;
            & ~ .title {
                margin-left: 40px;
            }
        }
    }
}
</style>
