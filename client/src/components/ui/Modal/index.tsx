import React from 'react'
import * as styles from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ onClose, children }) => {
  return (
    <div
      className={classNames(
        styles['modal-backdrop'],
        'modal-backdrop fixed inset-0 flex justify-center items-center z-50'
      )}
    >
      <div
        className="bg-gray-200 rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
