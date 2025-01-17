import React from 'react'
import Card from './Card'
import Badge from '../../../components/ui/Badge/Badge'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'

const List: React.FC<{ listId: string }> = ({ listId }) => {
  const list = useSelector((state: RootState) => state.board.lists[listId])
  const { cards: cardsNormalized } = useSelector(
    (state: RootState) => state.board
  )

  const cards = Object.values(cardsNormalized)
    .filter(card => card.list === listId)
    .sort((a, b) => a.position - b.position)

  return (
    <li className="flex flex-col gap-4 p-4 rounded-sm">
      <Badge>{list?.name}</Badge>
      <div className="flex flex-col gap-3 w-72">
        {cards.map(card => (
          <Card cardId={card.id} key={card.id} />
        ))}
      </div>
      <button>Add card</button>
    </li>
  )
}

export default List
