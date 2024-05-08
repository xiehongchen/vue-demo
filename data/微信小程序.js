# 微信小程序

 一个微信小程序包括项目级别文件、页面级别文件。

项目级别的的文件包括 app.js、app.json、app.wxss，页面级别可以包含很多个页面，如index，detail等页面，每个页面都包含.js，.json，.wxml，.wxss这些文件。

其中.wxml为页面视图文件，是自定义标签的HTML页面。app.js是小程序的脚本代码。app.json 是对整个小程序的全局配置。app.wxss 是整个小程序的公共样式表。

## 1.style和class设置字体样式

view组件支持使用style和class属性来设置组件的样式，静态的样式一般写到class中，动态的样式一般写到style中，这样可以提高渲染速度。

```html
<view class="box"></view>
```

静态样式==class

动态样式==style

## 2.在index.wxss和app.wxss定义样式类的方法

在app.wxss中定义的样式属于全局样式，可以在项目的任何文件中使用

在index.wxss中定义的样式一般只能在index.wxml中使用

```css
.box{/*外边框*/
  border: 1px solid silver;/*边框颜色*/
  margin: 20rpx;/*边框大小*/
  padding: 20rpx;/*内边框大小*/
}

.title{/*内容*/
  font-size: 25px;/*内容大小*/
  text-align: center;/*内容位置*/
  margin-bottom: 15px;/*距离上边框的距离*/
  color: red;/*内容颜色*/
}
```

app.wxss==全局样式

index.wxss==只能在index.wxml

 

### 字体样式属性命名及其含义：

font-family->字体类型

font-size->字体大小

font-style->字体倾斜

font-weight->字体加粗

 

### 文本属性命名及其含义：

color->字体颜色

text-align->文本的对齐方式

text-indent->首行缩进

letter-spacin->字母之间的距离

word-spacing->单词间距，以空格来区分单词

white-space->文档中的空白处

text-decoration->文本修饰样式

text-decoration-color->文本修饰颜色

letter-spacing->指定字母集群之间的最小、最大和最佳间距

line-height->确定内联框的文本内容区域的块级维数

 

### 边框样式：

border-style属性用来定义边框的样式

none->默认无边框

dotted->定义一个点线边框

dashed->定义一个虚线边框

solid->定义实线边框

double->定义两个边框

groove->定义3D沟槽边框。效果取决于边框的颜色值

rigde->定义3D脊边框。效果取决于边框的颜色值

inset->定义3D的嵌入边框。效果取决于边框的颜色值

outset->定义3D的突出边框。效果取决于边框的颜色值

border-width->用于设置边框宽度

border-color->用于设置边框的颜色

border-top、border-right、border-bottom、border-left->设置不同的侧面具有不同的边框

border->可以利用border属性一场性设置边框宽度、边框样式和边框颜色。如border：3px dashed#00ff00

## 3.image组件

支持JPG、PNG、SVG格式，用src属性指定图片的路径。

## 4.使用音频

首先要利益API函数wx.creatalnnerAudioContex()创建音频上下文，然后设置上下文的src，并利用play()函数播放音频

```javascript
index.wxml:
<image src='{{imgSrc}}' bindtap="tapCat"></image>//image组件用法
index.js:
Page({
  data: {
    imgSrc:'/images/kitty.png',//图片所在位置
 },
tapCat:function(){
    let audio = wx.createInnerAudioContext();//调用函数
    audio.src = '/audios/Anthem Lights - Best of 2012： Payphone／Call Me Maybe／Wide Awake／Starship／We Are Young.mp3';//音频所在位置
    audio.play();//开始
  },
```

## 5.数据绑定

WXML文件中的动态数据通过{{}}符号与JS文件中的数据进行绑定，这样JS中的数据就可以传给WXML文件。这种传递时单向的。

### 事件绑定

在WXML文件组件标签内利用“bind...=函数名”绑定组件事件与函数，并在JS文件中定义该事件函数。

## 6.盒模型

所有的WXML元素都可以看作盒子，在WXSS中。“box model”这一术语时用来设计和布局时使用。盒模型本质上时一个盒子，封装周围的WXML元素，它包括：边距，边框，填充和实际内容，模型结构如下。

![image-20211112134232178](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20211112134232178.png)

## 7.Flex弹性盒模型

Flex是Flexible Box的缩写，意为“弹性布局”，用来对盒状模型进行布局。如图所示。

![image-20211112134252177](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20211112134252177.png)

```html
<view class="box">
  <view class="title">页面布局示例</view>
  <!--实现三栏水平均匀布局-->
  <view style="display:flex; text-align:center; line-height:80rpx;">/*行高相同*/
    <view style="background-color:red; flex-grow:1;">1</view>/*flex-grow是表明平均分配，且分得一块*/
    <view style="background-color:green; flex-grow:1;">2</view>
    <view style="background-color:blue; flex-grow:1;">3</view>
  </view>
  ---------------------------------
  <!--实现左右混合布局-->
  <view style="display:flex; height:300rpx; text-align:center;">/*水平方向居中*/
    <view style="background-color:red; width:250rpx; line-height:300rpx">1</view>
    <view style="display:flex; flex-direction:column; flex-grow:1; line-height:150rpx">
      <view style="background-color:green; flex-grow:1;">2</view>
      <view style="background-color:blue; flex-grow:1;">3</view>
    </view>
  </view>
  ----------------------------------------
  <!--实现上下混合布局-->
  <view style="display:flex; flex-direction:column; line-height:300rpx; text-align:center;">
    <view style="background-color:red; height:100rpx; line-height:100rpx;">1</view>
    <view style="flex-grow:1; display:flex; flex-direction:row;">
      <view style="background-color:green; flex-grow:1;">2</view>
      <view style="background-color:blue; flex-grow:1;">3</view>
    </view>
  </view>
</view>
```

#### **Flex项目布局：**

order->项目的排序顺序。数值越小，排列越靠前，默认为0

flex-grow->各项目宽度之和小于容器宽度时，各项目分配容器剩余宽度的放大比例，默认为0，即不放大

flex-shrink->各项目宽度之和大于容器宽度时，各项目缩小自己宽度的比例，默认为1，即该项目将缩小

flex-basis->元素宽度的属性，与width功能相同，但比width的优先级高

flex->时flex-grow和flex-basis的简写，默认值为0 1 auto。后两个属性可选

align-self->允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

## 8.navigator组件和icon组件

navigator组件能实现页面导航

icon组件显示一个图标

```html
<view class="box">
  <view class="title">框架案例</view>
  <navigator url="HelloWechat/index">
    <view class="waikuang">
      <icon type="success" class="myleft"></icon>//显示一个图标
      <view class="mycenter">HelloWechat</view>//文字内容
      <image src="/images/right-arrow.png" class="myright"></image>//显示图片
    </view>
  </navigator>//实现页面导航
```

### navigator组件属性：

target->在哪个目标上发生跳转，其合法值为self和miniProgram，默认值为self

url->当前小程序内的跳转地址

open-type->跳转方式

delta->当open-type为‘navigateBack’时有效，表示回退的层数

app-id->当target=“miniProgram”时有效，要打开的小程序appId

path->当target=“miniProgram”时有效，打开的页面路径，如果为空则打开首页

 

### **open-type的合法值：**

navigate->保留当前页面，跳转到应用内的某个页面

redireat->关闭当前页面，跳转到应用内的某个页面

switchTab->跳转到taBar页面，并关闭其他所有非taBar页面

reLaunch->关闭当前页面，打开应用内的某个页面

navigateBack->关闭当前页面，返回上一页面或多级页面

exit->退出小程序，target=“miniProgram”时有效

 

### **Icon图标组件的主要属性：**

type->icon的类型，有效值:success,

success_no_circle,info,warn,waiting,cancel,

download,search,clear

size->icon的大小

color->icon的颜色

## 9.float属性

浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止

 

### **Float属性的合法值：**

left->元素向右浮动

right->元素向左浮动

none->默认值。元素不浮动，并会显示其在文本中出现的位置

inherit->规定应该从父类继承float属性的值

****

**clear属性。清除浮动**



### **clear属性的合法值：**

left->在左侧不允许有浮动元素

right->在右侧不允许有浮动元素

both->在左右两侧均不允许有浮动元素

none->默认值。允许浮动元素出现在左右两侧

inherit->继承父元素clear属性的值

## 10.顺序结构程序设计方法

是指按照解决问题的顺序写出相应的语句，它的执行顺序是自上而下，依次执行。

