import React, { useEffect, useRef, useState } from 'react'
import BoardPreview from './BoardPreview'
import { IBoard } from '../../types/commonTypes'
import axios from 'axios'

const BoardsPage = () => {
  const [boards, setBoards] = useState<IBoard[]>([])
  const boardNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchBoards = async () => {
      const { data } = await axios.get<IBoard[]>('http://localhost:5000/boards')
      setBoards(data)
    }

    fetchBoards()
  }, [])

  const addBoard = async () => {
    const body = JSON.stringify({
      name: boardNameRef.current?.value,
      owner: '6728e0ca12ed2973a9f522a2',
    })
    const { data } = await axios.post<IBoard>(
      'http://localhost:5000/boards',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    setBoards([...boards, data])
  }

  return (
    <div>
      {boards.map(board => (
        <BoardPreview {...board} key={board.id} />
      ))}
      <input ref={boardNameRef} />
      <button onClick={addBoard}>Create a board</button>
    </div>
  )
}

export default BoardsPage
