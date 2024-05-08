# H5

```js
export const getH5Env = function () {
	const userAgent = window?.navigator?.userAgent || {}
	const ios = !!(userAgent.match(/(iPhone|iPod|iPad)/))
	const android = /android/i.test(userAgent)
	const wechatApp = /micromessenger/i.test(userAgent) || /wechat/i.test(userAgent)
	const wechatMiniApp = /miniprogram/i.test(userAgent) && wechatApp
	const wechatBrowser = wechatApp && !wechatMiniApp
	const alipayApp = /alipayclient/i.test(userAgent) || /alipaydefined/i.test(userAgent)
	const alipayMiniApp = /miniprogram/i.test(userAgent) && alipayApp
	const alipayBrowser = alipayApp && !alipayMiniApp
	const miniApp = (wechatMiniApp || alipayMiniApp)
	return {
		ios,
		android,
		wechatApp,
		wechatMiniApp,
		wechatBrowser,
		alipayApp,
		alipayMiniApp,
		alipayBrowser,
		miniApp
	}
}
```

