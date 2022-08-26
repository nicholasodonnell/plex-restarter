<center>
  <img src="assets/banner.png" />
</center>

[![Lint](https://github.com/nicholasodonnell/plex-restarter/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/nicholasodonnell/plex-restarter/actions/workflows/lint.yml)

**Plex Restarter** lets your friends restart your Plex Media Server remotely with a click of a button.

## Development

1. `cp -n docker-compose.override{.example,}.yml`
2. `cp -n .env{.example,}`
3. `docker-compose build --pull`
4. `docker-compose up`
5. Navigate to [localhost:3000](http://localhost:3000)

## Production

Production image can be built manually by running: `docker-compose -f docker-compose.yml build`.

## Usage

```console
docker run --rm \
  --name plex-restarter \
  -p 3000:3000 \
  -e HOST=https://example.com \
  -e SIGNING_SECRET=example \
  -e PLEX_CLIENT_ID=example \
  -e PLEX_HOSTNAME=plex.example.com \
  -e RESTART_COMMAND=service plexmediaserver restart \
  nicholasodonnell/plex-restarter:latest
```

## ENV Options

| Option             | Description                                                    | Default                 |
| ------------------ | -------------------------------------------------------------- | ----------------------- |
| `HOST`             | App host (including http(s))                                   | `http://localhost:3000` |
| `NEXT_PUBLIC_NAME` | App name                                                       | `Plex Restarter`        |
| `SIGNING_SECRET`   | JWT signing secret - recommended to generate a random string   | Required                |
| `PLEX_CLIENT_ID`   | String to ID the oauth client - recommended to generate a UUID | Required                |
| `PLEX_HOSTNAME`    | Hostname where Plex Server runs                                | Required                |
| `PLEX_PORT`        | Port number Plex Server is listening on                        | `32400`                 |
| `PLEX_USE_HTTPS`   | Connect to plex using a secure connection                      | `false`                 |
| `RESTART_COMMAND`  | Command that restarts the server                               | Required                |
