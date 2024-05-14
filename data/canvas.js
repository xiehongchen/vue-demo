
Copy from [掘金地址](https://juejin.cn/post/7119495608938790942)（直接抄）

# Canvas 概述

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQ3YjdkM2JlNjRmMmI5Y2Y2ZDY0ZjNlZmE4MWJmY2RfblJuT0dUd0RQWlZBdmVKUzNPQTRRV3dmcHVBZXBLUTNfVG9rZW46S1FLOWJMeGtZbzJHVTV4cHF0bGMwTFd4bkh0XzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

从翻译其实就能很好的了解到 canvas 是用来干什么的。画布！很好理解就是用来画画的。那具体怎么“画”咱们就得看一下具体的 API 文档了。下面是对 canvas 的一些概述：

- **canvas** 是一个可以使用脚本(通常为JavaScript)来绘制图形的 HTML 元素.
- **Canvas API** 提供了一个通过JavaScript 和 HTML的Canvas元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。
- **Canvas API** 主要聚焦于2D图形。而同样使用Canvas元素的 WebGL API 则用于绘制硬件加速的2D和3D图形。

# Canvas使用

Canvas 最早是由 Apple 引入 WebKit，用于Mac OS X 的 Dashboard，随后被各个浏览器实现。如今除一些过时的浏览器不支持Canvas元素外，所有的新版本主流浏览器都支持它。

Canvas元素的学习需要具备一些基本的HTML和JavaScript知识。

## 基本用法

下面我们来简单创建一个例子，看看canvas究竟如何使用。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas 基本使用</title>
</head>
<body>
  <canvas width="200" height="200">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
</body>
</html>
```

上面代码就是一个基本的使用Canvas标签的例子。可以看到我们为它设置了宽和高，还在 Canvas标签内部给出一个提示文案。在这里需要说明一下：

- Canvas标签的默认大小为：300 x 150 (像素)，而这里咱们设置为了：200 x 200（像素）。
- Canvas标签中的文字是在不支持Canvas标签的浏览器中使用的，因为支持Canvas标签的浏览器会忽略容器中包含的内容正常渲染Canvas标签，而不支持Canvas标签的浏览器则相反，浏览器会忽略容器而显示其中的内容。

可以看一下上面代码在浏览器上的展示样式：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YTliYzU5Y2Y2NmVjYjcxZDljNTIzNmRhODEwMzRhMDlfbGU5TlVDbnlicE1JbUpmT0FsdnNlOEdySWJDeHA2dk1fVG9rZW46UkVvWGJtWjFpb0pOWnV4WXl6UWNMVW1KblhmXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

## 渲染上下文

Canvas标签起初只是创造了一个固定大小的画布，它公开了一个或多个渲染上下文，而我们想对它进行绘制就需要找到渲染上下文。

Canvas标签提供了一个方法叫：`getContext()` ，通过它我们可以获得渲染上下文和绘画功能。简单写个例子：

```HTML
html
复制代码<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas 基本使用</title>
</head>
<body>
  <canvas id="canvas" width="200" height="200">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
    }
  </script>
</body>
</html>
```

语法结构：`canvas.getContext(contextType, contextAttributes)`

1、`contextType`，它是绘图上下文的类型，参数有：

- 2d：建立一个二维渲染上下文。这种情况可以用 CanvasRenderingContext2D()来替换getContext('2d')。
- webgl（或 experimental-webgl）： 创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现WebGL 版本1(OpenGL ES 2.0)的浏览器上可用。
- webgl2（或 experimental-webgl2）：创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本2 (OpenGL ES 3.0)的浏览器上可用。
- bitmaprenderer：创建一个只提供将canvas内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext。

> 在同一个canvas上，使用相同类型参数`contextType`多次调用`getContext()`方法只会返回同一个绘制上下文

2、contextAttributes 为绘制上下文的属性，这些属性相对比较多，可以设置单个也可以同时设置多个，下面列一下，方便大家了解：

- 2D类型的参数有： (1)、`alpha` 它的值为Boolean类型，如果设置为false, 浏览器将认Canvas背景总是不透明的，这样可以做到一些性能提效。(2)、`willReadFrequently`，值也为Boolean类型，用于表明是否要重复操作，频繁调用`getImageData()`方法时能节省内存，但是仅Gecko内核浏览器支持。(3)、`storage`用于表明使用哪种方式存储，默认值 persisten，表示持久化存储。
- 3D类型的参数有： (1)、`alpha` 值为Boolean类型，指示画布是否包含alpha缓冲区。 (2)、`antialias` 值为Boolean类型，指示是否开启抗锯齿。 (3)、`depth` 值为Boolean类型，表示绘图缓冲区的深度缓冲区至少为16位。 (4)、`failIfMajorPerformanceCaveat`值为Boolean类型，指示如果系统性能较低，是否创建上下文。 (5)、`powerPreference`：对用户代理的提示，指示GPU的哪种配置适合WebGL上下文。可能的值是： `default`: 自动选择模式，自动决定哪种GPU配置最合适，为默认值。 `high-performance`: 高性能模式，优先考虑渲染性能而不是功耗。 `low-power`: 节能模式，优先考虑节能而不是渲染性能。 (6)、`premultipliedAlpha` 值为Boolean类型，表示页面合成器将假定绘图缓冲区包含具有预乘alpha的颜色。 (7)、`preserveDrawingBuffer` 值为Boolean类型，如果值为true，则不会清除缓冲区并保留其值，直到被清除或被使用者覆盖。 (8)、`stencil` 值为Boolean类型，表示绘图缓冲区具有至少8位的模板缓冲区。

## 绘制形状

在我们获得绘制上下文以后，就可以根据绘制上下文开始绘制一些基本的形状，比如：直线、三角形、矩形、圆弧和圆。接下来咱们具体实现一下。

### 直线

绘制直线咱们需要了解三个函数：

`moveTo(x, y)`：设置初始位置，参数为初始位置x和y的坐标点

`lineTo(x, y)`：绘制一条从初始位置到指定位置的直线，参数为指定位置x和y的坐标点

`stroke()`：通过线条来绘制图形轮廓

接下来咱们应用上面的三个函数来试着绘制一条直线，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制直线</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一条从起点（x: 50, y:50）到 另一个点（x: 200, y:200）的直线
      ctx.moveTo(50, 50);
      ctx.lineTo(200, 200);
      ctx.stroke();
    }
  </script>
</body>
</html>
```

为了展示的效果好一点，这里我调整了一下画布的大小：500 x 500，还给画布添加了一个阴影和圆角。得到的直线如图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OGY5MjI5YmYzODA4NzRiNzllODBlOWI4ZWNmYWUzOWZfaFFGVjFJd3p6VDFMNUg4S3BPaGxNNkNWSkN3MzFlSkNfVG9rZW46V2d3RmJwWldEb3gzb0N4a1pvYmNqQmFlbkJoXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### 三角形

知道了如何绘制一条直线，那么绘制三角形也就不难了，咱们只需要画三条直线拼在一起就是一个三角形了，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制三角形</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一个三角形
      ctx.moveTo(50, 50);
      ctx.lineTo(200, 200);
      ctx.lineTo(200, 50);
      ctx.lineTo(50, 50);
      ctx.stroke();
    }
  </script>
</body>
</html>
```

具体效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2RkZTQyNWQ1N2MzYTRkNDVmMjNjMjA0NzI1YTk5MDdfcnZHVVRHRjNXQWpidFJVV3ZvbEJWTGpZM1RRS1d0MUFfVG9rZW46WmxPQWJFemxQbzlpRDN4azNDY2NsQWVjbkNjXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### 矩形

知道了三角形的绘制，那么矩形的绘制是不是也用直线来拼凑呢？答案是否定的，矩形虽然可以用四条直线来拼凑成，但那样太复杂了，Canvas API 给提供了三种绘制矩形的方法：

- strokeRect(x, y, width, height) 绘制一个矩形的边框
- fillRect(x, y, width, height) 绘制一个填充的矩形
- clearRect(x, y, width, height) 清除指定矩形区域，让清除部分完全透明。

下面我们依次看一下他们有什么异同。

#### `strokeRect`

strokeRect(x, y, width, height) 是用来绘制一个矩形的边框，x和y 是矩形的起点坐标，width和height 是矩形的宽高。举个例子，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制矩形</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一个矩形边框
      ctx.strokeRect(50, 50, 200, 100);
    }
  </script>
</body>
</html>
```

如下图，strokeRect方法绘制的就是一个矩形框： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YjdlYzVhZDY4MWJhZDI2MTAyYmU5NmQ5YTAzNjJiOTlfdHI4WW5EalI3a1RRVjVUaEVTNzNWSUZ0VzNQZ3NRUkZfVG9rZW46VXIzRWI3anl0b29tT254bGhuY2M5akxEbkNiXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### `fillRect`

fillRect(x, y, width, height) 绘制一个填充的矩形，x和y 是矩形的起点坐标，width和height 是矩形的宽高。举个例子，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制矩形</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一个填充矩形
      ctx.fillRect(100, 100, 200, 100);
    }
  </script>
</body>
</html>
```

如下图，fillRect方法实现的是填充了一个矩形：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTY3NjI4OGU2Y2YyMjE1YTJhNDA5MmFkMWE5YzQ5ZDZfbzJ1OFlCaGJpNjNNVmtkMlRUY1JQQ0xqQk5iYUJhYzBfVG9rZW46QkRlMWJrTXY0b1NKSkF4TmMzOGNoU0tCbm1mXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### clearRect

clearRect(x, y, width, height) 清除指定矩形区域，让清除部分完全透明，x和y 是矩形的起点坐标，width和height 是矩形的宽高。这里需要结合结合另外两种画法来对比一下，才能看出具体的效果，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制矩形</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一个填充矩形
      ctx.fillRect(100, 100, 200, 100);
      ctx.fillRect(50, 50, 200, 100);
      ctx.clearRect(75, 75, 100, 70);
    }
  </script>
</body>
</html>
```

如下图，中间白色的矩形就是被指定清除的区域：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjI4NDEwNzFjMmNmNjI0ZmFmYTVhMDMyYzQyNjZmYWNfZlNhbkdaRUhISElTQVhaRHMzM29QVkY5MW9hQXl6eXpfVG9rZW46WXR0WGI1YlhRbzZISU94S0NYeWNPck1Gbk1mXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### 圆弧和圆

绘制圆弧或者圆，使用的方法是：arc(x, y, radius, startAngle, endAngle, anticlockwise)。x和Y为圆心的坐标，radius为半径，startAngle为圆弧或圆的开始位置，endAngle为圆弧或圆的结束位置，anticlockwise是绘制的方向（不写默认为false，从顺时针方向）。

下面画一个半圆弧看看效果，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制圆弧</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段圆弧
      ctx.arc(60, 60, 50, 0, Math.PI, false);
      ctx.stroke();
    }
  </script>
</body>
</html>
```

效果如下图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NGZkODhiYTUzMmU2Nzg5ZDE4OTA5Yzc4Y2FjMzYyNGVfcUN1UFlGSXptaEpGQ1BuaXhJRVJVQnlTVnJIS2tIVk1fVG9rZW46WEFVVmJJNDEwb3hNRnJ4cTc5SWNLYUtEbkliXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

这里需要注意的是：在画弧的时候，arc()函数中角的单位是弧度而不是角度。角度换算为弧度的表达式为：弧度=(Math.PI/180)*角度。

所以想要画一个圆的弧度就是：Math.PI*2，咱们继续画一个圆弧看一下，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制圆弧</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段圆弧
      ctx.arc(60, 60, 50, 0, Math.PI, false);
      ctx.stroke();
      // 绘制一个圆弧
      ctx.arc(200, 60, 50, 0, Math.PI*2, false);
      ctx.stroke();
    }
  </script>
</body>
</html>
```

但效果似乎不想我们想象的一样，如下图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjUwYWEzZjQzM2QzMzkzZmU5YjQ1MTkxZjQ5NjA3ZWJfcXN0d1FEU29Halh2dVFtbVRxVmpibldmRlVTUURGNWFfVG9rZW46Rmh2YWJQRExRbzZMeW14VmgwQWN3N2tYbmhnXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

如上图所示，先画的半圆弧和后画的圆弧被连在了一起，其实这是因为在咱们每次新建路径的时候都需要开启和闭合路径，这样不同路径之间才不会相互干扰。下面咱们就来介绍一下如何开启和闭合路径。

#### `beginPath`

新建一条路径，生成之后，图形绘制命令被指向到路径上。

#### `closePath`

