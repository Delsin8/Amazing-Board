import React, { useState } from 'react'
import * as styles from '../styles.module.scss'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CardModal from '../modals/CardModal'
import { EditIcon } from '../../../assets/icons'
import classNames from 'classnames'

const Card: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useSelector((state: RootState) => state.board.cards[cardId])
  const color = useSelector(
    (state: RootState) => state.board.lists[card.list]
  )?.color
  const { board } = useSelector((state: RootState) => state.board)

  const [openPopup, setOpenPopup] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    // isDragging,
  } = useSortable({ id: cardId, data: { type: 'CARD' } })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={classNames(
        styles['hover-icon-wrapper'],
        'border border-gray-400 rounded-lg p-4 shadow-sm select-none',
        'flex justify-between gap-2'
      )}
    >
      <div className="font-semibold">{card?.name}</div>

      <div onPointerDown={e => e.stopPropagation()}>
        <EditIcon
          onClick={() => setOpenPopup(true)}
          className="h-6 w-6 p-1 rounded-md opacity-0"
          style={{ background: color }}
        />

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
