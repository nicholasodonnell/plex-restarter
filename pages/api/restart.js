import cookies from '../../lib/cookies'
import env from '../../lib/env'
import exec from '../../lib/exec'
import { decode } from '../../lib/jwt'
import { API } from '../../lib/plex'

export default async (req, res) => {
  try {
    const { getSessionTokenCookie } = cookies(req.headers.cookie)
    const sessionToken = getSessionTokenCookie()

    const user = decode(sessionToken)
    const plexApi = new API(user?.authToken)
    const isAuthed = await plexApi.isAuthed()

    if (!isAuthed) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    await exec(env.RESTART_COMMAND)

    res.status(200).json({ successful: true })
  } catch (e) {
    res.status(500).json({
      message: 'Failed to restart',
    })
  }
}
