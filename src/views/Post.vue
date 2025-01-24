<!-- Post.vue: 文档展示 -->
<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import { ref, onMounted } from 'vue';
// Markdown 渲染
import { Marked } from "marked"; 
import { markedHighlight } from "marked-highlight"
import hljs from 'highlight.js/lib/common';
// Markdown 样式
import 'github-markdown-css/github-markdown-light.css';
// 代码块样式
import 'highlight.js/styles/intellij-light.css' 

import axios from 'axios';

const file = ref('');
const postConcentMd = ref('');

// 配置 highlight.js
hljs.configure({
  // 启用所有语言
  languages: hljs.listLanguages()
});

// marked 配置
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'shell'
    return hljs.highlight(code, { language }).value
  }
  })
)

axios.get('./posts/软件工程_2022/Web开发速通手册/Vue3_ElementPlus/02-页面构成.md').then((res) => {  
  file.value = res.data;
  postConcentMd.value = String(marked.parse(file.value));
  console.log(postConcentMd.value);
}).catch((error) => {  
  console.error('Error reading file:', error);  
}); 
</script>

<template>
  <div class="main">
      <el-scrollbar class="custom-scrollbar">
    <div class="post-text">
      <div v-html="postConcentMd" class="markdown-body"></div>
    </div>

    <!-- 页脚 -->
    <el-footer><Footer /></el-footer>
  </el-scrollbar>
  </div>

</template>

<style scoped>
.main {
  height: 100%;
  position: relative;
}
/* 设置背景图片透明度 */
.main::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../../bg-main-winter.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.7;
}

.post-text {
  padding: 0 20px;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  padding-bottom: 75px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  backdrop-filter: blur(4px);
  background-color: rgba(255,255,255, 0.6);
}

.scrollbar-container {
  width: 100%; /* 父容器宽度自适应屏幕 */
  min-width: 670px;
  height: 300px; /* 根据需要设置高度 */
}

.el-scrollbar {
  width: 100%; /* el-scrollbar 宽度自适应父容器 */
}

/* 当屏幕宽度小于等于 950px 时 */
@media (max-width: 950px) {
  .custom-scrollbar {
    min-width: 670px; /* 固定宽度为 670px */
  }
}
</style>