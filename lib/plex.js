import { PlexLogin } from 'login-with-plex'
import PlexAPI from 'plex-api'

import env from './env'

const HOST = env.HOST

export class Oauth {
  constructor (credentials) {
    this.credentials = credentials
    this.client = new PlexLogin({
      appName: env.NAME,
      clientId: env.PLEX_CLIENT_ID,
      forwardUrl: `${HOST}/login/:token`,
    })
  }

  generateCredentials () {
    return this.client.generateCredentials()
  }

  getLoginUrl (credentials = this.credentials) {
    return this.client.getLoginUrl(credentials)
  }

  getUserInfo (credentials = this.credentials) {
    return this.client.getUserInfo(credentials)
  }
}

export class API {
  constructor (token) {
    this.token = token
    this.client = new PlexAPI({
      hostname: env.PLEX_HOSTNAME,
      https: env.PLEX_USE_HTTPS,
      port: env.PLEX_PORT,
      token,
      options: {
        identifier: env.PLEX_CLIENT_ID,
        product: env.NAME,
      },
    })
  }

  getStatus () {
    return this.client.query('/')
  }

  async isAuthed () {
    if (!this.token) {
      return false
    }

    try {
      await this.getStatus()

      return true
    } catch (e) {
      return false
    }
  }
}
