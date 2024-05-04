---
title: a
date: 2024-02-20 21:42:38
tags: [前端, 后端]
summary: 前端学习
category: [技术, 风险]
update: 2024-02-20 21:42:38
image: https://xiehongchen.github.io/img/preview.jpg
---

[尚硅谷Vue2+3](https://www.bilibili.com/video/BV1Zy4y1K7SH/)



# Vue核心

## vue简介

- 一套用于构建用户界面的**渐进式**JavaScript框架

![image-20221107092117653](./image/image-20221107092117653.png)

### vue的特点

- 采用组件化模式，提高代码复用率，且让代码更好维护
- 声明式编码，让编码人员无需直接操作DOM，提高开发效率

![image-20221107092559052](./image/image-20221107092559052.png)

- 使用虚拟DOM+优秀的Diff算法，尽量复用DOM节点

### 与其他JS框架的关联

- 借鉴 Angular 的模板和数据绑定技术
- 借鉴 React 的组件化和虚拟 DOM 技术

### 周边库

- vue-cli: vue 脚手架
- 6=6
- 88/ue-resource
- axios 
- vue-router: 路由 67
- vuex: 状态管理 
- element-ui: 基于 vue 的 UI 组件库(PC 端）

## 初体验Vue

- 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
- root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
- root容器里的代码被称为【Vue模板】；
- **Vue实例和容器是一一对应的**；
- 真实开发中只有一个Vue实例，并且会配合着组件一起使用；
- {{xxx}}中的xxx要写**js表达式**，且xxx可以自动读取到data中的所有属性；
- 一旦data中的数据发生改变，那么**页面**中用到该数据的地方也会自动更新；

注意区分：**js表达式 和 js代码****(语句)**

1.表达式：**一个表达式会产生一个值**，可以放在任何一个需要值的地方：

- (1)。 a
- (2)。 a+b
- (3)。 demo(1)
- (4)。 x === y ? 'a' : 'b'

2.js代码(语句)

- (1)。 if(){}
- (2)。 for(){}        

```html
<body>
    <!-- 准备好一个容器 -->
    <div id="demo">
        <h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
    </div>

    <script type="text/javascript" >
        Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

        //创建Vue实例
        new Vue({
            el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
            data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
                name:'atguigu',
                address:'广州'
            }
        })
    </script>
</body>
```

## 模板语法

Vue模板语法有2大类：

### 1、插值语法

- 功能：用于解析标签体内容
- 写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

### 2、指令语法

- 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）
- *举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性
- **v-bind 可以简写为 ：**
- 备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子

```html
<body>
    <!-- 准备好一个容器-->
    <div id="root">
        <h1>插值语法</h1>
        <h3>你好，{{name}}</h3>
        <hr/>
        <h1>指令语法</h1>
        <!-- 大写-->
        <a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
        <a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
    </div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'jack',
            school:{
                name:'尚硅谷',
                url:'http://www.atguigu.com',
            }
        }
    })
</script>
```

## 数据绑定

Vue中有2种数据绑定的方式：

### 1、单向绑定(v-bind)

- 语法：`v-bind:href ="xxx"` 或简写为 `:hre = "xxx"`

- 数据只能从data流向页面

### 2、双向绑定(v-model)

- 语法：`v-mode:value="xxx"` 或简写为 `v-model="xxx"`

- 数据不仅能从data流向页面，还可以从页面流向data
- `v-model`只能应用在**表单类元素（输入类元素）**

```html
<body>
    <!-- 准备好一个容器-->
    <div id="root">
        <!-- 普通写法 -->
        <!-- 单向数据绑定：<input type="text" v-bind:value="name"><br/>
        双向数据绑定：<input type="text" v-model:value="name"><br/> -->

        <!-- 简写 -->
        单向数据绑定：<input type="text" :value="name"><br/>
        双向数据绑定：<input type="text" v-model="name"><br/>

        <!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
        <!-- <h2 v-model:x="name">你好啊</h2> -->
    </div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'尚硅谷'
        }
    })
</script>
```

### data与el的2种写法

#### 1、el有2种写法

(1)。new Vue时候配置el属性。

(2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值

#### 2、data有2种写法

(1).对象式

(2).函数式	后面学到组件时，必须使用函数式

> 重要的原则：由Vue管理的函数，一定不要写**箭头函数**，一旦写了箭头函数，this就不再是Vue实例了。

```html
<script type="text/javascript">
    //el的两种写法
    /* const v = new Vue({
        //el:'#root', //第一种写法
        data:{
            name:'尚硅谷'
        }
    })
    console.log(v)
    v.$mount('#root') //第二种写法 */

    //data的两种写法
    new Vue({
        el:'#root',
        //data的第一种写法：对象式
        /* data:{
            name:'尚硅谷'
        } */

        //data的第二种写法：函数式
        data(){
            console.log('@@@',this) //此处的this是Vue实例对象
            return{
                name:'尚硅谷'
            }
        }
    })
</script>
```
