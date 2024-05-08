# 前端路由实现方式

### hash

我们都知道一个URL是由很多部分组成，包括协议、域名、路径、query、hash等，比如上面的例子，我们点击不同模块的时候可能看到是这样的URL

- 首页：yourdomain.xxx.com/index.html/#/
- 商城：yourdomain.xxx.com/index.html/#/shop
- 购物车：yourdomain.xxx.com/index.html/#/shopping-cart
- 我的：yourdomain.xxx.com/index.html/#/mine

\#号后面的，就是一个URL中关于hash的组成部分，可以看到，不同路由对应的hash是不一样的，但是它们都是在访问同一个静态资源index.html。我们要做的，就是如何能够监听到URL中关于hash部分发生的变化，从而做出对应的改变。



其实浏览器已经暴露给我们一个现成的方法`hashchange`，在hash改变的时候，触发该事件。有了监听事件，且改变hash页面并不刷新，这样我们就可以在监听事件的回调函数中，执行我们展示和隐藏不同UI显示的功能，从而实现前端路由。



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
      name="viewport"
    />
    <title>实现简单的hash路由</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      #content {
        height: calc(100vh - 50px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3em;
      }
      #nav {
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
      }
      #nav a {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
      }
      #nav a:not(:last-of-type) {
        border-right: none;
      }
    </style>
  </head>
  <body>
    <main id="content"></main>
    <nav id="nav">
      <a href="#/">首页</a>
      <a href="#/shop">商城</a>
      <a href="#/shopping-cart">购物车</a>
      <a href="#/mine">我的</a>
    </nav>
  </body>
  <script>
    class VueRouter {
      constructor(routes = []) {
        this.routes = routes; // 路由映射
        this.currentHash = ""; // 当前的hash
        this.refresh = this.refresh.bind(this);
        window.addEventListener("load", this.refresh, false);
        window.addEventListener("hashchange", this.refresh, false);
      }

      getUrlPath(url) {
        // 获取hash
        return url.indexOf("#") >= 0 ? url.slice(url.indexOf("#") + 1) : "/";
      }

      refresh(event) {
        console.log(event);
        // URL hash发生改变的时候，拿到当前的hash
        let newHash = "",
          oldHash = null;
        if (event.newURL) {
          oldHash = this.getUrlPath(event.oldURL || "");
          newHash = this.getUrlPath(event.newURL || "");
        } else {
          newHash = this.getUrlPath(window.location.hash);
          window.history.hash = "#/";
        }
        this.currentHash = newHash;
        this.matchComponent();
      }

      matchComponent() {
        let curRoute = this.routes.find(
          (route) => route.path === this.currentHash
        );
        if (!curRoute) {
          // 当前URL中的hash不存在的时候，默认取第一个，当然真实场景下，可能会有各种情况，取决于业务逻辑
          curRoute = this.routes.find((route) => route.path === "/");
        }
        const { component } = curRoute;
        document.querySelector("#content").innerHTML = component;
      }
    }

    const router = new VueRouter([
      {
        path: "/",
        name: "home",
        component: "<div>首页内容</div>"
      },
      {
        path: "/shop",
        name: "shop",
        component: "<div>商城内容</div>"
      },
      {
        path: "/shopping-cart",
        name: "shopping-cart",
        component: "<div>购物车内容</div>"
      },
      {
        path: "/mine",
        name: "mine",
        component: "<div>我的内容</div>"
      }
    ]);
  </script>
</html>
```

从上面的一些描述和实践，我们可以得出以下结论：

- hash模式所有的工作都是在前端完成的，不需要后端服务的配合
- hash模式的实现方式就是通过监听URL中hash部分的变化，从而做出对应的渲染逻辑
- hash模式下，URL中会带有#，看起来不太美观



### history

history路由模式的实现，是要归功于HTML5提供的一个history全局对象，可以将它理解为其中包含了关于我们访问网页（历史会话）的一些信息。同时它还暴露了一些有用的方法，比如：

- window.history.go 可以跳转到浏览器会话历史中的指定的某一个记录页
- window.history.forward 指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
- window.history.back 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
- window.history.pushState 可以将给定的数据压入到浏览器会话历史栈中
- window.history.replaceState 将当前的会话页面的url替换成指定的数据

而history路由的实现，主要就是依靠于pushState与replaceState实现的，这里我们先总结下它们的一些特点

- 都会改变当前页面显示的url，但都不会刷新页面
- pushState是压入浏览器的会话历史栈中，会使得history.length加1，而replaceState是替换当前的这条会话历史，因此不会增加history.length

既然已经能够通过pushState或replaceState实现改变URL而不刷新页面，那么是不是如果我们能够监听到改变URL这个动作，就可以实现前端渲染逻辑的处理呢？这个时候，我们还要了解一个事件处理程序popstate，先看下它的官方定义

> 每当激活同一文档中不同的历史记录条目时，`popstate` 事件就会在对应的 `window` 对象上触发。如果当前处于激活状态的历史记录条目是由 `history.pushState()` 方法创建的或者是由 `history.replaceState()` 方法修改的，则 `popstate` 事件的 `state` 属性包含了这个历史记录条目的 `state` 对象的一个拷贝。
>
> 调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件。`popstate` 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 `history.back()` 方法）。即，在同一文档的两个历史记录条目之间导航会触发该事件。

总结下就是以下几点

- history.pushState和history.replaceState方法是不会触发popstate事件的
- 但是浏览器的某些行为会导致popstate，比如go、back、forward
- popstate事件对象中的state属性，可以理解是我们在通过history.pushState或history.replaceState方法时，传入的指定的数据

```js
let _wr = function(type) {
   let orig = history[type]
   return function() {
      let rv = orig.apply(this, arguments)
      let e = new Event(type)
      e.arguments = arguments
      window.dispatchEvent(e)
      return rv
   }
}

 history.pushState = _wr('pushState')
 history.replaceState = _wr('replaceState')
