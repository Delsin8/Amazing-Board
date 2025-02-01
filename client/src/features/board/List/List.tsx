import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import * as styles from '../styles.module.scss'

import { Badge, Button } from 'components/ui'
import Card from '../Card/Card'
import ListModal from './ListModal'

import { RootState } from 'app/store'
import { createCard } from '../boardThunks'

import { EditIcon, PlusIcon } from 'assets/icons'

import classNames from 'classnames'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  listId: string
  overInfo: {
    listId: string
    listIndex: number
    cardId: string
    cardIndex: number
    position: 'above' | 'below'
  } | null
}

const List: React.FC<Props> = ({ listId, overInfo }) => {
  const dispatch = useDispatch()

  const list = useSelector((state: RootState) => state.board.lists[listId])
  const { cards: cardsNormalized } = useSelector(
    (state: RootState) => state.board
  )

  const [openPopup, setOpenPopup] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefSortable,
    transform,
    transition,
  } = useSortable({ id: listId, data: { type: 'list' } })

  const { setNodeRef: setNodeRefDroppable } = useDroppable({
    id: list.id,
    data: {
      type: 'list',
      list,
    },
  })

  const cards = Object.values(cardsNormalized)
    .filter(card => card.list === listId)
    .sort((a, b) => a.position - b.position)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const setNodeRef = (element: HTMLElement | null) => {
    setNodeRefSortable(element)
    setNodeRefDroppable(element)
  }

  const handleCreateCard = () => {
    // @ts-ignore
    dispatch(createCard({ listId, boardId: list.board }))
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={classNames('h-full flex flex-col gap-4 p-4')}
    >
      <div
        className={classNames(
          styles['hover-icon-wrapper'],
          'flex justify-between gap-2 touch-none'
        )}
      >
        <Badge bgColor={list.color}>{list?.name}</Badge>
        <div
          onPointerDown={e => e.stopPropagation()}
          onClick={() => setOpenPopup(true)}
          className="flex items-center"
        >
          <EditIcon
            className="h-6 w-6 p-1 rounded-md opacity-0 text-gray-100"
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
        className="flex flex-col gap-3 w-60"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {cards.map((card, index) => (
          <Card
            cardId={card.id}
            showDropIndicatorAbove={
              list.id === overInfo?.listId &&
              Number.isFinite(overInfo.cardIndex)
                ? Math.abs(overInfo.cardIndex as number) === index &&
                  overInfo.position === 'above'
                : false
            }
            showDropIndicatorBelow={
              list.id === overInfo?.listId &&
              Number.isFinite(overInfo.cardIndex)
                ? Math.abs(overInfo.cardIndex as number) === index &&
                  overInfo.position === 'below'
                : false
            }
            key={card.id}
          />
        ))}

        <Button
          variant="light"
          onPointerDown={e => e.stopPropagation()}
          onClick={handleCreateCard}
        >
          <PlusIcon /> Add a card
        </Button>
      </div>
    </li>
  )
}

export default List
