import { useEffect } from 'react'

import Button from '../../components/button'
import Container from '../../components/container'
import { useLogin, useLogout } from '../../context/useAuth'
import isInstalled from '../../lib/isInstalled'
import classNames from '../../styles/login.module.css'

export default () => {
  const { loading, login } = useLogin()
  const { logout } = useLogout()

  useEffect(() => {
    logout()
  }, [ logout ])

  return (
    <Container>
      <Button
        active={loading}
        className={classNames.button}
        disabled={loading}
        onClick={login}
      >
        Log In with Plex
      </Button>
    </Container>
  )
}

export const getServerSideProps = () => {
  try {
    if (!isInstalled()) {
      return {
        redirect: {
          destination: '/install',
          permanent: false,
        },
      }
    }

    return { props: {} }
  } catch (e) {
    throw new Error('failed to initialize /login', { cause: e })
  }
}
