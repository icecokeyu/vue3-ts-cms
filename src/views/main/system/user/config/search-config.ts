import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    {
      type: 'input',
      label: 'id',
      placeholder: '请输入id',
      modelValue: 'id'
    },
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      modelValue: 'name'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      modelValue: 'password'
    },
    {
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ],
      modelValue: 'sports'
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
