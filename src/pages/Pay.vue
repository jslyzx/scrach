<template>
  <div class="main">
    <h1>支付金额：<span class="money">{{$route.params.Amount || 0}}</span>元</h1>
    <div class="pay-zfb pay-type" @click="choose('ali')">
      <img src="../assets/images/zhifubao.png" alt="">
      <p class="cn">支付宝支付</p>
      <p class="en">pay treasure to pay</p>
      <div class="mui-radio mui-right">
        <input type="radio" name="pay-type" v-model="payType" value="ali">
      </div>
    </div>
    <div class="pay-wx pay-type" @click="choose('wx')">
      <img src="../assets/images/weixin.png" alt="">
      <p class="cn">微信支付</p>
      <p class="en">WaChat pay</p>
      <div class="mui-radio mui-right">
        <input type="radio" name="pay-type" v-model="payType" value="wx">
      </div>
    </div>
    <button type="button" @click="submit">立即支付</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as _ from '../util/tool'
import api from '../fetch/api'
export default {
  data() {
    return {
      payType: ''
    }
  },
  computed: {
    ...mapGetters([
      'openId'
    ])
  },
  methods: {
    submit() {
      if (!this.payType) {
        _.toast('请选择支付方式')
        return false
      }
      if (this.payType === 'ali') { //支付宝支付
        const newTab = window.open()
        if (this.$route.query.type === 'bill') {
          api.billAliPay(this.$route.params)
            .then((res) => {
              console.log(res.numberData)
              const div = document.createElement('div');
              div.innerHTML = res.numberData; // html code
              newTab.document.body.appendChild(div);
              newTab.document.forms.alipaysubmit.submit();
            })
            .catch((error) => {
              console.log(error)
            })
        } else if (this.$route.query.type === 'elec') {
          api.elecAliPay(this.$route.params)
            .then((res) => {
              console.log(res.numberData)
              const div = document.createElement('div');
              div.innerHTML = res.numberData; // html code
              newTab.document.body.appendChild(div);
              newTab.document.forms.alipaysubmit.submit();
            })
            .catch((error) => {
              console.log(error)
            })
        }

      } else { //微信支付
        if (this.$route.query.type === 'bill') {
          var params = this.$route.params
          params.openId = this.openId
          api.billWXPay(params)
            .then((res) => {
              function onBridgeReady(e, d) {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": d.appid, //公众号名称，由商户传入     
                    "timeStamp": d.timestamp + '', //时间戳，自1970年以来的秒数     
                    "nonceStr": d.noncestr, //随机串     
                    "package": "prepay_id=" + d.prepayid,
                    "signType": "MD5", //微信签名方式：     
                    "paySign": d.sign //微信签名 
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

                    }
                    alert(res.err_msg)
                  });
              }
              if (res.Code === 0) {
                var d = res.numberData
                if (typeof WeixinJSBridge == "undefined") {
                  if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', function(e, d) { onBridgeReady(e, d) }, false);
                  } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', function(e, d) { onBridgeReady(e, d) });
                    document.attachEvent('onWeixinJSBridgeReady', function(e, d) { onBridgeReady(e, d) });
                  }
                } else {
                  onBridgeReady(undefined, d)
                }
              }
            })
            .catch((error) => {
              console.log(error)
            })
        } else if (this.$route.query.type === 'elec') {
          api.elecWXPay(this.$route.params)
            .then((res) => {
              console.log(res.numberData)
            })
            .catch((error) => {
              console.log(error)
            })
        }

      }
    },
    choose(type) {
      this.payType = type
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';
.main {
  position: absolute;
  top: px2rem(100px);
  bottom: 0;
  left: 0;
  right: 0;
  background: url('../assets/images/pay-bg.png') no-repeat;
  background-size: cover;
}

h1 {
  color: #fff;
  font-size: px2rem(48px);
  text-align: center;
  .money {
    font-size: px2rem(72px);
    margin: 0 10px;
  }
}

.pay-type {
  width: px2rem(584px);
  height: px2rem(220px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.35);
  opacity: 0.95;
  border-radius: 20px;
  margin: px2rem(40px) auto;
  overflow: hidden;
  &.pay-zfb {
    padding: px2rem(62px) 0 px2rem(48px) px2rem(56px);
    img {
      width: px2rem(134px);
      margin-right: px2rem(41px);
      float: left;
    }
    p {
      color: #666;
      &.cn {
        font-size: px2rem(36px);
        margin-top: px2rem(13px);
      }
      &.en {
        font-size: px2rem(28px);
        margin-bottom: px2rem(4px);
      }
    }
  }
  &.pay-wx {
    padding: px2rem(67px) 0 px2rem(51px) px2rem(63px);
    img {
      width: px2rem(124px);
      margin-right: px2rem(43px);
      float: left;
    }
    p {
      color: #666;
      &.cn {
        font-size: px2rem(36px);
      }
      &.en {
        font-size: px2rem(28px);
        margin-bottom: px2rem(8px);
      }
    }
  }
  .mui-radio {
    float: right;
    width: 56px;
    height: 30px;
    top: px2rem(-160px);
  }
}

button {
  width: px2rem(682px);
  height: px2rem(87px);
  background: rgba(37, 191, 63, 1);
  box-shadow: 0px 3px 7px 0px rgba(25, 71, 33, 0.34);
  border-radius: 10px;
  display: block;
  margin: px2rem(200px) auto;
}

</style>
