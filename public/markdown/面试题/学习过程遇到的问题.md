## 1、路由传递参数（对象写法）path是否可以结合params参数一起使用？

不能

## 2、如何指定params参数可传可不传？

如果配置路由时已经占位，此时不传params参数就会导致url出现问题

如何指定params参数可传可不传：在配置路由的时候，在占位的后面加上一个问号，如 `path: '/search/:keyword?'`

## 3、params参数可传可不传，但是如果传的是空串？	

使用undefined解决

```
params：{keyword：''||undefined}
```

## 4、路由组件能不能传递props数据？

可以

布尔值写法：params：

> 在配置路由时加上 `props:true`，后面也需要`props:[]`来接收props数据（只能传递params数据）

对象写法：额外给路由组件传递一些props

```
props:[a:1,b:2]
```

函数写法：可以params参数、query参数，通过props传递给路由组件

```
props:($route) => ({keyword:$route.params.keyword,k:$route.quert.k})
```

## 5、编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?

注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。

这种异常，对于程序没有任何影响的。

为什么会出现这种现象:

由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,

第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调。可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

```
let result = this.$router.push({name: "search",params: { keyword: this.keyword|| undefined}},()=>{},()=>{});
```



第二种解决方案：重写push|replace

this：当前组件实例（search）

this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route属性

push：VueRouter类的一个实例

push在VueRouter的原型上，原型对象的方法



## 6、防抖和节流

事件触发非常频繁，而且每一次的触发，回调函数都要去执行，如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿现象



防抖：前面的所有触发都被取消，最后一次执行在规定时间之后生效，也就是说如果连续快速的触发，只会执行一次

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发



## 7、组件通信

- props:父子
- 插槽:父子
- 自定义事件:子父
- 全局事件总线$bus:万能
- pubsub:万能
- Vuex:万能
- $ref:父子通信



## 8、全局事件总线

要先在`main.js`的`new Vue`里的`beforeCreate`里配置

```js
new Vue({
  //配置全局事件总线
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
    // 这样组件发送请求时，代码不需要import到组件，简化代码
    Vue.prototype.$http = http;
  },
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store,
  render: h => h(App),
}).$mount('#app');
```



## 9、render函数

render函数即渲染函数，它是个函数，render返回的参数是Vnode（即虚拟节点，也就是我们要渲染的节点）

createElement是render函数返回的参数，它本身也是一个函数，并且有3个参数：

第一个参数（必填）：可以为String|Object|Function

- String：表示的是HTML 标签名；

- Object ：一个含有数据的组件选项对象；
- Function ：返回了一个含有标签名或者组件选项对象的async函数。

第二个参数（选填）：可为Class|Style|attrs|domProps|on

- class：控制类名；
- style ：样式；
- attrs ：用来写正常的 html 属性 id src 等；
- domProps ：用来写原生的dom 属性；
- on：用来写原生方法；

第三个参数（选填）：代表子级虚拟节点，由 createElement() 构建而成，正常来讲接收的是一个字符串或者一个数组，一般数组用的是比较多的



## 10、ajax和axios

**ajax：**

1、什么是ajax

Ajax是对原生XHR的封装，为了达到我们跨越的目的，增添了对JsonP的支持。

异步的javascript和xml，ajax不是一门新技术，而是多种技术的组合，用于快速的创建动态页面，能够实现无刷新更新数据从而提高用户体验。
 属性：url、method、dataType、beforeSend、success、error…

