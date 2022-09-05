import React from 'react'

import classNames from '../styles/error-boundary.module.css'
import { H2 } from './text'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: null }
  }

  static getDerivedStateFromError(e) {
    console.log('eeeee', e)
    return { hasError: true, message: e?.message }
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  onUnhandledRejection = e => {
    e.promise.catch(() => {
      this.setState({ hasError: true, message: e.reason.message })
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={classNames.wrapper}>
          <svg className={classNames.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
          </svg>
          <H2 className={classNames.message}>{this.state.message}</H2>
        </div>
      )
    }

    return this.props.children
  }
}
