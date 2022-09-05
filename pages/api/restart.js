import config from '../../lib/config'
import cookies from '../../lib/cookies'
import exec from '../../lib/exec'
import { decode } from '../../lib/jwt'
import { API } from '../../lib/plex'

export default async (req, res) => {
  try {
    const { getSessionTokenCookie } = cookies(req.headers.cookie)
    const sessionToken = getSessionTokenCookie()

    const user = decode(sessionToken)
    const plexApi = new API()
    const isAuthed = await plexApi.isAuthed(user)

    if (!isAuthed) {
      return res.status(401).json({
        message: 'unauthorized',
      })
    }

    const stdout = await exec(config.RESTART_COMMAND)
    console.log(`plex restarted by ${user?.email} on ${new Date()}`, { stdout })

    res.status(200).json({ successful: true })
  } catch (e) {
    console.error('failed to restart Plex', { cause: e })

    res.status(500).json({
      message: 'failed to restart',
    })
  }
}
