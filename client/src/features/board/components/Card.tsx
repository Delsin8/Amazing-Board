import React from 'react'
import { ICard } from '../../../types/commonTypes'

const Card: React.FC<ICard> = ({ name }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-300 p-4">
      <span className="font-semibold">{name}</span>
    </div>
  )
}

export default Card
