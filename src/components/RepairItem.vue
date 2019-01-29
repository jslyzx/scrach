<template>
	<div class="mui-card">
    <ul class="mui-table-view">
        <li class="mui-table-view-cell">
            <p>报修电话：{{repair.Phone}}</p>
            <p>报修地址：{{repair.House}}</p>
        </li>
        <li class="mui-table-view-cell" v-for="(item,index) in repair.list">
            <p>报修科目：{{item.Project}}</p>
            <p>进 度：{{map[item.Status]}}</p>
        </li>
    </ul>
    </div>
</template>
<script>
export default {
    data() {
            return {
            	map: {
            		'0': '已报修',
            		'1': '已接单',
            		'2': '已完成'
            	}
            }
        },
        props: {
            repair: Object
        },
        computed: {

        },
        methods: {
        }
}
</script>
<style lang="scss" scoped></style>
