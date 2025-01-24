<!-- Header.vue: 顶栏 -->
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
</script>

<template>
  <div class="header" height="20" width="100%" style="min-width: 650px;">
    <el-text size="large" style="margin-right: 30px;">❄️</el-text>
    <el-input placeholder="搜索..." :prefix-icon="Search" style="width: 150px; margin-right: 30px;"></el-input>
    <el-link @click="router.push('/')">首页</el-link>
    <el-link>食用指南</el-link>
    <el-link href="https://github.com/Morinnn1024">GitHub</el-link>
    <el-link href="https://morinnn.lofter.com">LOFTER</el-link>
    <el-link href="https://x.com/DYH3687941">X</el-link>
    <img src="../../public/profile.jpg" width="40px" height="40px" style="border-radius: 50%; margin-right: 20px;"/>
  </div>
</template>

<style scoped>
.el-link {
  margin-right: 30px;
}
</style>