import { useCallback, useState } from 'react'

import Button from '../../components/button'
import { Input, Switch } from '../../components/input'
import { H2 } from '../../components/text'
import { useLogin } from '../../context/useAuth'
import useIntall from '../../context/useInstall'
import config from '../../lib/config'
import cookies from '../../lib/cookies'
import isInstalled from '../../lib/isInstalled'
import { decode } from '../../lib/jwt'
import classNames from '../../styles/install.module.css'

export default ({ config }) => {
  const [ state, setState ] = useState(config)
  const { install, loading: installLoading } = useIntall(config)
  const { loading: loginLoading, login } = useLogin()

  const onChange = useCallback(e => {
    const { name, value } = e.target

    setState(state => ({ ...state, [name]: value }))
  }, [])

  const handleInstall = useCallback(() =>
    install(state).then(login)
  , [ install, login, state ])

  return (
    <div className={classNames.wrapper}>
      <H2>Installation</H2>
      <div className={classNames.plexInputGroup}>
        <Input
          className={classNames.plexInputGroup__2}
          label="Plex Hostname"
          name="PLEX_HOSTNAME"
          onChange={onChange}
          value={state.PLEX_HOSTNAME}
        />
        <Input
          className={classNames.plexInputGroup__2}
          label="Plex Port"
          type="number"
          name="PLEX_PORT"
          onChange={onChange}
          value={state.PLEX_PORT}

        />
        <Switch
          className={classNames.plexInputGroup__1}
          label="Use SSL?"
          name="PLEX_USE_HTTPS"
          onChange={onChange}
          value={state.PLEX_USE_HTTPS}
        />
      </div>
      <Input
        className={classNames.restartCommand}
        label="Restart Command"
        name="RESTART_COMMAND"
        onChange={onChange}
        value={state.RESTART_COMMAND}
      />
      <Button
        active={installLoading || loginLoading}
        className={classNames.loginButton}
        onClick={handleInstall}
        disabled={installLoading || loginLoading}
      >
        Log In with Plex
      </Button>
    </div>
  )
}

export const getServerSideProps = ctx => {
  try {
    const { getSessionTokenCookie } = cookies(ctx.req.headers.cookie)
    const sessionToken = getSessionTokenCookie()

    const user = decode(sessionToken)

    // set admin auth token to do friend lookups
    if (!config.PLEX_TOKEN && user?.authToken) {
      config.PLEX_TOKEN = user.authToken
    }

    if (isInstalled()) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return {
      props: {
        config: {
          PLEX_HOSTNAME: config.PLEX_HOSTNAME || null,
          PLEX_PORT: config.PLEX_PORT || null,
          PLEX_USE_HTTPS: config.PLEX_USE_HTTPS?.toString() || 'false',
          RESTART_COMMAND: config.RESTART_COMMAND || null,
        },
      },
    }
  } catch (e) {
    throw new Error('failed to initialize /install', { cause: e })
  }
}
