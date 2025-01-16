import React, { useRef } from 'react'
import BoardPreview from './BoardPreview'
import { IBoard } from '../../types/commonTypes'
import useFetch from '../../hooks/useFetch'
import apiClient from '../../api/apiClient'
import BoardList from '../../features/boardList'

const BoardsPage = () => {
  // const boardNameRef = useRef<HTMLInputElement>(null)
  // const [boards, isLoading, error, setBoards] = useFetch<IBoard[]>(
  //   `/boards`,
  //   []
  // )

  // const addBoard = async () => {
  //   const body = JSON.stringify({
  //     accessibility: 'private',
  //     title: boardNameRef.current?.value,
  //   })
  //   const { data } = await apiClient.post<IBoard>(
  //     `${process.env.API_URL}/boards`,
  //     body,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //   setBoards([...boards!, data])
  // }

  return (
    <div>
      <BoardList />
    </div>
  )
}

export default BoardsPage
