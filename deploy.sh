# 构建 posts 目录树
node "./src/views/posts/generateTree.cjs"
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