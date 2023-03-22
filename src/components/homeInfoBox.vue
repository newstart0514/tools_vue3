<template>
  <div class="box">
    <el-avatar
        style="width: 128px;height: 128px"
        fit="cover"
        src="https://s1.ax1x.com/2023/03/22/ppd0aOx.jpg"
    />
    <br>
    <el-text style="font-size: 26px;color: white">一个简单的测试平台</el-text>
    <br>
    <el-button type="success" plain style="background-color: transparent">开始使用</el-button>
  </div>
</template>

<script>
export default {
  name: "homeInfoBox"
}
</script>

<style scoped>
.box {
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  left: 40%;
  top: 30%;
}
</style>
