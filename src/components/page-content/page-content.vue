<template>
  <div class="page-content">
    <div>
      <el-button type="primary" @click="exportToExcel">导出选中数据</el-button>
    </div>
    <ty-table
      :dataList="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      @selectChange="selectChange"
      v-model:page="pageInfo"
    >
      <template #header>
        <el-button type="primary" v-if="isCreate" @click="handleCreateBtnClick">
          {{ tableHeaderTitle }}
        </el-button>
      </template>
      <template #status="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <div class="handle-btn">
          <el-link
            type="primary"
            class="edit-btn"
            v-if="isUpdate"
            @click="handleEditBtnClick(scope.row)"
          >
            <el-icon>
              <Edit />
            </el-icon>
            编辑
          </el-link>
          <el-link
            type="primary"
            v-if="isDelete"
            @click="handleDeleteBtnClick(scope.row)"
          >
            <el-icon>
              <delete />
            </el-icon>
            删除
          </el-link>
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ty-table>
    <delete-dialog
      @confirmBtnClick="confirmBtnClick"
      ref="deleteDialogRef"
    ></delete-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import TyTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hook/use-permission'
import exportExcel from '@/utils/export-excel'

import deleteDialog from '@/components/delate-dialog/delete-dialog.vue'

export default defineComponent({
  props: {
    contentTableConfig: Object,
    default: () => {
      return {}
    },
    pageName: {
      type: String,
      required: true
    },
    tableHeaderTitle: {
      type: String,
      default: '创建用户'
    }
  },
  components: {
    TyTable,
    deleteDialog
  },
  emits: ['createBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    // table表格选中行改变 导出数据相关的功能
    let tableData: any = ref()
    const selectChange = (val: any) => {
      tableData.value = JSON.parse(JSON.stringify(val))
    }
    const fields: any = {}
    for (let item of props.contentTableConfig!.propList) {
      for (let key in item) {
        if (key === 'prop') {
          fields[item.prop] = item.label
        }
      }
    }
    const exportToExcel = () => {
      console.log(fields)
      console.log(JSON.parse(JSON.stringify(tableData.value)))
      exportExcel(
        JSON.parse(JSON.stringify(tableData.value)),
        fields,
        `${props.pageName}Data`
      )
    }
    const isQuery = usePermission(props.pageName, 'query')
    const isDelete = usePermission(props.pageName, 'delete')
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')

    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => getPageData())
    const store = useStore()
    const getPageData = (queryInfo?: any) => {
      if (isQuery) {
        store.dispatch('system/getPageDataAction', {
          pageName: props.pageName,
          queryInfo: {
            offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
            size: pageInfo.value.pageSize,
            ...queryInfo
          }
        })
      }
    }
    getPageData()

    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 删除的逻辑
    let id = 0
    const deleteDialogRef = ref<InstanceType<typeof deleteDialog>>()
    const handleDeleteBtnClick = (item: any) => {
      // 弹出确认删除的对话框
      id = item.id
      if (deleteDialogRef.value) {
        deleteDialogRef.value.dialogVisible = true
      }
    }
    const confirmBtnClick = () => {
      // 提交vuex中删除的action
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: id
      })
    }

    // 点击编辑、新建发出事件
    const handleCreateBtnClick = () => {
      emit('createBtnClick')
    }

    const handleEditBtnClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      selectChange,
      dataList,
      getPageData,
      pageInfo,
      dataCount,
      otherPropSlots,
      isDelete,
      isUpdate,
      isCreate,
      handleDeleteBtnClick,
      confirmBtnClick,
      deleteDialogRef,
      handleCreateBtnClick,
      handleEditBtnClick,
      exportToExcel
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #f0f2f5;
  padding: 20px;
}

.edit-btn {
  margin-right: 5px;
}
</style>
