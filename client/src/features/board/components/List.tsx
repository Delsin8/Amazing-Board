import React from 'react'
import { IList } from '../../../types/commonTypes'
import Card from './Card'

const List: React.FC<IList> = ({ id, name, cards }) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-sm">
      <div>{name}</div>
      <div>
        {cards.map(card => (
          <Card {...card} key={card.id} />
        ))}
      </div>
      <button>Add card</button>
    </div>
  )
}

export default List
