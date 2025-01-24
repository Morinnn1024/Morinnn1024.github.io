<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
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
