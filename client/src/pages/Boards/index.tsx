import React, { useRef } from 'react'
import BoardPreview from './BoardPreview'
import { IBoard } from '../../types/commonTypes'
import useFetch from '../../hooks/useFetch'
import apiClient from '../../api/apiClient'

const BoardsPage = () => {
  const boardNameRef = useRef<HTMLInputElement>(null)
  const [boards, isLoading, error, setBoards] = useFetch<IBoard[]>(
    `/boards`,
    []
  )

  const addBoard = async () => {
    const body = JSON.stringify({
      accessibility: 'private',
      title: boardNameRef.current?.value,
    })
    const { data } = await apiClient.post<IBoard>(
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
