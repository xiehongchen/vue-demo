# 微信小程序修改文件md5值

```js
// 选择文件
async chooseFile () {
		// 获取全局唯一的文件管理器
    const file = uni.getFileSystemManager()
    // 生成32位随机二进制数据
    const binaryData = new Uint8Array(4);
    for (let i = 0; i < 4; i++) {
        binaryData[i] = Math.floor(Math.random() * 256);
    }
  	// 保存this，如果要用到的话
    const that = this
    // 选择视频文件，也可以用其他的
    uni.chooseVideo({
      sourceType: ['album'],
      success: (res) => {
        // 查看文件信息，成功会返回md5值digest
        file.getFileInfo({
            filePath: res.tempFilePath,
            success: (data) => {
                console.log('sucess-getFileInfo', res)
            },
            fail: (err) => {
                console.log('fail-getFileInfo', err)
            }
        })
        // 读取文件内容，返回的是二进制数据ArrayBuffer
        file.readFile({
            filePath: res.tempFilePath,
            success: (res) => {
              	// 转换成Uint8Array格式，方便增加数据
                const originData = new Uint8Array(res.data)
                const modifiedData = new Uint8Array(originData.length + binaryData.length)
                modifiedData.set(originData)
                modifiedData.set(binaryData, originData.length)
              	// 转换成base64格式
                const base64 =  uni.arrayBufferToBase64(modifiedData)
            }
        })
      },
      fail (err) {
          console.log('fail-chooseMedia>>>', err)
      }
    })
}

// 将base64数据写入文件
async uploadVideo(data) {
    this.getVideoUrl = await new Promise((resolve) => {
        // this.baseCode 为 视频编码
        // 注意的是这里的编码不需要携带 data:video/mp4;base64 前缀
        // 如果携带了，在调用writeFileSync会报 writeFileSync:fail base64 encode error
        const base64Video = data.replace(/[\r\n]/g, '')
        // 进行本地临时存储
        const fs = uni.getFileSystemManager();
        const filePath = `${wx.env.USER_DATA_PATH}/video${new Date().getTime()}.mp4`;
        fs.writeFileSync(filePath, base64Video, 'base64');
        console.log('filePath', filePath)
      	// 这里可以查看文件的新md5值
        fs.getFileInfo({
            filePath: filePath,
            success: (res) => {
                console.log('sucess-getFileInfo', res)
            },
            fail: (err) => {
                console.log('fail-getFileInfo', err)
            }
        })
    })
    console.log('getVideoUrl', this.getVideoUrl, this.videoUrl)
}

// 下载修改md5值后的文件
save() {
    if (this.getVideoUrl) {
        uni.showLoading({
            title: '正在下载，请稍后...',
            mask: false
        });
        wx.getSetting({
            withSubscriptions: true,
            success: res => {
                console.log('权限集合', res)
                // 判断是否有相册的写入权限
                if (res.authSetting['scope.writePhotosAlbum']) {
                    // 保存文件到相册
                    uni.saveVideoToPhotosAlbum({
                        filePath: this.videoUrl,
                        success: (res) => {
                            uni.hideLoading()
                            uni.showToast({
                                title: '保存成功',
                                icon: 'success',
                            });
                        },
                        fail: (error) => {
                            uni.hideLoading()
                            uni.showToast({
                                title: '保存失败',
                                icon: 'none',
                            });
                        },
                    });
                } else {
                    console.log('没有权限')
                    // 没有权限，调用开启权限的方法
                    uni.hideLoading()
                    uni.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: (res) => {
                            console.log('获取保存到相册权限成功', res)
                        },
                        fail: (res) => {
                            console.log('获取保存到相册权限失败', res)
                        }
                    })
                }
            }
        })
    }
},
```

# Uint8Array和ArrayBuffer的区别

`Uint8Array` 和 `ArrayBuffer` 是 JavaScript 中处理二进制数据的两种主要方式，它们之间有一些区别：

1. **ArrayBuffer**：
   - `ArrayBuffer` 是一种固定长度的缓冲区，它表示一段连续的内存区域，可以存储任意类型的二进制数据。
   - `ArrayBuffer` 的大小在创建时就已经确定，并且不能动态调整。
   - 由于 `ArrayBuffer` 本身只是一段内存的引用，因此它不能直接访问或操作数据，需要使用 TypedArray 或 DataView 对象来访问和操作。
2. **Uint8Array**：
   - `Uint8Array` 是一种类型化数组（TypedArray），它是 `ArrayBuffer` 的一种视图，用于处理 8 位无符号整数类型的二进制数据。
   - `Uint8Array` 提供了访问和操作二进制数据的方法，比如读取、写入和修改数据。
   - `Uint8Array` 对象允许您直接访问 `ArrayBuffer` 中的数据，而无需使用偏移量。

总的来说，`ArrayBuffer` 是一种通用的二进制数据容器，而 `Uint8Array` 是针对特定类型的二进制数据的一种视图。您可以使用 `ArrayBuffer` 来存储数据，然后使用 `TypedArray` 来操作这些数据，其中 `Uint8Array` 是其中一种常见的类型。