```



hash模式是不需要后端服务配合的。但是history模式下，如果你再跳转路由后再次刷新会得到404的错误，这个错误说白了就是浏览器会把整个地址当成一个可访问的静态资源路径进行访问，然后服务端并没有这个文件～看下面例子更好理解

**没刷新时，只是通过pushState改变URL，不刷新页面**

```tex
http://192.168.30.161:5500/ === http://192.168.30.161:5500/index.html // 默认访问路径下的index.html文件，没毛病
http://192.168.30.161:5500/home === http://192.168.30.161:5500/index.html // 仍然访问路径下的index.html文件，没毛病
...
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/index.html // 所有的路由都是访问路径下的index.html，没毛病
```

**一旦在某个路由下刷新页面的时候，想当于去该路径下寻找可访问的静态资源index.html，无果，报错**

```tex
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/mine/index.html文件，出问题了，服务器上并没有这个资源，404😭
```

**所以一般情况下，我们都需要配置下nginx，告诉服务器，当我们访问的路径资源不存在的时候，默认指向静态资源index.html**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 总结

一般路由实现主要有history和hash两种方式

hash的实现全部在前端，不需要后端服务器配合，兼容性好，主要是通过监听hashchange事件，处理前端业务逻辑

history的实现，需要服务器做以下简单的配置，通过监听pushState及replaceState事件，处理前端业务逻辑

### abstract

abstract 是vue路由中的第三种模式，本身是用来在不支持浏览器API的环境中，充当fallback，而不论是hash还是history模式都会对浏览器上的url产生作用，他一般要实现的功能就是在已存在的路由页面中内嵌其他的路由页面，而保持在浏览器当中依旧显示当前页面的路由path，这就是abstract这种与浏览器分离的路由模式。



# 前端性能优化

## 路由懒加载

SPA 项目，一个路由对应一个页面，如果不做处理，项目打包后，会把所有页面打包成一个文件，**当用户打开首页时，会一次性加载所有的资源**，造成首页加载很慢，降低用户体验

**原理**

ES6的动态地加载模块——`import()`

调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中

webpackChunkName 作用是 webpack 在打包的时候，对异步引入的库代码（lodash）进行代码分割时，设置代码块的名字。webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中

## 组件懒加载

和路由懒加载一致，也是使用import

## 骨架屏

使用骨架屏，可以缩短白屏时间，提升用户体验。国内大多数的主流网站都使用了骨架屏，特别是手机端的项目

SPA 单页应用，无论 vue 还是 react，最初的 html 都是空白的，需要通过加载 JS 将内容挂载到根节点上，这套机制的副作用：会造成长时间的白屏

常见的骨架屏插件就是基于这种原理，在项目打包时将骨架屏的内容直接放到 html 文件的根节点中

## 长列表虚拟滚动

首页中不乏有需要渲染长列表的场景，当渲染条数过多时，所需要的渲染时间会很长，滚动时还会造成页面卡顿，整体体验非常不好

**虚拟滚动——指的是只渲染可视区域的列表项，非可见区域的**不渲染，在滚动时动态更新可视区域，该方案在优化大量数据渲染时效果是很明显的

虚拟滚动图例：

![test](/Users/mac/Desktop/test/TestCase/笔记/image/test.png)

虚拟滚动基本原理：

计算出 totalHeight 列表总高度，并在触发时滚动事件时根据 scrollTop 值不断更新 startIndex 以及 endIndex ，以此从列表数据 listData 中截取对应元素

**插件使用**： vue-virtual-scroller、vue-virtual-scroll-list、react-tiny-virtual-list、react-virtualized



## Web Worker 优化长任务

由于浏览器 GUI 渲染线程与 JS 引擎线程是互斥的关系，当页面中有很多长任务时，会造成页面 UI 阻塞，出现界面卡顿、掉帧等情况

并不是执行时间超过 50ms 的任务，就可以使用 Web Worker，还要先考虑`通信时长`的问题

假如一个运算执行时长为 100ms，但是通信时长为 300ms， 用了 Web Worker可能会更慢

比如新建一个 web worker, 浏览器会加载对应的 worker.js 资源，下图中的 Time 是这个资源的通信时长（也叫加载时长）

**当任务的运算时长 - 通信时长 > 50ms，推荐使用Web Worker**



## requestAnimationFrame 制作动画

`requestAnimationFrame` 是浏览器专门为动画提供的 API，它的刷新频率与显示器的频率保持一致，使用该 api 可以解决用 setTimeout/setInterval 制作动画卡顿的情况

setTimeout/setInterval、requestAnimationFrame 三者的区别：

1）引擎层面

setTimeout/setInterval 属于 `JS引擎`，requestAnimationFrame 属于 `GUI引擎`

`JS引擎与GUI引擎`是互斥的，也就是说 GUI 引擎在渲染时会阻塞 JS 引擎的计算

2）时间是否准确

requestAnimationFrame 刷新频率是固定且准确的，但 setTimeout/setInterval 是宏任务，根据事件轮询机制，其他任务会阻塞或延迟js任务的执行，会出现定时器不准的情况

3）性能层面

当页面被隐藏或最小化时，setTimeout/setInterval 定时器仍会在后台执行动画任务，而使用 requestAnimationFrame 当页面处于未激活的状态下，屏幕刷新任务会被系统暂停



## JS的6种加载方式

**正常模式**

```xml
<script src="index.js"></script>
```

这种情况下 JS 会阻塞 dom 渲染，浏览器必须等待 index.js 加载和执行完成后才能去做其它事情

**async模式**

```xml
<script async src="index.js"></script>
```

async 模式下，它的加载是异步的，JS 不会阻塞 DOM 的渲染，async 加载是无顺序的，当它加载结束，JS 会立即执行

使用场景：若该 JS 资源与 DOM 元素没有依赖关系，也不会产生其他资源所需要的数据时，可以使用async 模式，比如埋点统计

**defer模式**

```xml
<script defer src="index.js"></script>
```

defer 模式下，JS 的加载也是异步的，defer 资源会在 `DOMContentLoaded` 执行之前，并且 defer 是有顺序的加载

如果有多个设置了 defer 的 script 标签存在，则会按照引入的前后顺序执行，即便是后面的 script 资源先返回

所以 defer 可以用来控制 JS 文件的执行顺序，比如 element-ui.js 和 vue.js，因为 element-ui.js 依赖于 vue，所以必须先引入 vue.js，再引入 element-ui.js

```xml
<script defer src="vue.js"></script>
<script defer src="element-ui.js"></script>
```

defer 使用场景：一般情况下都可以使用 defer，特别是需要控制资源加载顺序时

**module模式**

```xml
<script type="module">import { a } from './a.js'</script>
```

在主流的现代浏览器中，script 标签的属性可以加上 `type="module"`，浏览器会对其内部的 import 引用发起 HTTP 请求，获取模块内容。这时 script 的行为会像是 defer 一样，在后台下载，并且等待 DOM 解析

Vite 就是利用浏览器支持原生的 `es module` 模块，开发时跳过打包的过程，提升编译效率

**preload**

```xml
<link rel="preload" as="script" href="index.js">
```

link 标签的 preload 属性：用于提前加载一些需要的依赖，这些资源会优先加载

preload 特点：

1）preload 加载的资源是在浏览器渲染机制之前进行处理的，并且不会阻塞 onload 事件；

2）preload 加载的 JS 脚本其加载和执行的过程是分离的，即 preload 会预加载相应的脚本代码，待到需要时自行调用；

**prefetch**

```xml
<link rel="prefetch" as="script" href="index.js">
```

prefetch 是利用浏览器的空闲时间，加载页面将来可能用到的资源的一种机制；通常可以用于加载其他页面（非首页）所需要的资源，以便加快后续页面的打开速度

prefetch 特点：

1）pretch 加载的资源可以获取非当前页面所需要的资源，并且将其放入缓存至少5分钟（无论资源是否可以缓存）

2）当页面跳转时，未完成的 prefetch 请求不会被中断

**加载方式总结**

async、defer 是 script 标签的专属属性，对于网页中的其他资源，可以通过 link 的 preload、prefetch 属性来预加载

如今现代框架已经将 preload、prefetch 添加到打包流程中了，通过灵活的配置，去使用这些预加载功能，同时我们也可以审时度势地向 script 标签添加 async、defer 属性去处理资源，这样可以显著提升性能

## 图片的优化

**图片的动态裁剪**

**图片的懒加载**

图片懒加载实现原理：

由于浏览器会自动对页面中的 img 标签的 src 属性发送请求并下载图片，可以通过 html5 自定义属性 data-xxx 先暂存 src 的值，然后在图片出现在屏幕可视区域的时候，再将 data-xxx 的值重新赋值到 img 的 src 属性即可

```html
<img src="" alt="" data-src="./images/1.jpg">
<img src="" alt="" data-src="./images/2.jpg">
```

**使用字体图标**

字体图标是页面使用小图标的不二选择，最常用的就是 [iconfont](https://link.juejin.cn/?target=https%3A%2F%2Fwww.iconfont.cn%2Fhome%2Findex)

字体图标的优点：

1）轻量级：一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了 http 请求

2）灵活性：可以随意的改变颜色、产生阴影、透明效果、旋转等

3）兼容性：几乎支持所有的浏览器，请放心使用

**图片转 base64 格式**

将小图片转换为 base64 编码字符串，并写入 HTML 或者 CSS 中，减少 http 请求

转 base64 格式的优缺点：

1）它处理的往往是非常小的图片，因为 Base64 编码后，图片大小会膨胀为原文件的 4/3，如果对大图也使用 Base64 编码，后者的体积会明显增加，即便减少了 http 请求，也无法弥补这庞大的体积带来的性能开销，得不偿失

2）在传输非常小的图片的时候，Base64 带来的文件体积膨胀、以及浏览器解析 Base64 的时间开销，与它节省掉的 http 请求开销相比，可以忽略不计，这时候才能真正体现出它在性能方面的优势

## DNS预解析

[掘金地址](https://juejin.cn/post/7336812458646290495)

简单来说，DNS 的作用是将域名解析为 IP 地址，解析的过程是耗时的，转化后会做本地缓存，我们的优化的目标主要是针对用户第一次访问站点的时候陷入长时间白屏的问题。

DNS 解析可以分为两类，第一类是页面 DNS 解析，当用户输入 url 地址后（比如是第一次访问站点），便开始页面 DNS 解析，这个过程是省不了的，因为你无法在用户访问站点之前就让他提前把 DNS 解析好；

第二类是其他资源的 DNS 解析，在浏览器解析 html 的时候，会遇到一些 script 元素、link 元素，此时会暂停 html 的解析，转而加载 JS，里面就包含了 DNS 解析，这个过程是耗时的，会阻塞浏览器渲染主线程，所以该如何进行优化呢？答案是采用 DNS 预解析！

**DNS预解析**（`dns-prefetch` ）是前端网络性能优化的一种措施，它根据浏览器定义的规则，**提前解析**之后可能会用到的域名，使解析结果**缓存到系统缓存**中，缩短DNS解析时间，进而提高网站的访问速度。

DNS预解析能够让浏览器在用户访问链接之前解析域名，其范围包括文档的所有链接，包括图片、CSS、JS；域名解析后，如果用户确实访问该域名，那么DNS解析时间将不会有延迟。因为预读取会在后台执行，所以DNS很可能在链接对应的东西出现之前就已经解析完毕，这能够减少用户点击链接时的延迟。

当浏览器访问一个域名的时候，需要解析一次 DNS，获得对应域名的 ip 地址；在解析过程中，按照如下的顺序逐步读取缓存，直到拿到IP地址：

- 浏览器缓存
- 系统缓存
- 路由器缓存
- ISP(运营商)DNS缓存
- 根域名服务器
- 顶级域名服务器
- 主域名服务器

dns-prefetch 就是在**将解析后的IP缓存在系统中**；这样就有效地缩短了 DNS 解析时间。因为在本地操作系统做了 DNS 缓存，使得 DNS 在解析的过程中，提前在系统缓存中找到了对应 IP；这样一来，后续的解析步骤就不用执行了，进而也就缩短了 DNS 解析时间。

假如浏览器首次将一个域名解析为 IP 地址，并缓存至操作系统，那么下一次 DNS 解析时间可以低至 0-1ms；倘若结果不缓存在系统，那么就需要读取路由器的缓存，进而后续的解析时间最小也要约 15ms

如果路由器缓存也不存在，则需要读取 ISP（运营商）DNS缓存，一般像 `taobao.com`、`baidu.com` 这些常见的域名，读取ISP（运营商）DNS 缓存需要的时间在 80-120ms，如果是不常见的域名，平均需要 200-300ms

那也就是说，`dns-prefetch` 可以给 DNS 解析过程带来 15-300ms 的提升，尤其是一些大量引用很多其他域名资源的网站，提升效果就更加明显了。

在 HTML 的 head 部分添加以下代码来启用 DNS 预解析，href 属性指定了需要预解析的主机名：

```html
<link rel="dns-prefetch" href="//baidu.com">
```

需要注意的是，`dns-prefetch` 仅对跨域域上的 DNS 查找有效，因此请避免使用它来指向相同域

HTTP 页面下所有的 a 标签的 href 都会自动去启用 DNS Prefetch，也就是说，你网页的 a 标签 href 带的域名，是不需要在 head 里面加上 link 手动设置的。

### 项目中使用

```js
//vite   package.json
"scripts": {
    "build": "vite bulid && node ./scripts/dns-prefetch.js"
}
```

具体的代码如下，简单来说就是，遍历打包后的 dist 目录中的所有 HTML、JS、CSS 文件，将所有外链的域名存起来，然后在 dist 目录下 index.html 文件的 head 标签中依次插入 link 标签，同时开启 DNS 预解析：

```js
// dns-prefetch.js
const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')
const { glob } = require('glob')
const urlRegex = require('url-regex')

