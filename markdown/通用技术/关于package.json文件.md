# package.json

## `name`

项目的名称，通常使用小写字母，没有空格，可以使用横线或下划线

## `version`

项目的版本号

## `description`

项目的简要描述，它对于 `SEO` 也很有用，因为它帮助其他人可以在`npmjs.com` 网站上找到我们的软件包

## `main`

入口文件，指定了项目的主要入口文件

## `scripts`

包含了一些脚本命令，可以通过 `npm run script-name` 运行。例如：

```json
"scripts": {
  "start": "node index.js",
  "test": "mocha test"
}
```

## `dependencies`

生产环境依赖，即在生产环境中运行时需要的依赖包

我们在`dependencies`中看到的脱字号 (`^`) 和波形符 (`~`) 是 [SemVer](https://link.juejin.cn?target=https%3A%2F%2Fsemver.org%2F) 中定义的版本范围的表示法。

在语义版本控制中,版本号由三个数字组成,格式如下:

```js
`主版本号.次版本号.修订号`
```

- 脱字符号(`^`)表示允许更新到最新的次版本号:
  - `^1.2.3` 表示 `>=1.2.3` 并且 `<2.0.0` 的最新版本
- 波形符(`~`)表示允许更新到最新的修订号:
  - `~1.2.3` 表示` >=1.2.3` 并且 `<1.3.0` 的最新版本

所以简单来说:

> - `^` 用于锁定主版本号和次版本号
> - `~` 用于锁定主版本号和次版本号及修订号

## `devDependencies`

开发环境依赖，即在开发时需要的依赖包

--save-dev

## `keywords`

关键字数组，用于描述项目，有助于其他人搜索到你的项目

## `author`

项目的作者。

## `license`

项目的许可证，它向使用包的用户描述了我们在使用此软件包时设置的**权限**和**限制**
如果我们不希望在任何条件下向软件包的用户授予任何权限，可以将此字段设置为 `UNLICENSED`

## `repository`

项目的仓库信息，通常包括 `type`（仓库类型）和 `url`（仓库地址）。

## `engines`

指定项目运行所需的 Node.js 版本范围。

## `private`

一个布尔值，用于指定该项目是否为私有项目，防止意外发布软件包

## `browserslist`

指定项目的目标浏览器范围。

## `homepage`

通常，我们会在此字段中链接到项目的网站地址。或者，我们还可以指向项目的 `README` 或文档

## `bugs`

```json
{
  "bugs": {
    "url": "https://github.com/owner/project/issues",
    "email": "project@hostname.com"
  }
}
```

当别人使用了我们的包，在遇到问题后可以依据这个字段提供的`url`和`email`来提出问题，并尝试在需要的地方寻找解决方案。

如果我们不想提供支持电子邮件，我们可以直接将 `URL` 分配给 `bugs` 属性。

```json
{
  "bugs": "https://github.com/owner/project/issues",
}
```

## `exports`

我们可以使用 `exports` 字段定义软件包的入口点，作为 `main` 字段的替代方案。与 `main` 不同，`exports` 允许我们定义`子路径导出`和`条件导出`。

## `type`

此字段描述了当前软件包中的`.js` 文件应该被视为 `ESM` 还是 `commonjs`。我们可以为 `ESM` 设置`module`类型，并为`非ESM` 软件包设置 `commonjs`

此外，我们还可以明确指定文件是否应该解释为 `ESM` 或 `commonjs`，使用`.mjs` 扩展名表示 `ESM`，`.cjs`扩展名表示 `commonjs` 文件。



