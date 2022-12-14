<template>
  <div class="page-search">
    <ty-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <p class="header-title">高级检索</p>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary" @click="handleResetClick">
            <el-icon>
              <Refresh />
            </el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon>
              <Search />
            </el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </ty-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    TyForm
  },
  props: {
    searchFormConfig: Object,
    default: () => {
      return {}
    }
  },
  emits: ['handleResetClick', 'handleQueryClick'],
  setup(props, { emit }) {
    // formData的数据应该由searchFormConfig.formItem.modelValue来决定
    // 1.formData的数据
    const formItem = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItem) {
      formOriginData[item.modelValue] = ''
    }
    const formData = ref(formOriginData)

    // 2.点击了重置按钮,将搜索的input内容置空,向外部组件发出事件
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[key] = ''
      }
      emit('handleResetClick')
    }
    // 3.点击了搜索按钮，向外部组件发出事件，并把formItem的值传出去，搜索功能需要
    const handleQueryClick = () => {
      emit('handleQueryClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.header-title {
  margin: 0 !important;
}

.handle-btn {
  text-align: right;
  padding: 0 10px 10px 0;
}
</style>
