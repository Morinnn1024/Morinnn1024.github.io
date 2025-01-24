# 在 Vue3 中渲染 Markdown 文件
参考资料:
- [如何在前端vue3中处理 `markdown` 并使用样式和代码高亮](https://blog.csdn.net/qq_74177889/article/details/139021973)
- [markdown-it 官方文档](https://markdown-it.docschina.org)

## 安装 markdown-it 依赖
```bash
 npm install markdown-it --save
```

在组件的 `<setup>` 中导入:
```ts
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();
const text = ref('');

text.value = markdown.render("# ***Hello World!***");
```

在 `<template>` 中, 使用 `v-html` 指令渲染:
```html
<div v-html="text"></div>
```

若此处导入有红色波浪线报错, 则安装类型声明:
```bash
npm install --save-dev @types/markdown-it
```
## 导入处理本地文本文件
[使用Vue3实现本地文件读取与处理的高效方法](https://www.oryoy.com/news/shi-yong-vue3-shi-xian-ben-di-wen-jian-du-qu-yu-chu-li-de-gao-xiao-fang-fa.html)

安装 axios:
```bash
npm install axios --save
```

在组件的 `<setup>` 中导入:
```ts
import axios from 'axios';

// 假设你的文件存储在项目根目录的 public 文件夹下
// 此处 ./ 表示的即为 public 目录
axios.get('./example.md').then((res) => {  
  console.log('Data:', res.data);  
  postContent.value = markdown.render(res.data);
}).catch((error) => {  
  console.error('Error reading file:', error);  
});  
```