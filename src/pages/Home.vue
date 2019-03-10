<template>
    <div class="home">
        <div class="banner">
            <swiper :options="swiperOption" class="swiper-box">
                <swiper-slide class="swiper-item"><img src="../assets/images/a4.jpg" alt="..."></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="guides">
            <div class="item">
                <i></i>
                <p>合租</p>
            </div>
            <div class="item">
                <i></i>
                <p>整租</p>
            </div>
            <div class="item">
                <i></i>
                <p>品牌公寓</p>
            </div>
            <div class="item">
                <i></i>
                <p>地图找房</p>
            </div>
            <div class="item">
                <i></i>
                <p>公司附近</p>
            </div>
            <div class="item">
                <i></i>
                <p>我要发布</p>
            </div>
            <div class="item">
                <i></i>
                <p>公司附近</p>
            </div>
            <div class="item">
                <i></i>
                <p>我要发布</p>
            </div>
        </div>
        <div class="list">
            <div class="list-head">
                <i></i>
                <span class="title">热门房源</span>
                <span class="more">更多<i></i></span>
            </div>
            <ul class="list-content">
                <li class="item">
                    <img src="" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import api from '../fetch/api'
import {
    swiper,
    swiperSlide
} from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: ".swiper-pagination"
                },
                autoplay: 5000,
                loop: true
            },
            pageindex: 0,
            pagesize: 10
        }
    },
    created() {
        this.getHotHouses()
    },
    mounted() {

    },
    methods: {
        getHotHouses() {
            this.pageindex++;
            api.queryHotHouses({
                    pageindex: this.pageindex,
                    pagesize: this.pagesize,
                    city: '上海市'
                })
                .then(res => {
                    console.log(res.numberData)
                })
        }

    }
}
</script>
<style scoped lang="scss">
@import '../assets/css/function';
.home {
    background-color: #fff;
    .banner {
        .swiper-box {
            width: 100%;
            height: px2rem(380px);
            margin: 0 auto;
            .swiper-item {
                text-align: center;
                font-size: 18px;
                background: #fff;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                align-items: center;
                img {
                    width: 100%;
                }
            }
            .swiper-pagination {
                bottom: 5px;
                .swiper-pagination-bullet-active {
                    background: #76d49b;
                }
            }
        }
    }
    .guides {
        width: px2rem(693px);
        height: px2rem(302px);
        border-radius: 4px;
        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.35), 0px -2px 2px 0px rgba(0, 0, 0, 0.17);
        margin: 0 auto;
        position: relative;
        z-index: 100;
        background: #fff;
        top: px2rem(-80px);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        height: 100%;
        .item {
            display: inline-block;
            width: 25%;
            height: 40%;
            margin: 0 auto;
            text-align: center;
            i {
                background-repeat: no-repeat;
                background-size: contain;
                display: inline-block;
                margin-top: 10px;
            }
            &:nth-child(1) i {
                background-image: url(../assets/images/hz.png);
                width: px2rem(62px);
                height: px2rem(58px);
            }
            &:nth-child(2) i {
                background-image: url(../assets/images/zz.png);
                width: px2rem(64px);
                height: px2rem(63px);
            }
            &:nth-child(3) i {
                background-image: url(../assets/images/gy.png);
                width: px2rem(58px);
                height: px2rem(58px);
            }
            &:nth-child(4) i {
                background-image: url(../assets/images/zf.png);
                width: px2rem(58px);
                height: px2rem(60px);
            }
            &:nth-child(5) i {
                background-image: url(../assets/images/fj.png);
                width: px2rem(62px);
                height: px2rem(62px);
            }
            &:nth-child(6) i {
                background-image: url(../assets/images/fb.png);
                width: px2rem(62px);
                height: px2rem(60px);
            }
            &:nth-child(7) i {
                background-image: url(../assets/images/kaimen.png);
                width: px2rem(55px);
                height: px2rem(56px);
            }
            &:nth-child(8) i {
                background-image: url(../assets/images/tg.png);
                width: px2rem(58px);
                height: px2rem(58px);
            }
        }
    }
    .list {
        margin: px2rem(-39px) px2rem(28px) px2rem(39px) px2rem(39px);
        .list-head {
            overflow: hidden;
            &>i {
                display: inline-block;
                width: px2rem(5px);
                height: px2rem(38px);
                background: rgba(217, 93, 113, 1);
                border-radius: 3px;
                float: left;
            }
            .title {
                color: rgba(51, 51, 51, 1);
                font-size: px2rem(36px);
                float: left;
                margin-left: px2rem(18px);
                font-weight: bold;
            }
            .more {
                float: right;
                font-size: px2rem(28px);
                color: rgba(153, 153, 153, 1);
                i {
                    display: inline-block;
                    width: px2rem(19px);
                    height: px2rem(35px);
                    background: url(../assets/images/gengduo.png) no-repeat;
                    background-size: contain;
                    margin-left: px2rem(22px);
                    vertical-align: text-bottom;
                    cursor: pointer;
                }
            }
        }
        .list-content {
            background-color: #fff;
            padding-left: px2rem(20px);
            padding-right: px2rem(29px);
        }
    }
}
</style>