// 获取外部链接的正则表达式
const urlPattern = /(https?://[^/]*)/i
const urls = new Set()

// 遍历dist目录中的所有HTML、JS、CSS文件
async function searchDomin() {
    const files = await glob('dist/**/*.{html,css,js}')
    for (const file of files) {
        const source = fs.readFileSync(file, 'utf-8')
        const matches = source.match(urlRegex({ strict: true }))
        if (matches) {
            matches.forEach((url) => {
                const match = url.match(urlPattern)
                if (match && match[1]) {
                    urls.add(match[1])
                }
            })
        }
    }
}

// 在index.html文件<head>标签中插入link标签
async function insertLinks() {
    const files = await glob('dist/**/*.html')
    const links = [...urls].map((url) => `<link rel="dns-prefetch" href="${url}" />`).join('\n')
    
    for (const file of files) {
        const html = fs.readFileSync(file, 'utf-8')
        const root = parse(html)
        const head = root.querySelector('head')
        head.insertAdjacentHTML('afterbegin', links)
        fs.writeFileSync(file, root.toString())
    }
}

async function main() {
    await searchDomin()
    await insertLinks()
}

main()
```



# 前端模块化

### 1.全局函数式编程

在早期的Web开发中，通常使用全局范围内声明函数和变量的方式来组织代码。例如：

```javascript
var module1Data = 'module1 data';
function module1Func(){
    console.log(module1Data);
}
```

这种方式存在的问题主要有命名冲突、函数间依赖关系不明显、维护困难等。

### 2.命名空间模式

随着对代码组织方式的需求增加，开发者开始通过定义全局对象，将所有函数和变量封装在这个对象中，也就是命名空间模式。

```javascript
var myApp = {
    module1Data: 'module1 data',
    module1Func: function(){
        console.log(this.module1Data);
    }
};
```

这种方式解决了全局命名冲突的问题，但是模块间的依赖关系依旧不明显，同时所有依赖都需要在命名空间对象中手动管理。

### 3.CommonJS

CommonJS模块规范是Node.js采用的规范，使用`require`函数加载模块，通过`module.exports`导出模块。

```javascript
// a.js
module.exports = 'Hello world';

// b.js
var a = require('./a');
console.log(a); // 输出 'Hello world'
```

CommonJS使用同步加载方式，适用于服务器端，但由于网络请求的异步特性，不适合在浏览器环境使用。

#### `require`函数

`require`函数的主要任务是根据模块的文件路径读取模块文件，然后执行模块代码，最后返回模块的`exports`对象。

`require`函数的实现代码大致如下：

```javascript
function require(modulePath){
    // 读取模块代码
    const code = fs.readFileSync(modulePath);
    
    // 包装模块代码
    const wrapper = Function('exports', 'require', 'module', '__filename', '__dirname', `${code}\n return module.exports;`);
    
    const exports = {};
    const module = { exports };
    
    // 执行模块代码
    wrapper(exports, require, module);
    
    // 返回模块的exports对象
    return module.exports;
}
```

其中，`wrapper`函数的参数`exports`和`module`就是模块的`exports`和`module`对象，这样我们就可以在模块中通过`exports`和`module.exports`来导出模块。

`require`函数在执行模块代码时，会先将模块代码包装到一个函数中，然后调用这个函数。这样做的好处是可以将模块代码隔离到一个函数作用域中，防止模块内的变量污染全局作用域。

#### `module.exports`

每个CommonJS模块都有一个`module`对象，这个对象有一个`exports`属性用于导出模块。当其他模块通过`require`函数加载这个模块时，就可以获取到`module.exports`对象。

`module.exports`的初始值是一个空对象`{}`，我们可以添加属性到这个对象上，也可以直接将`module.exports`赋值为一个函数或其他类型的值。

例如，以下代码展示了如何使用`module.exports`导出一个函数：

```javascript
// a.js
module.exports = function(){
    console.log('Hello world');
};

// b.js
const a = require('./a');
a(); // 输出 'Hello world'
```

以上就是CommonJS模块的实现原理。虽然CommonJS主要用于服务器端，但其模块化思想和实现方式对于前端模块化的发展有着深远影响。

### 4.AMD（Asynchronous Module Definition）

AMD规范是由RequireJS提出的，特点是异步加载模块，适合用在浏览器环境。

```javascript
// AMD
define(['dependency'], function(){
    return 'module content';
});
```

AMD规范的语法较为复杂，但能在浏览器环境中异步加载模块。

### 5.UMD（Universal Module Definition）

UMD规范试图提供一种解决方案，让同一段代码在CommonJS和AMD环境中都能运行。

```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
       

 define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    // 模块代码
}));
```

UMD通过判断环境中是否存在`define`和`exports`对象，来判断是哪种模块环境，从而使用对应的模块化方案。

### 6.ES6模块化

ES6模块化是ECMAScript 6（ES2015）中新引入的模块系统，使用`import`关键字加载模块，通过`export`关键字导出模块。

```javascript
// a.js
export const a = 'Hello world';

