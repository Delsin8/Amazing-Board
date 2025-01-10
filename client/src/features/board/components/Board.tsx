import React from 'react'
import { IBoard } from '../../../types/commonTypes'
import List from './List'
import { BoardAccessibility } from '../../../../../shared/types'
import BoardSettings from './BoardSettings'

const Board: React.FC<IBoard> = ({
  id,
  name,
  description,
  lists,
  accessibility,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">{name}</h1>
      <div className="mb-4">{description}</div>

      <ol className="w-100 flex gap-4 bg-slate-100 rounded-md p-4">
        {lists.map(list => (
          <List {...list} key={list.id} />
        ))}
      </ol>

      {accessibility === BoardAccessibility.Private && (
        <BoardSettings boardId={id} />
      )}
    </div>
  )
}

export default Board
