import React from 'react'

interface Props {
  value?: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
}

const InputText: React.FC<Props> = ({ value, onChange, onBlur }) => {
  return (
    <input
      className="rounded-full px-4 py-1 w-min text-nowrap"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e.target.value)}
    />
  )
}

export default InputText
