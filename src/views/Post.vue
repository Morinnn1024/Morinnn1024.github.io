<!-- Post.vue: 文档展示 -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import MarkdownIt from 'markdown-it';
import axios from 'axios';  

const markdown = new MarkdownIt();
const postContent = ref('');

axios.get('./posts/软件工程_2022/00-写在前面.md').then((res) => {  
  console.log('Data:', res.data);  
  postContent.value = markdown.render(res.data);
}).catch((error) => {  
  console.error('Error reading file:', error);  
});  

</script>

<template>
  <el-scrollbar min-width="670">
    <div class="post-text">
      <p v-html="postContent"></p>
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </div>
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    <!-- 页脚 -->
    <el-footer><Footer /></el-footer>
  </el-scrollbar>
</template>

<style scoped>
.post-text {
  padding: 20px;
}
.scrollbar-demo-item {
  width: 100%;
  min-width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>