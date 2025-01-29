import React, { useState } from 'react'
import apiClient from '../../../api/apiClient'

interface Props {
  boardId: string
}

const BoardSettings: React.FC<Props> = ({ boardId }) => {
  const [userId, setUserId] = useState('')

  const addToAccessiblelist = () => {
    apiClient.post(
      `${process.env.API_URL}/boards/${boardId}/allowed-users/${userId}`
    )
  }

  const removeFromAccessiblelist = () => {
    apiClient.delete(
      `${process.env.API_URL}/boards/${boardId}/allowed-users/${userId}`
    )
  }

  return (
    <div className="flex gap-3">
      <input value={userId} onChange={e => setUserId(e.target.value)} />
      <button type="button" onClick={addToAccessiblelist}>
        Add
      </button>
      <button type="button" onClick={removeFromAccessiblelist}>
        Remove
      </button>
    </div>
  )
}

export default BoardSettings
