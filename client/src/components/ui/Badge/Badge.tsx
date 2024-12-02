import React, { ReactNode } from 'react'

interface Props {
  color?: string
  children: ReactNode
}

const Badge: React.FC<Props> = ({ color = '#E1E4E8', children }) => {
  return (
    <span
      className="rounded-full px-4 py-1 w-min text-nowrap"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  )
}

export default Badge
