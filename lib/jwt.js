import jwt from 'jsonwebtoken'

import env from './env'
import { daysToSeconds } from './utils'

export const encode = payload =>
  jwt.sign(payload, env.SIGNING_SECRET, {
    algorithm: 'HS256',
    expiresIn: daysToSeconds(30),
  })

export const decode = token => {
  try {
    return jwt.verify(token, env.SIGNING_SECRET)
  } catch (e) {
    return null
  }
}
