export default headers => {
  const host = headers.host
  const isHttps = headers['x-forwarded-proto'] === 'https' || headers.referer?.includes('https')

  return `http${isHttps ? 's' : ''}://${host}`
}
