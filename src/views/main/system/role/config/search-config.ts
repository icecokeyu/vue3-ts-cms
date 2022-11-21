import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
      modelValue: 'roleName'
    },
    {
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      modelValue: 'introduce'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      },
      modelValue: 'createTime'
    }
  ]
}
