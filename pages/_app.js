import '../styles/globals.css'

import Head from 'next/head'

import Container from '../components/container'
import ErrorBoundary from '../components/error-boundary'

export default ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Plex Restarter</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#E4EBF5" />
      <meta name="description" content="Restart Plex with a click of a button" />
      <meta property="og:title" content="Plex Restarter" />
    </Head>
    <Container>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Container>
  </>
)
