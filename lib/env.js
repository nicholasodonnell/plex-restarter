const throwNotFound = env => {
  throw new Error(`${env} is not defined in .env`)
}

export default {
  get HOST () {
    return process.env.HOST || 'http://localhost:3000'
  },

  get NAME () {
    return process.env.NEXT_PUBLIC_NAME || 'Plex Restarter'
  },

  get SIGNING_SECRET () {
    return process.env.SIGNING_SECRET || throwNotFound('SIGNING_SECRET')
  },

  get PLEX_CLIENT_ID () {
    return process.env.PLEX_CLIENT_ID || throwNotFound('PLEX_CLIENT_ID')
  },

  get PLEX_HOSTNAME () {
    return process.env.PLEX_HOSTNAME || throwNotFound('PLEX_HOSTNAME')
  },

  get PLEX_PORT () {
    return process.env.PLEX_PORT || 32400
  },

  get PLEX_USE_HTTPS () {
    return process.env.PLEX_USE_HTTPS === 'true'
  },

  get RESTART_COMMAND () {
    return process.env.RESTART_COMMAND || throwNotFound('RESTART_COMMAND')
  },

  get NODE_ENV () {
    return process.env.NODE_ENV
  },
}
