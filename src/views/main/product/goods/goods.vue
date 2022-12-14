<template>
  <div class="goods">
    <page-content pageName="goods" :contentTableConfig="contentTableConfig">
      <template #img="scope">
        <el-image
          :src="scope.row.imgUrl"
          style="width: 60px; height: 60px"
          :preview-teleported="true"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope"> ￥{{ scope.row.oldPrice }}</template>
      <template #newPrice="scope"> ￥{{ scope.row.newPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { contentTableConfig } from './config/content-config'

import pageContent from '@/components/page-content'

export default defineComponent({
  name: 'goods',
  components: { pageContent },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
