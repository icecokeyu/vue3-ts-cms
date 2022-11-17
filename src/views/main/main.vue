<template>
  <div class="main">
    <el-container class="all-container">
      <el-aside width="isCollapse ? '60px' : '200px'" class="aside">
        <main-aside :isCollapse="isCollapse"></main-aside>
      </el-aside>
      <el-container class="right-container">
        <el-header class="header">
          <main-header @collapseClick="collapseClick"></main-header>
        </el-header>
        <el-main class="container-main">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MainAside from '@/components/main-aside'
import MainHeader from '@/components/main-header'
// import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    MainAside,
    MainHeader
  },
  setup() {
    const isCollapse = ref(false)
    const collapseClick = (fold: boolean) => {
      console.log(fold)
      isCollapse.value = fold
    }
    // const route = useRoute()
    // const roureQuery = route.query.name
    // console.log(roureQuery)
    // console.log(111111111111)
    return {
      collapseClick,
      isCollapse
      // roureQuery
    }
  }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}

.all-container {
  width: 100%;
  height: 100%;

  .aside {
    height: 100%;
    background-color: #0c2135;
  }

  .right-container {
    .header {
      background-color: #ffffff;
      padding: 0;
    }

    .container-main {
      background-color: #f0f2f5;
      padding: 0;

      .page-info {
        background-color: #fff;
        margin: 20px;
        border-radius: 5px;
      }
    }
  }
}
</style>
