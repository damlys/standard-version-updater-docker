# `standard-version-updater-docker`

The
[conventional-changelog/standard-version](https://github.com/conventional-changelog/standard-version)
updater for Dockerfile and Docker Compose files.

## Installation

```shell
$ npm install --save-dev @damlys/standard-version-updater-docker
```

## Configuration

Just use following updaters within
`.versionrc.json` config file.

```json
{
  "bumpFiles": [
    {
      "filename": "Dockerfile",
      "updater": "node_modules/@damlys/standard-version-updater-docker/dist/dockerfile.js"
    },
    {
      "filename": "docker-compose.yml",
      "updater": "node_modules/@damlys/standard-version-updater-docker/dist/docker-compose.js"
    }
  ]
}
```

## Examples

`Dockerfile` file might look like that:

```Dockerfile
FROM node
ARG VERSION="1.0.0"
ENV VERSION="1.0.0"
WORKDIR /app
```

The `dockerfile.js` updater looks for
a ` VERSION="<semver>"` pattern and updates it.

~

`docker-compose.yml` file might look like that:

```yaml
version: "3.8"
services:
  service0:
    image: image0:${VERSION:-1.0.0}
    build: ./dir0
  service1:
    image: image1:${VERSION:-1.0.0}
    build: ./dir1
```

The `docker-compose.js` updater looks for
a `${VERSION:-<semver>}` pattern and updates it.
