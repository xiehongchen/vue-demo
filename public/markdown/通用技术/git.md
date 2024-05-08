## 版本控制工具

### 集中式版本控制工具

CVS、**SVN**、VSS

- 单一的集中管理服务器

### 分布式版本控制工具

Git

## 工作机制

- 工作区——写代码的文件
- 暂存区——本地的临时存储
- 本地库——历史版本
- 远程库——代码托管中心

## git命令

![image-20221110152202977](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221110152202977.png)

### 1、设置用户签名

- 文件存放在 `C:\Users\用户名\.gitconfig`

![image-20221111125352599](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125352599.png)

### 2、初始化本地库

```
git init
```

![image-20221111125315530](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125315530.png)

### 3、查看本地库状态

```
git status
```

- 红色的文件——未被追踪的文件，只存在**工作区**

![image-20221111125626175](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125626175.png)

### 4、添加暂存区

```
git add 文件名
git add .	//所有文件
```

- 红色文件变成绿色文件——追踪到的文件，存放在暂存区

![image-20221111125757700](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125757700.png)

### 5、提交本地库

```
git commit -m "日志信息" 文件名
```

- -m	提交信息

![image-20221111125839939](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125839939.png)

### 6、版本穿梭

- 查看版本详细信息

```
git log 		
```

![image-20221111125217814](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125217814.png)

- 查看版本信息

```
git reflog			
```

![image-20221111125237083](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125237083.png)

- 版本穿梭

```
git reset --hard 版本号
```

![image-20221111130821801](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111130821801.png)

头指针指向master分支，master分支指向7378390这个版本

- 头指针指向master分支，master分支会指向最新的版本
- 可以穿梭回去，指向之前的版本
- git控制版本——在本地库内存记录了很多日记、版本信息，切换版本后master分支指向指定的版本

### 7、修改文件

![image-20221111125946698](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111125946698.png)

- 修改文件后，会变成红色文件，为未被追踪的文件，也就说没有提交到暂存区

![image-20221111130208685](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111130208685.png)

- 重新提交到暂存区后，已被追踪，接下来需要提交到本地库

![image-20221111130323042](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111130323042.png)

- 这里就会显示两个版本信息了
- **当前指针指向最新提交的版本**

## git分支操作

![image-20221111131434126](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111131434126.png)

### 1、什么是分支

- 在版本控制过程中，同时推进多个任务，为每个任务，我们就可以创建每个人物的单独分支。
- 使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己的分支的时候，不会影响主线分支的运行
- 对于初学者来说，分支可以简单理解为副本，一个分支就是一个单独的副本
- 分支底层其实也是指针的引用

### 2、分支的好处

- 同时并行推进多个功能开发，提高开发效率
- 各个分支在开发过程中，如果某一个分支开发失败，不会影响其他分支，失败的分支删除重新开始即可

### 3、分支的操作

| 命令名称            | 作用                         |
| ------------------- | ---------------------------- |
| git branch 分支名   | 创建分支                     |
| git branch -v       | 查看分支                     |
| git checkout 分支名 | 切换分支                     |
| git merge 分支名    | 把指定的分支合并到当前分支上 |

#### 1、查看分支

```
git branch -v
```

![image-20221111132349460](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111132349460.png)

#### 2、创建分支

```
git branch 分支名
```

![image-20221111132508396](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111132508396.png)

#### 3、切换分支

```
git checkout 分支名
```

![image-20221111132630642](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111132630642.png)

#### 4、分支合并

```
git merge 分支名
```

- 把后面的分支合并到当前分支上
- 只会修改合并的分支，也就说当前分支，被合并的分支并不受影响

![image-20221111133332961](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111133332961.png)

1、正常合并

2、冲突合并

- 两个分支修改同一个文件相同行或相邻行，就会冲突
- 这时候就需要手动操作，自己决定要保留哪些代码

![image-20221111133411871](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111133411871.png)

- 这里可以看到，maste合并中，说明合并还没有成功
- 需要自己手动合并代码

![image-20221111133509988](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111133509988.png)

- 自己进行操作，决定留下哪些
- 合并成功后，需要重新提交暂存区，然后提交本地库。
- 注意：这里提交本地库 不能带文件名，只需要前面即可

```
git commit -m "日子信息"
```

## 团队协作机制

### 1、团队内协作

1. push——推送代码，提交到代码托管中心
2. clone——克隆代码
3. push——本地修改后，推送代码，提交到代码托管中心
4. pull——拉取代码，更新本地库
5. 这样两个本地库和代码托管中心就保持一致了

![image-20221111133926138](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111133926138.png)

### 2、跨团队协作

1. fork——将第一个团队的远程库全部复制一份到第二个团队的远程库里
2. clone——第二个团队克隆代码
3. push——第二个团队修改后，推送代码，提交到第二个团队自己的远程库
4. pull request——第二个团队向第一个团队发出拉取请求
5. merge——审核，合并
6. pull——拉取本地库

![image-20221111133952207](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111133952207.png)

## GitHub操作

![image-20221111140026110](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111140026110.png)

### 1、创建远程库&别名

```
 git remote add demo https://github.com/xiehongchen/demo.git
```

- demo——别名
- https://github.com/xiehongchen/demo.git——GitHub上的远程库

**查看别名**

```
git remote -v
```

![image-20221111135838709](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111135838709.png)

- fetch——拉取
- push——推送

### 2、推送本地库到远程库

```
git push 别名 分支
```

![image-20221111140627128](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111140627128.png)

### 3、拉取远程库到本地库

```
git pull 别名 分支
```

![image-20221111140741247](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111140741247.png)

### 4、克隆远程库到本地

```
git clone 远程地址
```

![image-20221111141038675](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221111141038675.png)

**clone：**

1. 拉取代码
2. 初始化本地仓库
3. 创建别名（默认origin）



## 在master分支增加分支

git checkout master

git pull

git checkout -b dev2

git push origin dev2

git branch --set-upstream-to=origin/dev2



## 暂存代码，切换分支

git branch  // 查看当前分支

git status //查看修改文件

git stash // 将本地改动暂存到“栈”里面

git checkout master // 切换到master分支

git pull // 拉取master分支最新的代码



当我们再想切换回当前的feature分支

git checkout feature // 切换回到feature分支

git stash show //显示当前放在栈里的文件

git stash pop // 再将刚才暂存到“栈”里面的代码取出来

git stash apply stash@{index}	//取出代码，不过这个不会删除该记录

git status //此时查看就出现了暂存前修改文件

git stash drop stash@{版本}   移除不需要的stash

git stash clear   清空所有的stash

git stash show -p/--patch   查看指定的stash的diff



## 代码文件上传到gitee

1、在gitee建立仓库

2、全局设置（第一次需要）

![image-20221104112343837](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221104112343837.png)

3、初始化仓库

```
git init
```

4、把本地文件放到暂存区

```
git add .
```

5、把本地文件放到本地仓库里面

```
git commit -m '注释'
```

6、链接远程仓库

```
git remote add origin gitee上的仓库地址
```

7、把本地仓库的文件推送到远程仓库push

```
git push -u origin master
```


