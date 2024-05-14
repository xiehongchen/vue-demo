

# for...of

## **遍历数组**

1. for循环
2. forEach
3. map
4. reduce
5. keys
6. values
7. for...of

其中 `keys`、`values`、`for...of`需要`Iterator`支持

## **遍历Map/Set**

1. keys
2. entries
3. forEach

## **编辑Object**

1. for..in
2. `Object.keys(obj) `得到对象的每个属性的数组，然后使用数组的遍历方法遍历每个key，就能得到每个key对应的value

## **`Iterator`** **的作用**

1. 为各种数据结构，提供一个统一的、简便的访问接口。
2. ES6提出了新的遍历命令`for...of`循环，`Iterator` 接口主要供`for...of`消费。

#### **`Iterator`** **的遍历过程**

既然数组是支持`for...of`循环的，那数组肯定部署了 `Iterator` 接口，我们通过它来看看`Iterator` 的遍历过程。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmExZDZlZTM2MmRmM2Q3OTA3MGYyOWU1NDA0MzcxMzJfVE1aeWZPa25jSmdHVFNja0lpU3hQNDg0ZlI1NnBUN1FfVG9rZW46TDBhQ2J3MlNvb1k4V2J4Q0w5OGNtQ3o5bnNoXzE3MTU2NTY3MTk6MTcxNTY2MDMxOV9WNA)

从图中我们能看出：

1. `Iterator` 接口返回了一个有`next`方法的对象。
2. 每调用一次 next，依次返回了数组中的项，直到它指向数据结构的结束位置。
3. 返回的结果是一个对象，对象中包含了当前值`value` 和 当前是否结束`done`

## **用 for of 遍历 Object**

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjZlNjYwZGRkYmFkMDQxMGU5NTRiZGRlNjBiZDdlZmNfZUplYmNheUVBR0k5Rkg3ZjFTb0llcU4xQ1RUd1dXNjZfVG9rZW46UEduZGJORmhlb0Uwemx4TldBOWNhZU9UbjUxXzE3MTU2NTY3MTk6MTcxNTY2MDMxOV9WNA)

根据上面讲到的内容，需要给对象也部署 `Iterator` 接口（其实就是在`Object.prototype`上实现一个以`Symbol.iterator`为名的`function`，这个`function`返回一个有`next`方法的对象，每调用一次 `next`, 能够依次返回数组中的项，直到它指向数据结构的结束位置 ）

```JavaScript
function objectIterator() {
  const keys = Object.keys(this)
  let index = 0
  return {
    next: () => {
      const done = index >= keys.length
      const value = done ? undefined : this[keys[index]]
      index++
      return {
        done,
        value
      }
    }
  }
}
// 第一种
Object.prototype[Symbol.iterator] = objectIterator
// 第二种
Object.prototype[Symbol.iterator] = function() {
    return Object.values(this)[Symbol.iterator]();
}

const obj = {
  key: '1',
  value: '2'
}

for (const iterator of obj) {
  console.log(iterator)
}
```

问：对象没有`Symbol.iterator`方法，为什么对象也能实现解构？（Set、数组等的扩展运算符和解构都会用到`Symbol.iterator`）

因为 ES 规范制定者为了方便开发，特地为对象也实现了解构赋值的特性，因此 js 对象身上没有 Symbol.iterator，也能解构

解构赋值的实现机制是通过模式匹配完成的，它会尝试寻找并提取目标数据结构中与模式相匹配的部分。对于对象来说，解构赋值会尝试按照属性名进行匹配，而对于类似数组的对象（比如拥有`length`属性和数字索引的对象），解构赋值会尝试按照索引进行匹配。

数组和对象的结构大概是这样的：

对象结构是这样的：创建对象 -> 枚举属性 -> 复制属性，跟迭代器没关系

数组结构：创建数组 -> 遍历迭代器 -> 复制属性

# js执行过程

JavaScript代码的执行过程可以分为三个阶段：解析（Parsing）、编译（Compilation）和执行（Execution）

1. 词法分析：将代码的字符串分析得到词法单元token
2. 语法分析：将词法单元流解析成AST（抽象语法树），该过程包括词法作用域的生成、变量提升等阶段
3. 代码生成：AST转换成字节码，这部分有V8中的lgnition解释器来生成的
4. 代码执行：逐条解释执行字节码，注意了，当 V8 发现有大量重复字节码时（热点代码 HotSpot ），会将其编译成机器码（由引擎中 TurboFan 编译器进行编译），下次再碰到类似字节码不需要解释，直接执行，这种与解释器配合的过程也称为 ***JIT*** ***（******即时编译******）***。
5. 垃圾回收

# 作用域与作用域链、原型与原型链

在es5之前，js只有**全局****作用域**及**函数作用域**。es6引入了块级作用域。但是这个块级别作用域需要注意的是不是`{}`的作用域，而是`let`，`const`关键字的**块级作用域**

作用域链：[[scope]]中所存储的执行期上下文对象的`集合`，这个集合呈`链式连接`，我们把这种链式连接叫做`作用域链`

copy from [掘金文章地址](https://juejin.cn/post/7287524648808366091)

很明了，就不自己写了

#### 函数

先来看一下上古时期的工作中我们是如何定义函数的，直接使用 `function` 关键字来声明

```JavaScript
function fun() {}
```

但是有的时候我们会发现函数也会用下面的这种格式来定义

```JavaScript
function Fun() {}
```

除了第二个 **函数名的首字母大写之外**，本质上两者毫无区别

#### 函数名首字母大写的意义

当我们需要将一个函数作为 **构造函数** 使用时，通常会将函数名首字母大写，为了看起来规范一些，仅此而已

#### 实例化

对 **构造函数** 使用 `new` 关键字可以创建出不同的 **实例（实例的本质就是一个对象）**，就好比说：你没有女朋友，但是你可以准备一个构造函数 new 很多女朋友出来，就是这个意思！

#### 开造

- 构造函数（女朋友构造器）：

```JavaScript
function GirlFriend() {}
```

- 创建第一个 gf1 （实例对象）

```JavaScript
const gf1 = new GirlFriend()

gf1.name = '小美'
gf1.age = 18

console.log(gf1)  // {name: '小美', age: 18}
```

- 创建第二个 gf2 （实例对象）

```JavaScript
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
- 在 **构造函数** 上会默认存在一个属性叫做 `prototype`，这里记作 **显示原型**

通常我们所说的 **原型对象** 也就是指这里的 `prototype`，**原型对象** 上的 `constructor`属性可以直接访问该 **构造函数**（这里建议手动打印观察一下） 默认情况下，**实例对象** 的 `__proto__` 指向 **构造函数** 的 `prototype`，如果你想访问某个实例的原型对象，就可以通过如下关系来进行访问

```JavaScript
console.log(GirlFriend.prototype.constructor) // ƒ GirlFriend() {}
gf1.__proto__ === GirlFriend.prototype // true
gf2.__proto__ === GirlFriend.prototype // true
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmE0NTFhNjBkZTNhYTQ3ZGNkOWRmYjhlYTg1MjllNzVfQ1BFQ1JRTWhMQkJPMGt2ZlpFRGhzcGxvZUV1WWo4Q1VfVG9rZW46UEd0b2J1aFZxb0lDQlZ4NjdYZGNBOTdzbmZoXzE3MTU2NTY3MTk6MTcxNTY2MDMxOV9WNA)

#### 访问

当我需要访问 **实例对象** 上存在的属性，比如 `name` 时：

```JavaScript
console.log(gf1.name) // '小美'
console.log(gf2.name) // '小丽'
```

当我需要访问 **实例对象** 上不存在的属性，比如 `feature` 时：

```JavaScript
console.log(gf1.feature) // undefined
console.log(gf2.feature) // undefined
```

因为没有这个属性，自然而然就会打印 `undefined` 但如果说我想添加一个共同的属性给所有被 **实例化的对象** 时，我该如何去处理呢？

- 上面已经说明，被同一个 **构造函数** 创建出来的 **实例对象** ，默认情况下他们的 **隐式原型** 都会指向该构造函数的 **显示原型** ，也就是 `GirlFriend.prototype`，因此我只需要在往这个原型上去添加就好

```JavaScript
GirlFriend.prototype.feature = 'beautiful'
```

此时再次访问实例上的 `feature`属性，最终即可得到正常的打印

```JavaScript
console.log(gf1.feature) // beautiful
console.log(gf2.feature) // beautiful
```

如果说我想单独给 `gf1` 添加不一样的 `feature` 再访问呢

```JavaScript
gf1.feature = 'pretty'

console.log(gf1.feature) // pretty
console.log(gf2.feature) // beautiful
```

但是，为什么我给 **显示原型** 添加的属性可以直接通过实例对象进行访问呢？

#### 原理

1. 每一个被 **构造函数** 创建的 **实例对象** 都是一个全新的 **对象** ，我们可以为该对象添加本身特有的属性
2. 当我们尝试访问 **实例对象** 上的某个属性时，如果存在则会直接返回该属性的值；如果不存在，就会沿着 **实例对象** 的 `__proto__` 继续向上访问，如果查找到则会返回该属性的值，如果没有找到，则会返回 `undefined`

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmMxNDZmZmRkNWM3MTNlNjYxYmI1MDdkOGE4ODFmYWJfdkU0bnc3clFzV3lNZHZaUmlDcGJDS1BLMlZyMVpuTjlfVG9rZW46RW43eWI5Rkdtb0VMTGV4cnJKcGM0THZtbkFnXzE3MTU2NTY3MTk6MTcxNTY2MDMxOV9WNA)

#### 注意

为了更加清晰的了解原型，这里我们再提及 js 中几个比较关键的点

###### 普通对象 - object

- 只要是一个普通对象`object`，就可以用 `new Object()` 来实例化（**Object() 是一个内置的构造函数**），也就是说，所有的对象字面量都是 `Object()` 的实例
- `Object` 作为构造函数，`Object.prototype` 指向一个具体的 **原型对象** ，该 **原型对象** 作为对象的实例，它的 `__proto__` 值为 `null`，因而 `Object.prototype.__proto__ = null` 时也就走到了 **原型的尽头**

