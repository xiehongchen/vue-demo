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

 

### Flex项目布局：

order->项目的排序顺序。数值越小，排列越靠前，默认为0

flex-grow->各项目宽度之和小于容器宽度时，各项目分配容器剩余宽度的放大比例，默认为0，即不放大

flex-shrink->各项目宽度之和大于容器宽度时，各项目缩小自己宽度的比例，默认为1，即该项目将缩小

flex-basis->元素宽度的属性，与width功能相同，但比width的优先级高

flex->时flex-grow和flex-basis的简写，默认值为0 1 auto。后两个属性可选

align-self->允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch



 

### navigator组件属性：

target->在哪个目标上发生跳转，其合法值为self和miniProgram，默认值为self

url->当前小程序内的跳转地址

open-type->跳转方式

delta->当open-type为‘navigateBack’时有效，表示回退的层数

app-id->当target=“miniProgram”时有效，要打开的小程序appId

path->当target=“miniProgram”时有效，打开的页面路径，如果为空则打开首页

 

### open-type的合法值：

navigate->保留当前页面，跳转到应用内的某个页面

redireat->关闭当前页面，跳转到应用内的某个页面

switchTab->跳转到taBar页面，并关闭其他所有非taBar页面

reLaunch->关闭当前页面，打开应用内的某个页面

navigateBack->关闭当前页面，返回上一页面或多级页面

exit->退出小程序，target=“miniProgram”时有效

 

### Icon图标组件的主要属性：

type->icon的类型，有效值:success,

success_no_circle,info,warn,waiting,cancel,

download,search,clear

size->icon的大小

color->icon的颜色



 

### Float属性的合法值：

left->元素向右浮动

right->元素向左浮动

none->默认值。元素不浮动，并会显示其在文本中出现的位置

inherit->规定应该从父类继承float属性的值



 

clear属性。清除浮动

### clear属性的合法值：

left->在左侧不允许有浮动元素

right->在右侧不允许有浮动元素

both->在左右两侧均不允许有浮动元素

none->默认值。允许浮动元素出现在左右两侧

inherit->继承父元素clear属性的值



 

input输入框组件。用于输入数据

### input组件的属性：

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

### type属性的合法值：

text->文本输入键盘

number->数字输入键盘

idcard->身份证输入键盘

digit->带小数点的数字键盘



 

### Math对象：用于执行数学任务，它的常用数学和函数如下：

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



 

### button组件-常用属性：

size->按钮的大小

type->按钮类型

plain->按钮是否镂空，背景色是否透明

disabled->是否禁用

loading->是否带loading图标

form-type->用于<form>组件的提交或重置



 

### button属性合法值：

size->合法值->default->默认大小

size->合法值->mini->小尺寸

type->合法值->primary->绿色

type->合法值->default->白色

type->合法值->warn->红色

form-type->合法值->submit->提交表单

form-type->合法值->reset->重置表单



 

### JavaScript全局对象：可用于所有内建地JavaScript对象，其常用属性和方法如下：

Infinity->代表正地无穷大地数值

NaN->指示某个值是不是数字值

undefined->指示未定义的值

isFinite（）->检查某个值是否是有穷大的数

isNaN（）->检查某个值是否是数字

Number（）->把对象的值转换为数字

parseFloat（）->解析一个字符串并返回一个浮点数

parseInt（）->解析一个字符串并返回一个整数

String（）->把对象的值转化为字符串



 

### Array对象：用于在单个的变量存储多个值，其常用属性和方法如下：

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



 

### Number对象：该对象是原始数值的包装对象，其常用属性和方法如下：

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



 

### 全局配置：app.json文件属性：

pages->类型->string[]->是必填->页面路径列表

window->类型->Object->不是必填->全局默认窗口表现

tabBar->类型->Object->不是必填->底部tab栏的表现

networkTimeout->类型->Object->不是必填->网络超时时间

debug->类型->boolean->不是必填->是否开启debug模式，默认关闭

permission->类型->Object->不是必填->小程序接口权限相关设置

 

### Window配置：

navigationBarBackgroundColor->类型->HexColor->导航栏背景颜色，如#000000

