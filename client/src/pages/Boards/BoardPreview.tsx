import React from 'react'
import { IBoard } from '../../types/commonTypes'
import { Link } from 'react-router-dom'

interface Props extends IBoard {}

const BoardPreview: React.FC<Props> = ({ id, title }) => {
  return <Link to={`/boards/${id}`}>{title}</Link>
}

export default BoardPreview
