
# 类型简介

## file

> File 对象通常是用户在网页中的一个 元素上传文件返回的 FileList 对象，或者是拖放操作返回的 DataTransfer 对象，也可以在浏览器中的控制台中自己创建。



| 属性名称           | 读/写 | 描述                                                         |
| ------------------ | ----- | ------------------------------------------------------------ |
| name               | 只读  | 返回文件的名称.由于安全原因,返回的值并不包含文件路径 。      |
| type               | 只读  | 返回 File 对象所表示文件的媒体类型（MIME）。例如 PNG 图像是 “image/png”. |
| lastModified       | 只读  | number, 返回所引用文件最后修改日期,自 1970年1月1日0:00 以来的毫秒数。 |
| lastModifiedDate   | 只读  | Date, 返回当前文件的最后修改日期,如果无法获取到文件的最后修改日期,则使用当前日期来替代。 |
| size               | 只读  | File 对象中所包含数据的大小（字节）                          |
| webkitRelativePath | 只读  | 返回 File 相关的 path 或 URL。                               |

我们在浏览器中输出的File：

![在这里插入图片描述](https://img-blog.csdnimg.cn/e6ccab81b89c4ee284153bc9d2c855d4.png)

可以看到它的属性有和Blob一样的地方，只是在Blob的基础上做了扩展

## base64

> Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种基于64个可打印字符来表示二进制数据的方法。编码规则：把3个字节变成4个字节;每76个字符加一个换行符;最后的结束符也要处理。

看一个Base64格式的图片了解一下：
![![在这里插入图片描述](https://img-blog.csdnimg.cn/6407b44a4ef443ec8a641e80ed2aeaaf.png](https://img-blog.csdnimg.cn/0ee2e1db40084993b6515be349ce487f.png)
可以看到，Base64格式的图片以data开头，后面跟着图片类型和图片的基本数据

## Blob

> BLOB(binary large object)： 二进制大对象,是一个可以存储二进制文件的容器。 在计算机中,BLOB常常是数据库中用来存储二进制文件的字段类型。

| 属性名称 | 读/写 | 描述                                                         |
| -------- | ----- | ------------------------------------------------------------ |
| size     | 只读  | Blob 对象中所包含数据的大小（字节）。                        |
| type     | 只读  | 一个字符串，表明该Blob对象所包含数据的MIME类型。如果类型未知，则该值为空字符串。例如 “image/png” |

我们在浏览器中输出的Blob对象：
![在这里插入图片描述](https://img-blog.csdnimg.cn/d02d03881b5b4c2892ba55dc5c2d8060.png)

Blob对象表示一个不可变、原始数据的类文件对象。Blob表示的不一定是JavaScript原生格式的数据。File接口基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件。

### 创建Blob对象

### 通过构造函数

```js
var blob = new Blob(dataArr:Array<any>, opt:{type:string});
```

- dataArray：数组，包含了要添加到Blob对象中的数据，数据可以是任意多个ArrayBuffer，ArrayBufferView， Blob，或者 DOMString对象。
- opt：对象，用于设置Blob对象的属性（如：MIME类型）

1. 创建一个装填DOMString对象的Blob对象
2. 创建一个装填ArrayBuffer对象的Blob对象
3. 创建一个装填ArrayBufferView对象的Blob对象（ArrayBufferView可基于ArrayBuffer创建，返回值是一个类数组。如下：创建一个8字节的ArrayBuffer，在其上创建一个每个数组元素为2字节的“视图”）

### 通过Blob.slice()方法

此方法返回一个新的Blob对象，包含了原Blob对象中指定范围内的数据

```js
var newBlob = Blob.slice(start:number, end:number, contentType:string);
```

- start：开始索引，默认为0
- end：截取结束索引（不包括end）
- contentType：新Blob的MIME类型，默认为空字符串

### 通过canvas.toBlob()方法

此方法将canvas元素的内容转化为Blob对象

```js
var canvas = document.getElementById("canvas");
canvas.toBlob(function(blob){
    console.log(blob);
});
```

### 应用场景

前面提到，File接口基于Blob，继承了Blob的功能并进行了扩展，故我们可以像使用Blob一样使用File对象。

#### 分片上传

通过Blob.slice方法，可以将大文件分片，轮循向后台提交各文件片段，即可实现文件的分片上传。
分片上传逻辑如下：

- 获取要上传文件的File对象，根据chunk（每片大小）对文件进行分片
- 通过post方法轮循上传每片文件，其中url中拼接querystring用于描述当前上传的文件信息；post body中存放本次要上传的二进制数据片段
- 接口每次返回offset，用于执行下次上传
  下面是分片上传的简单实现：

```js
initUpload();
 
//初始化上传
function initUpload() {
    var chunk = 100 * 1024;   //每片大小
    var input = document.getElementById("file");    //input file
    input.onchange = function (e) {
        var file = this.files[0];
        var query = {};
        var chunks = [];
        if (!!file) {
            var start = 0;
            //文件分片
            for (var i = 0; i < Math.ceil(file.size / chunk); i++) {
                var end = start + chunk;
                chunks[i] = file.slice(start , end);
                start = end;
            }
            
            // 采用post方法上传文件
            // url query上拼接以下参数，用于记录上传偏移
            // post body中存放本次要上传的二进制数据
            query = {
                fileSize: file.size,
                dataSize: chunk,
                nextOffset: 0
            }
 
            upload(chunks, query, successPerUpload);
        }
    }
}
 
// 执行上传
function upload(chunks, query, cb) {
    var queryStr = Object.getOwnPropertyNames(query).map(key => {
        return key + "=" + query[key];
    }).join("&");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://xxxx/opload?" + queryStr);
    xhr.overrideMimeType("application/octet-stream");
    
    //获取post body中二进制数据
    var index = Math.floor(query.nextOffset / query.dataSize);
    getFileBinary(chunks[index], function (binary) {
        if (xhr.sendAsBinary) {
            xhr.sendAsBinary(binary);
        } else {
            xhr.send(binary);
        }
 
    });
 
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var resp = JSON.parse(xhr.responseText);
                // 接口返回nextoffset
                // resp = {
                //     isFinish:false,
                //     offset:100*1024
                // }
                if (typeof cb === "function") {
                    cb.call(this, resp, chunks, query)
                }
            }
        }
    }
}
 
// 每片上传成功后执行
function successPerUpload(resp, chunks, query) {
    if (resp.isFinish === true) {
        alert("上传成功");
    } else {
        //未上传完毕
        query.offset = resp.offset;
        upload(chunks, query, successPerUpload);
    }
}
 
// 获取文件二进制数据
function getFileBinary(file, cb) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
        if (typeof cb === "function") {
            cb.call(this, this.result);
        }
    }
}
```

以上是文件分片上传前端的简单实现，当然，此功能还可以更加完善，如后台需要对合并后的文件大小进行校验；或者前端加密文件，全部上传完毕后后端解密校验等，此处不做赘述。

#### 通过url下载文件

window.URL对象可以为Blob对象生成一个网络地址，结合a标签的download属性，可以实现点击url下载文件
实现如下：

```js
createDownload("download.txt","download file");
 
function createDownload(fileName, content){
    var blob = new Blob([content]);
    var link = document.createElement("a");
    link.innerHTML = fileName;
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    document.getElementsByTagName("body")[0].appendChild(link);
}
```

执行后页面上会生成此Blob对象的地址，点击后可下载

#### 下载excel文件

res可以是后台返回数据

```js
let res = [];
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
 
        link.href = window.URL.createObjectURL(blob);
        link.download = '报表';
        link.click();
```

#### 通过url显示图片

我们知道，img的src属性及background的url属性，都可以通过接收图片的网络地址或base64来显示图片，同样的，我们也可以把图片转化为Blob对象，生成URL（URL.createObjectURL(blob)），来显示图片。

# 类型转换

## base64转url显示和下载

### dataurl，base64格式

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAADECAIAAACgBnICAAABPGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGDiSCwoyGFhYGDIzSspCnJ3UoiIjFJgf87AxsDOwMXAwmCdmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsgsw08Fc+7ftHI7dutqrefvNacx1aMArpTU4mQg/QeIo5MLikoYGBgjgGzl8pICELsGyBYpAjoKyJ4AYqdD2EtA7CQIewdYTUiQM5B9BsgWSM5ITAGy7wDZOklI4ulIbKi9IMBIwI0kg5LUihIQ7ZxfUFmUmZ5RouAIDJlUBc+8ZD0dBSMDI2MGBlA4Q1R/vgF2AaMYB0KscjoDg901oGAPQiwqj4FhnS8Dg8QphJjSRQYGobsMDDuuFyQWJcIdwPiNpTjN2AjC5t7OwMA67f//z+EMDOyaDAx/r////3v7//9/lzEwMN9iYDjwDQB1a2AsngN5eAAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAKgAgAEAAAAAQAAAMWgAwAEAAAAAQAAAMQAAAAAPyaneQAAAAlwSFlzAAALEwAACxMBAJqcGAAAA25JREFUeAHt0kERACAMA0HAv6DK6+DhnhsBedzsnZljCkQFXvTjRoFfgCcOygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV9LWWiA7Dg6i2LAAAAAElFTkSuQmCC
```

### 切割数据

```
const arr = dataurl.split(',')
[
    "data:image/png;base64",
    "iVBORw0KGgoAAAANSUhEUgAAAMUAAADECAIAAACgBnICAAABPGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGDiSCwoyGFhYGDIzSspCnJ3UoiIjFJgf87AxsDOwMXAwmCdmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsgsw08Fc+7ftHI7dutqrefvNacx1aMArpTU4mQg/QeIo5MLikoYGBgjgGzl8pICELsGyBYpAjoKyJ4AYqdD2EtA7CQIewdYTUiQM5B9BsgWSM5ITAGy7wDZOklI4ulIbKi9IMBIwI0kg5LUihIQ7ZxfUFmUmZ5RouAIDJlUBc+8ZD0dBSMDI2MGBlA4Q1R/vgF2AaMYB0KscjoDg901oGAPQiwqj4FhnS8Dg8QphJjSRQYGobsMDDuuFyQWJcIdwPiNpTjN2AjC5t7OwMA67f//z+EMDOyaDAx/r////3v7//9/lzEwMN9iYDjwDQB1a2AsngN5eAAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAKgAgAEAAAAAQAAAMWgAwAEAAAAAQAAAMQAAAAAPyaneQAAAAlwSFlzAAALEwAACxMBAJqcGAAAA25JREFUeAHt0kERACAMA0HAv6DK6+DhnhsBedzsnZljCkQFXvTjRoFfgCcOygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV98cRAWYCnsqYvnhgoC/BU1vTFEwNlAZ7Kmr54YqAswFNZ0xdPDJQFeCpr+uKJgbIAT2VNXzwxUBbgqazpiycGygI8lTV9LWWiA7Dg6i2LAAAAAElFTkSuQmCC"
]
```

### 获取数据格式

```
const mime = arr[0].match(/:(.*?);/)[1]

image/png
```

### 获取数据类型

```
const suffix = mime.split('/')[1]

png
```

### 解码base64字符串

- atob() //ASCII to Base64
- btoa() //Base64 to ASCII

```
const bstr = atob(arr[1])

PNG


IHDRÅÄ r<iCCPICC Profile(c``âH,(Èaa``ÈÍ+)
rwRR`ÎÀÆÀÎÀÅÀÂ`\\ààTÂ£QÁ·k ú².È,ÃOsîß´r;vëj­çï5§1Õ£®Ôâd ý£J#låò»È):
Èb§CØK@ì${XMH3}ÈHÎHL²ïÙ:IHâéHl¨½ ÀHÀ$Ôí_PYQ¢àTÏ¼d=##cP8CT¾v£B¬r:Ý5 `B,*a/Ä)ÒE¡»;®$%ÂÀø¥8ÍØÂæÞÎÀÀ:íÿÿÏáì¯ÿÿÿ{ûÿÿ100ßb`8ð
uk`,yxleXIfMM*>F(iNHH Å Ä?&§y	pHYsnIDATxíÒA AÀ¿ ÊëàáyÜìc
D^ôãF_'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}ñÄ@Y§²¦/(ðTÖôÅeÊ¾xb ,ÀSYÓOx*kúâ²OeM_<1Pà©¬é'Ê<5}-e¢°àê-IEND®B`
```

### 获取ut8编码格式数据

```
const u8arr = new Uint8Array(n)
while (n--) {
	u8arr[n] = bstr.charCodeAt(n)
}

{
    "0": 137,
    "1": 80,
    "2": 78,
    "3": 71,
    "4": 13,
    "5": 10,
    "6": 26,
    "7": 10,
    "8": 0,
    .......
}
```

### 返回file对象

或者也可以返回blob对象

```
return new File([u8arr], `${filename}.${suffix}`, {
	type: mime
})
```

## BLOB 与 File

- File 转 BLOB

```js
// 获取文件对象
const _file = $("#file")[0].files[0];
fileToBlob(){
	const type = file.type;
	const reader = new FileReader();
	reader.readAsDataURL(file)
	reader.onload = function(e) {
	    const blob = new Blob([e.target.result], {type});
	    console.log("blob:", blob);
	    const file = blobToFile(blob, 'fileName');
         console.log('file', file);
	};
}
```

- BLOB 转 File

```js
blobToFile(blob, fileName){
	const file = new File([blob], fileName, {type: blob.type});
    return file;
}
```

## Blob 与 base64

- Blob转 base64

```js
blobToBase64(blob){
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.onload = (e) => {
	  const base64 = e.target.result
	  console.log("base64", base64);
	}
}
```

- base64 转 Blob

```js
base64ToBlob(base64) {
	// 分割base64
	let arr = base64.split(',');
	// 获取类型
	let mime = arr[0].match(/:(.*?);/)[1] || type;
	// 去掉url的头，并转化为byte
	let bytes = window.atob(arr[1]);
	let n = new ArrayBuffer(bytes.length);
	let u8arr = new Uint8Array(n);
	while (n--) {
	  u8arr[n] = bytes.charCodeAt(n);
	}
	return new Blob([u8arr], {type: mime});
},
```

## File 与 base64

- File 与 base64

```js
// 获取文件对象
const file = $("#file")[0].files[0];
fileToBase64(file){
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function (e) {
	  // e.target.result 即为base64结果
	  console.log(e.target.result);
	};
}
```

- base64 转 File

```js
base64ToFile(base64,filename) {
	// 分割base64
	let arr = base64.split(',');
	// 获取类型
	let mime = arr[0].match(/:(.*?);/)[1] || type;
	// 去掉url的头，并转化为byte
	let bytes = window.atob(arr[1]);
	let n = new ArrayBuffer(bytes.length);
	let u8arr = new Uint8Array(n);
	while (n--) {
	  u8arr[n] = bytes.charCodeAt(n);
	}
	return new File([u8arr],filename,{ type: mime });
},
```

## arrayBuffer与 base64

- base64转arrayBuffer

```js
base64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
	             .replace(/\-/g, '+')
	             .replace(/_/g, '/');
	
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	
	for (let i = 0; i < rawData.length; ++i) {
	     outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
```

- arrayBuffer转base64

```js
arrayBufferToBase64( buffer ) {
	var binary= '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
	   binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa( binary );
	
	// 简写（一行代码）
	return window.btoa(String.fromCharCode(...new Uint8Array(buffer)))
}
```

## 扩展

-  file转buffer

  ```js
  const buffer = fileReader.readAsArrayBuffer(file)
  ```

- file转binary(二进制格式)

  ```js
  const buffer = fileReader.readAsBinaryString(file)
  ```

- file转file(用于修改file的只读属性name、type、lastModified)

  ```js
  const newFile = new File([file], 'newName.wav', {type: 'audio/wav', lastModified: Date.now()})
  ```

- blob转blobUrl

  ```js
  const blob = '.....'
  window.URL = window.URL || window.webkitURL;
  const blobURL = window.URL.createObjectURL(blob);
  ```

- base64操作

  ```js
  const arr = base64.split(',')
  const type = arr[0].match(/:(.*?);/)[1] // image/jpeg
  const size = window.atob(arr[1]).length
  base加解密 -- 不支持中文
  场景：由于一些网络通讯协议的限制,必须对原数据进行编码后才可发送，后端得到后再解码得到原数据，例如，发送某些含有 ASCII 码表中 0 到 31 之间的控制字符的数据。
  base转码
  const base64 = window.btoa('a')
  base解码
  const string = window.atob(base64)
  ```

  