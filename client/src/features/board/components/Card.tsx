import React, { useRef } from 'react'
import { ICard } from '../../../types/commonTypes'
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cardId })

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
