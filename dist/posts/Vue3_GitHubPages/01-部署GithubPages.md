# 01 - 部署 Vue3 项目到 Github Pages

## 一. 创建 git 仓库
使用 `git` 管理项目代码是每个程序员的必备技能。

**※ 在开始任何项目前, 都强烈建议先创建本地`git`存储库, 以避免变更导致问题难以回退到之前的版本。**

### 1. 创建本地 git 仓库
```bash
# 初始化本地 git 仓库
git init
# 添加所有文件到暂存区
git add .
# 提交更改。提交消息为 init
git commit -m "init"
```
### 2. 在 Github 上创建远程仓库
   1. 登录 Github 账号。
   2. 点击右上角的 `+` 号, 选择 `New repository`。
   3. 在 `Repository name` 中填写仓库名称。
   4. 如果你希望将页面部署在 https://*用户名*.github.io, 则需要在`Repository name`中填写`用户名.github.io`, 其中 *用户名* 是你的 GitHub 用户名。
   - 你也可以自行决定存储库的名称, 例如`blog`。此时部署后的网站地址将会是 https://*用户名*.github.io/*blog*。
   5. 选择可见范围为 `Public`。(如果你希望通过此项目部署页面, `Public` 是必须的。)
   6. 点击 `Create repository`。

### 3. 将本地仓库连接到远程仓库 
```bash
# 连接到远程仓库
git remote add origin https://github.com/<你的 GitHub 用户名>/<你的 GitHub 存储库名>.git
# 将提交的变更推送到远程仓库
git push -u origin main
```
*关于更多`git`命令的用法, 例如`pull`、`push`、`branch`等, 请自行搜索学习相关资料。*

### Tips: 其他方法
另一个比较方便的方法是使用 VSCode 或其他 IDE 集成的源代码管理工具, 新建仓库, 并将项目代码上传。
1. 进入 VSCode 的源代码管理 (Ctrl + Shift + G)。
2. 点击`发布到 GitHub`。
3. 登录 GitHub 账号; 在消息对话框中填写必要信息。

*有关其他方法, 可自行搜索相关资料。*

## 二. 修改 vite.config.js
修改`vite.config.js`, 在`defineConfig`中添加`base`字段, 值为`/你的存储库名/`:
```ts
// vite.config.ts
export default defineConfig({
  // ... 其他属性
  base: '/你的存储库名/',  // 例如: '/blog/'
  // 若存储库名称为 用户名.github.io, 此处需设置为 '/'
})
```
## 三. 修改 .gitignore
将`.gitignore`文件中的`dist`注释掉。
```bash
# .gitignore
...
node_modules
.DS_Store
# dist
dist-ssr
coverage
*.local
...
```

## 四. 部署页面
### 1. 在终端中运行以下命令:
   ```bash
   # 构建项目
   npm run build
   # 将项目提交到 main 分支
   git add .
   git commit -m "Deploy to Github Pages"
   git push origin main
   # subtree push 到分支 gh-pages
   git subtree push --prefix dist origin gh-pages
   ```
   你也可以将上述命令编写至`deploy.sh`脚本文件, 每次部署时只需要终端运行`sh deploy.sh`即可。
### 2. 修改 GitHub 存储库的 Settings
访问你的 GitHub 存储库页面, 打开 `Settings` >> `Pages`进行配置。

在 `Build and deployment`配置选项中:
   - 将`Source`切换至`Deploy from a branch`
   - 将`branch`切换至`gh-pages` `/(root)`, 然后点击`Save`保存。

## 五. 访问 GitHub 页面
访问 http://*用户名*.github.io/*你的存储库名*。
- 如果存储库名为`用户名.github.io`, 请访问 http://*用户名*.github.io。

检查你的页面能否正常运行。

## 六. 解决路由跳转刷新后, 出现 404 错误的问题

### 1. 问题描述
在使用`Vite`构建的`Vue3`项目中, 部署到`Github Pages`后, 路由跳转刷新后, 出现`404`的问题。

例如, 访问`vue`的示例项目, 点击`About`按钮, 会跳转到`/about`页面。然而该页面刷新后, 会出现 GitHub Pages 的`404`页面。

### 2. 问题原因

[vue 或 react 项目上线刷新出现 404 的原因以及解决办法](https://blog.csdn.net/weixin_42299708/article/details/132055098)

>我们打开`vue`/`react`打包后生成的`dist`文件夹，可以看到只有一个`index.html`文件及一些静态资源。这个是因为`vue`/`react`是单页应用(SPA)，只有一个`index.html`作为入口文件，其它的路由都是通过`JS`来进行跳转的。
>
>而网页上显示的是静态资源的绝对路径，虽然浏览器上的`url`变化了，但实际上服务器的静态资源是没有更改路径的，始终只有`index.html`这一个入口，所以刷新就会导致`url`上的路径和服务器上的资源不匹配，无法找到静态资源，从而报错`404`（多页应用因为有多个入口文件，所以不会有这样的问题）。

### 3. 解决方法
进入`dist`文件夹, 复制其中的`index.html`文件, 重命名为`404.html`。

这样, 当访问不存在的路径时, 就会自动跳转到`404.html`重定向的`index.html`页面访问静态资源, 而不需要经由 GitHub Pages 的后端解析路径。

因此, 我们可以对部署的脚本文件`deploy.sh`作如下修改:
```bash
# 构建项目
npm run build
# 复制dist文件夹的`index.html`文件，将复制后的文件重命名为`404.html`
cp dist/index.html dist/404.html
# 将项目提交到 main 分支
git add .
git commit -m "Deploy to Github Pages"
git push origin main
# subtree push 到分支 gh-pages
git subtree push --prefix dist origin gh-pages
```

### 4. 检查部署后的页面
终端运行`sh deploy.sh`, 访问你的部署页面地址, 检查路由跳转是否正常。

## 七. 解决部署 GitHub Pages 后, 网站图标无法加载的问题

修改根目录下的`index.html`文件, 将`/favicon.ico`修改为`/favicon.ico?`, 即在末尾添加一个问号即可。

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico?">   <!-- 修改此处 href 属性即可 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
    <script type="module" crossorigin src="/assets/index-B3hcuucP.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-5dJgFXHu.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

## 参考资料
1. [Vite 构建的 Vue3 项目部署到 GitHub Pages](https://zhuanlan.zhihu.com/p/686733060)
2. [将 Vue3 项目部署到 Github Pages](https://www.jianshu.com/p/1dabc3f7d6d0)