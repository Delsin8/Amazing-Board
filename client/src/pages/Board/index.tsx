import React, { useEffect, useState } from 'react'
import { IBoard } from '../../types/commonTypes'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Board from '../../features/board/components/Board'
import useFetch from '../../hooks/useFetch'

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const location = useLocation()
  const [boardData, isLoading, error] = useFetch<IBoard>(
    `http://localhost:5000${location.pathname}`
  )

  if (isLoading) return <div>Loading...</div>
  else if (boardData) return <Board {...boardData} />
}

export default BoardPage
