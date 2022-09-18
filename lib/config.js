import fs from 'fs'
import getConfig from 'next/config'
import { complement, isNil } from 'ramda'

const nextConfig = getConfig()
const CONFIG_FILE = `${nextConfig.serverRuntimeConfig.PROJECT_ROOT}/config/config.json`

const isNotNil = complement(isNil)

export const PROPS = {
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

  get (prop) {
    return this.config[prop]
  }

  has (prop) {
    return this.config.hasOwnProperty(prop)
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

  set (prop, value) {
    this.config[prop] = value
    this.save()

    return true
  }
}

const config = new Config()

export default new Proxy(PROPS, {
  get (_, prop) {
    return process.env[prop] || config.get(prop)
  },

  set (_, prop, value) {
    return isNil(process.env[prop])
      ? config.set(prop, value)
      : true
  },

  has (_, prop) {
    return isNotNil(process.env[prop]) || config.has(prop)
  },
})
