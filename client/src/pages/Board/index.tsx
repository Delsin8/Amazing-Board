import React from 'react'
import { IBoard } from '../../types/commonTypes'
import { useLocation } from 'react-router-dom'
import Board from '../../features/board/components/Board'
import useFetch from '../../hooks/useFetch'

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const location = useLocation()
  const [boardData, isLoading, error] = useFetch<IBoard>(
    `${location.pathname}`,
    {} as IBoard
  )

  console.log(boardData)
  if (isLoading) return <div>Loading...</div>
  else if (!isLoading && boardData) return <Board {...boardData} />
}

export default BoardPage
