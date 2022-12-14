<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form>
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout" :gutter="20">
            <el-form-item
              :label="item.label"
              :label-width="labelWidth"
              v-if="!item.isHidden"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.modelValue}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  show-password
                  v-model="formData[`${item.modelValue}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.modelValue}`]"
                >
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
                  v-model="formData[`${item.modelValue}`]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
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
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formData
    }
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

.header {
  line-height: 80px;
  text-align: center;
  font-size: 24px;
}
</style>
