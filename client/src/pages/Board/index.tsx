import React, { useEffect, useState } from 'react'
import { IBoard } from '../../types/commonTypes'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const location = useLocation()
  const [boardData, setBoardData] = useState<IBoard>({} as IBoard)

  useEffect(() => {
    const fetchBoards = async () => {
      const { data } = await axios.get<IBoard>(
        `http://localhost:5000${location.pathname}`
      )
      setBoardData(data)
    }

    fetchBoards()
  }, [])

  return <div>{boardData.name}</div>
}

export default BoardPage
