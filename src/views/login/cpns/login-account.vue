<template>
  <div class="login-account">
    <el-form :model="userAccount" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="userAccount.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userAccount.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// 账号和密码的校验规则
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
// 本地存储
import localCache from '@/utils/localCache'
// 引入useStore函数
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const userAccount = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const handleLogin = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.如果选中记住密码，保存账号密码的信息
          if (isKeepPassword) {
            localCache.saveCache('name', userAccount.name)
            localCache.saveCache('password', userAccount.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('login/getLoginAction', { ...userAccount })
        }
      })
    }
    return {
      userAccount,
      rules,
      formRef,
      handleLogin
    }
  }
})
</script>

<style scoped></style>
