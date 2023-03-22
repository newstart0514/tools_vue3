<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      router
  >
    <el-menu-item index="/">
      <el-image style="width: 40px;height: 40px;" src="https://s1.ax1x.com/2023/03/17/ppGiZwV.png" fit="cover" />
      &nbsp;&nbsp;
      <el-text size="large" style="font-weight:bolder;color: white">幽离测试平台</el-text>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/api">API测试</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-demo {
  z-index: 2;
}
.flex-grow {
  flex-grow: 1;
}
.el-menu {
  background: transparent;
  border: 0;
}
</style>
