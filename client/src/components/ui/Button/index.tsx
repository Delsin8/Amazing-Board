import classNames from 'classnames'
import React, { ReactNode } from 'react'

import * as styles from './styles.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  children?: ReactNode
}

const Button: React.FC<Props> = ({
  children,
  variant = 'success',
  className = '',
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        'border rounded-md py-1 px-2 text-gray-200',
        'flex justify-center items-center gap-1',
        styles[variant],
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
