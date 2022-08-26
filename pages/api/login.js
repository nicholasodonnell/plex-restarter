import { encode } from '../../lib/jwt'
import { Oauth } from '../../lib/plex'

export default async (req, res) => {
  try {
    const oauth = new Oauth()
    const credentials = await oauth.generateCredentials()
    const loginUrl = await oauth.getLoginUrl(credentials)
    const token = encode(credentials)

    res.status(200).json({ loginUrl: loginUrl.replace(encodeURIComponent(':token'), token) })
  } catch (e) {
    res.status(500).json({
      message: 'Failed to create login url',
    })
  }
}
