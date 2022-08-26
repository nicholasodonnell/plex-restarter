import { either, isEmpty, isNil } from 'ramda'

export const daysToSeconds = days =>
  days * 24 * 60 * 60

export const formatPath = path =>
  path.replace(/^\/+/, '')

export const isNilOrEmpty =
  either(isNil, isEmpty)
