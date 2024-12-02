import React from 'react'
import { IBoard } from '../../../types/commonTypes'
import List from './List'

const Board: React.FC<IBoard> = ({ name, description, lists }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl">{name}</h1>
      <div className="mb-4">{description}</div>

      <ol className="w-100 flex gap-4 bg-slate-100 rounded-md p-4">
        {lists.map(list => (
          <List {...list} key={list.id} />
        ))}
      </ol>
    </div>
  )
}

export default Board
