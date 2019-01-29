<template>
    <scroll ref="scroll" :data="repairList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
        <div class="list-content">
            <repair-item v-for="(item,index) in repairList" :key="item.objectId" :repair="item">
            </repair-item>
        </div>
    </scroll>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import api from '../fetch/api'
import Scroll from '@/components/scroll'
import RepairItem from '@/components/RepairItem'
import _ from 'lodash'

export default {
    data() {
            return {
                pageindex: 0,
                repairList: [],
                scrollbar: true,
                scrollbarFade: true,
                pullDownRefresh: true,
                pullDownRefreshThreshold: 90,
                pullDownRefreshStop: 40,
                pullUpLoad: true,
                pullUpLoadThreshold: 0,
                startY: 0,
                scrollToX: 0,
                scrollToY: -200,
                scrollToTime: 700,
                scrollToEasing: 'bounce',
                scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
                pullUpLoadMoreTxt: '加载更多',
                pullUpLoadNoMoreTxt: '没有更多数据了'
            }
        },
        components: {
            Scroll,
            RepairItem
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ]),
            scrollbarObj: function() {
                return this.scrollbar ? {
                    fade: this.scrollbarFade
                } : false
            },
            pullDownRefreshObj: function() {
                return this.pullDownRefresh ? {
                    threshold: parseInt(this.pullDownRefreshThreshold),
                    stop: parseInt(this.pullDownRefreshStop)
                } : false
            },
            pullUpLoadObj: function() {
                return this.pullUpLoad ? {
                    threshold: parseInt(this.pullUpLoadThreshold),
                    txt: {
                        more: this.pullUpLoadMoreTxt,
                        noMore: this.pullUpLoadNoMoreTxt
                    }
                } : false
            }
        },
        created() {
            this.getRepairList()
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                this.index = Number(this.$route.query.index || 0)
                this.checkedIds = []
            },
            scrollbarObj: {
                handler() {
                    this.rebuildScroll()
                },
                deep: true
            },
            pullDownRefreshObj: {
                handler(val) {
                    const scroll = this.$refs.scroll.scroll
                    if (val) {
                        scroll.openPullDown()
                    } else {
                        scroll.closePullDown()
                    }
                },
                deep: true
            },
            pullUpLoadObj: {
                handler(val) {
                    const scroll = this.$refs.scroll.scroll
                    if (val) {
                        scroll.openPullUp()
                    } else {
                        scroll.closePullUp()
                    }
                },
                deep: true
            },
            startY() {
                this.rebuildScroll()
            }
        },
        methods: {
            getRepairList(type) {
                this.pageindex++
                    var params = {
                        pageindex: this.pageindex,
                        pagesize: 10,
                        Phone: this.userInfo.username
                    }
                api.getMyRepairList(params).then((res) => {
                    if (res.numberData && res.numberData.length > 0) {
                        if (type === 'down') {
                            this.repairList.unshift(...res.numberData)
                        } else {
                            this.repairList = this.repairList.concat(res.numberData)
                        }
                    } else {
                        if (type) {
                            // 如果没有新数据
                            this.$refs.scroll.forceUpdate()
                        } else {
                            mui.toast('暂无数据')
                        }
                    }
                })
            },
            scrollTo() {
                // expect a number, not string
                const scrollToTime = Number(this.scrollToTime)
                const scrollToY = Number(this.scrollToY)
                const scrollToX = Number(this.scrollToX)
                this.$refs.scroll.scrollTo(scrollToX, scrollToY, scrollToTime, ease[this.scrollToEasing])
            },
            autoPullDownRefresh() {
                this.$refs.scroll.autoPullDownRefresh()
            },
            onPullingDown() {
                setTimeout(() => {
                    if (this._isDestroyed) {
                        return
                    }
                    this.getRepairList('down')
                }, 2000)
            },
            onPullingUp() {
                // 更新数据
                setTimeout(() => {
                    if (this._isDestroyed) {
                        return
                    }
                    this.getRepairList('up')
                }, 1500)
            },
            rebuildScroll() {
                Vue.nextTick(() => {
                    this.$refs.scroll.destroy()
                    this.$refs.scroll.initScroll()
                })
            },
        }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/function';
	.list-wrapper{
		top: px2rem(100px);
		bottom: px2rem(40px);
		.list-content{
			background: #eee;
		}
	}
</style>
