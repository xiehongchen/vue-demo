# 链接下载
```js
// 1、使用fetch获取链接的blob格式，可以直接下载
fetch('链接').then(res => {
  return res.blob()
}).then(blob => {
  console.log('blob', blob)
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style.display = 'none'
  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = 'name'
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}).catch(e => {
  showToast('下载失败')
})

// 2、使用a标签下载，同上，就如果是视频链接就会打开这个视频，有点麻烦
const aDom = document.createElement('a')
aDom.href=url
aDom.download="name"
aDom.click()
aDom.remove()
```