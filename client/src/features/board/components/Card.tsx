import React from 'react'
import { ICard } from '../../../types/commonTypes'

const Card: React.FC<ICard> = ({ name }) => {
  return (
    <div>
      <div>{name}</div>
    </div>
  )
}

export default Card
