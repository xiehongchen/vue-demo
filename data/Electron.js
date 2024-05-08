# Electron学习笔记

> **[B站学习视频](https://www.bilibili.com/video/BV1xd4y1J7dB)**

## 技术架构

**核心组成**

![](C:\Users\谢红尘\笔记\前端\框架\Electron\images\Snipaste_2023-04-14_12-25-00.png)

-  Chromium	类似chrome浏览器，支持最新特性的浏览器
- Node.js          文件io，JavaScript运行时，可以实现文件读写等
- Native apis    原生api，提供统一的原生界面能力

## 工作流程

![](C:\Users\谢红尘\笔记\前端\框架\Electron\images\Snipaste_2023-04-14_12-29-50.png)

- Main Process：主线程
  - 可以看做是`package.json`中`main`属性对应的文件
  - 一个应用只会有一个主线程
  - 只有主线程可以进行**GUI**的**API**操作
- Renderer Process：渲染进程
  - Windows中展示的界面通过渲染进程表现
  - 一个应用可以有多个渲染进程

## 环境搭建

## 生命周期

![](C:\Users\谢红尘\笔记\前端\框架\Electron\images\v2-683721f823f3681e361c3fee4058712a_r.png)

**生命周期事件**

- ready：app初始化完成
- dom-ready：一个窗口的文本加载完成 （webContents调用）
- did-finish-load：导航完成时触发
- window-all-closed：所有窗口都被关闭时触发
- before-quit：在关闭窗口之前触发
- will-quit：在窗口关闭并且应用退出时触发
- quit：当所有窗口被关闭时触发
- closed：当窗口关闭时触发，此时应删除窗口引用

## 窗口

### 窗口尺寸

```js
    let mainWindow = new BrowserWindow({
        // 位置和大小
        x: 100,
        y: 100,
        // 是否显示
        show: false,
        width: 800,
        height: 600,
        // 最大最小尺寸
        maxHeight: 600,
        maxWidth: 800,
        minHeight: 300,
        minWidth: 400,
        // 是否可缩放
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // 加载 index.html
    mainWindow.loadFile('index.html')
    // 当窗口准备好显示时，调用 show 方法，不然会导致窗口出现，但页面不显示的情况
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
```

### 窗口环境和标题

### 自定义窗口

```js
/**
 * 自定义窗口
 */

const {remote } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    // 获取元素添加点击操作的监听

    // 获取当前窗口
    let mainWin = remote.getCurrentWindow()

    let aBtn = document.getElementsByClassName('windowTool')[0].getElementsByTagName('div')

    aBtn[0].addEventListener('click', () => {
        console.log('关闭');
        mainWin.close()
    })

    aBtn[1].addEventListener('click', () => {
        console.log('最大化');
        if(!mainWin.isMaximized()){
            // 让当前窗口最大化
            mainWin.maximize()
        }else{
            // 让当前窗口回到初始值
            mainWin.restore()
        }
    })

    aBtn[2].addEventListener('click', () => {
        console.log('最小化');
        if(!mainWin.isMinimized()){
            // 让当前窗口最大化
            mainWin.minimize()
        }
    })
})
```

### 阻止窗口关闭

```js 
window.onbeforeunload = function(){
        let oBox = document.getElementsByClassName('isColse')[0]
        oBox.style.display = 'block'

        let yesBtn = oBox.getElementsByTagName('span')[0]
        let noBtn = oBox.getElementsByTagName('span')[1]

        yesBtn.addEventListener('click', () => {
            mainWin.desctroy()
        })

        noBtn.addEventListener('click', () => {
            oBox.style.display = 'none'
        })

        return false
    }
```

### 父子及模态窗口

```js
const {remote } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    // 获取元素添加点击操作的监听
    let oBtn = document.getElementById('openModal')
    oBtn.addEventListener('click', () => {
        // 获取当前窗口
        let mainWin = remote.BrowserWindow({
            // 父级窗口
            parent: remote.getCurrentWindow(),
            width: 400,
            height: 300,
            // 模态窗口, 父级窗口不能操作
            modal: true,
        })
        // 加载模态窗口
        mainWin.loadFile('modal.html')
        // 关闭窗口
        mainWin.on('close', () => {
            mainWin = null
        })
    }) 
})
```

### 自定义菜单

```js
const { app, BrowserWindow, Menu } = require('electron')
 	// 自定义菜单
    let muneTemp = [
        {
            label: '文件',
            // 子菜单
            submenu: [
                {
                    label: '新建',
                    // 图标
                    icon: './open.jpg',
                    // 快捷键
                    accelerator: 'ctrl + 0',
                    click() {
                        console.log('新建')
                    }
                },
                {
                    // 分割线
                    type: 'separator'
                },
                {
                    label: '打开'
                },
                {
                    label: '关于',
                    role:'about'
                }
            ]
        },
        {
            label: '编辑'
        }
    ]

    // 利用上述的模板然后创建菜单
    let mune = Menu.buildFromTemplate(muneTemp)

    // 设置菜单
    Menu.setApplicationMenu(mune)
```

### 右键菜单

```js
const {remote} = require('electron')
const Menu = remote.Menu

// 自定义菜单的内容
let contextTemp = [
    {label:'Run Code'},
    {label:'定义'},
    {
        label:'其他功能',
        click(){
            console.log("被点击");
        }
    }
]

// 一句上述内容创建menu
let memu = Menu.buildFromTemplate(contextTemp)

// 给鼠标右键添加监听
window.addEventListener('DOMContentLoaded',()=>{
    window.addEventListener('contextmenu',(ev)=>{
        // 阻止默认事件
        ev.preventDefault()
        // 显示菜单
        memu.popup({window:remote.getCurrentWindow()},false)
    })
})
```

## 进程通信

### 主进程与渲染进程通信

#### 渲染进程

```js
//渲染进程
const {ipcRenderer} = require('electron')

window.onload = function(){
    let oBtn = document.getElementById('btn')

    // 异步消息
    oBtn[0].addEventListener('click', () => {
        ipcRenderer.send('async-message', 'async ping')
    })

    // 接收异步消息
    ipcRenderer.on('async-reply', (event, arg) => {
        console.log(arg) // prints "async pong"
    })

    // 同步消息
    oBtn[1].addEventListener('click', () => {
        // 同步消息返回值
       let val =  ipcRenderer.sendSync('sync-message', 'sync ping')
        console.log(val); // prints "sync pong"
    })

    // 接收主进程消息
    ipcRenderer.on('message', (event, arg) => {
        console.log(arg) // prints "ping"
    })
}
```

#### 主线程

```js
// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, Menu,ipcMain } = require('electron')

    // 自定义菜单
    let muneTemp = [
        {
            label: '文件',
            //向渲染进程发送消息
            click(){
				BrowserWindow.getFocusedWindow().webContents.send('message','ping')
            }

        },
    ]

// 主线程接收渲染进程异步消息
ipcMain.on('async-message', (event, arg) => {
    console.log(arg) // prints "async ping"
    // 向渲染进程发送消息
    event.reply('async-reply', 'async pong')
})

// 主线程接收渲染进程同步消息
ipcMain.on('sync-message', (event, arg) => {
    console.log(arg) // prints "sync ping"
    // 向渲染进程发送消息
    event.returnValue = 'sync pong'
})
```

### 渲染进程之间通信

![](C:\Users\谢红尘\笔记\前端\框架\Electron\images\Snipaste_2023-04-14_16-48-31.png)

渲染进程A向主线程传递信息，主线程根据渲染进程A生成渲染进程B，并将一些数据存放到localStorage当中，然后渲染进程B从localStorage获取数据

## Dialog模块

```js
const {remote} = require('electron')

window.onload = function(){
    let obtn = document.getElementById('btn')
    
    obtn.addEventListener('click',()=>{
        // 打开文件选择
        remote.dialog.showOpenDialog({
            // 默认地址
            default:__dirname,
            // 修改确认按钮名称
            buttonLabel:'请选择',
            // 修改标题
            title:'选择文件',
            properties:['openFile','multiSelections'],
            filters:[
                {"name":'代码文件',extensions:['js','json','heml']},
                {"name":'图片文件',extensions:['png','ico','jpeg']}
            ]
        }).then((ret)=>{
            // 返回类型为promise,可以使用then接收
            console.log(res);
        })
    })
}
```

## shell与iframe

```js
const {shell} = require('electron')
const path = require('path')

window.onload = function(){
    let oBtn1 = document.getElementById('openUrl')
    console.log(oBtn1);
    let oBtn2 = document.getElementById('openFolder')
    oBtn1.addEventListener('click',(ev)=>{
        ev.preventDefault()

        let url = oBtn1.getAttribute('href')
        // 打开外部链接
        shell.openExternal(url)
    })
    oBtn2.addEventListener('click',(ev)=>{
        shell.showItemInFolder(path.resolve(__filename))
    })
}
```