```JavaScript
const obj = {}
const obj1 = new Object()

console.log(obj.__proto__ === obj1.__proto__)  // true
console.log(obj1.__proto__ === Object.prototype) // true
console.log(Object.prototype.____proto__) // null
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YjVjODFlOTM4MmQ4OWUyZTFkOWM1OWM5YzdmYzBiZGJfOE5waWd1aUR2Sk1PSTRQa0ZIdmEwUTlxR3ZIMWVNTDFfVG9rZW46V2tMemJscFByb3RoWXd4UTIxUGNyZVlGblFkXzE3MTU2NTY3MTk6MTcxNTY2MDMxOV9WNA)

回到上面那个例子，当我要访问 **实例对象** `gf1` 上的属性时：

- 如果该属性存在，就会直接返回对应的值
- 如果该属性不存在，就会沿着

```Plaintext
gf1.__proto__
```

- 进行查找，本质上查找的就是

```Plaintext
GirlFriend.prototype
```

- 这个对象
  - 如果该属性存在，就会直接返回对应的值
  - 如果该属性不存在，那么 `GirlFriend.prototype`作为 `Object`的实例对象，其本身也是存在`__proto__`属性的，所以会沿着 `GirlFriend.prototype.__proto__`来进行查找，本质上查找的就是`Object.prototype`
    - 如果该属性存在，就会直接返回对应的值
    - 如果不存在，就会查找接着查找 `Object.prototype.__proto__` ，此时 `Object.prototype.__proto__` 值为 `null` ，最终没有找到该属性，打印 `undefined`

这个顺序很好理解

1. `gf1.xx`
2. `gf1.__proto__.xx`
3. `gf1.__proto__.__proto__.xx`
4. `gf1.__proto__.__proto__.__proto__.xx`

当最终 `__proto__` 为 `null` 都没有找到时就会打印 `undefined` 因此，沿着 `__proto__` 访问对象属性构成的这一条链也就是平时所说的 **原型链**

###### 特殊对象 - function

- `function` 也算是一类特殊的对象，因此可以直接通过属性的形式来进行变量的访问
- 已经内置了 **Function() 构造函数** ，因而 **所有函数** 都算作是 `Function` 的 **实例对象**
  - 当 `Function` 作为 **构造函数** 时，可以访问其 `prototype` 属性
  - 当 `Function` 作为 **实例对象** 时，可以访问其 `__proto__` 属性

```JavaScript
// 在 Function 这里就是：我实例化了我寄几
console.log(Function.__proto__ === Function.prototype) // true
console.log(Function.prototype.constructor === Function) // true
```

- 内置的 `Object()` 也是一个函数，因此 `Object` 也是我 `Function` 的 **实例对象**

```JavaScript
console.log(Object.__proto__ === Function.prototype) // true
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDYxNjZlMGY4MTc1NDMyNzVkZDUxZjk2Mzc5YmJkMGNfbW1YQVhXODV6a3VTQUVNUXNZa0FUMWF2cnRMZ3BTZVlfVG9rZW46WDhIbGJldjhPb2ZFVGt4QUdvaGNpWFZSbjRjXzE3MTU2NTY3MTk6MTcxNTY2MDMxOV9WNA)

#### 经典图示

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MWQ5ZDA0ZWU4ODNjMmEyYzg1ZmI5MDZlYjI4NzIyMTFfM2lNVFdEWmsxY3J1TTNyb1Fid21TS2loZmxXb0x4THJfVG9rZW46S1ozRmJ5eHVxbzdQc0Z4UElTR2NzMTZBbldlXzE3MTU2NTY3MTk6MTcxNTY2MDMxOV9WNA)

# 执行上下文与闭包

## 执行上下文

执行上下文的生命周期包括三个阶段：创建阶段---》执行阶段---》回收阶段

### 创建阶段

- 确定this的值
- 词法环境
- 变量环境

### 执行阶段

执行变量赋值、代码执行

### 回收阶段

执行上下文出栈等待虚拟机回收执行上下文

在JavaScript中，执行上下文（execution context）是一个关键概念，与闭包（closure）密切相关。理解执行上下文如何与闭包交互可以帮助我们深入理解闭包的工作原理和行为。

执行上下文是JavaScript代码执行时的环境。它包含了变量、函数声明、作用域链等信息，用于管理和跟踪代码的执行过程。当一个函数被调用时，就会创建一个新的执行上下文。每个执行上下文都有自己的词法环境（Lexical Environment），用于存储变量和函数的声明。

在理解闭包之前，让我们先了解一下执行上下文的创建和销毁过程。当函数被调用时，会创建一个新的执行上下文，并将其推入执行上下文栈（execution context stack）中。当函数执行完毕后，其执行上下文会从栈中弹出并销毁。

现在，让我们通过一个例子来更具体地了解执行上下文和闭包之间的关系：

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

### **1.** **内存****消耗**

闭包会导致内存占用增加，因为它们会保留对外部变量的引用，即使外部函数执行完毕。这可能会导致内存占用过高。

```JavaScript
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

```JavaScript
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

```JavaScript
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

# 闭包代码的提权漏洞

```JavaScript
var o = (function() {
  var obj = {
    a: 1,
    b: 2
  }
  return {
    get: function(key) {
      return obj[key]
    },
  }
})()

// 在不修改上面的代码情况下，修改obj
// 通过给Object的原型上添加一个属性，返回this
Object.defineProperty(Object.prototype, 'hack', {
  get() {
   return this
  }
})

console.log(o.get('hack')) // 这样就可以获取到obj了

// 所以这里需要加上判断自身是否带有属性，有才返回或者设置obj

var o = (function() {
  var obj = {
    a: 1,
    b: 2
  }
  // 设置原型为null
  Object.setPrototypeOf(obj, Object.prototype)
  return {
    get: function(key) {
        // 判断obj自身是否有这个属性，有才返回
      if (obj.hasOwnProperty(key)) {
        return obj[key]
      }
    },
  }
})()
```

# 变量提升

```JavaScript
console.log(a)  //输出的是undifined，而不是ReferenceError
var a = 10  

foo() //这个函数是undifined，报错
var foo = function () {
  console.log("foo1")
}
```

- var定义的变量会变量提升，所以声明会被拿到函数或全局作用域的顶部，并且输出undifined。所以执行foo()的时候，foo是undifined，所以会报错。由于js按照顺序从上往下，所以当执行foo = function(){}的时候，才对foo进行赋值为一个函数。
- 这种定义函数的方式，我们称为函数表达式。函数表达式是将函数作为一个值赋给一个变量或属性

```JavaScript
function foo() {
  console.log("foo1")
}
foo()

function foo() {
  console.log("foo2")
}
foo()
```

- 函数声明会在任何代码执行之前先被读取并添加到执行上下文，也就是函数声明提升，因此第二个foo会覆盖掉第一个foo，所以输出的是两个foo2

```JavaScript
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

```JavaScript
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

> 函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被同名变量赋值后覆盖 变量提升是假提升，函数的提升是真提升，赋值后的同名变量优先级要高于同名函数

JavaScript中具名的函数的声明形式有两种：

```JavaScript
//函数声明式：
function foo () {}
//变量形式声明： 
var fn = function () {}
```

当使用变量形式声明函数时，和普通的变量一样会存在提升的现象，而函数声明式会提升到作用域最前边，并且将声明内容一起提升到最上边。如下：

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

> 向Set加入值时，不会发生类型转换，所以5和"5"是不同值

> 但如果加入两次NaN，只会加入一个，所以在Set内部里，两个NaN是相等的

> 如果加入两个对象`set.add({})`，则是两个不相等的

#### 去重

使用 Set 可以轻松地进行数组去重操作，因为 Set 只能存储唯一的值。

传入字符串也可以去重

```JavaScript
const arr = [1, 2, 3, 1, 2, 4, 5];
const uniqueArr = [...new Set(arr)];
const str = 'abbbc'
const uniqueStr = [...new Set(str)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]
console.log(uniqueStr); // ['a','b','c']
```

#### 数组转换

可以使用 Set 将数组转换为不包含重复元素的 Set 对象，再使用 Array.from() 将其转换回数组。

```JavaScript
const arr = [1, 2, 3, 1, 2, 4, 5];
const set = new Set(arr);
const uniqueArr = Array.from(set);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

#### 优化数据查找

使用 Set 存储数据时，查找操作的时间复杂度为 O(1)，比数组的 O(n) 要快得多，因此可以使用 Set 来优化数据查找的效率。

> 答：
>
> 在计算机科学中，时间复杂度是一种衡量算法性能的指标，它描述了算法的运行时间随输入规模增加而增加的速度。Set 是一种数据结构，它具有快速的查找操作时间复杂度为 O(1) 的特性，这意味着无论集合中有多少元素，查找某个元素所需的时间都是固定的，与集合的大小无关。而数组的查找操作时间复杂度为 O(n)，其中 n 是数组的长度，因为数组的元素是按顺序存储的，需要逐个遍历来查找目标元素。
>
> Set 实现快速查找的原理是通过哈希表或类似的数据结构来实现的。哈希表将元素的键映射到唯一的位置，使得在查找时可以直接根据键的哈希值找到对应的位置，因此查找的时间复杂度为 O(1)。而数组则需要逐个比较元素，因此查找的时间复杂度为 O(n)，其中 n 是数组的长度。
>
> 因此，当需要频繁进行数据查找操作时，使用 Set 可以显著提高查找效率，特别是在数据量较大的情况下。

```JavaScript
const dataSet = new Set([1, 2, 3, 4, 5]);

if (dataSet.has(3)) {
  console.log('数据已经存在');
} else {
  console.log('数据不存在');
}
```

#### 并集、交集、差集

Set数据结构可以用于计算两个集合的并集、交集和差集。以下是一些使用Set进行集合运算的示例代码：

```JavaScript
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

```JavaScript
const data = ['apple', 'banana', 'pear', 'orange'];

// 搜索以 "a" 开头的水果
const result = Array.from(new Set(data.filter(item => /^a/i.test(item))));
console.log(result); // ["apple"]
```

#### 使用 Set 替代数组实现队列和栈

可以使用 Set 来模拟队列和栈的数据结构。

```JavaScript
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

```JavaScript
const map = new Map().set('key1', 'value1').set('key2', 'value2');
const obj = Object.fromEntries(map);
```

#### 将 Map 转换为数组

```JavaScript
const map = new Map().set('key1', 'value1').set('key2', 'value2');
const array = Array.from(map);
const array = [...map]; // 这样也可以
```

#### 记录数据的顺序

如果你需要记录添加元素的顺序，那么可以使用`Map`来解决这个问题。当你需要按照添加顺序迭代元素时，可以使用`Map`来保持元素的顺序。

```JavaScript
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

```JavaScript
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

```JavaScript
const str = 'hello world';
const charCountMap = new Map();
for (let char of str) {
  charCountMap.set(char, (charCountMap.get(char) || 0) + 1);
}
console.log(charCountMap); // Map { 'h' => 1, 'e' => 1, 'l' => 3, 'o' => 2, ' ' => 1, 'w' => 1, 'r' => 1, 'd' => 1 }
```

#### 缓存计算结果

在处理复杂的计算时，可能需要对中间结果进行缓存以提高性能。可以使用Map数据结构缓存计算结果，以避免重复计算。

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((accumulator, currentValue) => {
  accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
  return accumulator;
}, {});
console.log(count); // Output: { apple: 3, banana: 2, orange: 1 }
```

#### 拍平嵌套数组

```JavaScript
const nestedArray = [[1, 2], [3, 4], [5, 6]];
const flattenedArray = nestedArray.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
```

#### 按条件分组

```JavaScript
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

```JavaScript
const keys = ['name', 'age', 'gender'];
const values = ['Alice', 25, 'female'];
const person = keys.reduce((accumulator, currentValue, index) => {
    accumulator[currentValue] = values[index];
    return accumulator;
  }, {});
console.log(person); // Output: { name: 'Alice', age: 25, gender: 'female' }
```

#### 将字符串转换为对象

```JavaScript
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

```JavaScript
const params = { foo: "bar", baz: 42 };
const queryString = Object.entries(params).reduce((acc, [key, value]) => {
  return `${acc}${key}=${value}&`;
}, "?").slice(0, -1);
console.log(queryString); // "?foo=bar&baz=42"
```

#### 打印斐波那契数列

```JavaScript
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

