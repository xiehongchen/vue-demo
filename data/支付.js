# 微信JSAPI支付(微信浏览器H5)

```js
/**
 * @description 通过JSAPI下单接口获取到发起支付的必要参数prepay_id，然后使用微信支付提供的前端JS方法调起公众号支付。
 * @param {Object} payparams 支付参数
 * @param {String} payparams.appId 公众号ID，由商户传入
 * @param {String} payparams.timeStamp 时间戳，自1970年以来的秒数
 * @param {String} payparams.nonceStr 随机串
 * @param {String} payparams.package 订单详情扩展字符串
 * @param {String} payparams.signType 微信签名方式
 * @param {String} payparams.paySign 微信签名
 * @param {Function} payparams.success 成功回调函数
 * @param {Function} payparams.fail 失败回调函数
 */
export function wxJSAPIPay(payparams = {}) {
	function onBridgeReady () {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			{
				appId: payparams.appId,
				timeStamp: payparams.timeStamp,
				nonceStr: payparams.nonceStr,
				package: payparams.package,
				signType: payparams.signType,
				paySign: payparams.paySign,
			},
			(res) => {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					if (payparams.success && typeof payparams.success === 'function') {
						payparams.success(res)
					}
				} else {
					if (payparams.fail && typeof payparams.fail === 'function') {
						payparams.fail(res)
					}
				}
			}
		)
	}

	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}
}
```

# 微信小程序支付

```JS
export function wxMiniAppPay(payparams = {}) {
	wx.requestPayment({
		timeStamp: payparams.timeStamp,
		nonceStr: payparams.nonceStr,
		package: payparams.package,
		signType: payparams.signType,
		paySign: payparams.paySign,
		success: (data) => {
			if (payparams.success && typeof payparams.success === 'function') {
				payparams.success(data)
			}
		},
		fail:(e) => {
			if (payparams.fail && typeof payparams.fail === 'function') {
				payparams.fail(e)
			}
		}
	})
}
```

# 普通浏览器

```js
const formObj = document.createElement('form')
formObj.action = payparams.prepayId
formObj.method = 'post'
formObj.style = 'position:fixed;z-index:-10;opacity:0;top:0;left:0;'
document.body.appendChild(formObj)
formObj.submit()
formObj.remove()
```

# 支付宝小程序支付

```js
my.tradePay ({
  // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号 trade_no
  tradeNO: payparams.prePayTn || payparams.tradeNo,
  success: res => {
    if (res.resultCode == '9000') {
      if (payparams.success && typeof payparams.success === 'function') {
        payparams.success(res)
      }
    } else {
      if (payparams.fail && typeof payparams.fail === 'function') {
        payparams.fail(res)
      }
    }
  },
  fail: error => {
    if (payparams.fail && typeof payparams.fail === 'function') {
      payparams.fail(error)
    }
  },
});
```

