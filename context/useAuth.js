import Router from 'next/router'
import { useCallback } from 'react'

import cookies from '../lib/cookies'
import fetch from '../lib/fetch'

const { removeSessionTokenCookie, setSessionTokenCookie } = cookies()

const loginRequest = fetch('/login', { method: 'POST' })

export const useLogin = () =>
  useCallback(() =>
    loginRequest()
      .then(({ loginUrl }) => location.replace(loginUrl))
  , [])

export const useAuth = () =>
  useCallback(token => {
    setSessionTokenCookie(token)
    Router.push('/')
  }, [])

export const useLogout = () =>
  useCallback(removeSessionTokenCookie, [ ])
