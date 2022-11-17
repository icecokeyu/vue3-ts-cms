<template>
  <div class="login">
    <login-module></login-module>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginModule from './cpns/login-module.vue'

export default defineComponent({
  name: 'login',
  components: {
    LoginModule
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/img/loginbg.jpg');
  background-size: cover;
}
</style>
