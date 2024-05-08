# 为什么要使用`ref()`函数来声明响应式状态

> **[为什么要使用ref ?](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#why-refs)**
>
> 当你在模板中使用了一个 ref，然后改变了这个 ref 的值时，Vue 会自动检测到这个变化，并且相应地更新 DOM。这是通过一个基于依赖追踪的响应式系统实现的。当一个组件首次渲染时，Vue 会**追踪**在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会**触发**追踪它的组件的一次重新渲染。
>
> 在标准的 JavaScript 中，检测普通变量的访问或修改是行不通的。然而，我们可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。
>
> 该 `.value` 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改。在其内部，Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。从概念上讲，你可以将 ref 看作是一个像这样的对象：
>
> ```js
> // 伪代码，不是真正的实现
> const myRef = {
> _value: 0,
> get value() {
> track()
> return this._value
> },
> set value(newValue) {
> this._value = newValue
> trigger()
> }
> }
> ```
>
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



# vue的setup函数

`setup`语法糖经过编译后就变成了`setup`函数，而`setup`函数的返回值是一个对象，这个对象就是由在`setup`顶层定义的变量和`import`导入组成的。`vue`在初始化的时候会执行`setup`函数，然后将`setup`函数返回值塞到`vue`实例的`setupState`属性上。执行`render`函数的时候会将`vue`实例上的`setupState`属性（也就是`setup`函数的返回值）传递给`render`函数，所以在`render`函数中就可以访问到`setup`顶层定义的变量和`import`导入。而`render`函数实际就是由`template`编译得来的，所以说在`template`中就可以访问到`setup`顶层定义的变量和`import`导入。



# pinia和vuex

## pinia

- pinia专门为vue3设计开发，支持Componention API，支持TypeScript，支持类型推断，是一个轻量级的状态管理解决方案
- 只有state、getter、actions，可以直接使用，更加的的API，更少的规范
- 在不重新加载页面的情况下可以修改store，支持热模块更换



## vuex

- vuex为vue2设计开发的
- 有state、getter、mutation、action四个，只有mutation才能变更状态，action是提交mutation。action包含异步操作
- 还有一个module，模块，将一些一起的都集合到一个模块，有点像vue3的Componention API



# 事件总线EventBus

基于观察者设计模式（也称为发布-订阅模式）

通过在全局创建一个事件总线，所有组件（无论他们的关系是父子还是兄弟还是不相关）都可以使用同一个总线发送事件和监听事件，传输数据。这样通信就可以不受组件间关系限制，实现灵活的通信能力。

## 优点

1. **实现全局任意组件共享的数据传输**
    查看上面的通信方式，我们可以看到Vue提供的大部分方式都有组件关系的限制，大部分是父组件向子组件向后代组件之间传递。而事件总线却没有任何限制。
2. **实现非常简单**
    使用状态管理工具也可以实现数据传递，但是这些工具都要引入依赖库，有自己的使用方式。虽然并不麻烦，但是都没有事件总线使用这么简单。
3. **全局的事件管理器**
    组件通信除了传递数据，另一个作用是实时触发事件，针对事件进行操作。查看上面的组件通信方式，我们发现除事件总线外，全局的通信只是数据的传递，没有事件的触发。通过监听状态管理和Storage数据等，可以变相实现事件的管理，但是并没有事件总线清晰和直接。

## 缺点

- **事件监听只能被动接收数据，不能随时获取状态**
   如果需要随时获取状态，显然还是状态管理工具更适合。
- **vue3不提供事件总线能力**
   在vue3中`$on $off`等实例方法已被移除，组件实例不再实现事件触发接口。官方推荐使用 mitt 等外部工具。

还有使用不慎带来的很多问题。例如：

- **事件名共享同一个命名空间**
- **不销毁事件监听器**
   如果在不使用后忘记销毁事件监听器，会造成难以排查的Bug或者引发性能问题。
- **误销毁同名事件其它监听器**
   比如多个组件都监听了同一事件'add'。其中某个组件销毁了'add'事件下的所有监听器`this.$EventBus.$off('add')`，就会影响其他的组件。
- **其它问题** 例如调试困难，耦合性高等等



# v-if和v-for

vue2中v-for优先

vue3中v-if优先

# 组件渲染和更新的过程

初次渲染的过程

- 解析模板为render函数
- 触发响应式，监听data属性getter setter
- 执行render函数，生成vnode，patch(elem,vnode)
- 执行render会触发getter

更新过程

- 修改data，触发setter
- 重新执行render函数，生成newVnode
- patch(vnode,newVnode),diff算法会算差异

![MVVM](/Users/mac/Desktop/test/TestCase/images/MVVM.jpeg)

![MVVM代码](/Users/mac/Desktop/test/TestCase/images/MVVM代码.jpeg)![]()

# 双向数据绑定v-model的实现原理

- input元素的value=this.name
- 绑定input事件 this.name = $event.target.value
- data 更新触发 re-render

3个步骤，实现数据的双向绑定：

1.实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。

2.实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。

3.实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

![下载](/Users/mac/Desktop/test/TestCase/images/下载.jpeg)

**vue是采用数据劫持结合发布者-订阅者模式的方式**，通过**Object.defineProperty()**来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发响应的监听回调。

v-model原理其实就是给input事件绑定oninput事件 就会立刻调用底层对象对应的setter方法 改变data里的属性的值 从而实现双向数据绑定

**vue单项数据绑定原理**

单项绑定过程：变量变了，由set发通知给watcher，watcher告知虚拟DOM树，叫它该比较了，我这有值变了，于是生成新的dom树进行一个比较，然后逐级分类比较，比较出哪个元素发生变化就把这个元素更新到页面，这就是单项数据绑定原理。

![双向绑定原理](/Users/mac/Desktop/test/TestCase/images/双向绑定原理.jpeg)

