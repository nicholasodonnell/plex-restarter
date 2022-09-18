import { PlexLogin } from 'login-with-plex'
import PlexAPI from 'plex-api'

import config from './config'

const PLEX_CLIENT_ID = 'b8c9cae3-8ed5-46a9-b2fc-0f6953a75d03'

export class Oauth {
  constructor ({ credentials, host = '' }) {
    this.credentials = credentials
    this.client = new PlexLogin({
      appName: 'Plex Restarter',
      clientId: PLEX_CLIENT_ID,
      forwardUrl: `${host}/login/:token`,
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
  constructor () {
    this.client = new PlexAPI({
      hostname: config.PLEX_HOSTNAME,
      https: !!config.PLEX_USE_HTTPS,
      port: config.PLEX_PORT,
      token: config.PLEX_TOKEN,
      options: {
        identifier: PLEX_CLIENT_ID,
        product: 'Plex Restarter',
      },
    })
  }

  async getUsers () {
    try {
      const response = await this.client.query('/accounts')

      return response?.MediaContainer?.Account?.map(({ id }) => id)
    } catch (e) {
      console.error('failed to get plex users', { cause: e })

      return []
    }
  }

  async isAuthed (user) {
    if (!user) {
      return false
    }

    try {
      const { authToken, id } = user
      const users = await this.getUsers()

      const isAuthed = authToken === config.PLEX_TOKEN || users.includes(id)

      if (isAuthed) {
        console.info('authorized plex user', { email: user.email })
      } else {
        console.warn('unauthorized plex user', { email: user.email })
      }

      return isAuthed
    } catch (e) {
      console.error('failed to check if user is authed', { cause: e })

      return false
    }
  }
}
