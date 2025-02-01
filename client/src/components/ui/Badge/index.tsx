import React, { ReactNode } from 'react'

interface Props {
  bgColor?: string
  children: ReactNode
}

const Badge: React.FC<Props> = ({ bgColor = '#E1E4E8', children }) => {
  return (
    <span
      className="rounded-full px-4 py-1 w-min text-nowrap text-gray-100"
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </span>
  )
}

export default Badge
