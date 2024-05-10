
# Vue3

## Vue3快速上手

<img src="https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png" style="width:200px" />



### 1.Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
- 耗时2年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99位贡献者](https://github.com/vuejs/vue-next/graphs/contributors) 
- github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

### 2.Vue3带来了什么

#### 1.性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ......

#### 2.源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

#### 3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

#### 4.新的特性

1. Composition API（组合API）

   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment 
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......

## 1、创建Vue3.0工程

### 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

<img src="https://kalacloud.com/static/9affcc8711ebfcd3d3cc7269c57ced52/526aa/bundler.png" />

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

### 3、Vue3 项目结构

Vue3 中 `main.js` 代码有所改变：

```js
// 不再引入 Vue 构造函数，而是引入 createApp 工厂函数
// createApp函数：创建 vue 的 SPA 实例
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象
const app = createApp(App)
app.mount('#app')
```

Vue3 支持定义多个根节点，组件的 `<template>` 支持定义多个根节点：

```html
<template>
  <h1>根节点</h1>
  <h1>根节点</h1>
</template>
```

### 4、`npm run dev`详解

在我们执行这个命令的时候会去找 package json 的scripts 然后执行对应的dev命令

![](C:\Users\谢红尘\笔记\前端\框架\vue\vue3-images\Snipaste_2023-04-16_20-15-44.png)

其实在我们执行npm install 的时候（包含vite） 会在node_modules/.bin/ 创建好可执行文件

.bin 目录，这个目录不是任何一个 npm 包。目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 #!/bin/sh ，表示这是一个脚本 

>  所以npm run xxx 的时候，就会到 node_modules/bin中找对应的映射文件，然后再找到相应的js文件来执行
>
> 1.查找规则是先从当前项目的node_modlue /bin去找,
>
> 2.找不到去全局的node_module/bin 去找
>
> 3.再找不到 去环境变量去找

## 2、常用 Composition API	组合式api

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

### 1.拉开序幕的setup

- setup 是 Vue3 中一个新的配置项，值为函数
- 组件中使用的数据、方法等都要配置在 setup 中
- setup 函数两种返回值：
  - 返回一个对象，对象中的属性、方法可在模板中直接使用
  - 返回一个渲染函数，可自定义渲染内容
- setup 函数的参数：
  - props：值为对象，包含了组件外部传进来，且组件内部声明接收的属性
  - context：上下文对象
    - `attrs`：值为对象，包含了组件外部传进来，且组件内部没有声明接收的属性，相当于 `this.$attrs`
    - `slots`：收到的插槽内容，相当于 `this.$slots`
    - `emit`：触发自定义事件的函数，相当于 `this.$emit`

```js
import { h } from 'vue'

export default {
  name: 'App',
  props: ['title'],
  // Vue3 需要声明自定义事件，虽然不声明也能运行
  emits: ['changeCount'],

  // 返回函数
  /*
  setup() {
    return () => h('h1', 'Hello')
  },
  */

  // 返回对象
  setup(props, context) {
    let name = 'Vue3'
    function sayHello() {}
    function test() {
      context.emit('changeCount', 888)
    }

    return {
      name,
      sayHello,
      test,
    }
  },
}
```

- setup 在 `beforeCreate` 钩子之前执行，`this` 为 `undefined`
- setup 不要和 Vue2 配置混用。Vue2 的配置可以访问到 setup 的属性方法，反过来不行；如有重名，setup 优先
- setup 不能是 async 函数，因为 async 函数返回的是 promise 不是对象，会导致模板无法访问属性方法
- 若要返回 promise 实例，需要 `Suspense` 和异步组件的配合

###  2.ref函数

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据： ```xxx.value```
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
- 备注：
  - 接收的数据可以是：基本类型、也可以是**对象类型**。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。
  - 对象类型数据使用 ES6 的 `Proxy` 实现响应式，Vue3 把相关操作封装在 `reactive` 函数中
  - 按照之前的办法，对于对象数据，应该遍历每一层的属性添加 `getter` 、`setter`，但 Vue3 使用 Proxy 把内部数据一口气监测了

```html
<h2>{{ name }}</h2>
<p>{{ jobInfo.type }}</p>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    let name = ref('Vue3')
    let jobInfo = ref({
      type: 'frontend',
      salary: '40w',
    })

    function changeInfo() {
      name.value = '鱿鱼丝'
      // jobInfo 是 RefImpl 实例
      // jobInfo.value 是 Proxy 实例对象
      jobInfo.value.salary = '50w'
    }

    return {
      name,
      jobInfo, 
      changeInfo,
    }
  },
}
```

### 3.reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“**深层次的**”。
- 内部基于 ES6 的 Proxy 实现，通过**代理对象**操作源对象内部数据进行操作。
- `reactive` `proxy` 不能直接赋值，否则会破坏响应式对象的
  - 解决方法： 数组可以使用push 加上 解构
  - 添加一个对象，把数组作为一个属性去解决


```js
import { reactive } from 'vue'

export default {
  setup() {
    let person = reactive({
      name: 'Vue3',
      sex: 'unknown',
      info: {
        school: 'Oxford',
        major: 'computer',
      },
    })

    let color = reactive(['red', 'green', 'blue'])

    function changeInfo() {
      person.info.major = 'art'
      color[0] = 'yellow'
    }

    return {
      person,
      color,
      changeInfo,
    }
  },
}
```

### 4.Vue3.0中的响应式原理

#### vue2.x的响应式

- 实现原理：

  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

#### Vue3.0的响应式

- 实现原理: 

  - 通过**Proxy（代理）**:  **拦截对象中任意属性的变化**, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过**Reflect（反射）**:  对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect


```js
new Proxy(data, {
	// 拦截读取属性值	target:源对象	prop:属性
    get (target, prop) {
    	return Reflect.get(target, prop)
    },
    // 拦截设置属性值或添加新属性
    set (target, prop, value) {
    	return Reflect.set(target, prop, value)
    },
    // 拦截删除属性
    deleteProperty (target, prop) {
    	return Reflect.deleteProperty(target, prop)
    }
})

proxy.name = 'tom'
```

### 5.reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

### 6.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，**this是undefined**。
  - 所以setup拿不到data的数据

- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：**上下文对象**
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。


### 7.计算属性与监视

#### 1.computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {reavtive,computed} from 'vue'
  
  setup(){
      let person = reavtive({
          firstName: '张',
          lastName: '三'
      })
  	//计算属性——简写（没有考虑计算属性被修改的情况）
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      
      //也可以作为reactive的一个子项加入
      Person.fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整（考虑到计算属性被修改的情况）
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

#### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
  	console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  	若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  	若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive所定义的对象中的某个属性，所以deep配置有效
  ```

#### 3.watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

### 8.生命周期

vue3的生命周期图:

![vue3生命周期图](C:/Users/谢红尘/笔记/前端/框架/vue/image/lifecycle.16e4c08e.png)

vue2生命周期图:

![vue2生命周期图](C:/Users/谢红尘/笔记/前端/框架/vue/image/生命周期.png)

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`
  - `onErrorCaptured` =====>注册一个钩子，在捕获了后代组件传递的错误时调用。
  - `onRenderTracked` =====> 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。（仅在开发模式下可用）
  - `onRenderTriggered` =====> 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。（仅在开发模式下可用）
  - `onServerPrefetch` =====> 注册一个异步函数，在组件实例在服务器上被渲染之前调用。（仅在**服务器端渲染期间**可用）

### 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

- hook 放在 hooks 文件夹中，一个文件对应一个功能模块，以 `useXxx` 命名


```js
// hooks/usePoint.js
import { reactive, onMounted, onBeforeUnmount } from 'vue'

export default function () {
  //实现鼠标“打点”相关的数据
  let point = reactive({
    x: 0,
    y: 0,
  })

  //实现鼠标“打点”相关的方法
  function savePoint(event) {
    point.x = event.pageX
    point.y = event.pageY
  }

  //实现鼠标“打点”相关的生命周期钩子
  onMounted(() => {
    window.addEventListener('click', savePoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })

  return point
}
```

```js
// 使用 hook
import usePoint from '../hooks/usePoint.js'

export default {
  setup() {
    let point = usePoint()

    return { point }
  },
}
```

#### 案例

```ts
import { onMounted } from 'vue'
 
 
type Options = {
    el: string
}
 
type Return = {
    Baseurl: string | null
}
export default function (option: Options): Promise<Return> {
 
    return new Promise((resolve) => {
        onMounted(() => {
            const file: HTMLImageElement = document.querySelector(option.el) as HTMLImageElement;
            file.onload = ():void => {
                resolve({
                    Baseurl: toBase64(file)
                })
            }
 
        })
 
 
        const toBase64 = (el: HTMLImageElement): string => {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = el.width
            canvas.height = el.height
            ctx.drawImage(el, 0, 0, canvas.width,canvas.height)
            console.log(el.width);
            
            return canvas.toDataURL('image/png')
 
        }
    })
}
```

#### 案例二

自定义指令 + hooks 双管齐下

实现一个监听元素变化的hook

主要会用到一个新的API resizeObserver 兼容性一般 可以做polyfill

但是他可以监听元素的变化 执行回调函数 返回 contentRect 里面有变化之后的宽高。

```ts
import { App, defineComponent, onMounted } from 'vue'
 
function useResize(el: HTMLElement, callback: (cr: DOMRectReadOnly,resize:ResizeObserver) => void) {
    let resize: ResizeObserver
        resize = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                callback(cr,resize)
            }
        });
        resize.observe(el)
}
 
 
 
const install = (app: App) => {
    app.directive('resize', {
        mounted(el, binding) {
            useResize(el, binding.value)
        }
    })
}
 
useResize.install = install
 
export default useResize
```



### 10.toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。
- 只能修改响应式对象的值
- 使用场景：解构赋值，解构出来的也是响应式数据


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`   只能拆开

```js
import {reactive, toRef, toRefs} from 'vue'
...

setup() {
  let person = reactive({
    name: 'Vue3',
    age: 18,
    info: {
      job: {
        salary: 40,
      },
    },
  })

  return {
    // 注意不能写成 ref(person.name)，这和源对象是割裂开的
    name: toRef(person, 'name'),
    salary: toRef(person.info.job, 'salary')
    // or
    ...toRefs(person)
  }
}
```


## 3、其它 Composition API

### 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```js
import { shallowReactive, shallowRef } from 'vue'

setup() {
  let person = shallowReactive({
    name: 'Vue3',
    age: 21,
    info: {
      job: {
        salary: 22
      }
    }
  })
  let x = shallowRef({
    y: 0
  })
  return {
    person,
    x
  }
}
```

### 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。浅层的数据不可以被修改，可以修改深层的数据
- 应用场景: 不希望数据被修改时。

```js
setup() {
  let sum = ref(0)
  let person = reactive({...})

  sum = readonly(sum)
  person = shallowReadonly(person)

  return {
    sum,
    person
  }
}
```

### 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

```js
setup() {
  function showRawPerson() {
    const p = toRaw(person);
    p.age++;
    console.log(p);
    console.log(person);
  }

  function addCar() {
    let car = { name: "奔驰", price: 40 };
    person.car = markRaw(car);
  }
}
```

### 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef	delay:延迟时间
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```

  

### 5.provide 与 inject

![组件通信](C:/Users/谢红尘/笔记/前端/框架/vue/image/provide-inject.840efd40.png)

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car} 
     	......
     }
     ```

> 你如果传递普通的值 是不具有响应式的 需要通过ref reactive 添加响应式

### 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

### 7、父子组件传参

#### 父组件向子组件传值

父组件

```vue
<template>
  <children :data="name"></children>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