// b.js
import { a } from './a.js';
console.log(a); // 输出 'Hello world'
```

ES6模块化具有静态性，这种静态性质让依赖关系更加明显，有利于工具进行优化。此外，ES6模块是异步加载，也适合在浏览器环境中使用。



# 前端工程化

## webpack打包优化

## 打包后的静态文件

### 为什么是一串Hash值

**浏览器的默认缓存**

当请求静态资源的时候，浏览器就会默认缓存请求过来的静态文件，这种浏览器自带的默认缓存就叫做 `启发式缓存` 。 除非手动设置不需要缓存`no-store`，此时请求静态文件的时候文件才不会缓存到本地！

vue-cli里的默认配置，css和js的名字都加了哈希值，所以新版本css、js和就旧版本的名字是不同的，不会有缓存问题

**Hash值的作用**

当静态资源的名称发生变化的时候，请求路径就会发生变化，所以就会重新命中服务器新部署的静态资源！这就是为什么需要hash值的原因，为了区分之前部署的文件和这次部署文件的区别，好让浏览器去重新获取最新的资源。



## vite图片路径统一转换-自定义插件

vite主要有两个方面，一个时esbuild，一个时rollup

- esbuild：主要是开发环境
- rollup：打包结果

由于vite的默认优化，在图片体积小于4096时，会将图片转换为base64格式，这样可以减少http请求，提高加载速度

![Snipaste_2024-03-10_14-10-41](E:\learning\TestCase\images\Snipaste_2024-03-10_14-10-41.jpg)

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    assetsInlineLimit: 4096,
  }
})
```
现在我们需要将图片统一转换，根据生产环境的结果为准
1. 可以设置assetsInlineLimit为0，关闭base64转换，这样所有图片都会被转换为路径，但是这样会增加http请求，不利于性能优化，且没有使用到vite的优化
2. 可以使用vite的自定义插件，将图片统一转换为路径，这样可以减少http请求，提高加载速度，且使用到了vite的优化

