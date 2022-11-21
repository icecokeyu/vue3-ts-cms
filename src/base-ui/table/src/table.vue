<template>
  <div class="table">
    <div class="table-header">
      <span class="title">{{ title }}</span>
      <div>
        <slot name="header">111111</slot>
      </div>
    </div>
    <el-table
      :data="userList"
      style="width: 100%"
      border
      stripe
      @selection-change="handleSelectionChange"
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
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <div class="table-footer"></div>
    </el-table>
    <div class="table-footer">
      <slot name="footer">底部页码</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    userList: {
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
    }
  },
  emits: ['selectChange'],
  setup(props, { emit }) {
    const handleSelectionChange = (val: any[]) => {
      emit('selectChange', val)
    }
    return {
      handleSelectionChange
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
  text-align: center;
}
</style>