**数字运算的基本方法**

利用JavaScript运算符和函数等将数学表达式转换成JavaScript表达式。

```html
index.wxml:<view class="box">
  <view class="title">摄氏温度转华氏温度</view>
  <view>
    <input placeholder="请输入摄氏温度" type="digit" bindblur="calc"></input>
  </view>//可以输入数据
  <view>华氏温度为：{{F}}</view>//调用F函数，得到结果
</view>

index.js:Page({
  calc : function(e) {//事件处理函数
    var C, F;//定义变量
    C = e.detail.value;//获取input组件中输入的数组（value）
    this.setData ({
      F : C * 9 / 5 + 32//求出华氏温度F并渲染到视图层
    })
  }
})
index.wxss:.input{
  margin: 20px 0;/*设置input组件上下边距为20px，左右边距为0*/
  border-bottom: 1px solid blue;/*设置input组件边框粗细为1px、实心、蓝色*/
}
```

input输入框组件。用于输入数据

**input组件的属性：**

value->输入框中的内容

type->input的类型

password->是否是密码类型

placeholder->输入框为空时占位符

placeholder-style->指定placeholder的样式

maxlength->最大输入长度，设置为-1的时候不限制最大长度

bindinput->键盘输入时触发

bindfocus->输入框聚焦时触发

bindblur->输入框失去焦点时触发

 

type属性。是指真机运行时键盘的类型

**type属性的合法值：**

text->文本输入键盘

number->数字输入键盘

idcard->身份证输入键盘

digit->带小数点的数字键盘

##  11.JavaScript中的逻辑运算符

用于测定变量或值之间的逻辑关系。

**JavaScript中的循环**

如果希望一遍又一遍地运行相同地代码，并且没错地值都不同，那么使用循环时很方便地。JavaScript支持地循环类型包括：

for：多次遍历代码块

for/in：遍历对象属性

while：当指定条件为true时循环一段代码块

do/while：当指定条件为true时循环一段代码块

## 12.button按钮语句

```html
index。wxml：<view class="box">
  <view class="title">成绩计算器</view>
<!-- 输入你的数据 -->
  <input placeholder="请输入你的名字" placeholder-class="placeholder" bindinput="nameInput"></input>
  <input placeholder="请输入语文成绩" placeholder-class="placeholder" bindinput="chineseInput" type="number"></input>
  <input placeholder="请输入数学成绩" placeholder-class="placeholder" bindinput="mathInput" type="number"></input>
<!-- 设置一个有提交的按钮 -->
  <button bindtap="mysubmit">提交</button>
<!-- 显示你的数据 -->
  <view hidden="{{flag}}" class="content">
    <view class="content-item">姓名：{{name}}</view>
    <view class="content-item">语文成绩：{{chinese_score}}</view>
    <view class="content-item">数学成绩：{{math_score}}</view>
    <view class="content-item">平均分：{{average}}</view>
  </view>
</view>

index.wxss：page{
  background: #f1f0f6;
}

.placeholder{
  font-size: 15px;
}
input{
  background: #fff;
  height: 120rpx;
  margin: 10px;
  padding-left: 8px;
  border: solid 1px silver;
}
button{
  margin: 30rpx 50rpx;
  background-color: red;
  color: white;
}
.content{
  background: #fff;
  padding: 10px;
  color: #f00;
}
.content-item{
  padding: 3rpx;
  font-size: 16px;
  line-height: 30px;
}
index。js：Page({
  data:{
    flag : true,
    name: '',
    chinese_score: '',
    math_score: '',
    average: ''
  },
nameInput: function(e) {
  this.setData({
    name: e.detail.value
  });
},
chineseInput:function(e){
  this.setData({
    chinese_score:e.detail.value
  });
},

mathInput:function(e){
  this.setData({
    math_score:e.detail.value
  });
},
mysubmit:function(){
  if(this.data.name == ''|| this.data.chinese_score == ''|| this.math_score == ''){
    return;
  }else{
    var avg = (this.data.chinese_score * 1 + this.data.math_score *1) /2;
    this.setData({
      flag :false,
      average : avg,
    });
  }
}
})
```

**Math对象：用于执行数学任务，它的常用数学和函数如下：**

E->返回算术常量e，即自然对数的底数（约等于2.718）

PI->返回圆周率（约等于3.14159）

abs（x）->返回数的绝对值

ceil（x）->对数进行上舍入

cos（x）->返回数的余弦

exp（x）->返回e的指数

floor（x）->对数进行下舍入

log（x）->返回数的自然对数（底为e）

max（x，y）->返回x和y中的最高值

min（x，y）->返回x和y中的最低值

pow（x，y）->返回x的y次幂

random（）->返回0~1之间的随机数

round（x）->把数四舍五入为最接近的整数

sin（x）->返回数的正弦

sqrt（x）->返回数的平方根

tan（x）->返回角的正切

valueOf（）->返回Math对象的原始值

 

**button组件-常用属性：**

size->按钮的大小

type->按钮类型

plain->按钮是否镂空，背景色是否透明

disabled->是否禁用

loading->是否带loading图标

form-type->用于<form>组件的提交或重置

 

**button属性合法值：**

size->合法值->default->默认大小

size->合法值->mini->小尺寸

type->合法值->primary->绿色

type->合法值->default->白色

type->合法值->warn->红色

form-type->合法值->submit->提交表单

form-type->合法值->reset->重置表单

## 13.全局变量的定义和使用

在所有很函数之外定义的变量成为全局变量，该变量可以在该文件的所有函数中使用

 

**JavaScript全局对象：可用于所有内建地JavaScript对象，其常用属性和方法如下：**

Infinity->代表正地无穷大地数值

NaN->指示某个值是不是数字值

undefined->指示未定义的值

isFinite（）->检查某个值是否是有穷大的数

isNaN（）->检查某个值是否是数字

Number（）->把对象的值转换为数字

parseFloat（）->解析一个字符串并返回一个浮点数

parseInt（）->解析一个字符串并返回一个整数

String（）->把对象的值转化为字符串

## 14.显示随机数

```html
<!--index.wxml-->
<view class="box">
  <view class="title">随机数求和</view>
  <view>产生的随机数列为：</view>
  <view wx:for="{{rand}}">{{item}}</view>
  <view>随机数列的和为：{{sum}}</view>
  <button type="warn" bindtap="newRand">产生新的随机数</button>
</view>

//index.js
var rand, sum;//定义全局变量

function createRand(){//产生随机数函数
  rand = [];//初始化数组变量
  sum = 0;//初始化sum变量
  for(var i = 0; i < 6; i++){
    var r = (Math.random()*100).toFixed(2)*1;//产生100以内的随机数,并保留两位小数
    rand.push(r);//将产生的随机数添加到数组中
    sum += rand[i];//随机数求和
    console.log(rand[i]);//在控制台显示数组元素
  }
  console.log(sum);
};
Page({
  onLoad: function(){
    createRand();//调用产生随机数函数
    this.setData({
      rand: rand,
      sum: sum
    })
  },
  newRand: function(){
    createRand();//调用产生随机数函数
    this.setData({
      rand: rand,
      sum: sum
    })
  }
})

```

**Array对象：用于在单个的变量存储多个值，其常用属性和方法如下：**

length->设置或返回数组中元素的个数

concat（）->连接两个或更多的数组，并返回结果

join（）->把数组的所有元素放入一个字符串，元素通过指定的分隔符进行分隔

pop（）->删除并返回数组的最后一个元素

push（）->向数组的末尾添加一个或多个元素，并返回新的长度

reverse（）->使数组中的元素反序

shift（）->删除并返回数组的第一个元素

slice（）->从某个已有的主张返回选定的元素

sort（）->对数组的元素进行排序

splice（）->删除元素，并向数组添加新元素

toSource（）->返回该对象的源代码

toString（）->把数组转化为字符串，并返回结果

toLocaleString（）->把数组转化为本地数组，并返回结果

unshift（）->向数组的开通添加一个或多个元素，并返回新的长度

valueOf（）->返回数组对象的原始值

## 15.对象的概念：

对象是拥有属性和方法的数据，属性是静态数据，方法是能够在对象上执行的动作，即动态数据。

JavaScript中的常用对象包括：字符串，数字，数组，日期等等

## 16.JavaScript函数

**1.setTimeout（）**

函数number setTimeout(function callback, number delay, any rest)。设定一个计时器， 在计时到期以后执行注册的回调函数。