```JavaScript
const str = 'racecar';
const isPalindrome = str.split('').reduce((accumulator, currentValue, index, array) => {
  return accumulator && currentValue === array[array.length - index - 1];
}, true);
console.log(isPalindrome); // Output: true
```

#### 检查括号是否匹配

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

## 弱引用

WeakSet 和 WeakMap 是基于弱引用的数据结构，[ES2021](https://github.com/tc39/proposal-weakrefs) 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。

```JavaScript
let target = {};
let wr = new WeakRef(target);
```

上面示例中，`target`是原始对象，构造函数`WeakRef()`创建了一个基于`target`的新对象`wr`。这里，`wr`就是一个 WeakRef 的实例，属于对`target`的弱引用，垃圾回收机制不会计入这个引用，也就是说，`wr`的引用不会妨碍原始对象`target`被垃圾回收机制清除。

WeakRef 实例对象有一个`deref()`方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回`undefined`。

```JavaScript
let target = {};
let wr = new WeakRef(target);

let obj = wr.deref();
if (obj) { // target 未被垃圾回收机制清除
  // ...
}
```

上面示例中，`deref()`方法可以判断原始对象是否已被清除。

弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。

```JavaScript
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

# 事件循环

> 叫法不同：

> w3c event loop

> 谷歌浏览器 message loop

> promise本身是一个同步的代码，只有它后面调用的then()方法里的回调才是微任务

> await右边的表达式还是会

> script标签本身是一个宏任务，当页面出现多个script标签的时候，浏览器会把script标签作为宏任务来解析

- **单线程是异步产生的原因**
- **事件循环是异步的实现方式**

## 浏览器的进程模型

### 何为进程

- 程序运行需要有他自己专属的内存空间，可以把这块内存空间简单的理解为进程
- 每个应用至少有一个进程，进程之间相互独立，即使要通信，也需要双方同意
- 不会相互影响，如一个进程崩溃，不会导致其他进程崩溃

### 何为线程

有了进程，就可以运行程序的代码了

一个进程至少有一个线程，所以在进程开启后会自动创建一个线程来运行代码，该线程称之为主线程

如果程序需要同时执行多块代码，主线程就会启动更多的线程来执行代码，所以一个进程可以包含多个线程

### 浏览器有哪些进程和线程

**浏览器是一个多进程多线程的应用程序**

- 为了避免相互影响，为了减少连环崩溃的几率，当浏览器启动后，它会自动启动多个进程

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ODdkNjE5NjEyOWE4MDY5MWY0Y2ZjOWFlM2NhYzhlMWZfb2xaRDJLeXJmVEkxYTRnaTkzTVpTZGp2MzFYbFMwZHdfVG9rZW46VmpkeGJFOGtSb0t1d254aTQ0aWNOYW05bmVmXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

> 可以在浏览器的任务管理器中查看当前的所有进程

其中，最主要的进程有：

- 浏览器进程
  - 主要负责界面显示、用户交互、子进程管理等，浏览器进程内部会启动多个线程处理不同的任务
- 网络进程
  - 负责加载网络资源，网络进程内部会启动多个线程来处理不同的网络任务
- 渲染进程（重点）
  - 渲染进程启动后，会开启一个**渲染主线程**，主线程复制执行HTML、CSS、JS代码
  - 默认情况下，浏览器会为每个标签页开启一个新的渲染进程，以保证不同的标签页之间不相互影响
  - 这样每一个标签页就开启一个渲染进程，这就会导致当我们打开多个标签页时，谷歌浏览器就会非常占内存
  - 改变：一个站点一个渲染进程，也就是说打开淘宝分配一个渲染进程，但我们又打开一个新的标签页，是淘宝的商品详情，那么它们共同使用一个渲染进程

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

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MmUzMWFmYjI2ODhiMTIxMzIyMTljMGJjNWU1OWQ2NzZfaTR0QVU4bTlxMFY2N0RpOTlGYlNBTFpJVzBIQjJkYUhfVG9rZW46WXpUdmJHVzFibzg0SXB4QTVES2N1dTUyblFjXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

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

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2IwMDg2YWI4ZTFlYjNlZjVjYmM4NGJlOWExZGQwOTVfQ3d0UkloSHc4SHBwTXZCUjJuS3AyOXdPT2ozblpMb1RfVG9rZW46UElCN2I0NmFCb2lUS3R4REd1ZGMxWjhlbnpkXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

**渲染主线程承担着极其重要的工作，无论如何都不能阻塞**

因此，浏览器选择**异步**来解决这个问题

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTEyYmEwZGE1MGY2ZmI5MDliMzc4NjFjZDYzOTRiYTFfcWhOVDNSbERtVUxyQndsVHhMcFd2ZFZiOGJWWHJ6ZjBfVG9rZW46WjFXUGJ0T0Q0b0V3OHZ4d0pwRWNSUldobnBzXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

使用异步的方式，渲染主线程永不阻塞

> 面试题：如何理解JS的异步？

> 答：

> JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个

> 而选择主线程承担诸多的工作，渲染页面、执行HTML、CSS、JS都在其中运行

> 如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行

> 这样一来，一方面会导致繁忙的主线程浪费时间，另一方面导致页面无法及时更新，页面卡死

> 所以浏览器采用异步的方式来避免这个问题。具体做法是当某些任务发送时，比如计数器、网络、事件监听等，主线程会将任务交给其他线程去处理，自身立即结束任务的执行，从而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行

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

> 答：

> 事件循环又叫做消息循环，时浏览器渲染主线程的工作方式

> 在Chrome的源码中，它开启一个不会结束的for循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候加入队列末尾即可

> 过去把消息队列简单分为宏队列和微队列，这种说法目前已经无法满足复杂的浏览器环境，取而代之的是一种灵活多变的处理方式

> 根据W3C官方的解释，每个任务又不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行

> 面试题：JS中的计时器能做到精确计时吗?为什么？

> 答：

> 不行，因为：

- 计算机硬件没有原子钟，无法做到精确计时
- 操作系统的计时函数本身就有少量偏差，由于JS的计时器最终调用的是操作系统的函数，也就携带了这些偏差
- 按照W3C的标准，浏览器实现计时器时，如果嵌套层级超过5层，则会带有4毫秒的最少时间，这样在计时时间少于4毫秒时又带来偏差
- 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来偏差

# 类型转换

## 隐式类型转换

在JavaScript中，隐式类型转换是指在特定的上下文中，JavaScript自动将一个数据类型转换为另一个数据类型，而无需显式地编写转换代码。

### 1. 数字转字符串：

```JavaScript
let num = 10;
let str = num + ''; // 将数字转换为字符串
console.log(str); // 输出: "10"
```

在这个例子中，通过将数字与一个空字符串相加，JavaScript会将数字隐式转换为字符串。

### 2. 字符串转数字：

```JavaScript
let str = '20';
let num = +str; // 将字符串转换为数字
console.log(num); // 输出: 20
```

在这个例子中，通过使用一元加号操作符（+）对字符串进行操作，JavaScript会将字符串隐式转换为数字。

### 3. 布尔值转数字：

```JavaScript
let bool = true;
let num = +bool; // 将布尔值转换为数字
console.log(num); // 输出: 1
```

在这个例子中，通过使用一元加号操作符（+）对布尔值进行操作，JavaScript会将布尔值隐式转换为数字，`true`转换为1，`false`转换为0。

### 4. 字符串转布尔值：

```JavaScript
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

```JavaScript
let obj = { name: "John", age: 25 };
let str = obj.toString();
console.log(str); // 输出: "[object Object]"
```

在上述例子中，对象`obj`会被隐式转换为字符串形式，调用了`toString()`方法并返回了`"[object Object]"`。

需要注意的是，`toString()`方法的默认实现返回`"[object Object]"`，这对于大多数对象来说并不是非常有用。因此，可以通过重写对象的`toString()`方法来自定义对象转换为字符串的行为。

```JavaScript
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

```JavaScript
let obj = { value: 42 };
let num = obj.valueOf();
console.log(num); // 输出: { value: 42 }
```

需要注意的是，与日期对象的`valueOf()`方法不同，大多数对象的默认`valueOf()`方法的行为通常并不有用。因此，可以通过重写对象的`valueOf()`方法来自定义对象转换为数字的行为。

```JavaScript
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

```JavaScript
let num = 10;
let str = String(num); // 将数字转换为字符串
console.log(str); // 输出: "10"
```

需要注意的是，使用String()函数进行转换时，对于 null 和 undefined 值会分别得到 "null" 和 "undefined" 字符串。

1. Number() 函数：用于将一个值转换为数字类型。

```JavaScript
let str = "20";
let num = Number(str); // 将字符串转换为数字
console.log(num); // 输出: 20
```

需要注意的是，使用Number()函数进行转换时，如果传入的字符串无法解析为有效的数字，将返回 NaN（Not a Number）。

1. Boolean() 函数：用于将一个值转换为布尔类型。

```JavaScript
let num = 0;
let bool = Boolean(num); // 将数字转换为布尔值
console.log(bool); // 输出: false
```

需要注意的是，使用Boolean()函数进行转换时，对于 0、-0、null、undefined、NaN 和空字符串会返回 false，其他值都会返回 true。

1. parseInt() 和 parseFloat() 函数：用于将字符串转换为整数和浮点数类型。

```JavaScript
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

```JavaScript
let str = "20";
let num = +str; // 将字符串转换为数字
console.log(num); // 输出: 20
```

- 双重取反操作符（!!）：用于将值转换为布尔类型。

```JavaScript
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

```JavaScript
let num = 10;
let str = "The number is: " + num;
console.log(str); // 输出: "The number is: 10"
```

在这个例子中，数字`num`会被隐式转换为字符串，然后与其他字符串进行拼接。

### 3. NaN（Not a Number）：当涉及无法进行有效数值计算的情况时，JavaScript会返回NaN。NaN是一个特殊的数字值，表示不是一个有效的数字。

```JavaScript
let result = 10 / "hello";
console.log(result); // 输出: NaN
```

在这个例子中，字符串"hello"无法被解析为有效的数字，所以计算结果为NaN。

### 4. null和undefined的类型转换：null和undefined在进行类型转换时有一些特殊规则：

- null在进行数字转换时会被转换为0，而在进行字符串转换时会被转换为"null"。
- undefined在进行数字转换时会被转换为NaN，而在进行字符串转换时会被转换为"undefined"。

```JavaScript
let num = Number(null);
console.log(num); // 输出: 0

let str = String(undefined);
console.log(str); // 输出: "undefined"
```

在这个例子中，null在数字转换时被转换为0，undefined在字符串转换时被转换为"undefined"。

### 5. 注意一元加号操作符（+）的行为：一元加号操作符可以用于将值转换为数字类型，但需要注意一些情况。当应用于字符串时，一元加号操作符会尝试将字符串解析为数字。

```JavaScript
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
   1. 显式地使用适当的类型转换函数或操作符，明确指定期望的转换结果。
   2. 在涉及类型转换的操作中，添加适当的错误处理机制，以防止无效的转换。
2. 类型安全的比较：在条件语句中，确保进行类型安全的比较，避免因类型转换而导致的问题。使用恰当的比较操作符（如`===`和`!==`）可以同时比较值和类型，确保比较的准确性。

```JavaScript
let num = "10";
if (num === 10) {
  // 正确的比较方式，值和类型都匹配
  console.log("The number is 10.");
} else {
  console.log("The number is not 10.");
}
```

1. 在这个例子中，使用`===`进行比较可以避免字符串与数字的隐式转换，确保比较的准确性。
2. 使用适当的类型转换技巧：在某些情况下，可以使用类型转换来解决问题或优化代码逻辑。以下是一些常见的类型转换技巧：
   1. 将字符串转换为数字或反之：使用`Number()`函数或一元加号操作符（+）进行转换。
   2. 将字符串转换为数组：使用`split()`函数将字符串拆分为数组。
   3. 将对象转换为字符串：使用`JSON.stringify()`函数将对象转换为字符串表示。
   4. 将数字转换为字符串并添加特定格式：使用字符串模板或字符串拼接操作符（+）。
3. 考虑性能和可读性：尽管类型转换是一种强大的工具，但过度使用或滥用可能会影响代码的性能和可读性。在进行类型转换时，要权衡利弊，并确保代码易于理解和维护。

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

```JavaScript
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

```JavaScript
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

### 分代收集

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

```JavaScript
function test() {
    var local = "I'm a local variable";
    // 当函数执行结束后，local 就离开了环境，可以被垃圾回收
}
test();
```

#### 解除对象引用

当你不再需要一个对象时，应该解除对它的引用。这样，垃圾回收器在下一次运行时就可以回收这个对象。

```JavaScript
var obj = { prop: "I'm an object" };
obj = null; // 现在，obj 可以被垃圾回收
```

#### 避免长生命周期的引用

长生命周期的引用（例如：全局变量或DOM引用）会阻止垃圾回收器回收它们所引用的对象。因此，应该尽量避免使用长生命周期的引用，或者在不再需要它们时及时解除引用。

在理解了JavaScript的垃圾回收机制和如何优化代码以减轻垃圾回收压力之后，我们可以写出更高效、更可靠的代码，从而提高用户体验，降低系统负载。

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

```JavaScript
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

```JavaScript
const rect = new Rectangle(5, 3);
console.log(rect.area());       // 输出：15
console.log(rect.perimeter());  // 输出：16
```

## 3. Class的语法

ES6中Class的语法相对简洁明了。一个Class可以包含构造函数、属性和方法等。下面介绍一些常用的语法规则：

### 3.1 构造函数

在Class中使用`constructor`关键字定义构造函数。构造函数用于创建对象时进行初始化操作，通过`new`关键字实例化类时会自动调用构造函数。

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
const square = new Square(5);
console.log(square.area());       // 输出：25
console.log(square.perimeter());  // 输出：20
```

## 4. 类的静态方法和属性

静态方法和属性属于类本身，而不是类的实例。静态方法和属性可以通过类名直接访问，无需实例化类。

```JavaScript
class MathUtil {
  static PI = 3.14159;    // 静态属性

  static square(number) {    // 静态方法
    return number * number;
  }
}
```

在上述示例中，我们定义了一个`MathUtil`类，它具有一个静态属性`PI`和一个静态方法`square()`。可以通过类名直接访问静态属性和方法。

```JavaScript
console.log(MathUtil.PI);        // 输出：3.14159
console.log(MathUtil.square(5)); // 输出：25
```

## 5. Getter和Setter方法

Getter和Setter方法用于对类的属性进行读取和设置操作，可以通过类似访问属性的语法进行调用。

```JavaScript
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

```JavaScript
const circle = new Circle(5);
console.log(circle.diameter);     //

 输出：10
circle.diameter = 12;
console.log(circle.radius);       // 输出：6
```

## 6. 类的私有属性和方法

在ES6中，可以使用`#`作为前缀来定义私有属性和方法。私有属性和方法只能在类的内部被访问，外部无法访问。

```JavaScript
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

```JavaScript
const person = new Person('John');
person.publicMethod();   // 输出：Hello, my name is John
person.#name;            // 报错：SyntaxError: Private field '#name' must be declared in an enclosing class
person.#privateMethod(); // 报错：SyntaxError: Private field '#privateMethod' must be declared in an enclosing class
```

## 7. 类的实例和构造函数

在ES6中，类的实例通过`new`关键字进行创建，并自动调用类的构造函数进行初始化。

```JavaScript
const rect = new Rectangle(5, 3);
console.log(rect.area());       // 输出：15
console.log(rect.perimeter());  // 输出：16
```

可以使用`instanceof`运算符来判断一个对象是否是某个类的实例。

```JavaScript
console.log(rect instanceof Rectangle);  // 输出：true
console.log(rect instanceof Object);     // 输出：true
```

## 8. 类的继承

继承是面向对象编程中的重要概念之一，它允许我们创建一个基类（父类），其他类可以继承该基类并扩展或覆盖其中的属性和方法。ES6中使用`extends`关键字实现类的继承。

```JavaScript
class Square extends Rectangle {
  constructor(side) {
    super(side, side);    // 调用父类的构造函数
  }
}
```

## 9. 类的封装

封装通过将数据和操作数据的方法封装在一个对象中，实现了数据的保护和访问的控制。类的属性和方法可以使用不同的访问修饰符来控制其可见性。

```JavaScript
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

```JavaScript
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
   1. `value` 表示集合中的一个元素。
   2. `done` 表示迭代是否已完成，如果为 `true`，则表示迭代结束；如果为 `false`，则表示还有更多元素可供遍历。
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
let person = {
    name: 'John',
    age: 30
};

console.log(Reflect.get(person, 'name')); // Output: John
```

### 2. 使用 Reflect.set() 设置对象的属性值：

```JavaScript
let person = {
    name: 'John',
    age: 30
};

Reflect.set(person, 'age', 35);
console.log(person.age); // Output: 35
```

### 3. 使用 Reflect.has() 检查对象是否具有特定属性：

```JavaScript
let person = {
    name: 'John',
    age: 30
};

console.log(Reflect.has(person, 'name')); // Output: true
console.log(Reflect.has(person, 'city')); // Output: false
```

### 4. 使用 Reflect.deleteProperty() 删除对象的属性：

```JavaScript
let person = {
    name: 'John',
    age: 30
};

Reflect.deleteProperty(person, 'age');
console.log(person); // Output: { name: 'John' }
```

### 5. 使用 Reflect.defineProperty() 定义对象的属性：

```JavaScript
let person = {};

Reflect.defineProperty(person, 'name', {
    value: 'John',
    writable: true,
    configurable: true,
    enumerable: true
});

console.log(person.name); // Output: John
```

### 6. 使用 Reflect.ownKeys() 返回对象的所有自有属性的键名：

```JavaScript
let person = {
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
   1. Proxy 允许你创建一个代理对象，可以拦截并自定义 JavaScript 对象的基本操作。
2. **用法**：
   1. 可以拦截目标对象的操作，比如属性查找、赋值、枚举等。
   2. Proxy 提供了一系列捕获器（handlers）来定义代理对象的行为，例如 `get`、`set`、`has`、`deleteProperty` 等。
3. **优势**：
   1. 允许在对象操作层面进行拦截和定制，提供了更高级的控制和行为修改能力。
   2. 支持对对象的读取和设置等操作进行自定义处理，增强了代码的灵活性和可维护性。

### Reflect

1. **基本概念**：
   1. Reflect 是一个内置对象，提供了一组静态方法，这些方法与一些操作符和语句的行为是一致的。
2. **用法**：
   1. 提供了一系列方法，用于替代传统的操作，比如属性的获取、设置、删除，函数的调用等。
   2. Reflect 方法与对应的操作符或语句的行为一致，例如 `Reflect.get()`、`Reflect.set()`、`Reflect.has()` 等。
3. **优势**：
   1. 提供了更统一和一致的 API，使得操作更加可预测和可控。
   2. 支持一些元编程的能力，使得代码更加易于理解和维护。

### 综合特性

1. **配合使用**：
   1. Proxy 和 Reflect 可以结合使用，通过 Proxy 拦截器捕获对象的操作，然后通过 Reflect 方法进行相应的操作。
2. **元编程能力**：
   1. Proxy 和 Reflect 为 JavaScript 提供了强大的元编程能力，使得开发者可以更灵活地操作和定制对象的行为。
3. **ES6 增强**：
   1. 这两个特性是 ES6 的重要增强，为 JavaScript 的语言特性提供了更多的可能性和便利性。

在开发中，Proxy 和 Reflect 可以帮助开发者实现更加复杂和灵活的代码逻辑，提升了代码的可读性和可维护性，是现代 JavaScript 开发中不可或缺的重要特性。

作者：来颗奇趣蛋 链接：https://juejin.cn/post/7333236033038647337 来源：稀土掘金 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# 修饰器（Decorator）

## 引言

在JavaScript中，修饰器（Decorator）是一种特殊的语法，用于修改类、方法或属性的行为。修饰器提供了一种简洁而灵活的方式来扩展和定制代码功能。本文将详细介绍JavaScript修饰器的概念、语法和应用场景，并提供相关的代码示例。

## 1. 修饰器简介

修饰器是一种用于修改类、方法或属性的语法，它可以在不修改原始代码的情况下增强其功能。修饰器可以实现横切关注点（cross-cutting concerns）的功能，例如日志记录、性能分析、缓存等。通过将这些功能与原始代码分离，我们可以更好地组织和维护代码，并实现更高的可重用性和可扩展性。

## 2. 修饰器语法

修饰器使用`@`符号作为前缀，紧跟着修饰器函数或类。修饰器可以接收不同的参数，根据修饰的目标不同，参数也会有所区别。修饰器可以单独使用，也可以通过组合多个修饰器来实现更复杂的功能。

下面是一个基本的修饰器语法示例：

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
const startTime = performance.timing.navigationStart;
const loadTime = performance.timing.loadEventStart - startTime;

console.log(`页面加载时间: ${loadTime} 毫秒`);
```

### 3.2 监控页面资源

Performance API 可以帮助我们监控页面的资源使用情况，包括网络请求、DOM 元素和脚本执行等。通过分析资源加载时间、资源大小等指标，我们可以找出资源使用不当或过度使用资源的问题，从而进行优化。

**示例代码：**

```JavaScript
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

```JavaScript
console.log(`JavaScript 堆大小限制:

 ${performance.memory.jsHeapSizeLimit}`);
console.log(`已使用的 JavaScript 堆大小: ${performance.memory.usedJSHeapSize}`);
console.log(`JavaScript 堆的总大小: ${performance.memory.totalJSHeapSize}`);
```

### 3.4 分析代码执行时间

通过使用 Performance API 的 now() 方法，我们可以测量代码的执行时间。这对于优化关键代码块的性能非常有帮助，可以找出代码执行中的瓶颈，从而进行优化。

**示例代码：**

```JavaScript
const startTime = performance.now();

// 执行一些耗时的操作

const endTime = performance.now();
const executionTime = endTime - startTime;

console.log(`代码执行时间: ${executionTime} 毫秒`);
```

# new操作符

分析一下new的整个过程：

- 1、创建一个空对象
- 2、继承构造函数的原型
- 3、this指向obj，并调用构造函数
- 4、返回对象

```JavaScript
function myNew (fn, ...args) {
    // 第一步：创建一个空对象
    const obj = {}
    // 第二步：继承构造函数的原型
    obj.__proto__ =  fn.prototype
    // 第三步：this指向obj，并调用构造函数
    fn.apply(obj, args)
    // 第四步：返回对象
    return obj
}
```

# 高阶函数

高阶函数：英文叫Higher-order function。JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

```JavaScript
// 简单的高阶函数
function add(x, y, f) {
    return f(x) + f(y);
}

//用代码验证一下：
add(-5, 6, Math.abs); // 11
```

像数组的`map、reduce、filter`这些都是高阶函数

# Commonjs 和 ES6 Module的区别

1、Commonjs是拷贝输出，ES6模块化是引用输出

2、Commonjs是运行时加载，ES6模块化是编译时输出接口

3、Commonjs是单个值导出，ES6模块化可以多个值导出

4、Commonjs是动态语法可写在函数体中，ES6模块化静态语法只能写在顶层

5、Commonjs的this是当前模块化，ES6模块化的this是undefined

# 深度遍历和广度遍历的区别

对于算法来说 无非就是时间换空间 空间换时间

- 深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大
- 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点
- 深度优先采用的是堆栈的形式, 即先进后出
- 广度优先则采用的是队列的形式, 即先进先出

# js中鼠标的各个坐标

| 属性    | 说明                                                         | 兼容性            |
| ------- | ------------------------------------------------------------ | ----------------- |
| offsetX | 以当前的目标元素左上角为原点，定位x轴坐标                    | 除Mozilla外都兼容 |
| offsetY | 以当前的目标元素左上角为原点，定位y轴坐标                    | 除Mozilla外都兼容 |
| clientX | 以浏览器可视窗口左上角为原点，定位x轴坐标                    | 都兼容            |
| clientY | 以浏览器可视窗口左上角为原点，定位y轴坐标                    | 都兼容            |
| pageX   | 以doument对象左上角为原点，定位x轴坐标                       | 除IE外都兼容      |
| pageY   | 以doument对象左上角为原点，定位y轴坐标                       | 除IE外都兼容      |
| screenX | 以计算机屏幕左上顶角为原点，定位x轴坐标(多屏幕会影响)        | 全兼容            |
| screenY | 以计算机屏幕左上顶角为原点，定位y轴坐标                      | 全兼容            |
| layerX  | 最近的绝对定位的父元素（如果没有，则为 document 对象）左上顶角为元素，定位 x 轴坐标 | Mozilla 和 Safari |
| layerY  | 最近的绝对定位的父元素（如果没有，则为 document 对象）左上顶角为元素，定位 y 轴坐标 | Mozilla 和 Safari |

# js中元素视图的各个尺寸

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| offsetLeft   | 获取当前元素到定位父节点的left方向的距离                     |
| offsetTop    | 获取当前元素到定位父节点的top方向的距离                      |
| offsetWidth  | 获取当前元素 width + 左右padding + 左右border-width          |
| offsetHeight | 获取当前元素 height + 上下padding + 上下border-width         |
| clientWidth  | 获取当前元素 width + 左右padding                             |
| clientHeight | 获取当前元素 height + 上下padding                            |
| scrollWidth  | 当前元素内容真实的宽度，内容不超出盒子宽度时为盒子的clientWidth |
| scrollHeight | 当前元素内容真实的高度，内容不超出盒子高度时为盒子的clientHeight |

# **Window视图的各个尺寸？**

| 属性        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| innerWidth  | innerWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏） |
| innerHeight | innerWidth 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏） |

# **Document文档视图的各个尺寸？**

| 属性                                  | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| document.documentElement.clientWidth  | 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏、滚动条） |
| document.documentElement.clientHeight | 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏、滚动条） |
| document.documentElement.offsetHeight | 获取整个文档的高度（包含body的margin）                       |
| document.body.offsetHeight            | 获取整个文档的高度（不包含body的margin）                     |
| document.documentElement.scrollTop    | 返回文档的滚动top方向的距离（当窗口发生滚动时值改变）        |
| document.documentElement.scrollLeft   | 返回文档的滚动left方向的距离（当窗口发生滚动时值改变）       |

# **9个高级的JavaScript方法**

1. ## **getBoundingClientRect**

#### **1.1 是什么**

```
Element.getBoundingClientRect() ` 方法返回元素的大小及其相对于视口的位置。返回的是一个对象，对象里有这8个属性：`left，right，top，bottom，width，height，x，y
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MGU1NjkyNzcyMDJkYjJjMTUwYjM1ODFjMjQ3Njk2ODFfV05JY1ZOREdRaUdQNk1NOFZiMmV0NlBpTHFJMU1maFlfVG9rZW46Tk5wR2IyWlhub2dPWjh4SHZTVmNKMU91bnhiXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

#### **1.2 兼容性**

基本在每一个浏览器都可以使用`getBoundingClientRect`

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDAyZmU5YjVkNTA3YThhMjcxMTllMTk2MWQ4YmNiMmRfcFhOQ0tpNUNYZHFFZTd6Wm9vTnFvWEV3SzVHYms2SzNfVG9rZW46UFlkUWJIOWJsb0E0bUV4bVNPdWNGYUUybkNiXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

#### **1.3 判断元素是否在可视区域**

这是`getBoundingClientRect`最常应用的场景了，判断一个元素是否完整出现在视口里

```JavaScript
// html

<div id="box"></div>

body {
       height: 3000px;
       width: 3000px;
      }

#box {
       width: 300px;
       height: 300px;
       background-color: red;
       margin-top: 300px;
       margin-left: 300px;
    }
    
// js

const box = document.getElementById('box')
        window.onscroll = function () {
            // box完整出现在视口里才会输出true，否则为false
            console.log(checkInView(box))
        }

function checkInView(dom) {
        const { top, left, bottom, right } = dom.getBoundingClientRect()
        console.log(top, left, bottom, right)
        console.log(window.innerHeight, window.innerWidth)
        return top >= 0 &&
                left >= 0 &&
                bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                right <= (window.innerWidth || document.documentElement.clientWidth)
        }
```

根据这个用处，咱们可以实现：**懒加载和无限滚动**

#### **1.4 缺点？**

- 1、每次scroll都得重新计算，性能耗费大
- 2、引起`重绘回流`

1. ## **IntersectionObserver**

#### **2.1 是什么**

`IntersectionObserver`**接口** 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗([viewport](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2FViewport))交叉状态的方法。祖先元素与视窗([viewport](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2FViewport))被称为**根(root)**

通俗点说就是：`IntersectionObserver`是用来监听**某个元素与视口**的`交叉状态`的。交叉状态是什么呢？请看下图，一开始整个元素都在视口内，那么元素与视口的交叉状态就是**100%**，而我往下滚动，元素只有一半显示在视口里，那么元素与视口的交叉状态为**50%**：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NjE1NGQ3OWUyMjg2Mzk2Zjg2ZWFkMjI3NGNkNWU2NDRfazBvTnF0cUFqREZLRzE3clF2emZoRXIyRHZDM3dRNzNfVG9rZW46QVNlb2IzTkV2bzRsbE94UWRtMmNtc0JzbndOXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

#### **2.2 用法**

```JavaScript
// 接收两个参数 callback  option
var io = new IntersectionObserver(callback, option);

// 开始观察(可观察多个元素)
io.observe(document.getElementById('example1'));
io.observe(document.getElementById('example2'));

// 停止观察某个元素
io.unobserve(element);

// 关闭观察器
io.disconnect();
```

#### **2.3 callback**

`callback`一般有两种触发情况。一种是目标元素刚刚进入视口（可见），另一种是完全离开视口（不可见）。

```JavaScript
var io = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);
```

`callback`函数的参数（`entries`）是一个数组，每个成员都是一个`IntersectionObserverEntry`对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，`entries`数组就会有两个成员。

#### **2.4 IntersectionObserverEntry对象**

```JavaScript
{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
```

属性解析：

- `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
- `target`：被观察的目标元素，是一个 DOM 节点对象
- `rootBounds`：根元素的矩形区域的信息，`getBoundingClientRect()`方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回`null`
- `boundingClientRect`：目标元素的矩形区域的信息
- `intersectionRect`：目标元素与视口（或根元素）的交叉区域的信息
- `intersectionRatio`：目标元素的可见比例，即`intersectionRect`占`boundingClientRect`的比例，完全可见时为`1`，完全不可见时小于等于`0`

#### **2.5 option**

讲讲第二个参数option里比较重要的两个属性：`threshold和root`

首先讲讲`threshold`：

`threshold`属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为`[0]`，即交叉比例（`intersectionRatio`）达到`0`时触发回调函数。

```TOML
new IntersectionObserver(
  entries => {/* ... */}, 
  {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  }
);
```

用户可以自定义这个数组。比如，`[0, 0.25, 0.5, 0.75, 1]`就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。

再说说`root`：

IntersectionObserver API 支持容器内滚动。`root`属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

```TOML
new IntersectionObserver(
  entries => {/* ... */}, 
  {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    root: document.getElementById('#container')
  }
);
```

#### **2.6 完整例子**

```JavaScript
body {
            height: 3000px;
            width: 3000px;
        }

#box1 {
            width: 300px;
            height: 300px;
            background-color: red;
            margin-top: 100px;
            margin-left: 300px;
        }
