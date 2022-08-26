import { mergeRight } from 'ramda'
import Cookies from 'universal-cookie'

import env from './env'
import { daysToSeconds } from './utils'

const defaultOpts = {
  maxAge: daysToSeconds(30),
  path: '/',
  sameSite: true,
  secure: env.NODE_ENV === 'production',
}

export const COOKIES = Object.freeze({
  SESSION_TOKEN: 'x-session-token',
})

export default cookieHeader => {
  const cookies = new Cookies(cookieHeader)

  const get = (name, opts = {}) => cookies.get(name, mergeRight(defaultOpts, opts))
  const set = (name, value, opts = {}) => cookies.set(name, value, mergeRight(defaultOpts, opts))
  const remove = (name, opts = {}) => cookies.remove(name, opts)

  return {
    get,
    set,
    remove,
    getSessionTokenCookie: () => get(COOKIES.SESSION_TOKEN),
    setSessionTokenCookie: value => set(COOKIES.SESSION_TOKEN, value),
    removeSessionTokenCookie: () => remove(COOKIES.SESSION_TOKEN),
  }
}
