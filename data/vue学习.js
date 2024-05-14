
# vue的优缺点

优点：渐进式，组件化，轻量级，虚拟dom，响应式，单页面路由，数据与视图分开

缺点：单页面不利于seo，不支持IE8以下，首屏加载时间长

# 为什么data是个函数并且返回一个对象

`data`之所以是一个函数，是因为一个组件可能会多处调用，而每一次调用就会执行`data函数`并返回新的数据对象，这样，可以避免多处调用之间的`数据污染`。

# vue的修饰符

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NGJhODhhODA0YWYxYjU4NWVkOTg4YWNiOTE4NTkyNjFfZksxQ3ZNdGRLZ3BxNk5JTVh2WUk1OVpPMnZxanVFM0JfVG9rZW46WFpuVmIycVpRb0RkM1B4aUZBVWN1OHBpbldiXzE3MTU2NTY4NDA6MTcxNTY2MDQ0MF9WNA)

# 组件传值

# 组件间通信

- 使用ref
  - 获取子组件实例，通过子组件实例拿到数据
- 状态管理库，vuex、pinia
- 父组件传值给子组件，子组件使用`props`进行接收
- 子组件传值给父组件，子组件使用`$emit+事件`对父组件进行传值
- 组件中可以使用`$parent`和`$children`获取到父组件实例和子组件实例，进而获取数据。通过共同祖辈`$parent`或者`$root`搭建通信桥梁

```JavaScript
// 兄弟组件
this.$parent.on('add', this.add)

// 兄弟组件
this.$parent.emit('add')
```

- 使用`$attrs`和`$listeners`，在对一些组件进行二次封装时可以方便传值，例如A->B->C
- 使用`$refs`获取组件实例，进而获取数据
- 使用`Vuex`进行状态管理
- 使用`eventBus`进行跨组件触发事件，进而传递数据。这个需要及时清除`$emit`，不然后续会触发多次，也就接受多次

```JavaScript
// 组件1，触发这个
this.$bus.$emit('foo')

// 组件2，接受这个
this.$bus.$on('foo', this.handle())

// 组件3，接受这个
this.$bus.$on('foo', this.handle())
```

- 使用`provide`和`inject`，官方建议我们不要用这个，我在看`ElementUI`源码时发现大量使用。祖先组件定义`provide`属性，返回传递的值，在后代组件通过`inject`接受组件传递过来的值

```JavaScript
// 祖先组件
provide() {
    return {
        foo: 'foo'
    }
 }
 
 // 后代组件
 inject: ['foo']
```

- 使用浏览器本地缓存，例如`localStorage`

# vue的生命周期

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmUyZDQ3NTA5ZTU1MTE5ZDI3MmM3MTA5N2U4NDc1Y2RfeEtnUm14ems1cW04cktZWHFaekNmd3A4TVRiSkhxb1BfVG9rZW46RW9USGJHTWsyb0ROUXh4Tk8xWmNlSm1QbmFmXzE3MTU2NTY4NDA6MTcxNTY2MDQ0MF9WNA)

# 为什么只对对象劫持，而要对数组进行方法重写？

因为对象最多也就几十个属性，拦截起来数量不多，但是数组可能会有几百几千项，拦截起来非常耗性能，所以直接重写数组原型上的方法，是比较节省性能的方案

# 为什么要使用`ref()`函数来声明响应式状态

