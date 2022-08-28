<center>
  <img src="assets/banner.png" />
</center>

[![Publish](https://github.com/nicholasodonnell/plex-restarter/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/nicholasodonnell/plex-restarter/actions/workflows/publish.yml)

**Plex Restarter** lets your friends restart your Plex Media Server remotely with a click of a button.

## Development

1. `cp -n docker-compose.override{.example,}.yml`
2. `cp -n .env{.example,}`
3. `docker-compose build --pull`
4. `docker-compose up`
5. Navigate to [localhost:3000](http://localhost:3000)

## Build

Pushes to the `main` brunch will be published to [Github Packages](https://github.com/nicholasodonnell/plex-restarter/pkgs/container/plex-restarter). The image can be built manually by running: `docker-compose -f docker-compose.yml build`.

## Usage

In order to execute a command on the host machine from the `plex-restarter` container, you can do 1 of 2 things:

#### Mount the host's Docker socket

> WARNING: Mounting the host's Docker socket will let you run any command on the host as the Docker user.

The simpliest way if you have Plex running as a Docker container is to use the Docker CLI installed on the `plex-restarter` container to run `docker restart ...`:

```console
RESTART_COMMAND="docker restart plex"
```

Alternatively, you can spawn a separate Docker container to send commands to the host a la a reverse shell (this is probably a really, really bad idea):

```console
RESTART_COMMAND="docker run -it --rm --privileged --pid host debian nsenter -t 1 -m -u -n -i bash -c \"service restart plex\""
```

#### Named Pipe

You can use a **named pipe** to execute commands on a host machine. The TL;DR is to create a file on the host + a script to loop and eval commands from that file. Simply mount that file into the container with a volume and write to it. Read more about named pipes [here](https://codeutility.org/how-to-run-shell-script-on-host-from-docker-container-stack-overflow/).

```console
RESTART_COMMAND="echo \"service restart plex\" > /path/to/named/pipe.txt"
```

### Example

```console
docker run --rm \
  --name plex-restarter \
  --privileged \
  -p 3000:3000 \
  -e SIGNING_SECRET=secret \
  -e PLEX_CLIENT_ID=example \
  -e PLEX_HOSTNAME=plex.example.com \
  -e RESTART_COMMAND="docker restart plex" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  ghcr.io/nicholasodonnell/plex-restarter:latest
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
