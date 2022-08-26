import Router from 'next/router'
import { useCallback, useState } from 'react'

import fetch from '../lib/fetch'

const execRequest = fetch('/exec', { method: 'POST' })

export default () => {
  const [ loading, setLoading ] = useState(false)

  const cb = useCallback(() =>
    Promise.resolve()
      .then(() => setLoading(true))
      .then(execRequest)
      .finally(() => setLoading(false))
  , [])

  return { cb, loading }
}