#box2 {
            width: 300px;
            height: 300px;
            background-color: red;
            margin-top: 100px;
            margin-left: 300px;
        }
<div id="box1"></div>
<div id="box2"></div>

const io = new IntersectionObserver(entries => {
            console.log(entries)
        }, {
            threshold: [0, 0.25, 0.5, 0.75, 1]
            // root: xxxxxxxxx
        })
io.observe(document.getElementById('box1'))
io.observe(document.getElementById('box2'))
```

#### **2.7 使用场景**

- 1、可以像`getBoundingClientRect`那样判断元素是否在视口里，并且好处是，不会引起重绘回流
- 2、同理，有了第一点功能，就可以做`懒加载和无限滚动`功能了

#### **2.8 缺点**

想兼容IE的就别考虑这个API了。。。 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjViMDlkODdmZjUxZjc5N2U2Y2U3MjFiYzk1NDc2MzFfS0tSaGZoRE1aVXhBSEcwZWlwZHpOSnhXUnVnVmhEd2pfVG9rZW46Vk84SGI1T1FKb3BGemR4MzM3ZmM1TGN0bnpkXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

1. ## **createNodeIterator**

#### **3.1 结识这个API**

我是怎么认识这个API的呢？我面试的时候被问到了：`说一说，如何遍历输出页面中的所有元素`。我第一时间肯定想到使用循环递归去输出。面试官：行吧，回家等消息吧。

后来我回家一查，才知道了`createNodeIterator`这个API

#### **3.2 解题**

那如何使用`createNodeIterator`对页面中所有元素进行遍历输出呢？

```JavaScript
const body = document.getElementsByTagName('body')[0]
    const it = document.createNodeIterator(body)
    let root = it.nextNode()
    while(root) {
        console.log(root)
        root = it.nextNode()
    }
