<template>
  <div>
    <h1>not found: {{ $route.params.pathMatch }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'not-found',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