闭合路径之后图形绘制命令又重新指向到上下文中。 具体怎么使用这两个函数呢？下面咱们介绍一下，直接上代码：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制圆弧</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段圆弧
      ctx.beginPath() // 开启路径
      ctx.arc(60, 60, 50, 0, Math.PI, false);
      ctx.stroke();
      ctx.closePath() // 闭合路径
      // 绘制一个圆弧
      ctx.beginPath() // 开启路径
      ctx.arc(200, 60, 50, 0, Math.PI*2, false);
      ctx.stroke();
      ctx.closePath() // 闭合路径
    }
  </script>
</body>
</html>
```

如上代码，咱们为每一条路径都设置了开启和闭合。那么看一下效果如何： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MTZiZTJiZTI4MmQzMDVkMzBjNjA4MmEyYjJjYTFhM2RfVWJuWVZvazA0OWt1M0JubEZ0OUFqNTFFeTJmR05VajJfVG9rZW46WFBTM2JZMTZab2NLMEp4ZTk1ZWMySW41bjJlXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

这里有一点需要说明一下，其实在咱们开启和关闭路径的时候，关闭路径其实并不是必须的，对于新路径其实每次都开启新路径就ok。

以上其实都是通过stroke方法来做描边，那么如果想填充有没有对应的方法呢？

#### `fill`

stroke方法是通过线条来绘制图形轮廓，而fill方法则是通过填充路径的内容区域生成实心的图形。

具体如何使用举个例子看一下。代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 填充</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段圆弧
      ctx.beginPath() // 开启路径
      ctx.arc(60, 60, 50, 0, Math.PI, false);
      ctx.stroke();
      // 绘制一个圆弧
      ctx.beginPath() // 开启路径
      ctx.arc(200, 60, 50, 0, Math.PI*2, false);
      ctx.stroke();
      // 填充一个四分之一圆弧
      ctx.beginPath() // 开启路径
      ctx.arc(60, 200, 50, 0, Math.PI/2, false);
      ctx.fill();
      // 填充一个半圆弧
      ctx.beginPath() // 开启路径
      ctx.arc(200, 200, 50, 0, Math.PI, false);
      ctx.fill();
      // 填充一个圆弧
      ctx.beginPath() // 开启路径
      ctx.arc(350, 200, 50, 0, Math.PI*2, false);
      ctx.fill();
    }
  </script>
</body>
</html>
```

效果如下图： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NDQ3ZThiNzEwODA1MmQ1MDMwYWE2MDVlNjFkZTY3N2NfakpBRENXRlRRaEx4MlJ6Sm5idlFaU25Qd3BDcVJScUpfVG9rZW46QnlPS2J5cEFCb2M2eER4V3UxWWNhYzh2bmpjXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### 椭圆

添加椭圆路径。

语法：`ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`

- x、y：椭圆的圆心位置
- radiusX、radiusY：x轴和y轴的半径
- rotation：椭圆的旋转角度，以弧度表示
- startAngle：开始绘制点
- endAngle：结束绘制点
- anticlockwise：绘制的方向（默认顺时针），可选参数。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 裁剪</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.ellipse(100, 150, 50, 100, 0, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(400, 150, 50, 100, 0, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(250, 350, 50, 100, Math.PI/2, 0, 2 * Math.PI); // 旋转90°
      ctx.fill();
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmVmNjQ3ODg3ZDZhYmQ1YWFlZjUwOTg2YTNmMjljZGNfak1oWHpCS2xYSGpEZ1o0cHlndHR3N3Q4YUR6QmJsYU5fVG9rZW46UVRPeWJNS1M2bzk4WnN4ZFZPNmNSRzNlbkJjXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### 贝塞尔曲线

贝塞尔曲线一般用来绘制复杂有规律的图形，在Canvas中也是一个十分有用的路径类型。

#### 二次贝塞尔曲线

语法：`quadraticCurveTo(cp1x, cp1y, x, y)`，其中cp1x和cp1y为一个控制点，x和y为结束点。

举个例子，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制二次贝塞尔曲线</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段二次贝塞尔曲线
      ctx.moveTo(50, 50);
      ctx.quadraticCurveTo(200, 200, 350, 50);
      // 绘制
      ctx.stroke();
    }
  </script>
</body>
</html>
```

得到的效果图如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MWYzOWYwOTM2MDIxMThmNDNkMDIyYzc0ZTg4NGQzMjlfZG5rSzlYR0ViMXJCZWtScENIR0gwemFzVzI1Y0NKSnJfVG9rZW46Rk9XZGI0cjM3b1JlaG14UDdGNWNUU3I5blRBXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

如上图，一段二次贝塞尔曲线是通过一个起点、终点和结束点来控制的。下面通过控制点的变化来看一下二次贝塞尔曲线的变化。

把控制点往左移100像素点，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制二次贝塞尔曲线</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段二次贝塞尔曲线
      ctx.beginPath() // 开启路径
      ctx.moveTo(50, 50);
      ctx.quadraticCurveTo(200, 200, 350, 50);
      // 绘制
      ctx.stroke();
      // 绘制一段二次贝塞尔曲线
      ctx.beginPath() // 开启路径
      ctx.moveTo(50, 250);
      ctx.quadraticCurveTo(100, 400, 350, 250);
      // 绘制
      ctx.stroke();
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzRlZWY5M2ZhODBjMjQ0YmFhYTAwNDQwYTIxMzQ4MGVfVjFXMW4yUlZ0Q0JVbm11dk8zRG9FU3BXaVF1ZEdNWlRfVG9rZW46UE4xMGJLTU85b0FjY3J4dWhBWGNZWHlIbmVmXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

这个其实可以借助一个网页版的[二次贝塞尔曲线调试工具](https://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)来看一下效果

暂时无法在飞书文档外展示此内容

#### 三次贝塞尔曲线

和二次贝塞尔曲线不同的是三次贝塞尔曲线有两个控制点。

语法：ctx.bezierCurveTo(cp1x,cp1y, cp2x,cp2y, x, y)，其中cp1x和cp1y为一个控制点，cp2x和cp2y为第二个控制点，x和y为结束点。

举个例子，代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制三次贝塞尔曲线</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段三次贝塞尔曲线
      ctx.beginPath() // 开启路径
      ctx.moveTo(50, 200);
      ctx.bezierCurveTo(150, 50, 250, 350, 350, 200);
      // 绘制
      ctx.stroke();
    }
  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTU4MjZiMzhjYzg3MDc3MDc3MzczMmQ2ZDlmMmQ3ZThfYmNubmhPbEFXR3NVdHJZV0NoNHVLY0FFQnZZNGEwSHNfVG9rZW46RzRjd2I1YjdRb0ppeXd4WW9TTmNRcEp1bjRlXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

这里也可以借助一个网页版的[三次贝塞尔曲线调试工具](https://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)来看一下效果：

暂时无法在飞书文档外展示此内容

## 绘制样式

在上面的图形绘制中都只是默认的样式。接下来说一下具体有哪些绘制样式。

### 线条的样式

线条的样式可以通过下面一系列属性来设置。

#### `lineWidth`

lineWidth 设置当前绘线的粗细。属性值必须为正数。默认值是 1.0。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制样式</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="300" height="300">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一条宽度为10的直线
      ctx.beginPath()
      ctx.lineWidth = 10;
      ctx.moveTo(50, 20);
      ctx.lineTo(250, 20);
      ctx.stroke();
      ctx.closePath();
      // 绘制一条宽度为20的直线
      ctx.beginPath()
      ctx.lineWidth = 20;
      ctx.moveTo(50, 50);
      ctx.lineTo(250, 50);
      ctx.stroke();
      ctx.closePath();
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjAxZTJmMmMzZWIxZGVjMGMzYjJjNDFhYWUzYjNlY2FfRG84ZzhWVXA4bmxUNGNiajZaVWRabW9OSlFMcjREdjRfVG9rZW46SmZHdWJwYnpib2FoNWt4SEIwOGNRZGY5bkdjXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### `lineCap`

lineCap 设置线段端点显示的样子。可选值为：butt，round 和 square。默认是 butt。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制样式</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="300" height="300">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // lineCap 值为 butt
      ctx.beginPath()
      ctx.lineWidth = 10;
      ctx.lineCap='butt'
      ctx.moveTo(50, 20);
      ctx.lineTo(250, 20);
      ctx.stroke();
      ctx.closePath();
      // lineCap 值为 round
      ctx.beginPath()
      ctx.lineWidth = 10;
      ctx.lineCap='round'
      ctx.moveTo(50, 50);
      ctx.lineTo(250, 50);
      ctx.stroke();
      ctx.closePath();
      // lineCap 值为 square
      ctx.beginPath()
      ctx.lineWidth = 10;
      ctx.lineCap='square'
      ctx.moveTo(50, 80);
      ctx.lineTo(250, 80);
      ctx.stroke();
      ctx.closePath();
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OGI5ZDk4M2UwYmFiNzE1OGRhMjRlNWRhMzdmOGU3ZTZfcVgzN1BHbndLMUVJRmtCZVV2Yk05V3hxV0JURGpCMU5fVG9rZW46STRWRWJaRXJab0pPMTV4NnpOVWNyT21oblJoXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### `lineJoin`

lineJoin 该属性可以设置两线段连接处所显示的样子。可选值为：round, bevel 和 miter。默认是 miter。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制样式</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="300" height="300">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // lineJoin 值为 miter
      ctx.beginPath()
      ctx.lineWidth = 10;
      ctx.lineJoin='miter'
      ctx.moveTo(50, 20);
      ctx.lineTo(100, 60);
      ctx.lineTo(150, 20);
      ctx.lineTo(200, 60);
      ctx.lineTo(250, 20);
      ctx.stroke();
      ctx.closePath();
      // lineJoin 值为 round
      ctx.beginPath()
      ctx.lineWidth = 10;
      ctx.lineJoin='round'
      ctx.moveTo(50, 100);
      ctx.lineTo(100, 140);
      ctx.lineTo(150, 100);
      ctx.lineTo(200, 140);
      ctx.lineTo(250, 100);
      ctx.stroke();
      ctx.closePath();
      // lineJoin 值为 bevel
      ctx.beginPath()
      ctx.lineWidth = 10;
      ctx.lineJoin='bevel'
      ctx.moveTo(50, 180);
      ctx.lineTo(100, 220);
      ctx.lineTo(150, 180);
      ctx.lineTo(200, 220);
      ctx.lineTo(250, 180);
      ctx.stroke();
      ctx.closePath();
    }
  </script>
</body>
</html>
```

效果为： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YjY0YTNiYWJhNDZhNmJmYzY1OGI5NjAzNDRlNTc4M2RfZ3B2WTlNOUpxN0ZyYndaUGhSN241eVpxTHFGWWZDUTRfVG9rZW46T2JKWmJGOXZCbzZ2b2J4MTU0UGN1eE1MbkpoXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### `miterLimit`

miterLimit 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。

如果交点距离大于miterLimit值，连接效果会变成了 lineJoin = bevel 的效果。

举个例子看一下

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制样式</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="300" height="300">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // miterLimit为定值，角度越大
      ctx.beginPath()
      ctx.lineWidth = 5;
      ctx.lineJoin='miter'
      ctx.miterLimit = 10
      ctx.moveTo(0, 100);
      for (i = 0; i < 30 ; i++) {
        var dy = i % 2 == 0 ? 200 : 100;
        ctx.lineTo(Math.pow(i, 1.5) * 2, dy);
      }
      ctx.stroke();
      ctx.closePath();
    }
  </script>
</body>
</html>
```

效果为：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NzVmZTUyMDM1YWY0Nzc1N2I2NWEzZWRkZTZmYTcyMGJfa3RIUEVJUVhwT1hkQjAzankyTnhTRm1sNUdvTVpKWkVfVG9rZW46VE16NmJaQ0hrb3lkRVd4czJoT2NmZjhxbmZkXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### `setLineDash/getLineDash`

setLineDash 可以设置当前虚线样式。

getLineDash 则是返回当前虚线设置的样式，长度为非负偶数的数组。

举个例子看一下

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制虚线</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一条虚线
      ctx.setLineDash([5, 10, 20]);
      console.log(ctx.getLineDash()); // [5, 10, 20, 5, 10, 20]
      ctx.beginPath();
      ctx.moveTo(0,100);
      ctx.lineTo(400, 100);
      ctx.stroke();
      // 再绘制一条虚线
      ctx.setLineDash([5, 10, 20, 40]);
      console.log(ctx.getLineDash()); // [5, 10, 20, 40]
      ctx.beginPath();
      ctx.moveTo(0,200);
      ctx.lineTo(400, 200);
      ctx.stroke();
    }
  </script>
</body>
</html>
```

先看效果再讲解，效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MTQ4N2EzNmY2NjVhMzdiOTQyNzE4NWFkMmQ2ODZhYzFfVzRJM2JtQjZsc3NoMURmQ1hHVlZHaTRoQWV6SGk4dUZfVG9rZW46UU1lcmJnRGFRb3VXSTV4TmdzVmNCdU5RbkRLXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

