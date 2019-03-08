<template>
    <div>
        <div class="md-wrap" id="content">
        </div>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-block" @click="sign">签约</button>
    </div>
</template>
<script>
import api from '../fetch/api'
import {
    mapGetters
} from 'vuex'
import marked from 'marked'
import '../assets/css/markdown.css'

export default {
    data() {
            return {
                contract: {}
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        created() {
            api.getContractTemplate({
                    access_token: this.userInfo.token,
                    Id: this.$route.params.id
                })
                .then((res) => {
                    document.getElementById('content').innerHTML =
                        marked(res.numberData.content)
                })
                .catch((error) => {
                    console.log(error)
                })
            api.getContractDetail(this.$route.params.id)
                .then(res => {
                    this.contract = res.numberData
                })
                .catch(error => {
                    console.log(error)
                })
        },
        methods: {
            sign() {
                this.$store.dispatch('setLoadingState', true)
                api.signContract({
                        Id: this.$route.params.id
                    })
                    .then((res) => {
                        this.$store.dispatch('setLoadingState', false)
                        if (res.Code === 1) {
                            mui.alert(res.Message)
                        } else if (contract.onlinesign === 1) {
                            const div = document.createElement('div');
                            div.innerHTML = res.numberData; // html code
                            document.body.appendChild(div);
                            // newTab.document.forms.alipaysubmit.submit();
                        } else {
                            //签约成功
                            this.$router.push('/contract/sign/success')
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
}
</script>
<style scoped lang="scss">
button {
    position: fixed;
    bottom: 0;
    margin-bottom: 0;
}
</style>
