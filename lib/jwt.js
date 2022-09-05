import jwt from 'jsonwebtoken'

import config from './config'
import { daysToSeconds } from './utils'

export const encode = payload =>
  jwt.sign(payload, config.SIGNING_SECRET, {
    algorithm: 'HS256',
    expiresIn: daysToSeconds(30),
  })

export const decode = token => {
  try {
    return jwt.verify(token, config.SIGNING_SECRET)
  } catch (e) {
    return null
  }
}
