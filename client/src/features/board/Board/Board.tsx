import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import DnDBoard from './DnDBoard'
import CreateList from '../components/CreateList'
import BoardModal from './BoardModal'

import { EditIcon } from 'assets/icons'

import { selectBoard, selectDenormalizedBoard } from '../boardSelectors'
import { useAppSelector } from 'hooks'

const Board: React.FC = () => {
  const board = useAppSelector(selectDenormalizedBoard)
  const boardNormalized = useAppSelector(selectBoard)

  const [openPopup, setOpenPopup] = useState(false)

  if (!board) return null

  const handleTogglePopup = () => setOpenPopup(!openPopup)

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-3xl">{board?.title}</h1>
        <EditIcon
          className="p-1 rounded-md bg-gray-200 cursor-pointer hover:opacity-60"
          onClick={handleTogglePopup}
        />
      </div>
      <div className="m2-4">{board?.description}</div>

      <ol className="w-full h-full mb-2 p-4 flex gap-4 bg-slate-200 rounded-md overflow-x-auto">
        <DnDBoard />
        <CreateList />
      </ol>

      {openPopup &&
        ReactDOM.createPortal(
          <BoardModal onClose={handleTogglePopup} {...boardNormalized!} />,
          document.getElementById('modal') as HTMLDivElement
        )}
    </div>
  )
}

export default Board
