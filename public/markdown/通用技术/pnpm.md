[pnpm文档](https://pnpm.io/zh/motivation)

# 功能比较

| 功能                     | pnpm                          | Yarn                 | npm                     |
| ------------------------ | ----------------------------- | -------------------- | ----------------------- |
| 工作空间支持（monorepo） | ✔️                             | ✔️                    | ✔️                       |
| 隔离的 `node_modules`    | ✔️ - 默认                      | ✔️                    | ✔️                       |
| 提升的 `node_modules`    | ✔️                             | ✔️                    | ✔️ - 默认                |
| 自动安装 peers           | ✔️                             | ❌                    | ✔️                       |
| Plug'n'Play              | ✔️                             | ✔️ - 默认             | ❌                       |
| 零安装                   | ❌                             | ✔️                    | ❌                       |
| 修补依赖项               | ✔️                             | ✔️                    | ❌                       |
| 管理 Node.js 版本        | ✔️                             | ❌                    | ❌                       |
| 有锁文件                 | ✔️ - `pnpm-lock.yaml`          | ✔️ - `yarn.lock`      | ✔️ - `package-lock.json` |
| 支持覆盖                 | ✔️                             | ✔️ - 通过 resolutions | ✔️                       |
| 内容可寻址存储           | ✔️                             | ❌                    | ❌                       |
| 动态包执行               | ✔️ - 通过 `pnpm dlx`           | ✔️ - 通过 `yarn dlx`  | ✔️ - 通过 `npx`          |
| 辅助缓存                 | ✔️                             | ❌                    | ❌                       |
| 列出许可证               | ✔️ - 通过 `pnpm licenses list` | ✔️ - 通过插件         | ❌                       |

# 配置项

```
-C <path>, --dir <path>
```

在 `<path>` 中启动 pnpm ，而不是当前的工作目录。

```
-w, --workspace-root
```

在[工作空间](https://pnpm.io/workspaces)的根目录中启动 pnpm ，而不是当前的工作目录。