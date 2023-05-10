import { io } from 'socket.io-client'
import { ElNotification } from 'element-plus'
import { useBasicStore } from '@/store/basic'

interface joinedMsg {
  id: string
}
interface ftpMsg {
  source: string
  msg: {
    name: string
    progress: number
  }
}

export function useSocketIO() {
  const basicStore = useBasicStore()
  // const { socketId } = storeToRefs(basicStore)

  const socket = io(`ws://${import.meta.env.VITE_APP_BASE_WS_URL}`)
  socket.emit('join')

  socket.on('joined', (event: joinedMsg) => {
    const { id } = event
    // console.log('id', id)
    basicStore.setSocketId(id)
  })
  socket.on('ftpMsg', (event: ftpMsg) => {
    const { source, msg } = event
    const { name, progress } = msg
    if (source === 'ftp' && progress === 100) {
      ElNotification({
        title: 'Success',
        message: `【${name}】上傳FTP完成`,
        type: 'success',
        duration: 0
      })
    }
  })

  onBeforeUnmount(() => {
    socket.disconnect()
  })
}
