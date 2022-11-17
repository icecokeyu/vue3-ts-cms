<template>
  <div class="user">
    <ty-form v-bind="searchFormConfig"></ty-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TyForm from '@/base-ui/form/index'
import { searchFormConfig } from './config/search-config'

export default defineComponent({
  name: 'user',
  components: {
    TyForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
