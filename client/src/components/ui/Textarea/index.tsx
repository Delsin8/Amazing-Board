import classNames from 'classnames'
import React from 'react'

interface Props
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'onBlur'
  > {
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
}

const TextArea: React.FC<Props> = ({
  onChange,
  onBlur,
  rows = 3,
  className = '',
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange && onChange(e.target.value)
  const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onBlur && onBlur(e.target.value)

  return (
    <textarea
      {...props}
      rows={rows}
      className={classNames('w-full rounded-md p-1', className)}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default TextArea