首先这里画两条虚线是想对比一下传参为奇数数组和偶数数组的区别，在我们设置虚线的时候，如果传参为奇数，例如：ctx.setLineDash([5, 10, 20])，那么 setLineDash 会复制一份数组补全为偶数，相当于我们设置的是：ctx.setLineDash([5, 10, 20, 5, 10, 20])。所以这也就是为什么上图中我们设置的是 [5, 10, 20]，结果打印出来是 [5, 10, 20, 5, 10, 20]

#### `lineDashOffset`

lineDashOffset 设置虚线样式的起始偏移量。

这里咱们再画第三条虚线来对比一下

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制虚线</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一段圆弧
      ctx.setLineDash([5, 10, 20]);
      console.log(ctx.getLineDash()); // [5, 10, 20, 5, 10, 20]
      ctx.beginPath();
      ctx.moveTo(0,100);
      ctx.lineTo(400, 100);
      ctx.stroke();
      ctx.setLineDash([5, 10, 20, 40]);
      console.log(ctx.getLineDash()); // [5, 10, 20, 40]
      ctx.beginPath();
      ctx.moveTo(0,200);
      ctx.lineTo(400, 200);
      ctx.stroke();
      ctx.setLineDash([5, 10, 20, 40]);
      ctx.lineDashOffset = 3;
      ctx.beginPath();
      ctx.moveTo(0,300);
      ctx.lineTo(400, 300);
      ctx.stroke();
    }
  </script>
</body>
</html>
```

效果为： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MWYwZTk4YmUyN2I2ZGU3M2FkZTMwM2EzNWVkNjZlNDhfeW5tUEQyc1dEbGpQd2FkRnEwb0RiUlpOTVNqSnROOExfVG9rZW46V1BhSGJCYkdhb3d0ZHl4Y2FuZmNrR1VzbjdkXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

这里可以明显看出虚线的总长度没有变化，只是起始点向左位移了3像素。

### 透明度

除了绘制实色的图形，还可以绘制有透明度的图形。通过设置 globalAlpha 属性或者使用有透明度的样式作为轮廓或填充都可以实现

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 设置透明度</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一个矩形
      ctx.beginPath();
      // 指定透明度的填充样式
      ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
      ctx.fillRect(10,10,300,100);
      // 绘制一个矩形边框
      ctx.beginPath();
      // 指定透明度的描边样式
      ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
      ctx.strokeRect(10, 90, 100, 300);
      // 绘制一个圆
      ctx.beginPath()
      ctx.fillStyle = "rgba(255, 255, 0, 1)";
      // 设置透明度值
      ctx.globalAlpha = 0.5;
      ctx.arc(200, 200, 100, 0, Math.PI*2, true);
      ctx.fill();
    }
  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NDUxMTIzOWIxOGUwMDcxNjAxNWM2YTA2OTQ2MWRmNDVfR2xxZW5ubExFbXpoaTRMV01TeURVam9xQVNvT3hkbzZfVG9rZW46WlNxRGJNaFdKb0FLcUN4Wlo0d2NyMWlkbm9lXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### 渐变

渐变分为两种，分别是线性渐变和径向渐变，在绘图中我们可以用线性或者径向的渐变来填充或描边。

#### 线性渐变

语法： `createLinearGradient(x1, y1, x2, y2)`，参数分别为 起点的坐标和终点的坐标。

在渐变的设置中还需要一个方法来添加渐变的颜色，语法为：gradient.addColorStop(offset, color)，其中color就是颜色，offset 则是颜色的偏移值，只为0到1之间的数。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 渐变</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 创建渐变
      var gradient1 = ctx.createLinearGradient(10, 10, 400, 10);
      gradient1.addColorStop(0, "#00ff00");
      gradient1.addColorStop(1, "#ff0000");
      var gradient2 = ctx.createLinearGradient(10, 10, 400, 10);
      // 从0.5的位置才开始渐变
      gradient2.addColorStop(0.5, "#00ff00");
      gradient2.addColorStop(1, "#ff0000");
      ctx.beginPath()
      ctx.fillStyle = gradient1;
      ctx.fillRect(10, 10, 400, 100);
      ctx.beginPath();
      ctx.fillStyle = gradient2;
      ctx.fillRect(10, 150, 400, 100);
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=OWViMTNmY2UwN2YzODUwZTE3OWQ4N2RmYTg0MmVkNTZfQndTTzFyeWtuSUFvUlZPbGF0Zm5seGwyeWU3d0VEZDJfVG9rZW46SHFGTGJPTkhqb3VyQ1R4MlY1VGM3eUR6bk9lXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### 径向渐变

语法：`ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)`，参数分别为开始圆的坐标和半径以及结束圆的坐标和半径。

举个例子看一下：

```HTML
html
复制代码<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 渐变</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 创建渐变
      // 结束坐标为点
      var gradient1 = ctx.createRadialGradient(100, 100, 100, 100, 100, 0);
      gradient1.addColorStop(0, "#ff770f");
      gradient1.addColorStop(1, "#ffffff");
      // 结束坐标为半径30的圆
      var gradient2 = ctx.createRadialGradient(320, 100, 100, 320, 100, 30); 
      gradient2.addColorStop(0, "#ff770f");
      gradient2.addColorStop(1, "#ffffff");
      // 从0.5的位置才开始渲染
      var gradient3 = ctx.createRadialGradient(100, 320, 100, 100, 320, 0); 
      gradient3.addColorStop(0.5, "#ff770f"); 
      gradient3.addColorStop(1, "#ffffff");
      // 开始坐标和结束坐标不一样
      var gradient4 = ctx.createRadialGradient(320, 320, 100, 250, 250, 0);
      gradient4.addColorStop(0, "#ff770f");
      gradient4.addColorStop(1, "#ffffff");
      ctx.beginPath();
      ctx.fillStyle = gradient1;
      ctx.fillRect(10, 10, 200, 200);
      ctx.beginPath();
      ctx.fillStyle = gradient2;
      ctx.fillRect(220, 10, 200, 200);
      ctx.beginPath();
      ctx.fillStyle = gradient3;
      ctx.fillRect(10, 220, 200, 200);
      ctx.beginPath();
      ctx.fillStyle = gradient4;
      ctx.fillRect(220, 220, 200, 200);
    }

  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NzE2ZTIwMWUyN2I3NTFiYTQ0MTBkMTA1N2QzMjZkY2RfZGh3Q1YzUTV6UDBNMmxEbHpnUVIxd2hmQnJhRk9xME9fVG9rZW46UnlrdmJvalowb2RhMTN4YWswMWNoZFVTbkxmXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### 图案样式

Canvas中想绘制图案效果，需要用 createPattern 方法来实现。

语法：createPattern(image, type)，参数分别为：Image 参数可以是一个 Image 对象，也可以是一个 canvas 对象，Type 为图案绘制的类型，可用的类型分别有：repeat，repeat-x，repeat-y 和 no-repeat。

首先先看一下如何应用 Image 对象来绘制图案。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制图案</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 创建一个 image对象
      var img = new Image();
      img.src = "./image.png";
      img.onload = function() {
        // 图片加载完以后
        // 创建图案
        var ptrn = ctx.createPattern(img, 'no-repeat');
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, 500, 500);
      }
    }
  </script>
</body>
</html>
```

上面是一个用image对象绘制的例子，效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Njc5OTJkNzU0MzJlY2NjMzVmNjY2ZmRjZjFlNjAxMTBfa3FQdWlzblV5dkQzT2h4TTFCUDY0ZVJBNm1QTnFNdzJfVG9rZW46Rzdtc2IyS054b1FkODV4ZmEzSGM5ZEQ4bjliXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

从上面的代码我们可以看出，本来我们想填充的是一个500*500的长方形，但是因为咱们绘制的类型设置为不平铺（no-repeat）所以看到的效果不能让我们满意，那么咱们分别看看这四个类型分别是什么效果。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制图案</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 创建一个 image对象
      var img = new Image();
      img.src = "./image.png";
      img.onload = function() {
        // 图片加载完以后
        // 创建图案
        var ptrn = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, 500, 500);
      }
    }
  </script>
</body>
</html>
```

设置为平铺（repeat），效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NTVkN2RjNDhkNDZhZDYwYTY3NzRjYWI2MzljYzQ1NGJfVUFrT1c2SXViNTFNaXQ3TFlJQjlrQkJZVXlHUTM3NnJfVG9rZW46UzdDSWJQcUF1bzB1NWV4NFNWdWMzanhLbkpnXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

 这其实才是我们想要的效果，那么咱们再看看沿X轴平铺（repeat-x）和沿Y轴平铺（repeat-y）

效果分别是： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MTFjMGY0YmNjNGY4YWJlMjQ1NTFkMzYyOWFiOGIxNWRfblJuNmxaNTFlenZVWGxGMTlIRXB6UE03TTFCbGhCUWRfVG9rZW46TzlRQWJjdHRMb1lWR294RXo1OGNNSlVibkhlXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NjZmZDkyNTA4YjE1ZTU5MTA1ZDk5N2NhNWQ0ODAxODFfa2NFdG0wcXVCN21WbFh3VGJJcTFZUUZuYjVTS2FIZnhfVG9rZW46WmREdmJTc3hMb0x4Yld4VUUzc2N3c09lbmtjXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

最后看一下如何应用 canvas 对象来绘制图案。 举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制图案</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      margin-right: 50px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="200" height="200">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <canvas id="canvas2" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    var canvas2 = document.getElementById('canvas2');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext && canvas2.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var ctx2 = canvas2.getContext('2d');
      // 创建一个 canvas对象
      var img = new Image();
      img.src = "./image.png";
      img.onload = function() {
        // 图片加载完以后
        // 创建图案
        var ptrn = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, 200, 200);
        // 用canvas来绘制canvas2
        var ptrn2 = ctx2.createPattern(canvas, 'repeat');
        ctx2.fillStyle = ptrn2;
        ctx2.fillRect(0, 0, 500, 500);
      }
    }
  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDUzZWI0ZjhiNmM3ZjFmODA3MDVhZjM3NGQ5ODQ5YmVfa0d3TllGSWpROGtLWTVGTTlTc0hva2xVWjRvTGhxRENfVG9rZW46UmFYTGJUeWJLb2pYUXd4dmU1bWNIV2tVbk5mXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

上面的例子可以看出，canvas2是用canvas1来绘制图案的

## 绘制文本

canvas 中依旧提供了两种方法来渲染文本，一种是描边一种是填充。

### strokeText（描边）

语法：ctx.strokeText(text, x, y, maxWidth)参数分别为：

- text：绘制的文案
- x、y：文本的起始位置
- maxWidth：可选参数，最大宽度。需要注意的是当文案大于最大宽度时不是裁剪或者换行，而是缩小字体。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制文本</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.font = "50px serif"; // 设置文案大小和字体
      ctx.strokeText("Canvas 详解", 50, 50);
    }
  </script>
</body>
</html>
```

看一下效果： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmUyOGFmZjU2YjIxYjI1MmYxODAyNTQ3ZDA0MmE2ZWRfcUhHOU91NnVCeVhIcldWcW5kT01EUHdnZVl4ODFLeENfVG9rZW46RXgxamJKUnB1b2hGNjV4MEhadGN2WTA5bktoXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

### fillText（填充）

语法：ctx.fillText(text, x, y, maxWidth)参数分别为：

- text：绘制的文案
- x、y：文本的起始位置
- maxWidth：可选参数，最大宽度。需要注意的是当文案大于最大宽度时不是裁剪或者换行，而是缩小字体。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制文本</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.font = "50px serif"; // 设置文案大小和字体
      ctx.fillText("Canvas 详解", 50, 50);
    }
  </script>
</body>
</html>
```

### 文本样式

文本也是可以添加样式的，下面看一下可以设置那些样式

#### font

用于绘制文本的样式。默认的字体是 10px sans-serif。

#### textAlign

文本对齐的方式。可选值为：left、right、center、start和end。默认值是 start。

#### direction

文本的方向。可选值为：ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document 。）。默认值是 inherit。

