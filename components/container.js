import cx from 'classnames'

import classNames from '../styles/container.module.css'

export default ({ children, className }) => (
  <div className={cx(classNames.container, className)}>{children}</div>
)
