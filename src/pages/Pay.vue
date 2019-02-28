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
        // const newTab = window.open()
        if (this.$route.query.type === 'bill') {
          api.billAliPay(this.$route.params)
            .then((res) => {
              // console.log(res.numberData)
              // const div = document.createElement('div');
              // div.innerHTML = res.numberData; // html code
              // // newTab.document.body.appendChild(div);
              // // newTab.document.forms.alipaysubmit.submit();
              // document.body.appendChild(div);
              // document.forms[0].submit();
              _AP.pay("https://openapi.alipay.com/gateway.do?biz_content=%7B%22body%22%3A%22%E5%AF%B9%E4%B8%80%E7%AC%94%E4%BA%A4%E6%98%93%E7%9A%84%E5%85%B7%E4%BD%93%E6%8F%8F%E8%BF%B0%E4%BF%A1%E6%81%AF%E3%80%82%E5%A6%82%E6%9E%9C%E6%98%AF%E5%A4%9A%E7%A7%8D%E5%95%86%E5%93%81%EF%BC%8C%E8%AF%B7%E5%B0%86%E5%95%86%E5%93%81%E6%8F%8F%E8%BF%B0%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%B4%AF%E5%8A%A0%E4%BC%A0%E7%BB%99body%E3%80%82%22%2C%22out_trade_no%22%3A%2270501111111S001111119%22%2C%22product_code%22%3A%22QUICK_WAP_PAY%22%2C%22quit_url%22%3A%22http%3A%2F%2Fwww.taobao.com%2Fproduct%2F113714.html%22%2C%22seller_id%22%3A%222088102147948060%22%2C%22subject%22%3A%22%E5%A4%A7%E4%B9%90%E9%80%8F%22%2C%22time_expire%22%3A%222017-10-19+21%3A05%22%2C%22timeout_express%22%3A%2290m%22%2C%22total_amount%22%3A9.00%7D&sign=OQm1I810NgyEk9Ir1GohH9a3o9EhfzS7FI9p%2BlsOLKfoQHjOZ80l%2FSvTJcXxCpbL0LRswZUT6YydDHW7qCiT%2FvncvR1VGjs6e9KITshA4oBDT13XArut6h0LTe5Osy0rIxxSp7o1mm%2FJKDFBYYHfVD117jq0twX%2BQB60kzyW7ms%3D&timestamp=2017-10-19+19%3A55%3A24&sign_type=RSA&charset=UTF-8&app_id=2014060600164699&method=alipay.trade.wap.pay&version=1.0");
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
          // alert('openid=' + params.openId)
          api.billWXPay(params)
            .then((res) => {
              function onBridgeReady(e, d) {
                // alert('d.appid=' + d.appid)
                alert('appid=' + d.appid + ',noncestr=' + d.noncestr + ',sign=' + d.sign + ',package=' + d.package)
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": d.appid, //公众号名称，由商户传入     
                    "timeStamp": d.timestamp + '', //时间戳，自1970年以来的秒数     
                    "nonceStr": d.noncestr, //随机串     
                    "package": d.package,
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
              // alert('error:' + error)
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