navigationBarTextStyle->string->导航栏标题颜色，仅支持black/white

navigationBarTitleText->类型->string->导航栏标题文字内容

backgroundColor->类型->HexColor->窗口的背景色

backgroundTextStyle->类型->string->下拉loading的样式，仅支持dark/light

pageOrientation->类型->string->屏幕旋转设置，支持auto/portrait/landscape

 

### tabBar配置：

color->类型->Hexcolor->tab上的文字的默认颜色

selectedColor->类型->HexColor->tab上选中文字的颜色

backgroundColor->类型->HexColor->tab的背景色

borderStyle->类型->string->tabBar上边框的颜色，仅支持black/white

list->类型->Array->tab列表，最少2个，最多5个tab

position->类型->string->tabBar的位置，仅支持bottom/top

 

### list配置：

pagePath->类型->string->是必填->页面路径，必须在pages中先定义

text->类型->string->是必填->tab上按钮文字

iconPath->类型->string->不是必填->图片路径，icon大小限制为40kb，建议尺寸为81px*81px，不支持网络图片

selectedIconPath->类型->string->不是必填->选中时的图片路径



 

### 函数App（Object object）参数属性：

onLaunch->类型->function->生命周期回调函数—监听小程序初始化

onShow->类型->function->生命周期回调函数—监听小程序启动或切前台

onHide->类型->function->生命周期回调函数—监听小程序切后台

onError->类型->function->错误监听函数

onPageNotFound->类型->function->页面不存在监听函数

其他->类型->any->开发者可以添加任意函数或数据变量到Object参数中，用this访问



 

### Page(Object object)参数属性：

data->类型->Object->页面的初始数据

onLoad->类型->function->生命周期回调函数—监听页面加载

onShow->类型->function->生命周期回调函数—监听页面显示

onReady->类型->function->生命周期回调函数->监听页面初次渲染完成

onHide->类型->function->生命周期回调函数—监听页面隐藏

onUnload->类型->function->生命周期回调函数—监听页面隐藏

其他->类型->any->开发者可以添加任意的函数或数据到Object参数中，在页面的函数中用this访问



 

### wx.showToast(Object object)的参数属性：

title->提示的内容

icon->图标

image->自定义图标的本地路径，image的优先级高于icon

duration->延迟事件

mask->是否显示透明蒙层，防止触摸穿透

success->接口调用成功的回调函数

fail->接口调用失败的回调函数

complete->接口调用结束的回调函数



 

### radio和radio-group组件属性说明：

radio->属性->value->radio标识。当radio选中时，radio-group的change事件会携带radio的value

radio->属性->checked->当前是否选中

radio->属性->disabled->是否禁用

radio->属性->color->radio的颜色

radio-group->属性->bindchange->radiobox-group中选中项发生改变时触发change事件



 

### checkbox和checkbox-group组件属性说明：

 checkbox->属性->value->checkbox标识

checkbox->属性->disabled->是否禁用

checkbox->属性->checked->当前是否选中，可用来设置默认选中

checkbox->属性->color->checkbox的颜色

checkbox-group->属性->bindchange->checkbox-group中选中项发生改变时触发change事件



 

### slider组件：

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



 

### swiper组件：

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

 

### swiper组件：

开关选择器组件，能够实现开关效果，其 常用属性如表所示：

checked->是否选中

disabled->是否禁用

type->样式，有效值：switch，checkbox

bindchange->checked改变时触发change事件

color->switch的颜色



 

### 普通选择器（mode = selector）和 多列选择器（mode = multiSelector）主要属性：

range->类型->Array/Object Array->数据元素数组

range-key->类型->String->当range时一个Object Array时，通过range-key来指定Object中key的值作为选择器来显示内容

value->类型->Number->value的值表示选择了range中的第几个（下标从0开始）元素

bindchange->类型->EventHandle->value改变时触发change事件

 

### 时间选择器（mode = time）主要属性：

value->类型->String->表示选中的事件，字符串格式为“hh:mm”

start->类型->String->表示有效时间范围的开始

end->类型->String->表示有效时间范围的结束