```

找个网站测试下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGRhYTMyZGEyOTU3NzcwMzU4N2Q0YjRlNDExZmFiYzFfV3p0blNkYVJPMEo5enNNcmYweDQxOEN6dDJGa0ZiSG9fVG9rZW46TnozV2JINVVsb1VWU3h4bHVDUWM4VjE2bkduXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

#### **3.3 详细参数**

详细参数可以看[这里](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDocument%2FcreateNodeIterator)，讲的很详细

#### **3.4 兼容性**

一片绿啊，大胆放心使用吧！ 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MzVlOTkwNGJkZGJiZTRmOWZlYmQyOThmMjRkZjk0NWRfWEU3MTQydXRNblI2YWZ1REpxaWZFUzdZNUo3ZlJOTWFfVG9rZW46V1JscmJSS1Zsb1pOVGp4aThURWM2QVBvbkdkXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

1. ## **getComputedStyle**

#### **4.1 是什么**

`Window.getComputedStyle()`方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。

```JavaScript
window.getComputedStyle(element, pseudoElement)
```

- `element`: 必需，要获取样式的元素。
- `pseudoElement`: 可选，伪类元素，当不查询伪类元素的时候可以忽略或者传入 null。

#### **4.2 使用**

搭配`getPropertyValue`可以获取到具体样式

```JavaScript
// html
#box {
            width: 300px;
            height: 300px;
            background-color: yellow;
    }
    
