import cx from 'classnames'

import classNames from '../styles/button.module.css'

export default ({
  active,
  children,
  className,
  disabled,
  onClick,
  rounded,
  spin,
}) => (
  <button
    className={cx(classNames.button, {
      [classNames['button--active']]: active,
      [classNames['button--rounded']]: rounded,
      [classNames['button--spin']]: spin,
    }, className)}
    disabled={disabled}
    onClick={onClick}
  >
    <div className={classNames.button__inside}>
      {children}
    </div>
  </button>
)