**2.setInterval（）**

函数number setInterval(function callback, number delay, any rest)。设定一个计时器，按照指定的周期（以 毫秒计）来执行注册的回调函数

**3.clearTimeout（）**

函数clearTimeout(number timeoutID)。取消由 setTimeout 设置的计时器。参数 timeoutID为 要取消的计时器的 ID。

**4.clearInterval（）**

函数clearInterval(number intervalID)。取消 由 setInterval 设置的计时器。参数 intervalID为要取消的计时器的ID

 

**Number对象：该对象是原始数值的包装对象，其常用属性和方法如下：**

MAX_VALUE->可表示的最大的数

MIN_VALUE->可表示的最小的数

NaN->非数字值

NEGATIVE_INFINITY->负无穷大，溢出时返回该值

POSITIVE_INFINITY->正无穷大，溢出时返回该值

toString（）->把数字转换为字符串，使用指定的基数

toLocaleString（）->把数字转化为字符串，使用本地数字格式顺序

toFixed（）->把数字转化为字符串，结果的小数点后指定位数的数字

toExponential（）->把对象的值转化为指数计数法

toPrecision（）->把数字格式化为指定的长度

valueOf（）->返回一个Number对象的基本数字值

## 17.自动变色

从构成颜色的16个16进制 字符（0～F）中随机随机找出6个字符构成一种颜色， 连续找3次就可以生成3种随机颜色。

```html
<!--index.wxml-->
<view class="box">
  <view class="title">变化的三色旗</view>
  <view class="flex-wrp">
    <view class="item" style="background-color:{{color1}}"></view>
    <view class="item" style="background-color:{{color2}}"></view>
    <view class="item" style="background-color:{{color3}}"></view>
  </view>
  <button type="primary" class="btn" bindtap="changeColor">改变颜色</button>
</view>
index。wxss：
.flex-wrp{
  margin-top: 50rpx;
  display: flex;
  flex-direction: row;
}
.item{
  width: 300rpx;
  height: 500rpx;
}
.btn{
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
//index.js
Page({
  creareColor: function() {//自定义函数，创建三种随机颜色
    var color = [];//定义数组
    var letters = '0123456789ABCDEF';//定义16进制颜色字符集
    for(var i = 0; i < 3; i++){//利用循环创建三种随机颜色
      var c = '#';
      for( var j = 0; j < 6; j++){//创建一种由6个16进制字符构成的随机颜色
        c += letters[Math.floor(Math.random() * 16)]
      }
      color.push(c);//将创建的颜色键入颜色数组
    }
   console.log(color);//在console面板中显示颜色值
   this.setData({//将创建的颜色渲染到视图层
    color1: color[0],
    color2: color[1],
    color3: color[2]
  })
},
onLoad: function(e){
  this.creareColor();//利用this调用本定义的函数
  setInterval(() => {
    this.creareColor();//每隔5秒钟调用一次this.creareColor()函数
  },5000);
},
changeColor: function(e){//点击按钮时的事件函数
  this.creareColor();
}
})

```

## 18.小程序基本构架

利用app.json 文件对小程序进行全局配置

利用同名 .json 文件对本页面窗口表现进行配置

```html
app.json：
{
  "pages": [
    "pages/index/index",
    "pages/jiaoxue/jiaoxue",
    "pages/keyan/keyan",
    "pages/zixun/zixun",
    "pages/guanyu/guanyu"
  ],
  "window": {
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "广东工业大学欢迎您",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#000",
    "selectedColor": "#00f",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "/images/home-off.png",
        "selectedIconPath": "/images/home-on.png"
      },
      {
        "pagePath": "pages/jiaoxue/jiaoxue",
        "text": "教学",
        "iconPath": "/images/jiaoxue-off.png",
        "selectedIconPath": "/images/jiaoxue-on.png"
      },
      {
        "pagePath": "pages/keyan/keyan",
        "text": "科研",
        "iconPath": "/images/keyan-off.png",
        "selectedIconPath": "/images/keyan-on.png"
      },
      {
        "pagePath": "pages/zixun/zixun",
        "text": "咨询",
        "iconPath": "/images/zixun-off.png",
        "selectedIconPath": "/images/zixun-on.png"
      },
      {
        "pagePath": "pages/guanyu/guanyu",
        "text": "关于我们",
        "iconPath": "/images/guanyu-off.png",
        "selectedIconPath": "/images/guanyu-on.png"
      }
    ]
  }
}

```

**全局配置：app.json文件属性：**

pages->类型->string[]->是必填->页面路径列表

window->类型->Object->不是必填->全局默认窗口表现

tabBar->类型->Object->不是必填->底部tab栏的表现

networkTimeout->类型->Object->不是必填->网络超时时间

debug->类型->boolean->不是必填->是否开启debug模式，默认关闭

permission->类型->Object->不是必填->小程序接口权限相关设置

 

**Window配置：**

navigationBarBackgroundColor->类型->HexColor->导航栏背景颜色，如#000000

navigationBarTextStyle->string->导航栏标题颜色，仅支持black/white

navigationBarTitleText->类型->string->导航栏标题文字内容

backgroundColor->类型->HexColor->窗口的背景色

backgroundTextStyle->类型->string->下拉loading的样式，仅支持dark/light

pageOrientation->类型->string->屏幕旋转设置，支持auto/portrait/landscape

 

**tabBar配置：**

color->类型->Hexcolor->tab上的文字的默认颜色

selectedColor->类型->HexColor->tab上选中文字的颜色

backgroundColor->类型->HexColor->tab的背景色

borderStyle->类型->string->tabBar上边框的颜色，仅支持black/white

list->类型->Array->tab列表，最少2个，最多5个tab

position->类型->string->tabBar的位置，仅支持bottom/top

 

**list配置：**

pagePath->类型->string->是必填->页面路径，必须在pages中先定义

text->类型->string->是必填->tab上按钮文字

iconPath->类型->string->不是必填->图片路径，icon大小限制为40kb，建议尺寸为81px*81px，不支持网络图片

selectedIconPath->类型->string->不是必填->选中时的图片路径

 

**函数App（Object object）参数属性：**

onLaunch->类型->function->生命周期回调函数—监听小程序初始化

onShow->类型->function->生命周期回调函数—监听小程序启动或切前台

onHide->类型->function->生命周期回调函数—监听小程序切后台

onError->类型->function->错误监听函数

onPageNotFound->类型->function->页面不存在监听函数

其他->类型->any->开发者可以添加任意函数或数据变量到Object参数中，用this访问

## 19.Pages配置

pages用于指定小程序由哪些页面组成，每一项 都对应一个页面的路径（含文件名）信息。文件名 不需要写文件后缀，框架会自动去寻找对应位置 的 .json, .js, .wxml, .wxss 四个文件进行处理。数组的 第一项代表小程序的初始页面（首页）。小程序中 新增/减少页面，都需要对 pages 数组进行修改。

**页面配置**

每一个小程序页面也可以使用同名 .json 文件来 对本页面的窗口表现进行配置，页面中配置项会覆盖 app.json 的 window 中相同的配置项。

 

**Page(Object object)参数属性：**

data->类型->Object->页面的初始数据

onLoad->类型->function->生命周期回调函数—监听页面加载

onShow->类型->function->生命周期回调函数—监听页面显示

onReady->类型->function->生命周期回调函数->监听页面初次渲染完成

onHide->类型->function->生命周期回调函数—监听页面隐藏

onUnload->类型->function->生命周期回调函数—监听页面隐藏

其他->类型->any->开发者可以添加任意的函数或数据到Object参数中，在页面的函数中用this访问

## 20.小程序执行顺序：

![image-20211112135113523](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20211112135113523.png)

![image-20211112135119319](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20211112135119319.png)

**函数App（Object object）：**

用于注册小程序，该函数必须在app.js中调用， 必须调用且只能调用一次

**函数Page(Object object)：**

用于注册小程序中的页面。其参数object用于指 定页面的初始数据、生命周期回调、事件处理 函 数等。

## 21.数据及事件绑定

**WXML：**是框架设计的一套标签语言，结合基础组件、 事件系统，可以构建出页面的结构。

**data对象：**是页面第一次渲染时使用的初始数据，WXML 中的动态数据均来自对应 Page的 data。页面加载 时，data以JSON字符串的形式由逻辑层传至渲染层， 数据类型包括：字符串，数字，布尔值，对象， 数组等。

