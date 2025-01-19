import React, { useState } from 'react'
import Modal from '../../../components/ui/Modal'
import { ICard } from '../../../types/commonTypes'
import { useDispatch } from 'react-redux'
import { sendUpdateCardName } from '../boardThunks'
import { updateCardName } from '../boardSlice'

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
      <div className="flex gap-3">
        <input value={cardName} onChange={e => setCardName(e.target.value)} />
        <button onClick={handleUpdateCardName}>Update card name</button>
      </div>
    </Modal>
  )
}

export default CardModal
