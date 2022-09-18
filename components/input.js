import cx from 'classnames'
import { identity } from 'ramda'

import classNames from '../styles/input.module.css'

export const Input = ({
  className,
  disabled,
  label = '',
  name,
  onChange,
  transform = identity,
  type = 'text',
  value ,
}) => {
  const handleChange = e =>
    onChange?.(transform(e.target.value))

  return (
    <div className={cx(classNames.input, className)}>
      <input
        className={classNames.input__field}
        disabled={disabled}
        id={name}
        name={name}
        onChange={handleChange}
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
}

export const Switch = ({
  className,
  disabled,
  label = '',
  name,
  onChange,
  value,
}) => {
  const handleChange = e =>
    onChange?.(e.target.checked)

  return (
    <div className={cx(classNames.switch, className)}>
      <label
        className={classNames.switch__placeholder}
      >
        {label}
      </label>
      <input
        checked={!!value}
        disabled={disabled}
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
