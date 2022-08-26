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
      .then(({ loginUrl }) => location.replace(loginUrl))
  , [])

  return { loading, login }
}

export const useAuth = () => {
  const auth = useCallback(token => {
    setSessionTokenCookie(token)
    Router.push('/')
  }, [])

  return { auth }
}

export const useLogout = () => {
  const logout = useCallback(removeSessionTokenCookie, [ ])

  return { logout }
}
