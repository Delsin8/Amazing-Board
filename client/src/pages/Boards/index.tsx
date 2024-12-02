import React, { useRef } from 'react'
import BoardPreview from './BoardPreview'
import { IBoard } from '../../types/commonTypes'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'

const BoardsPage = () => {
  const boardNameRef = useRef<HTMLInputElement>(null)
  const [boards, isLoading, error, setBoards] = useFetch<IBoard[]>(
    `/boards`,
    []
  )

  const addBoard = async () => {
    const body = JSON.stringify({
      name: boardNameRef.current?.value,
      owner: '6728e0ca12ed2973a9f522a2',
    })
    const { data } = await axios.post<IBoard>(
      `${process.env.API_URL}/boards`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    setBoards([...boards!, data])
  }

  if (isLoading) return <div>Loading...</div>
  else if (!isLoading && boards)
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
