---
title: Hexo 主题项目简介
---


## Hexo 主题开发
本主题参照[此博客](https://www.cnblogs.com/yyhh/p/11058985.html)开发.

### 项目文件结构
```js
// themes/wiki/
├── _config.yml
├── layout
│   ├── aside.ejs           // 侧边栏 (左)
│   ├── index.ejs           // 主页
│   ├── layout.ejs          // 布局
│   ├── nav.ejs             // 顶部导航栏
│   └── post.ejs            // 文章
└── source
    ├── css
    │   └── main.css        // 全局 css 样式
    ├── js
    │   └── main.js         // 设置触发事件
    └── lib
        ├── font-awesome            // 文字图标库
        ├── highlight               // 高亮库
        ├── jquery-3.7.1.min.js     // jquery.js
        └── jquery.pjax.js          // jquery.pjax
```

### 注意事项
- 若使用的`Hexo`版本高于`7.0`, 请运行以下命令, 卸载自带的`highlight`插件:
    ```bash
    # macOS 系统若报错, 请使用 sudo 命令
    npm uninstall hexo-prism-plugin --save
    ```