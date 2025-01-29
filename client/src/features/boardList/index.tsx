import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBoardList } from './boardListSlice'
import BoardPreview from './BoardPreviewItem'
import { IBoard } from '../../types/commonTypes'
import { BoardAccessibility } from '../../../../shared/types'

const data: IBoard[] = [
  {
    title: 'public1',
    accessibility: BoardAccessibility.Public,
    lists: [],
    id: '677feb9012b48082aaeaba74',
  },
  {
    title: 'public2',
    accessibility: BoardAccessibility.Public,
    lists: [],
    id: '677feb9012b48082aaeaba75',
  },
  {
    title: 'public3',
    accessibility: BoardAccessibility.Public,
    lists: [],
    id: '677feb9012b48082aaeaba76',
  },
  {
    title: 'public4',
    accessibility: BoardAccessibility.Public,
    lists: [],
    id: '677feb9012b48082aaeaba77',
  },
  {
    title: 'public5',
    accessibility: BoardAccessibility.Public,
    lists: [],
    id: '677feb9012b48082aaeaba78',
  },
]

const BoardList = () => {
  return (
    <div>
      <ol className="flex gap-4">
        {data.map(board => (
          <BoardPreview {...board} key={board.id} />
        ))}
      </ol>
    </div>
  )
}

export default BoardList
