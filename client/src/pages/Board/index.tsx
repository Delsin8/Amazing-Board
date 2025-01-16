import React, { useEffect } from 'react'
import { IBoard } from '../../types/commonTypes'
import { useLocation, useParams } from 'react-router-dom'
import Board from '../../features/board/components/Board'
import useFetch from '../../hooks/useFetch'
import { useDispatch } from 'react-redux'
import { fetchBoard } from '../../features/board/boardSlice'

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const { boardId } = useParams()
  const dispatch = useDispatch()

  // const [boardData, isLoading, error] = useFetch<IBoard>(
  //   `${location.pathname}`,
  //   {} as IBoard
  // )

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchBoard(boardId))
  }, [])

  return <div>123</div>

  // if (isLoading) return <div>Loading...</div>
  // else if (!isLoading && boardData) return <Board {...boardData} />
}

export default BoardPage
