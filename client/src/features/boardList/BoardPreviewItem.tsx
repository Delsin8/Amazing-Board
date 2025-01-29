import React from 'react'
import { IBoard } from '../../types/commonTypes'
import { Link } from 'react-router-dom'

interface Props extends IBoard {}

const BoardPreview: React.FC<Props> = ({ id, title }) => {
  return (
    <li className="h-32 w-48 p-4 bg-red-100 hover:opacity-75 rounded-md">
      <Link className="block h-full w-full" to={`/boards/${id}`}>
        <div>{title}</div>
      </Link>
    </li>
  )
}

export default BoardPreview
