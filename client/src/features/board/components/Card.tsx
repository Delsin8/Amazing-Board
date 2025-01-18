import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface DragItem {
  index: number
  id: string
  type: string
}

const Card: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useSelector((state: RootState) => state.board.cards[cardId])

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: cardId, data: { type: 'CARD' } })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <span className="font-semibold">{card?.name}</span>
    </div>
  )
}

export default Card