```javascript
const myPlugin = (limit = 4096) => { 
  return {
    name: 'my-plugin',
    async transform(code, id) {
      if (process.env.NODE_ENV !== 'development') {
        return 
      }
      if (!id.endsWith('.png') && !id.endsWith('.jpg')) {
        return
      }
      const stat = await fs.promises.stat(id)
      if (stat.size > limit) { 
        return
      }
      const buffer = await fs.promises.readFile(id)
      const base64 = buffer.toString('base64')
      const dataurl = `data:image/${id.endsWith('.png') ? 'png' : 'jpg'};base64,${base64}`
      return {
        code: `export default ${JSON.stringify(dataurl)}`,
        map: null
      }
    }
  }
}
```

## vite手动分包

在`vite.config.js`进行配置，可以将一些第三方库进行分包，而且重新打包只会改变自己写的代码，分包出去的第三方库打包结果不变，文件指纹不变（也就是后面的hash值），这样浏览器可以利用缓存

```js
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "acsad": ['loadsh', "vue"]
        }
      }
    }
  }
})

// 将所有的第三方库的打包结果都放到vendor文件里
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})

```

![](E:\learning\TestCase\images\Snipaste_2024-03-10_14-42-48.jpg)

# 封装

# CDN缓存机制和原理

# websocket原理

# 白屏时间分析

# 登录功能

# 大文件上传

# 图片问题

## 图片过大显示问题

jpeg使用渐进式图片格式

像一些大的背景图，轮播图或者banner图，我们一般使用jpeg，其中jpeg有两种格式：

`baseline-jpeg（原始jpeg，一般项目的UI切图都是使用这种）`：存储方式是从上到下扫描一遍，逐行顺序保存； `preogressive-jpeg（渐进式jpeg）`：和baseline-jpeg一遍扫描不同，preogressive-jpeg文件包含多次扫描，这些扫描从模糊到清晰顺序存储在JPEG文件中；

`图片读取的顺序与存储顺序一致`，如果文件较大或者网络下载速度较慢，使用baseline-jpeg就会看到图片被一行行加载的效果，而使用preogressive-jpeg，会先显示整个图片的模糊轮廓，随着扫描次数的增加，图片变得越来越清晰。因此更推荐使用preogressive-jpeg。



**可行性分析：** 使用imagemin-mozjpeg 库，它默认会将图像转换成渐进式jpeg， 且由于编码方式，它们比baseline-jpeg略小。同时，该库还能 配置压缩图片。在大多数情况下，quality 设置为 70，可以产生 足够清晰的图像。

### 

# Cookie, Session, SessionStorage, LocalStorage

## 1. 什么是Cookie？

### 属性

Cookie是一种在客户端存储数据的机制，它将数据以键值对的形式存储在用户的浏览器中。Cookie具有以下属性：

- **名称和值**：每个Cookie都有一个名称和对应的值，以键值对的形式表示。
- **域（Domain）**：Cookie的域属性指定了可以访问Cookie的域名。默认情况下，Cookie的域属性设置为创建Cookie的页面的域名。
- **路径（Path）**：Cookie的路径属性指定了可以访问Cookie的路径。默认情况下，Cookie的路径属性设置为创建Cookie的页面的路径。
- **过期时间（Expires/Max-Age）**：Cookie的过期时间属性指定了Cookie的有效期限。可以通过设置`Expires`或`Max-Age`属性来定义过期时间。过期时间可以是一个具体的日期和时间，也可以是一个从当前时间开始的时间段。
- **安全标志（Secure）**：Cookie的安全标志属性指定了是否只在通过HTTPS协议发送请求时才发送Cookie。
- **同站点标志（SameSite）**：Cookie的同站点标志属性指定了是否限制Cookie只能在同一站点发送。可以设置为`Strict`（仅允许来自当前站点的请求携带Cookie）或`Lax`（允许部分跨站点请求携带Cookie）。

### 应用场景

Cookie在Web开发中有多种应用场景，包括：

