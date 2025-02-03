import { closestCorners, DndContext, useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAppSelector } from 'hooks'
import React from 'react'
import { DnDOverCardInfo } from 'types/commonTypes'
import List from './List'

interface Props {
  listId: string
  overInfo: DnDOverCardInfo | null
}

const DnDList: React.FC<Props> = ({ listId, overInfo }) => {
  const list = useAppSelector(state => state.board.lists[listId])

  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefSortable,
    transform,
    transition,
  } = useSortable({ id: listId, data: { type: 'list' } })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const setNodeRef = (element: HTMLElement | null) => {
    setNodeRefSortable(element)
    setNodeRefDroppable(element)
  }

  const { setNodeRef: setNodeRefDroppable } = useDroppable({
    id: list.id,
    data: {
      type: 'list',
      list,
    },
  })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <List listId={listId} overInfo={overInfo} />
    </div>
  )
}

export default DnDList
