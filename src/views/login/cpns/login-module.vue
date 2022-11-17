<template>
  <div class="login-module">
    <h1 title="title">management system</h1>
    <el-tabs type="border-card" class="tabs" stretch @tab-change="tabChange">
      <el-tab-pane class="tab-item">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span class="tab-title">账号登录</span>
          </span>
        </template>
        <LoginAccount ref="loginAccountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane class="tab-item">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span class="tab-title">手机登录</span>
          </span>
        </template>
        <login-phone ref="loginPhoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control" v-show="!isGetAccount">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <div class="forget-password">
        <el-link type="primary" class="link">忘记密码</el-link>
      </div>
    </div>
    <el-button type="primary" class="login-btn" @click="loginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Iphone, User } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  name: 'LoginModule',
  components: {
    User,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const currentPage = ref<number>(0)
    const isGetAccount = ref<boolean>(false)
    const isKeepPassword = ref(true)
    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()

    const tabChange = (name: number) => {
      currentPage.value = name
      if (Number(name)) {
        isGetAccount.value = true
      } else {
        isGetAccount.value = false
      }
    }
    const loginClick = () => {
      // 判断currentPage的值是0还是1，0是账号登录，1是密码登录
      if (!Number(currentPage.value)) {
        // 这里把isKeepPassword的值传过去
        loginAccountRef.value?.handleLogin(isKeepPassword.value)
      } else {
        console.log('调用login-phone里面的登录方法')
      }
    }
    return {
      isKeepPassword,
      loginClick,
      loginAccountRef,
      tabChange,
      currentPage,
      isGetAccount
    }
  }
})
</script>

<style lang="less" scoped>
.login-module {
  width: 420px;
  height: 420px;
  text-align: center;

  .tab-title {
    display: inline-block;
    margin-left: 2px;
  }

  .account-control {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .forget-password {
      background-color: #409eff;

      .link {
        color: #fff !important;
      }
    }
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