[web前端全套视频学习资料：http://www.atguigu.com/download.shtml](https://link.juejin.cn?target=http%3A%2F%2Fwww.atguigu.com%2Fdownload.shtml)

2、ajax的原理？

由客户端请求ajax引擎，再由ajax引擎请求服务器，服务器作出一系列响应之后返回给ajax引擎，由ajax引擎决定将这个结果写入到客户端的什么位置。实现页面无刷新更新数据。

3、核心对象？

XMLHttpRequest

4、ajax优缺点？

优点：

1、无刷新更新数据

2、异步与服务器通信

3、前端和后端负载平衡

4、基于标准被广泛支持

5、界面与应用分离

缺点：

1、ajax不能使用Back和history功能，即对浏览器机制的破坏

2、安全问题 ajax暴露了与服务器交互的细节

3、对收索引擎的支持比较弱

4、破坏程序的异常处理机制

5、违背URL和资源定位的初衷

6、ajax不能很好的支持移动设备

7、太多客户端代码造成开发上的成本

5、Ajax适用场景
 1、表单驱动的交互
 2、深层次的树的导航
 3、快速的用户与用户间的交流响应
 4、类似投票、yes/no等无关痛痒的场景
 5、对数据进行过滤和操纵相关数据的场景
 6、普通的文本输入提示和自动完成的场景
 6、Ajax不适用场景
 1、部分简单的表单
 2、搜索
 3、基本的导航
 4、替换大量的文本
 5、对呈现的操纵

7、代码

$.ajax({
 type: 'POST',
 url: url,
 data: data,
 dataType: dataType,
 success: function () {},
 error: function () {}
 });

8、ajax请求的五个步骤

1、创建XMLHttpRequest异步对象

2、设置回调函数

3、使用open方法与服务器建立连接

4、向服务器发送数据

5、在回调函数中针对不同的响应状态进行处理

**axios：**

1、axios是什么

Axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和 node.js 中；是请求资源的模块；通过promise对ajax的封装。
 属性：url、method、data、responseType、.then、.catch…
 2、axios有那些特性？

1、在浏览器中创建 XMLHttpRequests

2、在node.js则创建http请求

3、支持Promise API

4、支持拦截请求和响应

5、转换请求和响应数据

6、取消请求

7、自动转换成JSON数据格式

8、客户端支持防御XSRF

3、执行get请求，有两种方式

// 第一种方式 将参数直接写在url中
 axios.get('/getMainInfo?id=123')
 .then((res) => {
 console.log(res)
 })
 .catch((err) => {
 console.log(err)
 })
 // 第二种方式 将参数直接写在params中
 axios.get('/getMainInfo', {
 params: {

```bash
id: 123
复制代码
```

}
 })
 .then((res) => {
 console.log(res)
 })
 .catch((err) => {
 console.log(err)
 })

4、执行post请求，注意执行post请求的入参，不需要写在params字段中，这个地方要注意与get请求的第二种方式进行区别。

```
axios.post('/getMainInfo', {
 id: 123
 })
 .then((res) => {
 console.log(res)
 })
 .catch((err) => {
 console.log(err)
 })
```

**axios和ajax的区别：**

axios是通过Promise实现对ajax技术的一种封装，就像jquery对ajax的封装一样。

简单来说就是ajax技术实现了局部数据的刷新，axios实现了对ajax的封装，axios有的ajax都有，ajax有的axios不一定有。



## 11、data为什么要是函数形式

因为对象、数组都是引用型数据类型。当多个组件new实例的话，就会直接引用同一个data的对象的数据，一个组件数据修改，另一个就会跟着修改。

当data是一个function返回的，就是每一个data都是不一样的存放地址。



当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。



## 12、MVVM和MVC区别

MVC是一种设计模式：

M（Model）：模型层。是应用程序中用于处理应用程序数据逻辑的部分，模型对象负责在数据库中存取数据；
V（View）：视图层。是应用程序中处理数据显示的部分，视图是依据模型数据创建的；
C（Controller）：控制层。是应用程序中处理用户交互的部分，控制器接受用户的输入并调用模型和视图去完成用户的需求，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。

vue框架中MVVM的M就是后端的数据，V就是节点树，VM就是new出来的那个Vue({})对象

M（Model）：模型层。就是业务逻辑相关的数据对象，通常从数据库映射而来，我们可以说是与数据库对应的model。
V（View）：视图层。就是展现出来的用户界面。
VM（ViewModel）：视图模型层。连接view和model的桥梁。因为，Model层中的数据往往是不能直接跟View中的控件一一对应上的，所以，需要再定义一个数据对象专门对应view上的控件。而ViewModel的职责就是把model对象封装成可以显示和接受输入的界面数据对象。



**MVVM的优势**

1、mvc和mvvm都是一种设计思想。 主要就是mvc中Controller演变成mvvm中的viewModel。 mvvm主要解决了mvc中大量DOM操作使页面渲染性能降低，加载速度变慢的问题 。

2、MVVM与MVC最大的区别就是：它实现了View和Model的自动同步：当Model的属性改变时，我们不用再自己手动操作Dom元素来改变View的显示，它会自动变化。

3、整体看来，MVVM比MVC精简很多，我们不用再用选择器频繁地操作DOM。

**MVVM并不是用VM完全取代了C，ViewModel存在目的在于抽离Controller中展示的业务逻辑，而不是替代Controller，其它视图操作业务等还是应该放在Controller中实现**。



## 13、BFC和IFC机制

盒子模型的结构：content -> padding -> border -> margin



- BFC（Block Formatting Context）即“块级格式化上下文”， IFC（Inline Formatting Context）即行内格式化上下文。常规流（也称标准流、普通流）是一个文档在被显示时最常见的布局形态。一个框在常规流中必须属于一个格式化上下文，你可以把BFC想象成一个大箱子，箱子外边的元素将不与箱子内的元素产生作用。
- 它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。也可以说BFC就是一个作用范围
- 在普通流中的 Box(框) 属于一种 formatting context(格式化上下文) ，类型可以是 block ，或者是 inline ，但不能同时属于这两者。并且， Block boxes(块框) 在 block formatting context(块格式化上下文) 里格式化， Inline boxes(块内框) 则在 Inline Formatting Context(行内格式化上下文) 里格式化



**BFC的作用和特点**

不和浮动元素重叠，清除外部浮动，阻止浮动元素覆盖*



## 14、data url

是以`data:`模式为前缀的URL，允许内容的创建者将较小的文件嵌入到文档中

Data URL由data:前缀、MIME类型（表明数据类型）、base64标志位（如果是文本，则可选）以及数据本身四部分组成。

- base64字符串是用64进制来表示二进制数据的，它是一个ASCII字符串。
- 由于仅仅是通过ASCII字符组成的，所以**base64字符串是url-safe的，因此才将base64应用于data URL的<data>中。**
