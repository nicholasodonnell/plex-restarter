import { v4 as uuidv4 } from 'uuid'

import config from '../../lib/config'
import isInstalled from '../../lib/isInstalled'

export default async (req, res) => {
  try {
    if (isInstalled()) {
      return res.status(400).json({
        error: 'already installed',
      })
    }

    const { PLEX_HOSTNAME, PLEX_PORT, PLEX_USE_HTTPS, RESTART_COMMAND } = req.body

    if (!PLEX_HOSTNAME || !PLEX_PORT || !PLEX_USE_HTTPS || !RESTART_COMMAND) {
      return res.status(400).json({
        message: 'missing required fields',
      })
    }

    config.PLEX_HOSTNAME = PLEX_HOSTNAME
    config.PLEX_PORT = PLEX_PORT
    config.PLEX_USE_HTTPS = PLEX_USE_HTTPS === 'true'
    config.RESTART_COMMAND = RESTART_COMMAND

    config.SIGNING_SECRET = uuidv4()
    config.PLEX_CLIENT_ID = uuidv4()

    console.log('successfully installed')

    res.status(200).json({ successful: true })
  } catch (e) {
    console.error('failed to install', { cause: e })

    res.status(500).json({
      message: 'failed to install',
    })
  }
}
