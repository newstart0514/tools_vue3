<template>
  <div class="card">
    <span class="header">API测试</span>
    <el-divider class="divider">
      <el-icon>
        <Link/>
      </el-icon>
    </el-divider>
    <div class="infoBox">
      <p style="font-size: 16px;margin: 20px 0 20px 0">URL地址</p>
      <el-input
          v-model="URL"
          class="w-50 m-2"
          placeholder="请输入URL地址"
          :prefix-icon="LocationInformation"
      />
      <p style="font-size: 16px;margin: 20px 0 20px 0">请求方法</p>
      <el-select v-model="method" placeholder="请选择请求方法">
        <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
        >
          <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-option-group>
      </el-select>
      <p style="font-size: 16px;margin: 20px 0 20px 0">请求参数</p>
      <el-input
          v-model="requestObj"
          :rows="7"
          type="textarea"
          placeholder="请输入参数"
          :disabled="method === 'get'"
      />
    </div>
    <el-button type="primary" round class="submitBtn">提交</el-button>
  </div>
</template>

<script lang="ts" setup>
import {Link, LocationInformation} from '@element-plus/icons-vue'
import {ref} from 'vue'

const URL = ref('')
const method = ref('')
const requestObj = ref('')
const options = [
  {
    label: '常用请求方法',
    options: [
      {
        value: 'get',
        label: 'GET请求',
      },
      {
        value: 'post',
        label: 'POST请求',
      },
    ],
  },
  {
    label: '不常用的请求方法',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
]
</script>

<style scoped>
.card {
  position: absolute;
  left: 15vw;
  top: 10vh;
  width: 70vw;
  height: 80vh;
  border-radius: 30px;
  background: white;
}

.header {
  display: flex;
  position: absolute;
  width: 100%;
  top: 30px;
  font-size: large;
  justify-content: center;
}

.divider {
  position: absolute;
  top: 50px;
}

.infoBox {
  position: absolute;
  width: 80%;
  top: 80px;
  left: 10%;
}

.submitBtn {
  position: absolute;
  bottom: 20px;
  right: 11%;
}
</style>
