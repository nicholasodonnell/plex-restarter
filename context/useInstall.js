import { useCallback, useState } from 'react'

import fetch from '../lib/fetch'

const installRequest = fetch('/install', { method: 'POST' })

export default () => {
  const [ loading, setLoading ] = useState(false)

  const install = useCallback(data =>
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => installRequest(data))
      .finally(() => setLoading(false))
  , [])

  return { install, loading }
}
