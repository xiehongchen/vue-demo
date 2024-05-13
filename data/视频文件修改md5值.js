
# uniapp微信小程序端

``` js
async chooseFile() {
  // 获取全局唯一的文件管理器
  const file = uni.getFileSystemManager()
  // 删除之前的文件，以防止缓存数据积累
  uni.getStorage({
    key: 'file-path',
    success: (res) => {
      console.log('getStorage-filePath', res)
      if (res.data) {
        file.removeSavedFile({
          filePath: res.data,
          success: (res) => {
            console.log('删除文件成功', res)
          },
          fail: (res) => {
            console.log('删除文件失败', res)
          }
        })
      }
    }
  })
  // 生成32位
  const binaryData = new Uint8Array(4);
  for (let i = 0; i < 4; i++) {
    binaryData[i] = Math.floor(Math.random() * 256);
  }
  // 选择视频
  uni.chooseVideo({
    sourceType: ['album'],
    // 禁止压缩
    compressed: false,
    success: async (res) => {
      uni.showLoading({
        title: '正在修改'
      })
      // 获取文件信息
      file.getFileInfo({
        filePath: res.tempFilePath,
        success: (data) => {
          console.log('success-getFileInfo', data)
          this.fileInfo = {...res, ...data}
        },
        fail: (err) => {
          console.log('fail-getFileInfo', err)
        }
      })
      // 读取文件
      file.readFile({
        filePath: res.tempFilePath,
        success: (res) => {
          console.log('readFile', res)
          // 源文件通过Uint8Array转换，加上随机生成的32位，生成新的base64
          const originData = new Uint8Array(res.data)
          const modifiedData = new Uint8Array(originData.length +
            binaryData.length)
          modifiedData.set(originData)
          modifiedData.set(binaryData, originData.length)
          const base64 = uni.arrayBufferToBase64(modifiedData)
          const base64Video = base64.replace(/[\r\n]/g, '')
          // 进行本地临时存储
          const fs = uni.getFileSystemManager();
          const filePath = `${wx.env.USER_DATA_PATH}/video${new Date().getTime()}.mp4`;
          uni.setStorage({
            key: 'file-path',
            data: filePath,
            success: (res) => {
              console.log('保存file路径成功', res)
            },
            fail: (res) => {
              console.log('保存file路径失败', res)
            }
          })
          // 写入文件
          fs.writeFileSync(filePath, base64Video, 'base64');
          fs.getFileInfo({
            filePath: filePath,
            success: (res) => {
              console.log('sucess-getFileInfo', res)
              this.fileInfo.newDigest = res.digest
            },
            fail: (err) => {
              console.log('fail-getFileInfo', err)
            }
          })
        },
        fail(err) {
          console.log('fail-readFile>>>', err)
        },
        complete: (res) => {
          uni.hideLoading()
        }
      })
    },
    fail(err) {
      console.log('fail-chooseMedia>>>', err)
    }
  })
}
```

