copy from [UU跑腿·技术团队](https://tech.uupt.com/?p=1185)

## **什么是Monorepo? 何时需要它？**

`Monorepo(**mó nuò ré pō**)`是一种软件开发策略，它使用单一的代码库来管理项目中的所有代码，像一些著名的开源库[Vue](https://github.com/vuejs/core)、[Babel](https://github.com/babel/babel)、[Nuxt](https://github.com/nuxt/nuxt)、[React](https://github.com/facebook/react/)都在使用这种模式来进行代码管理。

它是一个代码库中许多不同应用程序和软件包的集合，按最简单的话来说，其实就是把多个项目放在一个`Git`仓库下进行管理。

与`Monorepo`相对应的就是`PolyRepo`也叫`Multirepo`, `PolyRepo`就是将每个项目分散到不同的代码仓库，就是我们平常工作中经常使用的代码管理模式。

![img](https://tech.uupt.com/wp-content/uploads/2023/03/vs.png)

那么我们何时需要使用`Monorepo`呢？

假如现在我们有这么几个项目，并且采用`PolyRepo` 的模式去进行代码管理:

- adminApp – 后台管理应用
- h5App – h5移动端应用
- shared-utils – 公共方法，供adminApp以及h5App 进行调用。

其中`shared-utils`作为一个`npm`包，其它项目通过`npm install`进行安装使用。

如果我们发现`shared-utils`中的一个方法有Bug，我们进行修复的时候大致步骤如下：

1. 在`shared-utils` 代码仓库中进行修复以及提交。
2. 更新`shared-utils`的包版本，发布到`npm`上
3. 在`adminApp`中更新`shared-utils`包版本，并进行构建发布。
4. 在`h5App`中更新`shared-utils`包版本，并进行构建发布。

如此几个步骤下来，修复错误所需的时间会比较长，如果实际的业务应用不止两个，那么这个问题完全修复的时间则更加长。

从以上的例子可以看到，`Polyrepo`的问题主要有以下几点:

- 应用之间的版本管理比较混乱
- 构建工具以及相关项目配置不统一，不同项目间的构建工具可能会存在差异，可能会导致在配置CI/CD构建部署的流程中出现问题
- 应用之间的代码共享比较困难，虽然可以通过抽离`npm`包的形式来达到代码共享以及复用，但是对于开发人员来讲，流程有些过于繁琐，一旦出现问题，会大大增加修复问题的时间。

下面将我们的代码采用`Monorepo`模式整合在一个代码仓库中：

```
├── apps
│   ├── adminApp
│   │   ├── package.json
│   │   └── webpack.config.js
│   └── h5App
│       ├── package.json
│       └── webpack.config.js
├── packages
│   └── shared-utils
│       └── package.json
├── package.json
└── webpack.config.js
```

可以看到`apps`目录下将存放了`adminApp`以及`h5App`应用，`packages`目录下存放了公共的工具库`shared-utils`，那么我们再来走一下上边修复问题的流程：

1. 对`shared-utils`的代码进行修复
2. 进行整体项目的构建以及部署，等待部署完成，所有应用的问题即可修复完毕。

除了流程步骤减少之外，还可以做到以下优化：

- 不需要手动更新应用中引入`shared-utils`的版本，因为它们不依赖于`npm`中`shared-utils`版本，而是依赖库此代码库中的版本
- 统一进行项目依赖的管理，结合`pnpm workspace`我们可以在项目根目录统一管理以及安装所有应用的依赖。
- 结合`CI/CD`，可以实现单个项目以及全部项目的构建部署工作。

综上所述，可以知道`Monorepo`主要能够解决以下问题：

1. 代码复用：多个项目可以共享代码库，避免了代码的重复编写和维护。这可以减少开发工作量，提高代码的质量和稳定性。
2. 依赖管理：Monorepo中的所有项目使用同一份依赖列表，可以避免依赖管理的冲突和版本控制的混乱。同时，依赖的更新和升级也变得更加简单和统一。
3. 代码重构：Monorepo中的代码可以更加方便地进行重构和重组，因为不同项目之间的代码可以更容易地相互访问和调用。
4. 统一构建和部署：Monorepo中的所有项目使用同一套构建和部署流程，可以避免流程的重复和冲突。同时，这也可以更加方便地进行持续集成和持续部署。

所以当你的开发的项目遇到了上述问题，那么你可以考虑将你的项目改造为`Monorepo`。

## **什么是pnpm? 它有哪些优势？**

[pnpm](https://pnpm.io/zh/motivation)跟`npm`、`yarn`一样，都是用于管理Node包依赖的管理器。

根据官网的描述，它的主要优点如下:

- 能够大大节省磁盘空间，不同于`npm`，同一个依赖被不同的项目使用时，都会被重复安装一次，而`pnpm`则会将依赖按版本进行存储，如果在存储中心能够找到此依赖，则会将包里的文件硬链接到存储中心中对应依赖的位置，不会重复安装。
- 大大提高了安装速度，之前安装过的依赖都会直接从存储中心中获取并链接到项目的`node_modules`中。
- 避免出现幽灵依赖的问题，默认情况下，pnpm 使用符号链接将项目的直接依赖项添加到模块目录的根目录中，而对应的在项目中，我们只可以访问`package.json`文件中声明过的依赖项，无法访问未声明的的`依赖项`，想了解更多可以点击查看[平铺的结构不是 node_modules 的唯一实现方式 | pnpm](https://pnpm.io/zh/blog/2020/05/27/flat-node-modules-is-not-the-only-way)

下图是与其它包管理器的比较:

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-20.png)

由此来看，`pnpm`的优势很大，而且像[Vue](https://github.com/vuejs/core)、[Taro](https://github.com/NervJS/taro)等主流的开源库也使用`pnpm`来作为项目包管理器。这也是我们团队目前统一使用`pnpm`作为包管理器的原因。

### **pnpm Workspace**

#### **如何启用**

一个 workspace 的根目录下必须有 [pnpm-workspace.yaml](https://pnpm.io/zh/pnpm-workspace_yaml) 文件， 也可能会有 [.npmrc](https://pnpm.io/zh/npmrc) 文件。

`pnpm-workspace.yaml`示例:

```
packages:
  - "packages/*"
```

这就代表`packages`文件夹为当前的工作空间。

#### **WorkSpace协议**

[WorkSpace协议](https://pnpm.io/zh/workspaces#workspace-协议-workspace)是`pnpm`支持`Monorepo`的一个重要功能，它可以指定工作空间内的包依赖关系。

比如，有这样一个目录

```
├── packages
│   ├── packageA
│   │   └── package.json
│   └── packageB
│       └── package.json
├── package.json
└── pnpm-workspace.yaml
```

在这个项目中, `A`包依赖了`B`包，那么我们可以通过别名进行应用，

比如，在`A`包的`package.json`文件中声明:

```
{
  "name": "package-a",
  "private": true,
  "version": "0.0.1",
  "dependencies": {
    "package-b": "workspace:^"
  },
}
```

这样在根目录进行`pnpm install`时，`pnpm`会自动帮我们处理包之间的引用关系。

看到这，你可能会有些疑问，那我将`A`包发布到npm上时，还存在这个`workspace`的协议不就有问题了吗？这一点`pnpm`官方也替我们处理了，通过`pnpm publish`时，`pnpm`会将这些`workspace`协议自动转换为当前包的正式版本号，具体可以查看[https://pnpm.io/zh/workspaces#%E5%8F%91%E5%B8%83-workspace-%E5%8C%85](https://pnpm.io/zh/workspaces#发布-workspace-包)，官方的例子更加清晰易懂。

## **什么是Turborepo？**

[Turborepo](https://turbo.build/repo/docs) 是一个高性能的 JavaScript 和 TypeScript 项目构建系统，采用`Go`语言实现，所以在语言层面上就具有一定的性能优势，可以大大提高`monorepo`项目的构建速度。

### **优势**

- 增量构建： Turborepo 会记住你之前构建的结果并跳过已经计算过的内容。
- 感知内容hash: Turborepo 通过文件的内容，而不是时间戳来确定需要构建的内容。
- 并行处理: 不浪费任何闲置 cpu 性能，以每个核心最大的并行度来执行构建。
- 远程缓存 : 与团队成员、CI/CD 共享远程构建缓存，以实现更快的构建。
- 零运行时开销: Turborepo 不会影响您的运行时代码或 sourcemap。
- 任务管道: 定义任务之间的关系，然后让 Turborepo 优化构建内容和时间。
- 渐进式设计：可以在几分钟内快速集成到项目中

### **如何创建一个Turborepo项目**

运行以下命令，然后根据提示进行选择创建即可

```
pnpm dlx create-turbo@latest
or 
npx create-turbo@latest
```

### **如何集成到现有项目中**

这里我们以`npm create vite@latest`创建的项目为例子。

1. 在项目根目录下，安装`turbo`依赖

```
pnpm i turbo --save-dev
```

1. 在根目录下添加`turbo.json`配置文件，向`pipeline`字段中配置`npm scripts`中的命令，比如`build`命令

```
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

配置完成后，我们就可以使用`turbo`来执行我们项目的`build`命令。

```
pnpm turbo build
```

第一次构建时：

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-1-1.png)

第二次构建时：

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-2-1.png)

可以看到，在第二次构建时，`turbo`直接使用了之前构建过的缓存，构建时间由之前的`3.765`秒缩减到了`284`毫秒

### **turbo.json配置项说明**

示例文件

```
{
  "$schema": "https://turborepo.org/schema.json",
  // 管道配置 
  "pipeline": {
    "dev": {
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "env": ["SOMETHING_ELSE"], // value will impact the hashes of all build tasks
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "outputs": ["coverage/**"],
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"],
      "outputMode": "full"
    },
  },
  "globalEnv": [
    "GITHUB_TOKEN" // value will impact the hashes of all tasks
  ],
  "globalDependencies":[
    ".env", // contents will impact hashes of all tasks
    "tsconfig.json" // contents will impact hashes of all tasks
  ]
}
```

#### **$schema**

指定配置文件的JSON Schema，它可以帮助你在编辑器中自动补全和校验配置项，为固定值https://turborepo.org/schema.json

#### **pipeline**

pipeline 字段是一个对象，用来表示你的项目的任务依赖图。

`Turbo` 会根据这些约定来合理地调度、执行和缓存任务的输出。pipeline 对象中的每个键都是一个可以被 `Turbo run` 执行的任务的名称

如果`Turbo` 发现一个工作空间有一个 `package.json scripts` 对象中有一个匹配的键，它会在执行时将 pipeline 任务配置应用到那个 npm 脚本上。这样你就可以使用 pipeline 来设置你整个 `Turborepo` 的约定。

##### **DEPENDSON**

该字段是一个字符串数组，表示当前任务所依赖的其它任务。

分为两种依赖，前缀带有`^`为拓扑依赖，不带则为普通依赖，具体差别如下：

- 拓扑依赖: 当前任务执行之前必须要等待它所依赖的包中对应的命令运行完成后才能开始运行。

```
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

假如有一个名为`packageA`的包，它的`package.json`文件中`devDependencies`或者`dependencies`字段含有名为`packageB`的包，那么执行通过`pnpm turbo run build`运行`packageA`的build命令之前，会先等待`packageB`包的build命令运行完成后才会继续运行

- 普通依赖： 需要等待自身包工作空间的命令运行完成后才开始运行

```
{
  "pipeline": {
    "build": {
      "dependsOn": ["test"]
    }
  }
}
```

按以上配置，假如通过`pnpm turbo run build`运行`packageA`的build命令之前，会先去执行`packageA`的test命令，test命令执行完毕后，才会去执行build命令。

##### **ENV**

任务所依赖的环境变量，与globalEnv作用类似

##### **OUTPUTS**

构建产物输出的目录，当开启缓存时，`Turbo`会将对应目录的产物进行缓存

##### **CACHE**

布尔类型，是否开启缓存，默认为`true`

##### **INPUTS**

默认为`[]`，用于指定哪些文件的变化会触发任务的重新执行。

##### **OUTPUTMODE**

设置输出日志记录的类型

- full：默认设置，显示所有输出
- hash-only: 只显示任务的hash值
- new-only: 只显示没有命中缓存的任务输出
- errors-only: 只显示失败的任务输出
- none: 隐藏所有任务输出

##### **PERSISTENT**

如果当前任务是一个长时间运行的进程，比如`dev`命令，则可以设为`true`

#### **globalEnv**

globalEnv 是一个字符串数组，用来指定一些环境变量作为全局的哈希依赖。这些环境变量的内容会被包含在全局的哈希算法中，影响所有任务的哈希值。例如，你可以在 globalEnv 中指定 GITHUB_TOKEN，这样当 GITHUB_TOKEN 的值发生变化时，所有任务的缓存都会失效。

globalEnv 的值是从运行 turbo 命令的环境中获取的，你可以在终端中设置或者使用 .env 文件来管理。

#### **globalDependencies**

globalDependencies 是一个字符串数组，用来指定一些文件作为全局的哈希依赖。这些文件的内容会被包含在全局的哈希算法中，影响所有任务的哈希值，例如配置`tsconfig.json`、`jest.config.js`，当这些文件内容有变化时，所有构建缓存将会失效

### **与lerna相比**

在`Turborepo`出现之前，[lerna](https://lerna.js.org/docs/introduction)是最常用的`monorepo`管理工具。`lerna`同样能够支持工作空间内包任务的执行，但它在运行时没有`Turborepo`的缓存以及任务调度机制，在构建速度上，相对于`Turborepo`还是有一定差距。

但是, `lerna`提供了npm包的发布以及版本管理相关机制以及[命令](https://github.com/lerna/lerna/tree/main/libs/commands/publish#readme)，而`Turborepo`并没有实现这方面的功能，所以我们可以将两者结合使用，`Turborepo`用于进行管理工作空间内任务命令的执行，`lerna`来进行`npm`包的发布以及版本管理。

## **Changesets**

[Changesets](https://github.com/changesets/changesets/tree/main#readme) 是`pnpm`官方推荐的一个管理版本以及变更日志的工具，专注于多包管理。

### **如何配置**

1. 安装依赖，并进行初始化，安装之前确保你声明了[pnpm-workspace.yaml](https://pnpm.io/zh/7.x/pnpm-workspace_yaml)配置文件，证明启用了`pnpm workspace`

```
pnpm add -Dw @changesets/cli

pnpm changest init
```

运行完毕后，会在`.changeset`目录下新增`config.json`配置文件，如下:

```
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

#### **配置字段说明**

- **commit**：类型为布尔值，默认值为false。当将此字段配置为true时，在执行change和bump命令时，将自动执行提交代码操作。
- **access**：类型为restricted | public，默认值为restricted。用于配置当前包的发布形式，如果配置为restricted，则作为私有包发布，如果为public，则发布公共范围包。
- **baseBranch**：类型为字符串，默认值为main。仓库主分支。该配置用于计算当前分支的变更包并进行分类。
- **ignore**：类型为字符串数组，默认值为空数组。用于声明执行bump命令时忽略的包，与bump命令的–ignore参数用法一致，注意两者不能同时使用。
- **fixed**：类型为字符串数组数组，默认值为空数组。用于在monorepo中对包进行分组，相同分组中的包版本号将进行绑定，每次执行bump命令时，同一分组中的包只要有一个升级版本号，其他会一起升级。支持使用正则匹配包名称。
- **linked**：类型为字符串数组数组，默认值为空数组。与fixed类似，也是对monorepo中对包进行分组，但是每次执行bump命令时，只有和changeset声明的变更相关的包才会升级版本号，同一分组的变更包的版本号将保持一致。支持使用正则匹配包名称。
- **updateInternalDependencies**：类型为patch | minor，默认值为patch。用于声明更新内部依赖的版本号规则。当执行bump命令升级版本号时，默认会自动更新仓库中使用该包的依赖声明。
- **changelog**：类型为布尔值 | 字符串 | [字符串, unknow]，默认值为@changesets/cli/changelog。生成Changelog规则。

一般来说，你不需要对这些配置进行更改。

### 如何进行版本变更以及发布

当项目下的某个包有变动时，可以按照以下步骤进行版本变更以及发布

1. 运行`pnpm changest`，将会在命令终端将你当前工作空间所有的包列出来，手动选取需要发布的包，选取版本以及填写变更信息。
2. 运行 `pnpm changeset version`。 这将提高先前使用 pnpm changeset （以及它们的任何依赖项）的版本，并更新变更日志文件。
3. 运行 `pnpm install`。 这将更新工作空间内的锁文件并重新构建包。
4. Git提交更改。
5. 运行 `pnpm publish -r`。 此命令将发布所有包含被更新版本且尚未出现在包注册源中的包。

## **项目实践**

上面已经将所涉及到的工具以及基本用法都介绍完了，那么接下来我们将它们结合起来从0到1搭建一个`Monorepo`项目。

### **搭建项目结构**

首先使用上边所讲到的创建`Turborepo`项目的命令

```
pnpm dlx create-turbo@latest
```

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-3-1-1024x713.png)

之后我们会得到这样一个目录:

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-4-1.png)

其中 `turbo.json`以及`pnpm-workspace.yaml`文件已经自动帮你创建好了，无需手动配置

`apps`文件夹视情况可以删除，如果你搭建的项目偏向于项目应用的开发，那么可以保留，并将你的应用代码放置在此文件夹下。

`packages`文件下偏向于存放公共类库、组件库之类的文件。

### **接入Changesets**

如果你搭建的项目偏向于类库、组件库管理，那么就需要接入`Changesets`来进行包版本的发布以及管理了。

按照上方的命令进行依赖的安装以及配置文件的创建

```
pnpm add -Dw @changesets/cli

pnpm changest init
```

配置完毕后，让我们修改一下`packages/ui`中的代码，将`Button`组件的`Boop`文案修改一下

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-5-1-1024x291.png)

然后运行`pnpm changeset`命令，选择你要发布的npm包

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-6-1.png)

这里我们敲空格选中`ui`，点击回车，继续下一步，此时会让我们选择要变更的版本号，这里我们选择`patch`,同样也是空格键进行选择，选择完版本后会让我们填写变动信息，用于后续`CHANGELOG.md`文件的生成

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-7-1.png)

继续回车，进行下一步

运行`pnpm changeset version`，生成对应的`CHANGELOG.md`文件，同时版本号也变为了`0.0.1`

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-8-1.png)

![img](https://tech.uupt.com/wp-content/uploads/2023/03/image-9-1.png)

最后将我们这些代码变动进行`commit`提交，然后运行`pnpm publish -r`命令，即可发布对应的npm包。

### **文档能力的增强**

如果你想为你的`Monorepo`项目增加文档预览的能力，那么推荐你接入以下的文档工具:

- [dumi 为组件开发场景而生的静态站点框架](https://d.umijs.org/guide)
- [ruabick 类似dumi的静态站点框架，基于VitePress](https://github.com/dewfall123/ruabick)

## **总结**

`Monorepo`能够解决项目中代码复用、版本管理混乱、规范不统一的问题，不少知名的开源库也在使用它进行项目管理。

不过`Monorepo`也不是银弹，它也会带来一些问题，比如后期项目过大、无法针对子目录做权限管理。

所以我们要结合实际的业务需求来进行代码仓库模式的选择，比如开发内部工具库、组件库这种场景就非常适合使用`Monorepo`来进行代码管理；而多个项目应用之间的代码复用也有许多方案, 比如 利用webpack的[模块联邦](https://webpack.docschina.org/concepts/module-federation/)功能、抽离`npm`包进行引用、使用`git submodule`等功能。

总之，每种方案都有利有弊，我们要做的就是不断去思考并调研新技术，选出最符合我们业务场景的方案。
