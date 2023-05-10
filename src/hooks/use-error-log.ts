/*js 錯誤日誌收集*/
import { jsErrorCollection } from 'js-error-collection'
import pack from '../../package.json'
import settings from '@/settings'
import bus from '@/utils/bus'
import axiosReq from '@/utils/axios-req'
const reqUrl = '/errorCollection/insert'
const errorLogReq = (errLog: string) => {
  axiosReq({
    url: reqUrl,
    data: {
      pageUrl: window.location.href,
      errorLog: errLog,
      browserType: navigator.userAgent,
      version: pack.version,
      createdTime: new Date()
    },
    method: 'post'
  }).then(() => {
    //通知錯誤列表頁面更新數據
    bus.emit('reloadErrorPage', {})
  })
}

export const useErrorLog = () => {
  //判斷該環境是否需要收集錯誤日誌,由settings設定決定
  if (settings.errorLog?.includes(import.meta.env.VITE_APP_ENV)) {
    jsErrorCollection({ runtimeError: true, rejectError: true, consoleError: true }, (errLog) => {
      //判斷是否是reqUrl錯誤，避免死循環
      if (!errLog.includes(reqUrl)) errorLogReq(errLog)
    })
  }
}
