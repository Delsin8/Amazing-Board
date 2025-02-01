import { RootState } from 'app/store'
import {
  updateCardName,
  updateCardPosition,
  updateListColor,
  updateListPosition,
} from '../features/board/boardSlice'
import React, { createContext, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { io, Socket } from 'socket.io-client'

interface ServerToClientEvents {
  message_response: (value: string) => void
  updatedCardPosition: (value: {
    cardId: string
    targetListId: string
    sourceListId: string
    position: number
    infoMessage: string
  }) => void
  updatedListPosition: (value: {
    listId: string
    position: number
    infoMessage: string
  }) => void
  updatedCardName: (value: {
    cardId: string
    name: string
    infoMessage: string
  }) => void
  updatedListColor: (value: {
    listId: string
    color: string
    infoMessage: string
  }) => void
}

interface ClientToServerEvents {
  message: (value: string) => void
  updateCardName: (value: { id: string; name: string }) => void
  joinBoardRoom: (value: { boardId: string; userId: string }) => void
  leaveBoardRoom: (boardId: string) => void
}

export interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  enterBoardRoom: (boardId: string, userId: string) => void
  leaveBoardRoom: (boardId: string) => void
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io(process.env.API_URL, {
      path: '/socket-connection',
    })
  )

  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      console.log('disconnect')
      socketRef.current.disconnect()
    }
  }, [])

  const enterBoardRoom = (boardId: string) => {
    socketRef.current.emit('joinBoardRoom', { boardId, userId: user.user!.id })
    socketRef.current.on('updatedCardPosition', ({ infoMessage, ...card }) => {
      dispatch(updateCardPosition(card))
      toast.success(infoMessage)
    })
    socketRef.current.on('updatedListPosition', ({ infoMessage, ...list }) => {
      dispatch(updateListPosition(list))
      toast.success(infoMessage)
    })
    socketRef.current.on('updatedCardName', ({ infoMessage, ...card }) => {
      dispatch(updateCardName(card))
      toast.success(infoMessage)
    })
    socketRef.current.on('updatedListColor', ({ infoMessage, ...list }) => {
      dispatch(updateListColor(list))
      toast.success(infoMessage)
    })
  }

  const leaveBoardRoom = (boardId: string) => {
    socketRef.current.emit('leaveBoardRoom', boardId)
    socketRef.current.removeAllListeners('updatedCardPosition')
    socketRef.current.removeAllListeners('updatedListPosition')
    socketRef.current.removeAllListeners('updatedCardName')
  }

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, enterBoardRoom, leaveBoardRoom }}
    >
      {children}
    </SocketContext.Provider>
  )
}
