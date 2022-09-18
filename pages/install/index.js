import { complement, isNil } from 'ramda'
import { useState } from 'react'

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

const isNotNil = complement(isNil)

const transformHostname = hostname =>
  // strip protocol
  hostname.replace(/(^\w+:|^)\/\//, '')

export default ({ config }) => {
  const [ state, setState ] = useState(config)
  const { install, loading: installLoading } = useIntall(config)
  const { loading: loginLoading, login } = useLogin()

  const onChange = name => value =>
    setState(state => ({ ...state, [name]: value }))

  const handleInstall = () =>
    install(state).then(login)

  return (
    <div className={classNames.wrapper}>
      <H2>Installation</H2>
      <div className={classNames.inputGroup}>
        <Input
          className={classNames.plexHostname}
          disabled={isNotNil(config.PLEX_HOSTNAME)}
          label="Plex Hostname"
          name="PLEX_HOSTNAME"
          onChange={onChange('PLEX_HOSTNAME')}
          transform={transformHostname}
          value={state.PLEX_HOSTNAME}
        />
        <Input
          className={classNames.plexPort}
          disabled={isNotNil(config.PLEX_PORT)}
          label="Plex Port"
          type="number"
          name="PLEX_PORT"
          onChange={onChange('PLEX_PORT')}
          value={state.PLEX_PORT}

        />
        <Switch
          className={classNames.plexUseHttps}
          disabled={isNotNil(config.PLEX_USE_HTTPS)}
          label="Use SSL?"
          name="PLEX_USE_HTTPS"
          onChange={onChange('PLEX_USE_HTTPS')}
          value={state.PLEX_USE_HTTPS}
        />
      </div>
      <Button
        active={installLoading || loginLoading}
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

    // set admin auth token
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
          PLEX_HOSTNAME: config.PLEX_HOSTNAME ?? null,
          PLEX_PORT: config.PLEX_PORT ?? null,
          PLEX_USE_HTTPS: isNotNil(config.PLEX_USE_HTTPS)
            ? !!JSON.parse(config.PLEX_USE_HTTPS)
            : null,
        },
      },
    }
  } catch (e) {
    throw new Error('failed to initialize /install', { cause: e })
  }
}
