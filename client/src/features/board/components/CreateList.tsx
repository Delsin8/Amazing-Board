import React from 'react'
import { Button } from 'components/ui'
import { PlusIcon } from 'assets/icons'

const CreateList = () => {
  const handleAddList = () => {}

  return (
    <li className="h-20 w-60 p-4 shrink-0">
      <Button variant="dark" className="h-full w-full" onClick={handleAddList}>
        <PlusIcon /> Add a list
      </Button>
    </li>
  )
}

export default CreateList