- **会话管理**：Cookie常用于存储会话标识符，以便在用户访问不同页面时保持会话状态。
- **身份验证**：Cookie可以用于存储用户的身份验证凭证或令牌，以便在用户下次访问时自动登录。
- **个性化设置**：Cookie可以用于存储用户的个性化首选项，例如语言偏好、主题设置等。
- **追踪和分析**：Cookie可以

用于追踪用户的行为和进行网站分析，例如记录用户访问的页面、点击的链接等。

```javascript
// 设置Cookie
document.cookie = "username=John Doe; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/; secure; SameSite=Strict";

// 读取Cookie
const cookies = document.cookie.split("; ");
for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].split("=");
  const name = cookie[0];
  const value = cookie[1];
  console.log(name + ": " + value);
}
```

## 2. 什么是Session？

### 属性

Session是一种在服务器端存储和跟踪用户会话状态的机制。Session具有以下属性：

- **存储位置**：Session数据存储在服务器端的内存或持久化介质中，而不是存储在客户端。
- **会话ID**：每个会话都有一个唯一的会话ID，用于标识该会话。会话ID通常通过Cookie或URL参数发送给客户端，并在后续请求中用于识别会话。
- **过期时间**：Session可以设置过期时间，以控制会话的有效期。过期时间可以是一个具体的日期和时间，也可以是一个从会话创建时开始的时间段。
- **安全性**：Session的会话ID需要进行保护，以防止会话劫持和其他安全问题。

### 应用场景

Session在Web开发中有多种应用场景，包括：

- **用户身份验证**：Session用于存储用户的身份验证状态，以便在用户访问需要验证的资源时进行验证。
- **购物车**：Session用于存储用户的购物车内容，以便在用户进行结账或继续购物时保持购物车状态。
- **个性化设置**：Session可以用于存储用户的个性化首选项，例如语言偏好、主题设置等。

```javascript
const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, sameSite: "strict", httpOnly: true }
}));

app.get("/", (req, res) => {
  req.session.username = "John Doe";
  res.send("Session is set.");
});

app.get("/profile", (req, res) => {
  const username = req.session.username;
  res.send("Welcome, " + username);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## 3. 什么是SessionStorage？

### 属性

SessionStorage是一种在客户端存储临时数据的机制。SessionStorage具有以下属性：

- **存储位置**：SessionStorage数据存储在客户端的内存中，与当前会话关联。
- **会话范围**：SessionStorage数据仅在浏览器会话期间保留，当用户关闭标签页或浏览器时数据将被清除。
- **域和协议限制**：SessionStorage数据只能在同一域和协议下访问。

### [#](https://www.coding-time.cn/js/advance/详解前端数据存储.html#应用场景-2)应用场景

SessionStorage在Web开发中有多种应用场景，包括：

- **临时数据存储**：SessionStorage可用于在页面之间传递临时数据，例如表单数据、临时状态等。
- **表单数据保存**：SessionStorage可用于保存用户填写的表单数据，以便在刷新页面或返回页面时恢复数据，防止数据丢失。
- **单页应用状态管理**：在单页应用中，可以使用SessionStorage来存储和管理应用的状态，例如当前选中的标签、展开/收起的面板等。

```javascript
// 设置SessionStorage
sessionStorage.setItem("username", "John Doe");

// 读取SessionStorage
const username = sessionStorage.getItem("username");
console.log(username);
```

## 4. 什么是LocalStorage？

### 属性

LocalStorage是一种在客户端存储持久性数据的机制。LocalStorage具有以下属性：

- **存储位置**：LocalStorage数据存储在客户端的持久化介质中，与浏览器相关联。
- **持久性**：LocalStorage数据不受会话结束或浏览器关闭的影响，会一直保留在浏览器中，除非被显式删除。
- **域和协议限制**：LocalStorage数据只能在同一域和协议下访问。

### 应用场景

LocalStorage在Web开发中有多种应用场景，包括：

- **本地数据存储**：LocalStorage可用于在客户端存储持久性数据，如用户首选项、缓存的数据等。
- **离线应用**：LocalStorage可用于存储离线应用所需的资源，例如HTML、CSS和JavaScript文件，以实现离线访问能力。
- **单页应用状态管理**：在单页应用中，可以使用LocalStorage来存储和管理应用的状态，例如当前选中的标签、展开/收起的面板等。

```javascript
// 设置LocalStorage
localStorage.setItem("username", "John Doe");

// 读取LocalStorage
const username = localStorage.getItem("username");
console.log(username);
```

## 5. Cookie vs. Session vs. SessionStorage vs. LocalStorage

|                | 属性                 | 存储位置 | 生命周期           | 安全性             | 大小限制 | 跨域限制 |
| -------- | -------------------- | -------- | ------------------ | ------------------ | -------- | -------- |
| Cookie         | 键值对               | 客户端   | 可配置             | 受同源策略限制     | 约4KB    | 是       |
| Session        | 会话ID和服务器端存储 | 服务器端 | 可配置             | 较高（会话ID保护） | 无       | 否       |
| SessionStorage | 键值对               | 客户端   | 浏览器会话期间     | 同源               | 约5MB    | 否       |
| LocalStorage   | 键值对               | 客户端   | 永久（需显式删除） | 同源               | 约5MB    | 否       |

Cookie、Session、SessionStorage和LocalStorage都是常见的Web存储解决方案，每种方案都有其适用的场景和特点。

- 使用Cookie可以在客户端存储数据，适用于存储会话标识符、用户首选项和追踪用户行为等场景。
- Session用于在服务器端存储和管理用户的会话状态，适用于身份验证、购物车和个性化设置等场景。
- SessionStorage用于在浏览器会话期间存储临时数据，适用于传递数据、保存表单数据和单页应用状态管理等场景。
- LocalStorage用于在客户端存储持久性数据，适用于本地数据存储、离线应用和单页应用状态管理等场景。

根据具体的需求和场景，选择合适的存储方案可以更好地管理和使用数据。



# 前端跨页面通信

### Cookie

Cookie是一种在浏览器中存储数据的机制，可以通过设置Cookie的值在不同页面之间传递数据。通过设置相同的Cookie名称和值，不同的页面可以读取和修改Cookie的值，实现跨页面数据的传递和共享。

使用Cookie进行跨页面通信的示例代码如下：

```javascript
// 在页面 A 中设置 Cookie
document.cookie = "data=example";

