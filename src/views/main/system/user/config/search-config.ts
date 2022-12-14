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
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      modelValue: 'realname'
    },
    {
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
      modelValue: 'cellphone'
    },
    {
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '禁用', value: 0 },
        { title: '启用', value: 1 }
      ],
      modelValue: 'enable'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      },
      modelValue: 'createAt'
    }
  ]
}
