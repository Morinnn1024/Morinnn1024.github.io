<!-- Sidebar.vue: 侧边栏 -->
<script setup lang="ts">

</script>

<template>
  <el-scrollbar>
    <div class="sidebar-header">
      侧边栏
    </div>
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </el-scrollbar>
</template>

<style scoped>
.sidebar-header {
  height: 55px;
  width: 100%;
  /* padding: ; */

  display: flex;
  flex-direction: column;
  background-color: #fff;
}
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