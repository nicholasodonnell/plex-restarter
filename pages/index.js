import { useCallback, useState } from 'react'

import Button from '../components/button'
import useExec from '../context/useExec'
import cookies from '../lib/cookies'
import { decode } from '../lib/jwt'
import { API } from '../lib/plex'
import classNames from '../styles/home.module.css'

export default () => {
  const { cb, loading } = useExec()

  return (
    <Button
      active={loading}
      className={classNames.button}
      disabled={loading}
      onClick={cb}
      rounded
      spin
    >
      <svg className={classNames.button__icon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
      </svg>
    </Button>
  )
}

export const getServerSideProps = async ctx => {
  try {
    const { getSessionTokenCookie } = cookies(ctx.req.headers.cookie)
    const sessionToken = getSessionTokenCookie()

    const user = decode(sessionToken)
    const plexApi = new API(user?.authToken)
    const isAuthed = await plexApi.isAuthed()

    if (!isAuthed) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      }
    }

    return { props: { user } }
  } catch (e) {
    throw new Error('Failed to verify auth status', { cause: e })
  }
}
