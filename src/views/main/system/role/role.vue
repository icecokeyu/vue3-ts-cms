<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      tableHeaderTitle="创建角色"
      @editBtnClick="editBtnClick"
      @createBtnClick="createBtnClick"
    ></page-content>
    <page-model
      pageName="role"
      :modelFormConfig="modelFormConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      ref="pageModelRef"
    >
      <template #default>
        <el-tree
          ref="elTreeRef"
          :data="entireMenu"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          @check="handleCheckClick"
        />
      </template>
    </page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'
import { modelFormConfig } from './config/model-config'

import { usePageModel } from '@/hook/use-page-model'
import { pathMapMenuLeafKeys } from '@/utils/map-menus'
import { useStore } from '@/store'

import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageModel,
    PageContent,
    PageSearch
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBackFn = (item: any) => {
      const leafKeys = pathMapMenuLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModelRef, defaultInfo, editBtnClick, createBtnClick] =
      usePageModel(undefined, editCallBackFn)

    const store = useStore()
    const entireMenu = computed(() => store.state.entireMenu)
    const defaultProps = {
      children: 'children',
      label: 'name'
    }
    const otherInfo = ref({})
    const handleCheckClick = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modelFormConfig,
      pageModelRef,
      defaultInfo,
      editBtnClick,
      createBtnClick,
      entireMenu,
      defaultProps,
      handleCheckClick,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
