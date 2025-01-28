import React, { useState } from 'react'
import * as styles from '../styles.module.scss'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import CardModal from './CardModal'
import { EditIcon } from '../../../assets/icons'
import classNames from 'classnames'
import { useDraggable, useDroppable } from '@dnd-kit/core'

interface Props {
  cardId: string
  showDropIndicatorAbove: boolean
  showDropIndicatorBelow: boolean
}

const Card: React.FC<Props> = ({
  cardId,
  showDropIndicatorAbove,
  showDropIndicatorBelow,
}) => {
  const card = useSelector((state: RootState) => state.board.cards[cardId])
  const color = useSelector(
    (state: RootState) => state.board.lists[card.list]
  )?.color
  const { board } = useSelector((state: RootState) => state.board)

  const [openPopup, setOpenPopup] = useState(false)

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

  const { setNodeRef: setDroppableRef } = useDroppable({
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
      className={classNames(
        styles['hover-icon-wrapper'],
        'relative border border-gray-400 rounded-lg p-4 shadow-sm select-none',
        'flex justify-between gap-2  touch-none'
      )}
    >
      {showDropIndicatorAbove && (
        <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 rounded" />
      )}
      <div className="font-semibold">{card?.name}</div>

      <div onPointerDown={e => e.stopPropagation()}>
        <EditIcon
          onClick={() => setOpenPopup(true)}
          className="h-6 w-6 p-1 rounded-md opacity-0 text-gray-100"
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

      {showDropIndicatorBelow && (
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 rounded" />
      )}
    </div>
  )
}

export default Card
