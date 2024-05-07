# web端

```js
export default function stopPullDownInWeb () {
	let startX = 0
	let startY = 0
	let moveEndX = 0
	let moveEndY = 0
	let X = 0
	let Y = 0
	document.body.addEventListener(
		'touchstart',
		function(e) {
			startX = e.changedTouches[0].pageX
			startY = e.changedTouches[0].pageY
		},
		{ passive: false }
	)
	document.body.addEventListener(
		'touchmove',
		function(e) {
			moveEndX = e.changedTouches[0].pageX
			moveEndY = e.changedTouches[0].pageY
			X = moveEndX - startX
			Y = moveEndY - startY
			if (Math.abs(X) > Math.abs(Y) && X > 0) {
				// 左至右
			} else if (Math.abs(X) > Math.abs(Y) && X < 0) {
				// 右至左
			} else if (Math.abs(X) < Math.abs(Y) && Y > 0) {
				if (!document.body.scrollTop && !document.documentElement.scrollTop) {
					e.preventDefault()
				}
			} else if (Math.abs(X) < Math.abs(Y) && Y < 0) {
				// 下至上
			}
		},
		{ passive: false }
	)
}
```

