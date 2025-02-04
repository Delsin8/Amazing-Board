import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import * as styles from '../styles.module.scss'

import { Badge, Button } from 'components/ui'
import ListModal from './ListModal'
import DnDCard from '../Card/DnDCard'

import { createCard } from '../boardThunks'
import { useAppDispatch, useAppSelector } from 'hooks'

import { EditIcon, PlusIcon } from 'assets/icons'

import { showCardDropIndicator } from 'utils/DnDPositions'
import { DnDOverCardInfo } from 'types/commonTypes'

import classNames from 'classnames'

interface Props {
  listId: string
  overInfo: DnDOverCardInfo | null
}

const List: React.FC<Props> = ({ listId, overInfo }) => {
  const dispatch = useAppDispatch()

  const list = useAppSelector(state => state.board.lists[listId])
  const { cards: cardsNormalized } = useAppSelector(state => state.board)

  const [openPopup, setOpenPopup] = useState(false)

  const cards = Object.values(cardsNormalized)
    .filter(card => card.list === listId)
    .sort((a, b) => a.position - b.position)

  const handleCreateCard = () => {
    dispatch(createCard({ listId, boardId: list.board }))
  }

  return (
    <li className={classNames('h-full flex flex-col gap-4 p-4')}>
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
          <DnDCard
            cardId={card.id}
            showDropIndicatorAbove={showCardDropIndicator(
              index,
              list.id,
              overInfo,
              'above'
            )}
            showDropIndicatorBelow={showCardDropIndicator(
              index,
              list.id,
              overInfo,
              'below'
            )}
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