需要注意的是 direction 属性会对 textAlign 属性产生影响。如果 direction 属性设置为 ltr，则textAlign属性的 left 和 start 的效果相同，right 和 end 的效果相同，如果 direction 属性设置为 rtl，则 textAlign属性的 left 和 end 的效果相同，right 和 start 的效果相同。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制图案</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      margin-right: 50px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="700">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.font = "30px serif"; // 设置文案大小和字体
      ctx.direction = "ltr"; // 文本方向从左向右
      ctx.textAlign = "left"; // 左对齐
      ctx.strokeText("Hi Canvas !", 150, 100);
      ctx.direction = "ltr"; // 文本方向从左向右
      ctx.textAlign = "center"; // 右对齐
      ctx.strokeText("Hi Canvas !", 150, 200);
      ctx.direction = "ltr"; // 文本方向从左向右
      ctx.textAlign = "right"; // 右对齐
      ctx.strokeText("Hi Canvas !", 150, 300);
      ctx.direction = "rtl"; // 文本方向从左向右
      ctx.textAlign = "left"; // 左对齐
      ctx.strokeText("Hi Canvas !", 150, 400);
      ctx.direction = "rtl"; // 文本方向从左向右
      ctx.textAlign = "center"; // 右对齐
      ctx.strokeText("Hi Canvas !", 150, 500);
      ctx.direction = "rtl"; // 文本方向从左向右
      ctx.textAlign = "right"; // 右对齐
      ctx.strokeText("Hi Canvas !", 150, 600);
    }
  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NzA1Njc4ZGNmODI2NDRmMTJiMzQzMzc1ZTk5Y2U0NDBfWTJGRlhQQkZWcUx1UlFETGhvdGlJMXlWR3ZVYW9LTHJfVG9rZW46U2RwTWJBcXA3b0hJOUh4b2xxVWNvVjNZbkxkXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### textBaseline

基线对齐选项，决定文字垂直方向的对齐方式。可选值为：top、hanging、middle、alphabetic、ideographic和bottom。默认值是 alphabetic。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制图案</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      margin-right: 50px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.font = "25px serif"; // 设置文案大小和字体
      ctx.strokeStyle = 'red';
      const baselines = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'];
      baselines.forEach(function (baseline, index) {
        ctx.textBaseline = baseline;
        let y = 60 + index * 60;
        ctx.beginPath();
        ctx.moveTo(10, y + 0.5);
        ctx.lineTo(500, y + 0.5);
        ctx.stroke();
        ctx.fillText('Hi Canvas, Welcome to my world! (' + baseline + ')', 10, y);
      });
    }
  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=M2M3MDA1NDc3OGViOGUxZGE4ZmMyOTY3ZjM2OGJmMmNfOUcxQjcyZUdaNHZvT0tqNXBaTGtseFBrWXlVWnFHRU9fVG9rZW46VlVUNmJsemFFb0N2Y1V4aU10QWNpZ25tbkNoXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

#### measureText

测量文本，返回一个 TextMetrics对象。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制图案</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      margin-right: 50px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.font = "30px serif"; // 设置文案大小和字体
      ctx.beginPath();
      ctx.strokeText("Hi Canvas !", 150, 100);
      var text = ctx.measureText("Hi Canvas !");
      console.log("🚀 ~ 文案宽度：", text.width)
      ctx.beginPath();
      // 设置了文案最大宽度
      ctx.strokeText("Hi Canvas !", 150, 200, 100);
      var text1 = ctx.measureText("Hi Canvas !");
      console.log("🚀 ~ 文案宽度：", text1.width)
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NDY1ZmY5NGM2ZWIxYTU0ZDczZTdiMWVjNWM5YzczNzBfWnFMTWpBVGt6ck9xaUxDVklQTkZLYTllQzNta05rQ0RfVG9rZW46R08wUWI4dk53b3pvakd4NkRPR2NGTktBbjNUXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

如上面的效果可以看出，返回的 TextMetrics对象不受最大宽度等外界因素所影响。

那么TextMetrics对象具体有哪些属性？打印看一下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NzFlZTUzYjZiNzQ0MzExNTJiZWZkNzVkYTY4YWRiOWZfcWhWdmtMaWVRSjZ1Qk0xSXV6ZnRXNDBVRExHcnZickFfVG9rZW46RTRmcmJWRmNrb1JOSzF4c3hrb2NNdXBhbmZiXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

属性解析：

- TextMetrics.width：基于当前上下文字体，计算内联字符串的宽度。
- TextMetrics.actualBoundingBoxLeft：从 textAlign 属性确定的对齐点到文本矩形边界左侧的距离，使用 CSS 像素计算；正值表示文本矩形边界左侧在该对齐点的左侧。
- TextMetrics.actualBoundingBoxRight：从 textAlign 属性确定的对齐点到文本矩形边界右侧的距离。
- TextMetrics.fontBoundingBoxAscent：从 textBaseline 属性标明的水平线到渲染文本的所有字体的矩形最高边界顶部的距离。
- TextMetrics.fontBoundingBoxDescent：从 textBaseline 属性标明的水平线到渲染文本的所有字体的矩形边界最底部的距离。
- TextMetrics.actualBoundingBoxAscent：从 textBaseline 属性标明的水平线到渲染文本的矩形边界顶部的距离。
- TextMetrics.actualBoundingBoxDescent：从 textBaseline 属性标明的水平线到渲染文本的矩形边界底部的距离。
- TextMetrics.emHeightAscent：从 textBaseline 属性标明的水平线到线框中 em 方块顶部的距离。
- TextMetrics.emHeightDescent：从 textBaseline 属性标明的水平线到线框中 em 方块底部的距离。
- TextMetrics.hangingBaseline：从 textBaseline 属性标明的水平线到线框的 hanging 基线的距离。
- TextMetrics.alphabeticBaseline：从 textBaseline 属性标明的水平线到线框的 alphabetic 基线的距离。
- TextMetrics.ideographicBaseline：从 textBaseline 属性标明的水平线到线框的 ideographic 基线的距离。

PS：以上所有属性都是使用 CSS 像素计算的，并且都是只读。

### 阴影

#### shadowOffsetX、shadowOffsetY

shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

#### shadowBlur

shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。

#### shadowColor

shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 阴影</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.font = "50px serif"; // 设置文案大小和字体
      ctx.shadowColor = "#cccccc"; //  设置阴影颜色
      ctx.fillStyle = "#ee7934"; //  设置填充颜色
      ctx.shadowOffsetX = 10; // X轴上的阴影
      ctx.shadowOffsetY = 10; // Y轴上的阴影
      ctx.shadowBlur = 5; // 阴影的模糊程度
      ctx.fillText("Hi Canvas !", 100, 50);
      ctx.fillRect(100, 100, 200, 100);
      ctx.shadowOffsetX = -10;
      ctx.shadowOffsetY = -10;
      ctx.shadowBlur = 5;
      ctx.fillText("Hi Canvas !", 100, 300);
      ctx.fillRect(100, 350, 200, 100);
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQ1MWFkYTM2M2QzNTAyM2VkOTRjNGFjNzkzY2JhNWJfVXdzSE1kQ0ZvUG5sSHdkcngwcHREbjV1OElxU1pTbGpfVG9rZW46VDZyRGJnUEFTb2g4Q0d4d0lEM2N5OFVybldiXzE3MTU2NTY5Mjk6MTcxNTY2MDUyOV9WNA)

## 绘制图片

绘制图片和上面的图案样式绘制基本大同小异，不同的是所用方式不一样，绘制图片是使用 drawImage 方法将它渲染到 canvas 里。

### drawImage

这里咱们主要要说的就是drawImage方法的使用，他的用法有三种，是根据不同的传参实现不同的功能。先看看都有哪些参数：

- image：绘制到上下文的元素。
- sx、sy：裁剪框的左上角X轴坐标和Y轴坐标。
- sWidth、sHeight：裁剪框的宽度和高度。
- dx、dy：绘制到上下文的元素，在上下文中左上角的X轴坐标和Y轴坐标。
- dWidth、dHeight：绘制到上下文的元素，在上下文中绘制的宽度和高度。如果不说明，在绘制时image宽度和高度不会缩放。

#### 绘制

drawImage(image, dx, dy)：只有单纯的绘制功能，可以绘制图片、视频和别的Canvas对象等。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制 - drawImage</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191212%2F556cc408058d4c64a46468761406afe6.png&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660103116&t=8dd0c641e1e1890fa65ee80dfa428d34';
        img.onload = function(){
          ctx.drawImage(img, 0, 0);
        }
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzA5ZTIyNzFiYzA4NTk2YWUwZTQzNGFjNWU2ZmU3MDJfNGprNWNBU20xZTM4N2o4U2VhcDA3blRGMmRZNG44N0VfVG9rZW46TW9VVmJSSkdQb3k1akp4ekYwdmNqR1VvbnJkXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

如上图所示，咱们可以简单地把一个图片绘制到Canvas中。但上面的效果却不是我们预期中的效果，那么如果我们想把图片完整的绘制到canvas中，我们就需要别的参数。

#### 缩放

drawImage(image, dx, dy, dWidth, dHeight)：在绘制的基础上我们又增加了两个参数，这两个参数能控制绘制元素的大小，整体实现一个缩放的效果。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制 - drawImage</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191212%2F556cc408058d4c64a46468761406afe6.png&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660103116&t=8dd0c641e1e1890fa65ee80dfa428d34';
        img.onload = function(){
          ctx.drawImage(img, 0, 0, 500, 500);
        }
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDBjZmU0OWFjZWMxYzExMDRjNjRhNWE3ZWJhOWRiMjNfcENtQlpSOHVXY29NSHJUcHdxR2Y5cDQwcjUyZGh3dW5fVG9rZW46VlhscWJJVGxUb1FqaEV4NjA1QWM0UlQ2bnliXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

这里需要说明一点，在设置dWidth和dHeight两个参数时，不能只设置其中一个，要么都设置要么都不设置。

#### 裁剪

drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)：在缩放的基础上又增加了四个参数，整体也是在缩放的基础上增加了裁剪的功能。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制 - drawImage</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191212%2F556cc408058d4c64a46468761406afe6.png&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660103116&t=8dd0c641e1e1890fa65ee80dfa428d34';
      img.onload = function(){
        // 在图片的（100，100）位置，裁剪一个300*300大小的内容，然后缩放到500*500绘制到Canvas中（0, 0）的地方
        ctx.drawImage(img, 100, 100, 300, 300, 0, 0, 500, 500);
      }
    }
  </script>
