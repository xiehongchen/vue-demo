

# flex

[阮一峰-flex](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## **一、Flex 布局是什么？**

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

```CSS
.box{
  display: flex;
}
```

行内元素也可以使用 Flex 布局。

```CSS
.box{
  display: inline-flex;
}
```

Webkit 内核的浏览器，必须加上`-webkit`前缀。

```CSS
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

## **二、基本概念**

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2I2YTAzZWVkY2M0Nzk4ZTBiMDNlYzZiMzAwMjY3MmVfU013SmFZQlAzUE5tS0x2N1l2bXBHUjlDVTZWUUd0SmRfVG9rZW46TkNKeGJ3NzBqbzVaRGl4dDI0c2NucFV2blJkXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

## **三、容器的属性**

以下6个属性设置在容器上。

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### **3.1 flex-direction属性**

`flex-direction`属性决定主轴的方向（即项目的排列方向）。

```CSS
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDRhZjQzNTE0MWU0NDM3NzFkZmY2YTYwZmY5MjFkY2JfblpOMk11TG9sMkdqOXhsUnBxWTFXUlhSYUN5enRwV2RfVG9rZW46SllQQ2JBbVNab0lMdmd4bllsMmNFWkI3bjJlXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

它可能有4个值。

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

### **3.2 flex-wrap属性**

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ODgwYzc2OGI0YWI1NzYwNWZkZWE2MDQ5YTcyZWYzNWFfdjZGS04zcWtGMEJWaGtjTFlKRHhDdVc3ZmtWd0x6OWhfVG9rZW46VklJbmJPaUxnb2ZYNUR4RmxvRmNSQ0VobnFnXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

```CSS
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值。

（1）`nowrap`（默认）：不换行。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDU1NDI0ZjdjMDZkZDcwNjUzYjQzZTAwYjI4MzRlODBfWHJqUzhmM1l1dm1aVFdld1FBRXJENUdqTTV4MGJ6SmlfVG9rZW46TGtLRGJCZ3c3bzR0bEV4VnVTeGNTMFV6bmVoXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

（2）`wrap`：换行，第一行在上方。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OTUyNmNhZGUxMmNjNDI0ZTY5ZmYyMWJjMTU3NzJmM2NfRVZUMXkxRjlaYXJXVmxyUGxDTHIzOXpkY2FmY0lOSHNfVG9rZW46U1VSRGJIbEZtbzhBb3Z4a0VkUmN2TmNSbmtoXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

（3）`wrap-reverse`：换行，第一行在下方。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTAzY2ExMmQ2NTk1OWY1NzcyODQyMzc2Njc1YzA0ZjZfT2Vtc2tuZnhTdjB5R2ZROTdiZWlFVjRjRklKeWM0dGFfVG9rZW46UWJIUWJoaVVSb2d4S014N2lJZWNKOGpibjZmXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

### **3.3 flex-flow**

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```CSS
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### **3.4 justify-content属性**

`justify-content`属性定义了项目在主轴上的对齐方式。

```CSS
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDI3YWM1YzlmNzEyZGYyNDJhNjMxODQ1YWQ3MjVmODBfVlg5eVNxMk9IMUFtaUNSbUJwU0FvVGduT00xUDdkRDBfVG9rZW46T3FIemJXdlJIb1hRUlV4QUNxSGNmMnpIbmplXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### **3.5 align-items属性**

`align-items`属性定义项目在交叉轴上如何对齐。

```CSS
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ODYzMWMzMGU2ZTRmMDliODMzOTlhNGM3MzY2MWQ1ZDJfMXZSQVJFaWh1czc4ckFhcWFQV3BaeTBwVzI2ZnIzaVBfVG9rZW46TWg2NGJsVENEbzZCVll4NzJNYWNlMDgwbjNlXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### **3.6 align-content属性**

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```CSS
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDE3NjA3NjViZWJhZjdkOWNiOTcxOWJkMGZmYmU5Y2NfcWlOQkd6UjJKYmJEWGVuMzJ1NXBlbmVLTHhNQUhDWDNfVG9rZW46SzRrZ2J6Z2Jvb2ZSMEJ4R1NpdWNicmtHbm5oXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

该属性可能取6个值。

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。

### **四、项目的属性**

以下6个属性设置在项目上。

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`

### **4.1 order属性**

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```CSS
.item {
  order: <integer>;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YTY0ZDljMjNmMzA2NmJhNDRkYWEyMDM1MWFhYzVkYTBfdmhxOGt3a2JWcVFQMVlQZ3BBaEN2eDBqbFJJSTV6RTlfVG9rZW46SUpHRmJvSWM4b0tqaU54YUE3SGNNVWU2bk5iXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

### **4.2 flex-grow属性**

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```CSS
.item {
  flex-grow: <number>; /* default 0 */
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDQ5MjQ1OTdhM2VmOWNhOWEwNTg1MjViZTNhNjAyMjlfTVF0WkVGa0xNVWdzdzFxOGtkMEpjY3J6eWNleElaYnRfVG9rZW46R1ZUUmJqdVBJb3EwRVN4UXgwM2NPcHpnbjNEXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### **4.3 flex-shrink属性**

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```CSS
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OTg0MjI0NzZlN2YzMjY2MjM4M2ZkOTM1YWU0MmE0MDVfeEZPS2Z2cWtuYk5OR2pRVmNQWURyN25EaDlBTGMzZVFfVG9rZW46V05qdWJzVmt6b3IxSzB4b2cwY2NmUXZkbllmXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### **4.4 flex-basis属性**

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

```CSS
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

### **4.5 flex属性**

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```CSS
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### **4.6 align-self属性**

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```CSS
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjU5ZDY3OGNkNTdhZDk2YTAzYjljMGExOWQ1NTdkOTNfc2l3bmNJOVJzOTg0ZEpPUE4yQ2pveXVyYjd6Y1RZZW9fVG9rZW46TDY4UWJLZ3FTb0szbTF4U3pqbmNQYUhObkxkXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

# grid

[阮一峰-grid](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## **一、概述**

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjk5MGE1YzhkZjE4MzFlODY4YmRiMDIxMjViYzliZmFfWWJIVDBPSFFIZlp1R0RZcGNKcWU1ajZYZTQ4RjJleldfVG9rZW46RjZJUWJiRGhrb1VRckd4cFBCUmNYekl5bldkXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

上图这样的布局，就是 Grid 布局的拿手好戏。

Grid 布局与 [Flex 布局](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

## **二、基本概念**

学习 Grid 布局之前，需要了解一些基本概念。

### **2.1 容器和项目**

> 采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。
>
> <div>
>
>   <div><p>1</p></div>
>
>   <div><p>2</p></div>
>
>   <div><p>3</p></div>
>
> </div>

上面代码中，最外层的`<div>`元素就是容器，内层的三个`<div>`元素就是项目。

注意：项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的`<p>`元素就不是项目。Grid 布局只对项目生效。

### **2.2 行和列**

容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmY4OGIxNGU4ZDA5ZmQ5OTY4ZDljMGI1YmIwNjI0MWRfM1ppSVpieEZJZGNmNVBwYjBYT3JzN1EzWktKbnRJdkJfVG9rZW46TlQyM2JKa1BFb2dpelB4ZGJtc2NWMmxPblpjXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

上图中，水平的深色区域就是"行"，垂直的深色区域就是"列"。

### **2.3 单元格**

行和列的交叉区域，称为"单元格"（cell）。

正常情况下，`n`行和`m`列会产生`n x m`个单元格。比如，3行3列会产生9个单元格。

### **2.4 网格线**

划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。

正常情况下，`n`行有`n + 1`根水平网格线，`m`列有`m + 1`根垂直网格线，比如三行就有四根水平网格线。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjE2ZjgxZWZhNDYzMjAxNjNhYzY1OWZhN2FkYjg0NjFfRGdmSWVRNUljM0p3Qmg5SXQ4WXI4bHRmeFQyQnp5ZWtfVG9rZW46SHhacWJ1OE52b3loeUx4SUQzdmNMNTNHbkRaXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

上图是一个 4 x 4 的网格，共有5根水平网格线和5根垂直网格线。

## **三、容器属性**

Grid 布局的属性分成两类。一类定义在容器上面，称为容器属性；另一类定义在项目上面，称为项目属性。这部分先介绍容器属性。

### **3.1 display 属性**

`display: grid`指定一个容器采用网格布局。

```CSS
div {
  display: grid;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDZhOWE4MjNlMmM3NWIyNGVmNzhjMWZmMWE5OTM5NjFfaHlRTEp2MnNLZ3pQeFdoZ1NuMUgxMW5JSEZ6VUh3SmZfVG9rZW46QUJGVmJkM1M2bzMxZnh4dWFRc2NGMTU0bm5kXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

上图是`display: grid`的[效果](https://jsbin.com/guvivum/edit?html,css,output)。

默认情况下，容器元素都是块级元素，但也可以设成行内元素。

```CSS
div {
  display: inline-grid;
}
```

上面代码指定`div`是一个行内元素，该元素内部采用网格布局。

上图是`display: inline-grid`的[效果](https://jsbin.com/qatitav/edit?html,css,output)。

注意，设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

### **3.2 grid-template-columns 属性， grid-template-rows 属性**

容器指定了网格布局以后，接着就要划分行和列。`grid-template-columns`属性定义每一列的列宽，`grid-template-rows`属性定义每一行的行高。

```CSS
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

[上面代码](https://jsbin.com/qiginur/edit?css,output)指定了一个三行三列的网格，列宽和行高都是`100px`。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OWFlOWVhMGUzYzZlZjFmMDk5YjNmODJlNTE1NmRlYmFfcVFLU1lzaWxOQnZHVFpielhTWFZUOXZ5cW9tZ1Y1RFZfVG9rZW46Qjl4Y2JRa2Vrb3ZlaWJ4UmtGemNxeWp0bjRkXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

除了使用绝对单位，也可以使用百分比。

```CSS
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

**（1）repeat()**

有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用`repeat()`函数，简化重复的值。上面的代码用`repeat()`改写如下。

```CSS
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
```

`repeat()`接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。

`repeat()`重复某种模式也是可以的。

```CSS
grid-template-columns: repeat(2, 100px 20px 80px);
```

[上面代码](https://jsbin.com/cokohu/edit?css,output)定义了6列，第一列和第四列的宽度为`100px`，第二列和第五列为`20px`，第三列和第六列为`80px`。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YWVkYzY1ZTk3Y2IxYmQwNjI3NDQ1ZmM0MmVkYzA0ODhfcGwzTVcwanRSMk56YXY2ZllybDJleFZYeG1BUlhRQTFfVG9rZW46RzJ6SGJyakpsbzBXY3d4QU9sV2NpZ1hsbnljXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

**（2）auto-fill 关键字**

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

```CSS
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

[上面代码](https://jsbin.com/himoku/edit?css,output)表示每列宽度`100px`，然后自动填充，直到容器不能放置更多的列。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmFiYWMxZDVlNTk2Zjg5MGVjMzU5MWE5NzJkMTdkNzFfeFJYMEl4bnBXc01EVUk2a0hGTm5iendJQk50clEyZm5fVG9rZW46RlR4TmJNRTZwb0tSTEZ4VE40MmNUcWJPbjNlXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

除了`auto-fill`，还有一个关键字`auto-fit`，两者的行为基本是相同的。只有当容器足够宽，可以在一行容纳所有单元格，并且单元格宽度不固定的时候，才会有[行为差异](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)：`auto-fill`会用空格子填满剩余宽度，`auto-fit`则会尽量扩大单元格的宽度。

**（3）fr 关键字**

为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。

```CSS
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

[上面代码](https://jsbin.com/hadexek/edit?html,css,output)表示两个相同宽度的列。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzJmNzJhMmNiNTFjZDFhNmQyMzBjYzhjNjYwYWZjMDBfV3o3a2RQR0plaFloU3FUR015RmY1dnpsUk5FR3RBYmVfVG9rZW46TldmTmJJcFdvb3RjVmJ4b1MzRGNERTNYbmlKXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

`fr`可以与绝对长度的单位结合使用，这时会非常方便。

```CSS
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

[上面代码](https://jsbin.com/remowec/edit?html,css,output)表示，第一列的宽度为150像素，第二列的宽度是第三列的一半。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmFhZmZiYjEwY2JiMWE1NzZkMmM5YmU5YTc3YzI0NmVfQm9YVm9XdWhDSmFBSW83QkhRdm5Md0VUcnlOT0Y3SHRfVG9rZW46SXBIaGJ1d0Nkb2dQTkd4eTBTbmNOY3lFbmNjXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

**（4）minmax()**

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```CSS
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```

上面代码中，`minmax(100px, 1fr)`表示列宽不小于`100px`，不大于`1fr`。

**（5）auto 关键字**

`auto`关键字表示由浏览器自己决定长度。

```CSS
grid-template-columns: 100px auto 100px;
```

上面代码中，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了`min-width`，且这个值大于最大宽度。

**（6）网格线的名称**

`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```CSS
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

上面代码指定网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。

网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

**（7）布局实例**

`grid-template-columns`属性对于网页布局非常有用。两栏式布局只需要一行代码。

```CSS
.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}
```

上面代码将左边栏设为70%，右边栏设为30%。

传统的十二网格布局，写起来也很容易。

```CSS
grid-template-columns: repeat(12, 1fr);
```

### **3.3 grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性**

`grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）。

```CSS
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```

[上面代码](https://jsbin.com/mezufab/edit?css,output)中，`grid-row-gap`用于设置行间距，`grid-column-gap`用于设置列间距。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmU1N2Q5YjllZDY4N2NhMDMwMTAwNTRkN2ExM2FkODNfMmcyYkNPaEpDQndZbmFSY0JnT2NVWG9SZEdsaUVBNG9fVG9rZW46VFFuVWJiM3hOb2VYTUJ4R1lxR2NjNDRlbk1jXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

`grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式，语法如下。

```CSS
grid-gap: <grid-row-gap> <grid-column-gap>;
```

因此，上面一段 CSS 代码等同于下面的代码。

```CSS
.container {
  grid-gap: 20px 20px;
}
```

如果`grid-gap`省略了第二个值，浏览器认为第二个值等于第一个值。

根据最新标准，上面三个属性名的`grid-`前缀已经删除，`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`，`grid-gap`写成`gap`。

### **3.4 grid-template-areas 属性**

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

```CSS
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```

上面代码先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

```CSS
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
```

上面代码将9个单元格分成`a`、`b`、`c`三个区域。

下面是一个布局实例。

```CSS
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";
```

上面代码中，顶部是页眉区域`header`，底部是页脚区域`footer`，中间部分则为`main`和`sidebar`。

如果某些区域不需要利用，则使用"点"（`.`）表示。

```CSS
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```

上面代码中，中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。

> 注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`。
>
> 比如，区域名为`header`，则起始位置的水平网格线和垂直网格线叫做`header-start`，终止位置的水平网格线和垂直网格线叫做`header-end`。

### **3.5 grid-auto-flow 属性**

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MmU1MmQzNWM3YzA4ZmZkNWFiY2JkNTk0YWFlM2VhNzBfTk1obkRPd3VOalcxTUx4c1JoSUlDYnF0OUJvY1cxOXBfVG9rZW46WEllQmJMWFBIb09UZVd4bnVmdGNLaVlYbjRmXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。

```CSS
grid-auto-flow: column;
```

[上面代码](https://jsbin.com/xutokec/edit?css,output)设置了`column`以后，放置顺序就变成了下图。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmEzMjdjZWYxMzhhNzA5MDAxMjFmZDJhZmUwMGZhMGNfT1ZsYlJ6a282QTNPT1FYZ3llNE9oZDhFcFV2Y1hNMDVfVG9rZW46UGhmc2IwSUllb3dZUmh4cTczamM0N3RobmJlXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

`grid-auto-flow`属性除了设置成`row`和`column`，还可以设成`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

[下面的例子](https://jsbin.com/wapejok/edit?css,output)让1号项目和2号项目各占据两个单元格，然后在默认的`grid-auto-flow: row`情况下，会产生下面这样的布局。

上图中，1号项目后面的位置是空的，这是因为3号项目默认跟着2号项目，所以会排在2号项目后面。

现在修改设置，设为`row dense`，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。

```CSS
grid-auto-flow: row dense;
```

[上面代码](https://jsbin.com/helewuy/edit?css,output)的效果如下。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OGExZjljMGY5MjY0ZDMyMTYyOGQ1NGVlNDJjNzBkNDVfa0pqSVBFcHFHOXBmWDc5dThyWWR4NzVVaUZWNWlVaWNfVG9rZW46VVVmQmJkSFRHb1VYU1J4aEI5c2N2ZjdybnhjXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

上图会先填满第一行，再填满第二行，所以3号项目就会紧跟在1号项目的后面。8号项目和9号项目就会排到第四行。

如果将设置改为`column dense`，表示"先列后行"，并且尽量填满空格。

```CSS
grid-auto-flow: column dense;
```

[上面代码](https://jsbin.com/pupoduc/1/edit?html,css,output)的效果如下。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OGFkNzE5OTQwNDk0MGJmNjg2M2JiZDllYTgzYTcxOTBfeU9LRWRwR3VJRm1sS3VrOERGbGU3MDF4OTExQ3FBR1hfVG9rZW46UHM5R2I1NERrb3M4Nnd4b0FhTGNCTmtDbk9kXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

上图会先填满第一列，再填满第2列，所以3号项目在第一列，4号项目在第二列。8号项目和9号项目被挤到了第四列。

### **3.6 justify-items 属性， align-items 属性， place-items 属性**

`justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下）。

```CSS
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

这两个属性的写法完全相同，都可以取下面这些值。

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

```CSS
.container {
  justify-items: start;
}
```

[上面代码](https://jsbin.com/gijeqej/edit?css,output)表示，单元格的内容左对齐，效果如下图。

```CSS
.container {
  align-items: start;
}
```

[上面代码](https://jsbin.com/tecawur/edit?css,output)表示，单元格的内容头部对齐，效果如下图。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjExNjQ2ZTUzZTNmZjBmODBkMjdlNjUwZjlkMWRkMzBfWFZzZ1Q2MTJDVXRldjlGVHZBcDNmc1UxOENuRDR3ZXBfVG9rZW46UUNGdGJkRHBEb042c1l4VFM2dGNIWDJ3bnliXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

```CSS
place-items: <align-items> <justify-items>;
```

下面是一个例子。

```CSS
place-items: start end;
```

如果省略第二个值，则浏览器认为与第一个值相等。

### **3.7 justify-content 属性， align-content 属性， place-content 属性**

`justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）。

```CSS
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```

这两个属性的写法完全相同，都可以取下面这些值。（下面的图都以`justify-content`属性为例，`align-content`属性的图完全一样，只是将水平方向改成垂直方向。）

- start - 对齐容器的起始边框。
- end - 对齐容器的结束边框。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YTQ0MzRhZjM4ODY3N2UyOGRlZTRkNzkyNDM4MDBjMzlfWmR1eVFkaHVBUkkwTWdBcjlMcTVpVDE1YkRFZTZ4NzRfVG9rZW46TUQxU2I0bktFb3I3aFN4QldSMmNxd004bnFDXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

- center - 容器内部居中。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OTU0NjZlOTVjMzc2NWZmNWYxY2Y1Y2VmYjE3YTg4M2ZfN285RHBMVWQ4UG5sTHJtajJVZzNOclN2cm0yZ3MxOXVfVG9rZW46QjBBaWIxQVNMb05KRHV4emNKb2NJaldPbjJmXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

- stretch - 项目大小没有指定时，拉伸占据整个网格容器。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2VjYjkwNzZlNDk3NDkwYzliZTkxM2Y0MTQ0MjkwMGNfWWpFMmM1a0NLQ0h6NGtUM0kwOWRQWGJYRGZtVUpCR3lfVG9rZW46TkVvTWJzdXZvb2dERlR4cWpMYWNyWDRpbmJnXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

- space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDZmOTVhMDk3YzMwZDA2NWE2YzlkYTgwYjE4YThhZmVfNEFteXR4S25KZnpRdmptSEtBTjFmdEFPcXg1NGJmUURfVG9rZW46RVdDTmJXTTRib213Smh4MVNzQWN3QjZVblhkXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

- space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ODM4MDRhMzE0YjNmYjI3ZDc5ZjYwZTk4MzlkODQ1YjBfbHU4N3NYQ3BjS0RDQ3dKY2tiTVZlZ1Y3TVcyaDVFWkZfVG9rZW46RzBLTmJKb1JKb1oxUW94akRwUGNNa3poblplXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

- space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OTM4NzU1OTAxM2I5YmIwY2E3Yzg5ZGU4ZmFjYWQ3NmRfVHp5M2tiYXZ1Mnk5ZFk4VXNuVzM4VDRHbG5LVVZLTWRfVG9rZW46VXZEZmJ3R2lWb291cEV4RDJLNmNoZzd2bkliXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

```CSS
place-content: <align-content> <justify-content>
```

下面是一个例子。

```CSS
place-content: space-around space-evenly;
```

如果省略第二个值，浏览器就会假定第二个值等于第一个值。

### **3.8 grid-auto-columns 属性， grid-auto-rows 属性**

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

[下面的例子](https://jsbin.com/sayuric/edit?css,output)里面，划分好的网格是3行 x 3列，但是，8号项目指定在第4行，9号项目指定在第5行。

```CSS
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
}
```

上面代码指定新增的行高统一为50px（原始的行高为100px）。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2Q5MjBhNzg1NzMzNGQ5NzNlMzFmYTZlNTdhNzcwMDFfMXJGbnVaRmtYeHBlcGd4ZjN4bnRtSzZ1QXRyR0JsaFJfVG9rZW46Vk5iOWJVT0ZLb0lUZWl4SktUeGMzV1BpblNnXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

### **3.9 grid-template 属性， grid 属性**

`grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。

`grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。

从易读易写的角度考虑，还是建议不要合并属性，所以这里就不详细介绍这两个属性了。

## **四、项目属性**

下面这些属性定义在项目上面。

### **4.1 grid-column-start 属性， grid-column-end 属性， grid-row-start 属性， grid-row-end 属性**

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

- `grid-column-start`属性：左边框所在的垂直网格线
- `grid-column-end`属性：右边框所在的垂直网格线
- `grid-row-start`属性：上边框所在的水平网格线
- `grid-row-end`属性：下边框所在的水平网格线

```CSS
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

[上面代码](https://jsbin.com/yukobuf/edit?css,output)指定，1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmVhOTE4ZDcwMzJhZTM4OGUzNDJhNjdjMzQxY2E1ZDRfSVczcnlEWmZrU0hnZGlQRG95ZmtjZmxxcU5DUnBqU21fVG9rZW46VWhWeGJ6djBFb1E2QkV4d1ZTVGNlZkV6bktiXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

上图中，只指定了1号项目的左右边框，没有指定上下边框，所以会采用默认位置，即上边框是第一根水平网格线，下边框是第二根水平网格线。

除了1号项目以外，其他项目都没有指定位置，由浏览器自动布局，这时它们的位置由容器的`grid-auto-flow`属性决定，这个属性的默认值是`row`，因此会"先行后列"进行排列。读者可以把这个属性的值分别改成`column`、`row dense`和`column dense`，看看其他项目的位置发生了怎样的变化。

[下面的例子](https://jsbin.com/nagobey/edit?html,css,output)是指定四个边框位置的效果。

```CSS
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}
```

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MzViMGQzYzk3MmI5MGJjMjgwOWMxZDY5ZDQ1OTljMTBfek9xM1FQWXg1OUF2cW16UndHM3pqTGxaR0RoY2RQSVlfVG9rZW46SlBNZWJ1U2Nxb2d1ODR4QkdlTWNVQmhzblNlXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。

```CSS
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}
```

上面代码中，左边框和右边框的位置，都指定为网格线的名字。

这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

```CSS
.item-1 {
  grid-column-start: span 2;
}
```

[上面代码](https://jsbin.com/hehumay/edit?html,css,output)表示，1号项目的左边框距离右边框跨越2个网格。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OGVjMGJiNWJmZjI5MmI1NzMyMDI5ZDYyOTg5NDk5YzVfU0R6dFNsMGpiYkh1OGVnSVMzMndGZVZ4eVQ0dUpLYldfVG9rZW46RnVqTGJ5T2U1b1BKTml4c1VuZmNLcHRabno0XzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

这与[下面的代码](https://jsbin.com/mujihib/edit?html,css,output)效果完全一样。

```CSS
.item-1 {
  grid-column-end: span 2;
}
```

使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

### **4.2 grid-column 属性， grid-row 属性**

`grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

```CSS
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}
下面是一个例子。
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

上面代码中，项目`item-1`占据第一行，从第一根列线到第三根列线。

这两个属性之中，也可以使用`span`关键字，表示跨越多少个网格。

```CSS
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```

[上面代码](https://jsbin.com/volugow/edit?html,css,output)中，项目`item-1`占据的区域，包括第一行 + 第二行、第一列 + 第二列。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ODg5OTQ5ZGY0NGZhYmQwOWQyZDVmODQ1NTQzNDEwZjFfbVNTYTU3ZlJ0WkxmT0FGM0k0cE1ERzYyR29NZnJ4allfVG9rZW46TFpUWGJUdEpkb1J2WGt4TWtaYmNkWHRRbmplXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

斜杠以及后面的部分可以省略，默认跨越一个网格。

```CSS
.item-1 {
  grid-column: 1;
  grid-row: 1;
}
```

上面代码中，项目`item-1`占据左上角第一个网格。

### **4.3 grid-area 属性**

`grid-area`属性指定项目放在哪一个区域。

```CSS
.item-1 {
  grid-area: e;
}
```

[上面代码](https://jsbin.com/qokexob/edit?css,output)中，1号项目位于`e`区域，效果如下图。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDJlNDVkMTdhMDY3NDlhM2Y4MWJkMzI0YjI4MmQwMWNfdGxOT3gwcU5VazlvNEdybkhIZnl6czFHWTZTcGN4T0VfVG9rZW46Q0lrSGIyOTRPb3FDWHF4V1VPNWNvRlF0bmtkXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

```CSS
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

下面是一个[例子](https://jsbin.com/duyafez/edit?css,output)。

```CSS
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

### **4.4 justify-self 属性， align-self 属性， place-self 属性**

`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

```CSS
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

这两个属性都可以取下面四个值。

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

下面是`justify-self: start`的例子。

```CSS
.item-1  {
  justify-self: start;
}
```

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

```CSS
place-self: <align-self> <justify-self>;
```

下面是一个例子。

```CSS
place-self: center center;
```

如果省略第二个值，`place-self`属性会认为这两个值相等。

# 盒模型

**标准盒模型**

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YWQxNTY0ZjdjM2ZkNTYzNWI3MTczODkzM2Q3MmEzZTRfSW9WWnUxbTJLN1JyZWtPNlc5VjQ4cUppNGpsSmljTnFfVG9rZW46Tzg3cWJjZjhXb2F3NkR4RjJmVmNZZDBRbnlnXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

标准盒模型的总宽度 = 宽width + 内边距padding + 边框border + 外边距margin

**怪异盒模型/IE盒模型**

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWM2NzU5N2UxZTg0MDRhODU1Zjg1ZjNkY2MwM2JlOGZfSDliSnMxRmFxOXJDcVV4R0ZlYVB2SjRPNmRNajhIcGlfVG9rZW46R0FlOWJhUENGb3VnblZ4RUNOUWNjNWRqbnljXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

IE盒模型的总宽度 = 宽width + 外边距margin

# css选择器和优先级

1. id选择器

```CSS
#app {
        /* 用 # 指定 */
}
```

1. 类名选择器

```CSS
.box1 {
    /* 用 . 指定 */
}

.box1, .box2, .box3 {
    /* 可以同时选中，同级关系 */
}
```

1. 后代选择器

```Plain
less
复制代码
#app div{    /* id里面指定某个标签 div中所有的东西都会影响 */}
```

1. 子级选择器

```CSS
#app div{
    /* id里面指定某个标签 div中所有的东西都会影响 */
}
```

1. 相邻兄弟选择器

```CSS
.box1 + .box2 {
    /* 只有靠着box1的第一个box2才会生效 */
}
```

1. 群组选择器

```CSS
#app .box2 {
    /* id中指定某个类名 */
}
```

1. 属性选择器

```CSS
input[abc ='abc'] {
    /* 指定带有某个属性的标签 */
}
```

1. 伪元素选择器

```CSS
#input::after{
    /* 伪元素 第二个值还可以写before */
    content: '';
    display: block;
}

#input::before{
    content: '';
    display: block;
}
```

1. 伪类选择器

```CSS
#input:hover {
    /* 鼠标上去有颜色效果 */
}

#input:focus {
    /* 聚焦才有效果 */
}
```

## **优先级**

```
!important > 内联样式（1000） > id选择器（100） > 类名选择器（10） > 标签选择器（1）
```

# 继承属性

文字系列：font

文本系列：color、text-align

元素可见性：visibility

表格、列表布局属性

# css的单位

- px：像素单位
  - 在pc端，1px = 1个物理像素
  - 设备像素就是物理屏幕上的实际像素，比如分辨率1920 * 1080 的屏幕有1920个水平像素和1080个垂直像素
  - css像素就是浏览器使用的单位，就是通常说的px
  - 设备独立像素在不同的设备上会映射到不同数量的物理像素，取决于设备
  - dpr是设备像素比，是设备像素 / 设备独立像素
  - dpi是像素密度
- rpx：根据屏幕宽度等于750rpx来换算的像素单位，这样设计的目的是为了解决不同设备、不同分辨率下元素大小和布局的显示效果不一致的问题
- rem：相对单位，根据根节点的字体大小，html默认是16px
- em：相对单位，根据父元素的字体大小
- vh、vw：相对单位，相对于窗口宽高比
- %：相对单位，相对于父元素

# 行内元素和块级元素

- inline：使元素变成行内元素（内联），拥有行内元素的特性
  - 与其他行内元素共享一行
  -  不能修改width、height属性，大小由内容撑开
  -  padding属性 top、right、botto、left设置都有效；margin属性只有left、right设置有效
  - span、input、img、textarea、label、select
- block： 使元素变成块级元素，拥有块级的特性，即
  - 独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度
  -  可以修改width、height属性
  - padding、margin四个方向的值设置均有效
  - p、h1/h2/h3/h4/h5、div、ul、li、table
- inline-block： 使元素变成行内块级元素，结合了行内元素和块级元素的特性（不独占一行的块级元素）
  - 与其他行内元素共享一行
  - 可以修改width、height属性
  - padding、margin四个方向的值设置均有效

# **first-of-type和first-child有什么区别**

- first-of-type
  - 匹配的是从第一个子元素开始数，匹配到的那个的第一个元素
- first-child
  - 必须是第一个子元素

# **`doctype`****标签和****`meta`****标签**

- doctype
  - 告诉浏览器以什么样的文档规范解析文档
  - 标准模式和兼容模式
    - 标准模式 ->正常，排版和js运作模式都是以最高标准运行
    - 兼容模式->非正常

**script标签中defer和async都表示了什么**

- 众所周知script会阻塞页面的加载，如果我们要是引用外部js，假如这个外部js请求很久的话就难免出现空白页问题，好在官方为我们提供了defer和async
- defer
  - ```CSS
    <script src="d.js" defer></script>
    <script src="e.js" defer></script>
    ```

  - 不会阻止页面解析，并行下载对应的js文件
  - 下载完之后不会执行
  - 等所有其他脚本加载完之后，在`DOMContentLoaded`事件之前执行对应`d.js`、`e.js`
- async
  - ```CSS
    <script src="b.js" async></script>
    <script src="c.js" async></script>
    ```

  - 不会阻止DOM解析，并行下载对应的js文件
  - 下载完之后立即执行
- **补充**，`DOMContentLoaded`事件
  - 是等HTML文档完全加载完和解析完之后运行的事件
  - 在`load`事件之前。
  - 不用等样式表、图像等完成加载

# **什么是BFC？**

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

# 如何清除浮动

- 额外标签`clear:both`

```CSS
.clear{
    clear:both;
}
```

- 利用BFC
- 使用after伪元素

# **什么是DOM事件流？什么是事件委托**

- DOM事件流
  - 分为三个阶段
    - 捕获阶段
    - 目标阶段
    - 冒泡阶段
  - 在addeventListener()的第三个参数(useCapture)设为true，就会在捕获阶段运行，默认是false冒泡
- 事件委托
  - 利用冒泡原理（子向父一层层穿透），把事件绑定到父元素中，以实现事件委托

# **事件冒泡和事件捕捉有什么区别**

- 事件冒泡
  - 在`addEventListener`中的第三属性设置为false（默认）
  - 从下至上（儿子至祖宗）执行
- 事件捕捉
  - 在`addEventListener`中的第三属性设置为true
  - 从上至下（祖宗到儿子）执行

# **link标签和import标签的区别**

- link属于html，而@import属于css
- 页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载。
  - 所以有时候会出现闪烁问题，就是这个时候css样式还未加载出来
- link是html标签，因此没有兼容性，而@import只有IE5以上才能识别。
- link方式样式的权重高于@import的。

# 隐藏页面元素

- display：none
- visibility：hidden
- opacity：0
- height、width设置为0
- position：absolute
- clip-path：裁剪方式

# opacity

如果父元素的`opacity: 0.5`，子元素的`opacity: 1`，那么子元素的opacity基于父元素的opacity计算的，实际上就是0.5

> 当 opacity 属性的值应用于某个元素上时，是把这个元素（包括它的内容）当成一个整体看待，即使这个值没有被子元素继承。因此，一个元素和它包含的子元素都会具有和元素背景相同的透明度，哪怕这个元素和它的子元素有不同的 opacity 属性值

- 可以使用`background-color: rgba(255, 0, 0, 0.5);`来代替

# 文本溢出

## 文本超出显示省略号

```CSS
// 超出隐藏
overflow: hidden;
// 文本显示省略号
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
// 设置文本显示两行
-webkit-line-clamp: 2;
```

## 单行

- `text-overflow`
- `white-space`
- `overflow`

## 多行

使用浮动

```HTML
<div class="box"></div>
<div class="more"></div>
.box {
  margin-top: -80px;
  overflow: hidden;
}
.box::before {
  content: '';
  height: 80px;
  display: block;
}
.more {
  line-height: 1;
  float: right;
}
```

# 纯css检测文本是否溢出

Copy from [掘金地址](https://juejin.cn/post/7347221074704777226)

## **CSS 滚动驱动动画**

要实现文本溢出检测，需要用到两个新特性

1. CSS 滚动驱动动画
2. CSS 样式查询

为什么是这两个呢？听我慢慢分析。

首先我们想一想，在 **`JS`**中是如何判断是否溢出的？很简单

```JavaScript
dom.scrollHeight > dom.offsetHeight;
```

其实也就是表示这个容器是“可滚动”的，因为滚动高度超过了可视高度

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzdkNzFlMjZhNmZjNzRlOGZlNGY1NWUzOGU5YzNmMzBfcTFmQTdCRG9raUYxVzdhb2c1eFdqVklCTVllbVhVbGNfVG9rZW46VXZlcGJPbDhLb0RUbXR4SlZDYmNHdFc0bjFiXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

回到 `CSS` 这里，有没有办法区分呢？答案就是`CSS`滚动驱动动画

> 关于 CSS 滚动驱动动画，可以先回顾这篇文章：[CSS 滚动驱动动画终于正式支持了~ ](https://juejin.cn/post/7259026189904805944)

假设有这样一个布局，就两段文本

```HTML
<div class="txt">
  欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。
</div>
<div class="txt">
  欢迎关注前端侦探
</div>
```

稍微修饰一下，给个高度，让文本可以超出滚动

```CSS
.txt{
  height: 4em;
  padding: 8px;
  outline: 1px dashed #9747FF;
  font-family: cursive;
  border-radius: 4px;
}
```

效果如下

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NjFiNGE2MjM4MWY5ZTVmNDllMDk4ZDM1NjdiMTFhM2NfOVFJcFlCOVBWU1lXUWJWRkRkbmVsNDZJd2tvU2xWMmNfVG9rZW46VmVSVWJFUGY5b1Njb014MVN1NmNaUWpKbmdmXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

左边是可以滚动的，右边是不能滚动的。

现在，我们给左边加一个滚动驱动动画，在滚动时慢慢改变文本的颜色

```CSS
.txt{
  animation: check 1s;
  animation-timeline: scroll(self);
}
@keyframes check{
  to {
    color: #9747FF;
  }
}
```

注意这个`scroll(self)`，`self`表示监听自身滚动，默认是最近的祖先滚动容器，效果是这样的

可以看到随着滚动，左边文本的颜色也慢慢变化了

暂时无法在飞书文档外展示此内容

可以看到随着滚动，左边文本的颜色也慢慢变化了

接着激进一点，我们在动画中把起始点都设置成一样，这样还没开始滚动就自动变色了

```CSS
@keyframes check{
  from,to { 
    /*动画起始点设置成相同*/
    color: #9747FF;
  }
}
```

效果如下

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NDg4ZThiZTQ3Zjg1ZjY4ZmU1ZTQzZmYzMzYwOGE2MmRfNlZNNElDQkdURHZHbVowYVVTakhZZ1BjS1JoQlptYVdfVG9rZW46SkdIcWJXRks5b2RNcTV4NkNtUWNNWURDbkZlXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

这样即使还没开始滚动，也能提前知道是否可滚动了

然后，我们可以设置超出隐藏，也就是让滚动容器“不能滚动”

```CSS
.txt{
  overflow: hidden;
}
```

效果如下

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YTMyZTg5MDEyNmVkNDZiNzJjNDU5MmRiMDY5NTMyMjdfR1RYb205VDEzUTdWemhOVThlTVBHaU9oUmJ6aXV2UmtfVG9rZW46WnBNZmJicWdGb2VIdU54ZE1ERGM5RmlkbnJjXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

也就是说这种情况下，**`CSS`**滚动驱动动画仍然可以被触发。尝试了一下，只要不是**`overflow:visible`**，**`CSS`**都认为是“可滚动”的，即“溢出”状态。

最后，我们将文本设置成超出显示省略号

```CSS
.txt{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

效果如下

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MzZjMDhjNDFhOWIzZTBkOGE2Y2Q0YzNhYjQ5YWM3ODJfczhxM0lXd0VaaVh5Y1E3VmFmZ0F4VDJKSTVPdXh3b2VfVG9rZW46RGdzV2J5QkFab3BqWUF4S2daWGN5eTkybjFmXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

是不是有点能区分文本是否溢出了？至少目前从文本颜色可以很好判断

当然，仅仅这样是不够，还需要更加自由，比如在超出时可以控制其他标签的状态，这就需要用到 CSS 样式查询了

## **CSS 样式查询**

下面介绍一下`CSS`样式查询。

> [@container - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2F%40container)

CSS 样式查询是容器查询的一部分，从名称也可以看出，它可以查询元素的样式，进而设置额外的样式。

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NjVmZGJkNDU5ZGQxOGRmN2VjOTQ3ZmJiYjIxZTA1ZjBfa01kNEVsOVJMTXNrOFgwekluRTJTRFN5c2tjQUhLaVJfVG9rZW46Umw4VGI4bHFtb2xOVVd4czZRcWNiOENIbjhlXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

比如，我们要查询颜色为红色的容器，然后给子元素设置背景色为黑色，可以这样

```CSS
<style>
  div{
    color:red;
  }
  @container style(color: red) {
    p {
      background: black;
    }
        }
</style>
<div>
  <p>
    
  </p>
</div>
```

有人可能会有疑问，为啥要设置子元素，直接设置本身不好吗？其实是为了避免冲突，假设查询到了`color:red`，然后你又设置了`color:yellow`，那浏览器该如何渲染呢？有点死循环了。所以为了避免这种情况，所有容器查询都只能设置子元素样式。

不过这种写法目前还不支持，仅支持`CSS`变量的写法，类似于这样

```CSS
<style>
  div{
    --color:red;
  }
  @container style(--color: red) {
    p {
      background: black;
    }
        }
</style>
<div>
  <p>
    
  </p>
</div>
```

回到前面的例子，我们可以给文本加一个**`CSS`**变量，就叫做**` --trunc`**吧，表示截断

```CSS
.txt{
  --trunc: false;
}
```

然后在滚动驱动动画中改变这个变量

```CSS
@keyframes check{
  from,to { 
    /*动画起始点设置成相同*/
    color: #9747FF;
    --trunc: true;
  }
}
```

这样一来，滚动驱动动画执行的时候，这个变量也被赋值了。

最后我们就可以查询这个样式，给子元素设置样式了，这里我们就用伪元素代替

```CSS
@container style(--trunc: true) {
  .txt::after{
    content: '';
    position: absolute;
    inset: 2px;
    border: 1px solid red;
  }
}
```

这段代码表示当查询到**`--trunc: true`**的条件时，设置相应的样式，这里是画了一个红色的边框，效果如下

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2Y2ODRmOTNhOTYzMzA0MjhhOWM0ODc5ZmRhZWY4ZjVfRDBNb014UURGc3RPVHJEbzl0aVZqbVZZb3FjRlU1dU5fVG9rZW46V05nVmJuSVdtb0JNc094VVM1VWNsUXZLbk5lXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

是不是非常容易？

你也可以查看以下在线链接（注意兼容性，需要 **`Chrome 115+`**，以下相同）：

- [CSS animation-timeline + @ container style (codepen.io)](https://link.juejin.cn/?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FjORrXBe)

暂时无法在飞书文档外展示此内容

有了这个作为区分，可做的事情就比较多了，下面来看几个例子

## **CSS 多行文本展开收起**

首先还是把之前的结构拿过来，这些结构是为了实现右下角的“展开”按钮必不可少的

```HTML
<div class="text-wrap">
  <div class="text-content">
    <label class="expand"><input type="checkbox" hidden></label>
    欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。
  </div>
</div>
```

相关 **`CSS`** 如下

```CSS
.text-wrap{
  display: flex;
  position: relative;
  width: 300px;
  padding: 8px;
  outline: 1px dashed #9747FF;
  border-radius: 4px;
  line-height: 1.5;
  text-align: justify;
  font-family: cursive;
}
.expand{
  font-size: 80%;
  padding: .2em .5em;
  background-color: #9747FF;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  clear: both;
}
.expand::after{
  content: '展开';
}
.text-content{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.text-content::before{
  content: '';
  float: right;
  height: calc(100% - 24px);
}
.text-wrap:has(:checked) .text-content{
  -webkit-line-clamp: 999;
}
.text-wrap:has(:checked) .expand::after{
  content: '收起';
}
```

这时的效果是这样的

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MTFlZGRkZTY3YWQ4N2NiZTJiMTExOTU1MWRlNDIwMjNfZWJOc3R1REZnek0zSFpmVXNvazRZejBiQklVUmRoNWVfVG9rZW46RVp5VWJqeGR4b05XYzB4STRsWmNoaWJ2bnJiXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

通过上一节的原理，我们通过滚动驱动动画来判断是否溢出，并使用**`CSS`**变量作为标识，然后利用样式查询来控制展开按钮的显示状态，关键实现如下

```CSS
.expand{
        /**/
  display: none;
}
.text-content{
  --trunc: false;
  animation: check 1s;
  animation-timeline: scroll(self);
}
@keyframes check{
  from,to {
    --trunc: true;
  }
}
@container style(--trunc: true) {
  .expand{
    display: initial;
  }
}
```

展开按钮默认是隐藏的，这样只有在文本溢出的时候才出现，效果如下

暂时无法在飞书文档外展示此内容

效果出来了，不过在点击展开后按钮也跟着消失了。这是因为展开后，**`CSS`**检测出这时没有溢出，所以样式查询里的语句就不生效了，自然也就回到了之前的隐藏状态。

要解决这个问题也很简单，在展开的时候始终显示按钮就行了,用**`:checked`**可以判断是否展开

```CSS
.text-wrap:has(:checked) .expand{
  display: initial;
}
```

这样就正常了，完美！

暂时无法在飞书文档外展示此内容

CSS方式的好处是监控是实时的，比如手动改变容器的宽度，也会自动显示或者隐藏这个按钮

暂时无法在飞书文档外展示此内容

完整demo可以查看以下在线链接（ **`Chrome 115+`**）：

- [CSS container style expand (codepen.io)](https://link.juejin.cn/?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FqBwaaWW)

暂时无法在飞书文档外展示此内容

## **CSS 文本超出时显示 tooltips**

还有一个比较常见的需求，就是希望在文本出现省略号时，鼠标**`hover`**有**`tooltips`**提示，就像这样

暂时无法在飞书文档外展示此内容

原理和上面几乎一致，我们一步步来看

首先还是结构，没什么特别的

```HTML
<div class="txt" data-title="这是一段可以自动出现tooltip的文本">
  这是一段可以自动出现tooltip的文本
</div>
```

这里加了一个**`data-title`**，是用来显示气泡的，通过伪元素**`content`**获取属性内容

```CSS
.txt{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px;
  outline: 1px dashed #9747FF;
  font-family: cursive;
  border-radius: 4px;
}
.txt::after{
  content: attr(data-title);
  position: absolute;
  top: 0;
  width: fit-content;
  left: 50%;
  margin: auto;
  transform: translate(-50%,-100%);
  background-color: rgba(0,0,0,.6);
  padding: .3em 1em;
  border-radius: 4px;
  color: #fff;
  opacity: 0;
  visibility: hidden;
  transition: .2s .1s;
}
```

效果如下

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MzZmZjhjMDk3MWZlZjEzZGFlMDQ1ZmQ3ZTU5OTI2MTFfQzlGWjdpV1NJWmIxc0NpVXp6UVdLcEFqdThlTEc2TGlfVG9rZW46SHBlT2JFZ3pob1dnVFJ4R3RBd2NPN1pNbmhJXzE3MTU2NTU1MjU6MTcxNTY1OTEyNV9WNA)

目前是没有任何提示的。

下面加上**`CSS`**溢出检测，在检测到溢出时**`hover`**生效。仍然是相同的代码，添加一个滚动驱动动画，然后样式查询

```CSS
.txt{
  --trunc: false;
  animation: check 1s;
  animation-timeline: scroll(x self);
}
@keyframes check{
  from,to {
    --trunc: true;
  }
}
@container style(--trunc: true) {
  .txt:hover::after{
    opacity: 1;
    visibility: visible;
  }
}
```

注意，这里的**`scroll(x self)`**，加了一个**`x`**，因为这时的文本是横向溢出的，所以需要加上滚动驱动轴（默认是垂直方向）

另外，由于超出隐藏，所以**`tooltip`**需要一个新的父级，不然就被裁掉了

```CSS
<div class="wrap">
  <div class="txt" data-title="这是一段可以自动出现tooltip的文本">
    这是一段可以自动出现tooltip的文本
  </div>
</div>
.wrap{
  position: relative;
}
```

这样就能实现文本超出时显示 tooltips

暂时无法在飞书文档外展示此内容

完整demo可以查看以下在线链接（ **`Chrome 115+`**）：

- [CSS container style tooltip (codepen.io)](https://link.juejin.cn/?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FoNOzzYb)

暂时无法在飞书文档外展示此内容

## **最后总结一下**

CSS 就是这么神奇，将两个几乎不相关的特性组合起来，就能实现完全不一样的功能，这可是在其他语言中做不到的，简单回顾一下CSS检测代码

```CSS
.content{
  --trunc: false;
  animation: check 1s;
  animation-timeline: scroll(x self); /*注意溢出方向*/
}
@keyframes check{
  from,to {
    --trunc: true; /*滚动驱动动画*/
  }
}
/*查询溢出状态*/
@container style(--trunc: true) {
         
}
```

是不是非常容易，几乎是无侵入式的，下面总结一下本文重点

1. 要实现文本溢出检测，需要用到两个新特性，CSS滚动驱动动画和CSS样式查询
2. CSS滚动驱动动画可以检测出容器是否可滚动，也就是溢出，即使是在超出隐藏的情况下
3. CSS样式查询可以查询到CSS变量的变化，从而设置不同的样式
4. 借助CSS滚动驱动动画和CSS样式查询，可以很轻松的实现文本溢出检测
5. 两个实例：CSS多行文本展开收起和CSS文本超出时显示 tooltips

当然除了以上一些案例，还可以做的事情很多，比如以前有写一篇判断指定高度后就显示折叠按钮，也可以用这种方式来实现，几乎所有与溢出相关的交互都可以纯CSS完成。

至于兼容性，目前仅支持 `chrome 115+`，还是需要多等等，多多关注，说不定哪一天就能用上了呢，比如5年前推出的`CSS scroll snap`，现在几乎可以愉快使用了，再也无需`swiper.js`这样的库了

# css预处理器

# **Position定位**

`CSS`中`position`属性是比较常用的元素定位方案，`position`常用的取值有`static`、`relative`、`absolute`、`fixed`、`sticky`、`inherit`。

## **static**

`static`属性是`HTML`元素的默认值，即没有定位，遵循正常的文档流对象，对于`top`、`bottom`、`left`、`right`、`z-index`属性的设置都被忽略。 文档流，指的是盒子元素排版布局过程中，元素会自动从左往右，从上往下的流式排列。 文本流，指的是文字元素排版布局过程中，元素会自动从左往右，从上往下的流式排列。 脱离文档流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。

```HTML
<div class="t1">static</div>
<style type="text/css">
    div{
        border: 1px solid #eee;
    }
    .t1{
        position: static;
    }
</style>
```

## **relative**

`relative`是相对定位，元素的位置是相对其原本位置进行偏移，其不脱离文档流，对于`top`、`bottom`、`left`、`right`、`z-index`属性的设置有效，设置偏移属性后会移动相对定位元素，但它原本所占的空间不会改变，相对定位元素经常被用来作为绝对定位元素的容器块。

```HTML
<div class="t2">relative</div>
<div>对比查看效果 元素原本占据空间没有变化 但relative会有偏移</div>
<style type="text/css">
    div{
        border: 1px solid #eee;
    }
    .t2{
        position: relative;
        bottom: -10px;
    }
</style>
```

## **absolute**

`absolute`是绝对定位，元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`，通常的使用方案是在外层嵌套一层`relative`相对定位元素作为父元素，再设置绝对定位元素的偏移将会相对于外层的`relative`元素进行偏移，绝对定位完全脱离文档流与文本流，不占据文档空间，对于`top`、`bottom`、`left`、`right`、`z-index`属性的设置有效。

```HTML
<div class="t3">
    <div class="t4">absolute</div>
</div>
<style type="text/css">
    div{
        border: 1px solid #eee;
    }
    .t3{
        height: 300px;
        position: relative;
    }
    .t4{
        position: absolute;
        top: 100px;
    }
</style>
```

## **fixed**

`fixed`是固定定位，元素的位置相对于浏览器窗口是固定位置，即使是窗口滚动元素也不会移动，注意在`<iframe>`中的元素使用`fixed`是相对于`<iframe>`进行定位的，`<iframe>`类似于在页面中创建了一个新的浏览器窗口，固定定位完全脱离文档流与文本流，不占据文档空间，对于`top`、`bottom`、`left`、`right`、`z-index`属性的设置有效。

```HTML
<div class="t5">fixed</div>
<style type="text/css">
    div{
        border: 1px solid #eee;
    }
    .t5{
        position: fixed;
        top: 300px;
    }
</style>
```

## **sticky**

`sticky`是粘性定位，元素的位置是基于用户的滚动位置来定位，粘性定位的元素是依赖于用户的滚动，在`position: relative`与`position: fixed`定位之间切换，在页面显示时`sticky`的表现类似于`position: relative`，而当页面滚动超出目标区域时`sticky`的表现类似于`position: fixed`，它会固定在目标位置，元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位，这个特定阈值指的是`top`、`right`、`bottom`、`left`其中之一，必须通过指定`top`、`right`、`bottom`、`left`四个阈值其中之一，才可使粘性定位生效，否则其行为与相对定位相同。

```HTML
<div class="t6">sticky</div>
<style type="text/css">
    div{
        border: 1px solid #eee;
    }
    .t6{
        position: sticky;
        top: 0;
    }
</style>
```

## **inherit**

`inherit`是通过继承父元素的`position`值来进行定位。

```HTML
<div class="t7">
    <div class="t8">inherit</div>
</div>
<style type="text/css">
    div{
        border: 1px solid #eee;
    }
    .t7{
        position: relative;
    }
    .t8{
        position: inherit;
        bottom: -10px;
    }
</style>
```
