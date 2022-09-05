import cx from 'classnames'

import classNames from '../styles/text.module.css'

export const H2 = ({ children, className }) => (
  <h2 className={cx(classNames.h2, className)}>{children}</h2>
)