// 在页面 B 中读取 Cookie
const cookies = document.cookie.split("; ");
for (let i = 0; i < cookies.length; i++) {
  const [name, value] = cookies[i].split("=");
  if (name === "data") {
    console.log(value); // 输出 "example"
    break;
  }
}
```

### LocalStorage 和 SessionStorage

LocalStorage和SessionStorage是浏览器提供的本地存储机制，可以在不同页面之间存储和读取数据。它们的区别在于数据的生命周期，LocalStorage中的数据在浏览器关闭后仍然保留，而SessionStorage中的数据在会话结束后被清除。

使用LocalStorage进行跨页面通信的示例代码如下：

```javascript
// 在页面 A 中存储数据到 LocalStorage
localStorage.setItem("data", "example");

// 在页面 B 中读取 LocalStorage 的数据
const data = localStorage.getItem("data");
console.log(data); // 输出 "example"
```

### Broadcast Channel

Broadcast Channel是浏览器提供的API，用于在不同页面之间进行消息广播和接收。通过Broadcast Channel，我们可以创建一个频道，并在不同的页面之间发送和接收消息。

使用Broadcast Channel进行跨页面通信的示例代码如下：

```javascript
// 在页面 A 中创建 Broadcast Channel
const channel = new BroadcastChannel("myChannel");

// 在页面 B 中监听消息
channel.addEventListener("message", (event) => {
  console.log(event.data); // 输出接收到的消息
});

// 在页面 A 中发送消息
channel.postMessage("Hello from Page A");
```

### Window.postMessage

Window.postMessage是浏览器提供的API，用于在不同窗口或框架之间进行安全的跨页面通信。通过Window.postMessage，我们可以向其他窗口发送消息，并接收其他窗口发送的消息。

使用Window.postMessage进行跨页面通信的示例代码如下：

```javascript
// 在页面 A 中发送消息给页面 B
window.opener.postMessage("Hello from Page A", "https://www.example.com");

// 在页面 B 中监听消息
window.addEventListener("message", (event) => {
  if (event.origin === "https://www.example.com") {
    console.log(event.data); // 输出接收到的消息
  }
});
```



# 前端跨域问题

## jsonp

利用`script`标签，只能发送get请求

## cors

服务端配置

## PostMessage、WebSocket

html5新特性

## Nginx

反向代理

## img标签

## vite、webpack

**配置proxy**

Vite的代理功能基于 Node.js 的 HTTP 代理实现（继承自 [`http-proxy`](https://github.com/http-party/node-http-proxy#options)）。当你在 Vite 的配置中设置了代理选项后，Vite 会创建一个代理服务器来拦截匹配到的请求，并将这些请求转发到指定的目标服务器上。下面简要说明了代理的原理：

1. **拦截请求**：当 Vite 启动时，它会创建一个开发服务器，监听指定的端口。当客户端发出一个请求时，Vite 的开发服务器会拦截这个请求。
2. **匹配规则**：Vite 会检查请求的 URL 是否匹配了配置中设置的代理规则。这些规则通常是基于 URL 的路径匹配的，例如 `/api`。
3. **转发请求**：如果请求匹配了代理规则，Vite 将会将这个请求转发到指定的目标服务器上。转发过程中，Vite 可以修改请求的头部信息、请求的路径等，以满足特定的需求。
4. **接收响应**：目标服务器处理完请求后会返回响应，Vite 会将这个响应返回给发起请求的客户端。
5. **处理响应**：Vite 可以选择性地对代理服务器返回的响应进行处理，比如修改响应的头部信息、修改响应体等。

Vite 的代理功能使用了 Node.js 提供的 HTTP 代理机制，利用代理服务器在客户端和目标服务器之间进行转发和处理请求。这种机制可以帮助开发者在开发过程中方便地模拟生产环境下的服务，并且解决了跨域请求的问题。



# 移动端屏幕适配

1. 利用`meta`标签，`viewport`适配
2. 响应式布局，css媒体查询
3. rem、%、vh和vw等弹性单元，可通过postcss插件自动转换成px单元



# JsBridge



# 前端传值

## EventBus

```js
import Vue from 'vue'

// 使用 Event Bus
const bus = new Vue()

