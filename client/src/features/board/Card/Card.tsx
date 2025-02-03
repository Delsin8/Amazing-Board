import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import * as styles from '../styles.module.scss'

import CardModal from './CardModal'

import { EditIcon } from 'assets/icons'

import classNames from 'classnames'
import { useAppSelector } from 'hooks'

interface Props {
  cardId: string
}

const Card: React.FC<Props> = ({ cardId }) => {
  const card = useAppSelector(state => state.board.cards[cardId])
  const color = useAppSelector(state => state.board.lists[card.list])?.color
  const { board } = useAppSelector(state => state.board)

  const [openPopup, setOpenPopup] = useState(false)

  return (
    <div
      className={classNames(
        styles['hover-icon-wrapper'],
        'relative border border-gray-400 rounded-lg p-4 shadow-sm',
        'flex justify-between gap-2'
      )}
    >
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
    </div>
  )
}

export default Card