let name = '父组件'
</script>

```

子组件

```vue
<script setup lang='ts'>
// 接收父组件传过来的值 defineProps ts
const props = defineProps<{ data: string }>()

// 添加默认值 ts
withDefaults(defineProps<{
  msg: string
}>(), {
  msg: 'Hello World'
})
    
// 接收父组件传过来的值 js
const props = defineProps({
  data: {
    type: String,
    default: 'default'
  }
})
</script>
```

#### 子组件向父组件传值

父组件

```vue
<template>
  <div>父组件</div>
  <HelloWorld ref="world" @update="getName"/>
</template>
<script setup lang='ts'>
import { ref,onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const world = ref<InstanceType<typeof HelloWorld>>()
// 子组件向父组件传值
const getName = function({
    
})
// 在onMounted中调用子组件的方法
onMounted(() => {
  world.value?.open()
})
</script>
```

子组件

```vue
<script setup lang='ts'>
// 给父组件传递数据 js写法
const emit = defineEmits(['update'])

// ts写法
const emit = defineEmits<{
 (e: 'update', value: string): void
}>()

// 暴露属性和方法
defineExpose({
    name: 'HelloWorld',
    open:() => {
        console.log('HelloWorld')
    }
})
</script>
```

#### 案例	封装瀑布流组件

父组件

```vue
<template>
  <waterFallVue :list="list"></waterFallVue>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import waterFallVue from './components/water-fall.vue';
const list = [
  {
      height: 300,
      background: 'red'
  },
  {
      height: 400,
      background: 'pink'
  },
  {
      height: 500,
      background: 'blue'
  },
  {
      height: 200,
      background: 'green'
  },
  {
      height: 300,
      background: 'gray'
  },
  {
      height: 400,
      background: '#CC00FF'
  },
  {
      height: 200,
      background: 'black'
  },
  {
      height: 100,
      background: '#996666'
  },
  {
      height: 500,
      background: 'skyblue'
  },
  {
      height: 300,
      background: '#993366'
  },
  {
      height: 100,
      background: '#33FF33'
  },
  {
      height: 400,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#6633CC'
  },
  {
      height: 300,
      background: '#666699'
  },
  {
      height: 300,
      background: '#66CCFF'
  },
  {
      height: 300,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#CC3366'
  },
  {
      height: 200,
      background: '#CC9966'
  },
  {
      height: 200,
      background: '#FF00FF'
  },
  {
      height: 500,
      background: '#990000'
  },
  {
      height: 400,
      background: 'red'
  },
  {
      height: 100,
      background: '#999966'
  },
  {
      height: 200,
      background: '#CCCC66'
  },
  {
      height: 300,
      background: '#FF33FF'
  },
  {
      height: 400,
      background: '#FFFF66'
  },
  {
      height: 200,
      background: 'red'
  },
  {
      height: 100,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#33CC00'
  },
  {
      height: 300,
      background: '#330033'
  },
  {
      height: 100,
      background: '#0066CC'
  },
  {
      height: 200,
      background: 'skyblue'
  },
  {
      height: 100,
      background: '#006666'
  },
  {
      height: 200,
      background: 'yellow'
  },
  {
      height: 300,
      background: 'yellow'
  },
  {
      height: 100,
      background: '#33CCFF'
  },
  {
      height: 400,
      background: 'yellow'
  },
  {
      height: 400,
      background: 'yellow'
  },
  {
      height: 200,
      background: '#33FF00'
  },
  {
      height: 300,
      background: 'yellow'
  },
  {
      height: 100,
      background: 'green'
  }

]
</script>

<style  lang='less'>
#app,
html,
body {
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
}
</style>
```

子组件

```vue
<template>
    <div class="wraps">
        <div :style="{height:item.height+'px',background:item.background,top:item.top+'px',left:item.left + 'px'}"
            v-for="item in waterList" class="items"></div>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
const props = defineProps<{
    list: any[]
}>()
const waterList = reactive<any[]>([])
const init = () => {
    const heightList: any[] = []
    const width = 130;
    const x = document.body.clientWidth
    const column = Math.floor(x / width)
 
    for (let i = 0; i < props.list.length; i++) {
        if (i < column) {
            props.list[i].top = 10;
            props.list[i].left = i * width;
            heightList.push(props.list[i].height + 10)
            waterList.push(props.list[i])
        } else {
            let current = heightList[0]
            let index = 0;
            heightList.forEach((h, inx) => {
                if (current > h) {
                    current = h;
                    index = inx;
                }
            })
            console.log(current,'c')
            props.list[i].top = (current + 20);
            console.log(props.list[i].top,'top',i)
            props.list[i].left = index * width;
            heightList[index] =  (heightList[index] + props.list[i].height + 20);
            waterList.push(props.list[i])
        
        }
    }
    console.log(props.list)
}
 
onMounted(() => {
    window.onresize = () => init()
    init()
})
 
</script>
 
<style scoped lang='less'>
.wraps {
    position: relative;
     height: 100%;
    .items {
        position: absolute;
        width: 120px;
    }
}
</style>
```

### 8、兄弟组件传参和bus

#### 借助父组件传参

例如父组件为App 子组件为A 和 B他两个是同级的

```vue
<template>
    <div>
        <A @on-click="getFalg"></A>
        <B :flag="Flag"></B>
    </div>
</template>
    
<script setup lang='ts'>
import A from './components/A.vue'
import B from './components/B.vue'
import { ref } from 'vue'
let Flag = ref<boolean>(false)
const getFalg = (flag: boolean) => {
   Flag.value = flag;
}
</script>
    
<style>
</style>
```

A 组件派发事件通过App.vue 接受A组件派发的事件然后在Props 传给B组件 也是可以实现的

缺点就是比较麻烦 ，无法直接通信，只能充当桥梁

#### Event Bus

我们在[Vue2](https://so.csdn.net/so/search?q=Vue2&spm=1001.2101.3001.7020) 可以使用$emit 传递 $on监听 emit传递过来的事件

这个原理其实是运用了[JS设计模式](https://so.csdn.net/so/search?q=JS设计模式&spm=1001.2101.3001.7020)之发布订阅模式

```vue
 
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
}
type BusParams = string | number | symbol 
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() {
        this.list = {}
    }
    emit(name: T, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: T, callback: Function) {
        let fn: Array<Function> = this.list[name] || [];
        fn.push(callback)
        this.list[name] = fn
    }
}
 
