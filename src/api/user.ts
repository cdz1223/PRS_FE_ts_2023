import { getUserInfoApi, loginApi, setEmailApi, signoutApi } from './api'
//获取用户信息
import axiosReq from '@/utils/axios-req'
// export const userInfoReq = (): Promise<any> => {
//   return new Promise((resolve) => {
//     getInfoReq().then(({ data }) => {
//       console.log(data)
//       resolve(data)
//     })
//   })
// }
// export const userEmailReq = ({email, account}): Promise<any> => {
//   return new Promise((resolve) => {
//     putEmailReq({email, account}).then(({ data }) => {
//       console.log(data)
//       resolve(data)
//     })
//   })
// }


export const loginReq = (data) => {
  return axiosReq({
    url: loginApi,
    data,
    method: 'post',
    bfLoading: true,
    isParams: false,
    isAlertErrorMsg: true
  })
}
export function putEmailReq(data) {
  return axiosReq({
    url: setEmailApi,
    method: 'put',
    data
  })
}
export function getInfoReq() {
  return axiosReq({
    url: getUserInfoApi,
    bfLoading: false,
    method: 'get',
    isAlertErrorMsg: false
  })
}

export function loginOutReq() {
  return axiosReq({
    url: signoutApi,
    method: 'post'
  })
}
