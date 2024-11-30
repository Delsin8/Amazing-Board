import React, { ReactNode } from 'react'
import styles from './styles.module.scss'

interface Props {
  children?: ReactNode
}

const Button: React.FC<Props> = ({ children }) => {
  return <button className={styles.test}>{children}</button>
}

export default Button
