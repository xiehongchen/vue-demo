

# JS

## 数据类型

**面试官：JS的数据类型都有哪些**⭐⭐⭐⭐⭐

**答：**
数据类型分为**基本数据类型**和**引用数据类型**；

基本数据类型有：

- Number
- String
- Boolean
- null
- Undefined
- Symbol
- BigInt

[引用数据类型](https://so.csdn.net/so/search?q=引用数据类型&spm=1001.2101.3001.7020)统称为Object类型，细分的话有：

- 统称为Object类型
  - 细分的话：
    - Object
    - Array
    - Function
    - Date
    - RegExp

**基本数据类型的数据直接存储在栈中**；而**引用数据类型的数据存储在堆中，在栈中保存数据的引用地址**，这个引用地址指向的是对应的数据，以便快速查找到[堆内存](https://so.csdn.net/so/search?q=堆内存&spm=1001.2101.3001.7020)中的对象。

顺便提一句，**栈内存是自动分配内存的**。而**堆内存是动态分配内存的，不会自动释放**。所以每次使用完对象的时候都要把它设置为null，从而减少无用内存的消耗



**为什么0.1+0.2>0.3** ⭐⭐⭐⭐

**答：**

因为在JS底层中，每个变量是以二进制表示，固定长度为64位，其中第1位是符号位，再往后11位是指数位，最后52表示的是尾数位，而**0.1和0.2转为二进制的时候是无限循环小数，所以JS就会进行截取，截取以后0.1和0.2就不是他们本身了**，要比原来大那么一丢丢，所以0.1+0.2就>0.3了

**如何解决这个问题，使0.1+0.2等于0.3？** ⭐⭐⭐⭐⭐
**答1：**
先给他们**放大倍数**，随后在**除以相应倍数**

```javascript
const a = 0.1;
const b = 0.2;

console.log(a + b === 0.3)   // false
console.log((a * 1000 + b * 1000) / 1000 === 0.3)  // true
12345
```

**答2：**

设置一个误差范围值，是es6中的`Number.EPSILON`，根据规格，它表示1与大于1的最小浮点数之间的差

`Number.EPSILON`实际尚是js能够表示的最小精度，误差小于这个值，就可以认为已经没有意义了，即不存在误差

```javascript
Math.abs(0.1+0.2-0.3) < Number.EPSILON
```



**数据类型的判断方式**⭐⭐⭐⭐⭐

**答：**
1.`typeof`

- 缺点：`typeof null`的值为`Object`，无法分辨是`null`还是`Object`

2.`instanceof`

- 缺点：只能判断某对象是否存在于目标对象得的原型链上

3.`constructor`
4.`Object.prototype.toString.call()`

- 一种最好的基本类型检测方式 `Object.prototype.toString.call()` ;它可以区分 null 、 string 、

  boolean 、 number 、 undefined 、 array 、 function 、 object 、 date 、 math 数据类型。

- 缺点：不能细分为谁谁的实例

```javascript
    // -----------------------------------typeof
    typeof undefined // 'undefined' 
    typeof '10' // 'String' 
    typeof 10 // 'Number' 
    typeof false // 'Boolean' 
    typeof Symbol() // 'Symbol' 
    typeof Function // ‘function' 
    typeof null // ‘Object’ 
    typeof [] // 'Object' 
    typeof {} // 'Object'


    // -----------------------------------------instanceof
    function Foo() { }
    var f1 = new Foo();
    var d = new Number(1)


    console.log(f1 instanceof Foo);// true
    console.log(d instanceof Number); //true
    console.log(123 instanceof Number); //false   -->不能判断字面量的基本数据类型


    // -----------------------------------------constructor
    var d = new Number(1)
    var e = 1
    function fn() {
      console.log("ming");
    }
    var date = new Date();
    var arr = [1, 2, 3];
    var reg = /[hbc]at/gi;

    console.log(e.constructor);//ƒ Number() { [native code] }
    console.log(e.constructor.name);//Number
    console.log(fn.constructor.name) // Function 
    console.log(date.constructor.name)// Date 
    console.log(arr.constructor.name) // Array 
    console.log(reg.constructor.name) // RegExp




    //-----------------------------------------Object.prototype.toString.call()
    console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]" 
    console.log(Object.prototype.toString.call(null)); // "[object Null]" 
    console.log(Object.prototype.toString.call(123)); // "[object Number]" 
    console.log(Object.prototype.toString.call("abc")); // "[object String]" 
    console.log(Object.prototype.toString.call(true)); // "[object Boolean]" 


    function fn() {
      console.log("ming");
    }
    var date = new Date();
    var arr = [1, 2, 3];
    var reg = /[hbc]at/gi;
    console.log(Object.prototype.toString.call(fn));// "[object Function]" 
    console.log(Object.prototype.toString.call(date));// "[object Date]" 
    console.log(Object.prototype.toString.call(arr)); // "[object Array]"
    console.log(Object.prototype.toString.call(reg));// "[object RegExp]"
12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455565758596061
```

**为什么要用`Object.prototype.toString.call()`，为什么不用 `Array.prototype.toString.call()`?**⭐⭐
**答：**
因为只有`Object.prototype.toString.call()`返回的是统一格式，而且 `Array.prototype.toString.call()`的部分类型无法检验。

```javascript
    function fn() {
      console.log("ming");
    }
    var date = new Date();
    var arr = [1, 2, 3];
    var reg = /[hbc]at/gi;

    console.log(Array.prototype.toString.call(undefined)); // 报错
    console.log(Array.prototype.toString.call(null)); // 报错
    console.log(Array.prototype.toString.call(123)); // "[object Number]" 
    console.log(Array.prototype.toString.call("abc")); // "[object String]" 
    console.log(Array.prototype.toString.call(true)); // "[object Boolean]" 
    console.log(Array.prototype.toString.call(fn)); // "[object Function]" 
    console.log(Array.prototype.toString.call(date)); // "[object Date]" 
    console.log(Array.prototype.toString.call(arr)); // "1,2,3"
    console.log(Array.prototype.toString.call(reg));// "[object RegExp]"
12345678910111213141516
```



**instanceof原理**⭐⭐⭐⭐⭐

- instanceof原理实际上就是查找目标对象的原型链

```javascript
    function myInstance(L, R) {//L代表instanceof左边，R代表右边
      var RP = R.prototype
      var LP = L.__proto__
      while (true) {
        if(LP == null) {
          return false
        }
        if(LP == RP) {
          return true
        }
        LP = LP.__proto__
      }
    }
    console.log(myInstance({},Object)); 
1234567891011121314
```



**面试官：为什么typeof null 是Object?**⭐⭐⭐⭐⭐
**答：**

因为在JavaScript中，不同的对象都是使用二进制存储的，如果二进制前三位都是0的话，系统会判断为是Object类型，而null的二进制全是0，自然也就判断为Object

这个bug是初版本的JavaScript中留下的，扩展一下其他五种标识位:

- 000 对象
- 1 整型
- 010 双精度类型
- 100字符串
- 110布尔类型



**面试官：`==`和`===`有什么区别** ⭐⭐⭐⭐⭐

**答：**

`===`是严格意义上的相等，会比较两边的数据类型和值大小

- 数据类型不同返回false
- 数据类型相同，但值大小不同，返回false

`==`是非严格意义上的相等，

- 两边类型相同，比较大小
- 两边类型不同，根据下方表格，再进一步进行比较。
  - Null == Undefined ->true
  - String == Number ->先将String转为Number，在比较大小
  - Boolean == Number ->现将Boolean转为Number，在进行比较
  - Object == String，Number，Symbol -> Object 转化为原始类型

**面试官：`NaN === NaN`返回什么？**⭐⭐⭐⭐⭐

返回 `false`，`NaN`永远不等于`NaN`，判断是否为`NaN`用一个函数 `isNaN`来判断；

`isNaN`传入的如果是其他数据类型，那么现将它使用`Number()`转为数字类型在进行判断



**面试官：手写call、apply、bind**⭐⭐⭐⭐⭐

**答：**

- call和apply实现思路主要是：
  - 判断是否是函数调用，若非函数调用抛异常
  - 通过新对象（context）来调用函数
    - 给context创建一个`fn`设置为需要调用的函数
    - 结束调用完之后删除`fn`
- bind实现思路
  - 判断是否是函数调用，若非函数调用抛异常
  - 返回函数
    - 判断函数的调用方式，是否是被new出来的
      - new出来的话返回空对象，但是实例的`__proto__`指向`_this`的`prototype`
  - 完成函数柯里化
    - `Array.prototype.slice.call()`

call:

```js
    Function.prototype.myCall = function (context) {
      // 先判断调用myCall是不是一个函数
      // 这里的this就是调用myCall的
      if (typeof this !== 'function') {
        throw new TypeError("Not a Function")
      }

      // 不传参数默认为window
      context = context || window

      // 保存this
      context.fn = this

      // 保存参数
      let args = Array.from(arguments).slice(1)   //Array.from 把伪数组对象转为数组

      // 调用函数
      let result = context.fn(...args)

      delete context.fn

      return result

    }
123456789101112131415161718192021222324
apply
Function.prototype.myApply = function (context) {
      // 判断this是不是函数
      if (typeof this !== "function") {
        throw new TypeError("Not a Function")
      }

      let result

      // 默认是window
      context = context || window

      // 保存this
      context.fn = this

      // 是否传参
      if (arguments[1]) {
        result = context.fn(...arguments[1])
      } else {
        result = context.fn()
      }
      delete context.fn

      return result
    }

12345678910111213141516171819202122232425
bind
    Function.prototype.myBind = function(context){
      // 判断是否是一个函数
      if(typeof this !== "function") {
        throw new TypeError("Not a Function")
      }
      // 保存调用bind的函数
      const _this = this 
      // 保存参数
      const args = Array.prototype.slice.call(arguments,1)
      // 返回一个函数
      return function F () {
        // 判断是不是new出来的
        if(this instanceof F) {
          // 如果是new出来的
          // 返回一个空对象，且使创建出来的实例的__proto__指向_this的prototype，且完成函数柯里化
          return new _this(...args,...arguments)
        }else{
          // 如果不是new出来的改变this指向，且完成函数柯里化
          return _this.apply(context,args.concat(...arguments))
        }
      } 
    }
12345678910111213141516171819202122
```



**面试官：字面量创建对象和new创建对象有什么区别，new内部都实现了什么，手写一个new**⭐⭐⭐⭐⭐

**答：**

字面量：

- 字面量创建对象更简单，方便阅读
- 不需要作用域解析，速度更快

new内部：

- 创建一个新对象
- 使新对象的`__proto__`指向原函数的`prototype`
- 改变this指向（指向新的obj）并执行该函数，执行结果保存起来作为result
- 判断执行函数的结果是不是null或Undefined，如果是则返回之前的新对象，如果不是则返回result

手写new

```js
    // 手写一个new
    function myNew(fn, ...args) {
      // 创建一个空对象
      let obj = {}
      // 使空对象的隐式原型指向原函数的显式原型
      obj.__proto__ = fn.prototype
      // this指向obj
      let result = fn.apply(obj, args)
      // 返回
      return result instanceof Object ? result : obj
    }
1234567891011
```





## 执行栈和执行上下文

**面试官：什么是作用域，什么是作用域链？**⭐⭐⭐⭐

**答：**

- 规定变量和函数的可使用范围称作作用域
- 每个函数都有一个作用域链，查找变量或者函数时，需要从局部作用域到全局作用域依次查找，这些作用域的集合称作作用域链。

**面试官：什么是执行栈，什么是执行上下文？**⭐⭐⭐⭐

**答：**

执行上下文分为：

- 全局执行上下文
  - 创建一个全局的window对象，并规定this指向window，执行js的时候就压入栈底，关闭浏览器的时候才弹出
- 函数执行上下文
  - 每次函数调用时，都会新创建一个函数执行上下文
  - 执行上下文分为创建阶段和执行阶段
    - 创建阶段：函数环境会创建变量对象：arguments对象（并赋值）、函数声明（并赋值）、变量声明（不赋值），函数表达式声明（不赋值）；会确定this指向；会确定作用域
    - 执行阶段：变量赋值、函数表达式赋值，使变量对象编程活跃对象
- eval执行上下文

执行栈：

- 首先栈特点：先进后出
- 当进入一个执行环境，就会创建出它的执行上下文，然后进行压栈，当程序执行完成时，它的执行上下文就会被销毁，进行弹栈。
- 栈底永远是全局环境的执行上下文，栈顶永远是正在执行函数的执行上下文
- 只有浏览器关闭的时候全局执行上下文才会弹出



## 闭包

> 很多人都吃不透js闭包，这里推荐一篇文章：[彻底理解js中的闭包](https://blog.csdn.net/dovlie/article/details/76339244)

**面试官：什么是闭包？闭包的作用？闭包的应用？**⭐⭐⭐⭐⭐

**答：**

函数执行，形成私有的执行上下文，使内部私有变量不受外界干扰，起到**保护**和**保存**的作用

作用：

- 保护
  - 避免命名冲突
- 保存
  - 解决循环绑定引发的索引问题
- 变量不会销毁
  - 可以使用函数内部的变量，使变量不会被垃圾回收机制回收

应用：

- 设计模式中的单例模式
- for循环中的保留i的操作
- 防抖和节流
- 函数柯里化

缺点

- 会出现内存泄漏的问题



## 原型和原型链

**面试官：什么是原型？什么是原型链？如何理解**⭐⭐⭐⭐⭐

**答：**

**原型：** 原型分为隐式原型和显式原型，每个对象都有一个隐式原型，它指向自己的构造函数的显式原型。每个构造方法都有一个显式原型。

- `__proto__`是隐式原型；`prototype`是显式原型
- 所有实例的`__proto__`都指向他们构造函数的`prototype`
- 所有的`prototype`都是对象，自然它的`__proto__`指向的是`Object()`的`prototype`
- 所有的构造函数的隐式原型指向的都是`Function()`的显示原型
- Object的隐式原型是null

**原型链：** 多个`__proto__`组成的集合成为原型链（概念类似于作用域链）

- `instanceof` 就是判断某对象是否位于某构造方法的原型链上。

## 继承

**面试官：说一说 JS 中的常用的继承方式有哪些？以及各个继承方式的优缺点。**⭐⭐⭐⭐⭐

**答：**

原型继承、组合继承、寄生组合继承、ES6的extend

原型继承

```js
    // ----------------------方法一：原型继承
    // 原型继承
    // 把父类的实例作为子类的原型
    // 缺点：子类的实例共享了父类构造函数的引用属性   不能传参

    var person = {
      friends: ["a", "b", "c", "d"]
    }

    var p1 = Object.create(person)

    p1.friends.push("aaa")//缺点：子类的实例共享了父类构造函数的引用属性

    console.log(p1);
    console.log(person);//缺点：子类的实例共享了父类构造函数的引用属性

12345678910111213141516
```

组合继承

```js
    // ----------------------方法二：组合继承
    // 在子函数中运行父函数，但是要利用call把this改变一下，
    // 再在子函数的prototype里面new Father() ,使Father的原型中的方法也得到继承，最后改变Son的原型中的constructor

    // 缺点：调用了两次父类的构造函数，造成了不必要的消耗，父类方法可以复用
    // 优点可传参，不共享父类引用属性
    function Father(name) {
      this.name = name
      this.hobby = ["篮球", "足球", "乒乓球"]
    }

    Father.prototype.getName = function () {
      console.log(this.name);
    }

    function Son(name, age) {
      Father.call(this, name)
      this.age = age
    }

    Son.prototype = new Father()
    Son.prototype.constructor = Son


    var s = new Son("ming", 20)

    console.log(s);
123456789101112131415161718192021222324252627
```

寄生组合继承

```js
    // ----------------------方法三：寄生组合继承
    function Father(name) {
      this.name = name
      this.hobby = ["篮球", "足球", "乒乓球"]
    }

    Father.prototype.getName = function () {
      console.log(this.name);
    }

    function Son(name, age) {
      Father.call(this, name)
      this.age = age
    }

    Son.prototype = Object.create(Father.prototype)
    Son.prototype.constructor = Son

    var s2 = new Son("ming", 18)
    console.log(s2);
1234567891011121314151617181920
```

extend

```js
    // ----------------------方法四：ES6的extend（寄生组合继承的语法糖）
    //     子类只要继承父类，可以不写 constructor ，一旦写了，则在 constructor 中的第一句话
    // 必须是 super 。

    class Son3 extends Father { // Son.prototype.__proto__ = Father.prototype
      constructor(y) {
        super(200)  // super(200) => Father.call(this,200)
        this.y = y
      }
    }
12345678910
```





## 内存泄露、垃圾回收机制

**面试官：什么是内存泄漏**⭐⭐⭐⭐⭐

**答：**

内存泄露是指不再用的内存没有被及时释放出来，导致该段内存无法被使用就是内存泄漏

**面试官：为什么会导致的内存泄漏**⭐⭐⭐⭐⭐

**答：**

内存泄漏指我们无法在通过js访问某个对象，而垃圾回收机制却认为该对象还在被引用，因此垃圾回收机制不会释放该对象，导致该块内存永远无法释放，积少成多，系统会越来越卡以至于崩溃

**面试官：垃圾回收机制都有哪些策略？**⭐⭐⭐⭐⭐

**答：**

- 标记清除法
  - 垃圾回收机制获取根并标记他们，然后访问并标记所有来自它们的引用，然后在访问这些对象并标记它们的引用…如此递进结束后若发现有没有标记的（不可达的）进行删除，进入执行环境的不能进行删除
- 引用计数法
  - 当声明一个变量并给该变量赋值一个引用类型的值时候，该值的计数+1，当该值赋值给另一个变量的时候，该计数+1，当该值被其他值取代的时候，该计数-1，当计数变为0的时候，说明无法访问该值了，垃圾回收机制清除该对象
  - 缺点： 当两个对象循环引用的时候，引用计数无计可施。如果循环引用多次执行的话，会造成崩溃等问题。所以后来被标记清除法取代。

## 深拷贝和浅拷贝

**手写浅拷贝深拷贝**⭐⭐⭐⭐⭐

```js
    // ----------------------------------------------浅拷贝
    // 只是把对象的属性和属性值拷贝到另一个对象中
    var obj1 = {
      a: {
        a1: { a2: 1 },
        a10: { a11: 123, a111: { a1111: 123123 } }
      },
      b: 123,
      c: "123"
    }
    // 方式1
    function shallowClone1(o) {
      let obj = {}

      for (let i in o) {
        obj[i] = o[i]
      }
      return obj
    }

    // 方式2
    var shallowObj2 = { ...obj1 }

    // 方式3
    var shallowObj3 = Object.assign({}, obj1)

    let shallowObj = shallowClone1(obj1);

    shallowObj.a.a1 = 999
    shallowObj.b = true

    console.log(obj1);  //第一层的没有被改变，一层以下就被改变了



    // ----------------------------------------------深拷贝

    // 简易版  
    function deepClone(o) {
      let obj = {}
      for (var i in o) {
        // if(o.hasOwnProperty(i)){
        if (typeof o[i] === "object") {
          obj[i] = deepClone(o[i])
        } else {
          obj[i] = o[i]
        }
        // }
      }
      return obj
    }


    var myObj = {
      a: {
        a1: { a2: 1 },
        a10: { a11: 123, a111: { a1111: 123123 } }
      },
      b: 123,
      c: "123"
    }

    var deepObj1 = deepClone(myObj)
    deepObj1.a.a1 = 999
    deepObj1.b = false
    console.log(myObj);



    // 简易版存在的问题：参数没有做检验，传入的可能是 Array、null、regExp、Date
    function deepClone2(o) {
      if (Object.prototype.toString.call(o) === "[object Object]") {  //检测是否为对象
        let obj = {}
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            if (typeof o[i] === "object") {
              obj[i] = deepClone(o[i])
            } else {
              obj[i] = o[i]
            }
          }
        }
        return obj
      } else {
        return o
      }
    }

    function isObject(o) {
      return Object.prototype.toString.call(o) === "[object Object]" || Object.prototype.toString.call(o) === "[object Array]"
    }

    // 继续升级，没有考虑到数组，以及ES6中的map、set、weakset、weakmap
    function deepClone3(o) {
      if (isObject(o)) {//检测是否为对象或者数组
        let obj = Array.isArray(o) ? [] : {}
        for (let i in o) {
          if (isObject(o[i])) {
            obj[i] = deepClone(o[i])
          } else {
            obj[i] = o[i]
          }
        }
        return obj
      } else {
        return o
      }
    }


    // 有可能碰到循环引用问题  var a = {}; a.a = a; clone(a);//会造成一个死循环
    // 循环检测
    // 继续升级
    function deepClone4(o, hash = new map()) {
      if (!isObject(o)) return o//检测是否为对象或者数组
      if (hash.has(o)) return hash.get(o)
      let obj = Array.isArray(o) ? [] : {}

      hash.set(o, obj)
      for (let i in o) {
        if (isObject(o[i])) {
          obj[i] = deepClone4(o[i], hash)
        } else {
          obj[i] = o[i]
        }
      }
      return obj
    }

    // 递归易出现爆栈问题
    //  将递归改为循环，就不会出现爆栈问题了
    var a1 = { a: 1, b: 2, c: { c1: 3, c2: { c21: 4, c22: 5 } }, d: 'asd' };
    var b1 = { b: { c: { d: 1 } } }
    function cloneLoop(x) {
      const root = {};
      // 栈 
      const loopList = [  //->[]->[{parent:{a:1,b:2},key:c,data:{ c1: 3, c2: { c21: 4, c22: 5 } }}]
        {
          parent: root,
          key: undefined,
          data: x,
        }
      ];
      while (loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent; //{} //{a:1,b:2}
        const key = node.key; //undefined //c
        const data = node.data; //{ a: 1, b: 2, c: { c1: 3, c2: { c21: 4, c22: 5 } }, d: 'asd' }  //{ c1: 3, c2: { c21: 4, c22: 5 } }}
        // 初始化赋值目标，key 为 undefined 则拷贝到父元素，否则拷贝到子元素
        let res = parent; //{}->{a:1,b:2,d:'asd'} //{a:1,b:2}->{}
        if (typeof key !== 'undefined') {
          res = parent[key] = {};
        }
        for (let k in data) {
          if (data.hasOwnProperty(k)) {
            if (typeof data[k] === 'object') {
              // 下一次循环 
              loopList.push({
                parent: res,
                key: k,
                data: data[k],
              })
            } else {
              res[k] = data[k];
            }
          }
        }
      }
      return root
    }


    function deepClone5(o) {
      let result = {}
      let loopList = [
        {
          parent: result,
          key: undefined,
          data: o
        }
      ]

      while (loopList.length) {
        let node = loopList.pop()
        let { parent, key, data } = node
        let anoPar = parent
        if (typeof key !== 'undefined') {
          anoPar = parent[key] = {}
        }

        for (let i in data) {
          if (typeof data[i] === 'object') {
            loopList.push({
              parent: anoPar,
              key: i,
              data: data[i]
            })
          } else {
            anoPar[i] = data[i]
          }
        }
      }
      return result
    }


    let cloneA1 = deepClone5(a1)
    cloneA1.c.c2.c22 = 5555555
    console.log(a1);
    console.log(cloneA1);


    // ------------------------------------------JSON.stringify()实现深拷贝

    function cloneJson(o) {
      return JSON.parse(JSON.stringify(o))
    }

    // let obj = { a: { c: 1 }, b: {} };
    // obj.b = obj;
    // console.log(JSON.parse(JSON.stringify(obj))) // 报错 // Converting circular structure to JSON

    
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139140141142143144145146147148149150151152153154155156157158159160161162163164165166167168169170171172173174175176177178179180181182183184185186187188189190191192193194195196197198199200201202203204205206207208209210211212213214215216217218219220221222223224
```

> 深拷贝能使用hash递归的方式写出来就可以了
> 不过技多不压身，推荐还是看一看使用while实现深拷贝方法



## 单线程，同步异步

**面试官：为什么JS是单线程的？**⭐⭐⭐⭐⭐

**答：**因为JS里面有可视的Dom，如果是多线程的话，这个线程正在删除DOM节点，另一个线程正在编辑Dom节点，导致浏览器不知道该听谁的

**面试官：说说 Promise 的原理？你是如何理解 Promise 的？**⭐⭐⭐⭐⭐

- 做到简易版的promise理解，以及会写race和all函数就可以

**答：**

```js
class MyPromise2 {
      constructor(executor) {
        // 规定状态
        this.state = "pending"
        // 保存 `resolve(res)` 的res值
        this.value = undefined
        // 保存 `reject(err)` 的err值
        this.reason = undefined
        // 成功存放的数组
        this.successCB = []
        // 失败存放的数组
        this.failCB = []


        let resolve = (value) => {
          if (this.state === "pending") {
            this.state = "fulfilled"
            this.value = value
            this.successCB.forEach(f => f())
          }
        }
        let reject = (reason) => {
          if (this.state === "pending") {
            this.state = "rejected"
            this.value = value
            this.failCB.forEach(f => f())
          }
        }

        try {
          // 执行
          executor(resolve, reject)
        } catch (error) {
          // 若出错，直接调用reject
          reject(error)
        }
      }
      then(onFulfilled, onRejected) {
        if (this.state === "fulfilled") {
          onFulfilled(this.value)
        }
        if (this.state === "rejected") {
          onRejected(this.value)
        }
        if (this.state === "pending") {
          this.successCB.push(() => { onFulfilled(this.value) })
          this.failCB.push(() => { onRejected(this.reason) })
        }
      }
    }


    Promise.all = function (promises) {
      let list = []
      let count = 0
      function handle(i, data) {
        list[i] = data
        count++
        if (count == promises.length) {
          resolve(list)
        }
      }
      return Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
          promises[i].then(res => {
            handle(i, res)
          }, err => reject(err))
        }
      })
    }

     Promise.race = function (promises) {
          return Promise((resolve, reject) => {
              for (let i = 0; i < promises.length; i++) {
                  promises[i].then(res => {
                      resolve(res)
                  }, err => {
                      reject(err)
                  })
              }

          })
      }

123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384
```

**面试官：以下代码的执行顺序是什么**⭐⭐⭐⭐⭐

**答：**

```js
  async function async1() {
   console.log('async1 start')
   await async2()
   console.log('async1 end')
  }
  async function async2() {
   console.log('async2')
  }
  async1()
  console.log('script start')

//执行到await时，如果返回的不是一个promise对象，await会阻塞下面代码(当前async代码块的代码)，会先执行async外的同步代码(在这之前先看看await中函数的同步代码，先把同步代码执行完)，等待同步代码执行完之后，再回到async内部继续执行
//执行到await时，如果返回的是一个promise对象，await会阻塞下面代码(当前async代码块的代码)，会先执行async外的同步代码(在这之前先看看await中函数的同步代码，先把同步代码执行完)，等待同步代码执行完之后，再回到async内部等promise状态达到fulfill的时候再继续执行下面的代码
//所以结果为
//async1 start
//async2
//script start
//async1 end
123456789101112131415161718
```

**面试官：宏任务和微任务都有哪些**⭐⭐⭐⭐⭐

**答：**

- 宏任务：`script`、`setTimeOut`、`setInterval`、`setImmediate`
- 微任务:`promise.then`,`process.nextTick`、`Object.observe`、`MutationObserver`
- **注意：Promise是同步任务**

**面试官：宏任务和微任务都是怎样执行的**⭐⭐⭐⭐⭐

**答：**

- 执行宏任务script，
- 进入script后，所有的同步任务主线程执行
- 所有宏任务放入宏任务执行队列
- 所有微任务放入微任务执行队列
- 先清空微任务队列，
- 再取一个宏任务，执行，再清空微任务队列
- 依次循环

**例题1**

```js
setTimeout(function(){
    console.log('1')
});
new Promise(function(resolve){
    console.log('2');
    resolve();
}).then(function(){
    console.log('3')
});
console.log('4');
new Promise(function(resolve){
    console.log('5');
    resolve();
}).then(function(){
    console.log('6')
});
setTimeout(function(){
    console.log('7')
});
function bar(){
    console.log('8')
    foo()
}
function foo(){
    console.log('9')
}
console.log('10')
bar()
12345678910111213141516171819202122232425262728
```

**解析**

1. 首先浏览器执行Js代码由上至下顺序，遇到setTimeout，把setTimeout分发到宏任务Event Queue中
2. new Promise属于主线程任务直接执行打印2
3. Promis下的then方法属于微任务，把then分到微任务 Event Queue中
4. console.log(‘4’)属于主线程任务，直接执行打印4
5. 又遇到new Promise也是直接执行打印5，Promise 下到then分发到微任务Event Queue中
6. 又遇到setTimouse也是直接分发到宏任务Event Queue中，等待执行
7. console.log(‘10’)属于主线程任务直接执行
8. 遇到bar()函数调用，执行构造函数内到代码，打印8，在bar函数中调用foo函数，执行foo函数到中代码，打印9
9. 主线程中任务执行完后，就要执行分发到微任务Event Queue中代码，实行先进先出，所以依次打印3，6
10. 微任务Event Queue中代码执行完，就执行宏任务Event Queue中代码，也是先进先出，依次打印1，7。

- 最终结果：2，4，5，10，8，9，3，6，1，7

**例题2**

```js
    setTimeout(() => {
      console.log('1');
      new Promise(function (resolve, reject) {
        console.log('2');
        setTimeout(() => {
          console.log('3');
        }, 0);
        resolve();
      }).then(function () {
        console.log('4')
      })
    }, 0);
    console.log('5'); //5 7 10 8 1 2 4 6 3
    setTimeout(() => {
      console.log('6');
    }, 0);
    new Promise(function (resolve, reject) {
      console.log('7');
      // reject();
      resolve();
    }).then(function () {
      console.log('8')
    }).catch(function () {
      console.log('9')
    })
    console.log('10');
1234567891011121314151617181920212223242526
```

**运行结果： 5 7 10 8 1 2 4 6 3**

## 变量提升

**面试官：变量和函数怎么进行提升的？优先级是怎么样的？**⭐⭐⭐

**答：**

- 对所有函数声明进行提升（除了函数表达式和箭头函数），引用类型的赋值
  - 开辟堆空间
  - 存储内容
  - 将地址赋给变量
- 对变量进行提升，只声明，不赋值，值为`undefined`

**面试官：var let const 有什么区别**⭐⭐⭐⭐⭐

**答：**

- var
  - var声明的变量可进行变量提升，let和const不会
  - var可以重复声明
  - var在非函数作用域中定义是挂在到window上的
- let
  - let声明的变量只在局部起作用
  - let防止变量污染
  - 不可在声明
- const
  - 具有let的所有特征
  - 不可被改变
    - 不可改变只适用于直接地址。如果使用const声明的是对象的话，是可以修改对象内部的值的。





## 模块化

**面试官：为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？**⭐⭐⭐

- 为什么要使用模块化
  - 防止命名冲突
  - 更好的分离，按需加载
  - 更好的复用性
  - 更高的维护性



**面试官：`exports`和`module.exports`有什么区别？**⭐⭐⭐

- 导出方式不一样
  - `exports.xxx='xxx'`
  - `module.export = {}`
- `exports`是`module.exports`的引用，两个指向的是用一个地址，而require能看到的只有`module.exports`



**面试官：JS模块包装格式有哪些？**⭐⭐⭐

- commonjs
  - 同步运行，不适合前端
- `AMD`
  - 异步运行
  - 异步模块定义，主要采用异步的方式加载模块，模块的加载不影响后面代码的执行。所有依赖这个模块的语句都写在一个回调函数中，模块加载完毕，再执行回调函数
- `CMD`
  - 异步运行
  - seajs 规范

**面试官：ES6和commonjs的区别**⭐⭐⭐

**Commonjs、AMD、CMD、UMD、ESM 都有什么区别**

- Commonjs

  - 是同步执行的，不适合前端，后端 nodejs 可以使用 commonjs。

  - 使用方式

    - ```js
      module.exports = xxx
      
      require('xxx')
      123
      ```

- AMD/CMD/UMD 适用前端 异步执行

  - AMD

    - ```js
      define(["a","b","c","d","e"],function(a,b,c,d,e){
      	// 相当于在前面声明并初始化了要用到的所有模块
      	a.dosomething()
        
        if(false) {
          // 即使没有用到模块 b，也会提前执行
          b.dosomething()
        }
      	
      })
      12345678910
      ```

  - CMD

    - ```js
      define(function(require, exports, module){
      	var a = require("./a") //需要的时候声明
        a.dosomething()
        if(false) {
          var b = require("./b")
          b.dosomething()
        }
      })
      12345678
      ```

  - AMD 和 CMD 的差别是

    - AMD 是依赖前置（把依赖放在前面）、提前执行（即使没有用到某个模块，也会提前执行）
    - CMD依赖就近、延时执行（用到的时候在声明依赖）

- ESM

  - 使用 export 、 export default 来导出模块，使用 import 来引入模块

- ESM 和 commonjs 的区别主要在于

  - commonjs 是运行时加载 ；ESM 是编译时加载
  - commonjs 是同步加载模块；ESM 是异步加载模块
  - commonjs 是对值的浅拷贝；ESM 是对值的引用，而且不可修改（直接地址不可修改，类似于 const）。



**问：require 和 import的区别？**⭐⭐⭐

- 调用时机
  - require 是运行时调用，所以其实是可以放在任何地方的
  - Import 是编译时调用，所以必须放在文件的开头
- 使用时，
  - require 需要使用 module.exports = fs 或者exports.fs = xxx
  - import 用 export default 或 export const xx
- 解构赋值
  - require 是赋值的过程
  - import 是解构的过程

## JS其他

**面试官：箭头函数和普通函数的区别？箭头函数可以当做构造函数 new 吗？**⭐⭐⭐⭐⭐

- 箭头函数是普通函数的简写，但是它不具备很多普通函数的特性
- 第一点，this指向问题，箭头函数的this指向它定义时所在的对象，而不是调用它的对象
- 不会进行函数提升
- 没有`arguments`对象，不能使用`arguments`，如果要获取参数的话可以使用`rest`运算符
- 没有`yield`属性，不能作为生成器Generator使用
- 不能new
  - 没有自己的this，不能调用call和apply
  - 没有prototype，new关键字内部需要把新对象的`_proto_`指向函数的prototype



**手写 ajax**⭐⭐⭐⭐

```js
var Ajax = {
      get: function (url, callback) {
        let xhr = XMLHttpRequest();
        xhr.open("get", url, false)
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
              console.log(xhr.responseText);
              callback(xhr.responseText)
            }
          }
        }
        xhr.send()
      },



      post: function (url, data, callback) {
        let xhr = new XMLHttpRequest()
        // 第三个参数为是否异步执行
        xhr.open('post', url, true)
        // 添加http头，设置编码类型
        xhr.setRequestHeader("Content-type","x-www-form-urlencoded")
        xhr.onreadystatechange = function () {
          if(xhr.readyState == 4) {
            if(xhr.status == 200 || xhr.status == 304) {
              console.log(xhr.responseText);
              callback(xhr.responseText)
            }
          }
        }
        xhr.setRequestHeader('Content-type', "application/x-www-urlencoded")
        xhr.send(data)
      }
    }
1234567891011121314151617181920212223242526272829303132333435
```



**什么是防抖？什么是节流？手写一个**⭐⭐⭐⭐⭐

- 防抖
  - n秒后在执行该事件，若在n秒内被重复触发，则重新计时
- 节流
  - n秒内只运行一次，若在n秒内重复触发，只有一次生效

```js
    // ---------------------------------------------------------防抖函数
    function debounce(func, delay) {
      let timeout
      return function () {
        let arg = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          func(arg)
        }, delay);
      }
    }

    // ---------------------------------------------------------立即执行防抖函数
    function debounce2(fn, delay) {
      let timer

      return function () {
        let args = arguments
        if (timer) clearTimeout(timer)


        let callNow = !timer
        timer = setTimeout(() => {
          timer = null
        }, delay);
        if (callNow) { fn(args) }
      }
    }
    // ---------------------------------------------------------立即执行防抖函数+普通防抖
    function debounce3(fn, delay, immediate) {
      let timer

      return function () {
        let args = arguments
        let _this = this
        if (timer) clearTimeout(timer)

        if (immediate) {
          let callNow = !timer
          timer = setTimeout(() => {
            timer = null
          }, delay);

          if (callNow) { fn.apply(_this, args) }
        } else {
          timeout = setTimeout(() => {
            func.apply(_this, arguments)
          }, delay);
        }
      }
    }

    // ---------------------------------------------------------节流 ，时间戳版

    function throttle(fn, wait) {

      let previous = 0
      return function () {
        let now = Date.now()
        let _this = this
        let args = arguments
        if (now - previous > wait) {
          fn.apply(_this, arguments)
          previous = now
        }
      }
    }

    // ---------------------------------------------------------节流 ，定时器版
    function throttle2(fn, wait) {
      let timer
      return function () {
        let _this = this
        let args = arguments
        if (!timer) {
          timer = setTimeout(() => {
            timer = null
            fn.apply(_this, arguments)
          }, wait);
        }
      }
    }
12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455565758596061626364656667686970717273747576777879808182
```



**函数柯里化原理**⭐⭐⭐⭐⭐

```js
    function add() {
      var args = Array.prototype.slice.call(arguments)

      var adder = function () {
        args.push(...arguments)
        return adder
      }

      adder.toString = function () {
        return args.reduce((prev, curr) => {
          return prev + curr
        }, 0)
      }

      return adder
    }

    let a = add(1, 2, 3)
    let b = add(1)(2)(3)
    console.log(a)
    console.log(b)
    console.log(add(1, 2)(3));
    console.log(Function.toString)


	// --------普通函数转为柯里化函数------
    function createCurry(fn, args = []) {
        return function () {
            let _args = args.concat(...arguments)
            if (_args.length < fn.length) {
                return createCurry.call(this, fn, _args)
            }
            return fn.apply(this, _args)
        }
    }

    function add(a, b, c) {
        return a + b + c;
    }

    var _add = createCurry(add);

    console.log(_add(1, 2, 3));
    console.log(_add(1)(2, 3));
    console.log(_add(1)(2)(3));
123456789101112131415161718192021222324252627282930313233343536373839404142434445
```



**什么是requestAnimationFrame？**⭐⭐⭐⭐

- requestAnimationFrame请求数据帧可以用做动画执行

- 可以自己决定什么时机调用该回调函数

- 能保证每次频幕刷新的时候只被执行一次

- 页面被隐藏或者最小化的时候暂停执行，返回窗口继续执行，有效节省CPU

- ```js
      var s = 0
      function f() {
        s++
        console.log(s);
        if (s < 999) {
          window.requestAnimationFrame(f)
        }
      }
      window.requestAnimationFrame(f)
  123456789
  ```



**js常见的设计模式**⭐⭐⭐⭐

- 单例模式、工厂模式、构造函数模式、发布订阅者模式、迭代器模式、代理模式

- 单例模式

  - 不管创建多少个对象都只有一个实例

  - ```js
        var Single = (function () {
          var instance = null
          function Single(name) {
            this.name = name
          }
          return function (name) {
            if (!instance) {
              instance = new Single(name)
            }
            return instance
          }
        })()
    
        var oA = new Single('hi')
        var oB = new Single('hello')
        console.log(oA);
        console.log(oB);
        console.log(oB === oA);
    123456789101112131415161718
    ```

- 工厂模式

  - 代替new创建一个对象，且这个对象想工厂制作一样，批量制作属性相同的实例对象（指向不同）

  - ```js
        function Animal(o) {
          var instance = new Object()
          instance.name = o.name
          instance.age = o.age
          instance.getAnimal = function () {
            return "name:" + instance.name + " age:" + instance.age
          }
          return instance
        }
    
        var cat = Animal({name:"cat", age:3})
        console.log(cat);
    123456789101112
    ```

- 构造函数模式

- 发布订阅者模式

  - ```js
        class Watcher {
          // name模拟使用属性的地方
          constructor(name, cb) {
            this.name = name
            this.cb = cb
          }
          update() {//更新
            console.log(this.name + "更新了");
            this.cb() //做出更新回调
          }
        }
    
        class Dep {//依赖收集器
          constructor() {
            this.subs = []
          }
          addSubs(watcher) {
            this.subs.push(watcher)
          }
          notify() {//通知每一个观察者做出更新
            this.subs.forEach(w => {
              w.update()
            });
          }
        }
    
        // 假如现在用到age的有三个地方
        var w1 = new Watcher("我{{age}}了", () => { console.log("更新age"); })
        var w2 = new Watcher("v-model:age", () => { console.log("更新age"); })
        var w3 = new Watcher("I am {{age}} years old", () => { console.log("更新age"); })
    
        var dep = new Dep()
        dep.addSubs(w1)
        dep.addSubs(w2)
        dep.addSubs(w3)
    
    
        // 在Object.defineProperty 中的 set中运行
        dep.notify()
    123456789101112131415161718192021222324252627282930313233343536373839
    ```

- 代理模式

- 迭代器模式



**点击300ms 延迟问题**⭐⭐⭐⭐⭐

- 设置一个 meta 标签

- fastClick 插件

- 自己实现

  - 实现大概思路：封装一个函数，接受两个参数，一个是目标对象，一个是点击后的回调函数； 在 ontouchstart 开始计时，在 ontouchend 中计时结束，如果超出150ms 就

  - ```js
    //封装函数,处理延迟300ms问题
        function tap(obj, callback) {
            var isMove = false;
            var startTime = 0;
            obj.addEventListener('touchstart', function () {
                startTime += Date.now();
            })
            obj.addEventListener('touchmove', function () {
                isMove = true;
            })
            obj.addEventListener('touchend', function () {
                if (!isMove && (Date.now() - startTime) < 150) {
                    callback && callback();
                }
                isMove = false;
                startTime = 0;
            })
        }
    123456789101112131415161718
    ```



**如何实现上传视频？**⭐⭐⭐⭐

- input type = 'file’去接收

- 用 window.URL.createObjectURL(file)把 file 文件转换为 URL（现场的/前端转为 URL）

  或者用 FormData 去接收， 把 file 文件append 进去，然后传给后端，使用返回的 URL



**setTimeOut第三个参数是什么？**⭐⭐⭐⭐⭐

可以作为参数传给函数，一般用于 for 循环赋值



**什么是暂时性死区？**⭐⭐⭐⭐⭐

暂时性死区是指，当进入一个作用域，我去使用一个变量名，而这个变量名已经存在了，但是是不可获取的，就会报错，造成暂时性死区问题；比如一个作用域下面使用了 let 定义了 `x`,但是在定义之前就使用了 `x`，就会报错；暂时性死区意味着 typeof 也不是绝对安全的操作

```js
x = '123'; // 报错

let x = 1




---------------------
typeof y; // 报错

let y = 123
1234567891011
```



**js 遍历数组的方法**⭐⭐⭐⭐⭐

reduce、map、filter、every、some、foreach.

**数组可以改变原数组的方法**⭐⭐⭐⭐⭐

Push、pop、shift、unshift、splice、sort、reverse

不改变的

join 变成字符

Slice，截取

concat 合并数组



**foreach 和 map 有什么区别**⭐⭐⭐⭐

- foreach 没有返回值，一般如果用来遍历修改原数组的话可以用 foreach 方法



**如何捕获浏览器关闭事件？**⭐⭐

```js
window.onbeforeunload = function (e) {
    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
        e.returnValue = '关闭提示';
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return '关闭提示';
};
123456789
```



**localstorage 怎么存储图片**⭐⭐⭐⭐

创建一个canvas对象，把图片保存在 canvas 中，然后 canvas 对象 toDataUrl,在把 dataurl 数据存储在 localstorage 中。

或者使用 blob 二进制流存储，canvas 对象toBlob



**如何实现大文件上传？**⭐⭐⭐⭐

使用 input 接受大文件，使用file.slice进行分割分块上传（制定好一个块的大小，然后进行分割），等所有块上传完毕之后，promise.all(),运行成功回调



**如何实现 localstorage 定时清除**⭐⭐⭐⭐

- 自己重写一个 set 方法，内部逻辑就是添加一个现在的时间以及有效时长
- 再重写一个 get 方法，每当 get 的时候先进行判断是否过期，如果过期就删除，并返回 null，没过期的话正常返回



**web worker是干什么的？**⭐⭐⭐

js是单线程的，而web worker可以多创建一个子线程，多出来的这个子线程执行代码时不会阻塞主线程。它有几个限制，

同源限制，子线程资源必须和主线程资源是同源

dom限制，子线程不能操作dom

文件限制，不能打开本机（file://）文件,只能来源于网络

通信限制，只能使用postmessage来传输信息

脚本限制，不能使用alert、confirm方法



**jquery 如何实现链式调用**⭐⭐⭐

```js
let fun = {
    fun1: function() {
        console.log("fun1");
        return this;
    },
 
    fun2: function() {
        console.log("fun2");
        return this;
    },
 
    fun3: function() {
        console.log("fun3");
        return this;
    }
}
fun.fun1().fun2().fun3();
1234567891011121314151617
```



**node 事件循环机制和浏览器事件循环机制有什么区别**⭐⭐

浏览器和 Node 环境下，microtask 任务队列的执行时机不同

- Node 端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

https://zhuanlan.zhihu.com/p/54882306



**讲一讲Reflect**⭐⭐
顾名思义，reflect反射的意思。可以反射对象

Reflect可以提供一些方法去拦截js的操作，Reflect不是一个函数对象，所以它不可构造，Reflect内部的方法和属性都是静态的。

比如创建一个没有原型的对象，也就是说他自己不能调用任何基于Object原型链上的方法

```js
var myObject = Object.create(null) 

// 如果想列举它的key值，只需使用Reflect的静态方法，拦截该对象，然后做出处理
Reflect.ownKeys(myObject)
1234
```



**Object.keys和Object.getOwnPropertyNames有什么区别？**⭐⭐⭐

Object.keys只列出非原型上可枚举的key值，而Object.getOwnPropertyNames列出非原型上的所有key值(Symbol除外)



**如何配置rem**⭐⭐⭐

```js
 //rem适配
 (function () {
    const styleEle = document.createElement('style');
    const docWidth = document.documentElement.clientWidth;
    const rootFontSize = docWidth / 16;

    styleEle.innerHTML = 'html{font-size:' + rootFontSize + 'px!important}';
    document.head.appendChild(styleEle);

})()
12345678910
```



**clientHeight、offsetHeight、scrollHeight有什么区别**⭐⭐⭐

- clientHeight
  - 用户可见内部高度+padding
- offsetHeight
  - 总高度，算上滚动条
- scrollHeight
  - 可滚动高度的+padding
- scrollTop
  - 当前元素距离顶部的距

触底加载

- scrollTop + clientHeight >= scrollHeight - 50px



**bom和dom的区别**⭐⭐⭐

bom就是window，包含windows（窗口）、navigator（浏览器）、screen（浏览器屏幕）、history（访问历史）、location（地址）等，浏览器相关的东西。bom是包含dom的。

dom是document， html相关的都在里面



**倒计时用setimeout来实现还是setInterval**⭐⭐⭐⭐

- setTimeout
  - 因为假如用setInterval的话，该程序执行需要105ms，而设置的间隔为100ms，则还没运行完最后的那5毫秒就会运行下一次的函数



**promise相对于async…await的优缺点**⭐⭐⭐

- promise
  - 无法取消
  - 错误无法被try…catch捕获，但是可以被catch方法捕获
- async传染力比较强



**fetch优缺点** ⭐⭐⭐⭐

- fetch脱离了XHR，基于promise实现
- 对某些错误不会reject，比如状态码400、500
- fetch不支持超时timeout处理
- fetch默认不携带cookie，需要手动配置
- fetch没有办法监测请求进度，而xhr可以



**秒传、分片传输、断点传输**⭐⭐⭐⭐

- 秒传
  - 文件上传前，服务器先对文件做MD5校验，如果服务器上有同样的文件，则返回一个新地址，如果不想秒传也可以，修改文件中的内容就可以了（改名字不行）
- 分片传输
  - 利用Blob提供的slice方法把大文件分割为一个个小文件分别传输。全部上传完成时候由服务端进行归总整合
- 断点传输
  - 在分片上传的基础上，分成一个个小文件之后，每个小文件上传完毕之后对其进行状态的存储（localStorage），如果中间发生网络断线或者刷新，下次可以接着上次的进度上传



**e.target和e.currentTarget的区别**⭐⭐⭐

e.target是点击的那个对象，e.currentTarget是绑定该事件的对象



**JS性能优化的方式**⭐⭐⭐⭐⭐

- 垃圾回收
- 闭包中的对象清楚
- 防抖节流
- 分批加载（setInterval,加载10000个节点）
- 事件委托
- 少用with
- requestAnimationFrame的使用
- script标签中的defer和async
- CDN





> 嚯家伙，真没想到你有耐心能看到这里，马云都让你三分呀，冲刺吧！自律达人！
> JS章节的结束了，下面迎接下一个boss——计算机网络

![在这里插入图片描述](https://img-blog.csdnimg.cn/5dc453064cdd44069f27dd2bd57eed81.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_13,color_FFFFFF,t_70,g_se,x_16)

# 计算机网络

## 跨域

**面试官：跨域的方式都有哪些？他们的特点是什么** ⭐⭐⭐⭐⭐

- JSONP⭐⭐⭐⭐⭐

  - `JSONP`通过同源策略涉及不到的"漏洞"，也就是像`img`中的`src`，`link`标签的`href`,`script`的`src`都没有被同源策略限制到

  - `JSONP`只能get请求

  - 源码：

    ```js
        function addScriptTag(src) {
          var script = document.createElement("script")
          script.setAttribute('type','text/javascript')
          script.src = src
          document.appendChild(script)
        }
    
        
        // 回调函数
        function endFn(res) {
          console.log(res.message);
        }
    
        // 前后端商量好，后端如果传数据的话，返回`endFn({message:'hello'})`
    1234567891011121314
    ```

- document.domain⭐⭐

  - 使用 document.domain 只能跨子域，需要主域相同才能使用（例如`http:// www.example.com/a.html`和`http:// example.com/b.html`）

  - 通过 document.domain 设置主域，就可以访问并操作子域的 window 对象了，从而达到跨域的目的

  - 使用方法

    - `>`表示输入， `<`表示输出 ，以下是在`www.id.qq.com`网站下执行的操作

    - ```js
      > var w = window.open("https://www.qq.com")
      < undefined
      > w.document
      ✖ VM3061:1 Uncaught DOMException: Blocked a frame with origin "https://id.qq.com" from accessing a cross-origin frame.
          at <anonymous>:1:3
      > document.domain
      < "id.qq.com"
      > document.domain = 'qq.com'
      < "qq.com"
      > w.document
      < #document
      1234567891011
      ```

- `location.hash`+`iframe`⭐⭐

  - 因为hash传值只能单向传输，所有可以通过一个中间网页，a若想与b进行通信，可以通过一个与a同源的c作为中间网页，a传给b，b传给c，c再传回a

    - 具体做法：在a中放一个回调函数，方便c回调。放一个`iframe`标签，随后传值

    - ```html
      <iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
      <script>
          var iframe = document.getElementById('iframe');
      
          // 向b.html传hash值
          setTimeout(function() {
              iframe.src = iframe.src + '#user=admin';
          }, 1000);
          
          // 开放给同域c.html的回调方法
          function onCallback(res) {
              alert('data from c.html ---> ' + res);
          }
      </script>
      1234567891011121314
      ```

    - 在b中监听哈希值改变，一旦改变，把a要接收的值传给c

    - ```html
      <iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"></iframe>
      <script>
          var iframe = document.getElementById('iframe');
      
          // 监听a.html传来的hash值，再传给c.html
          window.onhashchange = function () {
              iframe.src = iframe.src + location.hash;
          };
      </script>
      123456789
      ```

    - 在c中监听哈希值改变，一旦改变，调用a中的回调函数

    - ```html
      <script>
          // 监听b.html传来的hash值
          window.onhashchange = function () {
              // 再通过操作同域a.html的js回调，将结果传回
              window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
          };
      </script>
      1234567
      ```

- `window.name`+`iframe`⭐

  - 同一 window 下 name 是只有一个的，如果该 window 下还包含一个 iframe 也是共享的，这个时候就可以使用 window.name（只能接收字符，可以使用 JSON 格式）来进行数据的传输。
  - 父窗口设置好 window.name 后 ，子窗口 iframe 可进行读取

- `postMessage`⭐⭐

  - a窗口向b窗口发送数据，先把data转为json格式，在发送。提前设置好messge监听
  - b窗口进行`message`监听，监听到了以同样的方式返回数据，
  - a窗口监听到message，在进行一系列操作

- `CORS`⭐⭐⭐⭐⭐

  - 通过自定义请求头来让服务器和浏览器进行沟通
  - 有简单请求和非简单请求
  - 满足以下条件，就是简单请求
    - 请求方法是HEAD、POST、GET
    - 请求头只有`Accept`、`AcceptLanguage`、`ContentType`、`ContentLanguage`、`Last-Event-Id`
  - 简单请求，浏览器自动添加一个Origin字段
    - 同时后端需要设置的请求头
      - Access-Control-Allow-Origin --必须
      - Access-Control-Expose-Headers
        - `XMLHttpRequest`只能拿到六个字段，要想拿到其他的需要在这里指定
    - Access-Control-Allow-Credentials --是否可传cookie
    - 要是想传cookie，前端需要设置`xhr.withCredentials = true`，后端设置Access-Control-Allow-Credentials
  - 非简单请求，浏览器判断是否为简单请求，如果是非简单请求，则 浏览器先发送一个header头为option的请求进行预检
    - 预检请求格式（请求行 的请求方法为OPTIONS（专门用来询问的））
      - Origin
      - Access-Control-Request-Method
      - Access-Control-Request-Header
    - 浏览器检查了Origin、Access-Control-Allow-Method和Access-Control-Request-Header之后确认允许就可以做出回应了
    - 通过预检后，浏览器接下来的每次请求就类似于简单请求了

- nginx代理跨域⭐⭐

  - nginx模拟一个虚拟服务器，因为服务器与服务器之间是不存在跨域的，
  - 发送数据时 ，客户端->nginx->服务端
  - 返回数据时，服务端->nginx->客户端

- websocket ⭐⭐





## 网络原理

**面试官：讲一讲三次握手四次挥手，为什么是三次握手四而不是两次握手？**⭐⭐⭐⭐⭐

- 客户端和服务端之间通过三次握手建立连接，四次挥手释放连接
- 三次握手，客户端先向服务端发起一个SYN包，进入SYN_SENT状态，服务端收到SYN后，给客户端返回一个ACK+SYN包，表示已收到SYN，并进入SYN_RECEIVE状态，最后客户端再向服务端发送一个ACK包表示确认，双方进入establish状态。
  - 之所以是三次握手而不是两次，是因为如果只有两次，在服务端收到SYN后，向客户端返回一个ACK确认就进入establish状态，万一这个请求中间遇到网络情况而没有传给客户端，客户端一直是等待状态，后面服务端发送的信息客户端也接受不到了。
- 四次挥手，首先客户端向服务端发送一个FIN包，进入FIN_WAIT1状态，服务端收到后，向客户端发送ACK确认包，进入CLOSE_WAIT状态，然后客户端收到ACK包后进入FIN_WAIT2状态，然后服务端再把自己剩余没传完的数据发送给客户端，发送完毕后在发送一个FIN+ACK包，进入LAST_ACK（最后确认）状态，客户端收到FIN+ACK包后，再向服务端发送ACK包，在等待两个周期后在关闭连接
  - 之所以等待两个周期是因为最后客户端发送的ACK包可能会丢失，如果不等待2个周期的话，服务端在没收收到ACK包之前，会不停的重复发送FIN包而不关闭，所以得等待两个周期

**面试官：HTTP的结构**⭐⭐⭐

- 请求行 请求头 空行 请求体
  - 请求行包括 http版本号，url，请求方式
  - 响应行包括版本号，状态码，原因

**HTTP头都有哪些字段**⭐⭐⭐⭐

- 请求头
  - cache-control 是否使用缓存
  - Connection：keep-alive 与服务器的连接状态
  - Host 主机域
- 返回头
  - cache-control
  - etag 唯一标识，缓存用的
  - last-modified最后修改时间

**面试官：说说你知道的状态码**⭐⭐⭐⭐⭐

- 2开头的表示成功
  - 一般见到的就是200
- 3开头的表示重定向
  - 301永久重定向
  - 302临时重定向
  - 304表示可以在缓存中取数据（协商缓存）
- 4开头表示客户端错误
  - 403跨域
  - 404请求资源不存在
- 5开头表示服务端错误
  - 500



**网络OSI七层模型都有哪些？TCP是哪一层的**⭐⭐⭐⭐

- 七层模型
  - 应用层
  - 表示层
  - 会话层
  - 传输层
  - 网络层
  - 数据链路层
  - 物理层
- TCP属于传输层

![在这里插入图片描述](https://img-blog.csdnimg.cn/ddd4dd5744bd49479488b3de7006f588.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)



**面试官：http1.0和http1.1，还有http2有什么区别？**⭐⭐⭐⭐

- Http0.9只支持 get请求
- http1.0增加了 POST，HEAD，OPTION，PUT，DELETE 等
  - HEAD请求：和get请求差不多，但是没有body，用来检查资源是否有效，不需要消耗更多的带宽去请求这个url
  - OPTION请求：预检请求，判断是否支持跨域（CORS）
  - PUT一般是用来更改资源，post是增加资源
- http1.1增加了长连接 keep-alive、增加了 host 域、更节约带宽了、还有缓存中的 max-age（之前是 expire）
  - 强缓存在 http1.0用的是Expire， 在1.1中用的是Max-age，为什么换了呢，因为 Expire 记录的是一个时间点，有可能服务端和客户端的时间不一致，后来直接改成了一个时长就完美解决问题了
- http2.0增加了服务器推送、多路复用、头部压缩、以及更接近二进制了
- http3.0增加了 QUIC 协议，是基于 udp 来完成建立连接的



**面试官：https和http有什么区别，https的实现原理？**⭐⭐⭐⭐⭐

- http无状态无连接，而且是明文传输，不安全,默认连接80端口
- https 是有不可否认性的，可以保证对方身份的真实性，默认端口是443端口，加密传输，而且会保证数据的完整性
- https实现原理⭐⭐⭐
  - 首先客户端向服务端发送一个随机值和一个客户端支持的加密算法,并连接到443端口。
  - 服务端收到以后，会返回另外一个随机值和一个协商好的加密算法，这个算法是刚才发送的那个算法的子集
  - 随后服务端会再次发送一个 CA 证书，这个 CA 证书实际上就是一个公钥，包含了一些信息（比如颁发机构和有效时间等）
  - 客户端收到以后会验证这个 CA 证书，比如验证是否过期，是否有效等等，如果验证未通过，会弹窗报错。
  - 如果验证成功，会生成一个随机值作为预主密钥，客户端使用刚才两个随机值和这个预主密钥组装成会话密钥；再使用刚才服务端发来的公钥进行加密发送给服务端；这个过程是一个非对称加密（公钥加密，私钥解密）
  - 服务端收到以后使用私钥解密，随后得到那两个随机值和预主密钥，随后再组装成会话密钥。
  - 客户端在向服务端发起一条信息，这条信息使用会话秘钥加密，用来验证服务端时候能收到加密的信息
  - 服务端收到以后使用刚才的会话密钥解密，在返回一个会话密钥加密的信息，双方收到以后 SSL 建立完成；这个过程是对称加密（加密和解密是同一个）



**面试官：localStorage、SessionStorage、cookie、session 之间有什么区别**⭐⭐⭐⭐⭐

- localStorage
  - 生命周期：关闭浏览器后数据依然保留，除非手动清除，否则一直在
  - 作用域：相同浏览器的不同标签在同源情况下可以共享localStorage
- sessionStorage
  - 生命周期：关闭浏览器或者标签后即失效
  - 作用域：只在当前标签可用，当前标签的iframe中且同源可以共享
- cookie
  - 一开始cookie 不是用来存储的，而是为了弥补 http 的状态的不足，http 是无状态协议。每当向服务器发起请求、请求结束，下次发送请求的时候服务端就不知道是谁了，所以 cookie 是用来弥补这个不足的
  - cookie 有很多缺陷，比如：
    - 容量缺陷。cookie 的存储空间只有4KB
    - 性能缺陷。有时候 cookie 我们用不到，但是不管用的到用不到，http 在发送请求的时候一定会带着 cookie，这就造成了性能的浪费
    - 安全缺陷。cookie 在 http 下很容易被非法用户获取。尤其是设置了 http-only 为 false 的情况下，这个时候 js 可以读取到 cookie，很容易受到 xss攻击。
  - cookie 是保存在客户端的，一般由 server 设置值及过期时间
    - cookie 没有提供删除的 API，如果想要删除的 的话可以把 max-age 设为0或者把 expire 设置为当前时间（立刻过期）即可
  - cookie 的属性有
    - http-only
      - 不能被客户端更改访问，防止 XSS 攻击
    - max-age
      - 生效后存活的时间
    - Secure
      - 是否只允许在 https 下传输
    - expire
      - 过期时间
- session
  - session 是保存在服务端的
  - session 的运行依赖 sessionId，sessionId 又保存在 cookie 中，所以禁用了 cookie之后 session 也是用不了的，如果硬要用也可以，可以把 sessionId 存储在 url 中
  - session一般是用来跟踪用户状态的
  - session 比较安全，因为存储在服务器中，不过为了减少服务端的压力，很多信息还是推荐存在 cookie 中的



**indexDB与localStorage的区别**⭐⭐⭐⭐⭐

- indexDB类似于数据类似于数据库的概念
- 异步存储，而且支持事务（提供`error`、`abort`和`complete`三个事件，不会出现失败后只改写了一部分的情况）



**问：服务端渲染和客户端渲染的区别，各自的优缺点？**⭐⭐⭐⭐⭐

> 推荐文章：[服务器端渲染和客户端渲染](https://www.cnblogs.com/zhuzhenwei918/p/8795945.html)

- 服务端渲染（SSR Server Site Rendering）
- 有利于 SEO，首屏加载快，但是重复请求次数多，开发效率低，服务器压力大
- 渲染的时候返回的是完整的 html 格式
- 应用场景：可能被搜索到的
- 客户端渲染(CSR Client Site Rendering)
- 不利于 SEO，首屏加载慢，前后端分离开发，交互速度快、体验好
- 渲染的时候返回的是 json 数据格式，由浏览器完成渲染
- 应用场景：app 内部"嵌套"的 h5页面



**什么是JWT(Json Web Token)？**⭐⭐⭐⭐⭐
**答：**

在没有 JWT 之前，验证客户端的方式就是通过 token,具体方式如下

- 用户输入账号密码以后，向服务端发起请求，服务端生成token返回给客户端，然后下次客户端请求数据的时候会携带着 token，服务端收到之后，会与之前保存的 token进行验证，验证通过以后返回数据，验证不通过就不返回。
- 不过这种方式的扩展性很差，因为如果有上万个用户发起请求的话就需要保存上万条 token，这样对服务端而言无疑是压力巨大的

后来出现了 JWT，这种方法可以把 token 保存在客户端

JWT 相当于把数据转换成 JSON 对象，这个特殊的 JSON 对象分为三部分：**头部、负载、签名**,他们之间分别用`.`区分开

- 头部（header）
  - 保存的是JWT 的元数据,表明所使用的 hash 算法，以 JSON 对象的方式存储，然后转换成 Base64URL 的格式
- 负载（payload）
  - 也是 JSON 对象格式，用来存放自己的数据
- 签名（Signature）
  - 确保消息的完整性

**面试官：Get和Post的区别**⭐⭐⭐⭐⭐

> 推荐文章: [GET 和 POST 到底有什么区别？](https://www.zhihu.com/question/28586791)

- 冪等/不冪等（可缓存/不可缓存）
  - get请求是冪等的，所以get请求的数据是可以缓存的
  - 而post请求是不冪等的，查询查询对数据是有副作用的，是不可缓存的
- 传参
  - get传参，参数是在url中的
    - 准确的说get传参也可以放到body中，只不过不推荐使用
  - post传参，参数是在请求体中
    - 准确的说post传参也可以放到url中，只不过不推荐使用
- 安全性
  - get较不安全
  - post较为安全
  - 准确的说两者都不安全，都是明文传输的，在路过公网的时候都会被访问到，不管是url还是header还是body，都会被访问到，要想做到安全，就需要使用https
- 参数长度
  - get参数长度有限，是较小的
    - 准确来说，get在url传参的时候是很小的
  - post传参长度不受限制
- 发送数据
  - post传参发送两个请求包，一个是请求头，一个是请求体，请求头发送后服务器进行验证，要是验证通过的话就会给客户端发送一个100-continue的状态码，然后就会发送请求体
- 字符编码
  - get在url上传输的时候只允许ASCII编码

**面试官：讲讲http缓存**⭐⭐⭐⭐⭐

> [彻底弄懂强缓存与协商缓存](https://www.jianshu.com/p/9c95db596df5)

- 缓存分为强缓存和协商缓存

- 强缓存

  - 在客户端发起请求之前，先检查强缓存，查看强缓存的`cache-control`里的`max-age`，判断数据有没有过期，如果没有直接使用该缓存 ，有些用户可能会在没有过期的时候就点了刷新按钮，这个时候浏览器就回去请求服务端，要想避免这样做，可以在`cache-control`里面加一个`immutable`.这样用户再怎么刷新，只要 `max-age` 没有过期就不会去请求资源。
  - public
    - 因为服务端返回数据的过程中可能会经过很多虚拟代理服务器，他们可以进行缓存，使用 public 就是允许它们缓存
  - private
    - 不允许代理服务器缓存，允许客户端缓存
  - no-cache
    \- 不允许强缓存，可以协商缓存
  - no-store
    - 不允许缓存

- 协商缓存

  - 浏览器加载资源时，没有命中强缓存，这时候就去请求服务器，去请求服务器的时候，会带着两个参数，一个是`If-None-Match`，也就是响应头中的`etag`属性，每个文件对应一个`etag`;另一个参数是`If-Modified-Since`,也就是响应头中的`Last-Modified`属性，带着这两个参数去检验缓存是否真的过期，如果没有过期，则服务器会给浏览器返回一个304状态码，表示缓存没有过期，可以使用旧缓存。

  - ```
    etag
    ```

    的作用

    - 有时候编辑了文件，但是没有修改，但是`last-modified`属性的时间就会改变，导致服务器会重新发送资源，但是`etag`的出现就完美的避免了这个问题，他是文件的唯一标识

  - ```
    last-modified
    ```

    和

    ```
    etag
    ```

    各有各自的优点和缺点：

    - 每个文件都有一个 `etag` 和 `last-modified` 属性，`etag` 要优先于 `last-modified`，两个属性各有优缺点，比如 `last-modified` 很多时候不能感知文件是否改变，但 `etag` 能；`last-modified` 仅仅记录了时间点，性能肯定要高于`etag`，`etag` 记录的是哈希值

缓存位置：

- 内存缓存Memory-Cache
- 离线缓存Service-Worker
- 磁盘缓存Disk-Cache
- 推送缓存Push-Cache



**面试官：`tcp` 和`udp`有什么区别**⭐⭐⭐⭐⭐

- 连接方面
  - tcp面向连接，udp不需要连接
    - tcp需要三次握手四次挥手请求连接
- 可靠性
  - tcp是可靠传输；一旦传输过程中丢包的话会进行重传
  - udp是不可靠传输，但会最大努力交付
- 工作效率
  - UDP实时性高，比TCP工作效率高
    - 因为不需要建立连接，更不需要复杂的握手挥手以及复杂的算法，也没有重传机制
- 是否支持多对多
  - TCP是点对点的
  - UDP支持一对一，一对多，多对多
- 首部大小
  - tcp首部占20字节
  - udp首部占8字节

**tcp 是如何保证可靠传输的**⭐⭐⭐⭐⭐

- 校验和
  - 数据传输的过程中，每一个数据段都有一个16位的编号，将这些编号加起来并取反得出一个校验和，看收到后是否和之前的一致
- 序列号和确认应答
  - 每次发送数据的时候，服务端都会返回一个确认应答以及将要发送的序列号
- 超时重传、滑动窗口、拥塞控制

**为什么 TCP 要进行流量控制？**⭐⭐⭐
为了解决发送方和接收方的速率不一致问题，如果发送方的速率过快的话，接收方处理不过来，只能放在缓存区，缓存区满了，就只能丢包了。所以需要进行流量控制

**TCP 为什么会重传？**⭐⭐⭐⭐⭐

TCP 传输是一应一答的，如果中间丢包了的话，那么就会处于僵持状态，所以在发送发会设置一个定时器，一段时间（这个时间应该略大于一个发送来回的时间）如果没有收到对方`ACK`确认的话，就会重新发送数据，这就是**超时重传**

如果要发送`12345`中间丢包的话 只收到了1、3、4、5·，服务器检测出来，会连续发送三个Ack=2，触发快速重传，在定时器之前就完成重传

**TCP的四种拥塞控制算法:**
1.慢开始
2.拥塞控制
3.快重传
4.快恢复

**tcp 的四元组是什么**⭐⭐⭐⭐⭐

- 四元组：
  - 源 IP地址，目标 ip 地址，源端口，目标端口
- 五元组：
  - 源 IP 地址，目标 IP 地址，协议号，源端口，目标端口
- 七元组：
  - 源 IP 地址，目标 IP 地址，协议号，源端口，目标端口，服务类型以及接口索引



**面试官：从浏览器输入url后都经历了什么**⭐⭐⭐⭐⭐

- 先进行DNS域名解析，先查看本地hosts文件，查看有没有当前域名对应的ip地址，若有直接发起请求，没有的话会在本地域名服务器去查找，该查找属于递归查找，如果本地域名服务器没查找到，会从根域名服务器查找，该过程属于迭代查找，根域名会告诉你从哪个与服务器查找，最后查找到对应的ip地址后把对应规则保存到本地的hosts文件中。

- 如果想加速以上及之后的http请求过程的话可以使用缓存服务器CDN，CDN过程如下：

  - 用户输入url地址后，本地DNS会解析url地址，不过会把最终解析权交给CNAME指向的CDN的DNS服务器
  - CDN的DNS服务器会返回给浏览器一个全局负载均衡IP
  - 用户会根据全局负载均衡IP去请求全局负载均衡服务器
  - 全局负载均衡服务器会根据用户的IP地址，url地址，会告诉用户一个区域负载均衡设备，让用户去请求它。
  - 区域负载均衡服务器会为用户选择一个离用户较近的最优的缓存服务器，并把ip地址给到用户
  - 用户想缓存服务器发送请求，如果请求不到想要的资源的话，会一层层向上一级查找，直到查找到为止。

- 进行http请求，三次握手四次挥手建立断开连接

- 服务器处理，可能返回304也可能返回200

  - 返回304说明客户端缓存可用，直接使用客户端缓存即可，该过程属于协商缓存
  - 返回200的话会同时返回对应的数据

- 客户端自上而下执行代码

  - 其中遇到CSS加载的时候，CSS不会阻塞DOM树的解析，但是会阻塞DOM树的渲染，并且CSS会阻塞下面的JS的执行

  - 然后是JS加载，JS加载会影响DOM的解析，之所以会影响，是因为JS可能会删除添加节点，如果先解析后加载的话，DOM树还得重新解析，性能比较差。如果不想阻塞DOM树的解析的话，可以给script添加一个

    ```
    defer
    ```

    或者

    ```
    async
    ```

    的标签。

    - defer：不会阻塞DOM解析，等DOM解析完之后在运行，在`DOMContentloaed`之前
    - async: 不会阻塞DOM解析，等该资源下载完成之后立刻运行

  - 进行DOM渲染和Render树渲染

    - 获取html并解析为Dom树
    - 解析css并形成一个cssom（css树）
    - 将cssom和dom合并成渲染树（render树）
    - 进行布局（layout）
    - 进行绘制（painting）
    - 回流重绘
      - 回流必将引起重绘，重绘不一定引起回流
        - 当改变 width、height 等影响布局的属性时会引起回流，或者当获取 scroll、client、offset 一族时，浏览器为获取这些值也会进行回流，getComputedStyle 也会引起回流

**面试官：说一下回流和重绘**⭐⭐⭐⭐⭐

- 回流
  - 当我们操作 DOM 时，使其结构发生改变，从而影响了整体布局，这个过程就会发生回流。
  - 如果说具体一点的话。
    - 当元素的 width、height、margin、padding、left、top 发生改变的时候会发生回流
    - 使 DOM节点增减或移动
    - 读写 offset、client、scroll 时，浏览器为了获取这些值，会进行回流操作
    - 使用 `window.getComputedStyle`的时候
  - 页面至少会进行一次回流，页面第一次加载的时候。
- 重绘
  - 当改变元素时，只是改变了它的外观，比如背景颜色等，而没有影响到它的布局，这个时候会发生重绘
  - 回流必将引起重绘；重绘不一定会引起回流
- 如何避免或减少
  - 尽量避免频繁使用style，而是使用修改class的方式
  - 使用 `creeateDocumentFragment`
  - 对于 resize 和 scroll 进行防抖节流处理



**讲讲CDN缓存**⭐⭐⭐⭐⭐
**答：**

如果接入了CDN的话，DNS解析权也是会改变的，会把DNS解析权交给CNAME指向的CDN专用DNS服务器

其次就是缓存问题，正常情况下，浏览器在发起请求之前，会先查看本地缓存，如果过期的话再去向服务端发起请求；

如果使用了CDN，浏览器会先查看本地缓存，如果未命中，会向CDN边缘节点发起请求，如果没有过期，直接返回数据，此时完成http请求，如果过期，则CDN还需要向源站发起回源请求，来拉取最新数据。

CDN的缓存策略是因服务商的不同而不同的，但是大多会遵循http标准协议，通过Cache-Control里面的max-age来控制缓存时间

- CDN优点
  - 减少了用户访问延时，也减少了源站负载
- CDN缺点
  - 当网站数据更新时，而此时缓存数据还没有过期，这时候用户只需强制刷新即可获取最新数据。但是如果使用了CDN的话，用户强制刷新也只是请求到CDN上的数据，此时如果CDN没有同步最新数据的话会导致用户访问异常。一般这个时候程序员需要手动更新调用CDN的刷新缓存接口。

**面试官：说一说defer 和 async**⭐⭐⭐⭐⭐

> [浅谈script标签中的async和defer](https://www.cnblogs.com/jiasm/p/7683930.html)

- 首先在正常情况下，script 标签是会阻塞 DOM 的解析的,所以我们要尽量不要把script 放到 head 里，要尽量放到 body 的最下方。这样不至于会有白屏的效果；
- 然后是 defer和 async；他们两个是异步加载 js 代码的。
- defer
  - 给 script 标签添加 defer 属性，就不会阻塞 dom 的解析了，等 dom 渲染完之后才会运行该 js 代码，如果是多个 script 标签都添加了 defer 属性的话，那么它们是按照顺序执行的（第一个全部执行完毕之后才能执行第二个），defer 的 script 是在 DOMContentLoaded 之前运行的。
- async
  - 给 script 添加 async 属性之后，会异步下载 js 代码，等下载完成之后会立即运行js 代码。多个 script 标签同时设置了 async 是没有先后顺序的，谁先加载完谁就先运行。
  - 如果 script 标签没有操作任何 dom 信息，且不彼此依赖的话，可以使用 async

**meta 标签可以做什么？**⭐⭐

为浏览器提供 html 的元信息（信息的信息）

规定 html 字符编码

```html
<meta charset="UTF-8">
1
```

设置移动端的视区窗口

```html
<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;">
1
```

移动端点击300ms 延时，可以对放大禁用

```html
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">
12
```

设置 http 头

```html
<meta http-equiv="content-Type" content="text/html; charset=gb2312">
1
```

图片403

```html
<meta name="referrer" content="no-referrer" />
1
```

dns 预解析

```html
<meta  http-equiv="x-dns-prefetch-control" content="on">
<link  rel="dns-prefetch" href="//www.zhix.net">
12
```

**什么是 dns 预解析?**⭐⭐⭐

- 正常输入 url 地址之后，会进行 dns域名解析，这个过程大概会花费20~120ms，所以这个时候出现了预解析，可以给当前页使用到的其他域名进行预处理，提前进行预解析，这样当再次访问这些域名的时候就不用 dns 解析了；
- 使用方式:

```html
<meta  http-equiv="x-dns-prefetch-control" content="on">  // chrome 火狐新版等浏览器自动为 on，要关闭可以设置为 off
<link  rel="dns-prefetch" href="//www.zhix.net">
<link  rel="dns-prefetch" href="//api.share.zhix.net">
<link  rel="dns-prefetch" href="//bdimg.share.zhix.net">
1234
```

- 缺点：有时不会访问的网页页进行了预解析，有时为了节约性能，会选择关闭 dns 预解析。

**DNS 用的什么网络协议**⭐⭐⭐

dns 在区域传输（将一个区域文件传输到多个 DNS服务器的过程叫做区域传输）的时候用的 tcp，在域名解析的时候用的是 udp



**浏览器请求并发有限制，如何处理？**⭐⭐⭐⭐⭐

- 雪碧图，把请求的icon 合并成一张图片。
- 对 js和 css打包，资源合并
- 给资源做缓存
- 图片按需加载
- 给资源做 Hash，请求到不同域下（因为只有相同域才有并发限制）

**短轮询和长轮询**⭐⭐⭐

- 短轮询
  - 指每隔特定时间，由浏览器对服务器发出 http 请求，然后服务端返回最新的数据给客户端
  - 缺点：请求中大半是没用的，难于维护，浪费带宽和服务器资源；响应的结果没有顺序（因为是异步请求，如果当前请求还没返回结果时，下一个请求就请求到了，当前请求就过时无效了）
- 长轮询
  - 客户端发起 ajax 请求后，服务端阻塞请求，等有数据或者超时的时候在返回。返回信息之后，客户端再次发起请求，重新建立连接。
  - 缺点：返回数据顺序无保证
- 两者的共同缺点
  - 服务器被动，不能主动推送信息。

**讲一讲登录实现**⭐⭐⭐⭐⭐

用户第一次登录的时候，后端生成该用户对应的token（唯一的并且有时效性的）并返回给前端，前端收到token之后存储在localStorage里面，并且记录用户的登录状态，下次在发送用户相关的请求的时候需要携带上token（后端需要设置Access-control-allow-headers ： token避免跨域问题），后端给每个用户相关的接口都加上token校验。每次用户切换界面的时候都进行路由守卫的拦截验证，如果登录状态为true，则可以访问，如果为false，则不允许访问

**什么是token?**⭐⭐⭐⭐⭐

- 用户第一次登陆的时候，后端生成该用户对应的token（唯一并且有时效性），并存在数据库里（如果太多用户登陆的话会造成大量空间浪费，可以使用JWT），并返回给前端。前端把它存储在localStorage中，下一次发送请求时（关于用户的请求，比如修改头像、密码或者自动登录）带上token并放在header中（不配合后端的话会出现跨域问题，后端需要设置Access-control-allow-headers ： token），后端给每个用户相关的接口都加上验证token操作，token正确则返回对应的数据，错误则报错处理。当用户退出登录的时候删掉对应的token

**什么是xss？什么是csrf？**⭐⭐⭐⭐⭐

- xss脚本注入
  - 不需要你做任何的登录认证，它会通过合法的操作（比如在url中输入、在评论框中输入），向你的页面注入脚本（可能是js、hmtl代码块等）。
  - 防御
    - 编码：对用户输入的数据进行HTML Entity 编码。把字符转换成 转义字符。Encode的作用是将$var等一些字符进行转化，使得浏览器在最终输出结果上是一样的。
    - 过滤：移除用户输入的和事件相关的属性。
- csrf跨域请求伪造
  - 在未退出A网站的前提下访问B，B使用A的cookie去访问服务器
  - 防御：
    - 使用验证码或者 token 验证，每次提交表单时需要带上 token（伪造者访问不到），如果 token 不合法，服务器拒绝请求
    - 通过 host+origin 来判断是否为非法用户
    - 给 Cookie 设置 SameSite属性，来限制第三方 Cookie，里面有三个值 strict、lax、none
      - strict
        - 最严格，完全禁止第三方的 cookie；但是体验不好，如果当前有一个 github 链接，点击跳转就不会携带任何 cookie，跳转过去一直是未登录状态的
      - lax
        - 稍微放宽了一些，大多不发送 cookie，但除了 get 请求（只包括三种情况：链接、预加载请求、get 表单）以外
      - none
        - 关闭该设置
- 点击劫持
  - 点击劫持是指利用 iframe+css 的 opacity 把危险网址设置为透明覆盖到安全的网址上面，使用户误以为在安全网址下操作。
  - 防范：
    - 在 http 中配置 X-frame-options 设置为 deny 可以禁止被 iframe 嵌入

> 怎么样？计算机网络是不是没有想象中的那么难？
> 奶奶滴！跟我玩阴的是吧？这么难！
> 如果你没看过瘾的话，推荐你这篇文章：[【长文】前端需要了解的计算机网络知识](https://blog.csdn.net/qq_29438877/article/details/105132220)
> 是不是得感激我一下【手动滑稽】

![在这里插入图片描述](https://img-blog.csdnimg.cn/50cca139f55f406c9d9fffc21c81be97.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_15,color_FFFFFF,t_70,g_se,x_16)

# CSS/HTML

**flex布局**⭐⭐⭐⭐⭐

> 这个我就不例举了，看看阮一峰老师的文章叭！[Flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

**grid布局**⭐⭐⭐

> 同样是阮一峰老师的，[CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)



**常见的行内元素和块级元素都有哪些？**⭐⭐⭐⭐⭐

- 行内元素 inline
  - 不能设置宽高，多个元素共享一行，占满的时候会换行
  - span、input、img、textarea、label、select
- 块级元素block
  - 可以设置宽高，一个元素占满一整行
  - p、h1/h2/h3/h4/h5、div、ul、li、table
- inline-block
  - 可以设置宽高，多个元素共享一行，占满的时候会换行



**请说明px,em,rem,vw,vh,rpx等单位的特性**⭐⭐⭐⭐⭐

- px
  - 像素
- em
  - 当前元素的字体大小
- rem
  - 根元素字体大小
- vw
  - 100vw是总宽度
- vh
  - 100vh是总高度
- rpx
  - 750rpx是总宽度



**常见的替换元素和非替换元素？**⭐⭐

- 替换元素
  - 是指若标签的属性可以改变标签的显示方式就是替换元素，比如input的type属性不同会有不同的展现，img的src等
  - img、input、iframe
- 非替换元素
  - div、span、p



**first-of-type和first-child有什么区别**⭐⭐⭐

- first-of-type
  - 匹配的是从第一个子元素开始数，匹配到的那个的第一个元素
- first-child
  - 必须是第一个子元素

**`doctype`标签和`meta`标签**⭐⭐⭐⭐⭐

- doctype
  - 告诉浏览器以什么样的文档规范解析文档
  - 标准模式和兼容模式
    - 标准模式 ->正常，排版和js运作模式都是以最高标准运行
    - 兼容模式->非正常

**script标签中defer和async都表示了什么**⭐⭐⭐⭐⭐

- 众所周知script会阻塞页面的加载，如果我们要是引用外部js，假如这个外部js请求很久的话就难免出现空白页问题，好在官方为我们提供了defer和async

- defer

  - ```html
    <script src="d.js" defer></script>
    <script src="e.js" defer></script>
    12
    ```

  - 不会阻止页面解析，并行下载对应的js文件

  - 下载完之后不会执行

  - 等所有其他脚本加载完之后，在`DOMContentLoaded`事件之前执行对应`d.js`、`e.js`

- async

  - ```html
    <script src="b.js" async></script>
    <script src="c.js" async></script>
    12
    ```

  - 不会阻止DOM解析，并行下载对应的js文件

  - 下载完之后立即执行

- **补充**，`DOMContentLoaded`事件

  - 是等HTML文档完全加载完和解析完之后运行的事件
  - 在`load`事件之前。
  - 不用等样式表、图像等完成加载

**什么是BFC？**⭐⭐⭐⭐⭐

- BFC是一个独立渲染区域，它丝毫不会影响到外部元素
- BFC特性
  - 同一个BFC下margin会重叠
  - 计算BFC高度时会算上浮动元素
  - BFC不会影响到外部元素
  - BFC内部元素是垂直排列的
  - BFC区域不会与float元素重叠
- 如何创建BFC
  - position设为absolute或者fixed
  - float不为none
  - overflow设置为hidden
  - display设置为inline-block或者inline-table或flex

**问：IFC**⭐

- 块级元素里面仅包含内联元素

**如何清除浮动**⭐⭐⭐⭐⭐

- 额外标签clear:both

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
        .fahter{
            width: 400px;
            border: 1px solid deeppink;
        }
        .big{
            width: 200px;
            height: 200px;
            background: darkorange;
            float: left;
        }
        .small{
            width: 120px;
            height: 120px;
            background: darkmagenta;
            float: left;
        }
    
        .clear{
            clear:both;
        }
        </style>
    </head>
    <body>
        <div class="fahter">
            <div class="big">big</div>
            <div class="small">small</div>
            <div class="clear">额外标签法</div>
        </div>
    </body>
    12345678910111213141516171819202122232425262728293031323334353637
    ```

- 利用BFC

  - `overflow:hidden`

  - ```css
        .fahter{
            width: 400px;
            border: 1px solid deeppink;
            overflow: hidden;
        }
    12345
    ```

- 使用after(推荐)

  - ```html
    <style>
        .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
            content: "";
            display: block;
            height: 0;
            clear:both;
            visibility: hidden;
        }
        .clearfix{
            *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
        }
    </style>
    <body>
        <div class="fahter clearfix">
            <div class="big">big</div>
            <div class="small">small</div>
            <!--<div class="clear">额外标签法</div>-->
        </div>
    123456789101112131415161718
    ```

**css 绘制三角形**⭐⭐⭐⭐⭐

```css
 // 给width 和 height 设为0，其他边框设为 transparent 透明
.x {
      width: 0;
      height: 0;
      background-color: red;
      border-left: 30px transparent solid;
      border-top: 50px black solid;
      border-right: 30px transparent solid;
  }
123456789
```

**什么是DOM事件流？什么是事件委托**⭐⭐⭐⭐⭐

- DOM事件流
  - 分为三个阶段
    - 捕获阶段
    - 目标阶段
    - 冒泡阶段
  - 在addeventListener()的第三个参数(useCapture)设为true，就会在捕获阶段运行，默认是false冒泡
- 事件委托
  - 利用冒泡原理（子向父一层层穿透），把事件绑定到父元素中，以实现事件委托

**事件冒泡和事件捕捉有什么区别**⭐⭐⭐⭐⭐

- 事件冒泡
  - 在`addEventListener`中的第三属性设置为false（默认）
  - 从下至上（儿子至祖宗）执行
- 事件捕捉
  - 在`addEventListener`中的第三属性设置为true
  - 从上至下（祖宗到儿子）执行

**link标签和import标签的区别**⭐⭐⭐⭐

- link属于html，而@import属于css
- 页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载。
- link是html标签，因此没有兼容性，而@import只有IE5以上才能识别。
- link方式样式的权重高于@import的。



**css优先级问题**⭐⭐⭐⭐⭐

- important 无条件优先
- 内联样式1000
- id选择器 100
- class、伪类、属性 10
- 标签 伪元素 1



**css 变量**⭐⭐⭐

使用`--`开头定义变量，用`var()`去使用



**怪异盒模型和标准盒模型有什么区别**⭐⭐⭐⭐⭐

标准盒的总宽度为 width+padding+border+margin

而怪异盒模型的总宽度是 width+margin（width 已经包含了 padding 和 border 了）

当 box-sizing设置为 content-box为标准盒模型，当 box-sizing 设置为 border-box 为怪异盒模型



**如何使div可聚焦**⭐⭐

使div可聚焦，为元素加上tabIndex属性，按键盘上的tab键时在他们之间切换

```html
<a href="http://www.w3school.com.cn/" tabindex="2">W3School</a><br />
<a href="http://www.google.com/" tabindex="1">Google</a><br />
<a href="http://www.microsoft.com/" tabindex="3">Microsoft</a>
<div style="width:50px; height:50px; background: red; margin:20px" tabindex="4">123123</div>
1234
```

**html5相比于之前的有什么优化？**⭐⭐⭐⭐

其实说实话，作者个人对 html 和 html5之间的差别并没有太大概念，因为我正式开始学习前端的时候 html5就已经出了，这就让我感觉html 本身就是这个样子的，司空见惯了。css和css3也一样。不过之前还是有看过一些文章，了解过他们之间的差别的。比如：

- 语义化标签的出现
  - header
  - footer
  - section 等等等等
- 还有 input 的优化
  - 可以给它的 type 设置成 number、tel、email 等等
- 增加了表单的优化
  - placeholder、required、min/max、multiple 等等
- 增加了 canvas
- 增加了 audio播放音频文件的标签

**css3有什么优化**⭐⭐⭐⭐

- Border-radius、Border-shadow、border-image
  - 我一个百度的同事之前就和他聊过这些，他就经历了 css——css3的过度，他说当时出了这个圆角、阴影都把他震撼到了。（果然是编程的魅力，hhh…）
- text-shadow、word-wrap
- 还有动画效果 translate3d，**css3的 translate3d 可以开启 gpu 加速**，所以在使用动画的时候尽量要 css3的 translate3d，而不是 position：absolute+top+left
- box-sizing

# Vue

## 1、Vue双向绑定

**数据劫持：** vue.js是采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`,`getter`,在数据变动时发布消息给订阅者，触发相应的监听回调



## **2、阐述一下你所理解的MVVM响应式原理**⭐⭐⭐⭐⭐

vue是采用数据劫持配合发布者-订阅者的模式的方式，通过`Object.defineProperty()`来劫持各个属性的getter和setter，在数据变动时，发布消息给依赖收集器（dep中的subs），去通知（notify）观察者，做出对应的回调函数，去更新视图

MVVM作为绑定的入口，整合Observer,Compile和Watcher三者，通过Observer来监听model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer，Compile之间的通信桥路，达到数据变化=>视图更新；视图交互变化=>数据model变更的双向绑定效果。



## **3、Vue 如何监听数组的？**⭐⭐⭐⭐⭐

首先第一点是要看数组里面是不是还存在对象，如果存在对象的话在进行深层遍历是否还依然存在对象，再把对象进行 `defineProperty`监听。然后数组，数组的改变实质上只是几个方法，什么 `pop`，`unshift`，`push`…Vue 重写了这几个方法，只要在调用这些方法的时候做出回调更新就可以了



## **4、为什么 Vue 要采用异步更新**⭐⭐⭐⭐

因为首先 Vue 本身是组件级更新的，更改数据如果非常多，更新非常频繁，如果不采用异步更新的话每次都需要重新渲染。

每次有数据需要更新的时候，Vue 会把它放在一个队列中，等最后的时候会调用 `nexttick` 方法。`nexttick`就会清空这个队列。

用户也可以手动调用 `nexttick(callback)` 方法，会同样把callback 回调函数放入队列中，保证视图更新完之后被调用（因为会把 callback 放进队列的最后），并且是依次链式调用。



## **5、Vue中的`nextTick`**⭐⭐⭐⭐⭐

- nextTick
  - 解释
    - `nextTick`：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  - 应用
    - 想要在Vue生命周期函数中的`created()`操作DOM可以使用`Vue.nextTick()`回调函数
    - 在数据改变后要执行的操作，而这个操作需要等数据改变后而改变DOM结构的时候才进行操作，需要用到`nextTick`



## **6、Vue中的`nextTick`是微任务还是宏任务**⭐⭐⭐⭐

`nextTick`的内部实现如果支持 `promise` 那就使用 `promise`，没有就用`MutationObserver`（微任务），在没有就用 `setImmediate`（宏任务），还没有就用 `setTimeOut`；**所以`nextTick` 有可能是宏任务，也有可能是微任务**



## **7、讲一讲Vue的发布订阅者模式**⭐⭐⭐⭐⭐

- data中每一个数据都绑定一个Dep，这个Dep中都存有所有用到该数据的观察者

- 当数据改变时，发布消息给dep（依赖收集器），去通知每一个观察者。做出对应的回调函数

- ```js
      const dep = new Dep()
      // 劫持并监听所有属性
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
          // 订阅数据变化时，在Dep中添加观察者
          Dep.target && dep.addSub(Dep.target)
          return value
        },
        set: (newVal) => {
          if (newVal !== value) {
            this.observe(newVal)
            value = newVal
          }
          // 告诉Dep通知变化
          dep.notify()
  
        },
      })
  1234567891011121314151617181920
  ```



## **8、面试官：说说vue的生命周期**⭐⭐⭐⭐⭐

- ```
  beforeCreate
  ```

  - 创建之前，此时还没有data和Method

- ```
  Created
  ```

  - 创建完成，此时data和Method可以使用了
  - 在Created之后beforeMount之前如果没有el选项的话那么此时生命周期结束，停止编译，如果有则继续

- ```
  beforeMount
  ```

  - 在渲染之前

- ```
  mounted
  ```

  - 页面已经渲染完成，并且`vm`实例中已经添加完`$el`了，已经替换掉那些DOM元素了（双括号中的变量），这个时候可以操作DOM了（但是是获取不了元素的高度等属性的，如果想要获取，需要使用`nextTick()`）

- ```
  beforeUpdate
  ```

  - `data`改变后，对应的组件重新渲染之前

- ```
  updated
  ```

  - `data`改变后，对应的组件重新渲染完成

- ```
  beforeDestory
  ```

  - 在实例销毁之前，此时实例仍然可以使用

- ```
  destoryed
  ```

  - 实例销毁后

## **9、面试官：vue中父子组件的生命周期**⭐⭐⭐⭐⭐

- 父子组件的生命周期是一个嵌套的过程
- 渲染的过程
  - 父`beforeCreate`->父`created`->父`beforeMount`->子`beforeCreate`->子`created`->子`beforeMount`->子`mounted`->父`mounted`
- 子组件更新过程
  - 父`beforeUpdate`->子`beforeUpdate`->子`updated`->父`updated`
- 父组件更新过程
  - 父`beforeUpdate`->父`updated`
- 销毁过程
  - 父`beforeDestroy`->子`beforeDestroy`->子`destroyed`->父`destroyed`



## **10、面试官：computed 、watch、method的区别**⭐⭐⭐⭐⭐

- computed
  - 计算属性，依赖其他属性，当其他属性改变的时候下一次获取computed值时也会改变，`computed`的值会有缓存
- `watch`
  - 类似于数据改变后的回调
  - 如果想深度监听的话，后面加一个`deep:true`
  - 如果想监听完立马运行的话，后面加一个`immediate:true`
- method
  - 在使用 method 的时候，是这样使用的`{{fn{xx}}}`，渲染的时候如果没有发生变化，这个也是会被执行的。而 `computed` 是有缓存的，如果没有变化就不用再去执行了



## **11、面试官：Vue优化方式**⭐⭐⭐⭐⭐

- v-if 和v-show
- 使用`Object.freeze()`方式冻结data中的属性，从而阻止数据劫持
- 组件销毁的时候会断开所有与实例联系，但是除了`addEventListener`，所以当一个组件销毁的时候需要手动去`removeEventListener`
- 图片懒加载
- 路由懒加载
- 为减少重新渲染和创建dom节点的时间，采用虚拟dom



## **12、面试官：Vue-router的模式**⭐⭐⭐⭐⭐

- hash模式
  - 监听hashchange事件实现前端路由，利用url中的hash来模拟一个hash，以保证url改变时，页面不会重新加载。
- history模式
  - 利用pushstate和replacestate来将url替换但不刷新，但是有一个致命点就是，一旦刷新的话，就会可能404，因为没有当前的真正路径，要想解决这一问题需要后端配合，将不存在的路径重定向到入口文件。



## **13、面试官：MVC与MVVM有什么区别**⭐⭐⭐⭐⭐

> 哎呀呀，这个要参考的就多了。
> [mvc和mvvm的区别](https://www.jianshu.com/p/b0aab1ffad93)
> [基于Vue实现一个简易MVVM](https://juejin.cn/post/6844904099704471559)
> [不好意思！耽误你的十分钟，让MVVM原理还给你](https://juejin.cn/post/6844903586103558158)

- MVC

  - Model（模型）是应用程序中用于处理应用程序**数据逻辑的部分**。通常模型对象负责在数据库中**存取数据**。**处理数据的crud**

  - View（视图）是应用程序中处理**数据显示的部分**。通常视图是依据模型数据创建的。**视图层，前端**

  - Controller（控制器）是应用程序中

    处理用户交互的部分

    。一般包括业务处理模块和router路由模块

    - 通常控制器负责**从视图读取数据，控制用户输入，并向模型发送数据**。

- mvvm

  - mvvm是前端图层的概念，mvvm是双向的，视图层可以通过 ViewModel 转换成模型层，模型层也可以通过 ViewModel 转换成视图层
    - Model（每个页面的单独的数据）
    - ViewModel （双向绑定，M和V之间的枢纽）
    - View（视图，相当于HTML结构）



## **14、diff算法**⭐⭐⭐⭐⭐

- diff算法是指对新旧虚拟节点进行对比，并返回一个patch对象，用来存储两个节点不同的地方，最后利用patch记录的消息局部更新DOM
- diff 算法
  - diff算法是虚拟节点的比较
  - 先进行key值的比较
  - 先进行同级比较，
  - 然后再比较是不是一方有儿子，一方没儿子
    - 如果是这样，直接在旧节点中插入或删除儿子即可
  - 在比较两方都有儿子的情况
    - 情况一：旧：ABCD，新：ABCDE；从头向尾比较，最后插入即可
    - 情况二：旧 ：ABCD，新：EABCD；从尾向头比较，最后插入即可
    - 情况三：旧：ABCD，新：DABC；头和尾先进行一次比对，发现D 时，把 D 移至前面，再继续从头向尾比较，
    - 情况四：旧：ABCD，新 BCDA；从头向尾比较后发现不对，就会从尾向头比，把 A 移至最后，再继续比较
    - 情况五：旧 ：ABCD，新CDME；从头向尾比较，把 CD 移至前面，最后 新建 ME，再把 CD 至为空
  - 递归比较子节点



## **15、虚拟DOM的优缺点**⭐⭐⭐⭐⭐

- 缺点
  - 首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢
- 优点
  - 减少了dom操作，减少了回流与重绘
  - 保证性能的下限，虽说性能不是最佳，但是它具备局部更新的能力，所以大部分时候还是比正常的DOM性能高很多的



## **16、Vue的Key的作用** ⭐⭐⭐⭐

- key
  - key主要用在虚拟Dom算法中，每个虚拟节点VNode有一个唯一标识Key，通过对比新旧节点的key来判断节点是否改变，用key就可以大大提高渲染效率，这个key类似于缓存中的etag。



## **17、为什么 v-for 会要有key？**⭐⭐⭐⭐⭐

因为在 vue 中会有一个 diff 算法，假如子节点 AB 调换了位置，它会比较 key 值，会直接调换，而不是一个销毁重新生成的过程



## **18、Vue组件之间的通信方式**⭐⭐⭐⭐⭐

- 子组件设置props + 父组件设置`v-bind:`/`:`

  - 父传子

- 子组件的$emit + 父组件设置`v-on`/`@`  自定义事件

  - 子传父

- 任意组件通信，新建一个空的全局Vue对象，利用e m i t 发 送 ， emit发送，emit发送，on接收

  - 传说中的$bus

  - 任意组件

  - ```js
        Vue.prototype.Event=new Vue();
    	
    
        Event.$emit(事件名,数据);
        Event.$on(事件名,data => {});
    12345
    ```

- Vuex

  - 里面的属性有：
    - state
      - 存储数据的
      - 获取数据最好推荐使用getters
      - 硬要使用的话可以用MapState， 先引用，放在compute中`...mapState(['方法名','方法名'])`
    - getters
      - 获取数据的
      - this.$store.getters.xxx
      - 也可使用mapGetters 先引用，放在compute中，`...mapGetters(['方法名','方法名'])`
    - mutations
      - 同步操作数据的
      - this.$store.commit(“方法名”,数据)
      - 也可使用mapMutations ，使用方法和以上一样
    - actions
      - 异步操作数据的
      - this.$store.dispatch(“方法名”,数据)
      - 也可使用mapActions ，使用方法和以上一样
    - modules
      - 板块，里面可以放多个vuex

- 父组件通过`v-bind:`/`:`传值，子组件通过`this.$attrs`获取

  - 父传子
  - 当子组件没有设置props的时候可以使用
  - `this.$attrs`获取到的是一个对象（所有父组件传过来的集合）

- 祖先组件使用provide提供数据，子孙组件通过inject注入数据

- p a r e n t / parent/parent/children

- refs—$ref



## **19、Vue-router有哪几种钩子函数**⭐⭐⭐⭐⭐

- beforeEach
  - 参数有
    - to(Route路由对象)
    - from(Route路由对象)
    - next(function函数) 一定要调用才能进行下一步
- afterEach
- beforeRouterLeave



## **20、为什么组件中 data 是个函数**⭐⭐⭐⭐⭐

在 Vue 底层中，在每次创建组件的时候，都会 new 一个VueComponent实例对象，他们的 data会挂载到VueComponent 的原型上共享，如果是一个对象的话，所有人都可以修改，但是如果是一个函数返回值的话就可以创建一个私有作用域来避免这个问题

vue 事件绑定原理

事件绑定分别分为组件事件绑定（ 例如@click.native） 和非组件事件绑定，然后再对两种情况分别去处理

，一种是 addEventListener 另一个是$on $emit



**`@click.sync` `native` `stop` `prevent` `self`分别是做什么的**⭐⭐⭐

`@click.sync` 语法

- `<comp :foo.sync="bar"></comp>` 相当于 `<comp :foo="bar" @update:foo="val => bar = val"></comp>`

`@click.native` 父组件的原生事件需要加上 native，否则不生效

`@click.stop` 是阻止冒泡

`@click.prevent` 是阻止默认行为

`@click.self` 点击自己的时候才能触发



## **21、v-model 的原理**⭐⭐⭐⭐⭐

- `:value` `@input` 的语法糖



## **22、v-html 回会导致什么问题**⭐⭐⭐⭐⭐

可能会造成 xss 攻击

v-html 会替换掉子标签



## **23、谈谈你对vue-router的 keep-alive 的理解**⭐⭐⭐⭐⭐

keep-alive 有一个最大缓存限制，使用的是 LRU（最久未使用法）（使用了就放到最上边，先删最下边）



## **24、vue3 的 proxy有什么优缺点**⭐⭐⭐⭐

- 优点：
  - 不会像 `Object.defineProperty`那样遍历 Vue 中的 data、computed、props 的全部属性。只是经过了一个类似于拦截的操作。
  - 而且也可以监听数组的变化，不会向曾经一样重写数组方法了；
- 缺点：
  - 对浏览器版本要求高，因为 polyfill 没有办法弥补 proxy，如果想弥补，最多还只是使用 `Object.defineProperty`



## **25、vue的$set是做什么的**⭐⭐⭐

- vue 中 data的数据，如果是对象的话，会把它的属性转为Object.defineProperty的getter和setter，使之变为响应式的。但是新增的属性不是响应式的。`this.$set(this.obj,'e',0)`



## **26、vue 常见的性能优化**⭐⭐⭐⭐⭐

- spa 使用 keep-alive **单页面**
- key 的使用
- v-if 和v-show
- v-if 不要和 v-for 一起使用
  - v-for 的优先级要早于 v-if，如果一起使用的话，会先遍历在判断 v-if，会造成性能问题；
- 使用`Object.freeze()`方式冻结data中的属性，从而阻止数据劫持
- 组件销毁的时候会断开所有与实例联系，但是除了`addEventListener`，所以当一个组件销毁的时候需要手动去`removeEventListener`
- 图片懒加载
- 路由懒加载
- 防抖节流
- 长列表固定个数
- 为减少重新渲染和创建dom节点的时间，采用虚拟dom



## **27、v-if 和 v-show 有什么区别**⭐⭐⭐⭐

- V-if如如果为 true 的话就会走正常流程创建 ast 语法树，如果为 false 的话就会创建一个空节点



## **28、vue3 相比于vue2有什么升级**⭐⭐⭐⭐

- 采用 ts 编写
- composition API
- 响应式原理使用的 proxy



## **29、什么是render函数**⭐⭐⭐

render是一个函数，该参数有一个createElement形参，这形参也作为一个方法（可以动态创建标签），可传入三个参数：标签名、属性、内容



## **30、documentFragment 和一次性渲染有什么不同**⭐⭐⭐⭐

- documentFrament 首先是虚拟的，它的节点增加与删除肯定不会引起 dom 的变化的，所以如果增加节点或者删除节点使用 createDocumentFrament 的话会减少回流的操作。
- Vue 也是使用了 CreateDocumentFragment 的。如果初次渲染，使用 documentFragment会多一个步骤，也就是创建这个documentFragment的步骤，所以一般首次加载是很慢的。





# 浏览器相关

**csrf 攻击原理**⭐⭐⭐⭐

- 跨域请求伪造
  - 用户登录了 A 页在不退出登录的情况下，访问了 危险网站B 页，这个时候 B 页带着 A 页的 cookie 向 A 的服务端发起请求，会让服务端认为这个是可信任用户，从而达到攻击的目的
  - 实现方式：
    - 在 B 页中可以使用一个隐藏的 iframe 来向 A 页发起请求，只要用户没有登出 A 网站，临时 cookie 一直保存在内存中，这个时候就可以危险网站B就可以拿着 cookie 为所欲为了
  - 防御方式
    - 添加token



**IPv4和 Ipv6的区别**⭐⭐⭐

IPV6的 IP 地址有32位增加到128位，寻址能力更强了

报头简化，虽然IPV6的IP地址是 IPv4的4倍，但是报头只有它的2倍

IPV6增加了身份验证、数据保密

更安全了

IPV6加强了对移动设备的支持



**浏览器不同标签是线程还是进程？**⭐⭐⭐⭐

chrome 不同标签之间是进程，其他浏览器是线程



**浏览器的多进程都有什么？**⭐⭐⭐

- Browser 主进程，只有一个
  - 负责页面交互；进程之间的协调的
- GPU 加速进程
- 渲染进程
  - 内部是多线程的
    - GUI 渲染线程
      - 用来渲染的，构建 DOM 树、render 树，回流重绘等
      - 与 JS 引擎线程互斥
    - JS 引擎线程
    - 事件触发线程
    - 定时触发器线程
    - 异步 http 请求线程
  - 每个页面的渲染进程互不影响
- 第三方插件进程



**为什么浏览器是多进程的？**⭐⭐⭐⭐

因为避免一个 tab页出错而导致整个浏览器崩溃



***\*浏览器每一帧都做了什么？\****⭐⭐⭐⭐

1. 首先对事件进行处理
   - 比如 click、touchmove 等等
2. requestAnimationFrame
   - 一般用来动画制作
3. 解析 HTML
4. 重新计算样式
5. 布局
6. 更新图层树
7. 绘制
8. 合成
9. 栅格化
10. 帧结束
    - 如果帧结束时，主线程还有时间，`requestIdleCallback`会被触发
11. 发送帧



**进程间的通信方式**⭐⭐⭐⭐

- 无名管道通信
  - 半双工通信，只能单向传输，一般用于父子通讯和兄弟通讯
- 有名管道通信
  - 半双工通信，只能单向传输，可以是无关进程之间通信
- 消息队列
- 信号量
- 共享内存



**图片加载会阻塞dom渲染吗？**⭐⭐⭐⭐⭐

图片不会阻塞dom解析和渲染，但是如果网页中有很多图片的话，会消耗大量的资源（引擎吞吐量、请求数等等），并发请求数量是有限的，如果多个图片同时请求可能会造成请求拥堵，导致其他资源无法被及时请求到，所以图片最好做成懒加载。



**进程和线程的区别**⭐⭐⭐⭐⭐

线程是进程中执行运算的最小单位，是进程中的一个实体。

进程是拥有资源的基本单位，而线程是调度和分配资源的基本单位

不同进程间可以并发至行；同一进程不同线程可以并发执行

进程是拥有资源的基本单位，而线程不拥有资源，但是可以访问它所在进程的资源



# Git

**Git 中 rebase 和 merge 的区别**⭐⭐⭐⭐⭐

都是合并分支，

rebase 不会产生额外的 commit，

而 merge 会把这两个分支的遗漏 commit 记录重新创建一个commit保存起来。比较臃肿，所以尽量不要用 merge。

**git fetch 和 git pull 的区别**⭐⭐⭐⭐⭐

git fetch 是把远程代码拉下来但是不会合并

git pull 会自动合并

**git的常用命令**⭐⭐⭐⭐⭐

- git add
- git commit
- git push
- git clone
- git pull
- git fetch
- git merge
- git rebase
- git log
- git status
- git branch
- git checkout

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210118180522806.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzMjc3NjU0,size_16,color_FFFFFF,t_70)

> [git常用命令与常见面试题总结](https://blog.csdn.net/qq_36095679/article/details/91804051)





# Webpack

**webpack常用字段及解释**⭐⭐⭐⭐⭐

- mode

  - 打包模式
    - production线上环境打包
    - development开发环境打包
  - 一般会把开发环境和生产环境分为两个文件
    - Webpack.base.config.js 公共配置
    - Webpack.dev.config.js 开发环境配置
    - Webpack.base.config.js 生产环境配置
    - 在使用 webpack-merge 中的 smart 进行合并

- entry

  - 入口文件

- output

  - 输出文件

- devServer

  - 热更新
  - 内部还有一个 proxy，可以进行网络请求转发代理配置

- module/rules 中可以配置loader //执行顺序,从下往上加载

  - ```js
    处理 CSS
    module:{
    	rules:[
    		{
    			//webpack 默认不能处理 css 模块的
    			test:/\.css$/,    //以 css 为结尾的文件
    			loader:[ //执行顺序，从下往上
    				'style-loader',  // 将 css 插入到 style标签里
    				'css-loader', // 处理 css 之间的依赖关系
    				'postcss-loader', // 处理 css 的兼容性  它会依赖一个 autoprefixer  顺便在 package.json 中需要配置 browserslist（用来配置目标环境的）
    				'sass-loader' // 处理预处理器
    			]
    		},
    	]
    }
    
    //以上的是把 css 编译到 js 中的了，但是如果想抽离需要使用到一个插件
    plugins:[
      new MiniCssExtractPlugin({
        filename: 'css/main[contentHash:8].css'
      })
    ]
    
    optimization: {
      minimizer:[
        // 压缩 JS
        new TerserPlugin()
        // 压缩 css
        new OptimizeCssAssetsWebpackPlugin()
      ]
    }
    
    module:{
    	rules:[
    		{
    			test:/\.css$/,
    			loader:[
    				MiniCssExtractPlugin.loader,  // 将 css 插入到 link 中引入
    				'css-loader',
    				'postcss-loader',
    				'sass-loader'
    			]
    		},
    	]
    }
    123456789101112131415161718192021222324252627282930313233343536373839404142434445
    ```

  - ```js
    处理图片
    // 开发环境
    module:{
    	rules:[
    	{
    			//webpack 默认不能处理 图片 模块的
    			test:/\.(png|jpg)$/,    //以 png或jpg 为结尾的文件
    			loader:[ //执行顺序，从下往上
    				'file-loader',
    			]
    		},
    	]
    }
    
    
    // 生产环境
    module:{
    	rules:[
    	{
    			//webpack 默认不能处理 图片 模块的
    			test:/\.(png|jpg)$/,    //以 png或jpg 为结尾的文件
    			use:{
            loader:'url-loader',
            options:{
              limit:5 * 1024 //小于这个范围的时候通过 base64 解析，可以减少 http 请求
            }
          }
    		},
    	]
    }
    123456789101112131415161718192021222324252627282930
    ```

- optimization

  - ```js
    optimization: { // 用来分包和压缩的
      // 代码压缩
      minimizer:[
        // 压缩 JS
        new TerserPlugin()
        // 压缩 css
        new OptimizeCssAssetsWebpackPlugin()
      ]
      
      // 代码分割
      splitChunks: {
        // 分为两种代码分割
        // 同步代码 例如 import { lodash } from 'lodash'
        // 异步代码 例如 import('lodash')
     		// all 对同步代码、异步代码都做分割
        // async 只对异步代码做分割
        // initial 只对同步代码做分割
        chunks:'all',
        cacheGroups:{
          ....
        }
        
      }
    }
    123456789101112131415161718192021222324
    ```

- plugins插件

```js
//以上的是把 css 编译到 js 中的了，但是如果想抽离需要使用到一个插件
plugins:[
  new MiniCssExtractPlugin({
    filename: 'css/main[contentHash:8].css'
  })
]
123456
```



**plugins 和 loader 有什么区别？**⭐⭐⭐⭐⭐

loader 是解析规则，因为 webpack 默认只能解析js，所以需要在 loader 里面配置一些规则

plugin 是插件，是用来扩展 webpack 的功能的，比如压缩代码，提取公共代码



**输出文件名的 hash、chunkhash 和 contenthash 有什么区别？**⭐⭐⭐⭐

- hash 模式
  - 只要修改一个文件，整个项目的文件命名都会改变，不能进行缓存
- chunkhash 模式
  - 根据入口文件命名
- contenthash 模式
  - 根据内容生成命名，进行缓存



**什么是 polyfill？**⭐⭐⭐⭐

polyfill 英文翻译过来是腻子。实际上就是针对各个浏览器的 js 差异做出抹平处理的。就比如说html5的localStorage、sessionStorage，不同浏览器不同版本有些支持，有些不支持，这个时候就可以用到 polyfill 把这些差异抹平。



**什么是 tree-shaking？**⭐⭐⭐⭐

在做项目的时候，难免会封装一些方法，比如我封装了加的方法、减的方法、乘的方法、除的方法，结果项目中值引用了加的方法，如果正常打包的会，其他方法也会被打包到 bundle 中，这个时候我们就可以使用 tree-shaking ，这样就不会把多余的内容打包了。



**webpack externals是做什么的**⭐⭐⭐

不想把某个东西打包出来，就可以用 externals，而是用的是 CDN



**babel 实现原理**⭐⭐⭐

首先 babel 是会把 es6语法转成 es5语法的，先把 js 代码转化成 AST 语法树，然后根据语法树在生成对应的 es5的代码



**jsbridge**⭐⭐⭐

主要是给 JavaScript 提供调用 [Native](https://so.csdn.net/so/search?q=Native) 功能的接口，让混合开发中的前端部分可以方便地使用 Native 的功能

写树的结构

webpack 从0搭建 （图片处理等等）

Es6转 es5 babel-loader

图片 url-loader



**webpack常用的loaders**⭐⭐⭐⭐

- vue-loader：加载vue文件

- babel-loader：加载js文件，并用babel进行转换，可配置.babelrc文件

- file-loader：加载图片或其他媒体文件，解析url

- url-loader：与file-loader基本相同，但对于小于指定limit大小的图片，会转换为base64这样做可以

  减少网络请求，但会增加打包后的文件大小

- svg-sprite-loader：加载svg并组装成雪碧图



**自定义 loader**⭐⭐⭐

使用一个loaderUtils 可以获取loader 配置的 options（ 一个getOptions的 API），然后再进行一系列操作，最后 return。然后把这个方法 model.exports 就可以了



**Vite为什么这么快**⭐⭐⭐⭐

- 部分文件设置了强缓存，每次在本地读取
- 采用esbuild
  - 采用Go语言编写，更接近机器码
  - 大量使用并发算法



**Vite和webpack有什么区别**⭐⭐⭐⭐

- webpack是node编写的，而vite是采用Go语言编写，更接近机器码，而且使用esbuild预购建依赖，打包会比之前快10～100倍
- 热更新的时候，webpack需要重新构建整个包；而vite只需构建修改了的模块，而且vite使用了浏览器缓存来加速构建
- vite的生态没有webpack丰富，webpack的plugin和loader相当的丰富

# 算法

**常见的查找算法有哪些**⭐⭐⭐

- 顺序搜索
- 二分搜索
  - 前提：有顺序
- 二叉树搜索
  - 前提：左子树小于根节点，右子树大于根节点
- 哈希搜索
- 分块查找
  - 前提：块之间有序，块内可无序

**Set Map WeakSet WeakMap 有什么区别**⭐⭐⭐

- Set
  - 成员唯一、无序且不重复；
  - [value, value]，键值与键名是一致的（或者说只有键值，没有键名）；
  - 可以遍历，方法有：add、delete、has；
- WeakSet
  - 成员都是对象；
  - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏；
  - 不能遍历，方法有add、delete、has；
- Map
  - 本质上是键值对的集合，类似集合；
  - 可以遍历，方法很多可以跟各种数据格式转换；
- WeakMap
  - 只接受对象作为键名（null除外），不接受其他类型的值作为键名；
  - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的；
  - 不能遍历，方法有get、set、has、delete；

**lru实现**⭐⭐⭐⭐
**最少使用置换算法**

```js
 	function LRU(length) {
      this.length = length;
      this.arr = [];
    }

    LRU.prototype.get = function (key) {
      let index = this.arr.findIndex(item => item.key = key);
      if (index == -1) return -1

      const result = this.arr.splice(index, 1)

      this.arr.push(result)

      return result.val
    }

    LRU.prototype.set = function(key, val) {
      let index = this.arr.findIndex(item => item.key = key);
      if(index !== -1){
        this.arr.splice(index, 1)
      }
      this.arr.push({
        key,
        val
      })

      if(this.arr.length > this.length) {
        this.arr.shift();
      }
    }
123456789101112131415161718192021222324252627282930
```

**二叉树广度优先**⭐⭐⭐⭐

```js
    function guangduFirst(root) {
      let arr = [];
      arr.push(root);
      let i = 0;
      while (i < arr.length) {
        console.log(arr[i].val);
        if (arr[i].left) {
          arr.push(arr[i].left);
        }
        if (arr[i].right) {
          arr.push(arr[i].right);
        }

        i++;
      }
    }
12345678910111213141516
```



**讲一讲kmp算法**⭐⭐⭐

- kmp算法是字符串匹配算法，这里不要求会写源码，但是需要了解大致原理

[KMP算法易懂版](https://www.bilibili.com/video/BV1jb411V78H?from=search&seid=5860585424672224536&spm_id_from=333.337.0.0)



**是否回文**⭐⭐⭐⭐⭐

```js
    function isHuiWen(str) {
      return str == str.split("").reverse().join("")
    }

    console.log(isHuiWen("mnm")); 
12345
```

**正则表达式，千分位分隔符**⭐⭐⭐⭐

```js
    function thousand(num) {

      return (num+"").replace(/\d(?=(\d{3})+$)/g, "$&,")
    }
    console.log(thousand(123456789));
12345
```

**斐波那契数列**⭐⭐⭐⭐⭐

```js
    // num1前一项
    // num2当前项
    function fb(n, num1 = 1, num2 = 1) {
      if(n == 0) return 0
      if (n <= 2) {
        return num2
      } else {
        return fb(n - 1, num2, num1 + num2)
      }
    }
12345678910
```

**数组去重的方式**⭐⭐⭐⭐⭐

```js
    var arr = [1, 2, 1, 1, 1, 2, 3, 3, 3, 2]

    // 最low1
    let newArr2 = []
    for (let i = 0; i < arr.length; i++) {
      if (!newArr2.includes(arr[i])) {
        newArr2.push(arr[i])
      }
    }
    console.log(newArr2);
    // 最low2
    let arr2 = [1, 2, 1, 1, 1, 2, 3, 3, 3, 2]
    for (let i = 0; i < arr2.length; i++) {
      var item = arr2[i]
      for (let j = i + 1; j < arr2.length; j++) {
        var compare = arr2[j];
        if (compare === item) {
          arr2.splice(j, 1)
          j--
        }
      }
    }
    console.log(arr2);


    // 基于对象去重
    let arr3 = [1, 2, 1, 1, 1, 2, 3, 3, 3, 2]
    let obj = {}
    for (let i = 0; i < arr3.length; i++) {

      let item = arr3[i]
      if (obj[item]) {
        arr3[i] = arr3[arr3.length - 1]
        arr3.length--
        i--
        continue;
      }
      obj[item] = item

    }
    console.log(arr3);
    console.log(obj);

    // 利用Set
    let newArr1 = new Set(arr)
    console.log([...newArr1]);


    let arr4 = [1, 2, 1, 1, 1, 2, 3, 3, 3, 2]

    //利用reduce
    newArr4 = arr4.reduce((prev, curr) => prev.includes(curr)? prev : [...prev,curr],[])
    console.log(newArr4);
    console.log(document);
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354
```

**大数相加**⭐⭐⭐⭐⭐

```js
// 使用 bigInt（结尾加个 n） 
function add(a, b) {
  var c = BigInt(a) + BigInt(b)
  // 如果不使用 toString 的话，末尾会有一个 n
  return c.toString()
}

// 方法二
function add2(a, b) {
    let maxL = Math.max(a.length, b.length)
    a = a.padStart(maxL, 0)
    b = b.padStart(maxL, 0)
    let result = []
    let add = 0
    for(let i = a.length - 1; i >= 0; i--) {
        let sum = (+a[i]) + (+b[i])
        let cur = sum % 10 + add
        add = sum >= 10 ? 1 : 0
        result.unshift(cur)
    }
    if(add === 1) {
        result.unshift('1')
    }
    return result.join('')
}
12345678910111213141516171819202122232425
```

**讲一讲B树**⭐⭐

![在这里插入图片描述](https://img-blog.csdnimg.cn/8d6b1f5cf4bc4ee29fbc121874310ddc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

B树又叫B-树，一颗m阶的B树满足以下特征

- 每个节点最多有m-1个关键字，或者说最多有m颗子树

- 除根节点外，所有非叶结点（叶节点的概念在下面）最少含有

  ```
  ceil(m / 2) - 1
  ```

   

  个关键字，也就是最少含有

  ```
  ceil(m / 2)
  ```

  颗子树(

  ```
  ceil
  ```

  为向上取整)

  - 比如一个7阶B树，它的节点关键字数目在36之间；5阶B树，24之间；

- 叶节点不带任何信息，实际上是不存在的。所有叶节点都在同一层上，没有指向下一层的指针，一般用来作为查找失败的条件。

- 所有非叶节点的结构为

  ```
  n, P0, K1, P1, K2, P2, K3, P3, .... , Kn, Pn
  ```

  - 其中K是关键字，且为升序排列， P为指针

B树的插入，

- 分裂
  - 如果没有超出关键词限额的话正常插入，如果超出的话，则需要分裂
  - 从中间位置（m / 2）进行分裂， 左边的关键字在原节点，右边的在新节点，中间的放在原节点的父节点上。
  - 如果父节点也超出了上限，则父节点也分裂，直到递归到根节点，如果根节点满了，则新创建根节点，树的高度加一

一颗m阶B+树满足以下特征

- 树中每个节点最多有m个关键字，且最多有m颗子树（子树数量和关键字数目相同），指针是从关键字触发的，而B-树的指针是在关键词两边的
- 除根节点外，每个节点最少含有m/2个关键字，最少含有m/2个子树
- 所有的叶节点是包含全部的关键字和指向记录的指针的，叶节点关键字有序排列，叶节点之间也是有序排列，指针相连
- B+树又可以从根节点开始查找，也可以从叶节点开始查找

![在这里插入图片描述](https://img-blog.csdnimg.cn/b5a047c79a8746c0a58272763a347b21.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)





## 常见的排序算法

> 这里推荐一个排序算法的动画网站，应该是一个国外团队做的，[Sorting Algorithms](http://math.hws.edu/eck/jsdemo/sortlab.html)

**冒泡算法排序**⭐⭐⭐⭐⭐

```js
    // 冒泡排序
    /* 1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。

　　　2.第一轮的时候最后一个元素应该是最大的一个。

　　　3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。 */
    function bubbleSort(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j] > arr[j + 1]) {
            var temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
    }

    var Arr = [3, 5, 74, 64, 64, 3, 1, 8, 3, 49, 16, 161, 9, 4]
    console.log(Arr, "before");
    bubbleSort(Arr)
    console.log(Arr, "after");
12345678910111213141516171819202122
```

**选择排序**⭐⭐⭐⭐⭐

```js
    // 选择排序---从第一个开始在后面比较，找出最小的交换
    function selectSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            let minIndex = i
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[minIndex] > arr[j]) {
                    minIndex = j
                }
            }
            let temp = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = temp
        }
        return arr
    }

    console.log(selectSort(array));
    console.log(array);
123456789101112131415161718
```

**快速排序**⭐⭐⭐⭐⭐

```js
    /*
    快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。
    然后递归调用，在两边都实行快速排序。  
    */
    // 左右各一列，左边放小的，右面放大的；不停的划分的过程
    
    function quickSort(arr) {
      if (arr.length <= 1) {
        return arr
      }
      var middle = Math.floor(arr.length / 2)
      var middleData = arr.splice(middle, 1)[0]

      var left = []
      var right = []
      
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < middleData) {
          left.push(arr[i])
        } else {
          right.push(arr[i])
        }
      }

      return quickSort(left).concat([middleData], quickSort(right))
    }

    var Arr = [3, 5, 74, 64, 64, 3, 1, 8, 3, 49, 16, 161, 9, 4]
    console.log(Arr, "before");
    var newArr = quickSort(Arr)
    console.log(newArr, "after");
12345678910111213141516171819202122232425262728293031
```

**插入排序**⭐⭐⭐⭐

```js
    function insertSort(arr) {
      // 默认第一个排好序了
      for (var i = 1; i < arr.length; i++) {
        // 如果后面的小于前面的直接把后面的插到前边正确的位置
        if (arr[i] < arr[i - 1]) {
          var el = arr[i]
          arr[i] = arr[i - 1]
          var j = i - 1
          while (j >= 0 && arr[j] > el) {
            arr[j+1] = arr[j]
            j--
          }
          arr[j+1] = el
        }
      }
    }

    var Arr = [3, 5, 74, 64, 64, 3, 1, 8, 3, 49, 16, 161, 9, 4]
    console.log(Arr, "before");
    insertSort(Arr)
    console.log(Arr, "after");
123456789101112131415161718192021
```

**希尔排序**⭐⭐⭐

```
    // 希尔排序---升级的插入排序
    function shellSort(arr) {
        for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < arr.length; i++) {
                let cur = arr[i]
                let j = i
                while (j - gap >= 0 && cur < arr[j - gap]) {
                    arr[j] = arr[j - gap]
                    j -= gap
                }
                arr[j] = cur
            }
        }
        return arr
    }
123456789101112131415
```

**归并排序**⭐⭐⭐⭐

```js
    // 归并排序  先分为最小单位，再排序
    function mergeSort(arr) {
        if (arr.length < 2) return arr

        let middle = Math.floor(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle)

        return merge(mergeSort(left), mergeSort(right))
    }

    function merge(left, right) {
        let result = []
        while (left.length > 0 && right.length > 0) {
            if (left[0] >= right[0]) {
                result.push(right.shift())
            } else {
                result.push(left.shift())
            }
        }
        while (left.length) {
            result.push(left.shift())
        }
        while (right.length) {
            result.push(right.shift())
        }

        return result
    }
1234567891011121314151617181920212223242526272829
```







> **震惊！你竟然看完了**
> 你现在的技术水平和尤雨溪加起来堪比尤雨溪！加油！你是最棒的！

![在这里插入图片描述](https://img-blog.csdnimg.cn/fb523a32624d447cab4ee9dab259839d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_20,color_FFFFFF,t_70,g_se,x_16)

ok，今天的文章就到这里了。

- 如果你觉得文章不错的话，可以收藏点赞，也可以关注上我，之后我可能还会根据当年的面试题走向更新最新的面试题的！
- 如果你觉得文章特别水的话























![在这里插入图片描述](https://img-blog.csdnimg.cn/ee623289a0b2498a8ea3ecef43adb6ca.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_20,color_FFFFFF,t_70,g_se,x_16)

##              

还是熟悉的配方，文章结尾再打个广告叭，要喷的话请温柔一些。
如果有什么迷茫或者不懂的地方，或者想跟大家**一起讨论**面试题。
欢迎加微信**进群**一起讨论[前端面试](https://so.csdn.net/so/search?q=前端面试&spm=1001.2101.3001.7020)题。
这样你也**不再迷茫**，俺也能写出更好的文章，两全其美，岂不美哉？
加好友记得备注 csdn哦！

![在这里插入图片描述](https://img-blog.csdnimg.cn/c47065d33296432d8b5a1e1fda8834bd.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/7a86866fed2d43849d813f1ec57f928b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5pmf5bCP5piO,size_12,color_FFFFFF,t_70,g_se,x_16#pic_center)