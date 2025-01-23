<!-- Post.vue: 文档展示 -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/atom-one-dark.css' //样式

import axios from 'axios';

const file = ref('');
const postConcentMd = ref('');
const markdown = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // 使用默认的转义
  }
});



axios.get('./posts/软件工程_2022/Web开发速通手册/Vue3_ElementPlus/02-页面构成.md').then((res) => {  
  file.value = res.data;
  postConcentMd.value = markdown.render(file.value);
  console.log(postConcentMd.value);
}).catch((error) => {  
  console.error('Error reading file:', error);  
}); 
</script>

<template>
  <el-scrollbar class="custom-scrollbar">
    <div class="post-text">
      <div v-html="postConcentMd" class="markdown-body"></div>
    </div>

    <!-- 页脚 -->
    <el-footer><Footer /></el-footer>
  </el-scrollbar>
</template>

<style scoped>
.post-text {
  padding: 20px;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
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