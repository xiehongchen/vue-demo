---
tags: [git]
summary: 'git操作命令'
category: [前端]
---
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



# git config

```shell
# 检查一下用户名和邮箱是否配置
git config --global --list

# 设置全局用户 
git config --global user.name 'your name' 
git config --global user.email 'xxxxx@example.com'

# 设置局部用户（在指定项目目录下，可配置不同项目有不同的git用户）
git config user.name 'ccc' 
git config user.email 'xxxxx@example.com' 

# 设置全局的一次性修改配置 
git config --global --edit

# 查看全局配置 
cat ~/.gitconfig
```

# git 生成密钥

```shell
ssh-keygen -t rsa -c 'xxxxx@example.com'
```

# git remote

```shell
# 初始化仓库
git init

# 查看已关联的仓库 
git remote -v

# 关联远程仓库 
git remote add origin https://github.com/xxxx/xxxx.git

# 删除远程仓库 
git remote remove origin

# 直接修改远程仓库 
git remote set-url origin https://github.com/xxxx/xxxx.git

# 查看远程仓库的详细信息 
git remote show 
git remote show origin
```

# git clone

克隆一个远程仓库到本地

```shell
# git clone <远程仓库地址>
git clone http://github.com/xxx/xxx.git

# git clone <远程仓库地址> <本地目录名> 
git clone http://github.com/xxx/xxx.git <project_name>
```

# git branch

Git 分支操作

```shell
# 查看本地仓库所有分支
git branch
# 查看远程仓库所有分支
git branch -r
# 查看本地和远程仓库的所有分支
git branch -a

# 基于当前分支，新建一个分支
git branch <new_branch_name>

# 删除分支：被删除分支 --是-- 基于当前分支新建出来的，可用-d 或 -D
git branch -d <local_branch_name>

# 删除分支：被删除分支 --不是-- 基于当前分支新建出来的，只能使用 -D
git branch -D <local_branch_name>

# 删除远程分支
git push origin --delete <remote_branch_name>

# 重命名当前分支
git branch -m <new_name>
```

# git checkout

```shell
# 切换到本地分支 
git checkout <local_branch_name> 

# 切换到指定某次提交的commit_id 
git checkout <commit id> 

# 从现有分支中新建新的分支，并切换到新分支 
git checkout -b <new_branch_name> 

# 从远程分支中新建新的分支，并切换到新分支 
git checkout -b <new_branch_name> origin/<remote_branch> 

# 放弃工作区的修改，只影响工作区 
git checkout . 
# 放弃工作区和暂存区的修改，影响工作区和暂存区 
git checkout -f
```

# git status

查看工作区和暂存区的状态

```shell
git status
```

# git add

将工作区的修改添加到暂存区

```shell
# 将工作区的所有修改提交到暂存区 
git add .

# 将指定目录添加到暂存区，包括子目录所有修改
git add [dir]

# 将src目录下的所有js文件添加到暂存区
git add src/**/**.js
```

# git commit

将暂存区的修改，提交到本地仓库

`git commit -m` 与 `git commit -am` 的区别

- `-m`: 是将暂存区的修改，提交到本地仓库
- `-am`: 将暂存区的修改提交到本地仓库之前，多了一步操作：先把本地的变动提交到暂存区，所以它是将暂存区和工作区的修改，提交到本地仓库。

**注意：** 这里需要注意一点，工作区提交到暂存区的变动文件，是已经与远程版本库有了关联的（即之前已经提交到远程的），该命令对新增的文件，是不起作用的，所以提交新增的文件，需要执行`git add .`  指令。

```shell
# 将暂存区的修改，提交到本地仓库 
git commit -m '提交信息'

# 将暂存区和工作区的修改，提交到本地仓库 
git commit -am '提交信息'

# 避开钩子函数的检查，强制提交 
git commit -m '提交信息' --no-verify 
git commit -m '提交信息' -n

# 将暂存区的修改，加到上一次的commit中，进入commit编辑，输入:wq 退出 
git commit --amend

# 修改上一次提交的commit信息（未push到远程仓库） 
git commit --amend --only -m '新的提交信息'
```

# git pull/push 拉取/提交

拉去远程仓库分支到本地仓库，或者推送本地仓库分支到远程分支

```shell
# 拉取代码，将远程仓库分支同步到本地 
git pull
git pull origin dev

# 将本地仓库的分支推送到远程分支（建立在本地分支追踪远程分支基础上） 
git push

# 推送到远程分支，并设置本地分支跟踪的远程分支 
git push --set-upstream origin <remote_branch> 
git push -u origin <remote_branch>
```

# git merge 分支合并

