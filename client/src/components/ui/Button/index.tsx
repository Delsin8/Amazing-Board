import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children?: ReactNode
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

export default Button