**数据绑定：**渲染层可以通过 WXML 对数据进行绑定。数据 绑定使用 Mustache 语法（双大括号）将变量包起 来，可以作用于：内容、组件属性、控制属性、 关键字、运算、组合、数组、对象等场景。

**setData() 函数:** 用于将数据从逻辑层发送到视图层（异步）， 同时改变对应的 this.data 的值（同步）。

**事件绑定：**事件是视图层到逻辑层的通讯方式，它可以将 用户的行为反馈到逻辑层进行处理。事件可以绑定 在组件上，当触发事件，就会执行逻辑层中对应的 事件处理函数。事件对象可以携带额外信息，如 id, dataset, touches。

## 22.变量和函数的作用域及模块化

在 JavaScript 文件中声明的变量和函数只在该 文件中有效；不同文件中可以声明相同名字的 变 量和函数 ， 不 会 互 相 影 响 。 通 过 全 局 函 数 getApp() 可以获取全局的应用实例，如果需要 全局的数据，可以在 App() 中设置。



可以将一些公共的代码抽离成为一个单独的 js 文件 作为一个模块。模块通过 module.exports 或者 exports 对外暴露接口，在需要这些模块的文件中， 使用 require(path) 将公共代码引入（path为相对 路径，暂时不支持绝对路径）。

```js
<!--index.wxml-->
<view class='box'>
  <view class='title'> 变量模块化示例 </view>
  <view>全局变量：{{msg1}} </view>
  <view>全局函数：{{msg2}} </view>
  <view>本文件变量：{{msg3}} </view>
  <view>本文件函数：{{msg4}} </view>
  <view>其他模块变量：{{msg5}} </view>
  <view>其他模块函数：{{msg6}} </view>
</view>

/**index.wxss**/
view{
  font-size: 18px;
  margin-bottom: 10px;
}

//index.js
const app = getApp() //获取全局应用实例
var util = require('../utils/util.js'); //获取utils模块应用实例
var indexMsg = '我是来自index.js的变量'; //定义本模块的变量
function indexFunc() { //定义本模块的函数
  return '我是来自index.js的函数';
}
Page({
  data: {
    msg1: app.globalMsg, //使用全局变量
    msg2: app.globalFunc(), //使用全局函数
    msg3: indexMsg, //使用本模块变量
    msg4: indexFunc(), //使用本模块函数
    msg5: util.utilMsg, //使用utils模块变量
    msg6: util.utilFunc() //使用utils模块函数
  }
})

util.js:var utilMsg = '我是来自util.js的变量';
function utilFunc() {
  return '我是来自util.js的函数';
}
module.exports = {
  utilMsg: utilMsg,
  utilFunc: utilFunc
}

//app.js
App({  
  globalMsg: '我是来自app.js的全局变量',
  globalFunc: function () {
    return '我是来自app.js的全局函数'
  },
})
```

## 23.条件渲染

wx:if 在框架中，使用 wx:if=“{{condition}}” 来判断是否需要渲染该代码块，例如：

<view wx:if="{{condition}}">True</view>

也可以用 wx:elif 和 wx:else 来添加一个 else 块， 例如：

<view wx:if="{{length > 5}}">1</view>

<view wx:elif="{{length > 2}}">2</view>

<view wx:else>3</view>

**block wx:if：**

因为 wx:if 是一个控制属性，需要将它添加到一个标签 上。如果要一次性判断多个组件标签，可以使用一个 标签将多个组件包装起来，并在上边使用 wx:if 控制属性。

例如：

<block wx:if="{{true}}">

<view>view1</view>

<view>view2</view>

</block>



<block/>并不是一个组件，它仅仅是一个包装元素， 不会在页面中做任何渲染，只接受控制属性。

```js
<!--index.wxml-->
<view style="margin:20px;text-align:center;">
  利用view中的wx：if进行条件渲染
  <view wx:if="{{color=='red'}}">红色</view>
  <view wx:elif="{{color=='green'}}">绿色</view>
  <view wx:elif="{{color=='blue'}}">蓝色</view>
  <view wx:else>其他颜色</view>
  <view class="view-item" style="background-color:{{color}}"></view>
</view>

<view style="margin:20px;text-align:center;">
  利用block中的wx：if进行条件渲染
  <block wx:if="{{length > 10}}">
    <view class="view-item bc-red">红色</view>
    <view class="view-item bc-green">绿色</view>
    <view class="view-item bc-blue">蓝色</view>
  </block>
</view>

/**index.wxss**/
.view-item{
  width: 100%;
  height: 50px;
}
.bc-red{
  background-color: red;
}
.bc-green{
  background-color: green;
}
.bc-blue{
  background-color: blue;
}

//index.js
Page({
  data: {
    color: 'yellow',//初始化color的值
    length: 15//初始化length的值
  }
})

```

## 24.列表渲染

在组件上使用 wx:for 控制属性绑定一个数组， 即可使用数组中各项的数据重复渲染该组件。

数组当前项的下标变量默认为 index，数组当前 项的变量名默认为 item。使用 wx:for-item 和 wx:for-index可以指定数组当前元素和元素下标。可 以将 wx:for 用在标签上，以渲染一个包含 多 节点的结构块。

如果列表元素位置会动态改变或者有新的元素添加， 并且希望列表中的项目保持自己的特征和状态，就 需要使用 wx:key 来指定列表中元素的唯一标识符。

**使用wx:for的注意事项：**

1.当 wx:for 的值为字符串时，会将字符串解析成 字符数组。例如：<view wx:for="array">

等同于

<view wx:for="{{['a','r','r','a','y']}}">

2. 花括号和引号之间如果有空格，将最终被解析成

为字符串。

例如：<view wx:for="{{[1,2,3]}} ">

等同于

<view wx:for="{{[1,2,3] + ' '}}">

##  25. 利用inline-block设置布局方式

设置了inline-block属性的元素既拥有了block

元素可以设置width和height的特性，又保持了

inline 元素不换行的特性。



## 26.模板的定义和引用

WXML提供模板（template），可以在模板中定

义代码片段，然后在不同的地方引用。

定义模板时，使用 name 属性指定模板的名字； 引用模板时，使用 is 属性指定引用的模板，并通过 data 属性传入模板数据。

利用import可以引用目标文件中定义的template，

import 有作用域的概念，即只会 import 目标文件中

定义的 template，而不会 import 目标文件 import

的 template.



## 27.引用文件

WXML 提 供 两 种 文 件 引 用 方 式 ： import 和

include。import只能引用文件中的template，而通过

include 可以引用文件中除了 <template/> 和<wxs/>之外的整个代码，相当于将目标文件中的代码拷贝到

include 位置。



## 28. 消息提示框API函数

wx.showToast ( Object object)

用于显示消息提示框

wx.showModal(Object object)

wx.showLoading(Object object)

wx.hideToast(Object object)

wx.hideLoading(Object object)

```js
<!--pages/kaifa/area/area.wxml-->
<view class="box">
  <view class="title">三角形面积计算器</view>
  <form bindsubmit="formSubmit">
    输入三角形的三条边长：
    <input type="digit" placeholder="第1条边长" name='a' value="{{a}}" />
    <input type="digit" placeholder="第2条边长" name='b' value="{{b}}" />
    <input type="digit" placeholder="第3条边长" name='c' value="{{c}}" />
    <button form-type="submit">计算</button>
  </form>
  <text>三角形的面积为：{{result}}</text>
</view>

/* pages/kaifa/area/area.wxss */
input, button, text {
  /*定义三种组件的样式*/
  font-size: 20px;
  margin: 20px 0;
}
input {
  border-bottom: 1px solid blue;/*设置input组件的下边框样式*/
}

// pages/kaifa/area/area.js
Page({
  formSubmit: function(e) {
    var a = parseFloat(e.detail.value.a);//将input组件的value值转换为实数类型并赋值给变量a
    var b = parseFloat(e.detail.value.b);//将input组件的value值转换为实数类型并赋值给变量b
    var c = parseFloat(e.detail.value.c);//将input组件的value值转换为实数类型并赋值给变量c
    var area;//定义存放面积的变量
    if (a + b <= c || a + c <= b || b + c <= a) {//如果三角形的两边之和小于第三边
      wx.showToast({//调用API函数显示提示对话框
        title: '三角形的两边之和小于第三边！',//对话框标题
        icon: 'none',//对话框图标
        duration: 2000,//对话框显示时长
      });
      this.clear();//调用函数清空input组件中的数据
      return;
    }
    else {//计算三角形面积
      var s = (a + b + c) / 2;
      area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
    }
    this.setData({
      result: area//将三角形面积渲染到视图层
    });
  },
  clear: function() {
    this.setData({
      a: '',
      b: '',
      c: '',
      result: ''
    })
  }
})

```