> **[为什么要使用ref ?](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#why-refs)**

> 当你在模板中使用了一个 ref，然后改变了这个 ref 的值时，Vue 会自动检测到这个变化，并且相应地更新 DOM。这是通过一个基于依赖追踪的响应式系统实现的。当一个组件首次渲染时，Vue 会**追踪**在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会**触发**追踪它的组件的一次重新渲染。

> 在标准的 JavaScript 中，检测普通变量的访问或修改是行不通的。然而，我们可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。

> 该 `.value` 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改。在其内部，Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。从概念上讲，你可以将 ref 看作是一个像这样的对象：

```JavaScript
// 伪代码，不是真正的实现
const myRef = {
_value: 0,
get value() {
track()
return this._value
},
set value(newValue) {
this._value = newValue
trigger()
}
}
```

> 另一个 ref 的好处是，与普通变量不同，你可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。当将复杂的逻辑重构为可重用的代码时，这将非常有用。

# computed和watch、watchEffect

| 对比依据              | computed | watch            | watchEffect |
| --------------------- | -------- | ---------------- | ----------- |
| 是否自动收集依赖（1） | 自动     | 需要指定依赖对象 | 自动        |
| 有无返回值            | 有       | 无               | 有          |
| 是否可以赋值          | 可以     | 不能             | 不能        |
| 使用场景              | 简单情况 | 复杂情况         | 简单情况    |
| 是否立即执行          | 是       | 看参数（2）      | 是          |
| 本质                  | class    | function         | function    |

（1）依赖：指的是响应性依赖，也就是侦听 ref、reactive 这类具有响应性的对象。

（2）watch：默认情况下，被侦听对象变化时才会执行，但是可以通过 options 参数设置为可以立即执行

> computed的缓存原理：就是ComputedRefImpl上有私有成员`_value`，执行get方法时，会吧返回值存入`_value`，template直接从`_value`属性获取数据，在需要更新缓存的时候才会调用`getter`方法

# vue的模版编译

模板字符串 -> 解析器 -> AST -> 优化器 -> AST -> 代码生成器 -> 渲染函数

# vue的响应式原理

# pinia和vuex

## pinia

- pinia专门为vue3设计开发，支持Componention API，支持TypeScript，支持类型推断，是一个轻量级的状态管理解决方案
- 只有state、getter、actions，可以直接使用，更加的的API，更少的规范
- 在不重新加载页面的情况下可以修改store，支持热模块更换

## vuex

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NDkyNjJhN2UwOWEzYzMxMDEzOGVmZjVjMTM4NTAzYmVfTVZPRHhMeGlrQk90VnBqelNvdnZSY3ZpbWx0QTdMbGVfVG9rZW46TUlwSGJkZVFtb0lWZE94bFFDTmNDWk1hbjZzXzE3MTU2NTY4NDA6MTcxNTY2MDQ0MF9WNA)

- vuex为vue2设计开发的
- 有state、getter、mutation、action四个，只有mutation才能变更状态，action是提交mutation。action包含异步操作
- 还有一个module，模块，将一些一起的都集合到一个模块，有点像vue3的Componention API

# **事件总线EventBus**

基于观察者设计模式（也称为发布-订阅模式）

通过在全局创建一个事件总线，所有组件（无论他们的关系是父子还是兄弟还是不相关）都可以使用同一个总线发送事件和监听事件，传输数据。这样通信就可以不受组件间关系限制，实现灵活的通信能力。

## **优点**

1. **实现全局任意组件共享的数据传输** 查看上面的通信方式，我们可以看到Vue提供的大部分方式都有组件关系的限制，大部分是父组件向子组件向后代组件之间传递。而事件总线却没有任何限制。
2. **实现非常简单** 使用状态管理工具也可以实现数据传递，但是这些工具都要引入依赖库，有自己的使用方式。虽然并不麻烦，但是都没有事件总线使用这么简单。
3. **全局的事件管理器** 组件通信除了传递数据，另一个作用是实时触发事件，针对事件进行操作。查看上面的组件通信方式，我们发现除事件总线外，全局的通信只是数据的传递，没有事件的触发。通过监听状态管理和Storage数据等，可以变相实现事件的管理，但是并没有事件总线清晰和直接。

## **缺点**

- **事件监听只能被动接收数据，不能随时获取状态** 如果需要随时获取状态，显然还是状态管理工具更适合。
- **vue3不提供事件总线能力** 在vue3中$$on$$`off`等实例方法已被移除，组件实例不再实现事件触发接口。官方推荐使用 mitt 等外部工具。

还有使用不慎带来的很多问题。例如：

