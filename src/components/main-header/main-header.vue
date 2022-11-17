<template>
  <div class="main-header">
    <div class="left-icon">
      <template v-if="!fold">
        <el-icon @click="foldBtnClick">
          <Expand />
        </el-icon>
      </template>
      <template v-else>
        <el-icon @click="foldBtnClick">
          <Fold />
        </el-icon>
      </template>
      <!--面包屑导航        -->
      <ty-breadcrumb :breadConfig="breadConfig"></ty-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span>
            <el-avatar :icon="UserFilled" />
          </span>
          <span class="username">{{ username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="rollOutLogin">
              <el-icon size="12px">
                <Close />
              </el-icon>
              退出登录
            </el-dropdown-item>
            <el-dropdown-item divided>用户信息</el-dropdown-item>
            <el-dropdown-item>系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import localCache from '@/utils/localCache'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { pathMapBreadcrumb } from '@/utils/map-menus'

// 组件
import TyBreadcrumb from '@/base-ui/breadcrumb'

export default defineComponent({
  emits: ['collapseClick'],
  components: {
    TyBreadcrumb
  },
  setup(props, { emit }) {
    const fold = ref(false)
    const foldBtnClick = () => {
      fold.value = !fold.value
      emit('collapseClick', fold.value)
    }
    const router = useRouter()
    const store = useStore()
    const rollOutLogin = () => {
      localCache.clearCache()
      router.push({
        path: '/login'
      })
    }
    const username = computed(() => {
      return store.state.login.userInfo.name
    })
    const breadConfig = computed(() => {
      const route = useRoute()
      const path = route.path
      const userMenus = store.state.login.userMenus
      return pathMapBreadcrumb(userMenus, path)
    })
    return {
      foldBtnClick,
      fold,
      UserFilled,
      rollOutLogin,
      username,
      breadConfig
    }
  }
})
</script>

<style scoped lang="less">
.main-header {
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.el-icon {
  font-size: 28px;
  margin-right: 3px;
}

.el-dropdown-link {
  cursor: pointer;
}

.left-icon {
  display: flex;
  align-items: center;
}
</style>
