import React, { useState } from 'react'

import { Button, InputText, Modal } from 'components/ui'
import { sendUpdateCardName } from '../boardThunks'

import { ICard } from 'types/commonTypes'

import { updateCardName } from '../boardSlice'

import { TitleIcon } from 'assets/icons'

import { useAppDispatch } from 'hooks'

interface Props extends ICard {
  boardId: string
  onClose: () => void
}

const CardModal: React.FC<Props> = ({ id, name, boardId, onClose }) => {
  const dispatch = useAppDispatch()

  const [cardName, setCardName] = useState(name)

  const handleUpdateCardName = () => {
    const previousCardState = { cardId: id, name }
    const card = { cardId: id, name: cardName }

    dispatch(updateCardName({ ...card }))

    dispatch(sendUpdateCardName({ ...card, boardId }))
      .unwrap()
      .catch(() => {
        dispatch(updateCardName({ ...previousCardState }))
      })
  }

  const handleDeleteCard = () => {}

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <TitleIcon />
          <InputText
            value={cardName}
            onChange={setCardName}
            onBlur={handleUpdateCardName}
            className="w-5/6"
          />
        </div>

        <div className="flex justify-end">
          <Button variant="danger" onClick={handleDeleteCard}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CardModal
