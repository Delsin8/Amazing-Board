import React, { useState } from 'react'
import List from './List'

import { useDispatch, useSelector } from 'react-redux'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { updateCardPosition, updateListPosition } from '../boardSlice'
import {
  calculateDndNewPosition,
  calculateDndCardHover,
} from '../../../utils/DnDPositions'
import {
  selectDenormalizedBoard,
  selectDenormalizedCards,
} from '../boardSelectors'

const Board: React.FC = () => {
  const dispatch = useDispatch()

  const board = useSelector(selectDenormalizedBoard)
  const cards = useSelector(selectDenormalizedCards)

  const [overInfo, setOverInfo] = useState<{
    listId: string
    listIndex: number
    cardId: string
    cardIndex: number
    position: 'above' | 'below'
  } | null>(null)

  if (!board) return null

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!active.id || !over?.id || active.id === over.id) return

    if (active.data.current?.type === 'card') {
      const overList = board.lists.find(list =>
        list.cards.some(card => card.id === over.id)
      )
      const activeList = board.lists.find(list =>
        list.cards.some(card => card.id === active.id)
      )

      if (!overList?.id || !activeList?.id) return setOverInfo(null)

      const isSameList = overList === activeList

      const listCards = cards
        .filter(card => card.list === overList.id)
        .sort((a, b) => a.position - b.position)

      const overCardIndex = listCards.findIndex(card => card.id === over.id)
      const activeCardIndex = listCards.findIndex(card => card.id === active.id)

      const newPosition = calculateDndCardHover(
        listCards,
        overCardIndex,
        activeCardIndex,
        isSameList
      )

      setOverInfo({
        listId: overList.id,
        listIndex: board.lists.indexOf(overList),
        cardId: listCards[overCardIndex].id,
        cardIndex: overCardIndex,
        position: newPosition,
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setOverInfo(null)

    if (!active.id || !over?.id || active.id === over.id) return

    if (active.data.current?.type === 'card') {
      const overList = board.lists.find(list =>
        over.data.current?.type === 'list'
          ? list.id === over.id
          : list.cards.some(card => card.id === over.id)
      )
      const activeList = board.lists.find(list =>
        list.cards.some(card => card.id === active.id)
      )

      if (!overList?.id || !activeList?.id) return

      const isSameList = overList === activeList

      const listCards = cards
        .filter(card => card.list === overList.id)
        .sort((a, b) => a.position - b.position)

      const overCardIndex = listCards.findIndex(card => card.id === over.id)
      const activeCardIndex = listCards.findIndex(card => card.id === active.id)

      const newPosition = calculateDndNewPosition(
        listCards,
        overCardIndex,
        activeCardIndex,
        isSameList
      )

      const previousCard = cards.find(card => card.id === active.id)!
      const previousCardState = {
        cardId: previousCard.id,
        position: previousCard.position,
        listId: previousCard.list,
      }

      const card = {
        cardId: active.id as string,
        position: newPosition,
        targetListId: overList.id,
        sourceListId: activeList.id,
        boardId: board.id,
      }

      dispatch(updateCardPosition({ ...card }))

      // @ts-ignore
      // dispatch(reorderCard({ ...card }))
      //   .unwrap()
      //   .catch(() => {
      //     dispatch(updateCardPosition({ ...previousCardState }))
      //   })
    } else if (
      active.data.current?.type === 'list' &&
      over.data.current?.type === 'list'
    ) {
      const overListIndex = board.lists.findIndex(item => item.id === over.id)
      const activeListIndex = board.lists.findIndex(
        item => item.id === active.id
      )

      const newPosition = calculateDndNewPosition(
        board.lists,
        overListIndex,
        activeListIndex,
        true
      )

      const previousList = board.lists[activeListIndex]
      const previousListState = {
        listId: previousList.id,
        position: previousList.position,
      }

      const list = {
        listId: active.id as string,
        boardId: board.id,
        position: newPosition,
      }

      dispatch(updateListPosition({ ...list }))

      // @ts-ignore
      // dispatch(reorderList({ ...list }))
      //   .unwrap()
      //   .catch(() => {
      //     dispatch(updateListPosition({ ...previousListState }))
      //   })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">{board?.title}</h1>
      <div className="mb-4">{board?.description}</div>

      <ol className="w-100 flex gap-4 bg-slate-100 rounded-md p-4">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <SortableContext
            strategy={horizontalListSortingStrategy}
            items={[...board.lists]}
          >
            {board.lists.map(list => (
              <List listId={list.id} overInfo={overInfo} key={list.id} />
            ))}
          </SortableContext>
        </DndContext>
      </ol>
    </div>
  )
}

export default Board
