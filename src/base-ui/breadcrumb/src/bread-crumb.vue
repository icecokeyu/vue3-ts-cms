<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadConfig" :key="item.title">
        <el-breadcrumb-item>{{ item.title }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { breadType } from '@/base-ui/breadcrumb'

export default defineComponent({
  props: {
    breadConfig: {
      type: Array as PropType<breadType[]>,
      default: () => [
        {
          path: '/',
          title: '1111'
        }
      ]
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
