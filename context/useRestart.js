import { useCallback, useState } from 'react'

import fetch from '../lib/fetch'

const restartRequest = fetch('/restart', { method: 'POST' })

export default () => {
  const [ loading, setLoading ] = useState(false)

  const restart = useCallback(() =>
    Promise.resolve()
      .then(() => setLoading(true))
      .then(restartRequest)
      .finally(() => setLoading(false))
  , [])

  return { loading, restart }
}
