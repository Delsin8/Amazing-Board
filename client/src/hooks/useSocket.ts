import { SocketContext, SocketContextType } from 'context/SocketProvider'
import { useContext } from 'react'

const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export default useSocket
