import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CardModal from '../modals/CardModal'

const Card: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useSelector((state: RootState) => state.board.cards[cardId])
  const { board } = useSelector((state: RootState) => state.board)

  const [openPopup, setOpenPopup] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: cardId, data: { type: 'CARD' } })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <span className="font-semibold">{card?.name}</span>
      <div onPointerDown={e => e.stopPropagation()}>
        <button
          className="pointer-events-auto"
          onClick={() => setOpenPopup(true)}
        >
          Toggle
        </button>

        {openPopup &&
          ReactDOM.createPortal(
            <CardModal
              onClose={() => setOpenPopup(false)}
              {...card}
              boardId={board!.id}
            />,
            document.getElementById('modal') as HTMLDivElement
          )}
      </div>
    </div>
  )
}

export default Card