合并本地仓库的其他分支某个分支到当前分支

```shell
# 把本地仓库的某分支合并到当前分支 
git merge <local_branch> 

# 取消合并 
git merge --abort
```

# git stash 本地存储

将工作区的改动（未commit），临时存储在本地

```shell
# 默认按stash的顺序命名: stash@{n} 
git stash 

#添加备注 
git stash save 'message' 

# 查看存储列表 
git stash list 

# 应用最近一次的stash 
git stash apply 

# 应用指定的那一条 
git stash apply stash@{n} 

# 应用最近一次的stash，随后删除该记录 
git stash pop 

# 删除stash的所有记录 
git stash clear
```

# git log 日志过滤

主要用于查看Git版本演变历史（也就是提交历史），同时根据追加的参数和选项不同，过滤出想要的结果

**参数说明：**

```shell
按数量过滤： 
    -n: 显示前 n 条记录 
    shortlog -n：按作者分类，过滤出前 n 条 
按时间过滤： 
    --after=: 如 --after='2023-08-30'，显示 2023-8-30 之后的提交记录（包含8-30当天） 
    --before=: 如：--before='2023-08-30', 显示 2023-8-30 之前的提交记录（不包含8-30当天）
    before/after 是个相对时间，可以这么写：--after='a week ago', --after='yesterday' 
按作者过滤： 
    --author=: 作者名不需要精确匹配，只需要包含就行了，可使用正则匹配 
按commit信息过滤： 
    --grep='关键字': 过滤出记录中(commit提交时的注释)与关键字有关的记录 
过滤merge commit:
    --no-merges: 过滤出不包含 merge 的记录 
    —merges: 只过滤出包含 merge 的记录 


-p：按补丁显示每个更新文件的差异，比下一条 --stat命令信息更全 
--stat：统计出每次更新的修改文件列表, 及改动文件中 添加/删除/变动 的行数 
--pretty=：使用其他格式显示统计信息，参数有点复杂，目前很少用到
```

**常用指令：**

```shell
shell
复制代码git log

# 查看所有的提交记录
git log -all

# 将记录一行一行的形式展示：简洁明
git log --oneline

# 记录以图形化的形式展示
git log --graph

# 显示每次更新的文件修改统计信息，会列出具体文件列表
git log --stat

# 展示前10条
git log -10 
# 按作者分类，过滤出前10条
git shrtlog -10 
# 过滤出 'xxx' 的前10条记录，不包括 merge的记录
git log --author='XXX' -10 --no-merges 
# 过滤出 commit 提交的注释中  包含'feat'关键字的前10条记录，不包括merge 的记录
git log --grep='feat' -10 --no-merges
```

# git revert 代码撤销

撤销指定的提交，并产生一个新的commit，但保留了原来的commit记录

```shell
# 撤销指定的提交版本 
git revert <commit_id>

# 撤销的版本范围 
git revert <commit_id1>..<commit_id2>

# 撤销上一次提交 
git revet HEAD

# 撤销上上次提交 
git revet HEAD^
```

# git reset 代码回滚

让代码回滚到指定的提交版本，并且不保留原来的commit记录。

```shell
# 仅是撤销commit记录，所有改动都保留（工作区和暂存区） 
# HEAD^ 代表上个版本 
git reset --soft HEAD^ 
git reset --soft commit_id

# 撤销commit记录，不保留改动，直接回退到指定的提交版本 
git reset --hard HEAD^ 
git reset --hard commit_id

# 强推到远程 
git push origin dev --force
```

# git tag 版本号管理

```shell
# 列出所有标签 
git tag

# 默认在 HEAD 上创建一个标签 
git tag v1.0.0

# 指定一个 commit id 创建一个标签 
git tag v1.0.0 <commit_id>

# 创建带有说明的标签，用 -a 指定标签名，-m 指定说明文字 
git tag -a v1.0.0 -m "说明文字"

# 查看单个标签具体信息 
git show <tagname>

# 推送指定的本地标签到远程仓库 
git push origin <tagname>

# 推送本地未推送的所有标签到远程仓库 
git push origin --tags

# 删除本地标签 
git tag -d v1.0.0

# 删除一个远程标签 
git push origin tag --delete <tagname>
```

# 常被忽略的操作

有这样一个场景：

同事说某某分支推送推到远程了，让你帮忙看个问题，你用 `git branch -r` 查看远程分支列表，发现：没有看到对应的分支。这时候别傻不拉几的去问同事，你看不到是因为你没有去同步远程版本库到本地。

```shell
# 同步：拉取远程版本库的更新，同步到本地 
git fetch 
git fetch -p
```
