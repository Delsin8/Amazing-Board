import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { useAppDispatch, useAppSelector } from 'hooks'
import React, { useState } from 'react'
import { DnDOverCardInfo } from 'types/commonTypes'
import {
  selectDenormalizedBoard,
  selectDenormalizedCards,
} from '../boardSelectors'
import {
  calculateDndCardHover,
  calculateDndNewPosition,
} from 'utils/DnDPositions'
import { updateCardPosition, updateListPosition } from '../boardSlice'
import { reorderCard, reorderList } from '../boardThunks'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import DnDList from '../List/DnDList'

const DnDBoard: React.FC = () => {
  const dispatch = useAppDispatch()

  const board = useAppSelector(selectDenormalizedBoard)!
  const cards = useAppSelector(selectDenormalizedCards)

  const [overInfo, setOverInfo] = useState<DnDOverCardInfo | null>(null)

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
        targetListId: previousCard.list,
        sourceListId: previousCard.list,
      }

      const card = {
        cardId: active.id as string,
        position: newPosition,
        targetListId: overList.id,
        sourceListId: activeList.id,
        boardId: board.id,
      }

      const cardUpdate = {
        cardId: active.id as string,
        position: newPosition,
        listId: overList.id,
        boardId: board.id,
      }

      dispatch(updateCardPosition({ ...card }))

      dispatch(reorderCard({ ...cardUpdate }))
        .unwrap()
        .catch(() => {
          dispatch(updateCardPosition({ ...previousCardState }))
        })
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

      dispatch(reorderList({ ...list }))
        .unwrap()
        .catch(() => {
          dispatch(updateListPosition({ ...previousListState }))
        })
    }
  }

  return (
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
          <DnDList listId={list.id} overInfo={overInfo} key={list.id} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default DnDBoard