**wx.showToast(Object object)的参数属性：**

title->提示的内容

icon->图标

image->自定义图标的本地路径，image的优先级高于icon

duration->延迟事件

mask->是否显示透明蒙层，防止触摸穿透

success->接口调用成功的回调函数

fail->接口调用失败的回调函数

complete->接口调用结束的回调函数



## 29. radio组件和checkbox组件

用radio组件改变字体类型，利用checkbox组件改 变字体加粗、倾斜和下划线等样式。

radio 为 单 选 项 目 组 件 ， 必 须 和 radio-group单项选择器组件一起使用。 radio-group内部由多个radio组件组成。

checkbox为多选项目组件，它 必须和checkbox-group多项选择器 组件一起使用 。 checkbox-group 内部由多个checkbox组成。



**radio和radio-group组件属性说明：**

radio->属性->value->radio标识。当radio选中时，radio-group的change事件会携带radio的value

radio->属性->checked->当前是否选中

radio->属性->disabled->是否禁用

radio->属性->color->radio的颜色

radio-group->属性->bindchange->radiobox-group中选中项发生改变时触发change事件

 

**checkbox和checkbox-group组件属性说明：**

 checkbox->属性->value->checkbox标识

checkbox->属性->disabled->是否禁用

checkbox->属性->checked->当前是否选中，可用来设置默认选中

checkbox->属性->color->checkbox的颜色

checkbox-group->属性->bindchange->checkbox-group中选中项发生改变时触发change事件



## 30.slider滑动条

**rgb()和rgba()函数：**

视图层颜色的变化可以通过函数rgb(red,green,blue) 和rgba(red,green,blue,alpha) 来动态设置，其参数red, green, blue, alpha分别表示红、绿、蓝和透明度。

**组件的data-* 属性：**

用于存储页面或应用程序的私有自定义数据，存储的 数据能够在JavaScript 中使用。data-* 属性包括两部分：

属性名：不能包含任何大写字母，并且在前缀 "data-" 之后必须至少有一个字符

属性值：可以是任意字符串

 

**slider组件：**

slider是滑动选择器组件，通过滑动该组件来改变滑 块位置。其常用属性如下所示：

min->最小值

max->最大值

step->步长，取值必须大于0，并且可被（max-min）整除

value->当前取值

activeColor->已选择的颜色

backgroundColor->背景色的颜色

block-size->滑块的大小，取值范围为12-28

block-color->滑块的颜色

show-value->是否显示当前value

bindchange->完成一次拖动后触发的事件

bindchanging->拖动过程中触发的事件



## 31.switch组件

利用switch组件控制swiper组件属性 实现轮播图各种表现效果的方法。

 

**swiper组件：**

滑块视图容器组件，能够实现轮播图的效 果，其常用属性如表所示：

indicator-dots->是否显示面板指示点

indicator-color->指示点的颜色

indicator-active-color->当前选中的指示点颜色

autoplay->是否自动切换

current->当前所在滑块的index

current-item-id->当前所在滑块的item-id，不能与current被同时指定

interval->自动切换时间间隔

duration->滑动动画时长

circular->是否采用衔接滑动

vertical->滑动方向是否为纵向

bindchange->current改变时会触发chang事件



**swiper组件：**

开关选择器组件，能够实现开关效果，其 常用属性如表所示：

checked->是否选中

disabled->是否禁用

type->样式，有效值：switch，checkbox

bindchange->checked改变时触发change事件

color->switch的颜色

 

## 32.picker组件

从屏幕底部弹起的滚动选择器，现支持五种 类型的选择器，通过mode来区分，分别是：普通 选择器、多列选择器、时间选择器、日期选择器 和省市区选择器，默认的是普通选择器。

 

**普通选择器（mode = selector）和 多列选择器（mode = multiSelector）主要属性：**

range->类型->Array/Object Array->数据元素数组

range-key->类型->String->当range时一个Object Array时，通过range-key来指定Object中key的值作为选择器来显示内容

value->类型->Number->value的值表示选择了range中的第几个（下标从0开始）元素

bindchange->类型->EventHandle->value改变时触发change事件

 

**时间选择器（mode = time）主要属性：**

value->类型->String->表示选中的事件，字符串格式为“hh:mm”

start->类型->String->表示有效时间范围的开始

end->类型->String->表示有效时间范围的结束

bindchange->类型->EventHandle->value改变时触发change事件

 

**日期选择器（mode = date）主要属性：**

value->表示选中的日期，格式为：“YYYY-MM-DD”

start->表示有效日期范围的开始

end->表示有效日期范围的结束

fields->有效值year，month，day，表示选择器的粒度，默认值为day

bindchange->value改变时触发change事件

 

**省市区选择器（mode = region）主要属性：**

value->Array类型，表示选中的省市区。默认选中每一列的第一个值

custon-item->可谓每一列的顶部添加一个自定义的项

bindchange->value改变时触发change事件



## 33.自定义构造函数

也是一个普通函数，创建方式也和普通函数一样， 但构造函数习惯上首字母大写，如： 

function Person(name, sex) { //定义构造函数 this.name = name; //将函数参数赋值给对象属性 this.sex = sex; 

}

**创建和使用对象的方法：**

创建对象通过new关键字，例如： 

var p = new Person(myName, mySex)

使用对象通过“.”来实现，例如：p.name



## 34.image组件

image组件的显示模式：

image组件提供了4种缩放模式和9种裁剪 模式，利用mode属性进行设置。



```css
<!--pages/kaifa/model/model.wxml-->
<view class="box">
  <view class="title">图片展示</view>
  <view wx:for="{{imgArray}}">
    <view>{{item.text}}</view>
    <view class="imgLayout">
      <image src="{{src}}" mode="{{item.mode}}"></image>
    </view>
    ----------------------------
  </view>
</view>
/* pages/kaifa/model/model.wxss */
.imgLayout {
  text-align: center;
  margin: 5px 0;
}
image {
  width: 200px;
  height: 200px;
  background-color: #eee;
}
// pages/kaifa/model/model.js
Page({
  data: {
    src: '/images/testImage.png',//图片路径
    imgArray: [
      { //图片显示模式及文字说明数组
        mode: 'aspectFit',
        text: 'aspectFit：保持纵横比缩放图片，使图片完整的显示出来'
      }, {
        mode: 'widthFix',
        text: 'widthFix：保持纵横比缩放图片，宽度完全显示出来'
      },{
        mode: 'scaleToFill',
        text: 'scaleToFill：不保持纵横比缩放图片，使图片拉伸适应'
      }, {
        mode: 'aspectFill',
        text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
      }, {
        mode: 'top',
        text: 'top：不缩放图片，只显示图片的顶部区域'
      }, {
        mode: 'bottom',
        text: 'bottom：不缩放图片，只显示图片的底部区域'
      }, {
        mode: 'center',
        text: 'center：不缩放图片，只显示图片的中间区域'
      }, {
        mode: 'left',
        text: 'left：不缩放图片，只显示图片的左边区域'
      }, {
        mode: 'right',
        text: 'right：不缩放图片，只显示图片的右边区域'
      }, {
        mode: 'top left',
        text: 'top left：不缩放图片，只显示图片的左上边区域'
      }, {
        mode: 'top right',
        text: 'top right：不缩放图片，只显示图片的右上边区域'
      }, {
        mode: 'bottom left',
        text: 'bottom left：不缩放图片，只显示图片的左下边区域'
      }, {
        mode: 'bottom right',
        text: 'bottom right：不缩放图片，只显示图片的右下边区域'
      }
    ]
  }
})
```

**image组件的使用方法：**

image组件用于显示图片，支持JPG、PNG、SVG 格式，其主要属性如下表所示：

src->图片的资源地址

mode->默认值为scaleToFill->图片的显示模式

 

**mode的缩放模式：**

scaleToFill->不保持纵横比缩放图片，使图片的宽高完全拉伸至 填满 image 元素。

aspectFit->保持纵横比缩放图片，使图片的长边能完全显示 出来。也就是说，可以完整地将图片显示出来。

aspectFill->保持纵横比缩放图片，只保证图片的短边能完全 显示出来。也就是说，图片通常只在水平或垂直 方向是完整的，另一个方向将会发生截取。

