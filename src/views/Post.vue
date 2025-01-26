<!-- Post.vue: 文档展示 -->
<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import formatCodeBlock from '../utils/codeBlockFormatter';

// Markdown 渲染
import { Marked } from "marked"; 
import { markedHighlight } from "marked-highlight"
import hljs from 'highlight.js/lib/common';
// Markdown 样式
import 'github-markdown-css/github-markdown-light.css';
// 代码块样式
// import 'highlight.js/styles/intellij-light.css' 
import 'highlight.js/styles/xcode.css' 


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

// 获取路由参数
const route = useRoute();
const queryParams = route.query;
console.log(queryParams);

axios.get(`./posts/${queryParams.path}`).then((res) => {  
  file.value = res.data;
  if (!res.data) {
    file.value = '## 施工中 ヽ(･ω･´ﾒ)';
  }
  postConcentMd.value = String(marked.parse(file.value));
  console.log(postConcentMd.value);
  postConcentMd.value = formatCodeBlock(postConcentMd.value);
}).catch((error) => {  
  console.error('Error reading file:', error);  
}); 
</script>

<template>
  <div class="main">
    <el-scrollbar class="custom-scrollbar">
    <div class="post-text">
      <div class="markdown-body">
        <div v-html="postConcentMd"></div>
        <!-- 页脚 -->
        <Footer style="margin-top: 40px" />
      </div>
    </div>
  </el-scrollbar>
  </div>

</template>

<style scoped>
:deep(.el-scrollbar__view) {
  min-height: 100% !important;
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
  padding-bottom: 50px;

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
  height: 100%; /* el-scrollbar 高度自适应父容器 */
}
</style>