</body>
</html>
```

上面代码其实就是：在原图片的（100，100）位置，裁剪一个300*300大小的内容，然后再缩放到500*500绘制到Canvas中（0, 0）的地方。

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Nzc3ZGI4YTYwNzdlZWZiZmJkZTAyMjAxN2VmNmQxOWFfTFZ3UURXVkJEajVkcVFpRzhVZW1seGZEOElDcEtIMERfVG9rZW46THhZRGJDMTN2bzFOdUJ4MU1WTGNsQnFJbkpnXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

## 变形

变形算是canvas基础的进阶把，它是一种更强大的方法，可以将原点移动到另一点，还能对网格进行旋转和缩放。

### 状态的保存和恢复

save() 和 restore() 方法是用来保存和恢复 canvas 状态的，方法不需要参数。可以理解为就是对canvas 状态的快照进行保存和恢复。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制 - drawImage</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#cccccc";
      ctx.fillRect(10, 10, 300, 100);
      ctx.save(); // 保存状态
      ctx.fillStyle = "#ee7034";
      ctx.fillRect(10, 150, 300, 100);
      ctx.restore(); // 还原到上次保存的状态
      ctx.fillRect(10, 300, 300, 100);
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTY0YTBlNzI0NWVjNGI3YjY2ODVlODQyNzMwNjY0NjZfdDlTdXFMc2FrcGU0WjRzQk1HNGRqTVFyNkUwc3I2ZGNfVG9rZW46QlVHa2JyblIyb21GYzV4V0xIQmN1RjRxbm1jXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

如上图效果我们可以看出，当我们保存一个状态以后，在我们恢复以后可以继续使用这个状态。

Canvas的状态是存储在栈中的，每次调用save()方法后，当前的状态都会被推送到栈中保存起来。

一个绘画状态包括：

- 应用的变形：移动、旋转、缩放、strokeStyle、fillStyle、globalAlpha、lineWidth、lineCap、lineJoin、miterLimit、lineDashOffset、shadowOffsetX、shadowOffsetY、shadowBlur、shadowColor、globalCompositeOperation、font、textAlign、textBaseline、direction、imageSmoothingEnabled等。
- 应用的裁切路径：clipping path

PS：保存和恢复可以多次调用， 需要注意的是每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

### 移动、旋转和缩放

- 移动：translate(x, y) ，x 是左右偏移量，y 是上下偏移量。
- 旋转：rotate(angle)，angle是旋转的角度，它是顺时针旋转，以弧度为单位的值。
- 缩放：scale(x, y)，x 为水平缩放的值，y 为垂直缩放得值。x和y的值小于1则为缩小，大于1则为放大。默认值为 1。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制 - drawImage</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ee7034';
      ctx.save();
      ctx.save();
      ctx.translate(100, 100); // x和y轴都移动了100
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();
      ctx.rotate(Math.PI / 4); // 旋转了45度，Math.PI=180度
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();
      ctx.scale(2, 1);
      ctx.fillRect(100, 300, 100, 100);
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MzhmNGZlMmE5ZDlmN2Q2MGNmYTM5NTdlMDk1NDE5MzBfNTc0YjV0T0k0YVpFS3NCcGNVT1c1Q2NMZ1lkb25tTDVfVG9rZW46UGdFc2JnWTJYb3AwOWx4ZlhmSmM2dTd3bjNjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

PS：这里需要注意三点： save()保存的状态是可以多次保存的，同时保存在栈中的元素遵循的是后进先出的顺序； 旋转的中心点始终是 canvas 的原点； 缩放如果是负值的话，则是一个镜像的效果。

### transform、setTransform、resetTransform

- transform(a, b, c, d, e, f)方法能将当前的变形矩阵乘上一个基于自身参数的矩阵；
- setTransform(a, b, c, d, e, f)方法会将当前变形矩阵重置为单位矩阵，然后用相同的参数调用 transform 方法
- resetTransform()方法为重置当前变形为单位矩阵。效果等同于调用 setTransform(1, 0, 0, 1, 0, 0)

需要注意的是transform方法和setTransform方法中如果任意一个参数是无限大（Infinity），那么变形矩阵也必须被标记为无限大，否则会抛出异常。

参数说明：

- a：水平方向的缩放
- b：竖直方向的倾斜偏移
- c：水平方向的倾斜偏移
- d：竖直方向的缩放
- e：水平方向的移动
- f：竖直方向的移动

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制 - drawImage</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 
      var sin = Math.sin(Math.PI / 6);
      var cos = Math.cos(Math.PI / 6);
      console.log("🚀 ~ cos, sin", cos, sin)
      ctx.translate(250, 250);
      var c = 0;
      for (var i=0; i <= 12; i++) {
        c = Math.floor(255 / 12 * i);
        ctx.fillStyle = `rgba(${c}, ${c}, ${c})`;
        ctx.beginPath() // 开启路径
        ctx.arc(60, 100, 100, 0, Math.PI*2, false);
        ctx.fill();
        ctx.transform(cos, sin, -sin, cos, 0, 0);
      }
      // 绘制一个矩形
      ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
      ctx.fillRect(0, 50, 100, 100);
      // 上面绘制的矩形不是我们想要的没因为它带上了上面transform的属性
      // 所以需要重置当前变形为单位矩阵
      ctx.resetTransform()
      ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
      ctx.fillRect(0, 50, 100, 100);
    }
  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGRiMTljYzc3OTJjMDE1MDA0NGVmYWY2YzcwZDExNTFfVmR1RllWSzB1TWN2WjJldnFVdFZYTzdNUkFHUXpiWkNfVG9rZW46SG4zTGI3elNab3lNUlF4SVNiNGM3cmt2bjliXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

## 合成与裁剪

### 合成

合成的图形受限于绘制的顺序。如果我们不想受限于绘制的顺序，那么我们可以利用 globalCompositeOperation 属性来改变这种情况。

语法：globalCompositeOperation = type，type为合成的类型，具体有哪些类型下面我们将分别看一下：

#### source-over

默认值，在现有画布上下文之上绘制新图形。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 绘制 - drawImage</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      ctx.fillRect(50, 100, 300, 150);
      ctx.globalCompositeOperation = 'source-over'
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 255, 0, 1)";
      ctx.fillRect(50, 150, 150, 250);
      ctx.globalCompositeOperation = 'source-over'
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 255, 1)";
      ctx.fillRect(150, 200, 150, 150);
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YjEwMWE2MTdhNzI0YWZlMGY4ZjA4Y2RiMTg4MGNlODVfZGh6SnZDZ3dudmJzVnJlYmpyTXhvbHpwNlNJcUNuYmpfVG9rZW46WGh1QWJQVnpxb0VndHJ4S3JpemNtNnhQbkxnXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### source-in

新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。

```JavaScript
ctx.globalCompositeOperation = 'source-in'
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGQ2YTI3MmYwNGRjYWRmOWYyY2YxYTA0NjA5NmZiNGJfMU5nbEtjVmY0cGp2OTlCZnRXb3NoeTVFSWViTHlrQzRfVG9rZW46QlRFa2I3VW1Ub2J4UUx4SkY3NmNFbHNqbjBmXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### source-out

在不与现有画布内容重叠的地方绘制新图形。

```JavaScript
ctx.globalCompositeOperation = 'source-out'
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MTExNTQ2NjM5YzhkNmY1YzIxNzQxZTJhNWJkMjkwY2JfWWJ4eVZhNkM5UzQxSUc3RVh4bmZXclhaTjZEdFh5YkdfVG9rZW46SkZDbWI0UEVXb3NkYjJ4d1BhUGM1a3cwbkNkXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### source-atop

新图形只在与现有画布内容重叠的地方绘制。

```JavaScript
ctx.globalCompositeOperation = 'source-atop'
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjhjOWZkOTM4ZjlkZjYwOTE1NmVkNGI4YTBjZWIyM2RfMWI1Tm1mS1daSHN0d1VwYkJwazU4WlROdnRVNHg3em5fVG9rZW46RWtjNGJVUEtYb3p2ZEl4Y3pCR2M4Q3RybnVjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### destination-over

在现有的画布内容后面绘制新的图形。

```JavaScript
ctx.globalCompositeOperation = 'destination-over'
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MzVjNjVlMWJkZDEwNGE4ZDNlOTBlMDBjYjZiZjJhNjRfaXdkdE81cnNDeHpUdDBUSGpudWRWTktCcUF3ZmFWVFFfVG9rZW46Tndzb2JHUFNjbzdyekF4dU81M2NrMThjbjNjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### destination-in

现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。

```JavaScript
ctx.globalCompositeOperation = 'destination-in'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGE5NmY1YWU3ZTA5OWM4ZjM4ZjlhZGFlNTVlNDE1ODRfb3RtTFZRQUh4cVA0aDJtVFhUeHZnZ29sVThVM0dPTThfVG9rZW46WThDOWJad1Zhb3NFVkd4c2RUcWM2SzJ3bnJnXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### destination-out

现有内容保持在新图形不重叠的地方。

```JavaScript
ctx.globalCompositeOperation = 'destination-out'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzEyOWE2MWUxNDIxZTEwZWQzYjhkZTEzY2E4NzUwNzJfb0FIWk1aVXUxcmwwek1Qd1NWc1JRM1ZBZURsTFlET1dfVG9rZW46RWpnNWJ2a0h5b3NFbmZ4ZGxHa2NxOUhjbm5lXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### destination-atop

现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。

```JavaScript
ctx.globalCompositeOperation = 'destination-atop'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MmVlZmI1MmVmNTYzN2U4ZmMxMDhmMTc4ODUyYzc0MDdfQXRjMng1TXBNaTVieTdxbzc5WG1TNEhrb0VqZ29ianhfVG9rZW46WUttemJQSWpSb0VUYnh4dU5kcWNwUk81blZiXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### lighter

两个重叠图形的颜色是通过颜色值相加来确定的。

```JavaScript
ctx.globalCompositeOperation = 'lighter'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MGI2YmVhYTZkMTYyZmI3NGVlNGQ0NzNiNTRmNzJlYmFfcFRMUW1xWG85enoxckRmM3o1OHlTVDNFTkE2MUNIY1dfVG9rZW46SkxLZ2I2dnZOb0YzMXl4YU9vSWNYY3AxbndlXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### copy

只显示新图形。

```JavaScript
ctx.globalCompositeOperation = 'copy'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2FmMGUzZWVjZjhjYWNjNzNmYTNjYzExOTRmNmYyODFfRjhRb0ZjSWxmdU90TG1wcXRweFNqbGozMEhPRGNxT1hfVG9rZW46SVR2emJhRUxNb3lKQ1B4SU9rdGNWR1diblJoXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### xor

图像中，那些重叠和正常绘制之外的其他地方是透明的。

```JavaScript
ctx.globalCompositeOperation = 'xor'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjdkMGNiOGRkNjVjMWI0MWFmY2QyZjQyYTFkOGI4OTlfemhLTm5JR1M1blBpUTRrRUV6eXlpdTNHemlkTTJkRUpfVG9rZW46VmpaYWJHWkU1b2Rjeld4S3IxcWN0SjEwbmw5XzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### multiply

将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。

```JavaScript
ctx.globalCompositeOperation = 'multiply'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjYxYmM5M2JlOTA0MmZmNmM5MjYzOTBlMjlkNDQ3NTNfMWl0eFdxbmZScWNCN2hOb3I4Q2dYODQ2VXdXSjl2Z21fVG9rZW46VWpmTWJLN2t6bzZndE94akcwQWNEM3R5bm9jXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### screen

像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。

```JavaScript
ctx.globalCompositeOperation = 'screen'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGUwMTM3MWU5YjZlYjkwN2I3YzZlYmEyMjU3NTNiZjJfbmx6NDVtQ1ZnTVFyWE1rcVVMSHptc2prSXFaQ0Y2S3BfVG9rZW46UFpTMmJOa0FHb1ViMGd4TENHVmMyb1pWbnBiXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### overlay

multiply 和 screen 的结合，原本暗的地方更暗，原本亮的地方更亮。

```JavaScript
ctx.globalCompositeOperation = 'overlay'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2ZlYzMwMWI2Yzc5Y2U5OGIwYThiYzNjYjMzNjhiNTlfRVNiZTQ2dVV0MVRyVXVCSFp2S1g2OVpnTVJHOHEzV0JfVG9rZW46QVM0NWJhY29Kb01XMmp4ZkVsTmN0Sjd1blFjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### darken

保留两个图层中最暗的像素。

```JavaScript
ctx.globalCompositeOperation = 'darken'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YjI0MTFmYWRmYWJjMWI1ZDEzMDliNzg4ZmJkMGZjMjJfaWM4NFozVUNYYjN2d2Z6VE1uN29PSXp4eEQ2MEVGWFZfVG9rZW46VmZjamJiYWtMb3NnWU94OUs5SGM5aUdVbndkXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### lighten

保留两个图层中最亮的像素。

```JavaScript
ctx.globalCompositeOperation = 'lighten'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NjNmNTc3MTBjMjI4NmFjNTQwOGZiM2IyZjlmMmRlYWVfRWZUOTBJZnJPSXczRk41eUttNmxDczlKaVIzTndJeWNfVG9rZW46RlBSZ2I1RzU2bzVYRlN4MXZMUGMzMFVObmdjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### color-dodge

将底层除以顶层的反置。

```JavaScript
ctx.globalCompositeOperation = 'color-dodge'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=NTI0ZjczNDZmNjBlZDdiNDMwODYwM2Y0NGJkNDY3YmZfMW9nQWVQcWhnblN6bjZ1b2dyM2U3bjc4NzRtandxRERfVG9rZW46SE50M2JjQ0t1b0xBUnF4QmRxSmNMbnVqbldjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### color-burn

将反置的底层除以顶层，然后将结果反过来。

```JavaScript
ctx.globalCompositeOperation = 'color-burn'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2U3MGJkNTcwNDBhOThkZDQzOTdiOGU1Njc2Njk2NThfY05Jem43bjJ6YU5mTFg2YkVBalZ0dG1mVUhoYjlTY3pfVG9rZW46RldYOWI0dFR5b2J6M3R4UlhLWmNZajlVbk9oXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### hard-light

屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了。

```JavaScript
ctx.globalCompositeOperation = 'hard-light'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=Njg3ZmJkY2Q3ZGU4Y2UyODhkZDE5NzY0N2RmMjk0NDJfRlVVenVXZ2FHNk11c3JKTlIyTU8wSDc2R2ZvTnBBUGlfVG9rZW46Tnpib2IzTVFKb3RBZHB4UVJ5QmNFZU9VbmtjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### soft-light

用顶层减去底层或者相反来得到一个正值。

```JavaScript
ctx.globalCompositeOperation = 'soft-light'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YTQ4NmZkMzE0NzdkMzQ0NGI2NjU3NDYxNThiOTZkMmZfUXRrNWVsYmFjRzFKdzAwaFVTM1NLdWt3eUhXQkFnWlhfVG9rZW46TlNvSGJkSVh5b0VzWGd4VjBzVmN6VnhDbmFnXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### difference

一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。

```JavaScript
ctx.globalCompositeOperation = 'difference'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YmUyZTYwN2I3NTcyZWM3MzcxYjU2MWIyOTQxNzA2NmJfbWRlekJONVI1Z3QzVmw5QjBFS1dtR3RJa2tEUUJPOVdfVG9rZW46TmtJTmJ6RFlyb0tMcWp4ZVpjNmM2alY4bnpkXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### exclusion

和 difference 相似，但对比度较低。

```JavaScript
ctx.globalCompositeOperation = 'exclusion'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzkwMTQ5MGU4OTE5YzQ4NDg5NzdjMGQwYzI3ZTYxNTZfTVNYb2hZakxNM1VKRHZ4bHp5NGNHNzNEMGRNdHVNU0NfVG9rZW46RzJwOGJEWjJIb3h2Y2F4d1BFY2M1V0hzbjllXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### hue

