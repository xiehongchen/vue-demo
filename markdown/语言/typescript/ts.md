#  typescript

> 学习：
> [B站小满ZS](https://www.bilibili.com/video/BV1wR4y1377K)
>
> CSDN：
> [CSDN](https://blog.csdn.net/qq1195566313/category_11559497.html?spm=1001.2014.3001.5482)

## 基础类型

基础类型：Boolean、Number、String、`null`、`undefined` 以及 ES6 的 [Symbol](http://es6.ruanyifeng.com/#docs/symbol) 和 ES10 的 [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。

### 1、字符串类型

字符串是使用string定义的

```TypeScript
let a: string = '123'
//普通声明
 
//也可以使用es6的字符串模板

let str: string = `dddd${a}`
```

其中 `用来定义 [ES6 中的模板字符串](http://es6.ruanyifeng.com/#docs/string%23模板字符串)，${expr}用来在模板字符串中嵌入表达式。

### 2、数字类型

支持十六进制、十进制、八进制和二进制；

```ts
let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s
```

### 3、布尔类型

注意，使用构造函数 Boolean 创造的对象不是布尔值：

```ts
let createdBoolean: boolean = new Boolean(1)
//这样会报错 应为事实上 new Boolean() 返回的是一个 Boolean 对象 
```

事实上 new Boolean() 返回的是一个 Boolean 对象 需要改成

```ts
let createdBoolean: Boolean = new Boolean(1)
```

```ts
let booleand: boolean = true //可以直接使用布尔值

let booleand2: boolean = Boolean(1) //也可以通过函数返回布尔值
```

### 4、空值类型

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数

```ts
function voidFn(): void {
    console.log('test void')
}
```

void 类型的用法，主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的异步回调函数

**void也可以定义undefined 和 null类型**

```ts
let u: void = undefined
let n: void = null;
```

### 5、Null和undefined类型

```ts
let u: undefined = undefined;//定义undefined
let n: null = null;//定义null
```

**void 和 undefined 和 null 最大的区别**
与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 string 类型的变量：

```ts
//这样写会报错 void类型不可以分给其他类型
let test: void = undefined
let num2: string = "1"
```

```ts
num2 = test
//这样是没问题的
let test: null = null
let num2: string = "1"

num2 = test

//或者这样的
let test: undefined = undefined
let num2: string = "1"

num2 = test
```

**TIPS 注意：**
如果你配置了tsconfig.json 开启了严格模式

```ts
{
    "compilerOptions":{
        "strict": true
    }
}
```

![img](https://img-blog.csdnimg.cn/28e31a2f9fc44427a067e29ccee485bd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

null 不能 赋予 void 类型 

## 任意类型

**Any 类型 和 unknown 顶级类型**

### 1.没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型

```ts
let anys:any = 123
anys = '123'
anys = true
```

### 2.声明变量的时候没有指定任意类型默认为any

```ts
let anys;
anys = '123'
anys = true
```

### 3.弊端如果使用any 就失去了TS类型检测的作用

### 4.TypeScript 3.0中引入的 unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给unknown

unknow  unknow类型比any更加严格当你要使用any 的时候可以尝试使用unknow

```ts
//unknown 可以定义任何类型的值
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK

//这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
//unknown类型不能赋值给其他类型
let names:unknown = '123'
let names2:string = names

//这样就没问题 any类型是可以的
let names:any = '123'
let names2:string = names   

//unknown可赋值对象只有unknown 和 any
let bbb:unknown = '123'
let aaa:any= '456'

aaa = bbb
```

区别2

```ts
如果是any类型在对象没有这个属性的时候还在获取是不会报错的
let obj:any = {b:1}
obj.a

如果是unknow 是不能调用属性和方法
let obj:unknown = {b:1,ccc:():number=>213}
obj.b
obj.ccc()
```

## 接口和对象类型

### 对象的类型

在[typescript](https://so.csdn.net/so/search?from=pc_blog_highlight&q=typescript)中，我们定义对象的方式要用关键字**interface**（接口），我的理解是使用**interface**来定义一种约束，让数据的结构满足约束的格式。定义方式如下：

```ts
//这样写是会报错的 因为我们在person定义了a，b但是对象里面缺少b属性
//使用接口约束的时候不能多一个属性也不能少一个属性
//必须与接口保持一致
interface Person {
    b:string,
    a:string
}
 
const person:Person  = {
    a:"213"
}
```

```ts
//重名interface  可以合并
interface A{name:string}
interface A{age:number}
var x:A={name:'xx',age:20}
//继承
interface A{
    name:string
}
 
interface B extends A{
    age:number
}
 
let obj:B = {
    age:18,
    name:"string"
}
```

### 可选属性 使用?操作符

```ts
//可选属性的含义是该属性可以不存在
//所以说这样写也是没问题的
interface Person {
    b?:string,
    a:string
}
 
const person:Person  = {
    a:"213"
}
```

### 任意属性 [propName: string]

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```ts
//在这个例子当中我们看到接口中并没有定义C但是并没有报错
//应为我们定义了[propName: string]: any;
//允许添加新的任意属性
interface Person {
    b?:string,
    a:string,
    [propName: string]: any;
}
 
const person:Person  = {
    a:"213",
    c:"123"
}
```

### 只读属性 readonly

readonly 只读属性是不允许被赋值的只能读取

```ts
//这样写是会报错的
//应为a是只读的不允许重新赋值
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
}
 
const person: Person = {
    a: "213",
    c: "123"
}
 
person.a = 123
```

### 添加函数

```ts
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
    cb:()=>void
}
 
const person: Person = {
    a: "213",
    c: "123",
    cb:()=>{
        console.log(123)
    }
}
```

## 数组类型

### 数组的类型

类型[ ] 

```ts
//类型加中括号
let arr:number[] = [123]
//这样会报错定义了数字类型出现字符串是不允许的
let arr:number[] = [1,2,3,'1']
//操作方法添加也是不允许的
let arr:number[] = [1,2,3,]
arr.unshift('1')
 
 
var arr: number[] = [1, 2, 3]; //数字类型的数组
var arr2: string[] = ["1", "2"]; //字符串类型的数组
var arr3: any[] = [1, "2", true]; //任意类型的数组
```

### 数组泛型

规则 Array<类型>

```ts
let arr:Array<number> = [1,2,3,4,5]
```

### 用接口表示数组

一般用来描述类数组 

```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
//表示：只要索引的类型是数字时，那么值的类型必须是数字。
```

### 多维数组

```ts
let data:number[][] = [[1,2], [3,4]];
```

### arguments类数组

```ts
function Arr(...args:any): void {
    console.log(arguments)
    //错误的arguments 是类数组不能这样定义
    let arr:number[] = arguments
}
Arr(111, 222, 333)
 
 
 
function Arr(...args:any): void {
    console.log(arguments) 
    //ts内置对象IArguments 定义
    let arr:IArguments = arguments
}
Arr(111, 222, 333)
 
//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
[index: number]: any;
length: number;
callee: Function;
}
```

### any 在数组中的应用

一个常见的例子数组中可以存在任意类型

```ts
let list: any[] = ['test', 1, [],{a:1}]
```

## 函数扩展

### 函数的类型

```ts
//注意，参数不能多传，也不能少传 必须按照约定的类型来
const fn = (name: string, age:number): string => {
    return name + age
}
fn('张三',18)
```

### 函数的可选参数?

```ts
//通过?表示该参数为可选参数
const fn = (name: string, age?:number): string => {
    return name + age
}
fn('张三')
```

### 函数参数的默认值

```ts
const fn = (name: string = "我是默认值"): string => {
    return name
}
fn()
```

### 接口定义函数

```ts
//定义参数 num 和 num2  ：后面定义返回值的类型
interface Add {
    (num:  number, num2: number): number
}
 