- **事件名共享同一个命名空间**
- **不销毁事件监听器** 如果在不使用后忘记销毁事件监听器，会造成难以排查的Bug或者引发性能问题。
- **误销毁同名事件其它监听器** 比如多个组件都监听了同一事件'add'。其中某个组件销毁了'add'事件下的所有监听器`this.$EventBus.$off('add')`，就会影响其他的组件。
- **其它问题** 例如调试困难，耦合性高等等

# **v-if和v-for**

vue2中v-for优先

vue3中v-if优先

# v-if和v-show

- v-show式给该元素添加`display: none`，dom元素依旧存在，v-if式将dom元素整个添加或删除
- v-if切换有个局部编译/卸载的过程，切换过程钟合适地销毁后重构内部地事件监听和子组件，v-show只是简单的基于css切换
- v-if有着更高的切换消耗，v-show有着更高地初始渲染消耗
- 需要非常频繁地切换，使用v-show较好，运行时条件很少变化，使用v-if更好

# vue中的key

- 如果不使用key，vue就采用就地复用原则：最小化element的移动，并且会尝试尽最大成都在同适当的地方对相同类型的element，做`patch`或者`reuse`
- 如果使用key，vue会根据keys的顺序记录element，曾经拥有了key的element如果不再出现的话，会被直接`remove`或者`destoryed`
- 设置key能大大减少对页面的dom操作，提高diff效率

# **组件渲染和更新的过程**

初次渲染的过程

- 解析模板为render函数
- 触发响应式，监听data属性getter setter
- 执行render函数，生成vnode，patch(elem,vnode)
- 执行render会触发getter

更新过程

- 修改data，触发setter
- 重新执行render函数，生成newVnode
- patch(vnode,newVnode),diff算法会算差异

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQxYWQwNDI3NWM2ZmUwYjhjNGJmN2ZiYTI5ZDhhM2ZfZ3ZsMDk1R3FPVkJ4cE9kRWxkbDJiWU54VnpPcnE5bHJfVG9rZW46VmpVWWJRTm92b0JucER4QjBOOWNKSjZ2bkVjXzE3MTU2NTY4NDA6MTcxNTY2MDQ0MF9WNA)

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=M2ZmMzQzMGU3M2M0ZWUzOWQxOTVhNTJlZTBhOGNiYzBfOVVkbXQ2ZUJRVlVxbVNSOE5BTVpZemhyalg0eGVGVjJfVG9rZW46VjBMcGJQdVppb1o0aWR4clY2a2NXYVMxbnZPXzE3MTU2NTY4NDA6MTcxNTY2MDQ0MF9WNA)

# **双向数据绑定v-model的实现原理**

- input元素的value=this.name
- 绑定input事件 this.name = $event.target.value
- data 更新触发 re-render

3个步骤，实现数据的双向绑定：

1.实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。

2.实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。

3.实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjZkMDk1NjEwMzExMjJlYmI4NmM5ZmVhM2RjYmEwYmVfZEp2cDRMN3RQcVJpUDkwM1V0UG43NERQeUVYVHR6QVBfVG9rZW46WkliMmJQN2k4bzRVY2J4Mm4zeGNOakt5bkxjXzE3MTU2NTY4NDA6MTcxNTY2MDQ0MF9WNA)

**vue是采用数据劫持结合发布者-订阅者模式的方式**，通过**Object.defineProperty()**来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发响应的监听回调。

v-model原理其实就是给input事件绑定oninput事件 就会立刻调用底层对象对应的setter方法 改变data里的属性的值 从而实现双向数据绑定

**vue单项数据绑定原理**

单项绑定过程：变量变了，由set发通知给watcher，watcher告知虚拟DOM树，叫它该比较了，我这有值变了，于是生成新的dom树进行一个比较，然后逐级分类比较，比较出哪个元素发生变化就把这个元素更新到页面，这就是单项数据绑定原理。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmE4MWZmMWMxN2U0NTRhMmRiNjFmOWRiODZlNWVmMDlfZDRmS2Z3YWxCNHpJSHBwbE1xSVFhb1l5WWZEWVJIUGZfVG9rZW46SHNHYWIxcEx6b1kyMU54WGJ4T2NQUnF0bkliXzE3MTU2NTY4NDA6MTcxNTY2MDQ0MF9WNA)

