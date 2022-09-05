import axios from 'axios'
import { prop } from 'ramda'

import { formatPath, isNilOrEmpty } from './utils'

axios.defaults.withCredentials = true

const handleApiError = e => {
  const { message } = e.response?.data || {}
  const status = e.response?.status

  const errorMessage = isNilOrEmpty(message)
    ? 'an unexpected error occurred'
    : message

  const error = new Error(errorMessage, { cause: e })
  error.status = status

  throw error
}

export default (path, props) => data =>
  axios({
    url: `/api/${formatPath(path)}`,
    data,
    ...props,
  })
    .then(prop('data'))
    .catch(handleApiError)
