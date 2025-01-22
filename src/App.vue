<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './views/Sidebar.vue'
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
  height: 39px;
  background-color: white;
  color: #fff;
  padding: 10px;
  font-size: 15px;

  display: flex; 
  align-items: center;
  justify-content: flex-end;

  border-bottom: 1px solid #ccc; /* 添加下边框 */
}

.light-mode {
  background-color: #fff;
}

.dark-mode {
  background-color: #797979;
  color: #fff;
}
</style>
