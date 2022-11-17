<template>
  <div class="login-phone">
    <el-form :model="userPhone" :rules="rules" ref="formRef">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="userPhone.phoneNum" />
      </el-form-item>
      <el-form-item label="验证码" prop="confirmNum" class="get-num">
        <el-input v-model="userPhone.confirmNum" class="input-confirm" />
        <el-button type="primary" class="confirm-num">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// 手机号校验规则
import { rules } from '../config/phone-config'
import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const userPhone = reactive({
      phoneNum: '',
      confirmNum: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const handleLogin = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('向服务器发起登录请求')
        }
      })
    }
    return {
      userPhone,
      rules,
      formRef,
      handleLogin
    }
  }
})
</script>

<style scoped>
.get-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-confirm {
  width: 200px !important;
  margin-right: 21px;
}
</style>
