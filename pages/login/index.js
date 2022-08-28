import { useEffect } from 'react'

import Button from '../../components/button'
import Container from '../../components/container'
import { useLogin, useLogout } from '../../context/useAuth'
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
