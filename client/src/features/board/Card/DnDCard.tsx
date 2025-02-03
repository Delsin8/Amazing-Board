import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useAppSelector } from 'hooks'
import React from 'react'
import Card from './Card'

interface Props {
  cardId: string
  showDropIndicatorAbove: boolean
  showDropIndicatorBelow: boolean
}

const DnDCard: React.FC<Props> = ({
  cardId,
  showDropIndicatorAbove,
  showDropIndicatorBelow,
}) => {
  const card = useAppSelector(state => state.board.cards[cardId])

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: card.id,
    data: {
      type: 'card',
      card,
    },
  })

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: card.id,
    data: {
      type: 'card',
      card,
    },
  })

  const setNodeRef = (element: HTMLElement | null) => {
    setDraggableRef(element)
    setDroppableRef(element)
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={'relative select-none touch-none'}
    >
      {showDropIndicatorAbove && (
        <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 rounded" />
      )}

      <Card cardId={cardId} />

      {showDropIndicatorBelow && (
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 rounded" />
      )}
    </div>
  )
}

export default DnDCard
