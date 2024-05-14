

```JavaScript
// 第一种
function createCurry(fn, args = []) {
  console.log(fn, args)
  return function () {
      let _args = args.concat(...arguments)
      console.log(_args)
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

// 第二种
const curry = (fn, ...args) => {
  // 函数的参数个数可以直接通过函数数的.length属性来访问
  console.log(fn,fn.length, args)
  return args.length >= fn.length // 这个判断很关键！！！
  // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
  ? fn(...args)
  /**
   * 传入的参数小于原始函数fn的参数个数时
   * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
  */
  : (..._args) => {
    console.log('_args', _args)
    return curry(fn, ...args, ..._args)
  };
}

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
```