保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）。

```JavaScript
ctx.globalCompositeOperation = 'hue'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTgxY2MxMDdmMTA4Yzk2N2I0ZjlhNTVjOGRjZDQwZTZfRmFCY012S0NGYWg1WW9CV09JMEtzN1BGRHR4RXc0SmlfVG9rZW46RUNUbmIyS2Nob1BUVVJ4TDlQYmNJZGJpbnZjXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### saturation

保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）。

```JavaScript
ctx.globalCompositeOperation = 'saturation'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDk3M2YwNzA4OGJjNzhiZThlNTlhNWE2ZTY4OTk5M2VfWFF0RFlIdExwWGhreFlUV0V6d2g2VERKZ3RleXlaeGZfVG9rZW46TDhnN2JNYnBDb0NiVk94dFljbWNBa3JtbnhlXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### color

保留了底层的亮度（luma），同时采用了顶层的色调 (hue) 和色度 (chroma)。

```JavaScript
ctx.globalCompositeOperation = 'color'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MThiNWVkOTRmOTk0MjJiYTU1ZDY3ZDlmNDE3OGZjMzRfZjJHdGFidUVLNE1MTHEzN1hlV3JCemJGMHFaaXM5Q0tfVG9rZW46TTJFaWJmaEZlb2FCQlB4WUd4amNZMElOblpkXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### luminosity

保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）。

```Plaintext
ctx.globalCompositeOperation = 'luminosity'
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MjBiODU5NWUwNzg1M2Q3MzBjNDYxNTJlNGQ4OTUwZTRfM091S2ZxRnk3OGpYYjZjZ2UxbnpNV0U1SGs2NUNxUzZfVG9rZW46RlFFT2JyQmFlb29KMHZ4Z0FNZGNoSmpibjZiXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

### 裁剪

裁剪的作用是遮罩，用来隐藏不需要的部分，所有在路径以外的部分都不会在 canvas 上绘制出来。

裁剪的效果和 globalCompositeOperation 属性的 source-in 和 source-atop差不多，但也有区别，最重要的区别是裁剪路径不会在 canvas 上绘制东西，而且它永远不受新图形的影响。这些特性使得它在特定区域里绘制图形时特别好用。

语法：clip() 将当前正在构建的路径转换为当前的裁剪路径。

默认情况下，canvas 有一个与它自身一样大的裁剪路径（也就是没有裁剪效果）。现在可以通过clip()来创建一个裁剪路劲（也就有裁剪效果了）。

#### clip()

直接举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 裁剪</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191212%2F556cc408058d4c64a46468761406afe6.png&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660103116&t=8dd0c641e1e1890fa65ee80dfa428d34';
        img.onload = function(){
          // 创建圆形裁剪路径
          ctx.arc(250, 250, 200, 0, Math.PI*2, false);
          ctx.clip();
          // 创建完后绘制
          ctx.drawImage(img, 0, 0, 500, 500);
        }
    }
  </script>
</body>
</html>
```

效果如下：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MmE5ZGU1YTlhMWUwMTk3MTBjZGRiODc1YmVjYjc5NGJfNFNKMnNwU1hSRXhsQTlMN3hYTmVBU0sxTUNBa1JzTnpfVG9rZW46UDdOQ2JLaXB5b0FKc0l4MnFxcmM1TVhGbjNkXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

#### clip(path, fillRule)

- path为需要剪切的 Path2D 路径
- fillRule为判断是在路径内还是在路径外，允许的值有 nonzero（默认值）：非零环绕原则，evenodd：奇偶环绕原则

##### Path2D

Path2D 用来声明路径，语法：Path2D()，它是一个构造函数，可以创建一个新的 Path2D 对象。 Path2D()有不少方法，先了解一下：

- addPath()：添加一条新路径到对当前路径。
- closePath()：使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。 如果图形已经是封闭的或者只有一个点，那么此函数不会做任何操作。
- moveTo()：将一个新的子路径的起始点移动到 (x，y) 坐标。
- lineTo()：使用直线连接子路径的终点到 x, y 坐标。
- bezierCurveTo()：添加一条三次贝赛尔曲线到当前路径。 该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。
- quadraticCurveTo()：添加一条二次贝赛尔曲线到当前路径。
- arc()：添加一条圆弧路径。 圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
- arcTo()：根据控制点和半径添加一条圆弧路径，使用直线连接前一个点。
- ellipse()：添加一条椭圆路径。椭圆的圆心在（x,y）位置，半径分别是radiusX 和 radiusY ，按照anticlockwise （默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束。
- rect()：创建一条矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。

下面举例看一下如何应用 Path2D 来创建一个裁剪路径：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 裁剪</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191212%2F556cc408058d4c64a46468761406afe6.png&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660103116&t=8dd0c641e1e1890fa65ee80dfa428d34';
        img.onload = function(){
          // 创建圆形裁剪路径
          ctx.arc(250, 250, 200, 0, Math.PI*2, false);
          var path1 = new Path2D();
          path1.rect(100, 100, 300, 300);
          ctx.clip(path1);
          // 创建完后绘制
          ctx.drawImage(img, 0, 0, 500, 500);
        }
    }
  </script>
</body>
</html>
```

## 动画

在 canvas 上绘制内容是用 canvas 提供的或者自定义的方法，而通常我们仅仅在脚本执行结束后才能看见结果，所以想在 for 循环里面完成动画是不可能的。那么为了实现动画，我们需要一些可以定时执行重绘的方法。

- setInterval(function, delay) ：定时器，当设定好间隔时间后，function 会定期执行。
- setTimeout(function, delay)：延时器，在设定好的时间之后执行函数
- requestAnimationFrame(callback)：告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画。

如果不需要与用户互动，可以使用 setInterval() 方法，它可以定期执行指定的代码。如果需要做游戏，可以使用键盘或者鼠标事件配合上 setTimeout() 方法来实现。通过设置事件监听，可以捕捉用户的交互，并执行相应的动作。

下面我们采用 window.requestAnimationFrame()来实现一个动画效果。requestAnimationFrame()方法提供了更加平缓且有效率的方式来执行动画，当系统准备好重绘条件后才会调用绘制动画帧。一般每秒钟回调函数执行 60 次，也有可能会被降低，因为通常情况下requestAnimationFrame()方法会遵循 W3C 的建议，浏览器中的回调函数执行次数通常与浏览器屏幕刷新次数相匹配。还有为了提高性能和电池寿命，通常 requestAnimationFrame() 方法运行在后台标签页或者隐藏在 里时，requestAnimationFrame() 方法会暂停调用以提升性能和电池寿命。

举个例子看一下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 太阳系</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var sun = new Image();
      var moon = new Image();
      var earth = new Image();
      function init(){
        sun.src = 'https://img.lovepik.com/element/40097/4339.png_300.png';
        moon.src = 'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';
        earth.src = 'https://gd-filems.dancf.com/mcm79j/mcm79j/92054/b3162056-61ba-4ebd-8da1-fd98ce15a1cb31401764.png';
        window.requestAnimationFrame(draw);
      }
      function draw() {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        // 清空画布
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
        ctx.save(); // 第一次保存画布状态
        ctx.translate(250, 250); // 把原心移到画布中间
        // 画一个地球
        var time = new Date();
        var earthDeg =  ((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds()
        ctx.rotate(earthDeg);
        ctx.translate(200, 0);
        ctx.drawImage(earth, -20, -20, 40, 40);
        // 画一个月亮
        ctx.save(); // 第二次保存画布状态
        var moonDeg = ((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds() 
        ctx.rotate(moonDeg);
        ctx.translate(0, 40);
        ctx.drawImage(moon, -7.5, -7.5, 15, 15);
        // 恢复状态
        ctx.restore(); 
        ctx.restore();
        // 画一个地球运行的轨迹
        ctx.beginPath();
        ctx.arc(250, 250, 200, 0, Math.PI * 2, false);
        ctx.stroke();
        // 画一个太阳
        ctx.drawImage(sun, 0, 0, 500, 500);
        window.requestAnimationFrame(draw);
      }
      init();
    }
  </script>
</body>
</html>
```

效果如下：

暂时无法在飞书文档外展示此内容

总结一下绘制动画的基本步骤

- 清空 canvas：除非接下来要画的内容会完全充满 canvas（例如背景图），否则需要清空所有。最简单的做法就是用 clearRect 方法。
- 保存 canvas 状态：如果要改变 canvas 状态的设置（样式，变形之类的），之后又要在每画一帧之时都是原始状态的情况时，需要先保存一下。
- 绘制动画图形（animated shapes）
- 恢复 canvas 状态：如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

## 高级动画

高级动画就是在初级动画的基础上加上一些符合物理的运动，这样就能使我们的动画更生动而不是那么的呆板。 下面我们一步步来实现一个小球的自由落体的运动。

### 绘制小球

首先我们先绘制一个小球，直接上代码：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 动画</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var ball = {
        x: 100,
        y: 100,
        radius: 25,
        color: 'blue',
        draw: function() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      };
      ball.draw();
    }
  </script>
</body>
</html>
```

效果如下： 

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MmI3Y2UzNWQ0MDkyNzNjY2VmZmNjYTMxMWQwMDQwZDlfMEJ1emtjSHNUVHhFMzA5T3RycFBwb1JNWHFXUzJwWmpfVG9rZW46RWo1M2JDaVBCb0RiVmd4SkZBemNsemE5bmtFXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

### 速率

我们通过给小球添加速率矢量进行移动。这个依旧用requestAnimationFrame() 方法来实现，在每一帧里面，依旧用clear 清理掉之前帧里旧的圆形。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 裁剪</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var ball = {
        x: 100,
        y: 100,
        vx: 1,
        vy: 3,
        radius: 25,
        color: 'blue',
        draw: function() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      };
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        // 添加速率
        ball.x += ball.vx;
        ball.y += ball.vy;
       window.requestAnimationFrame(draw);
      }
      window.requestAnimationFrame(draw);
      ball.draw();
    }
  </script>
</body>
</html>
```

效果如下： 

暂时无法在飞书文档外展示此内容

### 边界

想让小球反弹那么我们就需要添加边界

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 裁剪</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var ball = {
        x: 100,
        y: 100,
        vx: 1,
        vy: 3,
        radius: 25,
        color: 'blue',
        draw: function() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      };
      function draw() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ball.draw();
        // 添加速率
        ball.x += ball.vx;
        ball.y += ball.vy;
        // 添加边界
        if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
          ball.vy = -ball.vy;
        }
        if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
          ball.vx = -ball.vx;
        }
       window.requestAnimationFrame(draw);
      }
      window.requestAnimationFrame(draw);
      ball.draw();
    }
  </script>
</body>
</html>
```

添加完边界的效果如下： 

暂时无法在飞书文档外展示此内容

### 加速度

为了让动作更真实，我们还需要加入加速度的处理。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 裁剪</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var ball = {
        x: 100,
        y: 100,
        vx: 1,
        vy: 3,
        radius: 25,
        color: 'blue',
        draw: function() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      };
      function draw() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ball.draw();
        // 添加加速度
        ball.vy *= .99;
        ball.vy += .25;
        // 添加速率
        ball.x += ball.vx;
        ball.y += ball.vy;
        // 添加边界
        if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
          ball.vy = -ball.vy;
        }
        if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
          ball.vx = -ball.vx;
        }
       window.requestAnimationFrame(draw);
      }
      window.requestAnimationFrame(draw);
      ball.draw();
    }
  </script>
</body>
</html>
```

效果如下： 

暂时无法在飞书文档外展示此内容

### 拖尾效果

加一个拖尾效果：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 裁剪</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="500" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var ball = {
        x: 100,
        y: 100,
        vx: 1,
        vy: 3,
        radius: 25,
        color: 'blue',
        draw: function() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      };
      function draw() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 用带透明度的矩形代替清空
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        // 添加加速度
        ball.vy *= .995;
        ball.vy += .15;
        // 添加速率
        ball.x += ball.vx;
        ball.y += ball.vy;
        // 添加边界
        if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
          ball.vy = -ball.vy;
        }
        if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
          ball.vx = -ball.vx;
        }
       window.requestAnimationFrame(draw);
      }
      window.requestAnimationFrame(draw);
      ball.draw();
    }
  </script>
</body>
</html>
```

效果如下：

暂时无法在飞书文档外展示此内容

# 实际应用

## 图片保存

### **toDataURL**

`toDataURL()`方法可以返回一个包含图片的`Data URL`。

`Data URL`也就是前缀为 `data:` 协议的URL，其允许内容创建者向文档中嵌入小文件。

语法： `toDataURL(type, encoderOptions)`

参数：

