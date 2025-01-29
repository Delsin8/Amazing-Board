import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Board from '../../features/board/Board/Board'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoard } from '../../features/board/boardThunks'
import { useSocket } from '../../context/SocketProvider'
import { RootState } from '../../app/store'

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const { boardId } = useParams()
  const socket = useSocket()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  // const [boardData, isLoading, error] = useFetch<IBoard>(
  //   `${location.pathname}`,
  //   {} as IBoard
  // )

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchBoard(boardId))

    if (user) socket.enterBoardRoom(boardId!, user.id)

    return () => {
      socket.leaveBoardRoom(boardId!)
    }
  }, [user])

  return <Board />

  // return <div>123</div>

  // if (isLoading) return <div>Loading...</div>
  // else if (!isLoading && boardData) return <Board {...boardData} />
}

export default BoardPage
