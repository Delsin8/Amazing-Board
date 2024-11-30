import React from 'react'
import { IBoard } from '../../../types/commonTypes'
import List from './List'

const Board: React.FC<IBoard> = ({ name, description, lists }) => {
  console.log(lists)
  return (
    <div>
      <h1>{name}</h1>
      <div>{description}</div>

      <div className="flex gap-4 bg-slate-300 rounded-md p-4">
        {lists.map(list => (
          <List {...list} key={list.id} />
        ))}
      </div>
    </div>
  )
}

export default Board
