<!-- Sidebar.vue: 侧边栏 -->
<script setup lang="ts">
// 构建目录树
// 运行 ./posts/generateTree.js 生成 treeData.json
// 读取 treeData.json 内容
import treeData from '../views/posts/treeData.json';
import { Document } from '@element-plus/icons-vue';

interface TreeNode {
  id: number,
  label: string,
  path: string,
  children?: TreeNode[]
}

const fileTree: TreeNode[] = [treeData];
const fileIndex = fileTree[0].children;

const defaultProps = {
  id: 'id',
  path: 'path',
  children: 'children',
  label: 'label',
}

const handleNodeClick = (node: TreeNode) => {
  console.log(node)
}
</script>

<template>
  <el-scrollbar>
    <div class="sidebar-header">
      <div class="header-icon">
        <img src="../assets/profile.jpg" width="80px" height="80px" style="border-radius: 50%;"/>
      </div>
      <div class="header-text">
        <div><el-text size="large">森瑾晨</el-text></div>
        <div>
          <el-text style="color: #999">morinnn1024@qq.com</el-text>
        </div>
        <div style="margin-top: 5px;">
          <el-text style="color: #999">逆水行舟。</el-text>
        </div>
      </div>
    </div>
    <div class="sidebar-list">
      <el-link>首页</el-link>
      <el-link>食用指南</el-link>
    </div>
    <el-tree
      style="max-width: 270px"
      :data="fileIndex"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node }">
        <el-icon v-if="node.label.substr(-3) === '.md'" class="node-icon"><Document /></el-icon>
        <span>
          {{ node.label.split('.')[0] }}
        </span>
      </template>
    </el-tree>
  </el-scrollbar>
</template>

<style scoped>
.sidebar-header {
  padding: 10px;
  margin: 10px;
  margin-top: 20px;
  display: flex;
  background-color: #fff;
  border-radius: 20px;
}

.header-text {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-list{
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  justify-content: center;

  background-color: #fff;
  border-radius: 20px;
}

.el-scrollbar {
  padding-left: 10px;
  padding-right: 10px;
}

.el-link {
  margin: 3px;
  margin-left: 14px;
}

.node-icon {
  margin-right: 7px;
}
</style>