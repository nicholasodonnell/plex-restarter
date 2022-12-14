<center>
  <img src="assets/banner.png" />
</center>

[![Publish](https://github.com/nicholasodonnell/plex-restarter/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/nicholasodonnell/plex-restarter/actions/workflows/publish.yml)

**Plex Restarter** lets your friends restart your Plex Media Server remotely with a click of a button.

## Development

1. `cp -n docker-compose.override{.example,}.yml`
2. `docker-compose build --pull`
3. `docker-compose up`
4. Navigate to [localhost:3000](http://localhost:3000)

## Build

Pushes to the `main` brunch will be published to [Github Packages](https://github.com/nicholasodonnell/plex-restarter/pkgs/container/plex-restarter). The image can be built manually by running: `docker-compose -f docker-compose.yml build`.

## Usage

The first time you run this app you will be greeted with an installation screen to set some config values. Alternatively, you can provide these values as environmental variables.

| Option            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `PLEX_HOSTNAME`   | Hostname where Plex Server runs (without http(s))             |
| `PLEX_PORT`       | Port number Plex Server is listening on                       |
| `PLEX_USE_HTTPS`  | Connect to plex using a secure connection                     |

After installation you will be prompted to log into your Plex account. These credentials **must be the server admin**.

### Persistience

Upon successful installation a `./config/config.json` file will be created. Simply mount this directory into your container to persist the installation state:

```console
docker run ... -v ./config:/app/config
```

### Restart Command

You **must** set a `RESTART_COMMAND` environmental variable. This command is what restarts your Plex server.

In order to execute a command on the host machine from the `plex-restarter` container, you can do 1 of 2 things:

#### Mount the host's Docker socket

> WARNING: Mounting the host's Docker socket will let you run any command on the host as the Docker user.

The simpliest way if you have Plex running as a Docker container is to use the Docker CLI installed on the `plex-restarter` container to run `docker restart ...`:

```console
RESTART_COMMAND="docker restart plex"
```

Alternatively, you can spawn a separate Docker container to send commands to the host via a reverse shell (this is probably a really, really bad idea):

```console
RESTART_COMMAND="docker run -it --rm --privileged --pid host debian nsenter -t 1 -m -u -n -i bash -c \"service restart plex\""
```

#### Named Pipe

You can use a **named pipe** to execute commands on the host machine. The TL;DR is to create a file on the host + a script to loop and eval commands from that file. Simply mount that file into the container with a volume and write to it. Read more about named pipes [here](https://codeutility.org/how-to-run-shell-script-on-host-from-docker-container-stack-overflow/).

```console
RESTART_COMMAND="echo \"service restart plex\" > /path/to/named/pipe.txt"
```

## Example

```console
docker run --rm \
  --name plex-restarter \
  --privileged \
  -e "RESTART_COMMAND=docker restart plex" \
  -p 3000:3000 \
  -v $(PWD)/config:/app/config \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  ghcr.io/nicholasodonnell/plex-restarter:latest
```
