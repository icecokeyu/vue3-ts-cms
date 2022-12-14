<template>
  <div class="table">
    <div class="table-header">
      <span class="title">{{ title }}</span>
      <div>
        <slot name="header"></slot>
      </div>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column type="selection" width="50" v-if="isSelect" />
      <el-table-column
        type="index"
        width="80"
        v-if="isIndex"
        align="center"
        label="序号"
      />

      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <div class="table-footer"></div>
    </el-table>
    <div class="table-footer" v-if="isPage">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[3, 5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dataList: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      // required: true
      default: () => []
    },
    isIndex: {
      type: Boolean,
      default: false
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '用户列表'
    },
    page: {
      type: Object,
      default: () => {
        return { currentPage: 0, pageSize: 10 }
      }
    },
    dataCount: {
      type: Number,
      default: 0
    },
    isPage: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (val: any[]) => {
      emit('selectChange', val)
    }
    // 当前页码和每页数量改变
    const handleSizeChange = (pageSize: any) => {
      console.log(pageSize)
      console.log({ ...props.page, pageSize })
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: any) => {
      console.log(currentPage)
      console.log({ ...props.page, currentPage })
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.table-header {
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #79bbff;
}

.table-footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
