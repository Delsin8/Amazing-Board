import React, { useState } from 'react'
import * as styles from '../styles.module.scss'
import ReactDOM from 'react-dom'
import Card from './Card'
import Badge from '../../../components/ui/Badge/Badge'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EditIcon } from '../../../assets/icons'
import ListModal from '../modals/ListModal'
import classNames from 'classnames'

const List: React.FC<{ listId: string }> = ({ listId }) => {
  const list = useSelector((state: RootState) => state.board.lists[listId])
  const { cards: cardsNormalized } = useSelector(
    (state: RootState) => state.board
  )

  const [openPopup, setOpenPopup] = useState(false)

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
      className={classNames('flex flex-col gap-4 p-4')}
    >
      <div
        className={classNames(
          styles['hover-icon-wrapper'],
          'flex justify-between gap-2'
        )}
      >
        <Badge color={list.color}>{list?.name}</Badge>
        <div
          onPointerDown={e => e.stopPropagation()}
          onClick={() => setOpenPopup(true)}
          className="flex items-center"
        >
          <EditIcon
            className="h-6 w-6 p-1 rounded-md opacity-0"
            style={{ background: list.color }}
          />

          {openPopup &&
            ReactDOM.createPortal(
              <ListModal onClose={() => setOpenPopup(false)} {...list} />,
              document.getElementById('modal') as HTMLDivElement
            )}
        </div>
      </div>

      <div
        className="flex flex-col gap-3 w-72"
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
