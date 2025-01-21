<!-- Post.vue: 文档展示 -->
<script setup lang="ts">
import Footer from '@/components/Footer.vue';

</script>

<template>
  <el-scrollbar>
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    <!-- 页脚 -->
    <el-footer><Footer /></el-footer>
  </el-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
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