import {
  updateCardPosition,
  updateListPosition,
} from '../features/board/boardSlice'
import React, { createContext, useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { io, Socket } from 'socket.io-client'

interface ServerToClientEvents {
  message_response: (value: string) => void
  updatedCardName: (value: string) => void
  updatedCardPosition: (value: {
    cardId: string
    listId: string
    position: number
    infoMessage: string
  }) => void
  updatedListPosition: (value: {
    listId: string
    position: number
    infoMessage: string
  }) => void
}

interface ClientToServerEvents {
  message: (value: string) => void
  updateCardName: (value: { id: string; name: string }) => void
  joinBoardRoom: (boardId: string) => void
  leaveBoardRoom: (boardId: string) => void
}

interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  enterBoardRoom: (boardId: string) => void
  leaveBoardRoom: (boardId: string) => void
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
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      console.log('disconnect')
      socketRef.current.disconnect()
    }
  }, [])

  const enterBoardRoom = (boardId: string) => {
    socketRef.current.emit('joinBoardRoom', boardId)
    socketRef.current.on('updatedCardPosition', ({ infoMessage, ...card }) => {
      dispatch(updateCardPosition(card))
      toast.success(infoMessage)
    })
    socketRef.current.on('updatedListPosition', ({ infoMessage, ...list }) => {
      dispatch(updateListPosition(list))
      toast.success(infoMessage)
    })
  }

  const leaveBoardRoom = (boardId: string) => {
    socketRef.current.emit('leaveBoardRoom', boardId)
    socketRef.current.removeAllListeners('updatedCardPosition')
    socketRef.current.removeAllListeners('updatedListPosition')
  }

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, enterBoardRoom, leaveBoardRoom }}
    >
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