- type：`type`为图片格式，默认为`image/png`，也可指定为：`image/jpeg`、`image/webp`等格式
- encoderOptions：`encoderOptions`为图片的质量，默认值 `0.92`。在指定图片格式为 `image/jpeg` 或 `image/webp` 的情况下，可以从 `0` 到 `1` 的区间内选择图片的质量。如果不在这个范围内，则使用默认值 `0.92`。

```JavaScript
// 点击截图函数
function clickFn(){
  // 将canvas转换成base64的url
  let url = canvas.toDataURL("image/png"); 
  // 把Canvas 转化为图片
  Img.src = url;
  // 将base64转换为文件对象
  let arr = url.split(",")
  let mime = arr[0].match(/:(.*?);/)[1] // 此处得到的为文件类型
  let bstr = atob(arr[1]) // 此处将base64解码
  let n = bstr.length
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
  let file = new File([u8arr], "filename", { type: mime });
  // 将文件对象通过a标签下载
  let aDom = document.createElement("a"); // 创建一个 a 标签
  aDom.download = file.name; // 设置文件名
  let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
  aDom.href = href; // 放入href
  document.body.appendChild(aDom); // 将a标签插入 body
  aDom.click(); // 触发 a 标签的点击
  document.body.removeChild(aDom); // 移除刚才插入的 a 标签
  URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
};
```

整个保存为图片并下载的方法如上，其中的canvas就为之前的相册

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 保存并下载</title>
  <style>
    * { margin: 0; padding: 0; }
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      float: left;
    }
    img {
      width: 800px;
      height: 500px;
      float: right;
    }
    button {
      position: absolute;
      top: 550px;
      left: 50%;
      margin-left: -40px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="800"  height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <img id="img" src="" />
  <button id="btn">转化为图片且下载</button>
  <script>
    // 获取Canvas
    const canvas = document.getElementById('canvas');
    var Img = document.getElementById('img');
    var Btn = document.getElementById('btn');
    const width = canvas.width;
    const height = canvas.height;
    // 获取绘制上下文
    const ctx = canvas.getContext('2d'); 
    const images = [
      {
        name: "白月魁",
        url: "https://img1.baidu.com/it/u=4141276181,3458238270&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500"
      },
      {
        name: "鸣人",
        url: "https://img2.baidu.com/it/u=1548765981,166433699&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      },
      {
        name: "路飞",
        url: "https://img2.baidu.com/it/u=1700240772,3511789617&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      },
      {
        name: "哪吒",
        url: "https://img2.baidu.com/it/u=4044887937,3129736188&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=392",
      },
      {
        name: "千寻",
        url: "https://img1.baidu.com/it/u=3907076642,679964949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=293",
      },
    ];
    let imagesData = []
    let clickCoordinate = { x: 0, y: 0 }
    let target;
    images.forEach((item)=>{
      // 创建image元素
      const image = new Image()
      image.crossOrigin = "Anonymous";
      image.src = item.url;
      const name = item.name;
      image.onload = () => {
        // 控制宽度为200（等宽）
        const w = 200;
        // 高度按宽度200的比例缩放
        const h = 200 / image.width * image.height;
        const x = Math.random() * (width - w) ;
        const y = Math.random() * (height - h);
        const imageObj = { image, name, x, y, w, h }
        imagesData.push(imageObj)
        draw(imageObj)
      }
    })

    // 渲染图片
    function draw(imageObj) {
      ctx.drawImage(imageObj.image, imageObj.x, imageObj.y, imageObj.w, imageObj.h);
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.rect(imageObj.x, imageObj.y, imageObj.w, imageObj.h);
      ctx.stroke();
    }

    // 为canvas添加鼠标按下事件
    canvas.addEventListener("mousedown", mousedownFn, false)
    // 为按钮添加点击事件
    Btn.addEventListener("click", clickFn, false)
  
    // 鼠标按下触发的方法
    function mousedownFn(e) {
      // 获取元素按下时的坐标
      clickCoordinate.x = e.pageX - canvas.offsetLeft;
      clickCoordinate.y = e.pageY - canvas.offsetTop;
      // 判断选中的元素是哪一个
      checkElement()
      // 未选中元素则return
      if(target === undefined) return;
      // 为canvas添加鼠标移动和鼠标抬起事件
      canvas.addEventListener("mousemove", mousemoveFn, false)
      canvas.addEventListener("mouseup", mouseupFn, false)
    }

    // 鼠标移动触发
    function mousemoveFn(e) {
      const moveX = e.pageX
      const moveY = e.pageY
      // 计算移动元素的坐标
      imagesData[target].x = imagesData[target].x + ( moveX - clickCoordinate.x );
      imagesData[target].y = imagesData[target].y + ( moveY - clickCoordinate.y ); 
      // 清空画布
      ctx.clearRect(0, 0, width, height);
      // 清空画布以后重新绘制
      imagesData.forEach((i) => draw(i))
      // 赋值
      clickCoordinate.x = moveX; 
      clickCoordinate.y = moveY;
    }

    // 鼠标抬起触发
    function mouseupFn() {
      // 鼠标抬起以后移除事件
      canvas.removeEventListener("mousemove", mousemoveFn, false)
      canvas.removeEventListener("mouseup", mouseupFn, false)
      // 销毁选中元素
      target = undefined
    }

    // 检测选中的元素是哪一个
    function checkElement() {
      imagesData.forEach((item, index)=>{
        draw(item)
        if(ctx.isPointInPath(clickCoordinate.x, clickCoordinate.y)) {
          target = index
          console.log("点击的元素是：", item.name)
        }
      })
    }

    // 点击截图函数
    function clickFn(){
      // 将canvas转换成base64的url
      let url = canvas.toDataURL("image/png"); 
      // 把Canvas 转化为图片
      Img.src = url;
      // 将base64转换为文件对象
      let arr = url.split(",")
      let mime = arr[0].match(/:(.*?);/)[1] // 此处得到的为文件类型
      let bstr = atob(arr[1]) // 此处将base64解码
      let n = bstr.length
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
      let file = new File([u8arr], "filename", { type: mime });
      // 将文件对象通过a标签下载
      let aDom = document.createElement("a"); // 创建一个 a 标签
      aDom.download = file.name; // 设置文件名
      let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
      aDom.href = href; // 放入href
      document.body.appendChild(aDom); // 将a标签插入 body
      aDom.click(); // 触发 a 标签的点击
      document.body.removeChild(aDom); // 移除刚才插入的 a 标签
      URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
    };

  </script>
</body>
</html>
```

暂时无法在飞书文档外展示此内容

## 主题（滤镜）

滤镜大家应该比较熟悉，尤其女生应该会更加熟悉，比如每次拍照完成以后 P图 不！应该说修图的时候，我们都会换各种主题（滤镜），比如说暖色、冷色、复古等等。而这些主题就可以用滤镜来实现。下面我们来实现个简单的例子看一下。

实现滤镜的方式有很多种方式，这里既然咱们介绍的是canvas的应用，那么就用canvas的方式来实现看看。

具体实现我们可以遍历所有像素然后改变他们的数值，再将被修改的像素数组通过 `putImageData()` 方法放回到画布中去，以达到`反相颜色`。

**所需方法：**

首先我们需要知道在制作主题的案例中，我们需要用到哪些方法？

### **getImageData()**

`getImageData()`方法可以返回一个`ImageData`对象。

```
ImageData`对象用来描述`canvas`区域隐含的像素数据，此区域通过矩形表示，起始点为`(sx, sy)`、宽为`sw`、高为`sh
```

语法： `getImageData(sx, sy, sw, sh)`

参数：

- sx：将要被提取的图像数据矩形区域的左上角 x 坐标。
- sy：将要被提取的图像数据矩形区域的左上角 y 坐标。
- sw：将要被提取的图像数据矩形区域的宽度。
- sh：将要被提取的图像数据矩形区域的高度。

### **putImageData()**

`putImageData()`方法和`getImageData()`方法正好相反，可以将数据从已有的`ImageData`对象绘制为位图。如果提供了一个绘制过的矩形，则只绘制该矩形的像素。

语法： `putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)`

参数：

- ImageData：包含像素值的数组对象。
- dx：源图像数据在目标画布中 x 轴方向的偏移量。
- dy：源图像数据在目标画布中 y 轴方向的偏移量。
- dirtyX：可选参数，在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
- dirtyY：可选参数，在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
- dirtyWidth：可选参数，在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
- dirtyHeight：可选参数，在源图像数据中，矩形区域的高度。默认是图像数据的高度。

知道了这两个方法以后，下面我们简单编写两个方法来做两个主题（滤镜）效果。

#### **黑白主题**

黑白主题咱们用一个：`blackWhite`函数来实现，具体是减掉颜色的最大色值255来实现

代码如下：

```JavaScript
const blackWhite = function() {
    ctx.drawImage(img, 0, 0, 450, 800);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};
```

#### **曝光主题**

曝光主题咱们用一个：`exposure`函数来实现，具体是用红绿和蓝的平均值来实现

代码如下：

```JavaScript
const exposure = function() {
    ctx.drawImage(img, 0, 0, 450, 800);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = 255 - data[i];     // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};
```

例子

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 主题</title>
  <style>
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="450" height="800">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <div class="btnBox">
     <button id="original">还原</button>
     <button id="blackWhite">黑白主题</button>
     <button id="exposure">曝光主题</button>
  </div>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    var originalEl = document.getElementById('original');
    var blackWhiteEl = document.getElementById('blackWhite');
    var exposureEl = document.getElementById('exposure');
    var sepiaEl = document.getElementById('sepia');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = 'https://img1.baidu.com/it/u=4141276181,3458238270&fm=253&fmt=auto&app=138&f=JPEG';
      img.onload = function() {
        ctx.drawImage(img, 0, 0, 450, 800);
      };
      var original = function() {
        ctx.drawImage(img, 0, 0, 450, 800);
      };
      var exposure = function() {
        ctx.drawImage(img, 0, 0, 450, 800);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
          data[i]     = 255 - data[i];     // red
          data[i + 1] = 255 - data[i + 1]; // green
          data[i + 2] = 255 - data[i + 2]; // blue
        }
        ctx.putImageData(imageData, 0, 0);
      };

      var blackWhite = function() {
        ctx.drawImage(img, 0, 0, 450, 800);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
          var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i]     = avg; // red
          data[i + 1] = avg; // green
          data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
      };
      originalEl.addEventListener("click", function(evt) {
        original()
      })
      blackWhiteEl.addEventListener("click", function(evt) {
        blackWhite()
      })
      exposureEl.addEventListener("click", function(evt) {
        exposure()
      })
    }
  </script>
</body>
</html>
```

我们看一下具体效果：

暂时无法在飞书文档外展示此内容

## 拾色器

拾色器也是比较常见的一个案例，尤其在现在很多在线编辑的项目中很常见。

**所需方法：**

拾色器案例用的方法还是上面我们介绍过的`getImageData()`方法。这里就不再赘述，记不得了可以返回去看看😄。

需要补充的是：`getImageData()`方法会返回一个 `ImageData`对象，它是画布区域的数据，画布的四个角分别表示为 (left, top)、(left + width, top)、(left, top + height)和(left + width, top + height) 四个点。这四个坐标点被设定为画布坐标空间元素。

接下来我们再用`getImageData()`方法做一个拾色器

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 拾色器</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
    div {
      width: 430px;
      height: 30px;
      color: #fff;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      line-height: 30px;
      padding: 10px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="450" height="800">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <div id="hovered"></div>
  <div id="selected"></div>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = 'https://img1.baidu.com/it/u=4141276181,3458238270&fm=253&fmt=auto&app=138&f=JPEG';
      img.onload = function() {
        ctx.drawImage(img, 0, 0, 450, 800);
        img.style.display = 'none';
      };
      var hoveredColor = document.getElementById('hovered');
      var selectedColor = document.getElementById('selected');
      
      canvas.addEventListener('mousemove', function(event) {
        pickColor('move', event, hoveredColor);
      });
      canvas.addEventListener('click', function(event) {
        pickColor('click', event, selectedColor);
      });

      function pickColor(type, event, destination) {
        var x = event.layerX;
        var y = event.layerY;
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        destination.style.background = rgba;
        if(type === 'move') {
          destination.textContent = "划过的颜色为：" + rgba;
        } else {
          destination.textContent = "选中的颜色为：" + rgba;
        }
        return rgba;
      }
    }
  </script>
</body>
</html>
```

暂时无法在飞书文档外展示此内容

## 签名

签名也是比较常见的案例，在各大银行的app上基本都有，还有一些桌面应用上也是比较常见的，但这个案例的实现难度确比较低，具体有多简单咱们直接看代码吧。

具体代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 签名</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
        box-shadow: 0px 0px 5px #ccc;
        border-radius: 8px;
    }
    div {
        width: 450px;
        box-shadow: 0px 0px 5px #ccc;
        border-radius: 8px;
        text-align: center;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="450" height="300">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <div id="clear">清空画布</div>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    var clear = document.getElementById('clear');
    const ctx = canvas.getContext("2d");
    canvas.addEventListener('mouseenter', () => {
        canvas.addEventListener('mousedown', (e) => {
            ctx.beginPath()
            ctx.moveTo(e.offsetX, e.offsetY)
            canvas.addEventListener('mousemove', draw)
        })
        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', draw)
        })
    })
    function draw(e) {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }
    clear.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })

</script>
</body>
</html>
```

暂时无法在飞书文档外展示此内容

## 刮刮奖

刮刮奖这个案例其实不是太常见，但确是一个经典的案例，比如我们要说的下一个案例：擦玻璃，就是这个案例的一个扩展。

**所需方法：**

不管是刮刮奖还是擦玻璃，我们主要应用到的方法是`globalCompositeOperation`，该属性用于设置在绘制新形状时应用的合成操作的类型。

该属性有很多方法，下面咱们看一下都有哪些？

语法：`globalCompositeOperation = type`，属性值 type 表示是要使用的合成或混合模式操作的类型。

type属性为不同值时，绘制显示将会不同，具体的类型值我们列一下：

| 属性类型         | 表现形式                                                     |
| ---------------- | ------------------------------------------------------------ |
| source-over      | 默认。在目标图像上显示源图像                                 |
| source-atop      | 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。 |
| source-in        | 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。 |
| source-out       | 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。 |
| destination-over | 在源图像上方显示目标图像。                                   |
| destination-atop | 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。 |
| destination-in   | 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。 |
| destination-out  | 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 |
| lighter          | 显示源图像 + 目标图像。                                      |
| copy             | 显示源图像。忽略目标图像。                                   |
| xor              | 使用异或操作对源图像与目标图像进行组合。                     |

具体的表现如下图：

![img](https://kqd19315lhi.feishu.cn/space/api/box/stream/download/asynccode/?code=MDAwZTUyYjRmOWM0MzU2NDJhNTA2NmZiYjQ3MzNhMjZfeGF6Uk9oZG84bkRsVDFEeVJQY1c4VUNGcVBIcGRUOE1fVG9rZW46QVlRRWJ2OWxZb3NoMlF4ZDh1OWNST3c3bmNxXzE3MTU2NTY5MzA6MTcxNTY2MDUzMF9WNA)

上面是我在网上找的一个不同属性绘制成不同效果的图。

了解了`globalCompositeOperation` 属性的各种类型的效果，下面咱们开始写案例。

具体代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 刮刮奖</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      background-color: #ccc;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      float: left;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="1000" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
   
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      const imageUrl = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160909%2Feca561d1ecce4fcab4f600a74f15b221_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672410563&t=65c34c7d49a899c2f2a3c0f99827312f";

      // 设置画笔
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 50

      // 为canvas添加鼠标按下事件
      canvas.addEventListener("mousedown", mousedownFn, false)
      let downX,downY
      // 鼠标按下触发的方法
      function mousedownFn(e) {
        e.preventDefault()
        downX = e.pageX
        downY = e.pageY
        drawLine({startX: downX, startY: downY})
        // 为canvas添加鼠标移动和鼠标抬起事件
        canvas.addEventListener("mousemove", mousemoveFn, false)
        canvas.addEventListener("mouseup", mouseupFn, false)
      }

      // 鼠标移动触发
      function mousemoveFn(e) {
        e.preventDefault()
        const moveX = e.pageX
        const moveY = e.pageY
        drawLine({endX: moveX, endY: moveY})
        downX = moveX
        downY = moveY
      }

      // 鼠标抬起触发
      function mouseupFn() {
        // 鼠标抬起以后移除事件
        canvas.removeEventListener("mousemove", mousemoveFn, false)
        canvas.removeEventListener("mouseup", mouseupFn, false)
      }

      // 画线
      function drawLine(position) {
        const { startX, startY, endX, endY } = position
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX || startX, endY || startY)
        ctx.stroke()
      }

      drawImage(imageUrl)
      function drawImage(src) {
        const img = new Image()
        img.crossOrigin = ''
        img.src = src
        img.onload = () => {
          const imageAspectRatio = img.width / img.height
          const canvasAspectRatio = canvas.width / canvas.height
          ctx.drawImage( img, 0, 0, canvas.width, canvas.height )
          ctx.globalCompositeOperation = 'destination-out'
        }
      }
    }
  </script>
</body>
</html>
```

暂时无法在飞书文档外展示此内容

## 擦玻璃

擦玻璃和刮刮奖是差不多的实现，不同的是，刮刮奖的下面是中奖的文字，上面是一张图，而擦玻璃的实现下面是一张图，上面也是一张图，并且上下来那张图是同一张图，只是上面这张图需要做成模糊的效果。

这里我们需要考虑一个问题：如何让图片模糊？？

其实这个也比较简单，`高斯模糊`想来大家都知道，至于如何`高斯模糊`我这边在网上找了一个方法，可以直接使用，具体代码为：

```JavaScript
  function gaussBlur(imgData) {
      const pixes = imgData.data;
      const width = imgData.width;
      const height = imgData.height;
      const gaussMatrix = [];
      let gaussSum = 0;
      let x;
      let y;
      let r;
      let g;
      let b;
      let a;
      let i;
      let j;
      let k;
      let len;
      const radius = 10;
      const sigma = 5;
      a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
      b = -1 / (2 * sigma * sigma);
      // 生成高斯矩阵
      for (i = 0, x = -radius; x <= radius; x++, i++) {
        g = a * Math.exp(b * x * x);
        gaussMatrix[i] = g;
        gaussSum += g;
      }

      // 归一化, 保证高斯矩阵的值在[0,1]之间
      for (i = 0, len = gaussMatrix.length; i < len; i++) {
        gaussMatrix[i] /= gaussSum;
      }

      // x 方向一维高斯运算
      for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
          r = g = b = a = 0;
          gaussSum = 0;
          for (j = -radius; j <= radius; j++) {
            k = x + j;
            if (k >= 0 && k < width) {
              // 确保 k 没超出 x 的范围
              // r,g,b,a 四个一组
              i = (y * width + k) * 4;
              r += pixes[i] * gaussMatrix[j + radius];
              g += pixes[i + 1] * gaussMatrix[j + radius];
              b += pixes[i + 2] * gaussMatrix[j + radius];
              // a += pixes[i + 3] * gaussMatrix[j];
              gaussSum += gaussMatrix[j + radius];
            }
          }
          i = (y * width + x) * 4;
          // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
          // console.log(gaussSum)
          pixes[i] = r / gaussSum;
          pixes[i + 1] = g / gaussSum;
          pixes[i + 2] = b / gaussSum;
          // pixes[i + 3] = a ;
        }
      }

      // y 方向一维高斯运算

      for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
          r = g = b = a = 0;
          gaussSum = 0;
          for (j = -radius; j <= radius; j++) {
            k = y + j;
            if (k >= 0 && k < height) {
              // 确保 k 没超出 y 的范围
              i = (k * width + x) * 4;
              r += pixes[i] * gaussMatrix[j + radius];
              g += pixes[i + 1] * gaussMatrix[j + radius];
              b += pixes[i + 2] * gaussMatrix[j + radius];
              // a += pixes[i + 3] * gaussMatrix[j];
              gaussSum += gaussMatrix[j + radius];
            }
          }
          i = (y * width + x) * 4;
          pixes[i] = r / gaussSum;
          pixes[i + 1] = g / gaussSum;
          pixes[i + 2] = b / gaussSum;
        }
      }
      return imgData
  }