# vue从初始化页面-修改数据-刷新页面ui的过程

当 Vue 进入初始化阶段时，一方面 Vue 会遍历 data 中的属性，并用 Object.defineProperty 将它转 化成 getter/setter 的形式，实现数据劫持(暂不谈 Vue3.0 的 Proxy)；另一方面，Vue 的指令编译器 Compiler 对元素节点的各个指令进行解析，初始化视图，并订阅 Watcher 来更新试图，此时 Watcher 会将自己添加到消息订阅器 Dep 中，此时初始化完毕。  当数据发生变化时，触发 Observer 中 setter 方法，立即调用 Dep.notify(),Dep 这个数组开始遍历所 有的订阅者，并调用其 update 方法，Vue 内部再通过 diff 算法，patch 相应的更新完成对订阅者视图的改变

# vue为什么要采用异步更新

因为首先 Vue 本身是组件级更新的，更改数据如果非常多，更新非常频繁，如果不采用异步更新的话每次都需要重新渲染。

每次有数据需要更新的时候，Vue 会把它放在一个队列中，等最后的时候会调用 `nexttick` 方法。`nexttick`就会清空这个队列。

用户也可以手动调用 `nexttick(callback)` 方法，会同样把callback 回调函数放入队列中，保证视图更新完之后被调用（因为会把 callback 放进队列的最后），并且是依次链式调用。

# spa单页面

SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

优点：

用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；

基于上面一点，SPA 相对对服务器压力小；

前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

缺点：

初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；

前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；

SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

# keep-alive

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

# Vue SSR

Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

即：SSR大致的意思就是vue在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的html 片段直接返回给客户端这个过程就叫做服务端渲染。

服务端渲染 SSR 的优缺点如下：

（1）服务端渲染的优点：

更好的 SEO：因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；

更快的内容到达时间（首屏加载更快）：SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；

（2) 服务端渲染的缺点：

更多的开发条件限制：例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；

更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

# **vue-router 中常用的 hash 和 history 路由模式实现原理吗？**

## hash 模式的实现原理

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为

 ‘#search’:https://www.word.com#search

hash 路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

## history 模式的实现原理

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。

唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

window.history.pushState(null, null, path);

window.history.replaceState(null, null, path);

history 路由模式的实现主要基于存在下面几个特性：

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

# nextTick

1. `nextTick`是`Vue`提供的一个全局`API`,是在下次`DOM`更新循环结束之后执行延迟回调，在修改数据之后使用`$nextTick`，则可以在回调中获取更新后的`DOM`；
2. Vue在更新DOM时是异步执行的。只要侦听到数据变化，`Vue`将开启1个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个`watcher`被多次触发，只会被推入到队列中-次。这种在缓冲时去除重复数据对于避免不必要的计算和`DOM`操作是非常重要的。`nextTick`方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用；
3. 比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可；
4. 我也有简单了解`nextTick`实现，它会在`callbacks`里面加入我们传入的函数，然后用`timerFunc`异步方式调用它们，首选的异步方式会是`Promise`。这让我明白了为什么可以在`nextTick`中看到`dom`操作结果。

**原理**

在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。 nextTick主要使用了宏任务和微任务。 根据执行环境分别尝试采用Promise、MutationObserver、setImmediate，如果以上都不行则采用setTimeout定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。

# vue3为什么删除时间切片

