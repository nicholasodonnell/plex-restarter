import { useCallback, useEffect, useState } from 'react'

import Button from '../../components/button'
import Container from '../../components/container'
import { useLogin, useLogout } from '../../context/useAuth'
import classNames from '../../styles/login.module.css'

export default () => {
  const [ active, setActive ] = useState(false)
  const login = useLogin()
  const logout = useLogout()

  useEffect(logout, [ logout ])

  const handleLogin = useCallback(() => {
    setActive(true)
    login()
  }, [ login ])

  return (
    <Container>
      <Button
        active={active}
        className={classNames.button}
        disabled={active}
        onClick={handleLogin}
      >
          Log In with Plex
      </Button>
    </Container>
  )
}
