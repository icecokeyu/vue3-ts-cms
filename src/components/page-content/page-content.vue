<template>
  <div class="page-content">
    <ty-table
      :userList="userList"
      v-bind="contentTableConfig"
      @selectChange="selectChange"
    >
      <template #header>
        <el-button type="primary">新建用户</el-button>
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
      <template #handler>
        <div class="handle-btn">
          <el-link type="primary" class="edit-btn">
            <el-icon>
              <Edit />
            </el-icon>
            编辑
          </el-link>
          <el-link type="primary">
            <el-icon>
              <delete />
            </el-icon>
            删除
          </el-link>
        </div>
      </template>
    </ty-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import TyTable from '@/base-ui/table'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    contentTableConfig: Object,
    default: () => {
      return {}
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    TyTable
  },
  setup(props) {
    // table表格选中行改变
    const selectChange = (val: any) => {
      console.log(val)
    }

    const store = useStore()
    store.dispatch('system/getPageDataAction', {
      // pageUrl: '/users/list',
      pageName: props.pageName,
      pageInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    // const userList = computed(() => store.state.system.userList)
    // const totalUser = computed(() => store.state.system.userCount)
    return {
      selectChange,
      userList
      // totalUser
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
