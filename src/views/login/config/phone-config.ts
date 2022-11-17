import { reactive } from 'vue'
import { FormRules } from 'element-plus'

export const rules = reactive<FormRules>({
  phoneNum: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur'
    },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '手机号必须是11位的数字~',
      trigger: 'blur'
    }
  ],
  confirmNum: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{4}$/,
      message: '验证码必须是4位的字母或者数字~',
      trigger: 'blur'
    }
  ]
})