export default new Bus<number>()
```

然后挂载到Vue config 全局就可以使用啦

> 注：在vue3当中，$on，$off，$once实例方法已被移除，组件实例不再实现事件触发接口，因此EventBus便无法使用
>
> 可以使用Mitt库实现

#### Mitt

在vue3中$on，$off 和 $once 实例方法已被移除，组件实例不再实现事件触发接口，因此大家熟悉的EventBus便无法使用了。然而我们习惯了使用EventBus，对于这种情况我们可以使用Mitt库（其实就是我们视频中讲的发布订阅模式的设计）

##### 1.安装

```
npm install mitt -S
```

##### 2.main.ts 初始化

全局总线，vue 入口文件 main.js 中挂载全局属性

```ts
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

const Mit = mitt()

//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}

const app = createApp(App)

//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit

app.mount('#app')
```

##### 3使用方法通过emit派发， on 方法添加事件，off 方法移除，clear 清空所有

A组件派发（emit）

```vue
<template>
    <div>
        <h1>我是A</h1>
        <button @click="emit1">emit1</button>
        <button @click="emit2">emit2</button>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();
const emit1 = () => {
    instance?.proxy?.$Bus.emit('on-num', 100)
}
const emit2 = () => {
    instance?.proxy?.$Bus.emit('*****', 500)
}
</script>

<style>
</style> 
```

B组件监听（on）

```vue
<template>
    <div>
        <h1>我是B</h1>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('on-num', (num) => {
    console.log(num,'===========>B')
})
</script>

<style>
</style>
```

监听所有事件（ on("*") ）

```ts
instance?.proxy?.$Bus.on('*',(type,num)=>{
    console.log(type,num,'===========>B')
})
```

移除监听事件（off）

```ts
const Fn = (num: any) => {
    console.log(num, '===========>B')
}
instance?.proxy?.$Bus.on('on-num',Fn)//listen
instance?.proxy?.$Bus.off('on-num',Fn)//unListen
```

清空所有监听（clear）

```ts
instance?.proxy?.$Bus.all.clear()
```

### 9、插槽

插槽就是子组件中的提供给父组件使用的一个占位符，用<slot></slot> 表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的<slot></slot>标签。

#### 匿名插槽

1.在子组件放置一个插槽

```vue
<template>
    <div>
       <slot></slot>
    </div>
</template>
```

父组件使用插槽

在父组件给这个插槽填充内容

```vue
    <Dialog>
       <template v-slot>
           <div>2132</div>
       </template>
    </Dialog>
```
#### 具名插槽

具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中

```vue
<div>
    <slot name="header"></slot>
    <slot></slot>
 
    <slot name="footer"></slot>
