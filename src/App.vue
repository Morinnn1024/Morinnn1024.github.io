<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Sidebar from './views/Sidebar.vue'
import Post from './views/Post.vue'
</script>

<template>
  <div id="app" class="light-mode" style="height: 100vh;">
    <el-container>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside><Sidebar /></el-aside>
        <el-container>
          <!-- 页眉 -->
          <el-header>
            <Header />
          </el-header>
          <!-- 内容 -->
          <el-main><RouterView /></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.index {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0px;
}
.el-main {
  padding: 0px;
  height: 100%;
}
.el-aside {
  padding: 0px;
  height: 100%;
}

.header {
  background-color: var(--el-color-primary);
  color: #fff;
  padding: 10px;
  font-size: 25px;

  display: flex;
  flex-direction: column;

  min-width: 950px;
  box-shadow: 0 5px 4px rgba(105, 105, 105, 0.1);
}

.light-mode {
  background-color: #fff;
}

.dark-mode {
  background-color: #797979;
  color: #fff;
}
</style>
