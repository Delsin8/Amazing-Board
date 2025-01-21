import React, { useState } from 'react'
import Modal from '../../../components/ui/Modal'
import { ICard } from '../../../types/commonTypes'
import { useDispatch } from 'react-redux'
import { sendUpdateCardName } from '../boardThunks'
import { updateCardName } from '../boardSlice'
import { TitleIcon } from '../../../assets/icons'
import InputText from '../../../components/ui/InputText/InputText'
import Button from '../../../components/ui/Button'

interface Props extends ICard {
  boardId: string
  onClose: () => void
}

const CardModal: React.FC<Props> = ({ id, name, boardId, onClose }) => {
  const dispatch = useDispatch()

  const [cardName, setCardName] = useState(name)

  const handleUpdateCardName = () => {
    const previousCardState = { cardId: id, name }
    const card = { cardId: id, name: cardName }

    dispatch(updateCardName({ ...card }))

    // @ts-ignore
    dispatch(sendUpdateCardName({ ...card, boardId }))
      .unwrap()
      .catch(() => {
        dispatch(updateCardName({ ...previousCardState }))
      })
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <TitleIcon />
          <InputText
            value={cardName}
            onChange={setCardName}
            onBlur={handleUpdateCardName}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}

export default CardModal
