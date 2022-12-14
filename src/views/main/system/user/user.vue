<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleQueryClick="handleQueryClick"
      @handleResetClick="handleResetClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @createBtnClick="createBtnClick"
      @editBtnClick="editBtnClick"
    ></page-content>
    <page-model
      :modelFormConfig="modelConfigRef"
      pageName="users"
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'
import { modelFormConfig } from './config/model-config'

import { usePageSearch } from '@/hook/use-page-search'
import { usePageModel } from '@/hook/use-page-model'

export default defineComponent({
  name: 'user',
  components: {
    PageContent,
    PageSearch,
    PageModel
  },
  setup() {
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑
    const newCallBack = () => {
      const formItem = modelFormConfig.formItems.find(
        (item) => item.modelValue === 'password'
      )
      if (formItem) {
        formItem.isHidden = false
      }
    }
    const editCallBack = () => {
      const formItem = modelFormConfig.formItems.find(
        (item) => item.modelValue === 'password'
      )
      if (formItem) {
        formItem.isHidden = true
      }
    }

    // 2.动态添加部门和角色列表
    const store = useStore()

    const modelConfigRef = computed(() => {
      const departmentItem = modelFormConfig.formItems.find(
        (item) => item.modelValue === 'departmentId'
      )
      if (departmentItem) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      const roleItem = modelFormConfig.formItems.find(
        (item) => item.modelValue === 'roleId'
      )
      if (roleItem) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      return modelFormConfig
    })

    const [pageModelRef, defaultInfo, editBtnClick, createBtnClick] =
      usePageModel(newCallBack, editCallBack)
    return {
      searchFormConfig,
      contentTableConfig,
      modelFormConfig,
      pageContentRef,
      pageModelRef,
      handleQueryClick,
      handleResetClick,
      editBtnClick,
      createBtnClick,
      defaultInfo,
      modelConfigRef
    }
  }
})
</script>

<style scoped></style>
