import React, { useState } from 'react'
import { Button, InputText, Modal, TextArea } from 'components/ui'
import { IBoardNormalized } from 'types/commonTypes'
import { DescriptionIcon, TitleIcon } from 'assets/icons'

import { useDispatch } from 'react-redux'

interface Props extends IBoardNormalized {
  onClose: () => void
}

const BoardModal: React.FC<Props> = ({ onClose, ...board }) => {
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
