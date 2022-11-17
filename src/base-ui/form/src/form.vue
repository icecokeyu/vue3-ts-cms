<template>
  <div class="form">
    <el-form>
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout" :gutter="20">
            <el-form-item :label="item.label" :label-width="labelWidth">
              <template v-if="item.type === 'input'">
                <el-input :placeholder="item.placeholder"></el-input>
              </template>
              <template v-else-if="item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  show-password
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder">
                  <template
                    v-for="selectItem in item.options"
                    :key="selectItem.value"
                  >
                    <el-option
                      :label="selectItem.title"
                      :value="selectItem.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '@/base-ui/form/type'

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.el-select {
  width: 100%;
}

.el-form-item {
  margin-top: 20px;
  margin-right: 30px;
}
</style>
