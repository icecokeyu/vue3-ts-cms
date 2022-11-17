<template>
  <div class="main-aside">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="" class="img" />
      <span class="title" v-if="!isCollapse">Vue cms</span>
    </div>
    <!--  折叠菜单  -->
    <el-menu
      :default-active="currentMenu.id + ''"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="isCollapse"
    >
      <template v-for="menuItem in userMenus" :key="menuItem.id">
        <!--   一级菜单     -->
        <template v-if="menuItem.type === 1">
          <el-sub-menu :index="menuItem.id + ''">
            <template #title>
              <el-icon>
                <Setting />
              </el-icon>
              <span>{{ menuItem.name }}</span>
            </template>
            <template v-for="subItem in menuItem.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="jumpToPath(subItem)"
                >{{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!--   二级菜单     -->
        <template v-else-if="menuItem === 2">
          <el-menu-item index="menuItem.id + ''">
            <template #title>
              <i class="menuItem.icon"></i>
              <span>{{ menuItem.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { pathMapMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const userMenus = store.state.login.userMenus
    // const activeSubMenu = ref('2')
    const jumpToPath = (subItem: any) => {
      router.push({
        path: subItem.url ?? '/not-found'
      })
    }
    const currentMenu = pathMapMenu(userMenus, route.path)

    return {
      userMenus,
      jumpToPath,
      // activeSubMenu
      currentMenu
    }
  }
})
</script>

<style scoped lang="less">
.main-aside {
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  //justify-content: center;
  width: 100%;
  height: 60px;

  .img {
    width: 30px;
    height: 30px;
    margin-left: 20px;
    margin-right: 5px;
  }

  .title {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
}

.el-menu-item {
  padding-left: 50px !important;
}

.el-menu {
  border-right: none !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