<div id="box"></div>

const box = document.getElementById('box')
const styles = window.getComputedStyle(box)
// 搭配getPropertyValue可以获取到具体样式
const height = styles.getPropertyValue("height")
const width = styles.getPropertyValue("width")
console.log(height, width) // ’300px‘ '300px'
```

#### **4.3 兼容性**

一片绿油油。放心使用。 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OGVkMDZiNTA0YzZmZjVhMjNkYTU4NTI5ZjgwZGJlYzlfVlRXeHhheE9YcTg0S09nRFV2YzU0ZDNaM1FNamFCYTFfVG9rZW46VVZqU2JlbTdUb1ROOFd4OUdFa2NNSFBVbjl0XzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

1. ## **requestAnimationFrame**

这篇文章讲的不错，介绍，用法，兼容性，都说的明明白白：[requestAnimationFrame理解与实践](https://link.juejin.cn?target=https%3A%2F%2Fnewbyvector.github.io%2F2018%2F05%2F01%2F2015-05-01%2F)

1. ## **requestIdleCallback**

这篇文章讲的不错，介绍，用法，兼容性，都说的明明白白：[你应该知道的requestIdleCallback](https://juejin.cn/post/6844903592831238157)

1. ## **DOMContentLoaded**

#### **7.1 是什么**

当初始的 **HTML** 文档被完全加载和解析完成之后，**`DOMContentLoaded`** 事件被触发，而无需等待样式表、图像和子框架的完全加载。

这时问题又来了，“HTML 文档被加载和解析完成”是什么意思呢？或者说，HTML 文档被加载和解析完成之前，浏览器做了哪些事情呢？那我们需要从浏览器渲染原理来谈谈。

浏览器向服务器请求到了 HTML 文档后便开始解析，产物是 DOM（文档对象模型），到这里 HTML 文档就被加载和解析完成了。如果有 CSS 的会根据 CSS 生成 CSSOM（CSS 对象模型），然后再由 DOM 和 CSSOM 合并产生渲染树。有了渲染树，知道了所有节点的样式，下面便根据这些节点以及样式计算它们在浏览器中确切的大小和位置，这就是布局阶段。有了以上这些信息，下面就把节点绘制到浏览器上。所有的过程如下图所示：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWFmZmFmNDg1YTc1YmQ4Yjg5MDQ3ODZlOGMzOGU0NDJfb1AzZjJTWGo5YjhQdGU1cmJIclMzS3F3MWplUHRsQ0tfVG9rZW46S2ExeGJXeHhHbzBmT0l4T2FEdWNjVElqbkNmXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

现在你可能了解 HTML 文档被加载和解析完成前浏览器大概做了哪些工作，但还没完，因为我们还没有考虑现在前端的主角之一 JavaScript。

JavaScript 可以阻塞 DOM 的生成，也就是说当浏览器在解析 HTML 文档时，如果遇到  

```XML
<body>
  <script type="text/javascript">
  console.log(document.getElementById('ele')); // null
  </script>

  <div id="ele"></div>

  <script type="text/javascript">
  console.log(document.getElementById('ele')); // <div id="ele"></div>
  </script>
</body>
```

另外，因为 JavaScript 可以查询任意对象的样式，所以意味着在 CSS 解析完成，也就是 CSSOM 生成之后，JavaScript 才可以被执行。

到这里，我们可以总结一下。当文档中没有脚本时，浏览器解析完文档便能触发 DOMContentLoaded 事件；如果文档中包含脚本，则脚本会阻塞文档的解析，而脚本需要等 CSSOM 构建完成才能执行。在任何情况下，DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。

#### **7.2 异步脚本**

我们到这里一直在说同步脚本对网页渲染的影响，如果我们想让页面尽快显示，那我们可以使用异步脚本。HTML5 中定义了两个定义异步脚本的方法：defer 和 async。我们来看一看他们的区别。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2MyMmNhYTlmNDUxN2JkMTFhMTYyOGZlZmQyNjZjMWRfUlVjbkhYMTBDeTBuODlTUVFNTGZEcDlZaXVTbUk2d2FfVG9rZW46R2RvbmJ3VHVQb2FKN1p4RGR1U2MydTNsbk9iXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

 同步脚本（标签中不含 async 或 defer）： 

当 HTML 文档被解析时如果遇见（同步）脚本，则停止解析，先去加载脚本，然后执行，执行结束后继续解析 HTML 文档。过程如下图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YjliYWQzZjUyNzg2N2Y4ZGE4Y2FmOGJjMDRhODVhZDhfRlZyMXo4ZTR2bFNjR3Zha2U0eEdhRmU3R1I3N1dkbzFfVG9rZW46UENoeWJKeDA3b213ejl4VFdhcmN3bjh0bjJGXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

defer 脚本：

当 HTML 文档被解析时如果遇见 defer 脚本，则在后台加载脚本，文档解析过程不中断，而等文档解析结束之后，defer 脚本执行。另外，defer 脚本的执行顺序与定义时的位置有关。过程如下图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NDg3MGMzY2ZhOWU4NGZjNDdjMzQwYjI0NDI1ODY5MjVfdm54WHVFQ3pLQTJhYU9OU1YxTTVXRGszWmFZNEtXdzlfVG9rZW46U0ZYZWJHZVJpb2lIYU54N0dlRmNIS3h2bm9jXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

async 脚本：

当 HTML 文档被解析时如果遇见 async 脚本，则在后台加载脚本，文档解析过程不中断。脚本加载完成后，文档停止解析，脚本执行，执行结束后文档继续解析。过程如下图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDRkNjg1NGFhNmFjZDgwYTI5NDNlYTEyYjY1ZGZkYmJfcHE3Uks2U09VUU42TGhhb2hNczQwUkFpRTd1Q3I5dVZfVG9rZW46QUZ3c2JZUnVqb2hmdHh4cTNhM2NDbE1HbjRjXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

如果你 Google "async 和 defer 的区别"，你可能会发现一堆类似上面的文章或图片，而在这里，我想跟你分享的是 async 和 defer 对 DOMContentLoaded 事件触发的影响。

**defer 与 DOMContentLoaded**

如果 script 标签中包含 defer，那么这一块脚本将不会影响 HTML 文档的解析，而是等到 HTML 解析完成后才会执行。而 DOMContentLoaded 只有在 defer 脚本执行结束后才会被触发。 所以这意味着什么呢？HTML 文档解析不受影响，等 DOM 构建完成之后 defer 脚本执行，但脚本执行之前需要等待 CSSOM 构建完成。在 DOM、CSSOM 构建完毕，defer 脚本执行完成之后，DOMContentLoaded 事件触发。

**async 与 DOMContentLoaded**

如果 script 标签中包含 async，则 HTML 文档构建不受影响，解析完毕后，DOMContentLoaded 触发，而不需要等待 async 脚本执行、样式表加载等等。

#### **7.3 DOMContentLoaded 与 load**

在回头看第一张图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NjE2N2RiMmNmNWVkMTU1MzI0ZDcwZDM0ZjhlNGVmMzdfeWJTZXk2Z1lvVnRSbk5aa2JnVHNueGl1cWxBMjRkaTlfVG9rZW46S1duM2JuaE5jb1F2Tkl4NmNJOWNTVjZqbkVkXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

与标记 1 的蓝线平行的还有一条红线，红线就代表 load 事件触发的时间，对应的，在最下面的概览部分，还有一个用红色标记的 "Load:1.60s"，描述了 load 事件触发的具体时间。

这两个事件有啥区别呢？点击这个网页你就能明白：[testdrive-archive.azu...](https://link.juejin.cn?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Ftestdrive-archive.azurewebsites.net%2FHTML5%2FDOMContentLoaded%2FDefault.html)

解释一下，当 HTML 文档解析完成就会触发 DOMContentLoaded，而所有资源加载完成之后，load 事件才会被触发。

另外需要提一下的是，我们在 jQuery 中经常使用的 (document).ready(function()//...代码...);其实监听的就是DOMContentLoaded事件，而(document).ready(function() { // ...代码... }); 其实监听的就是 DOMContentLoaded 事件，而 (document).ready(function()//...代码...);其实监听的就是DOMContentLoaded事件，而(document).load(function() { // ...代码... }); 监听的是 load 事件。

#### **7.4 使用**

```JavaScript
document.addEventListener("DOMContentLoaded", function(event) {
      console.log("DOM fully loaded and parsed");
  });
```

#### **7.5 兼容性**

绿油油一片，放心使用

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjc4OGVlNmI0NWExZTllMTdiZTQwODU5YmU3NmI3ODFfUTY0QU91YVRXRFZOa3RHdHFzSXFncEJjWVduN3NYT2NfVG9rZW46UDJuYWJWMk5BbzJzQjZ4Wjg2UWNGNndGbjRkXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

1. ## **MutationObserver**

#### **8.1 是什么**

`MutationObserver` 是一个内建对象，它观察 DOM 元素，并在检测到更改时触发回调。

#### **8.2 用法**

```JavaScript
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```

#### **8.3 config**

`config` 是一个具有布尔选项的对象，该布尔选项表示“将对哪些更改做出反应”：

- `childList` —— `node` 的直接子节点的更改，
- `subtree` —— `node` 的所有后代的更改，
- `attributes` —— `node` 的特性（attribute），
- `attributeFilter` —— 特性名称数组，只观察选定的特性。
- `characterData` —— 是否观察 `node.data`（文本内容） 其他几个选项：
- `attributeOldValue` —— 如果为 `true`，则将特性的旧值和新值都传递给回调（参见下文），否则只传新值（需要 `attributes` 选项），
- `characterDataOldValue` —— 如果为 `true`，则将 `node.data` 的旧值和新值都传递给回调（参见下文），否则只传新值（需要 `characterData` 选项）。

#### **8.4 兼容性**

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NzA4NTI3YWY4ZTcyM2NiOWJjMDY5ODI3NDhhMGMyZTNfelBkVVJEemh5NVFXNzRDVmt0RGhOTk85MU1BcnhhNWFfVG9rZW46UlBMSGJ6NUJSb0xGRER4QUFjbmNKeVB4bldnXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

1. ## **Promise.any**

#### **9.1 是什么**

`Promise.any()` 接收一个`Promise`可迭代对象，只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise` 。如果可迭代对象中没有一个 `promise` 成功（即所有的 `promises` 都失败/拒绝），就返回一个失败的 promise 和`AggregateError`类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和`Promise.all()`是相反的。

