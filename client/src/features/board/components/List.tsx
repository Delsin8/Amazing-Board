import React from 'react'
import { IList } from '../../../types/commonTypes'
import Card from './Card'
import Badge from '../../../components/ui/Badge/Badge'

const List: React.FC<IList> = ({ id, name, cards }) => {
  return (
    <li className="flex flex-col gap-4 p-4 rounded-sm">
      <Badge>{name}</Badge>
      <div className="flex flex-col gap-3 w-72">
        {cards.map(card => (
          <Card {...card} key={card.id} />
        ))}
      </div>
      <button>Add card</button>
    </li>
  )
}

export default List
