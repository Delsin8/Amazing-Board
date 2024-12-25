import React, { useState } from 'react'
import { ICard } from '../../../types/commonTypes'
import Button from '../../../components/ui/Button'
import { useSocket } from '../../../context/SocketProvider'

const Card: React.FC<ICard> = ({ id, name }) => {
  const [localName, setLocalName] = useState(name)
  const { socket } = useSocket()

  const updateName = () => {
    socket?.emit('updateCardName', { id, name: localName })
  }

  return (
    <div className="bg-white rounded-lg border border-slate-300 p-4">
      <input
        className="font-semibold"
        value={localName}
        onChange={e => setLocalName(e.target.value)}
      />
      <Button onClick={updateName}>Save</Button>
      {/* <span className="font-semibold">{name}</span> */}
    </div>
  )
}

export default Card
