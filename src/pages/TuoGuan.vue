<template>
    <div>
        <div class="mui-content-padded">
            <div class="mui-input-group">
                <div class="mui-input-row">
                    <label>姓名</label>
                    <input type="text" v-model="form.Name" class="mui-input-clear">
                </div>
                <div class="mui-input-row">
                    <label>手机号</label>
                    <input type="text" v-model="form.Phone" class="mui-input-clear">
                </div>
                <div class="mui-input-row">
                    <div class="mui-navigate-right" @click="selectCity">
                        <label>城市</label>
                        <span>{{form.City}}</span>
                    </div>
                </div>
                <div class="mui-input-row">
                    <label>地址</label>
                    <textarea v-model="form.Adress" placeholder="输入房屋详细地址"></textarea>
                </div>
            </div>
        </div>
        <button type="button" @click="submit" class="mui-btn mui-btn-danger mui-btn-block">提交</button>
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
                form: {
                    Name: '',
                    Phone: '',
                    Adress: '',
                    City: ''
                }
            }
        },
        computed: {
            ...mapGetters(['userInfo', 'tmpCity'])
        },
        created() {

        },
        methods: {
            submit() {
                if (this.form.Name === '') {
                    mui.toast('姓名不能为空')
                    return false
                }
                if (this.form.Phone === '') {
                    mui.toast('手机号不能为空')
                    return false
                }
                if (this.form.City === '') {
                    mui.toast('城市不能为空')
                    return false
                }
                if (this.form.Adress === '') {
                    mui.toast('地址不能为空')
                    return false
                }
                this.form.access_token = this.userInfo.token
                api.saveTg(this.form)
                    .then(res => {
                        mui.toast('房屋托管成功')
                        this.$router.push('/')
                    })
                    .catch(err => {

                    })
            },
            selectCity() {
                this.$router.push('/city/select?type=tg')
            }
        },
        watch: {
            tmpCity: {
                handler: function(newVal, oldVal) {
                    this.form.City = newVal
                }
            }
        }
}
</script>
<style lang="scss" scoped>
.mui-navigate-right {
    span {
        height: 40px;
        line-height: 40px;
        float: right;
        margin-right: 30px;
    }
}
</style>