bindchange->类型->EventHandle->value改变时触发change事件

 

### 日期选择器（mode = date）主要属性：

value->表示选中的日期，格式为：“YYYY-MM-DD”

start->表示有效日期范围的开始

end->表示有效日期范围的结束

fields->有效值year，month，day，表示选择器的粒度，默认值为day

bindchange->value改变时触发change事件

 

### 省市区选择器（mode = region）主要属性：

value->Array类型，表示选中的省市区。默认选中每一列的第一个值

custon-item->可谓每一列的顶部添加一个自定义的项

bindchange->value改变时触发change事件



 

### image组件的使用方法：

image组件用于显示图片，支持JPG、PNG、SVG 格式，其主要属性如下表所示：

src->图片的资源地址

mode->默认值为scaleToFill->图片的显示模式

 

### mode的缩放模式：

scaleToFill->不保持纵横比缩放图片，使图片的宽高完全拉伸至 填满 image 元素。

aspectFit->保持纵横比缩放图片，使图片的长边能完全显示 出来。也就是说，可以完整地将图片显示出来。

aspectFill->保持纵横比缩放图片，只保证图片的短边能完全 显示出来。也就是说，图片通常只在水平或垂直 方向是完整的，另一个方向将会发生截取。

widthFix->宽度不变，高度自动变化，保持原图宽高比不变。

 

### mode的裁剪模式：

top->不缩放图片，只显示图片的顶部区域

bottom->不缩放图片，只显示图片的底部区域 

center->不缩放图片，只显示图片的中间区域 

left->不缩放图片，只显示图片的左边区域 right->不缩放图片，只显示图片的右边区域 top left->不缩放图片，只显示图片的左上边区域 

top right->不缩放图片，只显示图片的右上边区域 

bottom left->不缩放图片，只显示图片的左下边区域 

bottom right->不缩放图片，只显示图片的右下边区域

 

### 音频上下文对象：

音频上下文对象AudioContext具有如下函数：

setSrc(string src) ->设置音频地址 

play()->播放音频 

pause()->暂停音频 

seek(number position) ->跳转到指定位置

 

### audio音频组件：

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

 

### 视频上下文对象VideoContext：

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

 

### 发送弹幕API函数：

利用sendDanmu(Object data)可以发射弹幕。参数 data为弹幕内容，其属性如下：

text->类型->string->必填->弹幕文字

color->类型->string->不是必填->弹幕颜色

 

### video视频组件：

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

 

### wx.showModal(Object object)：

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

 

### success(Object res)回调函数的参数属性：

confirm->类型->boolean->为true时，表示用户点击了确定按钮

cancel->类型->boolean->为true时，表示用户点击了取消按钮



 

### wx.onAccelerometerChange(function callback) ：

用于监 听加速度变化事件，其参数为加速度变化事件的回调函数， 该回调函数的参数是Object res，res的属性如下表所示：

x->类型->number->X轴 

y->类型->number->Y轴 

z->类型->number->Z轴

 

### wx.startAccelerometer(Object object)：

用于启动 监听加速度变化事件。其参数属性如下表所示：

interval->类型->string默认值->normal->监听频率，其有效值包括： game, ui, normal success->类型->function->接口调用成功的回调函数

fail->类型->function->接口调用失败的回调函数 

complete->类型->function->接口调用结束的回调函数

 

wx.stopAccelerometer(Object object)：

用于停止监 听加速度变化事件。



 

### canvas画布组件的使用方法其属性如下：

type->指定canvas类型 

canvas-id canvas->组件的唯一标识符， 若指定了type指定该属性 

disable-scroll->当在 canvas 中移动且有绑定手势事件 时，禁止屏幕滚动以及下拉刷新

bindtouchstart->手指触摸动作开始

bindtouchmove->手指触摸后移动

bindtouchend->手指触摸动作结束

bindtouchcancel->手指触摸动作被打断，如来电提醒、 弹窗等

bindlongtap->手指长按 500ms 之后触发， 触发了长按事件后进行移动不会触发 屏幕的滚动

binderror->当发生错误时触发 error 事件



 

### wx.createAnimation(Object object)：

