import { ElMessage, ElMessageBox } from 'element-plus'
import { useBasicStore } from '@/store/basic'

export default function setUserEmail() {
  const basicStore = useBasicStore()
  ElMessageBox.prompt(
    'You did not set your email! Please input your e-mail.',
    `Hello ${basicStore.$state.userInfo.account}!`,
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: 'Invalid Email'
    }
  )
    .then(({ value }) => {
      basicStore
        .setEmail(value)
        .then((email) => {
          ElMessage({
            type: 'success',
            message: `Your email is:${email}`
          })
        })
        .catch((e) => {
          ElMessage({
            type: 'warning',
            message: `Set email occured error: ${e}`
          })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled'
      })
    })
}
