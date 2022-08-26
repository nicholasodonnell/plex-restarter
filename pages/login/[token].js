import { useEffect } from 'react'

import { useAuth } from '../../context/useAuth'
import { decode, encode } from '../../lib/jwt'
import { Oauth } from '../../lib/plex'
import classNames from '../../styles/login.module.css'

export default ({ token }) => {
  const auth = useAuth()

  useEffect(() => {
    auth(token)
  }, [ auth, token ])

  return (
    <svg className={classNames.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className={classNames.spinner__bar} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className={classNames.spinner__rail} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

export const getServerSideProps = async ctx => {
  try {
    const { token: credentialsToken } = ctx.params
    const credentials = decode(credentialsToken)

    const oauth = new Oauth(credentials)
    const { authToken, email, friendlyName, username } = await oauth.getUserInfo()

    const user = { authToken, email, friendlyName, username }
    const token = encode(user)

    return {
      props: { token },
    }
  } catch (e) {
    throw new Error('Failed to fetch user info', { cause: e })
  }
}
