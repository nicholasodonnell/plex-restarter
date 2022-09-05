import fs from 'fs'
import getConfig from 'next/config'

const nextConfig = getConfig()
const CONFIG_FILE = `${nextConfig.serverRuntimeConfig.PROJECT_ROOT}/config.json`

export const KEYS = {
  PLEX_CLIENT_ID: 'PLEX_CLIENT_ID',
  PLEX_HOSTNAME: 'PLEX_HOSTNAME',
  PLEX_PORT: 'PLEX_PORT',
  PLEX_TOKEN: 'PLEX_TOKEN',
  PLEX_USE_HTTPS: 'PLEX_USE_HTTPS',
  RESTART_COMMAND: 'RESTART_COMMAND',
  SIGNING_SECRET: 'SIGNING_SECRET',
}

class Config {
  constructor () {
    if (!this.exists()) {
      this.create()
    }

    this.config = this.load()
  }

  create () {
    this.save({})
  }

  exists () {
    return fs.existsSync(CONFIG_FILE)
  }

  get (key) {
    return this.config[key]
  }

  has (key) {
    return this.config.hasOwnProperty(key)
  }

  load () {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_FILE))
    } catch {
      console.error('config file not found or invalid')

      process.exit(1)
    }
  }

  save (data = this.config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2))
  }

  set (key, value) {
    this.config[key] = value
    this.save()

    return true
  }
}

const config = new Config()

export default new Proxy(KEYS, {
  get (_, prop) {
    return config.get(prop)
  },

  set (_, prop, value) {
    return config.set(prop, value)
  },

  has (_, prop) {
    return config.has(prop)
  },
})
