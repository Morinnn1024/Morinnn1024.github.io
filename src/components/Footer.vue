<!-- Footer.vue: 页脚 -->
<script setup lang="ts">
import { ref } from 'vue';
import { ElementPlus } from '@element-plus/icons-vue';
import vueLogo from '../assets/logo.svg';
import treeData from '../../public/posts/treeData.json';
import { useRoute } from 'vue-router';

// 定义TreeNode接口
interface TreeNode {
  id: number;
  type: string;
  label: string;
  path: string;
  birthAt: string;
  modifiedAt: string;
  children?: TreeNode[];
}

// 获取路由参数
const route = useRoute();
const queryParams = route.query;

const matchedData = ref({
  birthAt: '',
  modifiedAt: ''
});

// 定义一个递归函数来查找匹配的id
const findMatchedData = (nodes: TreeNode[], targetId: number): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === targetId) {
      return node; // 找到匹配的节点，返回该节点
    }
    if (node.children && node.children.length > 0) {
      const result = findMatchedData(node.children, targetId); // 递归查找子节点
      if (result) return result; // 如果在子节点中找到匹配项，返回结果
    }
  }
  return null; // 如果没有找到匹配项，返回null
};

// 在组件挂载时调用查找函数
const id = Number(queryParams.id); // 将查询参数中的id转换为数字
if (!isNaN(id)) {
  const result = findMatchedData([treeData], id); // 在treeData中查找匹配的id
  if (result) {
    matchedData.value = {
      birthAt: result.birthAt,
      modifiedAt: result.modifiedAt
    };
  }
}

// 格式化日期时间
function formatDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
</script>

<template>
  <div>
    <el-divider direction="horizontal" content-position="left"></el-divider>

    <p style="color: #666;">
      {{ formatDateTime(matchedData.birthAt).substring(0, 10) }} 
      <em style="margin-left: 10px;"> 
        最后更新于 {{ formatDateTime(matchedData.modifiedAt) }}
      </em>
    </p>

    <p>
      <el-link type="primary" size="large" :underline="false" 
        href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1">
        This work is licensed under CC BY-SA 4.0
      </el-link>
    </p>

    <div class="line" style="font-size: small; color: #666;">
      Powered by 
      <img :src="vueLogo" height="13px" width="13px" style="margin-left: 5px;">Vue3 & 
      <el-icon color="var(--el-color-primary)" style="margin-left: 5px;"><ElementPlus /></el-icon> Element Plus
    </div>
    <div style="font-size: small; color: #666;">
      Copyright © 2025 Morinnn. All Rights Reserved.
    </div>
  </div>
</template>

<style scoped>
.line {
  display: flex;
  align-items: center;
}
</style>