#### **9.2 用法（例子）**

```JavaScript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'promise 1 rejected');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 400, 'promise 2 resolved at 400 ms');
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 700, 'promise 3 resolved at 800 ms');
});

(async () => {
  try {
    let value = await Promise.any([promise1, promise2, promise3]);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
})();
```

#### **9.3 兼容性**

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NGEzM2FiZGYzYTFjZjU0MGFkM2UzYTZiMGQ0OWViYjlfMnY5RzZ6VzBhbWR6M2JiVWlDenZ0Yk56MVdRbnhva1JfVG9rZW46REh0TWJQNmlOb1pDNm14eng1VmN6ZVhQbktmXzE3MTU2NTY3MjA6MTcxNTY2MDMyMF9WNA)

# BigInt数据和Number能相加吗

不能，会报错`TypeError: Cannot mix BigInt and other types, use explicit conversions`

因为隐式类型转换可能丢失信息，所以不允许在bigint和 Number 之间进行混合操作。当混合使用大整数和浮点数时，结果值可能无法由BigInt或Number精确表示。

# 数据类型

数据类型分为**基本数据类型**和**引用数据类型**；

基本数据类型有：

- Number
- String：字符串是不可变的，意思是一旦创建了，值就不能变化
- Boolean
- null：表示一个空对象指针
- Undefined：当使用`var`或`let`声明了变量当时没有初始化时，就相当于给变量赋予了`undifined`值
- Symbol
- BigInt

引用数据类型统称为Object类型，细分的话有：

- 统称为Object类型
  - 细分的话：
    - Object
    - Array
    - Function
    - Date
    - RegExp

**基本数据类型的数据直接存储在栈中**；而**引用数据类型的数据存储在堆中，在栈中保存数据的引用地址**，这个引用地址指向的是对应的数据，以便快速查找到堆内存中的对象。

顺便提一句，**栈内存是自动分配内存的**。而**堆内存是动态分配内存的，不会自动释放**。所以每次使用完对象的时候都要把它设置为null，从而减少无用内存的消耗

# symbol的应用场景

- 可以作为对象的属性名，避免命名冲突
- 使用symbol来定义类的私有属性

# **0.1+0.2>0.3问题**

因为在JS底层中，每个变量是以二进制表示，固定长度为64位，其中第1位是符号位，再往后11位是指数位，最后52表示的是尾数位，所以最大数为2^53

而**0.1和0.2转为二进制的时候是无限循环小数，所以JS就会进行截取，截取以后0.1和0.2就不是他们本身了**，要比原来大那么一丢丢，所以0.1+0.2就>0.3了

解决方法：

- 放大倍数相加后再除以响应倍数
- 设置一个误差范围值，是es6中的`Number.EPSILON`，根据规格，它表示1与大于1的最小浮点数之间的差

`Number.EPSILON`实际上是js能够表示的最小精度，误差小于这个值，就可以认为已经没有意义了，即不存在误差

```CSS
Math.abs(0.1+0.2-0.3) < Number.EPSILON
```

# 类型判断

## typeof

```
typeof null`的值为`Object`，无法分辨是`null`还是`Object
```

因为在JavaScript中，不同的对象都是使用二进制存储的，如果二进制前三位都是0的话，系统会判断为是Object类型，而null的二进制全是0，自然也就判断为Object

## instanceof

只能判断某对象是否存在于目标对象得的原型链上

原理：实际上就是查找目标对象的原型链

```CSS
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
```

## Object.prototype.toString.call()

- 一种最好的基本类型检测方式 `Object.prototype.toString.call()` ;它可以区分 null 、 string 、
- boolean 、 number 、 undefined 、 array 、 function 、 object 、 date 、 math 数据类型。

```CSS
// -----------------------------------------typeof
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
```

**为什么要用****`Object.prototype.toString.call()`****，为什么不用** **`Array.prototype.toString.call()`**

因为只有`Object.prototype.toString.call()`返回的是统一格式，而且 `Array.prototype.toString.call()`的部分类型无法检验。

```CSS
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
```

# **`NaN === NaN`****返回什么**

回 `false`，`NaN`永远不等于`NaN`，判断是否为`NaN`用一个函数 `isNaN`来判断；

`isNaN`传入的如果是其他数据类型，那么现将它使用`Number()`转为数字类型在进行判断

# **call、apply、bind**

相同：

1、都是用来改变函数的this对象的指向的。

2、第一个参数都是this要指向的对象。

3、都可以利用后续参数传参。

不同：

apply和call传入的参数列表形式不同。

- apply接受两个参数，第一个参数是`this`的指向，传`null`或者`undifined`，默认是window，第二个参数是函数接受的参数，以数组的形式传入。改变`this`指向后院函数会立即执行，且此方法只能临时改变`this`指向一次
- call接受两个参数，第一个是`this`的指向，第二个传入一个参数列表。改变`this`指向后院函数会立即执行，且此方法只是临时改变`this`指向一次
- bind接受两个参数，第一个参数是`this`的指向，第二个也是一个参数列表，但是可以分多次传入。改变`this`指向后院函数不会立即执行，而是放回一个永久改变`this`指向的函数

```JavaScript
fn.call(obj, 1, 2);
fn.apply(obj, [1, 2]);
```

bind：语法和call一模一样，区别在于立即执行还是等待执行，bind不兼容IE6~8

bind 主要就是将函数绑定到某个对象，bind()会创建一个函数，返回对应函数便于稍后调用；而apply、call则是立即调用。

总结：基于Function.prototype上的 `apply 、 call 和 bind`调用模式，这三个方法都可以显示的指定调用函数的 this 指向。`apply`接收参数的是数组，`call`接受参数列表，`` bind`方法通过传入一个对象，返回一个`this` 绑定了传入对象的新函数。这个函数的  `this`指向除了使用`new`时会被改变，其他情况下都不会改变。若为空默认是指向全局对象window。

## **实现**

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

```JavaScript
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
```

# 继承

## 原型继承

```JavaScript
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
```

## 组合继承

```JavaScript
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
```

## 寄生组合继承

```JavaScript
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
```

## es6的extend

```JavaScript
// ----------------------方法四：ES6的extend（寄生组合继承的语法糖）
//     子类只要继承父类，可以不写 constructor ，一旦写了，则在 constructor 中的第一句话
// 必须是 super 。

class Son3 extends Father { // Son.prototype.__proto__ = Father.prototype
  constructor(y) {
    super(200)  // super(200) => Father.call(this,200)
    this.y = y
  }
}
```



# exports和module.exports

- 导出方式不一样
  - `exports.xxx='xxx'`
  - `module.export = {}`
- `exports`是`module.exports`的引用，两个指向的是用一个地址，而require能看到的只有`module.exports`

# **ES6和commonjs的区别**

- Commonjs
  - 是同步执行的，不适合前端，后端 nodejs 可以使用 commonjs。
  - 使用方式
    - module.exports = xxx require('xxx') 123
- AMD/CMD/UMD 适用前端 异步执行
  - AMD
    - ```JavaScript
      define(["a","b","c","d","e"],function(a,b,c,d,e){
        // 相当于在前面声明并初始化了要用到的所有模块
        a.dosomething()
        
        if(false) {
          // 即使没有用到模块 b，也会提前执行
          b.dosomething()
        }
        
      })
      ```
  - CMD
    - ```JavaScript
      define(function(require, exports, module){
        var a = require("./a") //需要的时候声明
        a.dosomething()
        if(false) {
          var b = require("./b")
          b.dosomething()
        }
      })
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

# **require 和 import的区别？**

- 调用时机
  - require 是运行时调用，所以其实是可以放在任何地方的
  - Import 是编译时调用，所以必须放在文件的开头
- 使用时，
  - require 需要使用 module.exports = fs 或者exports.fs = xxx
  - import 用 export default 或 export const xx
- 解构赋值
  - require 是赋值的过程
  - import 是解构的过程

# js常见的设计模式

## 单例模式

不管创建多少个对象都只有一个实例

```JavaScript
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
```

## 工厂模式

代替new创建一个对象，且这个对象想工厂制作一样，批量制作属性相同的实例对象（指向不同）

```JavaScript
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
```

## 发布订阅者模式

```JavaScript
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
```

# **setTimeout、Promise、Async/Await 的区别**

1、**setTimeout**

settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行。

2、Promise

Promise本身是**同步的立即执行函数**， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行。

