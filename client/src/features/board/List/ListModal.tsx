import React, { useState } from 'react'
import Modal from '../../../components/ui/Modal'
import { IListNormalized } from '../../../types/commonTypes'
import { useDispatch } from 'react-redux'
import { sendUpdateListName, sendUpdateListColor } from '../boardThunks'
import { updateListColor, updateListItem } from '../boardSlice'
import InputText from '../../../components/ui/InputText/InputText'
import ColorPicker from '../../../components/ColorPicker'
import { ColorIcon, TitleIcon } from '../../../assets/icons'
import Button from '../../../components/ui/Button'

interface Props extends IListNormalized {
  onClose: () => void
}

const ListModal: React.FC<Props> = ({ onClose, ...list }) => {
  const dispatch = useDispatch()

  const [listName, setListName] = useState(list.name)

  const handleUpdateListName = (value: string) => {
    const previousListState = { ...list }
    const newList = { ...list, name: value }

    dispatch(updateListItem(newList))

    // @ts-ignore
    dispatch(
      // @ts-ignore
      sendUpdateListName({
        listId: list.id,
        name: listName,
        boardId: list.board,
      })
    )
      .unwrap()
      .catch(() => {
        dispatch(updateListItem({ ...previousListState }))
      })
  }

  const handleUpdateListColor = (value: string) => {
    const previousListState = { listId: list.id, color: list.color }
    const newList = { listId: list.id, color: value }

    dispatch(updateListColor(newList))

    // @ts-ignore
    dispatch(
      // @ts-ignore
      sendUpdateListColor({
        listId: list.id,
        boardId: list.board,
        color: value,
      })
    )
      .unwrap()
      .catch(() => {
        dispatch(updateListColor({ ...previousListState }))
      })
  }

  const handleDeleteList = () => {}

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <TitleIcon />
          <InputText
            value={listName}
            onChange={setListName}
            onBlur={handleUpdateListName}
            className="w-5/6"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <ColorIcon />
            <span>Choose color:</span>
          </div>
          <ColorPicker
            selectedColor={list.color}
            onColorClick={handleUpdateListColor}
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

export default ListModal