[github-关于vue3删除时间切片](https://github.com/vuejs/rfcs/issues/89#issuecomment-546988615)

在 Web 应用程序中，“卡顿”更新通常是由同步繁重的 CPU 时间 + 原始 DOM 更新的组合引起的。时间切片是在 CPU 工作期间保持应用程序响应的一种尝试，但它**仅**影响CPU 工作 - DOM 更新的刷新必须仍然同步，以确保最终 DOM 状态的一致性。

因此，想象一下两种类型的卡顿更新：

1. CPU 工作时间在 16 毫秒内，但原始 DOM 更新量巨大（例如挂载大量新 DOM 内容）。无论是否进行时间切片，该应用程序仍然会感觉“卡顿”。
2. CPU工作量很大，需要超过16ms。这就是时间切片理论上开始变得有益的地方 - 然而，HCI 研究表明，除非它正在制作动画，否则对于正常的用户交互，大多数人不会感觉到差异，除非更新时间超过 100 毫秒。
3. 也就是说，只有当频繁更新需要花费超过 100 毫秒的纯 CPU 时间时，时间切片才会变得实际有益。这就是有趣的部分：这种情况在 React 中会更频繁地发生，因为 -
   1. *由于重纤维架构，* React 的 Virtual DOM 协调本质上较慢；
   2. 与更易于静态分析的模板相比，使用 JSX 的 React 使其渲染函数本质上难以优化；
   3. React hooks 将大部分组件树级优化（即防止子组件不必要的重新渲染）留给了开发人员，在`useMemo`大多数情况下需要显式使用。此外，每当 React 组件收到`children`prop 时，它几乎总是需要重新渲染，因为`children`每次渲染时 prop 始终是一个新鲜的 vdom 树。这意味着使用 hooks 的 React 应用程序默认会过度重新渲染。更糟糕的是，像这样的优化`useMemo`不能轻易自动应用，因为（1）它需要正确的 deps 数组，（2）盲目地在任何地方添加它可能会阻止应该发生的更新，类似于`PureComponent`。 不幸的是，大多数开发人员**都**很懒，不会在各处积极优化他们的应用程序，因此大多数使用钩子的 React 应用程序将执行大量不必要的 CPU 工作。
4. 相比之下，Vue 通过以下方式解决了上述问题：
   1. 本质上更简单，因此更快的虚拟 DOM 协调（无时间切片 -> 无纤程 -> 开销更少）
   2. 通过分析模板进行大量 AOT 优化，解决虚拟 DOM 协调的基本开销。Benchmark 显示，对于动态与静态内容比例约为 1:4 的典型 DOM 内容，Vue 3 原始协调甚至比 Svelte 更快，并且在 CPU 上花费的时间不到 React 同等版本的 1/10。
   3. 通过反应性跟踪、将插槽编译为函数（避免子项导致重新渲染）和自动缓存内联处理程序（避免内联函数道具导致重新渲染）进行智能组件树级优化。除非必要，子组件永远不会重新渲染，无需开发人员进行任何手动优化。这意味着对于相同的更新，在 React 应用程序中可能会导致多个组件重新渲染，但在 Vue 中很可能只会导致 1 个组件重新渲染。
5. 因此，默认情况下，与 React 应用程序相比，Vue 3 应用程序花费在 CPU 上的时间要少得多，并且在 CPU 空间上花费 100+ 毫秒的机会大大减少，并且只会在极端情况下遇到，其中 DOM无论如何，这可能会成为更重要的瓶颈。

现在，时间切片或并发模式带来了另一个问题：因为框架现在安排和协调所有更新，所以它在优先级、失效、重新进入等方面产生了大量额外的复杂性。处理这些的所有逻辑永远不可能是树-shaken，这会导致运行时基线大小膨胀。即使包含 Suspense 和所有可摇树的功能，Vue 3 的运行时仍然只有当前 React + React DOM 大小的 1/4。

请注意，这并不是说并发模式作为一个整体是一个坏主意。它确实提供了处理某类问题（特别是与协调异步状态转换相关）的有趣新方法，但时间切片（作为并发的子功能）专门解决了一个在 React 中比在 React 中更为突出的问题。其他框架，同时也产生了自己的成本。对于 Vue 3 来说，这种权衡似乎根本不值得。