</div>
```
父组件使用需对应名称

```vue
    <Dialog>
        <template v-slot:header>
           <div>1</div>
       </template>
       <template v-slot>
           <div>2</div>
       </template>
       <template v-slot:footer>
           <div>3</div>
       </template>
    </Dialog>
```
 插槽简写

```vue
    <Dialog>
        <template #header>
           <div>1</div>
       </template>
       <template #default>
           <div>2</div>
       </template>
       <template #footer>
           <div>3</div>
       </template>
    </Dialog>
```
#### 作用域插槽

在子组件动态绑定参数 派发给父组件的slot去使用

```vue
<div>
    <slot name="header"></slot>
    <div>
        <div v-for="item in 100">
            <slot :data="item"></slot>
        </div>
    </div>
 
    <slot name="footer"></slot>
</div>
```
通过结构方式取值

```vue
     <Dialog>
        <template #header>
            <div>1</div>
        </template>
        <template #default="{ data }">
            <div>{{ data }}</div>
        </template>
        <template #footer>
            <div>3</div>
        </template>
    </Dialog>
```

#### 动态插槽

插槽可以是一个变量名

```vue
    <Dialog>
        <template #[name]>
            <div>
                23
            </div>
        </template>
    </Dialog>
```
### 10、v-model

在Vue3 v-model 是破坏性更新的

v-model在组件里面也是很重要的

v-model 其实是一个语法糖 通过props 和 emit组合而成的

1.默认值的改变

- prop：value -> modelValue；

- 事件：input -> update:modelValue；
- v-bind 的 .sync 修饰符和组件的 model 选项已移除
- 新增 支持多个v-model
- 新增 支持自定义 修饰符 Modifiers

#### 案例

子组件 

```vue
<template>
     <div v-if='propData.modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue'])
 
const close = () => {
     emit('update:modelValue',false)
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}}</button>
  <Dialog v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
</script>
 
<style>
</style>
```

#### 绑定多个案例

 子组件

```vue
<template>
     <div v-if='modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题---{{title}}</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean,
   title:string
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue','update:title'])
 