用于创建一个动画实例 。其参数属性如下：

duration->动画持续时间 默认值为：400 ms timingFunction->动画的效果 默认值为：linear 

delay->动画延迟时间 默认值为：0 transformOrigin->设置旋转元素的基点位置 默认值为：50% 50% 0

 

### timingFunction 的合法值：

linear->动画从头到尾的速度是相同的 ease->动画以低速开始，然后加快，在结束前变慢

ease-in->动画以低速开始 

ease-in-out->动画以低速开始和结束 ease-out->动画以低速结束

step-start->动画第一帧就跳至结束状态直到结束 

step-end->动画一直保持开始状态，最后一帧跳到结束状态

 

### Animation方法：

Array.<Object>eport()->导出动画队列

step(Object object) ->表示一组动画完成

rotate(number angle) ->从原点顺时针旋转一个角度

scale(number sx, number sy) ->缩放

skew(number ax, number ay) ->对 X、Y 轴坐标进行倾斜

translate(number tx, number ty) ->平移变换

opacity(number value) ->设置透明度 backgroundColor(string value) ->设置背景色 width(number|string value) ->设置宽度 height(number|string value) ->设置高度 left(number|string value) ->设置 left 值 right(number|string value) ->设置 right 值 top(number|string value) ->设置 top 值 bottom(number|string value) ->设置 bottom 值

 

### wx.chooseImage(Object object)：

从本地相册选择图片或使用相机拍照。其参数属性如下：

count->->默认值->9->选择图片的最多张数 

sizeType -> 默认值-> ['original', 'compressed'] ->所选图片的尺寸 sourceType-> 默认值-> ['album', 'camera'] -> 选择图片的来源 

success->接口调用成功的回调函数

success回调函数的参数属性：

tempFilePaths->类型->Array.<string>->图片的本地临时文件路径列表

tempFiles->类型->Array.<Object>->图片的本地临时文件列表

 

### tempFiles对象数组元素属性：

path->类型->string->本地临时文件路径

size->类型->number->本地临时文件大小，单位为B

 

### wx.chooseVideo(Object object)：

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



 

### map组件：

longitude->中心经度 

latitude->中心纬度 

scale->缩放级别，取值范围为5-18，默认值16 

markers->标记点，对象数组类型 

polyline->路线 

polygons->多边形 

circles->圆 

include-points->缩放视野以包含所有给定的坐标点 

show-location->显示带有方向的当前定位点

 

### Makers对象数组元素的属性：

id->标记点id->类型->Number

latitude->纬度->类型->Number

longitude->经度->类型->Number

title->标注点名称->类型->String

iconPath->标注的图标->类型->String width->标注图标宽度->类型->Number / String 

height->标注图标高度->类型->Number / String 

label->为标记点旁边增加标签->类型->Object



 

### success回调函数的参数属性：

latitude->纬度，范围： -90~90 

longitude->经度，范围：-180~180 

speed->速度，单位 m/s 

accuracy->位置的精确度 

altitude->高度，单位 m 

verticalAccuracy->垂直精度，单位 m horizontalAccuracy->水平精度，单位 m

 

### wx.openLocation(Object object)：

使用微信内置地图查看位置，其参数属性如下：



latitude->纬度，使用 gcj02 国测局坐标系 longitude->经度，使用 gcj02 国测局坐标系 

scale->缩放比例，范围5~18，默认值18 name->位置名 

address->地址的详细说明

 

### wx.saveFile(Object object)：

用于将文件保存到本地，其参数主要属性如下：

tempFilePath->文件保存的临时路径 success->接口调用成功的回调函数

fail->接口调用失败的回调函数 

complete->接口调用结束的回调函数



### wx.setStorage(Object object)：

key->是必填->本地缓存中指定的key

data->是必填->需要存储的内容 

success->不是必填->接口调用成功的回调函数 

fail->不是必填->接口调用失败的回调函数 complete->不是必填->接口调用结束的回调函数



### 异步获取缓存信息：

wx.getStorageInfo(Object object)用于异步获取当前 缓存信息。其参数属性包括success回调函数，该回调函 数的参数属性如下：

