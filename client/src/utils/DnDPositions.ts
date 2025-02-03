import { DnDOverCardInfo } from 'types/commonTypes'

export const calculateDndNewPosition = <
  T extends { id: string; position: number }
>(
  items: T[],
  overItemIndex: number,
  activeItemIndex: number,
  isSameList: boolean
) => {
  let newPos = 1000
  const prevCardIndex = overItemIndex - 1
  const nextCardIndex = overItemIndex + 1

  if (!items.length) return newPos

  if (!isSameList) {
    if (!items[prevCardIndex]) newPos = items[overItemIndex].position / 2
    else if (!items[nextCardIndex])
      newPos = items[items.length - 1].position + 1000
    else
      newPos =
        (items[prevCardIndex].position + items[overItemIndex].position) / 2
  } else {
    if (activeItemIndex > overItemIndex) {
      if (!items[prevCardIndex]) {
        newPos = items[overItemIndex].position / 2
      } else {
        newPos =
          (items[prevCardIndex].position + items[overItemIndex].position) / 2
      }
    } else {
      if (!items[nextCardIndex]) {
        newPos = items[overItemIndex].position + 1000
      } else
        newPos =
          (items[overItemIndex].position + items[nextCardIndex].position) / 2
    }
  }

  return newPos
}

export const calculateDndCardHover = (
  overItemIndex: number,
  activeItemIndex: number,
  isSameList: boolean
) => {
  let newPos: 'below' | 'above' = 'below'

  if (!isSameList) {
    newPos = 'below'
  } else {
    if (activeItemIndex > overItemIndex) newPos = 'above'
    else newPos = 'below'
  }

  return newPos
}

export const showCardDropIndicator = (
  currentIndex: number,
  currentListId: string,
  overInfo: DnDOverCardInfo | null,
  position: 'above' | 'below'
) => {
  if (
    !overInfo ||
    currentListId !== overInfo?.listId ||
    !Number.isFinite(overInfo.cardIndex)
  )
    return false

  return (
    Math.abs(overInfo.cardIndex as number) === currentIndex &&
    overInfo.position === position
  )
}