```

此方法就是把像素数据传进去，然后经过模糊处理以后再返回出来，整体的代码如下：

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 刮刮奖</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.moyublog.com%2Fd%2Ffile%2F2021-05-29%2Ff8b2a20556774afebed8fd91ccbe0497.jpg&refer=http%3A%2F%2Ffile.moyublog.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672406341&t=a0b71fded87dd696982c1632cc015397");
      background-size: cover;
      background-position: center;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      float: left;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="1000" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
   
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      const imageUrl = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.moyublog.com%2Fd%2Ffile%2F2021-05-29%2Ff8b2a20556774afebed8fd91ccbe0497.jpg&refer=http%3A%2F%2Ffile.moyublog.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672406341&t=a0b71fded87dd696982c1632cc015397";

      // 设置画笔
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 50

      // 为canvas添加鼠标按下事件
      canvas.addEventListener("mousedown", mousedownFn, false)
      let downX,downY
      // 鼠标按下触发的方法
      function mousedownFn(e) {
        e.preventDefault()
        downX = e.pageX
        downY = e.pageY
        drawLine({startX: downX, startY: downY})
        // 为canvas添加鼠标移动和鼠标抬起事件
        canvas.addEventListener("mousemove", mousemoveFn, false)
        canvas.addEventListener("mouseup", mouseupFn, false)
      }

      // 鼠标移动触发
      function mousemoveFn(e) {
        e.preventDefault()
        const moveX = e.pageX
        const moveY = e.pageY
        drawLine({endX: moveX, endY: moveY})
        downX = moveX
        downY = moveY
      }

      // 鼠标抬起触发
      function mouseupFn() {
        // 鼠标抬起以后移除事件
        canvas.removeEventListener("mousemove", mousemoveFn, false)
        canvas.removeEventListener("mouseup", mouseupFn, false)
      }

      // 画线
      function drawLine(position) {
        const { startX, startY, endX, endY } = position
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX || startX, endY || startY)
        ctx.stroke()
      }

      drawImage(imageUrl)
      function drawImage(src) {
        const img = new Image()
        img.crossOrigin = ''
        img.src = src
        img.onload = () => {
          const imageAspectRatio = img.width / img.height
          const canvasAspectRatio = canvas.width / canvas.height
          ctx.drawImage( img, 0, 0, canvas.width, canvas.height )

          // 把像素数据模糊化
          var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var tempData = gaussBlur(canvasData, 20);
          ctx.putImageData(tempData,0,0);

          // 设置绘制类型
          ctx.globalCompositeOperation = 'destination-out'
        }
      }

      function gaussBlur(imgData) {
        const pixes = imgData.data;
        const width = imgData.width;
        const height = imgData.height;
        const gaussMatrix = [];
        let gaussSum = 0;
        let x;
        let y;
        let r;
        let g;
        let b;
        let a;
        let i;
        let j;
        let k;
        let len;
        const radius = 10;
        const sigma = 20;
        a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
        b = -1 / (2 * sigma * sigma);
        // 生成高斯矩阵
        for (i = 0, x = -radius; x <= radius; x++, i++) {
          g = a * Math.exp(b * x * x);
          gaussMatrix[i] = g;
          gaussSum += g;
        }

        // 归一化, 保证高斯矩阵的值在[0,1]之间
        for (i = 0, len = gaussMatrix.length; i < len; i++) {
          gaussMatrix[i] /= gaussSum;
        }

        // x 方向一维高斯运算
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
              k = x + j;
              if (k >= 0 && k < width) {
                // 确保 k 没超出 x 的范围
                // r,g,b,a 四个一组
                i = (y * width + k) * 4;
                r += pixes[i] * gaussMatrix[j + radius];
                g += pixes[i + 1] * gaussMatrix[j + radius];
                b += pixes[i + 2] * gaussMatrix[j + radius];
                // a += pixes[i + 3] * gaussMatrix[j];
                gaussSum += gaussMatrix[j + radius];
              }
            }
            i = (y * width + x) * 4;
            // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
            // console.log(gaussSum)
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
            // pixes[i + 3] = a ;
          }
        }

        // y 方向一维高斯运算

        for (x = 0; x < width; x++) {
          for (y = 0; y < height; y++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
              k = y + j;
              if (k >= 0 && k < height) {
                // 确保 k 没超出 y 的范围
                i = (k * width + x) * 4;
                r += pixes[i] * gaussMatrix[j + radius];
                g += pixes[i + 1] * gaussMatrix[j + radius];
                b += pixes[i + 2] * gaussMatrix[j + radius];
                // a += pixes[i + 3] * gaussMatrix[j];
                gaussSum += gaussMatrix[j + radius];
              }
            }
            i = (y * width + x) * 4;
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
          }
        }
        return imgData
      }
    }
  </script>
</body>
</html>
```

暂时无法在飞书文档外展示此内容

# 结语

Canvas在刚推出时主打的优势就是更快的渲染速度，刷新了人们对Web页面元素绘制速度的印象，但Canvas的优势却不仅限于此。随着技术的不断更新Canvas的应用也越来越广泛，各种可视化图标、游戏和各种图形化编辑器都把Canvas突显的淋漓尽致，尤其Google Docs已经宣布将会把HTML迁移到基于Canvas渲染，这一消息的出现又把Canvas推上了一个新的高度。

总之Canvas只会越来越重要，它一定会成为每个前端工程师必备的技能之一。所以学会它掌握它让你的技能图谱再添一员猛将。