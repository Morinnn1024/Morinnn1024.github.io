<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { ElMessage } from 'element-plus';

document.addEventListener("DOMContentLoaded", function() {
  const container = document.body; // 或者其他父元素
  container.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("copy-button")) {
      const text = event.target.closest(".code-block").querySelector("code").textContent;
      console.log("click! ", text);
      // 复制代码内容到剪贴板
      navigator.clipboard.writeText(text)
        .then(() => {
          // 复制成功后的操作，例如显示提示信息
          ElMessage.success("代码已复制到剪贴板");
        })
        .catch(err => {
          // 复制失败后的操作
          ElMessage.error("复制失败:", err);
        });
    }
  });
});
</script>

<template>
  <div id="app" class="light-mode" style="height: 100vh;">
    <el-container>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="320px"><Sidebar /></el-aside>
        <el-container>
          <!-- 页眉 -->
          <el-header>
            <Header />
          </el-header>
          <!-- 内容 -->
          <el-main><RouterView :key="$route.fullPath"/></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
