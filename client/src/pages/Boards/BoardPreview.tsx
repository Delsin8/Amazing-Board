import React from 'react'
import { IBoard } from '../../types/commonTypes'
import { Link } from 'react-router-dom'

interface Props extends IBoard {}

const BoardPreview: React.FC<Props> = ({ _id, name }) => {
  return <Link to={`/boards/${_id}`}>{name}</Link>
}

export default BoardPreview