widthFix->宽度不变，高度自动变化，保持原图宽高比不变。

 

**mode的裁剪模式：**

top->不缩放图片，只显示图片的顶部区域

bottom->不缩放图片，只显示图片的底部区域 

center->不缩放图片，只显示图片的中间区域 

left->不缩放图片，只显示图片的左边区域 right->不缩放图片，只显示图片的右边区域 top left->不缩放图片，只显示图片的左上边区域 

top right->不缩放图片，只显示图片的右上边区域 

bottom left->不缩放图片，只显示图片的左下边区域 

bottom right->不缩放图片，只显示图片的右下边区域



## 35.audio音频组件

创建音频上下文的API函数：

利用API函数AudioContext wx.createAudioContext(string id, Object this) 可以创建音频上下文。

参数id是audio 组件的 id， this是指在自定义 组件下的当前组件实例。

返回值AudioContext表示音频上下文对象

 

**音频上下文对象：**

音频上下文对象AudioContext具有如下函数：

setSrc(string src) ->设置音频地址 

play()->播放音频 

pause()->暂停音频 

seek(number position) ->跳转到指定位置

 

**audio音频组件：**

用于创建音频上下文实例、指定音频源、控制音频播放、 设置音频外观和触发音频事件等。其主要属性如下所示：

id->audio组件的唯一标识符 

src->要播放音频的资源地址 

loop->是否循环播放 

controls->是否显示默认控件 

poster->音频封面的图片资源地址 

name->默认控件上的音频名字

author->默认控件上的作者名字 

binderror->当发生错误时触发 error事件 bindplay->当开始/继续播放时触发play事件 

bindpause->当暂停播放时触发 pause 事件 

bindtimeupdate->当播放进度改变时触发 timeupdate 事件

bindended->当播放到末尾时触发 ended 事件



## 36.video视频组件

创建视频上下文的API函数：

函数VideoContext wx.createVideoContext(string id, Object this) 用于创建视频上下文对象。

参数id为video 组件的 id。this为自定义组 件下的当前组件实例。

返回值VideoContext为视频上下文对象。



**视频上下文对象VideoContext：**

主要用于控制视频播放、发送弹幕、设置视频 外 观等。其主要方法如下所示：

play()->播放视频 

pause()->暂停视频 

stop()->停止视频 

seek(number position) ->跳转到指定位置 sendDanmu(Object data) ->发送弹幕

playbackRate(number rate) ->设置播放的倍速 

requestFullScreen(Object object) ->进入全屏 

exitFullScreen()->退出全屏 

showStatusBar()->显示状态栏 仅在iOS全屏下有效 

hideStatusBar()->隐藏状态栏 仅在iOS 全屏下有效

 

**发送弹幕API函数：**

利用sendDanmu(Object data)可以发射弹幕。参数 data为弹幕内容，其属性如下：

text->类型->string->必填->弹幕文字

color->类型->string->不是必填->弹幕颜色

 

**video视频组件：**

主要用于创建视频上下文对象、设置视频源、 控 制视频播放、设置视频外观等。其主要属性如下：

src->要播放视频的资源地址 

duration->指定视频时长 

controls->是否显示默认播放控件（播放/暂停按钮、 播放进度、时间）

danmu-list->弹幕列表

danmu-btn->是否显示弹幕按钮，只在初始化时 有效，不能动态变更 

enable-danmu->是否展示弹幕，只在初始化时有效， 不能动态变更 

autoplay->是否自动播放 

loop->是否循环播放 

muted->是否静音播放 

initial-time->指定视频初始播放位置



## 37. 创建随机颜色方法：

颜色是由红、绿、蓝（即RGB）三种颜色 构成，#RRGGBB是颜色值，其中每种颜色值 都在00～FF（即0～255）之间，如果生成3个2 位16进制随机数，再和#符号进行连接，就 可 以生成一种随机颜色。



## 38. 正则表达式：

由一些普通字符和一些元字符 （metacharacters）组成。普通字符包括大 小写字母和数字，而元字符则具有特殊的含义，其含义可以查阅配套教材或其他资料。

正则表达式验证邮箱：

正则表达式以符号/^开始，以符号$/结束，例如： /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9- ]+)*\.[a-zA-Z0-9]{2,6}$/

@之前的表达式： [a-zA-Z0-9_.-]+ 表示字符串必须由1个及1个以上的大小写字母、 数字、下划线、点或横杠组成，+号表示前面 字符出现次数必须大于或等于1

@之后的表达式：[a-zA-Z0-9-]+ 表示字符串必须由1个及1个以上的大小写字母、 数字、下划线或横杠组成。

(\\.[a-zA-Z0-9-]+)* 表示后面字符串第一个字符必须是点，点后面字符 串必须由1个及以上的大小写字母、数字、下划线或 横杠组成。*表示匹配前面的子表达式任意次。

\\.[a-zA-Z0-9]{2,6} 表示最后一个表达式由2～6个字母或数字构成。



## 39.模态对话框：

wx.navigateTo(Object object)：

保留当前页面，跳转到应用内的某个页面。 但 是不能跳到 tabbar 页面。使用 wx.navigateBack()函 数可以返回到原页面。其参数属性除success、fail和 complete三个回调函数外，还有一个string类型的必 填属性url，表示需要跳转页面的路径。

 

**wx.showModal(Object object)：**

用于显示模态对话框。模态对话框 显 示时不能操作该应用程序的其他窗口，而非 模态对话框则可以。其参数主要属性如下：

title->提示的标题 

content->提示的内容 

showCancel->是否显示取消按钮 cancelText 取消按钮的文字，最多 4 个字符 

cancelColor->取消按钮的文字颜色，必须是 16 进制格式的 颜色字符串 

confirmText->确认按钮的文字，最多 4 个字符 

confirmColor->确认按钮的文字颜色，必须是 16 进制格式的 颜色字符串 

success->接口调用成功的回调函数 

fail->接口调用失败的回调函数 

complete->接口调用结束的回调函数

 

**success(Object res)回调函数的参数属性：**

confirm->类型->boolean->为true时，表示用户点击了确定按钮

cancel->类型->boolean->为true时，表示用户点击了取消按钮

 

## 40.API函数：

wx.onAccelerometerChange(function callback)

wx.startAccelerometer(Object object)

wx.stopAccelerometer(Object object)

 

**wx.onAccelerometerChange(function callback) ：**

用于监 听加速度变化事件，其参数为加速度变化事件的回调函数， 该回调函数的参数是Object res，res的属性如下表所示：

x->类型->number->X轴 

y->类型->number->Y轴 

z->类型->number->Z轴

 

**wx.startAccelerometer(Object object)：**

用于启动 监听加速度变化事件。其参数属性如下表所示：

interval->类型->string默认值->normal->监听频率，其有效值包括： game, ui, normal success->类型->function->接口调用成功的回调函数

fail->类型->function->接口调用失败的回调函数 

complete->类型->function->接口调用结束的回调函数

 

**wx.stopAccelerometer(Object object)：**

用于停止监 听加速度变化事件。

 

## 41. 利用API函数创建绘图上下文对象：

CanvasContext wx.createCanvasContext ( string canvasId, Object this ) 用于创建画布绘图 上下文对象，参数canvasId是canvas组件的id ， this是指在自定义组件下的当前组件实例，返回值 为CanvasContext对象。

 

**绘图和设置图形样式：**

利用画布绘图上下文对象可以绘制图形和设置 图形样式，其常用方法如下：

arc()：创建一条弧线路径。

draw()：将之前在绘图上下文中的描述（路径、 变形、样式）画到canvas中。无参数或参数为false 时要先清除画布。

stroke()：画出当前路径的边框。 

fill()：对当前路径中的内容进行填充。 createCircularGradient()：创建圆形渐变颜色。 setLineCap()：设置线条端点样式，包括：butt、 round和square 。 

setLineJoin()：设置线条交点样式，包括：bevel、 round和miter 。

setFontSize()：设置字体的字号。 setTextBaseline() ：设置文字的竖直对齐。 createCircularGradient()：创建圆形渐变颜色。 setShadow()：设置阴影样式。 

setGlobalAlpha ()：设置画笔全局透明度。

draw(boolean reserve, function callback)函数。 如果 reserve 为 true，则将保留当前画布上 的内容继续绘制

 

## 42.改变图形函数：

缩放图形函数：scale(scaleWidth, scaleHeight)：

