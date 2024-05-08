# js执行过程

JavaScript代码的执行过程可以分为三个阶段：解析（Parsing）、编译（Compilation）和执行（Execution）

1. 词法分析：将代码的字符串分析得到词法单元token
2. 语法分析：将词法单元流解析成AST（抽象语法树），该过程包括词法作用域的生成、变量提升等阶段
3. 代码生成：AST转换成字节码，这部分有V8中的lgnition解释器来生成的
4. 代码执行：逐条解释执行字节码，注意了，当 V8 发现有大量重复字节码时（热点代码 HotSpot ），会将其编译成机器码（由引擎中 TurboFan 编译器进行编译），下次再碰到类似字节码不需要解释，直接执行，这种与解释器配合的过程也称为 ***JIT （即时编译）***。
5. 垃圾回收



# 作用域与作用域链、原型与原型链

在es5之前，js只有**全局作用域**及**函数作用域**。es6引入了块级作用域。但是这个块级别作用域需要注意的是不是`{}`的作用域，而是`let`，`const`关键字的**块级作用域**

作用域链：[[scope]]中所存储的执行期上下文对象的`集合`，这个集合呈`链式连接`，我们把这种链式连接叫做`作用域链`

copy from [掘金文章地址](https://juejin.cn/post/7287524648808366091)

很明了，就不自己写了:smile:

#### 函数

先来看一下上古时期的工作中我们是如何定义函数的，直接使用 `function` 关键字来声明

```js
function fun() {}
```

但是有的时候我们会发现函数也会用下面的这种格式来定义

```js
function Fun() {}
```

除了第二个 **函数名的首字母大写之外**，本质上两者毫无区别 

#### 函数名首字母大写的意义

当我们需要将一个函数作为 **构造函数** 使用时，通常会将函数名首字母大写，为了看起来规范一些，仅此而已 

#### 实例化

对 **构造函数** 使用 `new` 关键字可以创建出不同的 **实例（实例的本质就是一个对象）**，就好比说：你没有女朋友，但是你可以准备一个构造函数 new 很多女朋友出来，就是这个意思！

#### 开造

- 构造函数（女朋友构造器）：

```js
function GirlFriend() {}
```

- 创建第一个 gf1 （实例对象）

```javascript
const gf1 = new GirlFriend()

gf1.name = '小美'
gf1.age = 18

console.log(gf1)  // {name: '小美', age: 18}
```

- 创建第二个 gf2 （实例对象）

```javascript
const gf2 = new GirlFriend()

gf2.name = '小丽'
gf2.age = 19

console.log(gf2) // {name: '小丽', age: 19}
```



#### 关联

- `GirlFriend` 是一个 **构造函数**
- `gf1` 和 `gf2` 是通过 `new GirlFriend` 创建出来的两个 **实例对象**

那如何将 **实例对象** 和 **构造函数** 联系在一起呢？

- 在 **实例对象** 上会默认存在一个属性叫做 `__proto__`，这里记作 **隐式原型**
- 在 **构造函数** 上会默认存在一个属性叫做 `prototype`，这里记作 **显示原型 **

通常我们所说的 **原型对象** 也就是指这里的 `prototype`，**原型对象** 上的 `constructor`属性可以直接访问该 **构造函数**（这里建议手动打印观察一下）
默认情况下，**实例对象** 的 `__proto__` 指向 **构造函数** 的 `prototype`，如果你想访问某个实例的原型对象，就可以通过如下关系来进行访问

```javascript
console.log(GirlFriend.prototype.constructor) // ƒ GirlFriend() {}
gf1.__proto__ === GirlFriend.prototype // true
gf2.__proto__ === GirlFriend.prototype // true
```



#### 访问

当我需要访问 **实例对象** 上存在的属性，比如 `name` 时：

```javascript
console.log(gf1.name) // '小美'
console.log(gf2.name) // '小丽'
```

当我需要访问 **实例对象** 上不存在的属性，比如 `feature` 时：

```javascript
console.log(gf1.feature) // undefined
console.log(gf2.feature) // undefined
```

因为没有这个属性，自然而然就会打印 `undefined`
但如果说我想添加一个共同的属性给所有被 **实例化的对象** 时，我该如何去处理呢？

- 上面已经说明，被同一个 **构造函数** 创建出来的 **实例对象** ，默认情况下他们的 **隐式原型** 都会指向该构造函数的 **显示原型** ，也就是 `GirlFriend.prototype`，因此我只需要在往这个原型上去添加就好

```javascript
GirlFriend.prototype.feature = 'beautiful'
```

此时再次访问实例上的 `feature`属性，最终即可得到正常的打印

```javascript
console.log(gf1.feature) // beautiful
console.log(gf2.feature) // beautiful
```

如果说我想单独给 `gf1` 添加不一样的 `feature` 再访问呢

```javascript
gf1.feature = 'pretty'

console.log(gf1.feature) // pretty
console.log(gf2.feature) // beautiful
```

但是，为什么我给 **显示原型** 添加的属性可以直接通过实例对象进行访问呢？ 

#### 原理

1. 每一个被 **构造函数** 创建的 **实例对象** 都是一个全新的 **对象** ，我们可以为该对象添加本身特有的属性
2. 当我们尝试访问 **实例对象** 上的某个属性时，如果存在则会直接返回该属性的值；如果不存在，就会沿着 **实例对象** 的 `__proto__` 继续向上访问，如果查找到则会返回该属性的值，如果没有找到，则会返回 `undefined`

![Snipaste_2024-01-30_18-45-43](data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1178 921"></svg>)

#### 注意

为了更加清晰的了解原型，这里我们再提及 js 中几个比较关键的点 

###### 普通对象 - object

- 只要是一个普通对象`object`，就可以用 `new Object()` 来实例化（**Object() 是一个内置的构造函数**），也就是说，所有的对象字面量都是 `Object()` 的实例
- `Object` 作为构造函数，`Object.prototype` 指向一个具体的 **原型对象** ，该 **原型对象** 作为对象的实例，它的 `__proto__` 值为 `null`，因而 `Object.prototype.__proto__ = null` 时也就走到了 **原型的尽头**

```javascript
const obj = {}
const obj1 = new Object()

console.log(obj.__proto__ === obj1.__proto__)  // true
console.log(obj1.__proto__ === Object.prototype) // true
console.log(Object.prototype.____proto__) // null
```

![](data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1328 740"></svg>)

回到上面那个例子，当我要访问 **实例对象** `gf1` 上的属性时：

- 如果该属性存在，就会直接返回对应的值

- 如果该属性不存在，就会沿着 

  ```
  gf1.__proto__
  ```

   进行查找，本质上查找的就是 

  ```
  GirlFriend.prototype
  ```

   这个对象

  - 如果该属性存在，就会直接返回对应的值
  - 如果该属性不存在，那么 `GirlFriend.prototype`作为 `Object`的实例对象，其本身也是存在`__proto__`属性的，所以会沿着 `GirlFriend.prototype.__proto__`来进行查找，本质上查找的就是`Object.prototype`
    - 如果该属性存在，就会直接返回对应的值
    - 如果不存在，就会查找接着查找 `Object.prototype.__proto__` ，此时 `Object.prototype.__proto__` 值为 `null` ，最终没有找到该属性，打印 `undefined`

这个顺序很好理解

1. `gf1.xx`
2. `gf1.__proto__.xx`
3. `gf1.__proto__.__proto__.xx`
4. `gf1.__proto__.__proto__.__proto__.xx`

当最终 `__proto__` 为 `null` 都没有找到时就会打印 `undefined`
因此，沿着 `__proto__` 访问对象属性构成的这一条链也就是平时所说的 **原型链** 

###### 特殊对象 - function

- `function` 也算是一类特殊的对象，因此可以直接通过属性的形式来进行变量的访问
- 已经内置了 **Function() 构造函数** ，因而 **所有函数** 都算作是 `Function` 的 **实例对象**
  - 当 `Function` 作为 **构造函数** 时，可以访问其 `prototype` 属性
  - 当 `Function` 作为 **实例对象** 时，可以访问其 `__proto__` 属性

```javascript
// 在 Function 这里就是：我实例化了我寄几
console.log(Function.__proto__ === Function.prototype) // true
console.log(Function.prototype.constructor === Function) // true
```

- 内置的 `Object()` 也是一个函数，因此 `Object` 也是我 `Function` 的 **实例对象**

```javascript
console.log(Object.__proto__ === Function.prototype) // true
```

![](data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1263 923"></svg>)

#### 经典图示

![](/Users/mac/Desktop/test/TestCase/笔记/语言/javascript/image/Snipaste_2024-01-30_18-51-00.png)



# 执行上下文与闭包

在JavaScript中，执行上下文（execution context）是一个关键概念，与闭包（closure）密切相关。理解执行上下文如何与闭包交互可以帮助我们深入理解闭包的工作原理和行为。

执行上下文是JavaScript代码执行时的环境。它包含了变量、函数声明、作用域链等信息，用于管理和跟踪代码的执行过程。当一个函数被调用时，就会创建一个新的执行上下文。每个执行上下文都有自己的词法环境（Lexical Environment），用于存储变量和函数的声明。

在理解闭包之前，让我们先了解一下执行上下文的创建和销毁过程。当函数被调用时，会创建一个新的执行上下文，并将其推入执行上下文栈（execution context stack）中。当函数执行完毕后，其执行上下文会从栈中弹出并销毁。

现在，让我们通过一个例子来更具体地了解执行上下文和闭包之间的关系：

```javascript
function outerFunction(outerVariable) {
  function innerFunction(innerVariable) {
    console.log('outerVariable:', outerVariable);
    console.log('innerVariable:', innerVariable);
  }
  return innerFunction;
}

var newFunction = outerFunction('outside');
newFunction('inside'); // 输出: outerVariable: outside innerVariable: inside
```

在这个例子中，当调用`outerFunction`时，会创建一个新的执行上下文，其中包含了`outerVariable`参数和`innerFunction`函数声明。然后，`outerFunction`返回了`innerFunction`，并将其赋值给变量`newFunction`。

现在让我们来看看闭包是如何形成的。当`innerFunction`被返回时，它会携带其词法环境（包含`outerVariable`）一起返回。这意味着`innerFunction`保持对`outerVariable`的引用，即使`outerFunction`执行完毕并且其执行上下文已经销毁。

这就是闭包的力量所在。它允许内部函数（`innerFunction`）访问其词法环境中的变量（`outerVariable`），即使这些变量在其创建时的执行上下文已经不存在。

在这个例子中，`newFunction`就是一个闭包。它引用了外部函数`outerFunction`的词法环境，其中包含了`outerVariable`变量。因此，当我们调用`newFunction`时，它可以访问并打印出`outerVariable`和`innerVariable`的值。

执行上下文和闭包的关系是密不可分的。闭包是由执行上下文中的变量引用形成的，而这些变量保留在闭包的作用域中。这使得闭包能够在函数执行完成后继续访问这些变量，实现了JavaScript中非常重要的特性。

理解执行上下文和闭包的交互对于编写复杂的JavaScript代码非常重要。它有助于我们更好地理解作用域、变量的生命周期以及如何正确使用闭包来解决问题。同时，它也帮助我们避免一些潜在的问题，如内存泄漏和不必要的资源消耗。

## 闭包的作用

### 1. 数据封装和私有性

闭包可以用于创建私有变量，将变量隐藏在函数作用域内部，从而实现数据的封装和私有性。通过闭包，我们可以控制变量的访问权限，只暴露需要暴露的接口。这种封装机制可以防止外部代码直接访问和修改内部数据，增加代码的安全性。

```javascript
function createCounter() {
  let count = 0;
  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 输出: 2
```

在这个例子中，`createCounter`函数返回一个对象，该对象包含了三个闭包函数，分别用于增加计数、减少计数和获取计数值。通过闭包，我们可以将`count`变量隐藏在函数内部，并通过闭包函数来操作和访问这个变量。

### 2. 模块化编程

闭包可以用于实现模块化编程，将相关的变量和函数组织在一个闭包内部，形成一个模块。这样可以避免全局命名冲突，提供命名空间，并且允许模块内部的函数相互调用和共享数据。

```javascript
var myModule = (function () {
  var privateVariable = '私有变量';

  function privateFunction() {
    console.log('私有函数');
  }

  return {
    publicMethod: function () {
      console.log(privateVariable);
    },
    publicFunction: function () {
      privateFunction();
    }
  };
})();

myModule.publicMethod(); // 输出: 私有变量
myModule.publicFunction(); // 输出: 私有函数
```

在这个例子中，我们使用了立即调用函数表达式（IIFE）来创建一个闭包，形成一个独立的模块。模块内部的变量和函数对外部是不可见的，只有通过公共接口才能访问。

### 3. 回调函数和事件处理

闭包常常用于处理回调函数和事件处理，特别是在异步编程中。由于闭包的特性，它可以捕获外部函数的上下文，并在内部函数被调用时保留这个上下文，从而实现对异步操作的响应。

```javascript
function fetchData(url, callback) {
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    callback(data);
  });
}

function processData(data) {
  console

.log(data);
}

fetchData('https://api.example.com/data', processData);
```

在这个例子中，`fetchData`函数通过闭包捕获了`processData`函数作为回调函数。当异步操作完成时，它会调用回调函数并传递数据给它。闭包保持了回调函数的上下文，使得回调函数可以访问外部的`processData`函数。

### 4. 缓存和记忆化

闭包还可以用于实现缓存和记忆化功能。通过闭包，我们可以在函数内部维护一个缓存，避免重复计算相同的结果，提高函数执行的性能。

```javascript
function memoizedFunction() {
  var cache = {};
  return function (arg) {
    if (cache[arg]) {
      return cache[arg];
    }
    // 计算结果
    var result = // ...
    cache[arg] = result;
    return result;
  };
}

var memoized = memoizedFunction();
console.log(memoized('value')); // 第一次计算并缓存结果
console.log(memoized('value')); // 直接从缓存中读取结果
```

在这个例子中，`memoizedFunction`返回一个闭包函数，用于记忆化计算结果。闭包内部维护了一个缓存对象`cache`，当输入相同的参数时，直接从缓存中读取结果，避免重复计算。

闭包在JavaScript中有许多其他的应用场景，如实现延迟执行、函数柯里化、实现迭代器等。了解闭包的应用场景可以帮助我们写出更加优雅、高效的代码，并利用闭包的强大能力解决问题。

## 闭包的优缺点

当谈到闭包的缺点时，主要涉及内存消耗、内存泄漏和性能影响。下面是一些代码示例，帮助我们理解这些缺点。

### **1. 内存消耗**

闭包会导致内存占用增加，因为它们会保留对外部变量的引用，即使外部函数执行完毕。这可能会导致内存占用过高。

```javascript
function createHugeArray() {
  var arr = new Array(1000000).fill('Huge Data');
  return function() {
    console.log(arr.length);
  };
}

var bigDataFunc = createHugeArray();
bigDataFunc(); // 输出: 1000000
```

在这个例子中，`createHugeArray`函数返回一个闭包函数，它引用了一个巨大的数组`arr`。即使`createHugeArray`执行完毕，`arr`仍然被闭包引用，无法被垃圾回收机制回收，从而导致内存占用增加。

### **2. 内存泄漏**

由于闭包会持有对外部变量的引用，如果不正确地处理闭包的使用，可能会导致内存泄漏。如果一个闭包长时间存在，但不再需要，它会一直持有对外部变量的引用，使这些变量无法被垃圾回收。

```javascript
function leakMemory() {
  var data = 'Sensitive Data';
  var timer = setInterval(function() {
    console.log(data);
  }, 1000);
}

leakMemory();
```

在这个例子中，`leakMemory`函数创建了一个闭包，它引用了一个定时器内部的函数。即使`leakMemory`执行完毕，定时器仍然在持续执行，因此闭包会一直存在并引用`data`变量，导致`data`无法被垃圾回收。

### **3. 性能影响**

闭包可能对性能产生一定的影响，特别是在涉及大量变量或复杂词法环境的情况下。闭包的创建和执行可能消耗更多的时间和资源。

```javascript
function calculate() {
  var result = 0;
  for (var i = 0; i < 1000000; i++) {
    result += i;
  }
  return function() {
    console.log(result);
  };
}

var expensiveFunc = calculate();
expensiveFunc(); // 输出: 499999500000
```

在这个例子中，`calculate`函数返回一个闭包函数，它引用了一个在循环中计算的结果。由于闭包保留了这个结果，闭包的执行可能会耗费更多的时间和资源。

为了减少闭包的缺点，我们可以采取以下措施：

- 优化内存使用：在闭包中避免持有大量数据或不必要的引用。确保只

保留必要的变量和引用。

- 及时清理闭包：在不需要使用闭包时，手动解除对闭包的引用，以便垃圾回收机制可以回收闭包相关的资源。
- 避免滥用闭包：只在必要的情况下使用闭包，避免在不必要的场景中使用闭包。
- 优化性能：在闭包的创建和使用过程中，尽量避免不必要的计算或资源消耗，以提高性能。

通过合理使用和处理闭包，我们可以最大限度地减少其缺点，同时享受闭包在JavaScript中带来的强大功能。





# 变量提升

```js
console.log(a)  //输出的是undifined，而不是ReferenceError
var a = 10  

foo() //这个函数是undifined，报错
var foo = function () {
  console.log("foo1")
}
```

- var定义的变量会变量提升，所以声明会被拿到函数或全局作用域的顶部，并且输出undifined。所以执行foo()的时候，foo是undifined，所以会报错。由于js按照顺序从上往下，所以当执行foo = function(){}的时候，才对foo进行赋值为一个函数。
- 这种定义函数的方式，我们称为函数表达式。函数表达式是将函数作为一个值赋给一个变量或属性

```js
function foo() {
  console.log("foo1")
}
foo()

function foo() {
  console.log("foo2")
}
foo()
```

- 函数声明会在任何代码执行之前先被读取并添加到执行上下文，也就是函数声明提升，因此第二个foo会覆盖掉第一个foo，所以输出的是两个foo

```js
var foo = function () {
    console.log("foo1")
}
foo()

var foo = function () {
    console.log("foo2")
}
foo()


function foo() {
    console.log("foo3")
}
foo()

function foo() {
    console.log("foo4")
}
foo()
```

- 函数的变量提升优先级比var高，因此后两个foo提升上去后，被 `var foo`给覆盖了，隐藏最后执行函数`foo()`的时候，都是执行第二个`var foo`，所以输出的是foo1和3个foo2

```js
var a = 0
console.log("1 a:"+a)
if (true) {
  a = 1
  function a() {}
  a = 5
  console.log("2 a:"+a)
}
console.log("3 a:"+a)
```

- js执行是按顺序从上到下的，因此先输出0
- 在if里面，也就是块级作用域，存在函数a，而在ES6之后，块级作用域中的函数声明会提升到全局，虽然提升到全局，但只有执行到这个函数的时候才会去重写块中生成对应的全局变量，否则就是重写之前声明的全局变量
- 没有变量提升后，按顺序执行`a = 1`，if作用域不存在a，因此会向外寻找，因此赋值给全局中的变量a，此时变量a的值为1
- 开始执行函数a，形成函数作用域，此时的a是一个函数
- 执行`a = 5`，此时的a是一个局部变量，不是外面的全局变量，因此输出的是5
- 此时全局变量当中的a是1，因此输出1

> 函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被同名变量赋值后覆盖
> 变量提升是假提升，函数的提升是真提升，赋值后的同名变量优先级要高于同名函数

JavaScript中具名的函数的声明形式有两种：

```js
//函数声明式：
function foo () {}
//变量形式声明： 
var fn = function () {}
```

当使用变量形式声明函数时，和普通的变量一样会存在提升的现象，而函数声明式会提升到作用域最前边，并且将声明内容一起提升到最上边。如下：

```js
fn()
var fn = function () {
	console.log(1)  
}
// 输出结果：Uncaught TypeError: fn is not a function

foo()
function foo () {
	console.log(2)
}
// 输出结果：2
```

可以看到，使用变量形式声明fn并在其前面执行时，会报错fn不是一个函数，因为此时fn只是一个变量，还没有赋值为一个函数，所以是不能执行fn方法的。

## 变量提升导致的问题

### 变量被覆盖

```js
var name = "JavaScript"
function showName(){
  console.log(name);
  if(0){
   var name = "CSS"
  }
}
showName()
```

执行这段代码需要使用变量 name，代码中有两个 name 变量：一个在全局执行上下文中，其值是JavaScript；另外一个在 showName 函数的执行上下文中，由于if(0)永远不成立，所以 name 值是 undifined。那该使用哪个呢？**应该先使用函数执行上下文中的变量**。因为在函数执行过程中，JavaScript 会优先从当前的执行上下文中查找变量，由于变量提升的存在，当前的执行上下文中就包含了if(0)中的变量 name，其值是 undefined，所以获取到的 name 的值就是 undefined。

### 变量没有被销毁

```js
function foo(){
  for (var i = 0; i < 5; i++) {
  }
  console.log(i); 
}
foo()
```

使用其他的大部分语言实现类似代码时，在 for 循环结束之后，i 就已经被销毁了，但是在 JavaScript 代码中，i 的值并未被销毁，所以最后打印出来的是 5。这也是由变量提升而导致的，在创建执行上下文阶段，变量 i 就已经被提升了，所以当 for 循环结束之后，变量 i 并没有被销毁。



# 词法环境

词法环境是一个包含标识符变量映射的结构。（这里的标识符表示变量/函数的名称，变量是对实际对象【包括函数类型对象】或原始值的引用）。在词法环境中，有两个组成部分：（1）环境记录（environment record） （2）对外部环境的引用

- 环境记录是存储变量和函数声明的实际位置。
- 对外部环境的引用意味着它可以访问其外部词法环境。(实现作用域链的重要部分)

词法环境有两种类型：

- **全局环境**（在全局执行上下文中）是一个没有外部环境的词法环境。全局环境的外部环境引用为 null。它拥有一个全局对象（window 对象）及其关联的方法和属性（例如数组方法）以及任何用户自定义的全局变量，this 的值指向这个全局对象。
- **函数环境**，用户在函数中定义的变量被存储在环境记录中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。

变量环境 Variable Environment

它也是一个词法环境，其 `EnvironmentRecord` 包含了由 `VariableStatements` 在此执行上下文创建的绑



变量环境组件（VariableEnvironment） 是用来登记var function变量声明，词法环境组件（LexicalEnvironment）是用来登记let const class等变量声明。

在ES6之前都没有块级作用域，ES6之后我们可以用let const来声明块级作用域，有这两个词法环境是为了实现块级作用域的同时不影响var变量声明和函数声明，具体如下：

1. 首先在一个正在运行的执行上下文内，词法环境由LexicalEnvironment和VariableEnvironment构成，用来登记所有的变量声明。

2. 当执行到块级代码时候，会先LexicalEnvironment记录下来，记录为oldEnv。

3. 创建一个新的LexicalEnvironment（outer指向oldEnv），记录为newEnv，并将newEnv设置为正在执行上下文的LexicalEnvironment。

4. 块级代码内的let const会登记在newEnv里面，但是var声明和函数声明还是登记在原来的VariableEnvironment里。

5. 块级代码执行结束后，将oldEnv还原为正在执行上下文的LexicalEnvironment。


# 浅拷贝、深拷贝

```js
const obj = {
  name: 'test',
  age: 18,
  height: 188,
  money: {
    jijing: 5000
  }
}
// 引用赋值，修改obj2的值，obj的值也会改，本质上obj和ibj2都指向同一个堆数据
const obj2 = obj
console.log('obj', obj2)
obj2.name = 'dawei'
console.log('obj', obj2)
console.log('obj', obj)

// 浅拷贝，值拷贝第一层，其他的依旧是引用赋值
const obj3 = {
  ...obj
}
console.log('obj', obj3)
obj3.name = 'dawei'
obj3.money.jijing = 10000
console.log('obj', obj3)
console.log('obj', obj)

// 深拷贝，完全独立的一个
const obj4 = JSON.parse(JSON.stringify(obj))
console.log('obj', obj4)
obj4.name = 'dawei'
obj4.money.jijing = 10000
console.log('obj', obj4)
console.log('obj', obj)
```

在使用深拷贝和浅拷贝时，需要注意以下几个问题：

- **循环引用**：深拷贝和浅拷贝都需要注意循环引用的问题。循环引用是指对象之间相互引用，导致无限循环。在处理循环引用时，深拷贝需要使用额外的数据结构（如 `Map` 或 `WeakMap`）进行记录和判断，而浅拷贝则无法解决循环引用的问题。
- **特殊类型的处理**：在实现深拷贝和浅拷贝时，需要注意特殊类型的处理。特殊类型包括函数、正则表达式等。对于特殊类型，深拷贝可以选择直接引用原始对象，而浅拷贝只会复制引用。
- **性能开销**：深拷贝是一项相对耗费性能的操作，特别是在处理大型对象或嵌套层次很深的对象时。在实际应用中，需要根据场景权衡性能和需求。



# Set、Map、reduce

### Set

> 可以使用`add()`方法向Set加入值
>
> 向Set加入值时，不会发生类型转换，所以5和"5"是不同值
>
> 但如果加入两次NaN，只会加入一个，所以在Set内部里，两个NaN是相等的
>
> 如果加入两个对象`set.add({})`，则是两个不相等的

#### 去重

使用 Set 可以轻松地进行数组去重操作，因为 Set 只能存储唯一的值。

传入字符串也可以去重

```javascript
const arr = [1, 2, 3, 1, 2, 4, 5];
const uniqueArr = [...new Set(arr)];
const str = 'abbbc'
const uniqueStr = [...new Set(str)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]
console.log(uniqueStr); // ['a','b','c']
```

#### 数组转换

可以使用 Set 将数组转换为不包含重复元素的 Set 对象，再使用 Array.from() 将其转换回数组。

```javascript
const arr = [1, 2, 3, 1, 2, 4, 5];
const set = new Set(arr);
const uniqueArr = Array.from(set);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

#### 优化数据查找

使用 Set 存储数据时，查找操作的时间复杂度为 O(1)，比数组的 O(n) 要快得多，因此可以使用 Set 来优化数据查找的效率。

```js
const dataSet = new Set([1, 2, 3, 4, 5]);

if (dataSet.has(3)) {
  console.log('数据已经存在');
} else {
  console.log('数据不存在');
}
```

#### 并集、交集、差集

Set数据结构可以用于计算两个集合的并集、交集和差集。以下是一些使用Set进行集合运算的示例代码：

```js
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

// 并集
const union = new Set([...setA, ...setB]);
console.log(union); // Set {1, 2, 3, 4}

// 交集
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set {2, 3}

// 差集
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // Set {1}
```

#### 模糊搜索

Set 还可以通过正则表达式实现模糊搜索。可以将匹配结果保存到 Set 中，然后使用 Array.from() 方法将 Set 转换成数组。

```javascript
const data = ['apple', 'banana', 'pear', 'orange'];

// 搜索以 "a" 开头的水果
const result = Array.from(new Set(data.filter(item => /^a/i.test(item))));
console.log(result); // ["apple"]
```

#### 使用 Set 替代数组实现队列和栈

可以使用 Set 来模拟队列和栈的数据结构。

```js
// 使用 Set 实现队列
const queue = new Set();
queue.add(1);
queue.add(2);
queue.add(3);
queue.delete(queue.values().next().value); // 删除第一个元素
console.log(queue); // Set(2) { 2, 3 }

// 使用 Set 实现栈
const stack = new Set();
stack.add(1);
stack.add(2);
stack.add(3);
stack.delete([...stack][stack.size - 1]); // 删除最后一个元素
console.log(stack); // Set(2) { 1, 2 }
```

### Map

#### 将 Map 转换为对象

```js
const map = new Map().set('key1', 'value1').set('key2', 'value2');
const obj = Object.fromEntries(map);
```

#### 将 Map 转换为数组

```js
const map = new Map().set('key1', 'value1').set('key2', 'value2');
const array = Array.from(map);
const array = [...map]; // 这样也可以
```

#### 记录数据的顺序

如果你需要记录添加元素的顺序，那么可以使用`Map`来解决这个问题。当你需要按照添加顺序迭代元素时，可以使用`Map`来保持元素的顺序。

```javascript
const map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
map.set('d', 4);

for (const [key, value] of map) {
  console.log(key, value);
}
// Output: a 1, b 2, c 3, d 4
```

#### 统计数组中元素出现次数

可以使用 Map 统计数组中每个元素出现的次数。

```javascript
const arr = [1, 2, 3, 1, 2, 4, 5];

const countMap = new Map();
arr.forEach(item => {
  countMap.set(item, (countMap.get(item) || 0) + 1);
});

console.log(countMap.get(1)); // 2
console.log(countMap.get(2)); // 2
console.log(countMap.get(3)); // 1
```

#### 统计字符出现次数

使用Map数据结构可以方便地统计字符串中每个字符出现的次数。

```javascript
const str = 'hello world';
const charCountMap = new Map();
for (let char of str) {
  charCountMap.set(char, (charCountMap.get(char) || 0) + 1);
}
console.log(charCountMap); // Map { 'h' => 1, 'e' => 1, 'l' => 3, 'o' => 2, ' ' => 1, 'w' => 1, 'r' => 1, 'd' => 1 }
```

#### 缓存计算结果

在处理复杂的计算时，可能需要对中间结果进行缓存以提高性能。可以使用Map数据结构缓存计算结果，以避免重复计算。

```javascript
const cache = new Map();
function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  if (cache.has(n)) {
    return cache.get(n);
  }
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  cache.set(n, result);
  return result;
}
console.log(fibonacci(10)); // 55
```

#### 使用 Map 进行数据的分组

```javascript
const students = [
  { name: "Tom", grade: "A" },
  { name: "Jerry", grade: "B" },
  { name: "Kate", grade: "A" },
  { name: "Mike", grade: "C" },
];

const gradeMap = new Map();
students.forEach((student) => {
  const grade = student.grade;
  if (!gradeMap.has(grade)) {
    gradeMap.set(grade, [student]);
  } else {
    gradeMap.get(grade).push(student);
  }
});

console.log(gradeMap.get("A")); // [{ name: "Tom", grade: "A" }, { name: "Kate", grade: "A" }]
```

#### 使用 Map 过滤符合条件的对象

在实际开发中，我们常常需要在一个对象数组中查找符合某些条件的对象。此时，我们可以结合使用 Map 和 filter 方法来实现。比如：

```javascript
const users = [
  { name: 'Alice', age: 22 },
  { name: 'Bob', age: 18 },
  { name: 'Charlie', age: 25 }
];
const userMap = new Map(users.map(user => [user.name, user]));
const result = users.filter(user => userMap.has(user.name) && user.age > 20);
console.log(result); // [{ name: 'Alice', age: 22 }, { name: 'Charlie', age: 25 }]
```

首先，我们将对象数组转换为 Map，以便快速查找。然后，我们使用 filter 方法来过滤符合条件的对象。



### reduce

reduce 函数可以根据需要进行累加、过滤、分组、映射等操作，是一个非常强大的数组方法。在数据处理时使用的非常频繁，很多复杂的逻辑如果用reduce去处理，都非常的简洁，在实际的开发工作过程中，积累了一些常见又超级好用的 reduce 技巧的代码片段，筛选了如下 10 个，以供大家参考

#### reduce 介绍

`reduce` 是数组的方法，可以对数组中的每个元素依次执行一个回调函数，从左到右依次累积计算出一个最终的值。其语法为：

> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

其中，`callback` 是每个元素执行的回调函数，其包含 4 个参数：

- `accumulator`：累积器，即上一次回调函数执行的返回值。
- `currentValue`：当前元素的值。
- `index`：当前元素的下标。
- `array`：原始数组。

`initialValue` 是可选的，表示累积器的初始值。

`reduce` 函数的执行过程如下：

1. 如果没有提供 `initialValue`，则将数组的第一个元素作为累积器的初始值，否则将 `initialValue` 作为累积器的初始值。
2. 从数组的第二个元素开始，依次对数组中的每个元素执行回调函数。
3. 回调函数的返回值作为下一次回调函数执行时的累积器的值。
4. 对数组中的每个元素执行完回调函数后，`reduce` 函数返回最后一次回调函数的返回值，即最终的累积值。

#### 计算数组中每个元素出现的次数

```js
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((accumulator, currentValue) => {
  accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
  return accumulator;
}, {});
console.log(count); // Output: { apple: 3, banana: 2, orange: 1 }
```

#### 拍平嵌套数组

```js
const nestedArray = [[1, 2], [3, 4], [5, 6]];
const flattenedArray = nestedArray.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
```

#### 按条件分组

```js
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 25 },
  { name: 'Emily', age: 30 }
];
const groupedPeople = people.reduce((accumulator, currentValue) => {
  const key = currentValue.age;
  if (!accumulator[key]) {
    accumulator[key] = [];
  }
  accumulator[key].push(currentValue);
  return accumulator;
}, {});
console.log(groupedPeople);
// Output: {
//   25: [{ name: 'Alice', age: 25 }, { name: 'David', age: 25 }],
//   30: [{ name: 'Bob', age: 30 }, { name: 'Emily', age: 30 }],
//   35: [{ name: 'Charlie', age: 35 }]
// }
```

#### 将多个数组合并为一个对象

```js
const keys = ['name', 'age', 'gender'];
const values = ['Alice', 25, 'female'];
const person = keys.reduce((accumulator, currentValue, index) => {
    accumulator[currentValue] = values[index];
    return accumulator;
  }, {});
console.log(person); // Output: { name: 'Alice', age: 25, gender: 'female' }
```

#### 将字符串转换为对象

```js
const str = 'key1=value1&key2=value2&key3=value3';
const obj = str.split('&').reduce((accumulator, currentValue) => {
  const [key, value] = currentValue.split('=');
  accumulator[key] = value;
  return accumulator;
}, {});
console.log(obj); 
// Output: { key1: 'value1', key2: 'value2', key3: 'value3' }
```

#### 将对象转换为查询字符串

```js
const params = { foo: "bar", baz: 42 };
const queryString = Object.entries(params).reduce((acc, [key, value]) => {
  return `${acc}${key}=${value}&`;
}, "?").slice(0, -1);
console.log(queryString); // "?foo=bar&baz=42"
```

#### 打印斐波那契数列

```js
const fibonacci = n => {
  return [...Array(n)].reduce((accumulator, currentValue, index) => {
    if (index < 2) {
      accumulator.push(index);
    } else {
      accumulator.push(accumulator[index - 1] + accumulator[index - 2]);
    }
    return accumulator;
  }, []);
};
console.log(fibonacci(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

#### 检查字符串是否是回文字符串

```js
const str = 'racecar';
const isPalindrome = str.split('').reduce((accumulator, currentValue, index, array) => {
  return accumulator && currentValue === array[array.length - index - 1];
}, true);
console.log(isPalindrome); // Output: true
```

#### 检查括号是否匹配

```js
const str = "(()()())";
const balanced = str.split("").reduce((acc, cur) => {
  if (cur === "(") {
    acc++;
  } else if (cur === ")") {
    acc--;
  }
  return acc;
}, 0) === 0;
console.log(balanced); // true
```

#### 递归获取对象属性

```js
const user = {
  info: {
    name: "Jason",
    address: { home: "Shaanxi", company: "Xian" },
  },
};
function get(config, path, defaultVal) {
  return path.split('.').reduce((config, name) => config[name], config) || defaultVal;
}
get(user, "info.name"); // Jason
get(user, "info.address.home"); // Shaanxi
get(user, "info.address.company"); // Xian
get(user, "info.address.abc", "default"); // default
```

#### 手写 reduce

可以通过手写一个简单的 `reduce` 函数来更好地理解它的实现原理：

```js
function myReduce(arr, callback, initialValue) {
  let accumulator = initialValue === undefined ? arr[0] : initialValue;
  for (let i = initialValue === undefined ? 1 : 0; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}
```

上面的代码中，`myReduce` 函数接受 3 个参数：要执行 `reduce` 操作的数组 `arr`、回调函数 `callback` 和累积器的初始值 `initialValue`。如果没有提供初始值，则将数组的第一个元素作为累积器的初始值。

接下来，在循环中，如果有 initialValue，则从第一个元素开始遍历 callback，此时 callabck 的第二个参数是从数组的第一项开始的；如果没有 initialValue，则从第二个元素开始遍历 callback，此时 callback 的第二个参数是从数组的第二项开始的从数组的第二个元素开始，依次对数组中的每个元素执行回调函数，并将返回值作为下一次回调函数执行时的累积器的值。

最后，`myReduce` 函数返回最后一次回调函数的返回值，即最终的累积值。

这个简易的 `reduce` 函数并没有考虑很多边界情况和复杂的应用场景，但是可以帮助我们更好地理解 `reduce` 函数的实现原理。



# 事件循环

> 叫法不同：
>
> w3c    event loop
>
> 谷歌浏览器    message loop
>
> promise本身是一个同步的代码，只有它后面调用的then()方法里的回调才是微任务
>
> await右边的表达式还是会
>
> script标签本身是一个宏任务，当页面出现多个script标签的时候，浏览器会把script标签作为宏任务来解析

- **单线程是异步产生的原因**
- **事件循环是异步的实现方式**

## 浏览器的进程模型

### 何为进程

-  程序运行需要有他自己专属的内存空间，可以把这块内存空间简单的理解为进程
-  每个应用至少有一个进程，进程之间相互独立，即使要通信，也需要双方同意
-  不会相互影响，如一个进程崩溃，不会导致其他进程崩溃

### 何为线程

有了进程，就可以运行程序的代码了

一个进程至少有一个线程，所以在进程开启后会自动创建一个线程来运行代码，该线程称之为主线程

如果程序需要同时执行多块代码，主线程就会启动更多的线程来执行代码，所以一个进程可以包含多个线程

###  浏览器有哪些进程和线程

**浏览器是一个多进程多线程的应用程序**

- 为了避免相互影响，为了减少连环崩溃的几率，当浏览器启动后，它会自动启动多个进程

![img](/Users/mac/Desktop/test/TestCase/images/js-llq.PNG)

> 可以在浏览器的任务管理器中查看当前的所有进程

其中，最主要的进程有：

- 浏览器进程

  -  主要负责界面显示、用户交互、子进程管理等，浏览器进程内部会启动多个线程处理不同的任务

- 网络进程

  -  负责加载网络资源，网络进程内部会启动多个线程来处理不同的网络任务

- 渲染进程（重点）

  - 渲染进程启动后，会开启一个**渲染主线程**，主线程复制执行HTML、CSS、JS代码

  - 默认情况下，浏览器会为每个标签页开启一个新的渲染进程，以保证不同的标签页之间不相互影响

  - > 这样每一个标签页就开启一个渲染进程，这就会导致当我们打开多个标签页时，谷歌浏览器就会非常占内存
    >
    > 改变：一个站点一个渲染进程，也就是说打开淘宝分配一个渲染进程，但我们又打开一个新的标签页，是淘宝的商品详情，那么它们共同使用一个渲染进程

## 渲染主线程是如何工作的

渲染主线程是浏览器中最繁忙的线程，需要它处理的任务包括但不限于：

- 解析HTML
- 解析CSS
- 计算样式
- 布局
- 处理图层
- 每秒把页面画60次
- 执行全局JS代码
- 执行事件处理函数
- 执行计时器的回调函数
- .............

要处理这么多的任务，主线程遇到了一个难题，如果调度任务？

- 正在执行一个JS函数，执行到一半的时候用户点击了按钮，该立即执行点击事件的处理函数

**渲染主线程处理调度任务：排队**

- dnag

![](/Users/mac/Desktop/test/TestCase/images/js-paidui.png)

1. 在最开始的时候，渲染主线程会进入一个无限循环（for（; ;））
2. 每一次循环会检查消息队列中是否有任务存在，如果有，就取出第一个任务执行，执行完一个后进入下一次循环，如果没有，则进入休眠状态
3. 其他所有线程（包括其他进行的线程）可以随时向消息队列添加任务，新任务会加到消息队列的末尾，在添加新任务时，如果主线程时休眠状态，则会将其唤醒以继续循环拿取任务

**整个过程，被称之为事件循环（消息循环）**

## 若干解释

### 何为异步

在代码执行过程中，回到一些无法立即处理的任务，比如：

- 计时完后需要执行的任务 ---- `setTimeout`、`setInterval`
- 网络通信后需要执行的任务 ---- `XHR`、`Fetch`
- 用户操作后需要执行的任务 ---- `addEventListener`

如果让渲染主线程等待这些任务的时机到达，就会导致主线程长期处于【阻塞】的状态，从而导致浏览器【卡死】

![img](blob:https://ap3pibqbmd.feishu.cn/37ca1818-f408-4f6e-95cc-0fbc93e2d714)

**渲染主线程承担着极其重要的工作，无论如何都不能阻塞**

因此，浏览器选择**异步**来解决这个问题

![img](/Users/mac/Desktop/test/TestCase/images/js-yibu.png)

 使用异步的方式，渲染主线程永不阻塞

> 面试题：如何理解JS的异步？
>
> 答：
>
> JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个
>
> 而选择主线程承担诸多的工作，渲染页面、执行HTML、CSS、JS都在其中运行
>
> 如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行
>
> 这样一来，一方面会导致繁忙的主线程浪费时间，另一方面导致页面无法及时更新，页面卡死
>
> 所以浏览器采用异步的方式来避免这个问题。具体做法是当某些任务发送时，比如计数器、网络、事件监听等，主线程会将任务交给其他线程去处理，自身立即结束任务的执行，从而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行
>
> 在这种异步模式下，浏览器用不阻塞，从而最大限度的保证了单线程的流畅运行

### JS为何会阻碍渲染

JS代码执行和渲染都在一个线程上

如执行一个函数，先点击按钮改变文本，后死循环三秒，当我们看到的是等待三秒后，文本才改变。是因为当我们点击按钮改变文本时，会触发渲染任务，但渲染主线程为单线程，JS代码还未执行完，因此执行完JS代码后，也就是点击改变文本，死循环三秒之后，渲染主线程才开始执行渲染任务，这时页面上才会显示改变后的文本

### 任务有优先级吗

任务没有优先级，在消息队列中先进先出

**但消息队列有优先级**

W3C的最新解释：

- 每个任务都一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。每一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行
- 浏览器必须准备好一个微队列，微队列中的任务有限所有其他任务执行 

> 随着浏览器的复杂度急剧提升，W3C不再使用宏队列的说法

在目前的chrome的实现中，至少包含了下面的队列：

- 延时队列：用于存放计时器到达后的回调任务，优先级【中】
- 交互队列：用于存放用户操作后产生的事件处理任务，优先级【高】
- 微队列：用户存放需要最快的任务，优先级【最高】

> 面试题：阐述一下JS的事件循环
>
> 答：
>
> 事件循环又叫做消息循环，时浏览器渲染主线程的工作方式
>
> 在Chrome的源码中，它开启一个不会结束的for循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候加入队列末尾即可
>
> 过去把消息队列简单分为宏队列和微队列，这种说法目前已经无法满足复杂的浏览器环境，取而代之的是一种灵活多变的处理方式
>
> 根据W3C官方的解释，每个任务又不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行

> 面试题：JS中的计时器能做到精确计时吗?为什么？
>
> 答：
>
> 不行，因为：
>
> - 计算机硬件没有原子钟，无法做到精确计时
> - 操作系统的计时函数本身就有少量偏差，由于JS的计时器最终调用的是操作系统的函数，也就携带了这些偏差
> - 按照W3C的标准，浏览器实现计时器时，如果嵌套层级超过5层，则会带有4毫秒的最少时间，这样在计时时间少于4毫秒时又带来偏差
> - 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来偏差



# 类型转换

## 隐式类型转换

在JavaScript中，隐式类型转换是指在特定的上下文中，JavaScript自动将一个数据类型转换为另一个数据类型，而无需显式地编写转换代码。

### 1. 数字转字符串：

```javascript
let num = 10;
let str = num + ''; // 将数字转换为字符串
console.log(str); // 输出: "10"
```

在这个例子中，通过将数字与一个空字符串相加，JavaScript会将数字隐式转换为字符串。

### 2. 字符串转数字：

```javascript
let str = '20';
let num = +str; // 将字符串转换为数字
console.log(num); // 输出: 20
```

在这个例子中，通过使用一元加号操作符（+）对字符串进行操作，JavaScript会将字符串隐式转换为数字。

### 3. 布尔值转数字：

```javascript
let bool = true;
let num = +bool; // 将布尔值转换为数字
console.log(num); // 输出: 1
```

在这个例子中，通过使用一元加号操作符（+）对布尔值进行操作，JavaScript会将布尔值隐式转换为数字，`true`转换为1，`false`转换为0。

### 4. 字符串转布尔值：

```javascript
let str = 'true';
let bool = !!str; // 将字符串转换为布尔值
console.log(bool); // 输出: true
```

在这个例子中，通过使用两个逻辑非操作符（!!）对字符串进行操作，JavaScript会将字符串隐式转换为布尔值，非空字符串转换为`true`，空字符串转换为`false`。

需要注意的是，隐式类型转换在某些情况下可能会导致意外的结果。因此，在进行类型转换时，特别是涉及不同的数据类型之间的运算时，要注意确保结果符合预期。

理解隐式类型转换的规则和机制可以帮助我们更好地理解JavaScript代码中的行为，并在需要时正确地处理数据类型转换。

### 5. 对象的隐式转换

在JavaScript中，对象在进行隐式类型转换时会根据一定的规则进行处理。对象的隐式类型转换通常涉及将对象转换为字符串或将对象转换为数字。

1. 对象转换为字符串：

当一个对象需要被隐式转换为字符串时，JavaScript会尝试调用对象的`toString()`方法。`toString()`方法是一个内置方法，它返回表示对象的字符串形式。

```javascript
let obj = { name: "John", age: 25 };
let str = obj.toString();
console.log(str); // 输出: "[object Object]"
```

在上述例子中，对象`obj`会被隐式转换为字符串形式，调用了`toString()`方法并返回了`"[object Object]"`。

需要注意的是，`toString()`方法的默认实现返回`"[object Object]"`，这对于大多数对象来说并不是非常有用。因此，可以通过重写对象的`toString()`方法来自定义对象转换为字符串的行为。

```javascript
let person = {
  name: "John",
  age: 25,
  toString() {
    return this.name + " - " + this.age;
  }
};
let str = person.toString();
console.log(str); // 输出: "John - 25"
```

在这个例子中，我们重写了`person`对象的`toString()`方法，使其返回自定义的字符串形式。

1. 对象转换为数字：

在JavaScript中，当一个对象需要被隐式转换为数字时，会首先尝试调用对象的valueOf()方法，如果该方法返回的不是原始值（例如数字），则会接着尝试调用对象的toString()方法，将返回值转换为数字

```javascript
let obj = { value: 42 };
let num = obj.valueOf();
console.log(num); // 输出: { value: 42 }
```

需要注意的是，与日期对象的`valueOf()`方法不同，大多数对象的默认`valueOf()`方法的行为通常并不有用。因此，可以通过重写对象的`valueOf()`方法来自定义对象转换为数字的行为。

```javascript
let counter = {
  value: 0,
  valueOf() {
    return this.value++;
  }
};
let num = counter.valueOf();
console.log(num); // 输出: 0
console.log(counter.value); // 输出: 1
```

在这个例子中，我们重写了`counter`对象的`valueOf()`方法，使其每次调用时返回一个递增的值。

需要注意的是，对象的隐式类型转换的行为和结果可能会因对象的类型、实现方式以及具体的上下文而有所不同。在编写代码时，建议根据实际需求和预期结果来处理对象的隐式类型转换，并确保理解和掌握对象的`toString()`和`valueOf()`方法的使用。

## 显式类型转换

在JavaScript中，我们可以使用一些内置函数和操作符来进行显式类型转换，以将一个值转换为特定的数据类型。下面是一些常用的类型转换函数和操作符以及它们的用法和注意事项：

1. String() 函数：用于将一个值转换为字符串类型。

```javascript
let num = 10;
let str = String(num); // 将数字转换为字符串
console.log(str); // 输出: "10"
```

需要注意的是，使用String()函数进行转换时，对于 null 和 undefined 值会分别得到 "null" 和 "undefined" 字符串。

1. Number() 函数：用于将一个值转换为数字类型。

```javascript
let str = "20";
let num = Number(str); // 将字符串转换为数字
console.log(num); // 输出: 20
```

需要注意的是，使用Number()函数进行转换时，如果传入的字符串无法解析为有效的数字，将返回 NaN（Not a Number）。

1. Boolean() 函数：用于将一个值转换为布尔类型。

```javascript
let num = 0;
let bool = Boolean(num); // 将数字转换为布尔值
console.log(bool); // 输出: false
```

需要注意的是，使用Boolean()函数进行转换时，对于 0、-0、null、undefined、NaN 和空字符串会返回 false，其他值都会返回 true。

1. parseInt() 和 parseFloat() 函数：用于将字符串转换为整数和浮点数类型。

```javascript
let str = "123";
let num = parseInt(str); // 将字符串转换为整数
console.log(num); // 输出: 123

let floatStr = "3.14";
let floatNum = parseFloat(floatStr); // 将字符串转换为浮点数
console.log(floatNum); // 输出: 3.14
```

需要注意的是，使用 parseInt() 和 parseFloat() 函数进行转换时，它们会尝试解析字符串的开头部分，直到遇到非数字字符为止。

除了上述函数，还有一些常用的操作符也可以进行显式类型转换：

- 加号操作符（+）：用于将值转换为数字类型。

```javascript
let str = "20";
let num = +str; // 将字符串转换为数字
console.log(num); // 输出: 20
```

- 双重取反操作符（!!）：用于将值转换为布尔类型。

```javascript
let num = 0;
let bool = !!num; // 将数字转换为布尔值
console.log(bool); // 输出: false
```

在进行显式类型转换时，需要注意以下几点：

- 了解转换函数和操作符的行为和规则，以避免出现意外的结果。
- 特别注意在将字符串转换为数字时，确保字符串能够正确解析为有效的数字，以避免得到 NaN。
- 注意处理 null 和 undefined 值时的类型转换结果。
- 在类型转换场景中，根据具体需求选择合适的函数或操作符。

通过显式类型转换，我们可以将值从一个数据类型转换为另一个数据类型，以满足具体的需求和逻辑。

## 类型转换规则

了解类型转换的规则和注意事项是非常重要的，可以帮助我们避免出现意外的结果和错误的行为。下面是一些类型转换的规则和需要注意的情况：

### 1. 类型转换的优先级：在JavaScript中，类型转换有一定的优先级。从高到低的优先级顺序是：

- 布尔值 -> 数字 -> 字符串

这意味着在进行混合类型的操作时，JavaScript会首先尝试将值转换为布尔值，然后是数字，最后是字符串。

### 2. 字符串拼接优先：在涉及字符串和其他数据类型的操作中，字符串拼接的优先级最高。这意味着如果一个操作符是字符串拼接操作符（+），那么其他操作数将被隐式转换为字符串。

```javascript
let num = 10;
let str = "The number is: " + num;
console.log(str); // 输出: "The number is: 10"
```

在这个例子中，数字`num`会被隐式转换为字符串，然后与其他字符串进行拼接。

### 3. NaN（Not a Number）：当涉及无法进行有效数值计算的情况时，JavaScript会返回NaN。NaN是一个特殊的数字值，表示不是一个有效的数字。

```javascript
let result = 10 / "hello";
console.log(result); // 输出: NaN
```

在这个例子中，字符串"hello"无法被解析为有效的数字，所以计算结果为NaN。

### 4. null和undefined的类型转换：null和undefined在进行类型转换时有一些特殊规则：

- null在进行数字转换时会被转换为0，而在进行字符串转换时会被转换为"null"。
- undefined在进行数字转换时会被转换为NaN，而在进行字符串转换时会被转换为"undefined"。

```javascript
let num = Number(null);
console.log(num); // 输出: 0

let str = String(undefined);
console.log(str); // 输出: "undefined"
```

在这个例子中，null在数字转换时被转换为0，undefined在字符串转换时被转换为"undefined"。

### 5. 注意一元加号操作符（+）的行为：一元加号操作符可以用于将值转换为数字类型，但需要注意一些情况。当应用于字符串时，一元加号操作符会尝试将字符串解析为数字。

```javascript
let str = "123";
let num = +str;
console.log(num); // 输出: 123

let invalidStr = "hello";
let invalidNum = +invalidStr;
console.log(invalidNum); // 输出: NaN
```

在这个例子中，有效的数字字符串可以成功转换为数字，而无法解析为数字的字符串会转换为NaN。

了解这些规则和注意事项可以帮助我们更好地理解类型转换的行为，并在编写代码时避免潜在的错误和意外结果。同时，在进行类型转换时，要根据具体的需求选择合适的方法和操作符，并进行适当的错误处理和边界检查。

## 最佳实践

1. 避免意外的类型转换：隐式类型转换可能导致意外的结果和错误的行为。为了避免这种情况，可以遵循以下实践：

   - 显式地使用适当的类型转换函数或操作符，明确指定期望的转换结果。
   - 在涉及类型转换的操作中，添加适当的错误处理机制，以防止无效的转换。

2. 类型安全的比较：在条件语句中，确保进行类型安全的比较，避免因类型转换而导致的问题。使用恰当的比较操作符（如`===`和`!==`）可以同时比较值和类型，确保比较的准确性。

   ```javascript
   let num = "10";
   if (num === 10) {
     // 正确的比较方式，值和类型都匹配
     console.log("The number is 10.");
   } else {
     console.log("The number is not 10.");
   }
   ```

   在这个例子中，使用`===`进行比较可以避免字符串与数字的隐式转换，确保比较的准确性。

3. 使用适当的类型转换技巧：在某些情况下，可以使用类型转换来解决问题或优化代码逻辑。以下是一些常见的类型转换技巧：

   - 将字符串转换为数字或反之：使用`Number()`函数或一元加号操作符（+）进行转换。
   - 将字符串转换为数组：使用`split()`函数将字符串拆分为数组。
   - 将对象转换为字符串：使用`JSON.stringify()`函数将对象转换为字符串表示。
   - 将数字转换为字符串并添加特定格式：使用字符串模板或字符串拼接操作符（+）。

4. 考虑性能和可读性：尽管类型转换是一种强大的工具，但过度使用或滥用可能会影响代码的性能和可读性。在进行类型转换时，要权衡利弊，并确保代码易于理解和维护。

总之，掌握类型转换的最佳实践可以帮助我们编写更健壮和高效的代码。遵循类型安全的比较、避免意外的类型转换、选择适当的类型转换技巧，并在性能和可读性之间找到平衡，都是编写优质JavaScript代码的重要因素。



# 垃圾回收

## JavaScript内存生命周期

在讨论垃圾回收之前，我们首先需要了解一下JavaScript的内存生命周期，这个过程通常分为三个阶段：

1. **分配内存**：当声明变量、添加属性、或者调用函数等操作时，JavaScript引擎会分配内存来存储值。例如，当你写`let a = 1`时，JavaScript引擎会为变量`a`分配一块内存来存储值`1`。
2. **使用内存**：在分配了内存之后，我们可以通过读写操作来使用这块内存。例如，我们可以读取变量`a`的值，或者改变它的值。
3. **释放内存**：当内存不再被需要时（例如，变量已经离开了它的作用域），这块内存需要被释放，以便为新的内存分配做出空间。这个过程就是垃圾回收。

## 垃圾回收

垃圾回收是自动完成的。垃圾收集器会周期性地（或在特定触发条件下）运行，找出不再使用的变量，然后释放其占用的内存。但是，如何确定哪些内存“不再需要”呢？这其实是一个复杂的问题，因为某些内存可能仍然被间接引用，或者可能在将来需要。因此，垃圾收集器必须使用一种算法来确定哪些内存可以安全地释放。接下来我们将详细介绍两种常见的垃圾回收算法：标记-清除算法和引用计数算法。

### 标记-清除算法

这是JavaScript中最常用的垃圾回收算法。它的工作原理大致可以分为两个阶段：标记和清除。

在标记阶段，垃圾回收器从一组“根”（root）对象开始，遍历所有从这些根对象可达的对象。可达的对象包括直接引用的对象，以及通过其他可达对象间接引用的对象。所有可达的对象都被标记为“活动的”或“非垃圾的”。

然后，在清除阶段，垃圾回收器会遍历所有的堆内存，清除未被标记的对象。这些未被标记的对象就是我们所说的“垃圾”，它们无法从根对象访问到，因此我们可以安全地假设它们不会再被应用程序使用。

```javascript
function test() {
    var x = 123;
    var y = { a: 1, b: 2 };
    // 当函数执行结束时，x 和 y 就离开了环境
}
test();
// 现在 x 和 y 都是非环境变量，它们占用的内存就可以被垃圾回收器回收
```

### 引用计数算法

引用计数是另一种垃圾回收策略。这种策略的基本思想是跟踪每个对象被引用的次数。当声明一个变量并将一个引用类型值赋给该变量时，这个引用类型值的引用次数就是1。如果同一个引用值被赋给另一个变量，引用次数增加1。相反，如果对该值的引用被删除，引用次数减少1。当这个引用次数变成0时，就表示没有任何地方再引用这个值了，因此该值可以被视为“垃圾”并被收集。

然而，引用计数算法有一个著名的问题，那就是循环引用。如果两个对象相互引用，即使它们没有被其他任何对象引用，它们的引用次数也不会是0，因此它们不会被回收，这会导致内存泄漏。为了解决这个问题，现代JavaScript引擎通常会结合使用标记-清除和引用计数两种算法。



```javascript
function cycleReference() {
    var obj1 = {};
    var obj2 = {};
    obj1.prop = obj2;
    obj2.prop = obj1;
}
cycleReference();
// 在函数执行结束后，obj1 和 obj2 仍然相互引用，但已经离开了环境，无法被引用计数器捕获
```

## JavaScript引擎的垃圾回收优化策略

现代JavaScript引擎不仅实现了上述的基础垃圾回收算法，而且引入了一些优化策略，以提高垃圾回收的效率并减小对性能的影响。

###  分代收集

大部分的JavaScript对象在创建后很快就会死亡，而那些能活下来的对象，通常能活很久。这给了JavaScript引擎一个优化垃圾收集的思路。它把内存堆分为两个

区域：新生代和老生代。新生代存放的是生存时间短的对象，老生代存放的是生存时间长的对象。

对新生代的垃圾回收采用Scavenge算法，它将新生代的空间一分为二，一个为使用空间（From），一个为空闲空间（To）。新对象总是被分配到From空间，当From空间快被使用完时，就会触发垃圾回收过程。回收过程中，存活的对象将会被复制到To空间，同时From和To空间的角色会对调，也就是原来的To空间变成新的From空间。这个过程称为新生代的晋升策略。

而老生代的对象数量一般较多且存活时间较长，如果还使用上面的Scavenge算法就会占用较多的CPU，因此老生代采用了标记-清除和标记-整理算法。

### 延迟清除和增量标记

为了减小垃圾回收过程对应用程序性能的影响，JavaScript引擎采用了“延迟清除”（Lazy Sweeping）和“增量标记”（Incremental Marking）两种策略。

“延迟清除”是指，在标记-清除算法中，垃圾回收器并不是在标记完对象之后立即清除，而是将清除操作延迟到应用程序空闲时进行。

“增量标记”则是将一次完整的标记过程分解为几个部分，每个部分只标记一部分对象。这样，垃圾回收器可以在运行一小段时间后，暂停一会儿，让出CPU给应用程序，然后再运行一小段时间，如此反复，直到标记所有对象。这种方式可以让垃圾回收和应用程序交替运行，减小了垃圾回收对应用程序性能的影响。

### JavaScript代码优化和垃圾回收

了解了垃圾回收的基本概念和机制后，我们可以通过优化JavaScript代码来减少垃圾回收的压力，提高程序的性能。

#### 局部变量和立即释放内存

使用局部变量而不是全局变量可以更快地释放内存。这是因为局部变量的生命周期通常比全局变量短，一旦离开了它的环境（例如：函数执行结束），局部变量就可以被标记为垃圾回收。

```javascript
function test() {
    var local = "I'm a local variable";
    // 当函数执行结束后，local 就离开了环境，可以被垃圾回收
}
test();
```

#### 解除对象引用

当你不再需要一个对象时，应该解除对它的引用。这样，垃圾回收器在下一次运行时就可以回收这个对象。

```javascript
var obj = { prop: "I'm an object" };
obj = null; // 现在，obj 可以被垃圾回收
```

#### 避免长生命周期的引用

长生命周期的引用（例如：全局变量或DOM引用）会阻止垃圾回收器回收它们所引用的对象。因此，应该尽量避免使用长生命周期的引用，或者在不再需要它们时及时解除引用。

在理解了JavaScript的垃圾回收机制和如何优化代码以减轻垃圾回收压力之后，我们可以写出更高效、更可靠的代码，从而提高用户体验，降低系统负载。



# WeakMap与Map、WeakSet与Set

`WeakMap`是一种键值对的集合，类似于`Map`。不过，`WeakMap`与`Map`有几个重要的区别：

- 在`WeakMap`中，只有对象和Symbol值可以作为键。换句话说，我们不能使用基本类型（如数字，字符串，布尔值等）作为`WeakMap`的键。
- `WeakMap`的键是弱引用的。这意味着，如果一个对象只被`WeakMap`引用，那么这个对象可以被垃圾回收（GC）。当这个对象被垃圾回收后，它对应的键值对也会从`WeakMap`中自动移除。
- `WeakMap`不可遍历，也就是说，我们不能使用像`for...of`这样的循环来遍历`WeakMap`。

由于这些特性，`WeakMap`在处理内存泄漏问题和管理对象私有数据等场景中有着显著的优势。

`WeakSet`也是一种集合，类似于`Set`。`WeakSet`与`Set`的主要区别包括：

- 在`WeakSet`中，只有对象或者Symbol值可以作为值。也就是说，我们不能将基本类型（如数字，字符串，布尔值等）添加到`WeakSet`中。
- `WeakSet`中的对象是弱引用的。如果一个对象只被`WeakSet`引用，那么这个对象可以被垃圾回收。当这个对象被垃圾回收后，它会自动从`WeakSet`中移除。
- `WeakSet`不可遍历，也就是说，我们不能使用像`for...of`这样的循环来遍历`WeakSet`。

## WeakMap的创建和使用

我们可以使用`new WeakMap()`来创建一个新的`WeakMap`。在创建了`WeakMap`之后，我们可以使用`set`方法来添加新的键值对，

使用`get`方法来获取某个键对应的值，使用`delete`方法来移除某个键及其对应的值，使用`has`方法来检查`WeakMap`中是否存在某个键。

```javascript
let weakMap = new WeakMap();

let obj1 = {};
let obj2 = {};

// 添加键值对
weakMap.set(obj1, 'Hello');
weakMap.set(obj2, 'World');

// 获取值
console.log(weakMap.get(obj1)); // 输出: 'Hello'
console.log(weakMap.get(obj2)); // 输出: 'World'

// 检查键是否存在
console.log(weakMap.has(obj1)); // 输出: true
console.log(weakMap.has(obj2)); // 输出: true

// 删除键值对
weakMap.delete(obj1);
console.log(weakMap.has(obj1)); // 输出: false
```

## WeakMap和内存管理

`WeakMap`最重要的特性就是其键对对象的弱引用。这意味着，如果一个对象只被`WeakMap`引用，那么这个对象可以被垃圾回收。这样就可以防止因为长时间持有对象引用导致的内存泄漏。

例如，如果我们在`Map`中保存了一些对象的引用，即使这些对象在其他地方都已经不再使用，但是由于它们仍被`Map`引用，所以它们不能被垃圾回收，这就可能导致内存泄漏。然而，如果我们使用`WeakMap`来保存这些对象的引用，那么当这些对象在其他地方都不再使用时，它们就会被垃圾回收，从而防止了内存泄漏。

## WeakMap和对象私有数据

`WeakMap`还常常被用来保存对象的私有数据。这是因为`WeakMap`的键不可遍历，所以我们可以利用这个特性来存储一些只有特定代码能够访问的数据。

例如，我们可以创建一个`WeakMap`，然后使用这个`WeakMap`来保存每个对象的私有数据，像这样：

```javascript
let privateData = new WeakMap();

function MyClass() {
  privateData.set(this, {
    secret: 'my secret data',
  });
}

MyClass.prototype.getSecret = function() {
  return privateData.get(this).secret;
};

let obj = new MyClass();
console.log(obj.getSecret()); // 输出: 'my secret data'
```

在这个例子中，我们创建了一个`MyClass`的类，每一个`MyClass`的实例都有一个私有数据`secret`。我们使用`WeakMap`来保存这个私有数据。这样，我们就可以在`MyClass`的方法中访问这个私有数据，但是其他的代码无法访问它。

## WeakSet的创建和使用

我们可以使用`new WeakSet()`来创建一个新的`WeakSet`。在创建了`WeakSet`之后，我们可以使用`add`方法来添加新的对象，使用`delete`方法来移除某个对象，使用`has`方法来检查`WeakSet`中是否存在某个对象。

```javascript
let weakSet = new WeakSet();

let obj1 = {};
let obj2 = {};

// 添加对象
weakSet.add(obj1);
weakSet.add(obj2);

// 检查对象是否存在
console.log(weakSet.has(obj1)); // 输出: true
console.log(weakSet.has(obj2)); // 输出: true

// 删除对象
weakSet.delete(obj1);
console.log(weakSet.has(obj1)); // 输出: false
```

## WeakSet和对象唯一性

`WeakSet`可以用来检查一个对象是否已经存在。由于`WeakSet`中的每个对象都是唯一的，所以我们可以利用这个特性来确保我们不会添加重复的对象。

例如，我们可以创建一个`WeakSet`，然后使用这个`WeakSet`来保存所有我们已经处理过的对象，像这样：

```javascript
let processedObjects = new WeakSet();

function processObject(obj) {
  if (!processedObjects.has(obj)) {
    // 处理对象
    // ...

    // 将对象添加到WeakSet中，表示我们已经处理过这个对象
    processedObjects.add(obj);
  }
}
```

在这个例子中，我们在每次处理一个对象之前，都会检查这个对象是否已经被处理过。如果这个对象已经被处理过，我们就不会再处理它。这样，我们就可以确保我们不会重复处理同一个对象。

## WeakSet和内存管理

与`WeakMap`一样，`WeakSet`中的对象也是弱引用的，所以`WeakSet`也有优秀的内存管理特性。如果一个对象只被`WeakSet`引用，那么这个对象可以被垃圾回收。这样就可以防止因为长时间持有对象引用导致的内存泄漏。

例如，如果我们在`Set`中保存了一些对象的引用，即使这些对象在其他地方都已经不再使用，但是由于它们仍被`Set`引用，所以它们不能被垃圾回收，这就可能导致内存泄漏。然而，如果我们使用`WeakSet`来保存这些对象的引用，那么当这些对象在其他地方都不再使用时，它们就会被垃圾回收，从而防止了内存泄漏



# 弱引用

WeakSet 和 WeakMap 是基于弱引用的数据结构，[ES2021](https://github.com/tc39/proposal-weakrefs) 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。

```javascript
let target = {};
let wr = new WeakRef(target);
```

上面示例中，`target`是原始对象，构造函数`WeakRef()`创建了一个基于`target`的新对象`wr`。这里，`wr`就是一个 WeakRef 的实例，属于对`target`的弱引用，垃圾回收机制不会计入这个引用，也就是说，`wr`的引用不会妨碍原始对象`target`被垃圾回收机制清除。

WeakRef 实例对象有一个`deref()`方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回`undefined`。

```javascript
let target = {};
let wr = new WeakRef(target);

let obj = wr.deref();
if (obj) { // target 未被垃圾回收机制清除
  // ...
}
```

上面示例中，`deref()`方法可以判断原始对象是否已被清除。

弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。

```javascript
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);
```

上面示例中，`makeWeakCached()`用于建立一个缓存，缓存里面保存对原始文件的弱引用。

注意，标准规定，一旦使用`WeakRef()`创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除。



# 面向对象编程oop与class

## 引言

随着JavaScript的发展，ECMAScript 6（ES6）引入了许多新的语言特性和语法糖，其中包括了面向对象编程的Class（类）机制。Class提供了一种更简洁、更直观的方式来定义对象和操作对象的行为。本文将介绍ES6中Class的概念、语法和特性，并通过示例代码来说明其实际应用。

## 1. 什么是面向对象编程？

面向对象编程（Object-Oriented Programming，简称OOP）是一种编程范式，它将程序中的对象作为基本单元，通过封装、继承和多态等机制来组织和管理代码。面向对象编程将现实世界中的实体抽象为代码中的对象，对象拥有自己的状态（属性）和行为（方法），并与其他对象进行交互。

面向对象编程有以下几个核心概念：

- **封装（Encapsulation）**：将数据和操作数据的方法封装在一个对象中，使其成为一个独立的实体，外部无法直接访问对象的内部实现细节。
- **继承（Inheritance）**：通过定义一个基类（父类），其他类可以继承该基类的属性和方法，并可以在此基础上进行扩展或覆盖。
- **多态（Polymorphism）**：不同对象可以对相同的方法做出不同的响应，即同一个方法可以根据调用对象的不同而具有不同的行为。

面向对象编程的优势包括代码的可重用性、可维护性、扩展性和灵活性等。

## 2. Class的基本概念

在ES6之前，JavaScript中的对象和面向对象编程的概念相对比较模糊。ES6引入了Class机制，使得JavaScript可以更加直观地定义和使用类。Class是一种特殊的函数，通过Class关键字定义。Class中可以定义构造函数、属性和方法等。

一个简单的Class示例如下：

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}
```

在上述示例中，我们定义了一个名为`Rectangle`的类，

它具有`width`和`height`两个属性，以及`area()`和`perimeter()`两个方法。通过Class定义的类可以通过实例化来创建具体的对象，并调用其属性和方法。

```javascript
const rect = new Rectangle(5, 3);
console.log(rect.area());       // 输出：15
console.log(rect.perimeter());  // 输出：16
```

## 3. Class的语法

ES6中Class的语法相对简洁明了。一个Class可以包含构造函数、属性和方法等。下面介绍一些常用的语法规则：

### 3.1 构造函数

在Class中使用`constructor`关键字定义构造函数。构造函数用于创建对象时进行初始化操作，通过`new`关键字实例化类时会自动调用构造函数。

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}
```

构造函数中的`this`关键字表示当前实例化的对象。

### 3.2 属性

在Class中可以定义各种属性。属性可以直接定义在Class的内部，也可以在构造函数中通过`this`关键字进行定义。

```javascript
class Rectangle {
  width = 0;    // 直接定义属性
  height = 0;

  constructor(width, height) {
    this.width = width;    // 在构造函数中定义属性
    this.height = height;
  }
}
```

### 3.3 方法

在Class中定义的函数称为方法。可以直接在Class的内部定义方法，也可以使用ES6的简写形式。

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {            // 定义方法
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}
```

### 3.4 方法的访问修饰符

在Class中，可以使用访问修饰符来限制方法的访问权限。ES6中的Class默认所有方法都是公共的，可以被外部调用。但我们可以使用`static`、`get`、`set`、`private`和`protected`等修饰符来控制方法的访问。

- `static`：定义静态方法，只能通过类本身调用，不能通过类的实例调用。
- `get`和`set`：定义属性的读取和设置方法，使用类似访问属性的语法进行调用。
- `private`：定义私有方法，只能在类的内部被访问，外部无法访问。
- `protected`：定义受保护方法，只能在类的内部和子类中被访问，外部无法访问。

```javascript
class Rectangle {
  static description = 'This is a rectangle';  // 静态属性

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  static createSquare(side) {     // 静态方法
    return new Rectangle(side, side);
  }



  get area() {           // Getter方法
    return this.width * this.height;
  }

  set area(value) {     // Setter方法
    this.width = Math.sqrt(value);
    this.height = Math.sqrt(value);
  }

  #privateMethod() {    // 私有方法
    console.log('This is a private method');
  }

  protectedMethod() {   // 受保护方法
    console.log('This is a protected method');
  }

  publicMethod() {      // 公共方法
    console.log('This is a public method');
    this.#privateMethod();
    this.protectedMethod();
  }
}
```

在上述示例中，我们定义了一个`Square`类，它继承自`Rectangle`类。通过`super`关键字调用父类的构造函数，确保父类的属性被正确初始化。子类可以新增或覆盖父类的方法。

```javascript
const square = new Square(5);
console.log(square.area());       // 输出：25
console.log(square.perimeter());  // 输出：20
```

## 4. 类的静态方法和属性

静态方法和属性属于类本身，而不是类的实例。静态方法和属性可以通过类名直接访问，无需实例化类。

```javascript
class MathUtil {
  static PI = 3.14159;    // 静态属性

  static square(number) {    // 静态方法
    return number * number;
  }
}
```

在上述示例中，我们定义了一个`MathUtil`类，它具有一个静态属性`PI`和一个静态方法`square()`。可以通过类名直接访问静态属性和方法。

```javascript
console.log(MathUtil.PI);        // 输出：3.14159
console.log(MathUtil.square(5)); // 输出：25
```

## 5. Getter和Setter方法

Getter和Setter方法用于对类的属性进行读取和设置操作，可以通过类似访问属性的语法进行调用。

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get diameter() {
    return 2 * this.radius;
  }

  set diameter(value) {
    this.radius = value / 2;
  }
}
```

在上述示例中，我们定义了一个`Circle`类，它具有一个属性`radius`。通过定义`get diameter()`方法和`set diameter()`方法，我们可以通过类似访问属性的方式来读取和设置直径（`diameter`）属性，而不需要直接访问`radius`属性。

```javascript
const circle = new Circle(5);
console.log(circle.diameter);     //

 输出：10
circle.diameter = 12;
console.log(circle.radius);       // 输出：6
```

## 6. 类的私有属性和方法

在ES6中，可以使用`#`作为前缀来定义私有属性和方法。私有属性和方法只能在类的内部被访问，外部无法访问。

```javascript
class Person {
  #name;   // 私有属性

  constructor(name) {
    this.#name = name;
  }

  #privateMethod() {   // 私有方法
    console.log('This is a private method');
  }

  publicMethod() {      // 公共方法
    console.log(`Hello, my name is ${this.#name}`);
    this.#privateMethod();
  }
}
```

在上述示例中，我们定义了一个`Person`类，它具有一个私有属性`#name`和一个私有方法`#privateMethod()`。私有属性和方法只能在类的内部访问。

```javascript
const person = new Person('John');
person.publicMethod();   // 输出：Hello, my name is John
person.#name;            // 报错：SyntaxError: Private field '#name' must be declared in an enclosing class
person.#privateMethod(); // 报错：SyntaxError: Private field '#privateMethod' must be declared in an enclosing class
```

## 7. 类的实例和构造函数

在ES6中，类的实例通过`new`关键字进行创建，并自动调用类的构造函数进行初始化。

```javascript
const rect = new Rectangle(5, 3);
console.log(rect.area());       // 输出：15
console.log(rect.perimeter());  // 输出：16
```

可以使用`instanceof`运算符来判断一个对象是否是某个类的实例。

```javascript
console.log(rect instanceof Rectangle);  // 输出：true
console.log(rect instanceof Object);     // 输出：true
```

## 8. 类的继承

继承是面向对象编程中的重要概念之一，它允许我们创建一个基类（父类），其他类可以继承该基类并扩展或覆盖其中的属性和方法。ES6中使用`extends`关键字实现类的继承。

```javascript
class Square extends Rectangle {
  constructor(side) {
    super(side, side);    // 调用父类的构造函数
  }
}
```

## 9. 类的封装

封装通过将数据和操作数据的方法封装在一个对象中，实现了数据的保护和访问的控制。类的属性和方法可以使用不同的访问修饰符来控制其可见性。

```javascript
class Rectangle {
  #width;  // 私有属性
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  getArea() {    // 公共方法
    return this.#width * this.#height;
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.#width);  // 报错：SyntaxError: Private field '#width' must be declared in an enclosing class
console.log(rect.getArea());  // 输出：15
```

在上述示例中，Rectangle类具有私有属性#width和#height，只能在类的内部被访问。通过定义公共方法getArea()来访问私有属性，从而实现了封装。

## 10. 类的多态

多态允许不同的对象对相同的消息作出不同的响应。通过继承和方法的覆盖，不同的子类可以对父类的方法进行不同的实现，从而实现多态性。

```javascript
class Animal {
  makeSound() {
    console.log('Animal makes sound');
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('Dog barks');
  }
}

class Cat extends Animal {
  makeSound() {
    console.log('Cat meows');
  }
}

const animal = new Animal();
const dog = new Dog();
const cat = new Cat();

animal.makeSound();  // 输出：Animal makes sound
dog.makeSound();     // 输出：Dog barks
cat.makeSound();     // 输出：Cat meows
```

在上述示例中，Animal类是基类，Dog和Cat类是子类。它们都具有makeSound()方法，但不同的子类对该方法进行了不同的实现，实现了多态性。

通过封装、继承和多态，面向对象编程提供了一种更加灵活和可扩展的编程方式，使得代码的组织和管理更加直观和高效。



# Iterator 迭代器

## 引言

在 JavaScript 中，迭代器（Iterator）是一种用于遍历集合的接口。迭代器提供了一种统一的方式来访问集合中的元素，无论集合的类型和内部结构如何。通过使用迭代器，我们可以轻松地遍历数组、对象、Map、Set 等各种数据结构，并进行相应的操作。本文将详细介绍迭代器的概念、属性、应用场景，并提供相关的代码示例。

## 1. 迭代器的概念

迭代器是一种遍历集合的接口，它提供了统一的方式来访问集合中的元素。迭代器对象是一个具有特定结构的对象，其中包含一个 `next` 方法，用于返回集合中的下一个元素。

迭代器的工作原理如下：

1. 创建一个迭代器对象，通常通过调用集合对象的 `Symbol.iterator` 方法来获取迭代器对象。
2. 调用迭代器对象的`next`方法，每次调用都会返回一个包含`value`和`done`两个属性的对象。
   - `value` 表示集合中的一个元素。
   - `done` 表示迭代是否已完成，如果为 `true`，则表示迭代结束；如果为 `false`，则表示还有更多元素可供遍历。
3. 重复调用 `next` 方法，直到迭代结束。

JavaScript 中的数组、对象、Map、Set 等数据结构都实现了迭代器接口，因此我们可以使用迭代器来遍历它们的元素。

## 2. 迭代器的属性

迭代器对象具有以下两个重要的属性：

- `next()`方法：该方法返回一个包含`value`和`done`两个属性的对象。
  - `value`：表示集合中的一个元素。
  - `done`：表示迭代是否已完成，如果为 `true`，则表示迭代结束；如果为 `false`，则表示还有更多元素可供遍历。

- `Symbol.iterator` 方法：该方法返回迭代器对象自身，用于支持迭代器的迭代。

## 3. 迭代器的应用场景

迭代器在 JavaScript 中有许多应用场景，下面是一些常见的应用场景：

### 3.1 数组遍历

使用迭代器可以轻松遍历数组的所有元素。通过调用数组对象的 `Symbol.iterator` 方法，可以获取一个迭代器对象，然后使用迭代器的 `next` 方法逐个访问数组的元素。

**示例代码：**

```javascript
const arr = [1, 2, 3, 4, 5];
const iterator = arr[Symbol.iterator]();

let result = iterator.next();
while

 (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
```

### 3.2 对象遍历

使用迭代器可以遍历对象的所有属性。通过调用对象的 `Symbol.iterator` 方法，可以获取一个迭代器对象，然后使用迭代器的 `next` 方法逐个访问对象的属性。

**示例代码：**

```javascript
const obj = { a: 1, b: 2, c: 3 };
const iterator = Object.keys(obj)[Symbol.iterator]();

let result = iterator.next();
while (!result.done) {
  const key = result.value;
  console.log(key, obj[key]);
  result = iterator.next();
}
```

### 3.3 Map 遍历

使用迭代器可以遍历 Map 对象的所有键值对。通过调用 Map 对象的 `entries()` 方法，可以获取一个迭代器对象，然后使用迭代器的 `next` 方法逐个访问 Map 的键值对。

**示例代码：**

```javascript
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
const iterator = map.entries();

let result = iterator.next();
while (!result.done) {
  const [key, value] = result.value;
  console.log(key, value);
  result = iterator.next();
}
```

### 3.4 Set 遍历

使用迭代器可以遍历 Set 对象的所有元素。通过调用 Set 对象的 `values()` 方法，可以获取一个迭代器对象，然后使用迭代器的 `next` 方法逐个访问 Set 的元素。

**示例代码：**

```javascript
const set = new Set([1, 2, 3, 4, 5]);
const iterator = set.values();

let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
```

## 4. 自定义迭代器

除了使用内置数据结构提供的迭代器之外，我们还可以自定义迭代器来遍历自定义数据结构。要实现一个自定义迭代器，我们需要定义一个具有 `next` 方法的对象，并且该对象的 `next` 方法需要返回一个包含 `value` 和 `done` 属性的对象。

**示例代码：**

```javascript
const myIterable = {
  data: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};

for (const item of myIterable) {
  console.log(item);
}
```

在上面的示例中，我们定义了一个自定义数据结构 `myIterable`，它包含一个数组 `data` 和一个自定义的迭代器对象。迭代器对象的 `next` 方法会依次返回数组中的元素，并在遍历结束时返回 `{ value: undefined, done: true }`。



# proxy

## Proxy是什么？

在JavaScript中，Proxy是一个特殊的“包装器”对象，它可以用于修改或扩展某些基本操作的行为，比如属性读取、函数调用等。这种修改或扩展的行为是通过所谓的"traps"实现的，这些"traps"定义了如何拦截和改变基本操作。

```javascript
let target = {
  name: "target"
};

let proxy = new Proxy(target, {
  get: function(target, property) {
    return property in target ? target[property] : "Default";
  }
});

console.log(proxy.name); // 输出 "target"
console.log(proxy.unknown); // 输出 "Default"
```

在上面的例子中，当我们尝试从proxy读取不存在的属性时，我们得到了"default"，而不是通常的"undefined"。这是因为我们的"get" trap拦截了读取操作，并返回了默认值。

## Proxy的用途

Proxy有许多用途，下面是一些常见的例子：

### 数据校验

Proxy可以用于校验设置对象属性的值：

```javascript
let validator = {
  set: function(target, property, value) {
    if (property === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value < 0 || value > 200) {
        throw new RangeError("The age is invalid");
      }
    }

    target[property] = value;
    return true;
  }
};

let person = new Proxy({}, validator);

person.age = 100; // 正常
console.log(person.age); // 输出 100
person.age = "young"; // 抛出 TypeError: The age is not an integer
person.age = 300; // 抛出 RangeError: The age is invalid
```

### 数据绑定和观察

Proxy可以用于实现数据绑定和观察（数据变化的监听）：

```javascript
let handler = {
  set: function(target, property, value) {
    console.log(`${property} is set to ${value}`);
    target[property] = value;
    return true;
  }
};

let proxy = new Proxy({}, handler);

proxy.name = "proxy"; // 输出 "name is set to proxy"
```

### 函数参数的默认值

Proxy可以用于给函数参数设置默认值：

```javascript
function defaultValues(target, defaults) {
  return new Proxy(target, {
    apply: function(target, thisArg, args) {
      args = args.map((arg, index) => arg === undefined ? defaults[index] : arg);
     

 return target.apply(thisArg, args);
    }
  });
}

let add = defaultValues(function(x, y) {
  return x + y;
}, [0, 0]);

console.log(add(1, 1)); // 输出 2
console.log(add(undefined, 1)); // 输出 1
console.log(add(1)); // 输出 1
```

以上仅仅是Proxy能做的事情的一部分。在实际开发中，你可以根据需要灵活使用Proxy。

## Proxy vs Reflect

在ES6中引入了另一个新的全局对象`Reflect`，它提供了一组用于执行JavaScript基本操作的方法，例如`Reflect.get()`，`Reflect.set()`等。这些方法与Proxy的traps一一对应。这使得Proxy的traps可以使用对应的Reflect方法来执行被拦截的操作：

```javascript
let proxy = new Proxy(target, {
  get: function(target, property) {
    return Reflect.get(target, property);
  }
});
```

Reflect的方法有许多优点。首先，它们总是返回一个期望的值，使得代码更易于理解和调试。其次，它们提供了一种正确处理JavaScript基本操作的方法。例如，使用`Reflect.set()`可以正确处理设置只读属性的情况。



# Reflect

`Reflect`是ES6中引入的一个新的内置对象，提供了一组静态方法，这些方法与一些操作符和语句的行为是一致的。`Reflect`对象的方法可以被用于代替一些传统的操作，比如属性的获取、设置、删除，函数的调用等，同时也提供了一些元编程的能力。

下面是`Reflect`对象的一些常用方法：

## 1. 属性操作方法：

- `Reflect.get(target, propertyKey, receiver)`：获取对象的属性值。
- `Reflect.set(target, propertyKey, value, receiver)`：设置对象的属性值。
- `Reflect.has(target, propertyKey)`：检查对象是否具有特定属性。
- `Reflect.deleteProperty(target, propertyKey)`：删除对象的属性。
- `Reflect.getOwnPropertyDescriptor(target, propertyKey)`：获取对象的属性描述符。
- `Reflect.defineProperty(target, propertyKey, attributes)`：定义对象的属性。
- `Reflect.isExtensible(target)`：判断对象是否可扩展。
- `Reflect.preventExtensions(target)`：阻止对象的扩展。
- `Reflect.ownKeys(target)`：返回对象的所有自有属性的键名。

下面我来举几个例子，展示如何使用Reflect对象的方法来完成属性操作和元编程任务。

### 1. 使用 Reflect.get() 获取对象的属性值：

```js
js
复制代码let person = {
    name: 'John',
    age: 30
};

console.log(Reflect.get(person, 'name')); // Output: John
```

### 2. 使用 Reflect.set() 设置对象的属性值：

```js
js
复制代码let person = {
    name: 'John',
    age: 30
};

Reflect.set(person, 'age', 35);
console.log(person.age); // Output: 35
```

### 3. 使用 Reflect.has() 检查对象是否具有特定属性：

```js
js
复制代码let person = {
    name: 'John',
    age: 30
};

console.log(Reflect.has(person, 'name')); // Output: true
console.log(Reflect.has(person, 'city')); // Output: false
```

### 4. 使用 Reflect.deleteProperty() 删除对象的属性：

```js
js
复制代码let person = {
    name: 'John',
    age: 30
};

Reflect.deleteProperty(person, 'age');
console.log(person); // Output: { name: 'John' }
```

### 5. 使用 Reflect.defineProperty() 定义对象的属性：

```js
js
复制代码let person = {};

Reflect.defineProperty(person, 'name', {
    value: 'John',
    writable: true,
    configurable: true,
    enumerable: true
});

console.log(person.name); // Output: John
```

### 6. 使用 Reflect.ownKeys() 返回对象的所有自有属性的键名：

```js
js
复制代码let person = {
    name: 'John',
    age: 30
};

console.log(Reflect.ownKeys(person)); // Output: [ 'name', 'age' ]
```

## 2. 函数调用方法：

- `Reflect.apply(target, thisArgument, argumentsList)`：调用函数，可以传递`this`值和参数列表。
- `Reflect.construct(target, argumentsList, newTarget)`：相当于使用`new`关键字调用构造函数。

## 3. 原型方法：

- `Reflect.getPrototypeOf(target)`：获取对象的原型。
- `Reflect.setPrototypeOf(target, prototype)`：设置对象的原型。

## 4. 转换方法：

- `Reflect.toPrimitive(target, hint)`：将对象转换为相应的原始值。
- `Reflect.toString(target)`：将对象转换为字符串。
- `Reflect.valueOf(target)`：返回对象的原始值。

## 5. Proxy拦截方法：

`Reflect`对象的方法可以被用于与`Proxy`对象配合，以进行更灵活的代理操作。

通过使用`Reflect`，你可以更方便地调用内置的操作，它们具有一致的语法和行为，这使得代码更具可读性和一致性。而且，`Reflect`的方法在某些情况下会比直接操作对象更安全，因为它们会返回一个布尔值或者抛出异常来表明操作是否成功。

## 总结

Proxy 和 Reflect 是 ES6 中引入的两个重要的特性，它们都为 JavaScript 的元编程提供了强大的支持。

### Proxy

1. **基本概念**：
   - Proxy 允许你创建一个代理对象，可以拦截并自定义 JavaScript 对象的基本操作。
2. **用法**：
   - 可以拦截目标对象的操作，比如属性查找、赋值、枚举等。
   - Proxy 提供了一系列捕获器（handlers）来定义代理对象的行为，例如 `get`、`set`、`has`、`deleteProperty` 等。
3. **优势**：
   - 允许在对象操作层面进行拦截和定制，提供了更高级的控制和行为修改能力。
   - 支持对对象的读取和设置等操作进行自定义处理，增强了代码的灵活性和可维护性。

### Reflect

1. **基本概念**：
   - Reflect 是一个内置对象，提供了一组静态方法，这些方法与一些操作符和语句的行为是一致的。
2. **用法**：
   - 提供了一系列方法，用于替代传统的操作，比如属性的获取、设置、删除，函数的调用等。
   - Reflect 方法与对应的操作符或语句的行为一致，例如 `Reflect.get()`、`Reflect.set()`、`Reflect.has()` 等。
3. **优势**：
   - 提供了更统一和一致的 API，使得操作更加可预测和可控。
   - 支持一些元编程的能力，使得代码更加易于理解和维护。

### 综合特性

1. **配合使用**：
   - Proxy 和 Reflect 可以结合使用，通过 Proxy 拦截器捕获对象的操作，然后通过 Reflect 方法进行相应的操作。
2. **元编程能力**：
   - Proxy 和 Reflect 为 JavaScript 提供了强大的元编程能力，使得开发者可以更灵活地操作和定制对象的行为。
3. **ES6 增强**：
   - 这两个特性是 ES6 的重要增强，为 JavaScript 的语言特性提供了更多的可能性和便利性。

在开发中，Proxy 和 Reflect 可以帮助开发者实现更加复杂和灵活的代码逻辑，提升了代码的可读性和可维护性，是现代 JavaScript 开发中不可或缺的重要特性。



作者：来颗奇趣蛋
链接：https://juejin.cn/post/7333236033038647337
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



# 修饰器（Decorator）

## 引言

在JavaScript中，修饰器（Decorator）是一种特殊的语法，用于修改类、方法或属性的行为。修饰器提供了一种简洁而灵活的方式来扩展和定制代码功能。本文将详细介绍JavaScript修饰器的概念、语法和应用场景，并提供相关的代码示例。

## 1. 修饰器简介

修饰器是一种用于修改类、方法或属性的语法，它可以在不修改原始代码的情况下增强其功能。修饰器可以实现横切关注点（cross-cutting concerns）的功能，例如日志记录、性能分析、缓存等。通过将这些功能与原始代码分离，我们可以更好地组织和维护代码，并实现更高的可重用性和可扩展性。

## 2. 修饰器语法

修饰器使用`@`符号作为前缀，紧跟着修饰器函数或类。修饰器可以接收不同的参数，根据修饰的目标不同，参数也会有所区别。修饰器可以单独使用，也可以通过组合多个修饰器来实现更复杂的功能。

下面是一个基本的修饰器语法示例：

```javascript
@decorator
class MyClass {
  @propertyDecorator
  myProperty = 123;

  @methodDecorator
  myMethod() {
    // 代码逻辑
  }
}
```

## 3. 类修饰器

### 应用场景

类修饰器用于修改类的行为和属性。它可以在类定义之前应用，以修改类的构造函数或原型。

常见的应用场景包括：

- **日志记录**：在类的方法执行前后记录日志信息。
- **验证和授权**：对类的方法进行验证和授权操作。
- **性能分析**：测量类的方法执行时间，进行性能分析。
- **依赖注入**：为类的构造函数注入依赖项。

### 示例代码

下面是一个使用类修饰器实现日志记录

的示例：

```javascript
function log(target) {
  const originalConstructor = target;

  function newConstructor(...args) {
    console.log(`Creating instance of ${originalConstructor.name}`);
    return new originalConstructor(...args);
  }

  return newConstructor;
}

@log
class MyClass {
  constructor(name) {
    this.name = name;
  }
}

const myObj = new MyClass("John");
```

在上面的示例中，我们定义了一个名为`log`的修饰器函数。该修饰器函数接收一个参数`target`，表示要修饰的类构造函数。在修饰器函数内部，我们将原始的构造函数保存到`originalConstructor`中，并创建一个新的构造函数`newConstructor`，该构造函数在创建实例前打印日志信息。最后，我们将新的构造函数返回作为修饰后的类构造函数。

## 4. 方法修饰器

### 应用场景

方法修饰器用于修改类的方法行为。它可以在方法定义之前应用，以修改方法的特性和行为。

常见的应用场景包括：

- **日志记录**：在方法执行前后记录日志信息。
- **验证和授权**：对方法进行验证和授权操作。
- **性能分析**：测量方法执行时间，进行性能分析。
- **缓存**：为方法添加缓存功能，提高性能。

### 示例代码

下面是一个使用方法修饰器实现日志记录的示例：

```javascript
function log(target, name, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`Executing method ${name}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${name} executed`);
    return result;
  };

  return descriptor;
}

class MyClass {
  @log
  myMethod() {
    // 代码逻辑
  }
}

const myObj = new MyClass();
myObj.myMethod();
```

在上面的示例中，我们定义了一个名为`log`的修饰器函数。该修饰器函数接收三个参数，分别是`target`（类的原型或构造函数）、`name`（方法名）和`descriptor`（方法的属性描述符）。在修饰器函数内部，我们获取原始方法并将其保存到`originalMethod`中。然后，我们修改`descriptor.value`，将其替换为一个新的函数，该函数在执行原始方法前后打印日志信息。最后，我们返回修改后的属性描述符。

## 5. 属性修饰器

### 应用场景

属性修饰器用于修改类的属性行为。它可以在属性定义之前应用，以修改属性的特性和行为。

常见的应用场景包括：

- **日志记录**：在属性读取或写入时记录日志信息。
- **验证和授权**：对属性进行验证和授权操作。
- **计算属性**：根据其他属性的值计算属性的值。
- **缓存**：为属性添加

缓存功能，提高性能。

### 示例代码

下面是一个使用属性修饰器实现日志记录的示例：

```javascript
function log(target, name) {
  let value;

  const getter = function() {
    console.log(`Getting value of property ${name}`);
    return value;
  };

  const setter = function(newValue) {
    console.log(`Setting value of property ${name}`);
    value = newValue;
  };

  Object.defineProperty(target, name, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class MyClass {
  @log
  myProperty;
}

const myObj = new MyClass();
myObj.myProperty = 123;
const value = myObj.myProperty;
```

在上面的示例中，我们定义了一个名为`log`的修饰器函数。该修饰器函数接收两个参数，分别是`target`（类的原型或构造函数）和`name`（属性名）。在修饰器函数内部，我们定义了一个名为`getter`的函数，用于获取属性值，并在获取属性值时打印日志信息。我们还定义了一个名为`setter`的函数，用于设置属性值，并在设置属性值时打印日志信息。最后，我们使用`Object.defineProperty`方法将修饰后的属性定义到类的原型上。

## 6. 参数修饰器

### 应用场景

参数修饰器用于修改方法的参数行为。它可以在方法参数声明之前应用，以修改参数的特性和行为。

常见的应用场景包括：

- **验证和授权**：对方法的参数进行验证和授权操作。
- **日志记录**：在方法执行前后记录参数信息。
- **参数转换**：对方法的参数进行类型转换或格式化操作。

### 示例代码

下面是一个使用参数修饰器实现参数验证的示例：

```javascript
function validate(target, name, index, validator) {
  const originalMethod = target[name];

  target[name] = function(...args) {
    const value = args[index];
    if (validator(value)) {
      return originalMethod.apply(this, args);
    } else {
      throw new Error(`Invalid value for parameter ${index} of method ${name}`);
    }
  };
}

class MyClass {
  myMethod(@validate isNumber) {
    // 代码逻辑
  }
}

function isNumber(value) {
  return typeof value === "number";
}

const myObj = new MyClass();
myObj.myMethod(123);
```

在上面的示例中，我们定义了一个名为`validate`的修饰器函数。该修饰器函数接收四个参数，分别是`target`（类的原型或构造函数）、`name`（方法名）、`index`（参数索引）和`validator`（验证函数）。在修饰器函数内部，我们获取原始方法并将其保存到`originalMethod`中。然后，我们修改`target[name]`，将其替换为一个新的函数，该函数在执行原始方法之前对指定参数进行验证。如果参数通过验证，就继续执行原始方法；否则，抛出一个错误

。最后，我们使用`@validate`修饰器应用参数验证。

## 7. 修饰器组合和执行顺序

可以通过组合多个修饰器来实现更复杂的功能。修饰器的执行顺序从上到下，从右到左。

```javascript
function log(target, name, descriptor) {
  // 日志记录逻辑
}

function validate(target, name, index, validator) {
  // 参数验证逻辑
}

class MyClass {
  @log
  @validate(isNumber)
  myMethod(@validate(isString) param1, @validate(isBoolean) param2) {
    // 代码逻辑
  }
}
```

在上面的示例中，我们通过使用`@log`修饰器和`@validate`修饰器组合，为类的方法和参数添加日志记录和验证功能。修饰器的执行顺序是从上到下，从右到左。

## 8. 常用修饰器库和工具

除了原生的修饰器语法，还有许多优秀的修饰器库和工具可供使用。一些常见的库和工具包括：

- **core-decorators**：提供了一组常用的修饰器，如`@readonly`、`@debounce`、`@throttle`等。[GitHub 地址open in new window](https://github.com/jayphelps/core-decorators)
- **lodash-decorators**：基于Lodash库的修饰器集合，提供了许多实用的修饰器。[GitHub 地址open in new window](https://github.com/steelsojka/lodash-decorators)
- **mobx**：流行的状态管理库MobX使用修饰器来实现响应式数据和自动触发更新。[官方文档open in new window](https://mobx.js.org/README.html)
- **nestjs**：基于Node.js的框架NestJS使用修饰器来实现依赖注入、路由定义等功能。[官方文档open in new window](https://docs.nestjs.com/)

## 9. 结论

JavaScript修饰器是一种强大的语法，它能够简化代码、增强功能，并提高代码的可维护性和可扩展性。通过使用修饰器，我们可以轻松地实现日志记录、验证和授权、性能分析等常见的功能，同时保持代码的整洁和可读性。修饰器在许多库和框架中得到了广泛的应用，为开发者提供了更好的开发体验和工具支持。



# MutationObserver

## 引言

在Web开发中，操作和监测DOM元素的变化是一项常见的任务。MutationObserver是JavaScript提供的一个强大的API，用于异步监测DOM树的变化，并在发生变化时执行相应的操作。本文将详细介绍MutationObserver的属性、应用场景以及使用示例，帮助读者充分理解和应用这一强大的工具。

## MutationObserver简介

MutationObserver是一个JavaScript的API，用于监测DOM树的变化。它提供了一种异步的方式来监听DOM元素的增加、删除、属性变化等操作，以及文本节点的修改。通过MutationObserver，开发者可以实时地捕捉到DOM的变化，并做出相应的响应。

MutationObserver是在2012年引入的，目前被广泛支持的浏览器（包括Chrome、Firefox、Safari、Edge等）都提供了对MutationObserver的支持。

## MutationObserver的属性

MutationObserver提供了一些属性，用于配置和控制观察器的行为。下面是一些常用的属性：

- **attributes**：是否监测元素的属性变化。
- **attributeOldValue**：是否在属性变化时记录旧值。
- **attributeFilter**：指定要监测的属性列表。
- **childList**：是否监测子元素的添加或移除。
- **subtree**：是否监测后代元素的变化。
- **characterData**：是否监测文本节点的内容变化。
- **characterDataOldValue**：是否在文本节点内容变化时记录旧值。

通过这些属性，可以灵活地配置MutationObserver的观察行为，以满足不同的需求。

## MutationObserver的应用场景

MutationObserver在许多场景下都能发挥重要作用。下面是一些常见的应用场景：

### 动态内容加载

当页面中的内容是通过异步加载或动态生成时，可以使用MutationObserver来监测内容的变化，并在变化发生后进行相应的处理，如更新页面布局、添加事件监听器等。例如，在无限滚动加载的场景中，当新的内容被加载到页面时，可以使用MutationObserver来自动监听内容的变化，并在变化发生后动态添加相应的元素或事件。

### 表单验证

当需要实时验证用户输入时，可以使用MutationObserver来监测表单元素的变化，以及对应的属性变化，如值的变化、禁用状态的变化等。这样可以及时地对用户的输入进行验证和反馈。例如，在一个表单中，当用户输入时，可以使用MutationObserver来监测输入框的值变化，并在值变化后进行实时的表单验证。

### 响应式布局

当页面布局需要根据DOM变化自适应调整时，可以使用MutationObserver来监测相关元素的变化，并根据变化动态地调整页面布局。例如，在响应式网页设计中，当窗口大小发生变化或元素被添加或移除时，可以使用MutationObserver来监听相关元素的变化，并根据变化重新计算和调整页面布局，以适应不同的设备和屏幕尺寸。

### 自定义组件开发

在自定义组件的开发中，MutationObserver可以用于监听组件内部的DOM变化，以及对应的属性变化。这样可以在组件内部做出相应的处理，如更新组件的状态、重新渲染组件等。例如，当一个自定义组件中的某个子元素被添加或移除时，可以使用MutationObserver来监听这些变化，并在变化发生后更新组件的状态或重新渲染组件。

## 使用MutationObserver的示例

下面通过几个示例来演示如何使用MutationObserver进行DOM变化的监测。

### 监测元素属性变化

下面的示例代码演示了如何使用MutationObserver监测元素的属性变化，并在变化发生后进行相应的处理：

```javascript
// 目标元素
const targetElement = document.querySelector('#target');

// 创建一个MutationObserver实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      console.log(`属性 ${mutation.attributeName} 发生变化`);
      // 执行相应的处理逻辑
    }
  });
});

// 配置观察器
const config = {
  attributes: true,
};

// 启动观察器
observer.observe(targetElement, config);
```

在上述代码中，我们首先选择了一个目标元素，然后创建了一个MutationObserver实例。接下来，我们配置了观察器，指定我们要监测的变化类型为属性变化。最后，我们通过调用`observe`方法，将观察器绑定到目标元素上。

当目标元素的属性发生变化时，MutationObserver的回调函数将被调用，并传递一个`mutations`参数，该参数包含了所有发生的变化。在回调函数中，我们可以根据变化的类型（`mutation.type`）来判断具体的变化类型，并执行相应的处理逻辑。

### 监测子元素的添加或移除

下面的示例代码演示了如何使用MutationObserver监测子元素的添加或移除，并在变化发生后进行相应的处理：

```javascript
// 目标元素
const targetElement = document.querySelector('#target');

// 创建一个MutationObserver实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
     

 mutation.addedNodes.forEach((addedNode) => {
        console.log(`添加了子元素：${addedNode.nodeName}`);
        // 执行相应的处理逻辑
      });

      mutation.removedNodes.forEach((removedNode) => {
        console.log(`移除了子元素：${removedNode.nodeName}`);
        // 执行相应的处理逻辑
      });
    }
  });
});

// 配置观察器
const config = {
  childList: true,
};

// 启动观察器
observer.observe(targetElement, config);
```

在上述代码中，我们创建了一个MutationObserver实例，并将观察器配置为监测子元素的添加或移除。当目标元素的子元素发生添加或移除操作时，MutationObserver的回调函数将被调用，并传递一个`mutations`参数，该参数包含了所有发生的变化。在回调函数中，我们可以根据变化的类型（`mutation.type`）为`childList`来判断子元素的添加或移除操作，并执行相应的处理逻辑。

### 监测文本节点的内容变化

下面的示例代码演示了如何使用MutationObserver监测文本节点的内容变化，并在变化发生后进行相应的处理：

```javascript
// 目标元素
const targetElement = document.querySelector('#target');

// 创建一个MutationObserver实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'characterData') {
      console.log(`文本节点内容发生变化：${mutation.target.nodeValue}`);
      // 执行相应的处理逻辑
    }
  });
});

// 配置观察器
const config = {
  characterData: true,
};

// 启动观察器
observer.observe(targetElement, config);
```

在上述代码中，我们创建了一个MutationObserver实例，并将观察器配置为监测文本节点的内容变化。当目标元素的文本节点的内容发生变化时，MutationObserver的回调函数将被调用，并传递一个`mutations`参数，该参数包含了所有发生的变化。在回调函数中，我们可以根据变化的类型（`mutation.type`）为`characterData`来判断文本节点的内容变化，并执行相应的处理逻辑。

## MutationObserver的浏览器兼容性

MutationObserver已经在大多数现代浏览器中得到支持，包括Chrome、Firefox、Safari、Edge等。然而，考虑到一些老旧的浏览器版本，建议在使用MutationObserver之前，检查浏览器的兼容性。

可以通过以下链接查看MutationObserver的浏览器兼容性信息：

- [Can I use MutationObserver?open in new window](https://caniuse.com/?search=MutationObserver)

## 总结

MutationObserver是一个强大的工具，用于监测DOM树的变化。通过MutationObserver，我们可以异步地监听DOM元素的增加、删除、属性变化等操作，并在发生变化时执行相应的操作。它在动态内容加载、表单验证、响应式布局、自定义组件开发等场景下发挥重要作用。本文介绍了MutationObserver的属性、应用场景以及使用示例，



# requestAnimationFrame

## 引言

在Web开发中，实现平滑且高性能的动画和渲染是一个关键的需求。而requestAnimationFrame是浏览器提供的一个用于优化动画和渲染的API。它可以协调浏览器的刷新率，帮助开发者实现流畅的动画效果，并提供更高效的渲染方式。本文将详细介绍requestAnimationFrame的属性、应用场景以及使用示例，帮助读者深入理解和应用这一强大的工具。

## requestAnimationFrame简介

requestAnimationFrame是浏览器提供的一个用于优化动画和渲染的API。它基于浏览器的刷新率，调度回调函数的执行，以确保动画和渲染的流畅性和高性能。

使用requestAnimationFrame，开发者可以在每个浏览器刷新帧之前请求执行一个函数。浏览器会在适当的时机调用这个函数，以保证动画和渲染的协调性。通过与浏览器的合作，requestAnimationFrame可以避免不必要的渲染操作，并确保动画的效果更加平滑。

requestAnimationFrame在现代浏览器中得到广泛支持，并成为实现高性能动画和渲染的首选方式。

## requestAnimationFrame的属性

requestAnimationFrame提供了一些属性，用于控制和管理动画和渲染的执行。下面是一些常用的属性：

- **callback**：一个函数，表示要在下一次浏览器刷新帧之前执行的回调函数。
- **id**：一个整数，表示回调函数的唯一标识符。可以用于取消回调函数的执行。

通过这些属性，开发者可以精确地控制和管理动画和渲染的执行过程。

## requestAnimationFrame的应用场景

requestAnimationFrame在许多场景下都能发挥重要作用。下面是一些常见的应用场景：

### 动画效果

当需要实现平滑的动画效果时，requestAnimationFrame是一个理想的选择。通过使用requestAnimationFrame，可以在每个浏览器刷新帧之前更新动画的状态，并在合适的时机进行渲染。这样可以确保动画的流畅性，并减少不必要的渲染操作。例如，实现平滑的过渡效果、动态的图表展示等都可以使用requestAnimationFrame来实现。

### 游戏开发

在游戏开发中，高性能和流畅的渲染是至关重要的。requestAnimationFrame提供了一种高效的渲染方式，可以与游戏引

擎配合使用，实现流畅的游戏画面和良好的用户体验。通过在每个浏览器刷新帧之前更新游戏的状态并进行渲染，可以实现高性能的游戏效果。例如，实时的射击游戏、跑酷游戏等都可以使用requestAnimationFrame来实现。

### 数据可视化

在数据可视化的场景中，展示大量的数据并实时更新是一项挑战。使用requestAnimationFrame，可以在每个浏览器刷新帧之前更新数据的可视化状态，并进行相应的渲染。这样可以实现高效的数据可视化，并保持良好的性能和交互性。例如，绘制实时图表、展示动态地图等都可以使用requestAnimationFrame来实现。

### UI动效

在网页开发中，为用户提供吸引人的UI动效是一种常见的需求。使用requestAnimationFrame，可以实现各种各样的UI动效，如平滑的滚动效果、渐变动画、拖拽效果等。通过在每个浏览器刷新帧之前更新UI状态并进行渲染，可以实现流畅和高性能的UI动效。

## 使用requestAnimationFrame的示例

下面通过几个示例来演示如何使用requestAnimationFrame来实现动画和渲染效果。

### 实现平滑的滚动效果

下面的示例代码演示了如何使用requestAnimationFrame实现平滑的滚动效果：

```javascript
function smoothScrollTo(targetY, duration) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const ease = easingFunction(progress);
    window.scrollTo(0, startY + distance * ease);

    if (elapsedTime < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function easingFunction(t) {
  return t * t * t;
}

// 使用示例
const button = document.querySelector('#scrollButton');
button.addEventListener('click', () => {
  smoothScrollTo(1000, 1000);
});
```

在上述代码中，我们定义了一个`smoothScrollTo`函数，用于实现平滑的滚动效果。该函数接收目标位置`targetY`和滚动的持续时间`duration`作为参数。在函数内部，我们获取当前的滚动位置`startY`和目标位置与起始位置之间的距离`distance`。然后，我们使用`performance.now()`获取当前的时间戳`startTime`，并定义一个`step`函数用于更新滚动位置。在`step`函数中，我们根据时间的流逝计算出进度`progress`，并使用缓动函数`easingFunction`来调整进度。最后，我们使用

`requestAnimationFrame`调度`step`函数的执行，并在滚动动画完成之前不断更新滚动位置。

### 实现粒子动画效果

下面的示例代码演示了如何使用requestAnimationFrame实现粒子动画效果：

```javascript
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const particles = [];

function Particle(x, y, speedX, speedY, radius, color) {
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.radius = radius;
  this.color = color;
}

Particle.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;

  if (this.x + this.radius < 0 || this.x - this.radius > canvas.width) {
    this.speedX = -this.speedX;
  }

  if (this.y + this.radius < 0 || this.y - this.radius > canvas.height) {
    this.speedY = -this.speedY;
  }
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};

function createParticles() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = Math.random() * 4 - 2;
    const speedY = Math.random() * 4 - 2;
    const radius = Math.random() * 5 + 1;
    const color = getRandomColor();

    particles.push(new Particle(x, y, speedX, speedY, radius, color));
  }
}

function updateParticles() {
  particles.forEach((particle) => {
    particle.update();
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.draw();
  });

  requestAnimationFrame(drawParticles);
}

// 使用示例
createParticles();
drawParticles();

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
```

在上述代码中，我们定义了一个`Particle`构造函数，用于创建粒子对象。粒子对象包含位置坐标`x`和`y`、速度`speedX`和`speedY`、半径`radius`和颜色`color`等属性。我们还为`Particle`对象添加了`update`方法和`draw`方法，用于更新粒子的位置和绘制粒子的图形。

我们还定义了`createParticles`函数，用于创建一定数量的粒子，并随机生成它们的初始位置、速度、半径和颜色。在`drawParticles`函数中，我们使用`requestAnimationFrame`调度`drawParticles`函数的执行，并在每一帧清空画布、更新粒子的位置和绘制粒子的图形。

通过上述示例，我们可以看到使用requestAnimationFrame可以轻松实现平滑的动画效果和高性能的渲染。

## 总结

requestAnimationFrame是浏览器提供的用于优化动画和渲染的API，它通过与浏览器的合作，协调刷新率并在合适的时机执行回调函数，从而实现流畅的动画效果和高性能的渲染。

本文详细介绍了requestAnimationFrame的属性、应用场景以及使用示例。通过使用requestAnimationFrame，开发者可以实现平滑的滚动效果、高性能的游戏渲染、复杂的数据可视化和吸引人的UI动效等。同时，本文提供了几个示例代码，帮助读者更好地理解和应用requestAnimationFrame。

请记住，使用requestAnimationFrame时应注意避免过度使用和滥用，以免对浏览器性能造成负面影响。合理利用requestAnimationFrame，结合适当的优化和控制，能够提供更好的用户体验和更高效的渲染方式。



# Performance

## 引言

在现代 Web 开发中，性能优化是一个关键的方面。用户期望快速加载的网页，而慢速的加载和响应时间可能导致用户流失和不良的用户体验。为了满足用户的需求，我们需要准确地测量和分析网页的性能，并采取相应的优化措施。

Performance API 是浏览器提供的一组接口，可以让开发者测量和监控网页的性能表现。它提供了丰富的属性和方法，可以帮助我们了解网页加载的时间、资源的使用情况、代码执行的性能等关键指标。本文将详细介绍 Performance API 的属性和 API，探讨其应用场景，并提供相关的代码示例和引用资料链接。

## 1. Performance API 简介

Performance API 是 Web API 的一部分，旨在提供与浏览器性能相关的信息和指标。它通过提供一组属性和方法，使开发者能够测量和分析网页的性能，以便进行性能优化。

Performance API 的核心对象是 `performance`，它代表了网页的性能信息。通过 `performance` 对象，我们可以访问各种性能指标、测量和记录时间戳、计算代码执行时间等。

- `navigation`：提供了与导航相关的性能指标，如页面加载时间、重定向次数、响应时间等。
- `timing`：提供了与页面加载和资源加载相关的性能指标，如 DNS 查询时间、TCP 连接时间、DOM 解析时间等。
- `memory`：提供了与内存使用情况相关的性能指标，如内存限制、已使用内存、垃圾回收次数等。
- `navigationTiming`：提供了更详细的页面加载时间指标，如重定向时间、解析 DOM 树时间、首次渲染时间等。

Performance API 还提供了一些方法，用于测量和记录时间戳、添加标记、计算代码执行时间等。

## 2. Performance API 属性和 API

### 2.1 navigation

`performance.navigation` 属性提供了与导航相关的性能指标，可以帮助我们了解页面的加载时间、重定向次数、响应时间等。

- `performance.navigation.type`：表示导航类型，如新页面加载、页面刷新、页面后退等。
- `performance.navigation.redirectCount`：表示页面重定向的次数。

这些 navigation 属性可以用于分析页面的导航行为和性能表现。

**示例代码：**

```javascript
console.log(`导航类型: ${performance.navigation.type}`);
console.log(`重定向次数: ${performance.navigation.redirectCount}`);
```

### 2.2 timing

`performance.timing` 属性提供了与页面加载和资源加载相关的性能指标，可以帮助我们了解页面加载的各个阶段所花费的时间。

- `performance.timing.navigationStart`：表示页面开始导航的时间。
- `performance.timing.fetchStart`：表示开始获取页面资源的时间。
- `performance.timing.domContentLoadedEventStart`：表示 DOMContentLoaded 事件开始的时间。
- `performance.timing.loadEventStart`：表示 load 事件开始的时间。

这些 timing 属性可以用于分析页面的加载性能，找出加载过程中的瓶颈。

**示例代码：**

```javascript
console.log(`导航开始时间: ${performance.timing.navigationStart}`);
console.log(`资源获取开始时间: ${performance.timing.fetchStart}`);
console.log(`DOMContentLoaded 事件开始时间: ${performance.timing.domContentLoadedEventStart}`);
console.log(`load 事件开始时间: ${performance.timing.loadEventStart}`);
```

### 2.3 memory

`performance.memory` 属性提供了与内存使用情况相关的性能指标，可以帮助我们了解页面的内存限制、已使用内存、垃圾回收次数等信息。

- `performance.memory.jsHeapSizeLimit`：表示 JavaScript 堆的大小限制。
- `performance.memory.usedJSHeapSize`：表示已使用的 JavaScript 堆大小。
- `performance.memory.totalJSHeapSize`：表示 JavaScript 堆的总大小。

这些 memory 属性可以用于监控页面的内存使用情况，及时发现内存泄漏或过度使用内存的问题。

**示例代码：**

```javascript
console.log(`JavaScript 堆大小限制: ${performance.memory.jsHeapSizeLimit}`);
console.log(`已使用的 JavaScript 堆大小: ${performance.memory.usedJSHeapSize}`);
console.log(`JavaScript 堆的总大小: ${performance.memory.totalJSHeapSize}`);
```

### 2.4 navigationTiming

`performance.getEntriesByType('navigation')` 方法返回与页面加载时间相关的详细信息，提供了更详细的页面加载时间指标，如重定向时间、解析 DOM 树时间、首次渲染时间等。

- `navigationTiming.redirectTime`：表示重定向时间。
- `navigationTiming.domInteractiveTime`：表示 DOM 解析完成的时间。
- `navigationTiming.domContentLoadedTime`：表示 DOMContentLoaded 事件触发的时间。
- `navigationTiming.loadEventTime`：表示 load 事件触发的时间。

这些 navigationTiming 属性可以用于更细粒度地分析页面加载的各个阶段所花费的时间。

**示例代码：**

```javascript
const entries = performance.getEntriesByType('navigation');
const navigationTiming = entries[0];

console.log(`重定向时间: ${navigationTiming.redirectTime}`);
console.log(`DOM 解析完成时间: ${navigationTiming.domInteractiveTime}`);
console.log(`DOMContentLoaded 事件触发时间: ${navigationTiming.domContentLoadedTime}`);
console.log(`load 事件触发时间: ${navigationTiming.loadEventTime}`);
```

### 2.5 其他方法

Performance API

还提供了一些其他方法，用于测量和记录时间戳、添加标记、计算代码执行时间等。

- `performance.now()`：返回当前时间戳，可用于测量代码执行时间。
- `performance.mark()`：添加一个时间戳标记，用于记录关键时刻。
- `performance.measure()`：计算两个时间戳标记之间的时间间隔。
- `performance.getEntriesByName()`：获取指定名称的时间戳标记信息。

这些方法可以帮助我们精确测量代码的执行时间和关键事件的发生时间。

**示例代码：**

```javascript
const startTime = performance.now();

// 执行一些耗时的操作

const endTime = performance.now();
const executionTime = endTime - startTime;

console.log(`代码执行时间: ${executionTime} 毫秒`);

performance.mark('start');
// 执行一些操作
performance.mark('end');

performance.measure('操作耗时', 'start', 'end');
const measurements = performance.getEntriesByName('操作耗时');
console.log(`操作耗时: ${measurements[0].duration} 毫秒`);
```

## 3. Performance API 应用场景

Performance API 在 Web 开发中有许多应用场景，下面是一些常见的应用场景：

### 3.1 性能优化

通过使用 Performance API，我们可以测量和分析网页的性能指标，如加载时间、资源使用情况、代码执行时间等。这些指标可以帮助我们了解网页的性能瓶颈，并采取相应的优化措施。例如，通过分析页面加载时间的各个阶段所花费的时间，我们可以找出加载过程中的瓶颈，并进行相应的性能优化。

**示例代码：**

```javascript
const startTime = performance.timing.navigationStart;
const loadTime = performance.timing.loadEventStart - startTime;

console.log(`页面加载时间: ${loadTime} 毫秒`);
```

### 3.2 监控页面资源

Performance API 可以帮助我们监控页面的资源使用情况，包括网络请求、DOM 元素和脚本执行等。通过分析资源加载时间、资源大小等指标，我们可以找出资源使用不当或过度使用资源的问题，从而进行优化。

**示例代码：**

```javascript
const resourceEntries = performance.getEntriesByType('resource');
resourceEntries.forEach((entry) => {
  console.log(`资源 URL: ${entry.name}`);
  console.log(`资源加载时间: ${entry.duration} 毫秒`);
  console.log(`资源大小: ${entry.transferSize} 字节`);
});
```

### 3.3 监控内存使用情况

使用 Performance API 的 memory 属性，我们可以监控页面的内存使用情况。通过了解页面的内存限制、已使用内存、垃圾回收次数等信息，我们可以及时发现内存泄漏或过度使用内存的问题，并进行优化。

**示例代码：**

```javascript
console.log(`JavaScript 堆大小限制:

 ${performance.memory.jsHeapSizeLimit}`);
console.log(`已使用的 JavaScript 堆大小: ${performance.memory.usedJSHeapSize}`);
console.log(`JavaScript 堆的总大小: ${performance.memory.totalJSHeapSize}`);
```

### 3.4 分析代码执行时间

通过使用 Performance API 的 now() 方法，我们可以测量代码的执行时间。这对于优化关键代码块的性能非常有帮助，可以找出代码执行中的瓶颈，从而进行优化。

**示例代码：**

```javascript
const startTime = performance.now();

// 执行一些耗时的操作

const endTime = performance.now();
const executionTime = endTime - startTime;

console.log(`代码执行时间: ${executionTime} 毫秒`);
```