const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
fn(5, 5)
 
 
interface User{
    name: string;
    age: number;
}
function getUserInfo(user: User): User {
  return user
}
```

### 定义剩余参数

```ts
const fn = (array:number[],...items:any[]):any[] => {
       console.log(array,items)
       return items
}
 
let a:number[] = [1,2,3]
 
fn(a,'4','5','6')
```

### 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

如果参数类型不同，则参数类型应设置为 **any**。

参数数量不同你可以将不同的参数设置为可选。

```ts
function fn(params: number): void
 
function fn(params: string, params2: number): void
 
function fn(params: any, params2?: any): void {
 
    console.log(params)
 
    console.log(params2)
 
}
 
 
 
fn(123)
 
fn('123',456)
```

## 类型断言 | 联合类型 | 交叉类型

### 联合类型

```ts
//例如我们的手机号通常是13XXXXXXX 为数字类型 这时候产品说需要支持座机
//所以我们就可以使用联合类型支持座机字符串
let myPhone: number | string  = '010-820'
 
 
//这样写是会报错的应为我们的联合类型只有数字和字符串并没有布尔值
let myPhone: number | string  = true
```

**函数使用联合类型**

```ts
const fn = (something:number | boolean):boolean => {
     return !!something
}
```

### 交叉类型

多种类型的集合，联合对象将具有所联合类型的所有成员

```ts
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => {
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
xiaoman({age: 18,height: 180,sex: 'male'});
```

### 类型断言

语法：`值 as 类型　　或　　<类型>值  value as string  <string>value`

```ts
interface A {
       run: string
}
 
interface B {
       build: string
}
 
const fn = (type: A | B): string => {
       return type.run
}
//这样写是有警告的应为B的接口上面是没有定义run这个属性的
```

```ts
interface A {
       run: string
}
 
interface B {
       build: string
}
 
const fn = (type: A | B): string => {
       return (type as A).run
}
//可以使用类型断言来推断他传入的是A接口的值
```

需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：

### 使用any临时断言

```ts
window.abc = 123
//这样写会报错因为window没有abc这个东西
```

```ts
(window as any).abc = 123
//可以使用any临时断言在 any 类型的变量上，访问任何属性都是允许的。
```

### `as const`

是对字面值的**断言**，与const直接定义常量是有区别的

如果是普通类型跟直接const 声明是一样的

```ts
const names = '小满'
names = 'aa' //无法修改
 
 
 
 
let names2 = '小满' as const
names2 = 'aa' //无法修改
```

```ts
// 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];
 
a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针
```

### 类型断言是不具影响力的

在下面的例子中，将 something 断言为 [boolean](https://so.csdn.net/so/search?q=boolean&spm=1001.2101.3001.7020) 虽然可以通过编译，但是并没有什么用 并不会影响结果, 因为编译过程中会删除类型断言

```ts
function toBoolean(something: any): boolean {
    return something as boolean;
}
 
toBoolean(1);
// 返回值为 1
//
```

## 内置对象&代码雨

JavaScript 中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 [TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 中当做定义好了的类型。

### ECMAScript 的内置对象

**`Boolean`、Number、`string`、`RegExp`、`Date`、`Error`**

```ts
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('哔哩哔哩关注小满zs')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error("error!")
console.log(e)
```

### DOM 和 BOM 的内置对象

**`Document`、`HTMLElement`、`Event`、`NodeList` 等**

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {
    
});
//dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}
```

### 定义Promise

如果我们不指定返回的类型TS是推断不出来返回的是什么类型

![img](https://img-blog.csdnimg.cn/1027f6bee3a84aa58ea4d349a50f48e0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

指定返回的类型

![img](https://img-blog.csdnimg.cn/b4e56fb2426e4502a043d43642312cd8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

函数定义返回promise 语法规则:Promise<T> 类型 

![img](https://img-blog.csdnimg.cn/68d399594565403cb757e7000b1e9a4b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

```ts
function promise():Promise<number>{
   return new Promise<number>((resolve,reject)=>{
       resolve(1)
   })
}
 
promise().then(res=>{
    console.log(res)
})
```

当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了

而他们的定义文件，则在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中

![img](https://img-blog.csdnimg.cn/144d5d4e8d7e41c1b792569000a0aac6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 代码雨案例

```ts
let canvas = document.querySelector('#canvas') as HTMLCanvasElement
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
canvas.height = screen.availHeight; //可视区域的高度
canvas.width = screen.availWidth; //可视区域的宽度
let str: string[] = 'XMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSB'.split('')
let Arr = Array(Math.ceil(canvas.width / 10)).fill(0) //获取宽度例如1920 / 10 192
console.log(Arr);
 
const rain = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)'//填充背景颜色
    ctx.fillRect(0, 0, canvas.width, canvas.height)//背景
    ctx.fillStyle = "#0f0"; //文字颜色
    Arr.forEach((item, index) => {
        ctx.fillText(str[ Math.floor(Math.random() * str.length) ], index * 10, item + 10)
        Arr[index] = item >= canvas.height || item > 10000 *  Math.random() ? 0 : item + 10; //添加随机数让字符随机出现不至于那么平整
    })
    console.log(Arr);
    
}
setInterval(rain, 40)
```

![img](https://img-blog.csdnimg.cn/6c4083b3ce5141f6a3e13b6d4cb19fb2.png)

## Class类

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写，就是下面这样。

```ts
//定义类
class Person {
    constructor () {
 
    }
    run () {
        
    }
}
```

### 定义类

![img](https://img-blog.csdnimg.cn/3acdefe6f1074aaea36bd7c9e06fe4d2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

在TypeScript是不允许直接在constructor 定义变量的 需要在constructor上面先声明

![img](https://img-blog.csdnimg.cn/a5f9ca6e2bcc48738d59b816acf79b52.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

这样引发了第二个问题你如果了定义了变量不用 也会报错 通常是给个默认值 或者 进行赋值

![img](https://img-blog.csdnimg.cn/48c2c425bc1c47599557a8103ff30b83.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

![img](https://img-blog.csdnimg.cn/47d53797b01349d684bb973fd073673c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 类的修饰符

 **public private protected**

![img](https://img-blog.csdnimg.cn/2eaca794296640b183cdcdddb221ee68.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

使用public 修饰符 可以让你定义的变量 内部访问 也可以外部访问 如果不写默认就是public

![img](https://img-blog.csdnimg.cn/a4a2499d7600474dac78dc9a3af3afa2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

使用 private 修饰符 代表定义的变量私有的只能在内部访问 不能在外部访问

![img](https://img-blog.csdnimg.cn/d64333f651ec4a799ca665cae11d0d72.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

![img](https://img-blog.csdnimg.cn/5ac43616ad77488284bae4205db3f6c8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

使用 protected 修饰符 代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问

```ts
class Person {
    public name:string
    private age:number 
    protected some:any
    constructor (name:string,ages:number,some:any) {
       this.name = name
       this.age = ages
       this.some = some
    }
    run () {
 
    }
}
 
class Man extends Person{
    constructor () {
        super("张三",18,1)
        console.log(this.some)
    }
    create () {
       console.log(this.some)
    }
}
let xiaoman = new Person('小满',18,1)
let man = new Man()
man.some
```

### static 静态属性 和 静态方法

![img](https://img-blog.csdnimg.cn/dd66b961270146ada29a9525d750feeb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

我们用static 定义的属性 不可以通过this 去访问 只能通过类名去调用

![img](https://img-blog.csdnimg.cn/0e398a1e6ad7452a8d607821e3969bdf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

static 静态函数 同样也是不能通过this 去调用 也是通过类名去调用

![img](https://img-blog.csdnimg.cn/a6bdc54f0e9140ebafdcb6b0568c164a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

需注意： 如果两个函数都是static 静态的是可以通过this互相调用

![img](https://img-blog.csdnimg.cn/77712c790646400ba121cb061994a762.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

### interface 定义 类

![img](https://img-blog.csdnimg.cn/fe05924183054a489cf8613feb579be7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

ts interface 定义类 使用关键字 implements  后面跟interface的名字多个用逗号隔开 继承还是用extends

super()	其实是符类的prototype.constructor.call

```ts
 
interface PersonClass {
    get(type: boolean): boolean
}
 
interface PersonClass2{
    set():void,
    asd:string
}
 
class A {
    name: string
    constructor() {
        this.name = "123"
    }
}
 
class Person extends A implements PersonClass,PersonClass2 {
    asd: string
    constructor() {
        super()	
        this.asd = '123'
    }
    get(type:boolean) {
        return type
    }
    set () {
 
    }
}
```

### 抽象类

应用场景如果你写的类实例化之后毫无用处此时我可以把他定义为抽象类

或者你也可以把他作为一个基类-> 通过继承一个派生类去实现基类的一些方法

我们看例子

下面这段代码会报错抽象类无法被实例化

```ts
abstract class A {
   public name:string
   
}
 
new A()
```

例子2

我们在A类定义了 getName 抽象方法但为实现

我们B类实现了A定义的抽象方法 如不实现就不报错 **我们定义的抽象方法必须在派生类实现**

```ts
abstract class A {
   name: string
   constructor(name: string) {
      this.name = name;
   }
   print(): string {
      return this.name
   }
 
   abstract getName(): string
}
 
class B extends A {
   constructor() {
      super('小满')
   }
   getName(): string {
      return this.name
   }
}
 
let b = new B();
 
console.log(b.getName());
```

视频案例

```ts
//1. class 的基本用法 继承 和 类型约束
//2. class 的修饰符 readonly  private protected public
//3. super 原理
//4. 静态方法
//5. get set
interface Options {
    el: string | HTMLElement
}
 
interface VueCls {
    init(): void
    options: Options
}
 
interface Vnode {
    tag: string
    text?: string
    props?: {
        id?: number | string
        key?: number | string | object
    }
    children?: Vnode[]
}
 
class Dom {
    constructor() {
 
    }
 
    private createElement(el: string): HTMLElement {
        return document.createElement(el)
    }
 
    protected setText(el: Element, text: string | null) {
        el.textContent = text;
    }
 
    protected render(createElement: Vnode): HTMLElement {
        const el = this.createElement(createElement.tag)
        if (createElement.children && Array.isArray(createElement.children)) {
            createElement.children.forEach(item => {
                const child = this.render(item)
                this.setText(child, item.text ?? null)
                el.appendChild(child)
            })
        } else {
            this.setText(el, createElement.text ?? null)
        }
        return el;
    }
}
 
 
 
class Vue extends Dom implements VueCls {
    options: Options
    constructor(options: Options) {
        super()
        this.options = options;
        this.init()
    }
 
   static version () {
      return '1.0.0'
   }
 
   public init() {
        let app = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;
        let data: Vnode = {
            tag: "div",
            props: {
                id: 1,
                key: 1
            },
            children: [
                {
                    tag: "div",
                    text: "子集1",
                },
                {
                    tag: "div",
                    text: "子集2"
                }
            ]
        }
        app?.appendChild(this.render(data))
        console.log(app);
 
        this.mount(app as Element)
    }
 
   public mount(app: Element) {
        document.body.append(app)
    }
}
 
 
const v = new Vue({
    el: "#app"
})
```

## 元组类型

如果需要一个固定大小的不同类型值的集合，我们需要使用元组。 

### 元组就是数组的变种

**元组（Tuple）是固定数量的不同类型的元素的组合**。

元组与集合的不同之处在于，元组中的元素类型可以是不同的，而且数量固定。元组的好处在于可以把多个元素作为一个单元传递。如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示。

```ts
let arr:[number,string] = [1,'string']
 
 
let arr2: readonly [number,boolean,string,undefined] = [1,true,'sring',undefined]
```

当赋值或访问一个已知索引的元素时，会得到正确的类型：

```ts
let arr:[number,string] = [1,'string']
arr[0].length //error
arr[1].length //success
 
//数字是没有length 的
```

元组类型还可以支持自定义名称和变为可选的

```ts
let a:[x:number,y?:boolean] = [1]
```

### 越界元素

```ts
let arr:[number,string] = [1,'string']
 
arr.push(true)//error
```

对于越界的元素他的类型被限制为 联合类型（就是你在元组中定义的类型）如下图

![img](https://img-blog.csdnimg.cn/29f23f5e7fdb43f69a6d19ee7c9c3df6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

### **应用场景 例如定义excel返回的数据**

```ts
let excel: [string, string, number, string][] = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
]
```

## 枚举类型

在javaScript中是没有枚举的概念的TS帮我们定义了枚举这个类型

> 使用枚举 通过enum关键字定义我们的枚举

### 数字枚举

例如 红绿蓝 Red = 0 Green = 1 Blue= 2 分别代表红色0 绿色为1 蓝色为2

```ts
enum Types{
   Red,
   Green,
   BLue
}
```

这样写就可以实现应为ts定义的枚举中的每一个组员默认都是从0开始的所以也就是

```ts
enum Types{
   Red = 0,
   Green = 1,
   BLue = 2
}
//默认就是从0开始的 可以不写值
```

增长枚举

```ts
enum Types{
   Red = 1,
   Green,
   BLue
}
```

如上，我们定义了一个数字枚举， Red使用初始化为 `1`。 其余的成员会从 `1`开始自动增长。 换句话说， Type`.Red`的值为 `1`， `Green`为 `2`， `Blue`为 `3`。

### 字符串枚举

字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串[字面量](https://so.csdn.net/so/search?q=字面量&spm=1001.2101.3001.7020)，或另外一个字符串枚举成员进行初始化。

```ts
enum Types{
   Red = 'red',
   Green = 'green',
   BLue = 'blue'
}
```

由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息，字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

### 异构枚举

枚举可以混合字符串和数字成员

```ts
enum Types{
   No = "No",
   Yes = 1,
}
```

### 接口枚举

定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds

声明对象的时候要遵循这个规则

```ts
   enum Types {
      yyds,
      dddd
   }
   interface A {
      red:Types.yyds
   }
 
   let obj:A = {
      red:Types.yyds
   }
```

### `const`枚举

let  和 var 都是不允许的声明只能使用const

大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举。 常量枚举通过在枚举上使用 const修饰符来定义

- const 声明的枚举会被编译成常量

- 普通声明的枚举编译完后是个对象

```ts
const enum Types{
   No = "No",
   Yes = 1,
}
```

#### Const 声明编译之后

![img](https://img-blog.csdnimg.cn/3ff5c0fc49664f42a652860339263559.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 普通声明编译之后

![img](https://img-blog.csdnimg.cn/90f8768bb3114370b5cc9bcdcf002ee6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 反向映射

它包含了正向映射（ `name` -> `value`）和反向映射（ `value` -> `name`）

要注意的是 *不会*为字符串枚举成员生成反向映射。

```ts
enum Enum {
   fall
}
let a = Enum.fall;
console.log(a); //0
let nameOfA = Enum[a]; 
console.log(nameOfA); //fall
```

## 类型推论|类型别名

### 什么是类型推论

```TypeScript
let str = "小满zs"
```

- 我声明了一个变量但是没有定义类型

[TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论

![img](https://img-blog.csdnimg.cn/1d631575a0084ec6a1c8d288665472fa.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

所以TS帮我推断出来这是一个string类型

![img](https://img-blog.csdnimg.cn/a1de5ad7b2f944c5943c93e76598a665.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

不能够在赋值给别的类型

- 如果你声明变量没有定义类型也没有赋值这时候TS会推断成any类型可以进行任何操作

![img](https://img-blog.csdnimg.cn/ac55d781b42d40e9a2864244147b60ed.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 类型别名

type 关键字（可以给一个类型定义一个名字）多用于复合类型

 定义类型别名

```ts
type str = string
 
 
let s:str = "我是小满"
 
console.log(s);
```

 定义函数别名

```TypeScript
type str = () => string
let s: str = () => "我是小满"

console.log(s);
```

 定义联合类型别名

```TypeScript
type str = string | number
 
 
let s: str = 123
 
let s2: str = '123'
 
console.log(s,s2);
```

定义值的别名

```ts
type value = boolean | 0 | '213'
 
 
let s:value = true
//变量s的值  只能是上面value定义的值
```

### type 和 interface 还是一些区别的 虽然都可以定义类型

1.interface可以继承  type 只能通过 & 交叉类型合并

2.type 可以定义 联合类型 和 可以使用一些操作符 interface不行

3.interface 遇到重名的会合并 type 不行

### type高级用法

左边的值会作为右边值的子类型遵循图中上下的包含关系

```ts
type a = 1 extends number ? 1 : 0 //1
 
type a = 1 extends Number ? 1 : 0 //1
 
type a = 1 extends Object ? 1 : 0 //1
 
type a = 1 extends any ? 1 : 0 //1
 
type a = 1 extends unknow ? 1 : 0 //1
 
type a = 1 extends never ? 1 : 0 //0
```

![img](https://img-blog.csdnimg.cn/5e0a471d4f894d6492543f6ee1243f34.png)

## never类型

[TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 将使用 never 类型来表示不应该存在的状态

```ts
// 返回never的函数必须存在无法达到的终点
 
// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
    throw new Error(message);
}
 
// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (true) {
    }
}
```

### never 与 `void` 的差异

```ts
    //void类型只是没有返回值 但本身不会出错
    function Void():void {
        console.log();
    }
 
    //只会抛出异常没有返回值
    function Never():never {
    throw new Error('aaa')
    }
```

差异2  当我们鼠标移上去的时候会发现 只有void和number  never在联合类型中会被直接移除

```ts
type A = void | number | never
```

### never 类型的一个应用场景

举一个我们可能会见到的例子

```ts
type A = '小满' | '大满' | '超大满' 
 
function isXiaoMan(value:A) {
   switch (value) {
       case "小满":
           break 
       case "大满":
          break 
       case "超大满":
          break 
       default:
          //是用于场景兜底逻辑
          const error:never = value;
          return error
   }
}
```

比如新来了一个同事他新增了一个篮球，我们必须手动找到所有 switch 代码并处理，否则将有可能引入 BUG 。

而且这将是一个“隐蔽型”的BUG，如果回归面不够广，很难发现此类BUG。

那 TS 有没有办法帮助我们在类型检查阶段发现这个问题呢？

```TypeScript
type A = '小满' | '大满' | '超大满' | "小小满"
 
function isXiaoMan(value:A) {
   switch (value) {
       case "小满":
           break 
       case "大满":
          break 
       case "超大满":
          break 
       default:
          //是用于场景兜底逻辑
          const error:never = value;
          return error
   }
}
```

由于任何类型都不能赋值给 `never` 类型的变量，所以当存在进入 `default` 分支的可能性时，TS的类型检查会及时帮我们发现这个问题

## symbol类型

自ECMAScript 2015起，`symbol`成为了一种新的原生类型，就像`number`和`string`一样。

`symbol`类型的值是通过`Symbol`构造函数创建的。

可以传递参做为唯一标识 只支持 string 和 [number类型](https://so.csdn.net/so/search?q=number类型&spm=1001.2101.3001.7020)的参数

```ts
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```

### **Symbol的值是唯一的**

```ts
const s1 = Symbol()
const s2 = Symbol()
// s1 === s2 =>false
// for Symbol for全局symbol有没有注册过这个key，如果有直接拿来用，没有的话她就会去创建一个
console.log(Symbol.for('xie') === Symbol.for('xie')) // true
```

### 用作对象属性的键

解决属性重复的key，仿重

```ts
let sym = Symbol();
 
let obj = {
    [sym]: "value"
};
 
console.log(obj[sym]); // "value"
```

### 使用symbol定义的属性，是不能通过如下方式遍历拿到的

```TypeScript
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```

如何拿到

```ts
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个，但拿不到其他属性，如age
Object. (obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```

### Symbol.iterator 迭代器 和 生成器 for of

支持遍历大部分类型迭代器 arr nodeList argumetns set map 等

```ts
var arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();
 
// 一个一个来，最后没有了done就会返回true
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
```

测试用例

```ts
interface Item {
    age: number,
    name: string
}

const array: Array<Item> = [{ age: 123, name: "1" }, { age: 123, name: "2" }, { age: 123, name: "3" }]

type mapTypes = string | number
const map:Map<mapTypes,mapTypes> = new Map()

map.set('1','王爷')
map.set('2','陆北')

const obj = {
    aaa:123,
    bbb:456
}

let set:Set<number> = new Set([1,2,3,4,5,6])
// let it:Iterator<Item> = array[Symbol.iterator]()
const gen = (erg:any): void => {
    let it: Iterator<any> = erg[Symbol.iterator]()
    let next:any= { done: false }
    while (!next.done) {
        next =  it.next()
        if (!next.done) {
            console.log(next.value)
        }
    }
}
gen(array)
```

我们平时开发中不会手动调用iterator 应为 他是有语法糖的就是**for of**  记住 for of 是不能循环对象的，因为对象没有 iterator  

```ts
for (let value of map) {
    console.log(value)
}
```

数组解构的原理其实也是调用迭代器的

```ts
var [a,b,c] = [1,2,3]

var x = [...xxxx]
```

 那我们可以自己实现一个迭代器让对象支持for of

```ts
const obj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
        return {
            max: this.max,
            current: this.current,
            next() {
                if (this.current == this.max) {
                    return {
                        value: undefined,
                        done: true
                    }
                } else {
                    return {
                        value: this.current++,
                        done: false
                    }
                }
            }
        }
    }
}
console.log([...obj])

for (let val of obj) {
   console.log(val);

}
```

### 以下为这些symbols的列表

- Symbol.hasInstance

方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

- Symbol.isConcatSpreadable

布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

- Symbol.iterator

方法，被for-of语句调用。返回对象的默认迭代器。

- Symbol.match

方法，被String.prototype.match调用。正则表达式用来匹配字符串。

- Symbol.replace

方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

- Symbol.search

方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

- Symbol.species

函数值，为一个构造函数。用来创建派生对象。

- Symbol.split

方法，被String.prototype.split调用。正则表达式来用分割字符串。

- Symbol.toPrimitive

方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

- Symbol.toStringTag

方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

- Symbol.unscopables

对象，它自己拥有的属性会被with作用域排除在外。

## 泛型

[泛型](https://so.csdn.net/so/search?q=泛型&spm=1001.2101.3001.7020)在TypeScript 是很重要的东西 例如vue3 是用ts编写的 里面用到了非常多的泛型

### 函数泛型

我写了两个函数一个是数字类型的函数，另一个是字符串类型的函数,其实就是类型不同，

实现的功能是一样的，这时候我们就可以使用泛型来优化

```ts
function num (a:number,b:number) : Array<number> {
    return [a ,b];
}
num(1,2)
function str (a:string,b:string) : Array<string> {
    return [a ,b];
}
str('独孤','求败')
```

**泛型优化**

语法为函数名字后面跟一个<参数名> 参数名可以随便写 例如我这儿写了T

当我们使用这个函数的时候把参数的类型传进去就可以了 （也就是动态类型）

```ts
function Add<T>(a: T, b: T): Array<T>  {
    return [a,b]
}
 
Add<number>(1,2)
Add<string>('1','2')
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以

```ts
function Sub<T,U>(a:T,b:U):Array<T|U> {
    const params:Array<T|U> = [a,b]
    return params
}
 
 
Sub<Boolean,number>(false,1)
```

### 定义泛型接口

声明接口的时候 在名字后面加一个<参数>

使用的时候传递类型

```ts
interface MyInter<T> {
   (arg: T): T
}
 
function fn<T>(arg: T): T {
   return arg
}
 
let result: MyInter<number> = fn
 
result(123)
```

### 对象字面量泛型

```ts
let foo: { <T>(arg: T): T }
 
foo = function <T>(arg:T):T {
   return arg
}
 
foo(123)
```

![img](https://img-blog.csdnimg.cn/7457446b9f3e48728ef7d97c585f1403.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16)

这时候我们就可以使用泛型约束

于是，我们就得对使用的泛型进行约束，我们约束其为具有`length`属性的类型，这里我们会用到`interface`,代码如下

```ts
interface Len {
   length:number
}
 
function getLegnth<T extends Len>(arg:T) {
  return arg.length
}
 
getLegnth<string>('123')
```

### 使用keyof 约束对象

其中使用了TS泛型和泛型约束。首先定义了T类型并使用extends关键字继承object类型的子类型，然后使用keyof操作符获取T类型的所有键，它的返回 类型是联合 类型，最后利用extends关键字约束 K类型必须为keyof T联合类型的子类型

```ts
function prop<T, K extends keyof T>(obj: T, key: K) {
   return obj[key]
}
 
 
let o = { a: 1, b: 2, c: 3 }
 
prop(o, 'a') 
prop(o, 'd') //此时就会报错发现找不到
```

### 泛型类

声明方法跟函数类似名称后面定义<类型>

使用的时候确定类型new Sub<number>()

```ts
class Sub<T>{
   attr: T[] = [];
   add (a:T):T[] {
      return [a]
   }
}
 
let s = new Sub<number>()
s.attr = [1,2,3]
s.add(123)
 
let str = new Sub<string>()
str.attr = ['1','2','3']
str.add('123')
```

## tsconfig.json配置文件

### 生成tsconfig.json 文件

这个文件是通过`tsc --init`命令生成的

配置详解

```ts
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

 介绍几个常用的

### 1.include

指定编译文件默认是编译当前目录下所有的ts文件

### 2.exclude

指定排除的文件

### 3.target

指定编译js 的版本例如es5  es6

### 4.allowJS

是否允许编译js文件

### 5.removeComments

是否在编译过程中删除文件中的注释

### 6.rootDir

编译文件的目录

### 7.outDir

输出的目录

### 8.sourceMap

代码源文件

### 9.strict

严格模式

### 10.module

默认common.js  可选es6模式 amd  umd 等

## namespace命名空间

我们在工作中无法避免全局变量造成的污染，[TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020)提供了namespace 避免这个问题出现

- 内部模块，主要用于组织代码，避免命名冲突。
- 命名空间内的类默认私有
- 通过 `export` 暴露
- 通过 `namespace` 关键字定义

> TypeScript与ECMAScript 2015一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

命名空间中通过`export`将想要暴露的部分导出

如果不用export 导出是无法读取其值的

```ts
namespace a {
    export const Time: number = 1000
    export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
 
namespace b {
     export const Time: number = 1000
     export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
a.Time
b.Time
```

嵌套命名空间

```ts
namespace a {
    export namespace b {
        export class Vue {
            parameters: string
            constructor(parameters: string) {
                this.parameters = parameters
            }
        }
    }
}
 
let v = a.b.Vue
 
new v('1')
```

抽离命名空间

a.ts

```ts
export namespace V {
    export const a = 1
}
```

b.ts

```ts
import {V} from '../observer/index'

console.log(V);
```

 //{a:1}

简化命名空间

```ts
namespace A  {
    export namespace B {
        export const C = 1
    }
}

import X = A.B.C

console.log(X);
```

合并命名空间

重名的命名空间会合并


![img](https://img-blog.csdnimg.cn/bf816965597949c69329ad5f17e0efd5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

## 三斜线指令

三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

`/// <reference path="..." />`指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。

三斜线引用告诉编译器在编译过程中要引入的额外的文件。

你也可以把它理解能import，它可以告诉编译器在编译过程中要引入的额外的文件
例如a.ts

```ts
namespace A {
    export const fn = () => 'a'
}
```

b.ts

```ts
namespace A {
    export const fn2 = () => 'b'
}
```

index.ts

引入之后直接可以使用变量A

```ts
///<reference path="./index2.ts" />
///<reference path="./index3.ts" />

console.log(A);
```


声明文件引入

例如，把` /// <reference types="node" />`引入到声明文件，表明这个文件使用了 `@types/node/index.d.ts`里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。

仅当在你需要写一个d.ts文件时才使用这个指令。

```ts
///<reference types="node" />
```

注意事项：

如果你在配置文件 配置了noResolve 或者自身调用自身文件会报错

![img](https://img-blog.csdnimg.cn/d5f623bd195e4d6c8104b151a0dd2e09.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

## 声明文件d.ts

### 声明文件 declare 

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

```ts
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
/// <reference /> 三斜线指令
```

例如我们有一个express 和 axios

![img](https://img-blog.csdnimg.cn/4846847abe1f4359b777584e7a237c72.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

 发现express 报错了

让我们去下载他的声明文件

npm install @types/node -D

那为什么axios 没有报错

我们可以去node_modules 下面去找axios 的package json

![img](https://img-blog.csdnimg.cn/56e5d930f9144c3aaf50faf638906976.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

 发现axios已经指定了声明文件 所以没有报错可以直接用

通过语法declare 暴露我们声明的axios 对象

declare  const axios: AxiosStatic;

如果有一些第三方包确实没有声明文件我们可以自己去定义

名称.d.ts 创建一个文件去声明

### 案例手写声明文件

**index.ts**

```ts
import express from 'express'
 
 
const app = express()
 
const router = express.Router()
 
app.use('/api', router)
 
router.get('/list', (req, res) => {
    res.json({
        code: 200
    })
})
 
app.listen(9001,()=>{
    console.log(9001)
})
```

**express.d.ts**

```ts
declare module 'express' {
    interface Router {
        get(path: string, cb: (req: any, res: any) => void): void
    }
    interface App {
 
        use(path: string, router: any): void
        listen(port: number, cb?: () => void): void
    }
    interface Express {
        (): App
        Router(): Router
 
    }
    const express: Express
    export default express
}
```

## Mixins混入

[TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 混入 Mixins 其实vue也有mixins这个东西 你可以把他看作为合并

### 1.对象混入

可以使用es6的Object.assign 合并多个对象

此时 people 会被推断成一个交差类型 Name & Age & sex;

```ts
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}
 
let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }
 
const people = Object.assign(people1,people2,people3)
```

### 2.类的混入

首先声明两个[mixins](https://so.csdn.net/so/search?q=mixins&spm=1001.2101.3001.7020)类 （严格模式要关闭不然编译不过）

```ts
class A {
    type: boolean = false;
    changeType() {
        this.type = !this.type
    }
}
 
 
class B {
    name: string = '张三';
    getName(): string {
        return this.name;
    }
}
```

下面创建一个类，结合了这两个mixins

首先应该注意到的是，没使用extends而是使用implements。 把类当成了接口

我们可以这么做来达到目的，为将要mixin进来的属性方法创建出占位属性。 这告诉编译器这些成员在运行时是可用的。 这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性

```ts
class C implements A,B{
    type:boolean
    changeType:()=>void;
    name: string;
    getName:()=> string
}
```

最后，创建这个帮助函数，帮我们做混入操作。 它会遍历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码

Object.getOwnPropertyNames()可以获取对象自身的属性，除去他继承来的属性，
对它所有的属性遍历，它是一个数组，遍历一下它所有的属性名

```ts
Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
        Object.getOwnPropertyNames(item.prototype).forEach(name => {
            curCls.prototype[name] = item.prototype[name]
        })
    })
}
```

## 装饰器Decorator

它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能

若要启用实验性的装饰器特性，你必须在命令行或`tsconfig.json`里启用编译器选项

![img](https://img-blog.csdnimg.cn/60df9a1067bf4dbd89d5a19897367f27.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

### 装饰器

*装饰器*是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。

首先定义一个类

```ts
class A {
    constructor() {
 
    }
}
```

定义一个类装饰器函数 他会把ClassA的构造函数传入你的watcher函数当做第一个参数

```ts
const watcher: ClassDecorator = (target: Function) => {
    target.prototype.getParams = <T>(params: T):T => {
        return params
    }
}
```

使用的时候 直接通过@函数名使用

```ts
@watcher
class A {
    constructor() {
 
    }
}
```

验证

```ts
const a = new A();
console.log((a as any).getParams('123'));
```

### 装饰器工厂

其实也就是一个[高阶函数](https://so.csdn.net/so/search?q=高阶函数&spm=1001.2101.3001.7020) 外层的函数接受值 里层的函数最终接受类的构造函数

```ts
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
 
@watcher('name')
class A {
    constructor() {
 
    }
}
 
const a = new A();
console.log((a as any).getParams('123'));
```

### 装饰器组合

就是可以使用多个装饰器

```ts
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
const watcher2 = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getNames = ():string => {
            return name
        }
    }
}
 
@watcher2('name2')
@watcher('name')
class A {
    constructor() {
 
    }
}
 
 
const a = new A();
console.log((a as any).getOptions());
console.log((a as any).getNames());
```

### 方法装饰器

返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

```ts
[
  {},
  'setParasm',
  {
    value: [Function: setParasm],
    writable: true,
    enumerable: false,
    configurable: true
  }
]
```

```ts
const met:MethodDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    @met
    getName ():string {
        return '小满'
    }
}
 
 
const a = new A();
```

### 属性装饰器

返回两个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 属性的名字。

[ {}, 'name', undefined ]

```ts
const met:PropertyDecorator = (...args) => {
    console.log(args);
}
 
class A {
    @met
    name:string
    constructor() {
 
    }
   
}
 
 
const a = new A();
```

### 参数装饰器

返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

[ {}, 'setParasm', 0 ]

```ts
const met:ParameterDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    setParasm (@met name:string = '213') {
 
    }
}
 
 
const a = new A();
```

元数据存储

```ts
import 'reflect-metadata'
```

可以快速存储元数据然后在用到的地方取出来 defineMetadata getMetadata

```ts
//1.类装饰器 ClassDecorator 
//2.属性装饰器 PropertyDecorator
//3.参数装饰器 ParameterDecorator
//4.方法装饰器 MethodDecorator PropertyDescriptor 'https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10'
//5.装饰器工厂
import axios from 'axios'
import 'reflect-metadata'
const Base  = (base:string) => {
    const fn:ClassDecorator = (target) => {
        target.prototype.base = base;
    }
    return fn
} 
 
const Get = (url:string) => {
   const fn:MethodDecorator = (target:any,key,descriptor:PropertyDescriptor) => {
        axios.get(url).then(res=>{
            const key = Reflect.getMetadata('key',target)
            descriptor.value(key ? res.data[key] : res.data)
        })
        
   }
   return fn
}
 
const result = () => {
    const fn:ParameterDecorator = (target:any,key,index) => {
        Reflect.defineMetadata('key','result',target)
    }
    return fn
}
 
const Bt:PropertyDecorator = (target,key) => {
   console.log(target,key)
}
 
@Base('/api')
class Http {
    @Bt
    xiaoman:string
    constructor () {
        this.xiaoman = 'xiaoman'
    }
    @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
    getList (@result() data:any) {
        // console.log(data)
         
    }
    // @Post('/aaaa')
    create () {
 
    }
}
 
const http = new Http() as any
 
// console.log(http.base)
```

