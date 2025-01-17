import React from 'react'
import List from './List'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { updateCardPosition } from '../boardSlice'
import calculateDndNewPosition from '../../../utils/calculateDnDNewPosition'

const Board: React.FC = () => {
  const {
    board,
    lists: listsNormalized,
    cards: cardsNormalized,
  } = useSelector((state: RootState) => state.board)
  const dispatch = useDispatch()

  const lists = Object.values(listsNormalized)
  const cards = Object.values(cardsNormalized)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active.id || !over?.id || active.id === over.id) return

    const overList = lists.find(list =>
      list.cards.includes(over.id as string)
    )?.id
    const activeList = lists.find(list =>
      list.cards.includes(active.id as string)
    )?.id
    if (!overList || !activeList) return

    const isSameList = overList === activeList

    const listCards = cards
      .filter(card => card.list === overList)
      .sort((a, b) => a.position - b.position)

    const overCardIndex = listCards.findIndex(card => card.id === over.id)
    const activeCardIndex = listCards.findIndex(card => card.id === active.id)

    const newPosition = calculateDndNewPosition(
      listCards,
      overCardIndex,
      activeCardIndex,
      isSameList
    )

    const card = {
      ...cards.find(item => item.id === active.id)!,
      position: newPosition,
      list: overList,
    }

    dispatch(updateCardPosition(card))
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">{board?.title}</h1>
      <div className="mb-4">{board?.description}</div>

      <ol className="w-100 flex gap-4 bg-slate-100 rounded-md p-4">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={cards} strategy={verticalListSortingStrategy}>
            {lists.map(list => (
              <List listId={list.id} key={list.id} />
            ))}
          </SortableContext>
        </DndContext>
      </ol>
    </div>
  )
}

export default Board
