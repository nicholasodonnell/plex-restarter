import Router from 'next/router'
import { useCallback, useState } from 'react'

import cookies from '../lib/cookies'
import fetch from '../lib/fetch'

const { removeSessionTokenCookie, setSessionTokenCookie } = cookies()

const loginRequest = fetch('/login', { method: 'POST' })

export const useLogin = () => {
  const [ loading, setLoading ] = useState(false)

  const login = useCallback(() =>
    Promise.resolve()
      .then(() => setLoading(true))
      .then(loginRequest)
      .then(({ loginUrl }) => location.href = loginUrl)
  , [])

  return { loading, login }
}

export const useAuth = () => {
  const auth = useCallback(token =>
    Promise.resolve(token)
      .then(setSessionTokenCookie)
      .then(() => Router.push('/'))
  , [])

  return { auth }
}

export const useLogout = ({ reload = false } = {}) => {
  const logout = useCallback(() =>
    Promise.resolve()
      .then(removeSessionTokenCookie)
      .then(() => reload && Router.push('/'))
  , [ reload ])

  return { logout }
}