```JavaScript
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

3、async/await

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

```JavaScript
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end
```

# 函数缓存

函数缓存就是将函数运算过的结果进行缓存

本质上是用空间（缓存存储）换时间（计算过程）

实现主要靠闭包、柯里化、高阶函数

# 属性描述符

JavaScript 提供了一个内部数据结构，用于描述对象的值，控制其行为，例如该属性是否可写、可读、可配置、是否可修改以及是否可枚举等。这个内部数据结构被称为属性描述符。

每个属性都有自己对应的属性描述符，保存该属性的元信息。

对象里目前存在的属性描述符有两种主要形式：数据描述符和存储描述符。

## 数据描述符

数据描述符是一个具有属性的值，该值是可写的，也可能是不可写的。数据描述符具有以下可选键值：

- value：该属性对应的值。可以是任何有效的 JavaScript 值(数值，对象，函数等)。默认为 undefined。
- writable：当且仅该属性的值为 true 时，value 才能被赋值运算符所改变。默认为 false。
- configurable：当且仅当该属性的值为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
- enumerable：当且仅当该属性的值为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。

## 存取描述符

存取描述符是由 getter 和 setter 函数对描述的属性。存储描述符具有以下可选键值：

- get：给属性提供 getter 的方法，如果没有 getter 则为 undefined. 当访问该属性时，该方法被执行，方法执行是没有参数传入，但是会传入 this 对象。
- set：给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法接受唯一参数，即该属性新的参数值。
- configurable：当且仅当该属性的值为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
- enumerable：当且仅当该属性的值为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。

## 获取属性描述符

Object 对象提供的 getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。

语法结构如下：

```JavaScript
Object.getOwnPropertyDescriptor(obj, prop)
```

参数：

- `obj`需要查找的目标对象
- `prop`目标对象内属性名称

返回值

如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。

实例代码如下

```JavaScript
var obj = new Object({
  name : 'is_sweet'
})
/*
  * Object.getOwnPropertyDescriptor() 语法结构
    * Object.getOwnPropertyDescriptor(obj, 'name');
      * obj：表示查找的目标对象
      * name：表示对象内的名称
    * 返回值：如果存在返回其属性描述符对象，否则返回 undefined
*/
var result = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(result);
// 输出如下
{
  value: 'is_sweet',
  writable: true,
  enumerable: true,
  configurable: true
}
// 可以公共其属性获取其响应的值
// * 获取该属性的值
console.log(result.value);        // is_sweet
// * 返回该属性是否可枚举
console.log(result.enumerable);   // true
```

## 设置属性描述符

如果想要修改某个属性的描述符，Object 对象提供了两种方法：

- `Object.defineProperty(`) ： 此方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

语法结构如下

```JavaScript
Object.defineProperty(obj, prop, descriptor)
```

参数

- obj: 要定义属性的对象。
- prop: 要定义或修改的属性的名称
- descriptor: 要定义或修改的属性描述符。

返回值

被传递给函数的对象

- `Object.defineProperties()` : 此方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

语法结构如下

```JavaScript
Object.defineProperties(obj, props)
```

参数

- obj: 在其上定义或修改属性的对象。
- props: 要定义其可枚举属性或修改的属性描述符的对象。

返回值

被传递给函数的对象

### 属性描述符的可选键值

#### 1、`value`

该属性对应的值。可以时任何有效的JavaScript值（数值、对象、函数等），默认为undefined

实例代码如下

```JavaScript
var obj = new Object({
  // 定义一个对象的属性及其值(可修改、删除以及可枚举)
  name: '东方月初'
})
console.log('初始的 obj 对象的 name 属性的值为：' + obj.name);

/* 
* 调用Object.defineProperty(obj, prop, desc)方法
  * 作用
    * 用于定义目标对象的新属性
    * 用于修改目标对象的已存在属性
  * 参数
    * obj - 表示目标对象
    * prop - 表示目标对象的目标属性名称
    * desc - 表示属性描述符，必须是对象格式
      {
          value : 值
      }
  * 返回值 - 返回传递的对象
*/
Object.defineProperty(obj, 'name', {
  value: '白月初'
})
console.log('修改后 obj 对象的 name 属性的值为：' + obj.name);

// 输入结果如下
// 初始的 obj 对象的 name 属性的值为：东方月初
// 修改后 obj 对象的 name 属性的值为：白月初
```

这个方法还可以指定对象增加属性，实例代码如下

```JavaScript
// 通过Object.defineProperty(obj, prop, desc)方法增加属性
console.log('为 obj 对象增加 age 属性前，age 属性的值：' + obj.age);
Object.defineProperty(obj, 'age', {
  value: 18
})
console.log('为 obj 对象增加 age 属性后，age 属性的值：' + obj.age);

// 输入结果如下
// 为 obj 对象增加 age 属性前，age 属性的值：undefined
// 为 obj 对象增加 age 属性后，age 属性的值：18
```

> 通过 `Object.defineProperty(obj, prop, desc)` 方法增加的属性，其值是不可修改、不可删除、不可枚举的；如下所示
>
> ```JavaScript
> console.log(Object.getOwnPropertyDescriptor(obj, 'age')); //{ value: 18, writable: false, enumerable: false, configurable: false }
> ```
>
> 如果对这个值进行修改操作的话，是不会报错的，但是修改操作无效。

#### 2、`writable`

当且仅当该属性的值为true时，value才能被赋值运算符所改变，默认为false

```JavaScript
var obj = new Object({
  name: '东方月初'
})
console.log('obj 对象的 name 属性的值为：' + obj.name);
Object.defineProperty(obj, 'name', {
  value: '白月初',
  // 将 writable 的值该为 false 表示 obj 对象的 name 属性的值不可被修改
  writable: false
})
console.log('修改后 obj 对象的 name 属性的值为：' + obj.name);
// 查看是否修改成功
console.log(Object.getOwnPropertyDescriptor(obj, 'name').writable);

// 修改 name 属性
obj.name = '贰货道士'
// 判断是否修改成功
if (obj.name == '贰货道士') {
  console.log('修改成功');
} else {
  console.log('修改失败');
}
// 将 obj 对象的 writable 改为 true
Object.defineProperty(obj, 'age', {
  value: 18,
  writable: true
});
// 修改 name 属性
obj.age = 20
if (obj.age == 20) {
  console.log('修改成功');
} else {
  console.log('修改失败');
}
// 输入结果如下
// obj 对象的 name 属性的值为：东方月初
// 修改后 obj 对象的 name 属性的值为：白月初
// false
// 修改失败
// 修改成功
```

#### 3、`configurable`

当且仅当该属性的值为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。

实例代码如下

```JavaScript
var obj = new Object({
  name: '东方月初'
})
console.log('obj 对象的 name 属性的值为：' + obj.name);
Object.defineProperty(obj, 'name', {
  value: '白月初',
  // 将 configurable 的值该为 false 表示 obj 对象的 name 属性的值不可被删除
  configurable: false
})
console.log('修改后 obj 对象的 name 属性的值为：' + obj.name);
// 查看是否修改成功
console.log(Object.getOwnPropertyDescriptor(obj, 'name').configurable);
// 删除 name 属性
delete obj.name;
// 判断是否删除成功
if (obj.name) {
  console.log('删除失败');
} else {
  console.log('删除成功');
}
// 新建属性 并将 configurable 的值设为 true
Object.defineProperty(obj, 'age', {
  value: 18,
  configurable: true
})
// 删除 age 属性
delete obj.age;
// 判断是否删除成功
if (obj.age) {
  console.log('删除失败');
} else {
  console.log('删除成功');
}
```

4、`enumerable`

当且仅当该属性的值为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。

我们知道循环遍历语句遍历对象的属性有三种方式，如下所示：

- for...in 语句：遍历该对象的可枚举属性
- Object.keys() 方法：该方法返回一个数组，该数组包含了该对象中所有自有可枚举的属性名称。
- Object.getOwnPropertyNames() 方法：该方法返回一个数组，该数组包含了该对象中所有属性名称。

通过 Object.defineProperties() 来验证这个属性描述符，示例代码如下

```JavaScript
// 创建一个空对象
var obj = {};

/*
 * 通过 Object.defineProperties(obj, props) 为 obj 对象增加属性。
 * obj: 在其上定义或修改属性的对象。
 * props: 要定义其可枚举属性或修改的属性描述符的对象。
 */
Object.defineProperties(obj, {
  'name': {
    value: '白月初',
    enumerable: true // 可枚举
  },
  'age': {
    value: 18,
    // 不可枚举
    enumerable: false
  },
  'sex': {
    value: '男',
    // 不可枚举
    enumerable: false
  },
  'obj': {
    value: '最强红线仙',
    enumerable: true
  }
})
// 通过 for..in 遍历
for (var i in obj) {
  console.log(obj[i]);
}

// 通过 Object.keys() 方法
var result1 = Object.keys(obj);
console.log(result1);        // [ 'name', 'obj' ]
// 通过 Object.getOwnPropertyNames() 方法
var result2 = Object.getOwnPropertyNames(obj);
console.log(result2);        // [ 'name', 'age', 'sex', 'obj' ]

// 输入结果如下
// 白月初
// 最强红线仙
// [ 'name', 'obj' ]
// [ 'name', 'age', 'sex', 'obj' ]
```

### 属性描述符设置方法

`Object.getOwnPropertyDescriptor()`方法获取到当前方法的属性描述符

```JavaScript
var obj = {
  print: function () {
    console.log('This is print');
  }
}
var result = Object.getOwnPropertyDescriptor(obj, 'print');
console.log(result);
/*
  * 执行结果如下
  {
    value: [Function: print],
    writable: true,
    enumerable: true,
    configurable: true
  }
*/
```

既然可以获取到，就可以通过`Object.defineProperty()` 或者 `Object.defineProperties()` 方法进行修改

```JavaScript
Object.defineProperty(obj, 'print', {
  value:function() {
    console.log('This is new print');
  }
})
obj.print(); // This is new print
```

## 属性描述符存储器

对象的属性除了可以直接定义以外，还可以使用存取器进行定义。其中 setter 为存值函数，使用属性描述符中的 set; getter 为取值函数，使用属性描述符中的 get。

存取描述符中的 get() 类似于类似于数据描述符中的 value，get() 方法在被调用时，不能传递任何参数，但是可以传递 this 关键字(表示当前目标对象，不过不能调用对象的当前目标属性。)

存取描述符中的 set() 用于实现当前目标属性的的修改作用，该方法接受一个唯一参数，作为当前目标属性的新值。

由此我们可以通过一个辅助变量来帮助我们对其进行赋值和获取操作，示例代码如下：

```JavaScript
var obj = {}
// 辅助变量，用于赋值和获取操作
var value = '小蠢货'

Object.defineProperty(obj, 'name', {
  get: function () {
    // 通过辅助变量获取属性值
    return value
  },
  set: function (newValue) {
    // 通过修改辅助变量，完成赋值操作
    value = newValue
  }
})
console.log(obj.name)
obj.name = '涂山苏苏'
console.log(obj.name);
```

JavaScript 中除了提供上述写法，还提供了另一种写法，如下所示

```JavaScript
// 辅助变量，用于赋值和获取操作
var value = '小蠢货'

var obj = {
  // 存取描述符中的get
  get attr() { // 表示当前目标属性名称
    return value;
  },
  // 存取描述符中的set
  set attr(newValue) { // 表示当前目标属性名称
    value = newValue;
  }
}
console.log(obj.attr); // 小蠢货
obj.attr = '涂山苏苏'
console.log(obj.attr); // 涂山苏苏
```

# parseInt、Math.floor

parseInt：向0取整

Math.floor：向下取整

如果是负数的话，如-2.5，那么parseInt会是-2，Math.floor是-3

# 循环和递归

```HTML
for (初始代码; 条件代码; 循环代码) {
  循环体代码
}

function m() {
  初始代码;
  // 1、使用while循环
  // while (条件代码) {
  //   循环体代码;
  //   循环代码;
  // }
  // 2、使用函数递归
  function fn() {
    if (条件代码) {
      循环体代码;
      循环代码;
      fn();
    }
  }
  fn();
}
```

# eval

`eval` 是一个 JavaScript 函数，用于执行 JavaScript 字符串中的代码。它将字符串作为参数，并将其解析为 JavaScript 代码，然后执行解析后的代码。换句话说，`eval` 函数允许在运行时动态地执行代码。

```JavaScript
const x = 10;
const y = 20;
const codeString = 'console.log(x + y);';

// 使用 eval 执行字符串中的代码
eval(codeString); // 输出 30
// 也可以使用new Function
new Function('x', 'y', codeString)(x, y);
```

在这个示例中，字符串 `codeString` 包含了一段 JavaScript 代码，即 `console.log(x + y);`。通过 `eval(codeString)`，这段代码会被解析并执行，输出结果为 `30`，因为 `x` 的值是 `10`，`y` 的值是 `20`。

尽管 `eval` 函数在某些情况下非常方便，但它也具有潜在的安全风险，特别是当它被用来执行动态生成的用户输入时。这是因为 `eval` 可以执行任何有效的 JavaScript 代码，包括恶意代码，这可能导致安全漏洞和其他问题。因此，在编写 JavaScript 代码时，应该尽量避免使用 `eval`，而是考虑使用其他更安全的方法来达到相同的目的。
