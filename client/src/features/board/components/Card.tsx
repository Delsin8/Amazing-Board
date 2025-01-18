import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Modal from '../../../components/ui/Modal'

const Card: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useSelector((state: RootState) => state.board.cards[cardId])

  const [openPopup, setOpenPopup] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: cardId, data: { type: 'CARD' } })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {openPopup ? 'true' : 'false'}
      {/* <span className="font-semibold">{card?.name}</span> */}
      <div onPointerDown={e => e.stopPropagation()}>
        <button
          className="pointer-events-auto"
          onClick={() => setOpenPopup(true)}
        >
          Toggle
        </button>

        {openPopup &&
          ReactDOM.createPortal(
            <Modal onClose={() => setOpenPopup(false)}>Smile</Modal>,
            document.getElementById('modal') as HTMLDivElement
          )}
      </div>
    </div>
  )
}

export default Card
