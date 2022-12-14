<template>
  <div class="menu">
    <page-content
      page-name="menu"
      :contentTableConfig="contentTableConfig"
      tableHeaderTitle="创建菜单"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { contentTableConfig } from './config/content-config'

import PageContent from '@/components/page-content'

export default defineComponent({
  components: {
    PageContent
  },
  name: 'ty-menu',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
