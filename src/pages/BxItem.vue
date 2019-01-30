<template>
    <div class="bx-item mui-content-padded">
        <div class="mui-input-group">
            <div class="mui-input-row">
                <div class="mui-navigate-right">
                    <label>报修条目</label>
                    <a href="#select" class="placeholder" v-if="Project === ''">报修条目</a>
                    <a href="#select" v-else>{{Project}}</a>
                </div>
            </div>
        </div>
        <el-upload action="/api/upload/image" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="uploadSuccess" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div class="mui-input-row">
            <textarea name="Remark" v-model="Remark" placeholder="故障描述"></textarea>
        </div>
        <button @click="replace">提交</button>
        <div id="select" class="mui-popover mui-popover-action mui-popover-bottom">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="(item,index) in repairSubjectList">
                    <a @click="choose(item.Name)">{{item.Name}}</a>
                </li>
            </ul>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <a @click="hide"><b>取消</b></a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import _ from 'lodash'

export default {
    data() {
            return {
                Project: this.$route.query.Project,
                Image: this.$route.query.Image,
                Remark: this.$route.query.Remark,
                dialogImageUrl: '',
                dialogVisible: false,
                imgList: []
            }
        },
        created() {
            this.$store.dispatch("getRepairSubjectList")
            this.init()
        },
        watch: {
            '$route' (to, from) {
                if (to.path === '/life/bx/item') {
                  this.init()
                }
            }
        },
        methods: {
            init() {
                this.Project = this.$route.query.Project
                this.Image = this.$route.query.Image
                this.Remark = this.$route.query.Remark
                this.imgList = []
                if (this.Image) {
                    this.imgList = this.Image.split(';')
                    this.imgList = _.compact(_.each(this.imgList, function(item) {
                        item += ';'
                    }))
                }
            },
            replace: function() {
                let data = {
                    Project: this.Project,
                    Remark: this.Remark,
                    Image: this.imgList.join(''),
                    index: this.$route.query.index
                }
                this.$store.dispatch("setBxItem", data)
                this.$router.go(-1)
            },
            hide: function() {
                mui('#select').popover('hide')
            },
            choose: function(Name) {
                this.Project = Name
                mui('#select').popover('hide')
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                var index = this.imgList.indexOf(file.response.numberData)
                if (index > -1) {
                    this.imgList.splice(index, 1)
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadSuccess(response, file, fileList) {
                this.imgList.push(response.numberData)
            }
        },
        computed: {
            ...mapGetters([
                'repairSubjectList'
            ])
        },
        mounted() {
            mui.init({
                swipeBack: true //启用右滑关闭功能
            });
        }
}
</script>
<style lang="scss">
@import '../assets/css/function';
.bx-item {
    .mui-input-group {
        margin-bottom: 20px;
    }
    .mui-navigate-right {
        a {
            float: right;
            position: relative;
            right: 30px;
            top: 10px;
        }
    }
    textarea {
        margin-top: 20px;
        height: px2rem(200px);
    }
    .el-upload--picture-card {
        width: px2rem(200px);
        height: px2rem(200px);
        line-height: px2rem(200px);
    }
    .el-upload--picture-card i {
        line-height: px2rem(200px);
    }
    .el-upload-list--picture-card .el-upload-list__item {
        width: px2rem(200px);
        height: px2rem(200px);
    }
}
</style>
