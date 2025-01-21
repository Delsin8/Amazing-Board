import React from 'react'

interface Props {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ onClose, children }) => {
  return (
    <div className="modal-backdrop fixed inset-0 bg-black flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
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
