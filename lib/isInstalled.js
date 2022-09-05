import config, { KEYS } from './config'

export default () =>
  KEYS.PLEX_HOSTNAME in config &&
  KEYS.PLEX_PORT in config &&
  KEYS.PLEX_TOKEN in config &&
  KEYS.PLEX_USE_HTTPS in config &&
  KEYS.RESTART_COMMAND in config &&
  KEYS.SIGNING_SECRET in config
