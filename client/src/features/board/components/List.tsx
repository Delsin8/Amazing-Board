import React from 'react'
import Card from './Card'
import Badge from '../../../components/ui/Badge/Badge'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const List: React.FC<{ listId: string }> = ({ listId }) => {
  const list = useSelector((state: RootState) => state.board.lists[listId])
  const { cards: cardsNormalized } = useSelector(
    (state: RootState) => state.board
  )

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: listId, data: { type: 'LIST' } })

  const cards = Object.values(cardsNormalized)
    .filter(card => card.list === listId)
    .sort((a, b) => a.position - b.position)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex flex-col gap-4 p-4 rounded-sm border border-red-400 pointer-events-none"
    >
      <Badge>{list?.name}</Badge>
      <div
        className="flex flex-col gap-3 w-72 pointer-events-auto"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {cards.map(card => (
          <Card cardId={card.id} key={card.id} />
        ))}
      </div>
      <button>Add card</button>
    </li>
  )
}

export default List
