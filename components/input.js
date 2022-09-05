import cx from 'classnames'
import { useCallback } from 'react'

import classNames from '../styles/input.module.css'

export const Input = ({
  className,
  label = '',
  name,
  onChange,
  type = 'text',
  value,
}) => (
  <div className={cx(classNames.input, className)}>
    <input
      className={classNames.input__field}
      id={name}
      name={name}
      onChange={onChange}
      placeholder={label}
      type={type}
      value={value || ''}
    />
    <label
      className={classNames.input__label}
      htmlFor={name}
    >
      {label}
    </label>
  </div>
)

export const Switch = ({
  className,
  label = '',
  name,
  onChange,
  value,
}) => {
  const handleChange = useCallback(e => {
    e.target.value = e.target.checked

    onChange?.(e)
  }, [ onChange ])

  return (
    <div className={cx(classNames.switch, className)}>
      <label
        className={classNames.switch__placeholder}
      >
        {label}
      </label>
      <input
        checked={value === 'true'}
        className={classNames.switch__input}
        id={name}
        name={name}
        onChange={handleChange}
        type="checkbox"
      />
      <label
        className={classNames.switch__label}
        htmlFor={name}
      />
    </div>
  )
}
