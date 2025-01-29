import React, { useState } from 'react'
import Modal from '../../../components/ui/Modal'
import { IBoardNormalized } from '../../../types/commonTypes'
import { useDispatch } from 'react-redux'
import InputText from '../../../components/ui/InputText/InputText'
import { DescriptionIcon, TitleIcon } from '../../../assets/icons'
import Button from '../../../components/ui/Button'
import TextArea from '../../../components/ui/Textarea'

interface Props extends IBoardNormalized {
  onClose: () => void
}

const BoardModal: React.FC<Props> = ({ onClose, ...board }) => {
  const dispatch = useDispatch()

  const [boardTitle, setBoardTitle] = useState(board.title)
  const [boardDescription, setBoardDescription] = useState(board.description)

  const handleUpdateBoardTitle = (value: string) => {}

  const handleUpdateBoardDescription = (value: string) => {}

  const handleDeleteList = () => {}

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <TitleIcon />
          <InputText
            value={boardTitle}
            onChange={setBoardTitle}
            onBlur={handleUpdateBoardTitle}
            className="w-5/6"
          />
        </div>

        <div className="flex items-center gap-1">
          <DescriptionIcon />
          <TextArea
            value={boardDescription}
            onChange={setBoardDescription}
            onBlur={handleUpdateBoardDescription}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="danger" onClick={handleDeleteList}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default BoardModal
