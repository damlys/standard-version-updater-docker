# `standard-version-updater-docker`

Installation

```shell
$ npm install --save-dev @damlys/standard-version-updater-docker
```

`.versionrc.json` file

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

`Dockerfile` file

```Dockerfile
FROM node
ARG VERSION="1.0.0"
ENV VERSION="1.0.0"
WORKDIR /app
```

`docker-compose.yml` file

```yaml
version: "3.8"
services:
  service0:
    image: image0:${VERSION:-1.0.0}
    build: ./dir1
  service1:
    image: image1:${VERSION:-1.0.0}
    build: ./dir2
```
