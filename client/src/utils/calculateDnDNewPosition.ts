const calculateDndNewPosition = <T extends { id: string; position: number }>(
  items: T[],
  overCardIndex: number,
  activeCardIndex: number,
  isSameList: boolean
) => {
  let newPos = 0

  const prevCardIndex = overCardIndex - 1
  const nextCardIndex = overCardIndex + 1

  if (!isSameList) {
    if (!items[prevCardIndex]) newPos = items[overCardIndex].position / 2
    else if (!items[nextCardIndex])
      newPos = items[items.length - 1].position + 1000
    else
      newPos =
        (items[prevCardIndex].position + items[overCardIndex].position) / 2
  } else {
    if (activeCardIndex > overCardIndex) {
      if (!items[prevCardIndex]) {
        newPos = items[overCardIndex].position / 2
      } else {
        newPos =
          (items[prevCardIndex].position + items[overCardIndex].position) / 2
      }
    } else {
      if (!items[nextCardIndex]) {
        newPos = items[overCardIndex].position + 1000
      } else
        newPos =
          (items[overCardIndex].position + items[nextCardIndex].position) / 2
    }
  }

  return newPos
}

export default calculateDndNewPosition
