<!-- Sidebar.vue: 侧边栏 -->
<script setup lang="ts">
// 构建目录树
// 运行 ./posts/generateTree.js 生成 treeData.json
// 读取 treeData.json 内容
import router from '@/router';
import treeData from '../../public/posts/treeData.json';
import { Document } from '@element-plus/icons-vue';

interface TreeNode {
  id: number,
  type: string,
  label: string,
  path: string,
  children?: TreeNode[]
}

const fileTree: TreeNode[] = [treeData];
const fileIndex = fileTree[0].children;

const defaultProps = {
  id: 'id',
  type: 'type',
  path: 'path',
  children: 'children',
  label: 'label',
}

const handleNodeClick = (node: TreeNode) => {
  if (node.type === 'file') {
    router.push({ 
      path: `/post`,
      query: { path: node.path }
    });
  }
}
</script>

<template>
  <div class="background">
  <el-scrollbar>
    <div class="scrollbar">
      <!-- <div style="height: 40px;"></div> -->
      <div class="sidebar-header">
        <div class="header-icon">
          <img src="../../profile.jpg" width="80px" height="80px" style="border-radius: 50%;"/>
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

      <div class="sidebar-list">
        <el-tree
          style="width: 240px;"
          :data="fileIndex"
          :props="defaultProps"
          :indent="8"
          @node-click="handleNodeClick"
        >
          <template #default="{ node }">
            <el-icon v-if="node.label.substr(-3) === '.md'" class="node-icon"><Document /></el-icon>
            <span>
              {{ node.label.split('.')[0] }}
            </span>
          </template>
        </el-tree>
      </div>
      <div class="sidebar-list" style="height: 60px">
        <div>
          <el-text style="margin: 3px; margin-left: 14px;">广告位招租~ (∠・ω< )⌒☆</el-text>
        </div>
      </div>
    </div>
  </el-scrollbar>
  </div>
</template>

<style scoped>
.scrollbar {
  height: 100%;
  padding: 10px;
}

.background {
  height: 100%;
  position: relative;
  border-right: 1px solid #ccc; 
}

.background::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../../bg-sidebar-winter.jpg'); 
  background-size: cover;
  background-position: center;
  opacity: 0.7;
}

.sidebar-header {
  padding: 10px;
  margin: 13px;
  margin-top: 20px;
  display: flex;

  backdrop-filter: blur(8px);
  background-color: rgba(255,255,255, 0.6);
  border-radius: 15px;
  
  box-shadow: rgba(0, 0, 0, 0.01) 2px 2px 2px;
  border: 1px rgba(255,255,255,0.4) solid;
  border-bottom: 0.5px rgba(40,40,40,0.35) solid;
  border-right: 0.5px rgba(40,40,40,0.35) solid;
}

.header-text {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-list{
  padding: 10px;
  margin: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  justify-content: center;

  backdrop-filter: blur(8px);
  background-color: rgba(255,255,255, 0.6);
  border-radius: 15px;
  
  box-shadow: rgba(0, 0, 0, 0.01) 2px 2px 2px;
  border: 1px rgba(255,255,255,0.4) solid;
  border-bottom: 0.5px rgba(40,40,40,0.35) solid;
  border-right: 0.5px rgba(40,40,40,0.35) solid;
}

.el-link {
  margin: 3px;
  margin-left: 14px;
}

.node-icon {
  margin-right: 7px;
}
</style>