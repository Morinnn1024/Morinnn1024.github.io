<!-- Sidebar.vue: 侧边栏 -->
<script setup lang="ts">
// 构建目录树
// 运行 ./posts/generateTree.js 生成 treeData.json
// 读取 treeData.json 内容
import treeData from './posts/treeData.json';
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
      侧边栏
    </div>
    <el-tree
      style="max-width: 250px"
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
  height: 55px;
  width: 100%;
  /* padding: ; */

  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.el-scrollbar {
  padding-right: 10px;
}

.node-icon {
  margin-right: 7px;
}
</style>