keys->当前storage中所有的key currentSize->当前占用的空间大小, 单位 KB 

limitSize->限制的空间大小，单位 KB



 

### networkType的合法值：

wifi->wifi网络 

2g->2g网络 

3g->3g网络 

4g->4g网络 

unknown->Android下不常见的网络类型 none->无网络

监听网络状态变化：

wx.onNetworkStatusChange(function callback) 用于监听网络状态变化，参数callback为网络状态 变 化事件回调函数，该回调函数的参数属性如下：

isConnected->类型->boolean->当前是否有网络连接

networkType->类型->string网络类型



 

### wifi的合法值：

SSID->类型->string->Wi-Fi的SSID

BSSID->类型->string->Wi-Fi的BSSID secure->类型->boolean->Wi-Fi是否安全 signalStrength->类型->number->Wi-Fi信号强度



 

### wx.onCompassChange(function callback) 的参数为罗盘数据变化事件的回调函数。 该回调函数的参数属性如下：

direction->类型->number->面对的方向度数

accuracy->类型->number/string->精度



### wx.scanCode(Object object)用于调用客户端 扫码界面进行扫码，其参数属性如下：

onlyFromCamera->是否只从相机扫码 scanType->扫码类型 

success->接口调用成功的回调函数 

fail->接口调用失败的回调函数 

Complete->接口调用结束的回调函数



 

### scanType 的合法值：

barCode->一维码 

qrCode->二维码 

datamatrix->Data Matrix 码 

pdf417->PDF417 条码



 



### wx.makePhoneCall(Object object) 用于拨打电 话:

phoneNumber->需要拨打的电话号码 success->接口调用成功的回调函数

fail->接口调用失败的回调函数 

complete->接口调用结束的回调函数



 

### wx.addPhoneContact(Object object) 参数主要属性:

firstName->是必填->名字 

lastName->不是必填>姓氏

mobilePhoneNumber->不是必填->手机号

weChatNumber->不是必填->微信号



 

### success 回调函数参数的主要属性：

brand->设备品牌 

model->设备型号 

pixelRatio->设备像素比 

screenWidth->屏幕宽度，单位px screenHeight->屏幕高度，单位px windowWidth->可使用窗口宽度，单位px windowHeight->可使用窗口高度，单位px

statusBarHeight->状态栏的高度，单位px language->微信设置的语言 

version->微信版本号 

system->操作系统及版本 

platform->客户端平台 

fontSizeSetting->用户字体大小（单位px）。 SDKVersion->客户端基础库版本



 

### wx.setNavigationBarColor(Object object)用于设置当前 页面导航栏颜色和动画效果。其参数属性除success、fail和 complete外，还包含：

frontColor->前景颜色值。仅支持 #ffffff 和 #000000 

backgroundColor->背景颜色值。有效值为十六进制颜色 

animation->动画效果

 

### animation的属性：

duration->默认值->0->动画变化时间，单位 ms 

timingFunc->默认值->linear->动画变化方式



 

### wx.setTabBarBadge(Object object) 用于在某个标签 右上角添加文本标记。其参数属性除success、fail和 complete外，还包括：

index->tabBar的某一项下标，从左边算起 text->显示的文本，超过 4 个字符则显示成 ...



### wx.setTabBarStyle(Object object)用于动态设置 标签栏的整体样式：

color->tab 上的文字默认颜色，HexColor selectedColor->tab 上的文字选中时的颜色， HexColor 

backgroundColor->tab 的背景色，HexColor 

borderStyle->tabBar上边框的颜色， 仅支持 black/white



 

### wx.setTabBarItem(Object object) 用 于 设 置 某个标签样式。其参数属性除了success、fail和 complete外，还包括:

index->tabBar 的某一项下标 

text->tab 上的按钮文字 

iconPath->图片路径，不支持网络图片 selectedIconPath->选中时的图片路径



 

### wx.showActionSheet(Object object)：

用于显示操作菜单。其参数属性除了 success、fail和complete外，还包含：

itemList->按钮文字数组，长度最大为 6 itemColor->按钮文字颜色



 

 

 