export default bus
```

- 需要在created里接受数据`bus.$on`，发送数据`bus.$emit`
- 需要在beforeDestroy或者destroyed生命周期钩子解绑`bus.$off`，不然每次刷新都会创建一次接受数据的韩函数，存在一次发送多次接受的问题





# 进程与线程



# 浏览器渲染原理

### 渲染时间点

![img](https://ap3pibqbmd.feishu.cn/space/api/box/stream/download/asynccode/?code=NWJlNWMxOTUxOTA2NDc2MjI0YzBmZDJkZTY3NTNjOWRfeDVFanF0VTNla3dCTWszcDFYUGgxWWF4Y01pZXV2MmNfVG9rZW46Ym94Y25jelFkUHNIZ2JCOUNhbFVmRWdkVG5mXzE3MDg5NDQyMTk6MTcwODk0NzgxOV9WNA)

> 面试题：浏览器是如何渲染页面的？
>
> 答：
>
> 当浏览器的网络线程收到HTML文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列
>
> 在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染任务
>
> ------
>
> 整个渲染流程分为多个阶段，分别是：HTML解析、样式计算、布局、分层、分块、光栅、画
>
> 每个阶段都有明确的输入输出，上一个阶段的输出会成为下一个阶段的输入
>
> 这样，整个渲染流程就形成了一套组织严密的生产流水线
>
> ------
>
> 渲染的第一步是**解析****HTML**
>
> 解析过程中遇到 CSS 解析 CSS，遇到 JS 执行 JS。为了提高解析效率，浏览器在开始解析前，会启动一个预解析的线程，率先下载 HTML 中的外部 CSS 文件和 外部的 JS 文件。
>
> 如果主线程解析到`link`位置，此时外部的 CSS 文件还没有下载解析好，主线程不会等待，继续解析后续的 HTML。这是因为下载和解析 CSS 的工作是在预解析线程中进行的。这就是 CSS 不会阻塞 HTML 解析的根本原因。
>
> 如果主线程解析到`script`位置，会停止解析 HTML，转而等待 JS 文件下载好，并将全局代码解析执行完成后，才能继续解析 HTML。这是因为 JS 代码的执行过程可能会修改当前的 DOM 树，所以 DOM 树的生成必须暂停。这就是 JS 会阻塞 HTML 解析的根本原因。
>
> 第一步完成后，会得到 DOM 树和 CSSOM 树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在 CSSOM 树中。
>
> ------
>
> 渲染的下一步是**样式计算**。
>
> 主线程会遍历得到的 DOM 树，依次为树中的每个节点计算出它最终的样式，称之为 Computed Style。
>
> 在这一过程中，很多预设值会变成绝对值，比如`red`会变成`rgb(255,0,0)`；相对单位会变成绝对单位，比如`em`会变成`px`
>
> 这一步完成后，会得到一棵带有样式的 DOM 树。
>
> ------
>
> 接下来是**布局**，布局完成后会得到布局树。
>
> 布局阶段会依次遍历 DOM 树的每一个节点，计算每个节点的几何信息。例如节点的宽高、相对包含块的位置。
>
> 大部分时候，DOM 树和布局树并非一一对应。
>
> 比如`display:none`的节点没有几何信息，因此不会生成到布局树；又比如使用了伪元素选择器，虽然 DOM 树中不存在这些伪元素节点，但它们拥有几何信息，所以会生成到布局树中。还有匿名行盒、匿名块盒等等都会导致 DOM 树和布局树无法一一对应。
>
> ------
>
> 下一步是**分层**
>
> 主线程会使用一套复杂的策略对整个布局树中进行分层。
>
> 分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率。
>
> 滚动条、堆叠上下文、transform、opacity 等样式都会或多或少的影响分层结果，也可以通过`will-change`属性更大程度的影响分层结果。
>
> ------
>
> 再下一步是**绘制**
>
> 主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何画出来。
>
> ------
>
> 完成绘制后，主线程将每个图层的绘制信息提交给合成线程，剩余工作将由合成线程完成。
>
> 合成线程首先对每个图层进行分块，将其划分为更多的小区域。
>
> 它会从线程池中拿取多个线程来完成分块工作。
>
> 分块完成后，进入**光栅化**阶段。
>
> 合成线程会将块信息交给 GPU 进程，以极高的速度完成光栅化。
>
> GPU 进程会开启多个线程来完成光栅化，并且优先处理靠近视口区域的块。
>
> 光栅化的结果，就是一块一块的位图
>
> ------
>
> 最后一个阶段就是**画**了
>
> 合成线程拿到每个层、每个块的位图后，生成一个个「指引（quad）」信息。
>
> 指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形。
>
> 变形发生在合成线程，与渲染主线程无关，这就是`transform`效率高的本质原因。
>
> 合成线程会把 quad 提交给 GPU 进程，由 GPU 进程产生系统调用，提交给 GPU 硬件，完成最终的屏幕成像。

### 渲染流水线

![img](https://ap3pibqbmd.feishu.cn/space/api/box/stream/download/asynccode/?code=NTgxMjk2NTQ5MWQ4MGRhZWFmOWVhMzZkOGNhMjQ5MWNfZnZYU3hVYkZkS1h4TWJmV0VTVlhTbHhSNHlESzhkQXFfVG9rZW46Ym94Y24xSUhMeUxyNkJLS01NaXZibFpzb0FmXzE3MDg5NDQyMTk6MTcwODk0NzgxOV9WNA)

## 什么是reflow？

reflow 的本质就是重新计算 layout 树。

当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。

为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。

也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。

浏览器在反复权衡下，最终决定获取属性立即 reflow。

## **什么是 repaint？**

repaint 的本质就是重新根据分层信息计算了绘制指令。

当改动了可见样式后，就需要重新计算，会引发 repaint。

由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint。

## **为什么 transform 的效率高？**

因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个「draw」阶段

由于 draw 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 transform 的变化。



# 前端打电话/发短信/发邮件

```js
window.location.href = `sms:${phoneNumber}?body="${encodeURIComponent(content)}"`
// 最后编码一下，不然跳转过去会乱码
```

## 电话

```html
<a href='tel:123456' style='font-size:18px;line-height:30px'>tel拨打电话</a><br>
```

## 短信

```html
<a href='sms:123456' style='font-size:18px;line-height:30px'>sms发短信</a><br>
<a href='sms:123456?body=你好，我要想要咨询！' style='font-size:18px;line-height:30px'>sms发短信，自定义短信内容</a>
```

## 邮件

```html
<a href="mailto:people@qq.com">发送邮件</a> 
<a href="mailto:people@qq.com,people2@163.com">群发邮件</a> 
<a href="mailto:people@qq.com?subject=文本">邮件指定主题</a> 
<a href="mailto:people@qq.com?subject=文本&cc=people2@qq.com">邮件指定抄送人</a>
```




## 为什么是一串Hash值

**浏览器的默认缓存**

当请求静态资源的时候，浏览器就会默认缓存请求过来的静态文件，这种浏览器自带的默认缓存就叫做 `启发式缓存` 。 除非手动设置不需要缓存`no-store`，此时请求静态文件的时候文件才不会缓存到本地！

vue-cli里的默认配置，css和js的名字都加了哈希值，所以新版本css、js和就旧版本的名字是不同的，不会有缓存问题

**Hash值的作用**

当静态资源的名称发生变化的时候，请求路径就会发生变化，所以就会重新命中服务器新部署的静态资源！这就是为什么需要hash值的原因，为了区分之前部署的文件和这次部署文件的区别，好让浏览器去重新获取最新的资源。



# 前端构建

## vite

如果没有配置任何构建配置，构建结果如下

****![vite打包dist目录](/Users/mac/Desktop/test/TestCase/images/vite打包dist目录.png)

# Polyfill

Polyfill虽然能够在旧版本浏览器中模拟新功能，但并不能解决所有兼容性问题。有些功能可能无法通过Polyfill来完全模拟，或者某些功能在旧版本浏览器上的性能可能会受到影响。因此，了解Polyfill的限制和适用情况是很重要的。