用于缩放图形 ， 参 数 scaleWidth 和 scaleHeight分别表示沿宽度和高度方向的缩放 比例。

平移图形函数：translate(x, y)：

通过变换当前坐标系原点 (0, 0) 实现平移图形。 默认的坐标系原点为页面左上角，参数x、y分别 表示水平和竖直方向坐标平移量。

旋转图形函数：rotate(rotate)：

用于实现以原点为中心顺时针旋转当前 坐标轴， 参数rotate表示旋转的角度 。

 

## 43.canvas组件：

 

**canvas画布组件的使用方法其属性如下：**

type->指定canvas类型 

canvas-id canvas->组件的唯一标识符， 若指定了type指定该属性

disable-scroll->当在 canvas 中移动且有绑定手势事件 时，禁止屏幕滚动以及下拉刷新

bindtouchstart->手指触摸动作开始

bindtouchmove->手指触摸后移动

bindtouchend->手指触摸动作结束

bindtouchcancel->手指触摸动作被打断，如来电提醒、 弹窗等

bindlongtap->手指长按 500ms 之后触发， 触发了长按事件后进行移动不会触发 屏幕的滚动

binderror->当发生错误时触发 error 事件

 

## 44.animation动画对象：

**创建Animation动画对象的方法**

利用Animation的相关函数实现各种 动画效果的方法

创建Animation动画对象：wx.createAnimation(Object object) 

 

**timingFunction 的合法值：**

linear->动画从头到尾的速度是相同的 ease->动画以低速开始，然后加快，在结束前变慢

ease-in->动画以低速开始 

ease-in-out->动画以低速开始和结束 ease-out->动画以低速结束

step-start->动画第一帧就跳至结束状态直到结束 

step-end->动画一直保持开始状态，最后一帧跳到结束状态

 

**Animation方法：**

Array.<Object>eport()->导出动画队列

step(Object object) ->表示一组动画完成

rotate(number angle) ->从原点顺时针旋转一个角度

scale(number sx, number sy) ->缩放

skew(number ax, number ay) ->对 X、Y 轴坐标进行倾斜

translate(number tx, number ty) ->平移变换

opacity(number value) ->设置透明度 backgroundColor(string value) ->设置背景色 width(number|string value) ->设置宽度 height(number|string value) ->设置高度 left(number|string value) ->设置 left 值 right(number|string value) ->设置 right 值 top(number|string value) ->设置 top 值 bottom(number|string value) ->设置 bottom 值

 

## 45.API函数-照相和摄影

 

**wx.chooseImage(Object object)：**

从本地相册选择图片或使用相机拍照。其参数属性如下：

count->->默认值->9->选择图片的最多张数

sizeType -> 默认值-> ['original', 'compressed'] ->所选图片的尺寸 sourceType-> 默认值-> ['album', 'camera'] -> 选择图片的来源 

success->接口调用成功的回调函数

**success回调函数的参数属性：**

tempFilePaths->类型->Array.<string>->图片的本地临时文件路径列表

tempFiles->类型->Array.<Object>->图片的本地临时文件列表

 

**tempFiles对象数组元素属性：**

path->类型->string->本地临时文件路径

size->类型->number->本地临时文件大小，单位为B

 

**wx.chooseVideo(Object object)：**

用于拍摄视频或从手机相册中选择视频。 其参数属性如下：

sourceType-> 默认值-> ['album', 'camera'] ->视频来源 

compressed->默认值->TRUE->是否压缩视频文件

maxDuration->默认值->60拍摄最大时长（单位：秒）

camera->默认值->'back'->拍摄时的前置或后置摄像头 有效值有back和front success->接口调用成功的回调函数

success回调函数的参数属性：

tempFilePath->选定视频的临时文件路径

duration->选定视频的时间长度

size->选定视频的大小

height->返回选定视频的高度

width->返回选定视频的宽度

 

## 46.map组件:

**map地图组件**

API函数wx.getLocation(Object object)：

用于获取当前的 地理位置和速度 ， 调 用 前需要用户在 app.json 文件中授权 scope.userLocation。其参数属性包括success 等回调函数。

success回调函数的参数属性：

latitude->纬度，范围： -90~90 

longitude->经度，范围：-180~180 

speed->速度，单位 m/s 

accuracy->位置的精确度 

altitude->高度，单位 m 

verticalAccuracy->垂直精度，单位 m horizontalAccuracy->水平精度，单位 m

 

**API函数wx.chooseLocation(Object object)：**

用于打开地图选择位置，其参数属性 包括回调函数：success、fail和complete。

wx.openLocation(Object object)：

使用微信内置地图查看位置，其参数属性如下：

latitude->纬度，使用 gcj02 国测局坐标系 longitude->经度，使用 gcj02 国测局坐标系 

scale->缩放比例，范围5~18，默认值18 name->位置名 

address->地址的详细说明

 

API函数wx.openLocation(Object object)

 

**map组件：**

longitude->中心经度 

latitude->中心纬度 

scale->缩放级别，取值范围为5-18，默认值16 

markers->标记点，对象数组类型 

polyline->路线 

polygons->多边形 

circles->圆 

include-points->缩放视野以包含所有给定的坐标点 

show-location->显示带有方向的当前定位点

 

**Makers对象数组元素的属性：**

id->标记点id->类型->Number

latitude->纬度->类型->Number 

longitude->经度->类型->Number 

title->标注点名称->类型->String 

iconPath->标注的图标->类型->String width->标注图标宽度->类型->Number / String 

height->标注图标高度->类型->Number / String 

label->为标记点旁边增加标签->类型->Object

 

## 47.文件操作

API函数wx.saveFile(Object object) 

**wx.saveFile(Object object)：**

用于将文件保存到本地，其参数主要属性如下：

tempFilePath->文件保存的临时路径 success->接口调用成功的回调函数

fail->接口调用失败的回调函数 

complete->接口调用结束的回调函数

 

**API函数wx.getSavedFileList(Object object)** 

用于获取该小程序已保存的本地缓存文件 列表，其参数属性包括：success、fail和complete， 其中success函数的参数属性fileList是文件数组类型。

 

**API函数wx.getSavedFileInfo(Object object)** 

用于获取本地文件信息。其参数属性包括： filePath和success等，filePath是文件路径，success 函数的参数属性包括：size和createTime。 

若要获取临时文件信息 ， 请使用 wx.getFileInfo() 接口。

 

**API函数wx.removeSavedFile(Object object)**

用于删除本地缓存文件，其参数属性包括： filePath 、 success 、 fail 和 complete ， 其 中 filePath是要删除的文件路径。

 

## 48.数据缓存

异步缓存数据：wx.setStorage(Object object)：

用于将数据存储在本地缓存中指定的 key 中。 

数据存储生命周期跟小程序本身一致。 

单个 key 允许存储的最大数据长度为 1MB， 所有数据存储上限为 10MB。

wx.setStorage(Object object)：

key->是必填->本地缓存中指定的key

data->是必填->需要存储的内容 

success->不是必填->接口调用成功的回调函数 

fail->不是必填->接口调用失败的回调函数 complete->不是必填->接口调用结束的回调函数

**同步缓存数据：**

wx.setStorageSync(string key, any data) 是 wx.setStorage()的同步版本。参数key为本地缓存 中指定的key，data为需要存储的内容。

**异步和同步获取缓存数据：**

wx.getStorage(Object object)。从本地缓存中异步 获取指定 key 的内容。

any wx.getStorageSync(string key)。wx.getStorage() 的同步版本，参数 key表示本地缓存中指定的 key， 函 数返回值为key对应的内容

**异步获取缓存信息：**

wx.getStorageInfo(Object object)用于异步获取当前 缓存信息。其参数属性包括success回调函数，该回调函 数的参数属性如下：

keys->当前storage中所有的key currentSize->当前占用的空间大小, 单位 KB 

limitSize->限制的空间大小，单位 KB

**异步和同步删除缓存数据：**

wx.removeStorage(Object object)用于异步删除本地 缓存中指定key对应的数据

wx.removeStorageSync(string key)用于同步删除本地 缓存中指定key对应的数据。

**异步和同步清空缓存：**

wx.clearStorage(Object object)用于清空本地数据缓存

wx.clearStorageSync()是wx.clearStorage() 的同步版本。

 

## 49.网络状态

**获取网络类型：**

wx.getNetworkType(Object object)用于 获取网络类型，其参数属性包括：success、 fail和complete，其中success 的对象参数 属性为：networkType。

networkType的合法值：

wifi->wifi网络 

