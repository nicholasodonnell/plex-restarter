import config, { PROPS } from './config'

export default () =>
  PROPS.PLEX_HOSTNAME in config &&
  PROPS.PLEX_PORT in config &&
  PROPS.PLEX_TOKEN in config &&
  PROPS.PLEX_USE_HTTPS in config &&
  PROPS.SIGNING_SECRET in config
