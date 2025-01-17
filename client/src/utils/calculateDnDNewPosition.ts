const calculateDndNewPosition = <T extends { id: string; position: number }>(
  items: T[],
  overItemIndex: number,
  activeItemIndex: number,
  isSameList: boolean
) => {
  let newPos = 0
  const prevCardIndex = overItemIndex - 1
  const nextCardIndex = overItemIndex + 1

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

export default calculateDndNewPosition
