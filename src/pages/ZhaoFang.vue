<template>
    <div class="container">
        <section class="sort_container">
            <div class="sort_item" :class="{choose_type:sortBy == 'location'}">
                <div class="sort_item_container" @click="chooseType('location')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'location'}">位置</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist" v-show="areas">
                    <section v-show="sortBy == 'location'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <li @click="changeType('distance')" :class="{category_active: categoryType == 'distance'}">距离</li>
                                <li @click="changeType('area')" :class="{category_active: categoryType == 'area'}">区域</li>
                                <li @click="changeType('subway')" :class="{category_active: categoryType == 'subway'}">地铁</li>
                            </ul>
                        </section>
                        <section class="category_mid">
                            <ul v-show="categoryType == 'distance'">
                                <li v-for="(item, index) in distanceList" :key="index" class="category_li" :class="{category_active: Distance == item}" @click="changeDistance(index)">{{item}}</li>
                            </ul>
                            <ul v-show="categoryType == 'area'">
                                <li class="category_li" v-for="(item, index) in areas" :key="index" :class="{category_active: area == item.name}" @click="changeArea(item.name, index)">{{item.name}}</li>
                            </ul>
                            <ul v-show="categoryType == 'subway'">
                                <li class="category_li" v-for="(item, index) in subwayList" :key="index" :class="{category_active: ParaXian == item.Name}" @click="changeXian(item.Name, index)">{{item.Name}}</li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul v-show="categoryType == 'area' && subAreaList">
                                <li v-for="(item, index) in subAreaList" :key="index" class="category_li" :class="{category_active: businessarea == item.name}" @click="changeBusinessArea(item.name)">{{item.name}}</li>
                            </ul>
                            <ul v-show="categoryType == 'subway' && zhanList">
                              <li class="category_li" v-for="(item, index) in zhanList" :key="index" :class="{category_active: ParaZhan == item.name}">{{item.Name}}</li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </div>
            <div class="sort_item">
                <div class="sort_item_container">
                    <div class="sort_item_border">
                        <span>价格</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="sort_item">
                <div class="sort_item_container">
                    <div class="sort_item_border last">
                        <span>筛选</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
        <transition name="showcover">
            <div class="back_cover" v-show="sortBy"></div>
        </transition>
        <section class="shop_list_container"></section>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import api from '../fetch/api'
export default {
    data() {
            return {
                sortBy: "", // 筛选的条件
                areas: null,
                categoryType: null,
                distanceList: ['不限', '500m', '1000m', '2000m', '3000m'],
                subwayList: null,
                Distance: '',
                area: '',
                businessarea: '',
                subAreaList: null,
                ParaXian: '',
                ParaZhan: '',
                zhanList: null
            }
        },
        computed: {
            ...mapGetters([
                'search',
                'city'
            ])
        },
        created() {
            this.initData();
        },
        watch: {
            search: {
                handler(newVal, oldVal) {
                    // this.getSearchTips()
                }
            }
        },
        methods: {
            async initData() {
                const a = await api.queryArea(this.city)
                this.areas = a.numberData.districts[0].districts[1].districts
                const b = await api.queryMetro(this.city)
                this.subwayList = b.numberData
            },
            async chooseType(type) {
                if (this.sortBy !== type) {
                    this.sortBy = type
                } else {
                    //再次点击相同选项时收回列表
                    this.sortBy = ""
                }
            },
            //选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
            selectFirstCategory(name, index) {
                //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
                this.secondCategory = this.areas[index].districts;
            },
            selectSecondCategory(name, index) {
                this.thirdCategory = this.secondCategory[index].districts
            },
            changeType(categoryType) {
                this.categoryType = categoryType
            },
            changeDistance(index) {
                this.Distance = this.distanceList[index]
            },
            changeArea(name, index) {
                this.area = name
                this.subAreaList = this.areas[index].districts
            },
            changeBusinessArea(name) {
                this.businessarea = name
            },
            changeXian(name, index) {
                this.ParaXian = name
                this.zhanList = _.concat({
                    Name: '不限'
                }, this.subwayList[index].list)
            }
        }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.container {
    .sort_container {
        background-color: #fff;
        border-bottom: 1px solid #f1f1f1;
        position: fixed;
        top: px2rem(100px);
        right: 0;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;
        .sort_item {
            font-size: px2rem(30px);
            color: #444;
            width: 33.3%;
            height: px2rem(75px);
            text-align: center;
            .sort_item_container {
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 14;
                background-color: #fff;
                box-sizing: border-box;
                padding-top: px2rem(15px);
                .sort_item_border {
                    height: px2rem(45px);
                    border-right: 1px solid #e4e4e4;
                    &.last {
                        border-right: none;
                    }
                }
            }
            .sort_icon {
                vertical-align: middle;
                transition: all 0.3s;
                fill: #666;
            }
        }
        .choose_type {
            .sort_item_container {
                .category_title {
                    color: #3190e8;
                }
                .sort_icon {
                    transform: rotate(180deg);
                    fill: #3190e8;
                }
            }
        }
        .showlist-enter-active,
        .showlist-leave-active {
            transition: all 0.3s;
            transform: translateY(0);
        }
        .showlist-enter,
        .showlist-leave-active {
            opacity: 0;
            transform: translateY(-100%);
        }
        .sort_detail_type {
            width: 100%;
            position: absolute;
            display: flex;
            top: px2rem(75px);
            left: 0;
            border-top: 1px solid #e4e4e4;
            background-color: #fff;
        }
        .category_container {
            .category_left {
                flex: 1;
                background-color: #fff;
                height: px2rem(750px);
                overflow-y: auto;
            }
            .category_mid {
                flex: 1;
                background-color: #fff;
                height: px2rem(750px);
                overflow-y: auto;
            }
            .category_right {
                flex: 1;
                background-color: #fff;
                height: px2rem(750px);
                overflow-y: auto;
            }
            .category_active {
                background-color: #f1f1f1;
                color: #FF5252;
            }
            ul>li {
                text-align: left;
                padding-left: px2rem(10px);
                font-size: px2rem(30px);
                height: px2rem(60px);
                line-height: px2rem(60px);
            }
            button {
                width: 40%;
                height: px2rem(70px);
                line-height: px2rem(70px);
                font-size: px2rem(32px);
                color: #fff;
                letter-spacing: 4px;
                background-color: #FF5252;
            }
            .confirm_filter {
                display: flex;
                background-color: #f1f1f1;
                width: 100%;
                padding: 0.3rem 0.2rem;
                .filter_button_style {
                    width: 50%;
                    height: 1.8rem;
                    font-size: 0.8rem;
                    line-height: 1.8rem;
                    border-radius: 0.2rem;
                }
                .clear_all {
                    background-color: #fff;
                    margin-right: 0.5rem;
                    border: 1px solid #fff;
                }
                .confirm_select {
                    background-color: #56d176;
                    color: #fff;
                    border: 1px solid #56d176;
                    span {
                        color: #fff;
                    }
                }
            }
        }
    }
    .showcover-enter-active,
    .showcover-leave-active {
        transition: opacity 0.3s;
    }
    .showcover-enter,
    .showcover-leave-active {
        opacity: 0;
    }
    .back_cover {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }
}
</style>
