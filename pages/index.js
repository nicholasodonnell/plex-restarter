import Button from '../components/button'
import { useLogout } from '../context/useAuth'
import useRestart from '../context/useRestart'
import cookies from '../lib/cookies'
import isInstalled from '../lib/isInstalled'
import { decode } from '../lib/jwt'
import { API } from '../lib/plex'
import classNames from '../styles/home.module.css'

export default () => {
  const { logout } = useLogout({ reload: true })
  const { loading, restart } = useRestart()

  return (
    <>
      <div className={classNames.actions}>
        <Button
          className={classNames.actionButton}
          onClick={logout}
          rounded
        >
          <svg className={classNames.actionButton__icon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
      <Button
        active={loading}
        className={classNames.restartButton}
        disabled={loading}
        onClick={restart}
        rounded
        spin
      >
        <svg className={classNames.restartButton__icon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </Button>
    </>
  )
}

export const getServerSideProps = async ctx => {
  try {
    if (!isInstalled()) {
      return {
        redirect: {
          destination: '/install',
          permanent: false,
        },
      }
    }

    const { getSessionTokenCookie } = cookies(ctx.req.headers.cookie)
    const sessionToken = getSessionTokenCookie()

    const user = decode(sessionToken)
    const plexApi = new API()
    const isAuthed = await plexApi.isAuthed(user)

    if (!isAuthed) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      }
    }

    console.log('authed', { email: user.email })

    return { props: {} }
  } catch (e) {
    throw new Error('failed to initialize /', { cause: e })
  }
}
