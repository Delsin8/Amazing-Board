import React, { useEffect } from 'react'
import { useSocket } from '../../context/SocketProvider'

interface Props {}

const HomePage: React.FC<Props> = ({}) => {
  const { socket } = useSocket()

  useEffect(() => {
    console.log(socket)

    socket?.on('message_response', value => console.log(value))
  }, [])

  return (
    <div onClick={() => socket?.emit('message', 'message from client')}>
      Send message
    </div>
  )
}

export default HomePage
