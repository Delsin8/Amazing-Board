import classNames from 'classnames'
import React from 'react'

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'onBlur'
  > {
  value?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  className?: string
}

const InputText: React.FC<Props> = ({
  value,
  onChange,
  onBlur,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(e.target.value)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    onBlur && onBlur(e.target.value)

  return (
    <input
      className={classNames(
        'w-full rounded-full px-4 py-1 text-nowrap',
        className
      )}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  )
}

export default InputText
