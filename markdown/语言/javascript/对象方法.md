# Object.keys()

`Object.keys()` 方法返回一个包含对象

所有可枚举属性的数组。

```javascript
const person = {
  name: 'John',
  age: 25,
};

const keys = Object.keys(person);
console.log(keys); // 输出: ['name', 'age']
```

# Object.values()

`Object.values()` 方法返回一个包含对象所有可枚举属性值的数组。

```javascript
const person = {
  name: 'John',
  age: 25,
};

const values = Object.values(person);
console.log(values); // 输出: ['John', 25]
```

# Object.entries()

`Object.entries()` 方法返回一个包含对象所有可枚举属性键值对的数组。

```javascript
const person = {
  name: 'John',
  age: 25,
};

const entries = Object.entries(person);
console.log(entries);
// 输出: [['name', 'John'], ['age', 25]]
```

# Object.assign()

`Object.assign()` 方法用于将一个或多个源对象的属性复制到目标对象中。

```javascript
const target = {
  name: 'John',
};

const source = {
  age: 25,
};

Object.assign(target, source);
console.log(target); // 输出: { name: 'John', age: 25 }
```

# Object.freeze()

`Object.freeze()` 方法冻结一个对象，使其属性不可修改。

```javascript
const person = {
  name: 'John',
};

Object.freeze(person);

person.age = 25; // 操作无效，没有修改属性的权限

console.log(person); // 输出: { name: 'John' }
```

# ES8-对象相关的属性

```js
const obj = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

// 1.获取所有的key
const keys = Object.keys(obj)
console.log(keys)
//["name","age","height","address"]

// 2.ES8 Object.values
const values = Object.values(obj)
console.log(values)
//["why",18,1.88,"广州市"]

// 3.ES8 Object.entries
// 3.1. 对对象操作
const entries = Object.entries(obj)
console.log(entries)
//[["name","why"],["age",18],["height",1.88],[="address",="广州市"]]
for (const entry of entries) {
  const [key, value] = entry
  console.log(key, value)
  //name why
	//age 18
	//height 1.88
	//address 广州市
}

// 3.2. 对数组/字符串操作(了解)
console.log(Object.entries(["abc", "cba"]))
//[["0","abc"],["1","cba"]]
console.log(Object.entries("Hello"))
//[["0","H"],["1","e"],["2","l"],["3","l"],["4","o"]]
```