2g->2g网络 

3g->3g网络 

4g->4g网络 

unknown->Android下不常见的网络类型 none->无网络

**监听网络状态变化：**

wx.onNetworkStatusChange(function callback) 用于监听网络状态变化，参数callback为网络状态 变 化事件回调函数，该回调函数的参数属性如下：

isConnected->类型->boolean->当前是否有网络连接

networkType->类型->string网络类型

**获取已连接中的wifi信息：**

wx.getConnectedWifi(Object object)用于获取已连接中 的 Wi-Fi 信息。其参数属性包括：success、fail和complete， 其中success 的参数属性为wifi。

**wifi的合法值：**

SSID->类型->string->Wi-Fi的SSID

BSSID->类型->string->Wi-Fi的BSSID secure->类型->boolean->Wi-Fi是否安全 signalStrength->类型->number->Wi-Fi信号强度

 

## 50.传感器

**罗盘传感器：**

wx.startCompass(Object object)

wx.stopCompass(Object object)

wx.onCompassChange(function callback)

 

wx.startCompass() 和 wx.stopCompass() 分 别 用于启动和停止罗盘监听，它们的参数属性包含： success、fail和complete

wx.onCompassChange(function callback) 的参数为罗盘数据变化事件的回调函数。 该回调函数的参数属性如下：

direction->类型->number->面对的方向度数 

accuracy->类型->number/string->精度



**陀螺仪传感器：**

与陀螺仪传感器有关的API函数包括：

wx.startGyroscope(Object object)

wx.stopGyroscope(Object object)

wx.onGyroscopeChange(function callback)

 

## 51.扫码和打电话

**扫码**

wx.scanCode(Object object)用于调用客户端 扫码界面进行扫码，其参数属性如下：

onlyFromCamera->是否只从相机扫码 scanType->扫码类型

success->接口调用成功的回调函数 

fail->接口调用失败的回调函数 

Complete->接口调用结束的回调函数

scanType 的合法值：

barCode->一维码 

qrCode->二维码 

datamatrix->Data Matrix 码 

pdf417->PDF417 条码

**打电话:**

wx.makePhoneCall(Object object) 用于拨打电 话:

phoneNumber->需要拨打的电话号码 success->接口调用成功的回调函数

fail->接口调用失败的回调函数 

complete->接口调用结束的回调函数

添加联系人：

wx.addPhoneContact(Object object) 用于添加手机 通讯录联系人。可以通过「新增联系人」或 「添加到已有联系人」的方式添加。

wx.addPhoneContact(Object object) 参数主要属性:

firstName->是必填->名字 

lastName->不是必填>姓氏

mobilePhoneNumber->不是必填->手机号

weChatNumber->不是必填->微信号

 

## 52.屏幕亮度，剪贴板，手机振动

**设置屏幕亮度：**

wx.setScreenBrightness(Object object)用于设置 屏幕亮度。其参数属性除了success、fail和complete 外，还包含了number 类型的value属性，表示屏幕的 亮度值，其范围为 0 ～ 1。

**获取屏幕亮度：**

wx.getScreenBrightness(Object object) 用于获取 屏 幕 亮 度 ， 其 参 数 属 性 只 包 含 success 、 fail 和 complete。success 的参数属性value表示屏幕亮度值。

**保持屏幕亮度：**

wx.setKeepScreenOn(Object object) 用于设置是否 保持屏幕亮度。仅在当前小程序生效，离开小程序后设 置失效。其参数属性除了success、fail和complete外， 还包含了boolean 类型的必填项属性keepScreenOn， 表 示是否保持屏幕常亮。

**设置剪贴板数据：**

wx.setClipboardData(Object object)用于设置系统 剪 贴 板 的 内 容 。 其 参 数 属 性 除 了 success 、 fail 和 complete外，还包含了string 类型的必填项属性data， 表示剪贴板的内容。

**获取剪贴板数据：**

wx.getClipboardData(Object object)用于获取系统 剪贴板的内容。其参数属性只包含success、fail和 complete。success 的参数属性data表示剪贴板的内容。

**较短时间手机振动：**

wx.vibrateShort(Object object)用于使手机发生较 短时间的振动（15 ms），仅在 iPhone 7 / 7 Plus 以 上及 Android 机型生效。参数属性只包含success、 fail和complete三个回调函数。

**较长时间手机振动：**

wx.vibrateLong(Object object)用于使手机发生较 长时间的振动（400 ms)，参数属性只包含success、 fail和complete三个回调函数。



## 53.设备系统信息

**异步获取设备系统信息：**
 wx.getSystemInfo(Object object) 异 步 获 取 设 备 系统信息，参数属性只包含success、fail和complete 三个回调函数。

**success 回调函数参数的主要属性：**

brand->设备品牌 

model->设备型号 

pixelRatio->设备像素比 

screenWidth->屏幕宽度，单位px screenHeight->屏幕高度，单位px windowWidth->可使用窗口宽度，单位px windowHeight->可使用窗口高度，单位px

statusBarHeight->状态栏的高度，单位px language->微信设置的语言

version->微信版本号 

system->操作系统及版本 

platform->客户端平台 

fontSizeSetting->用户字体大小（单位px）。 SDKVersion->客户端基础库版本

**同步获取设备系统信息：**

Object wx.getSystemInfoSync() 同步获取设备 系统信息，其返回值的主要属性与上表一致。

 

## 54.导航栏

**设置导航栏标题：**

wx.setNavigationBarTitle(Object object) 用于动态设置当前页面导航栏标题文字。参 数属性除了success、fail和complete外，还包 含了页面标题title。

**设置导航栏颜色和动画：**

wx.setNavigationBarColor(Object object)用于设置当前 页面导航栏颜色和动画效果。其参数属性除success、fail和 complete外，还包含：

frontColor->前景颜色值。仅支持 #ffffff 和 #000000 

backgroundColor->背景颜色值。有效值为十六进制颜色 

animation->动画效果

**animation的属性：**

duration->默认值->0->动画变化时间，单位 ms 

timingFunc->默认值->linear->动画变化方式

**显示导航栏加载动画：**

wx.showNavigationBarLoading(Object object)用于 在当前页面显示导航条加载动画。参数属性只包含 success、fail、complete三个回调函数。

**隐藏导航栏加载动画：**

wx.hideNavigationBarLoading(Object object)用于隐 藏导航栏加载动画。参数属性只包含success、fail、 complete三个回调函数。

 

## 55.标签栏

**显示和隐藏标签栏：**

wx.showTabBar(Object object)和wx.hideTabBar (Object object)分别用于显示和隐藏标签栏。

其参数属性除了success、fail和complete外，还包括 boolean类型的animation，表示“是否需要动画效果”。

**添加标签文本标记：**

wx.setTabBarBadge(Object object) 用于在某个标签 右上角添加文本标记。其参数属性除success、fail和 complete外，还包括：

index->tabBar的某一项下标，从左边算起 text->显示的文本，超过 4 个字符则显示成 ...

**删除标签文本标记：**

wx.removeTabBarBadge(Object object) 用于 删除某个标签右上角的文本标记，其参数属性除 success、fail和complete外 ， 还包括标签下标 index。

**显示和隐藏标签红点：**

wx.showTabBarRedDot(Object object)和 wx.hideTabBarRedDot(Object object) 

分别用来显示和隐藏 某个标签右上角的红点。 

其参数属性除success、fail和complete外， 还包括标签下标index。

**设置标签栏样式：**

wx.setTabBarStyle(Object object)用于动态设置 标签栏的整体样式：

color->tab 上的文字默认颜色，HexColor selectedColor->tab 上的文字选中时的颜色， HexColor 

backgroundColor->tab 的背景色，HexColor 

borderStyle->tabBar上边框的颜色， 仅支持 black/white

**设置标签样式：**

wx.setTabBarItem(Object object) 用 于 设 置 某个标签样式。其参数属性除了success、fail和 complete外，还包括:

index->tabBar 的某一项下标 

text->tab 上的按钮文字 

iconPath->图片路径，不支持网络图片 selectedIconPath->选中时的图片路径

 

## 56.操作菜单

wx.showActionSheet(Object object)：

用于显示操作菜单。其参数属性除了 success、fail和complete外，还包含：

itemList->按钮文字数组，长度最大为 6 itemColor->按钮文字颜色

success 的 参数属性 tapIndex 表 示 用户点击的按钮序号，该序号从上到下 排序，从0开始

 



 

 

 

 