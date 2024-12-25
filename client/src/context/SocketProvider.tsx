import React, { createContext, useContext, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

interface ServerToClientEvents {
  message_response: (value: string) => void
}

interface ClientToServerEvents {
  message: (value: string) => void
  updateCardName: (value: { id: string; name: string }) => void
}

interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io(process.env.API_URL, {
      path: '/socket-connection',
    })
  )

  useEffect(() => {
    return () => {
      console.log('disconnect')
      socketRef.current.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
