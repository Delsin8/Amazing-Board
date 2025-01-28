import React from 'react'
import { KANBAN_COLORS } from '../../constants/kanbanColors'

interface Props {
  selectedColor: string
  onColorClick: (color: string) => void
}

const ColorPicker: React.FC<Props> = ({ selectedColor, onColorClick }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {KANBAN_COLORS.map(color => (
        <div
          key={color}
          className="w-8 h-8 rounded-md relative cursor-pointer hover:opacity-75"
          style={{ backgroundColor: color }}
          onClick={() => onColorClick(color)}
        >
          {selectedColor === color && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ColorPicker
