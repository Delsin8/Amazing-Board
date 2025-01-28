import React from 'react'

interface Props {
  value?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
}

const InputText: React.FC<Props> = ({ value, onChange, onBlur }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(e.target.value)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    onBlur && onBlur(e.target.value)

  return (
    <input
      className="rounded-full px-4 py-1 w-min text-nowrap"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default InputText
