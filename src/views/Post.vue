<!-- Post.vue: 文档展示 -->
<script setup lang="ts">
import Footer from '@/components/Footer.vue';

</script>

<template>
  <el-scrollbar min-width="670">
    <div class="post-text">
      <h1>标题</h1>
      <p>内容</p>
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </div>
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    <!-- 页脚 -->
    <el-footer><Footer /></el-footer>
  </el-scrollbar>
</template>

<style scoped>
.post-text {
  width: 100%;
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