const close = () => {
     emit('update:modelValue',false)
     emit('update:title','我要改变')
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog v-model:title='title' v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
const title = ref('我是标题')
</script>
 
<style>
</style>
```

#### 自定义修饰符

添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop

```vue
<script setup lang='ts'>
 
type Props = {
    modelValue: boolean,
    title?: string,
    modelModifiers?: {
        default: () => {}
    }
    titleModifiers?: {
        default: () => {}
    }
 
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue', 'update:title'])
 
const close = () => {
    console.log(propData.modelModifiers);
 
    emit('update:modelValue', false)
    emit('update:title', '我要改变')
}
```

### 11、自定义指令directive

> 属于破坏性更新

#### 1.Vue3指令的钩子函数

- created 元素初始化的时候
- beforeMount 指令绑定到元素后调用 只调用一次
- mounted 元素插入父级dom调用
- beforeUpdate 元素被更新之前调用
- update 这个周期方法被移除 改用updated
- beforeUnmount 在元素被移除前调用
- unmounted 指令被移除后调用 只调用一次

Vue2 指令 bind inserted update componentUpdated unbind

#### 2.在setup内定义局部指令

但这里有一个需要注意的限制：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog  v-move-directive="{background:'green',flag:show}"></Dialog>
</template>
```

```ts
 
const vMoveDirective: Directive = {
  created: () => {
    console.log("初始化====>");
  },
  beforeMount(...args: Array<any>) {
    // 在元素上做些操作
    console.log("初始化一次=======>");
  },
  mounted(el: any, dir: DirectiveBinding<Value>) {
    el.style.background = dir.value.background;
    console.log("初始化========>");
  },
  beforeUpdate() {
    console.log("更新之前");
  },
  updated() {
    console.log("更新结束");
  },
  beforeUnmount(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载之前");
  },
  unmounted(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载完成");
  },
};
```

#### 3.生命周期钩子参数详解

第一个 el  当前绑定的DOM 元素

第二个 binding

- instance：使用指令的组件实例。
- value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2。
- oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否有更改都可用。
- arg：传递给指令的参数(如果有的话)。例如在 v-my-directive:foo 中，arg 为 "foo"。
- modifiers：包含修饰符(如果有的话) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为 {foo: true，bar: true}。
- dir：一个对象，在注册指令时作为参数传递。例如，在以下指令中

![img](https://img-blog.csdnimg.cn/f9e5558801104f81ac32c54d6cf5f587.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)


第三个 当前元素的虚拟DOM 也就是Vnode

第四个 prevNode 上一个虚拟节点，仅在 beforeUpdate 和 updated 钩子中可用 

#### 4.函数简写

你可能想在 `mounted` 和 `updated` 时触发相同行为，而不关心其他的钩子函数。那么你可以通过将这个函数模式实现

```vue
<template>
   <div>
      <input v-model="value" type="text" />
      <A v-move="{ background: value }"></A>
   </div>
</template>
   
<script setup lang='ts'>
import A from './components/A.vue'
import { ref, Directive, DirectiveBinding } from 'vue'
let value = ref<string>('')
type Dir = {
   background: string
}
const vMove: Directive = (el, binding: DirectiveBinding<Dir>) => {
   el.style.background = binding.value.background
}
</script>
 
<style>
</style>
```

##### 1.案例自定义拖拽指令 

```vue
<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>
      内容
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { Directive } from "vue";
const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e: MouseEvent) => {
        el.style.left = e.clientX - X + "px";
        el.style.top = e.clientY - Y + "px";
        console.log(e.clientX, e.clientY, "---改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};
</script>
 
<style lang='less'>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  .header {
    height: 20px;
    background: black;
    cursor: move;
  }
}
</style>
```

##### 2.案例权限按钮

```vue
<template>
   <div class="btns">
       <button v-has-show="'shop:create'">创建</button>
 
       <button v-has-show="'shop:edit'">编辑</button>
 
       <button v-has-show="'shop:delete'">删除</button>
   </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive,  } from 'vue'
import type {Directive} from 'vue'
//permission
localStorage.setItem('userId','xiaoman-zs')
 
//mock后台返回的数据
const permission = [
    'xiaoman-zs:shop:edit',
    'xiaoman-zs:shop:create',
    'xiaoman-zs:shop:delete'
]
const userId = localStorage.getItem('userId') as string
const vHasShow:Directive<HTMLElement,string> = (el,bingding) => {
   if(!permission.includes(userId+':'+ bingding.value)){
       el.style.display = 'none'
   }
}
 
</script>
 
<style scoped lang='less'>
.btns{
    button{
        margin: 10px;
    }
}
</style>
```

##### 3.图片懒加载

```vue
<template>
    <div>
        <div v-for="item in arr">
            <img height="500" :data-index="item" v-lazy="item" width="360" alt="">
        </div>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { Directive } from 'vue'
const images: Record<string, { default: string }> = import.meta.globEager('./assets/images/*.*')
let arr = Object.values(images).map(v => v.default)
 
let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
    let url = await import('./assets/vue.svg')
    el.src = url.default;
    let observer = new IntersectionObserver((entries) => {
        console.log(entries[0], el)
        if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
            setTimeout(() => {
                el.src = binding.value;
                observer.unobserve(el)
            }, 2000)
        }
    })
    observer.observe(el)
}
 
</script>
 
<style scoped lang='less'></style>
```



## 4、Composition API 的优势

### 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>




















### 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:400px;height:300px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>





















## 5、新的组件

### 组件

#### 全局组件

在main.ts文件中

```ts
import Card from './components/Card.vue'
export const app = createApp(App)
app.component('Card', Card)
```

#### 局部组件

```vue
<template>
  <div></div>
  <Card content='123'></Card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Card from './components/Card.vue'
</script>

<style scoped>

</style>
```

#### 递归组件

父组件

```ts
type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
const data = reactive<TreeList[]>([
  {
    name: "no.1",
    children: [
      {
        name: "no.1-1",
        children: [
          {
            name: "no.1-1-1",
          },
        ],
      },
    ],
  },
  {
    name: "no.2",
    children: [
      {
        name: "no.2-1",
      },
    ],
  },
  {
    name: "no.3",
  },
]);
```

子组件

```ts
type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
 
type Props<T> = {
  data?: T[] | [];
};
 
defineProps<Props<TreeList>>();
const clickItem = (item: TreeList) => {
  console.log(item)
}
```

**子组件增加一个script 定义组件名称为了 递归用** 

**给我们的组件定义名称有好几种方式**

##### 1、在增加一个script 通过 export 添加name

```vue
<script lang="ts">
export default {
  name:"TreeItem"
}
</script>
```

##### 2、直接使用文件名当组件名

3、在script加上name

```vue
<script lang="ts" name="TreeItem">

</script>
```

### 动态组件

```vue
<component :is="A"></component>

import A from './A.vue'
import B from './B.vue'
```

### 插件

插件是自包含的代码，通常向 Vue 添加全局级功能。你如果是一个对象需要有install方法Vue会帮你自动注入到install 方法 你如果是function 就直接当install 方法去使用

#### 使用插件

在使用 `createApp()` 初始化 Vue 应用程序后，你可以通过调用 `use()` 方法将插件添加到你的应用程序中。

**实现一个Loading**

##### Loading.Vue

```vue
<template>
    <div v-if="isShow" class="loading">
        <div class="loading-content">Loading...</div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
const isShow = ref(false)//定位loading 的开关
 
const show = () => {
    isShow.value = true
}
const hide = () => {
    isShow.value = false
}
//对外暴露 当前组件的属性和方法
defineExpose({
    isShow,
    show,
    hide
})
</script>
 
 
    
<style scoped lang="less">
.loading {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    &-content {
        font-size: 30px;
        color: #fff;
    }
}
</style>
```

##### Loading.ts

```ts
import {  createVNode, render, VNode, App } from 'vue';
import Loading from './index.vue'
 
export default {
    install(app: App) {
        //createVNode vue提供的底层方法 可以给我们组件创建一个虚拟DOM 也就是Vnode
        const vnode: VNode = createVNode(Loading)
        //render 把我们的Vnode 生成真实DOM 并且挂载到指定节点
        render(vnode, document.body)
        // Vue 提供的全局配置 可以自定义
        app.config.globalProperties.$loading = {
            show: () => vnode.component?.exposed?.show(),
            hide: () => vnode.component?.exposed?.hide()
        }
 
    }
}
```

##### Main.ts

```ts
import Loading from './components/loading'
 
 
let app = createApp(App)
 
app.use(Loading)
 
 
type Lod = {
    show: () => void,
    hide: () => void
}
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $loading: Lod
    }
}
 
app.mount('#app')
```

##### 使用方法

```vue
<template>
 
  <div></div>
 
</template>
 
<script setup lang='ts'>
import { ref,reactive,getCurrentInstance} from 'vue'
const  instance = getCurrentInstance()  
instance?.proxy?.$Loading.show()
setTimeout(()=>{
  instance?.proxy?.$Loading.hide()
},5000)
 
 
// console.log(instance)
</script>
<style>
*{
  padding: 0;
  margin: 0;
}
</style>
```

#### Vue use 源码手写

```ts
import type { App } from 'vue'
import { app } from './main'
 
interface Use {
    install: (app: App, ...options: any[]) => void
}
 
const installedList = new Set()
 
export function MyUse<T extends Use>(plugin: T, ...options: any[]) {
    if(installedList.has(plugin)){
      return console.warn('重复添加插件',plugin)
    }else{
        plugin.install(app, ...options)
        installedList.add(plugin)
    }
}
```



### 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

### 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

- 这里把当前组件html结构移动到body位置，不会在组件位置显示

  ```vue
  <teleport to="body">
    <div v-if="isShow" class="mask">
      <div class="dialog">
        <h3>我是一个弹窗</h3>
        <button @click="isShow = false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
  ```

  ```css
  .mask {
    /* 遮罩层铺满窗口 */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 300px;
    height: 300px;
    background-color: green;
  }
  ```

### 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'	//静态引入
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
                <!-- 本应加载的 -->
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<!-- 本应加载的没有加载,这时就加载这个 -->
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

  - 另外，若 `Child` 组件的 `setup` 函数返回一个 Promise 对象，也能渲染 `fallback` 里的内容：

    ```js
    async setup() {
      let sum = ref(0)
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({sum})
        }, 3000)
      })
    }
    ```

### 4.keep-alive

内置组件keep-alive
有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到keep-alive组件。

开启keep-alive 生命周期的变化

初次进入时： onMounted > onActivated
退出后触发 onDeactivated
再次进入：
只会触发 onActivated
事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

```vue
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

include 和 exclude

```vue
 <keep-alive :include="" :exclude="" :max=""></keep-alive>
```

include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

max

```vue
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

### 5.transition动画组件

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡:

- 条件渲染 (使用 v-if)

- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

自定义 transition 过度效果，你需要对transition组件的name属性自定义。并在css中写入对应的样式

#### 1.过渡的类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. #过渡 class
   在进入/离开的过渡中，会有 6 个 class 切换。
2. v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

3. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

4. v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

5. v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

6. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
7. v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

如下

       <button @click='flag = !flag'>切换</button>
       <transition name='fade'>
         <div v-if='flag' class="box"></div>
       </transition>
```css
//开始过度
.fade-enter-from{
   background:red;
   width:0px;
   height:0px;
   transform:rotate(360deg)
}
//开始过度了
.fade-enter-active{
  transition: all 2.5s linear;
}
//过度完成
.fade-enter-to{
   background:yellow;
   width:200px;
   height:200px;
}
//离开的过度
.fade-leave-from{
  width:200px;
  height:200px;
  transform:rotate(360deg)
}
//离开中过度
.fade-leave-active{
  transition: all 1s linear;
}
//离开完成
.fade-leave-to{
  width:0px;
   height:0px;
}
```

#### 2.自定义过渡 class 类名

trasnsition props

- enter-from-class

- enter-active-class
- enter-to-class
- leave-from-class
- leave-active-class
- leave-to-class

自定义过度时间 单位毫秒

你也可以分别指定进入和离开的持续时间：

```
<transition :duration="1000">...</transition>


<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```


通过自定义class 结合css动画库animate css

安装库 npm install animate.css

引入 import 'animate.css'

使用方法

官方文档 Animate.css | A cross-browser library of CSS animations.

        <transition
            leave-active-class="animate__animated animate__bounceInLeft"
            enter-active-class="animate__animated animate__bounceInRight"
        >
            <div v-if="flag" class="box"></div>
        </transition>
#### 3.transition 生命周期8个

```ts
@before-enter="beforeEnter" //对应enter-from
@enter="enter"//对应enter-active
@after-enter="afterEnter"//对应enter-to
@enter-cancelled="enterCancelled"//显示过度打断
@before-leave="beforeLeave"//对应leave-from
@leave="leave"//对应enter-active
@after-leave="afterLeave"//对应leave-to
@leave-cancelled="leaveCancelled"//离开过度打断
```

当只用 JavaScript 过渡的时候，在 enter 和 leave 钩子中必须使用 done 进行回调

结合gsap 动画库使用 GreenSock

```ts
const beforeEnter = (el: Element) => {
    console.log('进入之前from', el);
}
const Enter = (el: Element,done:Function) => {
    console.log('过度曲线');
    setTimeout(()=>{
       done()
    },3000)
}
const AfterEnter = (el: Element) => {
    console.log('to');
}
```

#### 4.appear

通过这个属性可以设置初始节点过度 就是页面加载完成就开始动画 对应三个状态

```
appear-active-class=""
appear-from-class=""
appear-to-class=""
appear
```

### 6.transition-group过度列表

> 一般配合v-for使用

- 单个节点

- 多个节点，每次只渲染一个

那么怎么同时渲染整个列表，比如使用 v-for？在这种场景下，我们会使用 <transition-group> 组件。在我们深入例子之前，先了解关于这个组件的几个特点：

- 默认情况下，它不会渲染一个包裹元素，但是你可以通过 tag attribute 指定渲染一个元素。
- 过渡模式不可用，因为我们不再相互切换特有的元素。
- 内部元素总是需要提供唯一的 key attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

```vue
<transition-group>
     <div style="margin: 10px;" :key="item" v-for="item in list">{{ item }</div>
</transition-group>
```

```ts
const list = reactive<number[]>([1, 2, 4, 5, 6, 7, 8, 9])
const Push = () => {
    list.push(123)
}
const Pop = () => {
    list.pop()
}
```

#### 2.列表的移动过渡

`<transition-group>` 组件还有一个特殊之处。除了进入和离开，它还可以为定位的改变添加动画。只需了解新增的 v-move 类就可以使用这个新功能，它会应用在元素改变定位的过程中。像之前的类名一样，它的前缀可以通过 name attribute 来自定义，也可以通过 move-class attribute 手动设置

下面代码很酷炫

```vue
<template>
    <div>
        <button @click="shuffle">Shuffle</button>
        <transition-group class="wraps" name="mmm" tag="ul">
            <li class="cell" v-for="item in items" :key="item.id">{{ item.number }}</li>
        </transition-group>
    </div>
</template>
  
<script setup  lang='ts'>
import _ from 'lodash'
import { ref } from 'vue'
let items = ref(Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
        id: index,
        number: (index % 9) + 1
    }
}))
const shuffle = () => {
    items.value = _.shuffle(items.value)
}
</script>
  
<style scoped lang="less">
.wraps {
    display: flex;
    flex-wrap: wrap;
    width: calc(25px * 10 + 9px);
    .cell {
        width: 25px;
        height: 25px;
        border: 1px solid #ccc;
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
 
.mmm-move {
    transition: transform 0.8s ease;
}
</style>
```

#### 3.状态过渡

Vue 也同样可以给数字 Svg 背景颜色等添加过度动画 今天演示数字变化

```vue
<template>
    <div>
        <input step="20" v-model="num.current" type="number" />
        <div>{{ num.tweenedNumber.toFixed(0) }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive, watch } from 'vue'
import gsap from 'gsap'
const num = reactive({
    tweenedNumber: 0,
    current:0
})
 
watch(()=>num.current, (newVal) => {
    gsap.to(num, {
        duration: 1,
        tweenedNumber: newVal
    })
})
 
</script>
    
<style>
</style>
```



## 6、其他

### 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

### 2.其他改变

- data选项应始终被声明为一个**函数**。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持`config.keyCodes`

- <strong style="color:#DD5145">移除</strong>`v-on.native`修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ...... 

### 可选链操作符	双问号表达式

```
?
a.children?.length
返回的是 undefined		不会报错

??
a.children?.length ?? []
返回的是	[]
这个只能是null和undefined，然后返回 ?? 后面的数据
```

### Scoped和样式穿透

主要是用于修改很多vue常用的组件库（element, vant, AntDesigin），虽然配好了样式但是还是需要更改其他的样式

就需要用到样式穿透

- scoped的原理


vue中的scoped 通过在DOM结构以及css样式上加唯一不重复的标记:data-v-hash的方式，以保证唯一（而这个工作是由过PostCSS转译实现的），达到样式私有化模块化的目的。

总结一下scoped三条渲染规则：

1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-123)来表示他的唯一性

2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-123]）来私有化样式
3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性

PostCSS会给一个组件中的所有dom添加了一个独一无二的动态属性data-v-xxxx，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom, 从而达到了'样式模块化'的效果.

案例修改Element ui Input样式

发现没有生效
![img](https://img-blog.csdnimg.cn/566e8a5d6e5349638615ff65771896a0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

 如果不写Scoped 就没问题

原因就是Scoped 搞的鬼 他在进行PostCss转化的时候把元素选择器默认放在了最后

![img](https://img-blog.csdnimg.cn/c896c971d3ce407989d3439101a180ad.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

 Vue 提供了样式穿透:deep() 他的作用就是用来改变 属性选择器的位置

![img](https://img-blog.csdnimg.cn/100a1402669844c2a0da76d7959c978e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

![img](https://img-blog.csdnimg.cn/185233f9afe8422fa815be3a22249e4a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

### css style

#### 1.插槽选择器

A 组件定义一个插槽

```vue
<template>
    <div>
        我是插槽
        <slot></slot>
    </div>
</template>
 
<script>
export default {}
</script>
 
<style scoped>
 
</style>
```

在App.vue 引入

```vue
<template>
    <div>
        <A>
            <div class="a">私人定制div</div>
        </A>
    </div>
</template>
 
<script setup>
import A from "@/components/A.vue"
</script>
 
 
<style lang="less" scoped>
</style>
```

在A组件修改class a 的颜色

```
<style scoped>
.a{
    color:red
}
</style>
```

默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

解决方案 slotted

```css
<style scoped>
 :slotted(.a) {
    color:red
}
</style>
```

####  2.全局选择器

在之前我们想加入全局 样式 通常都是新建一个style 标签 不加[scoped](https://so.csdn.net/so/search?q=scoped&spm=1001.2101.3001.7020) 现在有更优雅的解决方案

```vue
<style>
 div{
     color:red
 }
</style>
 
<style lang="less" scoped>
 
</style>
```

```vue
<style lang="less" scoped>
:global(div){
    color:red
}
</style>
```

效果等同于上面 

#### 3.动态 CSS

单文件组件的 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

```vue
<template>
    <div class="div">
       小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
const red = ref<string>('red')
</script>
 
<style lang="less" scoped>
.div{
   color:v-bind(red)
}
 
</style>
```

如果是对象 [v-bind](https://so.csdn.net/so/search?q=v-bind&spm=1001.2101.3001.7020) 请加引号

```vue
 <template>
    <div class="div">
        小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from "vue"
const red = ref({
    color:'pink'
})
</script>
 
    <style lang="less" scoped>
.div {
    color: v-bind('red.color');
}
</style>
```

#### 4.css module

`<style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 $style 对象的键暴露给组件

```
<template>
    <div :class="$style.red">
        小满是个弟弟
    </div>
</template>
 
<style module>
.red {
    color: red;
    font-size: 20px;
}
</style>
```

自定义注入名称（多个可以用数组）

你可以通过给 module attribute 一个值来自定义注入的类对象的 property 键

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```


与组合式 API 一同使用

注入的类可以通过 useCssModule API 在 `setup() `和 `<script setup>` 中使用。对于使用了自定义注入名称的` <style module>` 模块，useCssModule 接收一个对应的 module attribute 值作为第一个参数

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>
 
 
<script setup lang="ts">
import { useCssModule } from 'vue'
const css = useCssModule('zs')
</script>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```



## tsx

我们之前呢是使用Template去写我们模板。现在可以扩展另一种风格[TSX](https://so.csdn.net/so/search?q=TSX&spm=1001.2101.3001.7020)风格

vue2 的时候就已经支持[jsx](https://so.csdn.net/so/search?q=jsx&spm=1001.2101.3001.7020)写法，只不过不是很友好，随着vue3对typescript的支持度，tsx写法越来越被接受

### 1.安装插件

npm install @vitejs/plugin-vue-jsx -D

vite.config.ts 配置

![img](https://img-blog.csdnimg.cn/35486eb0bd1a4dabac0035384f877cbe.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()]
})
```

### 2.修改tsconfig.json 配置文件

```json
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
```

![img](https://img-blog.csdnimg.cn/e6d0ae1a4c254f13bde802f408fed4b3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

配置完成就可以使用啦

在目录新建一个xxxxxx.tsx文件

### 3.使用TSX

TIPS tsx不会自动解包使用ref加.vlaue ! ! !

#### tsx支持 v-model 的使用

```ts
 
import { ref } from 'vue'
 
let v = ref<string>('')
 
const renderDom = () => {
    return (
        <>
           <input v-model={v.value} type="text" />
           <div>
               {v.value}
           </div>
        </>
    )
}
 
export default renderDom
```

#### v-show

```ts
 
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
           <div v-show={flag.value}>景天</div>
           <div v-show={!flag.value}>雪见</div>
        </>
    )
}
 
export default renderDom
```

#### v-if是不支持的

所以需要改变风格

```ts
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
            {
                flag.value ? <div>景天</div> : <div>雪见</div>
            }
        </>
    )
}
 
export default renderDom
```

#### v-for也是不支持的

需要使用Map

```ts
import { ref } from 'vue'
 
let arr = [1,2,3,4,5]
 
const renderDom = () => {
    return (
        <>
            {
              arr.map(v=>{
                  return <div>${v}</div>
              })
            }
        </>
    )
}
 
export default renderDom
```

#### v-bind使用

直接赋值就可以

```ts
import { ref } from 'vue'
 
let arr = [1, 2, 3, 4, 5]
 
const renderDom = () => {
    return (
        <>
            <div data-arr={arr}>1</div>
        </>
    )
}
 
export default renderDom
```

#### v-on绑定事件 所有的事件都按照react风格来

- 所有事件有on开头
- 所有事件名称首字母大写

```ts
 
const renderDom = () => {
    return (
        <>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

#### Props 接受值

```ts
 
import { ref } from 'vue'
 
type Props = {
    title:string
}
 
const renderDom = (props:Props) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

#### Emit派发

```ts
type Props = {
    title: string
}
 
const renderDom = (props: Props,content:any) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap.bind(this,content)}>点击</button>
        </>
    )
}
 
const clickTap = (ctx:any) => {
 
    ctx.emit('on-click',1)
}
```

#### Slot

```ts
const A = (props, { slots }) => (
  <>
    <h1>{ slots.default ? slots.default() : 'foo' }</h1>
    <h2>{ slots.bar?.() }</h2>
  </>
);
 
const App = {
  setup() {
    const slots = {
      bar: () => <span>B</span>,
    };
    return () => (
      <A v-slots={slots}>
        <div>A</div>
      </A>
    );
  },
};
 
// or
 
const App = {
  setup() {
    const slots = {
      default: () => <div>A</div>,
      bar: () => <span>B</span>,
    };
    return () => <A v-slots={slots} />;
  },
};
 
// or you can use object slots when `enableObjectSlots` is not false.
const App = {
  setup() {
    return () => (
      <>
        <A>
          {{
            default: () => <div>A</div>,
            bar: () => <span>B</span>,
          }}
        </A>
        <B>{() => "foo"}</B>
      </>
    );
  },
};
```

## Event Loop 和 nextTick

### JS 执行机制

在我们学js 的时候都知道js 是单线程的如果是多线程的话会引发一个问题在同一时间同时操作DOM 一个增加一个删除JS就不知道到底要干嘛了，所以这个语言是单线程的但是随着HTML5到来js也支持了多线程webWorker 但是也是不允许操作DOM

单线程就意味着所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行，如果前面的任务耗时过长，后面的任务就需要一直等，一些从用户角度上不需要等待的任务就会一直等待，这个从体验角度上来讲是不可接受的，所以JS中就出现了异步的概念。

### 同步任务

代码从上到下按顺序执行

### 异步任务

#### 1.宏任务

script(整体代码)、setTimeout、setInterval、UI交互事件、postMessage、Ajax

#### 2.微任务

Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

#### 运行机制

所有的同步任务都是在主进程执行的形成一个执行栈，主线程之外，还存在一个"任务队列"，异步任务执行队列中先执行宏任务，然后清空当次宏任务中的所有微任务，然后进行下一个tick如此形成循环。

nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。

```vue
<template>
   <div ref="xiaoman">
      {{ text }}
   </div>
   <button @click="change">change div</button>
</template>
   
<script setup lang='ts'>
import { ref,nextTick } from 'vue';
 
const text = ref('小满开飞机')
const xiaoman = ref<HTMLElement>()
 
const change = async () => {
   text.value = '小满不开飞机'
   console.log(xiaoman.value?.innerText) //小满开飞机
   await nextTick();
   console.log(xiaoman.value?.innerText) //小满不开飞机
}
 
 
</script>
 
 
<style  scoped>
</style>
```

nextTick 接受一个参数fn（函数）定义了一个变量P 这个P最终返回都是Promise，最后是return 如果传了fn 就使用变量P.then执行一个微任务去执行fn函数，then里面this 如果有值就调用bind改变this指向返回新的函数，否则直接调用fn，如果没传fn，就返回一个promise，最终结果都会返回一个promise

在我们之前讲过的ref源码中有一段 triggerRefValue  他会去调用 triggerEffects

```ts
export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
  ref = toRaw(ref)
  if (ref.dep) {
    if (__DEV__) {
      triggerEffects(ref.dep, {
        target: ref,
        type: TriggerOpTypes.SET,
        key: 'value',
        newValue: newVal
      })
    } else {
      triggerEffects(ref.dep)
    }
  }
}
```

```ts
export function triggerEffects(
  dep: Dep | ReactiveEffect[],
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  // spread into array for stabilization
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (__DEV__ && effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
      }
      //当响应式对象发生改变后，执行 effect 如果有 scheduler 这个参数，会执行这个 scheduler 函数
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  }
}
```

那么scheduler 这个函数从哪儿来的 我们看这个类 ReactiveEffect

```ts
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined
 
  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean
 
  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void
 
  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null, //我在这儿 
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }
```

那么scheduler 这个函数从哪儿来的 我们看这个类 ReactiveEffect

```ts
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined
 
  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean
 
  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void
 
  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null, //我在这儿 
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }
```

scheduler 作为一个参数传进来的

```ts
   const effect = (instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(instance.update),
      instance.scope // track it in component's effect scope
    ))
```

他是在初始化 effect 通过 queueJob 传进来的

```ts
//queueJob 维护job列队，有去重逻辑，保证任务的唯一性，每次调用去执行，被调用的时候去重，每次调用去执行 queueFlush
export function queueJob(job: SchedulerJob) {
  // 判断条件：主任务队列为空 或者 有正在执行的任务且没有在主任务队列中  && job 不能和当前正在执行任务及后面待执行任务相同
  // 重复数据删除：
  // - 使用Array.includes(Obj, startIndex) 的 起始索引参数：startIndex
  // - startIndex默认为包含当前正在运行job的index，此时，它不能再次递归触发自身
  // - 如果job是一个watch()回调函数或者当前job允许递归触发，则搜索索引将+1，以允许他递归触发自身-用户需要确保回调函数不会死循环
  if (
    (!queue.length ||
      !queue.includes(
        job,
        isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
      )) &&
    job !== currentPreFlushParentJob
  ) {
    if (job.id == null) {
      queue.push(job)
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job)
    }
    queueFlush()
  }
}

 queueJob 维护job列队 并且调用  queueFlush

function queueFlush() {
  // 避免重复调用flushJobs
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
     //开启异步任务处理flushJobs
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}
```

queueFlush 给每一个队列创建了微任务

### 如何去理解Tick

> vue更新dom是异步的，数据更新是同步的
>
> 当我们操作dom的时候发现数据获取的是上次的，就需要使用nextTick

例如我们显示器是60FPS

那浏览器绘制一帧就是1000 / 60  ≈ 16.6ms

那浏览器这一帧率做了什么

1.处理用户的事件，就是event 例如 click，input change 等。

2.执行定时器任务

3.执行 requestAnimationFrame 动画

4.执行dom 的回流与重绘

5.计算更新图层的绘制指令

6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback

所以 一个Tick 就是去做了这些事

```vue
<template>
  <div ref="box" class="wraps">
    <div>
      <div class="item" v-for="item in chatList">
        <div>{{ item.name }}:</div>
        <div>{{ item.message }}</div>
      </div>
    </div>
  </div>
  <div class="ipt">
    <div>
      <textarea v-model="ipt" type="text" />
    </div>
    <div>
      <button @click="send">send</button>
    </div>
  </div>
<HelloWorld></HelloWorld>
</template>
 
<script setup lang='ts'>
import { reactive,ref,nextTick,getCurrentInstance, watch } from 'vue'
import HelloWorld from './components/HelloWorld.vue';
// let instance = getCurrentInstance()
// console.log(instance);
let current = ref(0)
watch(current,(newVal,oldVal)=>{
  console.log(newVal);
})
//next Tick
//60FPS 1000/60 = 16.7ms
// 1.处理用户的事件，就是event 例如 click，input change 等。
 
// 2.执行定时器任务
 
// 3.执行 requestAnimationFrame
 
// 4.执行dom 的回流与重绘
 
// 5.计算更新图层的绘制指令
 
// 6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback
 
// for (let i =0;i<1000;i++) {
//   current.value = i
// }
 
let chatList = reactive([
  { name: '张三', message: "xxxxxxxxx" },
])
let box = ref<HTMLDivElement>()
let ipt = ref('')
//Vue 更新dom是异步的 数据更新是同步
//我们本次执行的代码是同步代码
//当我们操作dom 的时候发现数据读取的是上次的 就需要使用nextIick
const send = async () => {
  chatList.push({
     name:"小满",
     message:ipt.value
  })
  //1.回调函数模式
  //2.async await 写法
  await nextTick()
  box.value!.scrollTop = 99999999
 
  //ipt.value = ''
}
</script>
 
<style scoped lang='less'>
.wraps {
  margin: 10px auto;
  width: 500px;
  height: 400px;
  overflow: auto;
  overflow-x: hidden;
  background: #fff;
  border: 1px solid #ccc;
 
  .item {
    width: 100%;
    height: 50px;
    background: #ccc;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #fff;
  }
}
 
.ipt {
  margin: 10px auto;
  width: 500px;
  height: 40px;
  background: #fff;
  border: 1px solid #ccc;
 
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  button {
    width: 100px;
    margin: 10px 0;
    float: right;
  }
}
</style>
```

## vue开发移动&打包APP

## unocss原子化

什么是css原子化？
CSS原子化的优缺点

1.减少了css体积，提高了css复用

2.减少起名的复杂度                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

3.增加了记忆成本 将css拆分为原子之后，你势必要记住一些class才能书写，哪怕tailwindcss提供了完善的工具链，你写background，也要记住开头是bg


## 常见库

- lodash
- gsap
- Mitt --- Bus
- unplugin-auto-import --- 自动引入ref之类的
- vueuse
- Tailwind CSS
