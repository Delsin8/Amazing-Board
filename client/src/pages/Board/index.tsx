import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Board from 'features/board/Board/Board'
import { fetchBoard } from 'features/board/boardThunks'

import { useAppDispatch, useAppSelector, useSocket } from 'hooks'

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const { boardId } = useParams()
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchBoard(boardId!))

    if (user) socket.enterBoardRoom(boardId!, user.id)

    return () => {
      socket.leaveBoardRoom(boardId!)
    }
  }, [user])

  return <Board />
}

export default BoardPage
