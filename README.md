<img src="https://github.com/axelra82/rangelog/blob/master/public/logo.svg?raw=true" align="left" width="80">

# RANGE LOG

<div style="clear: both;"></div>

A portable and simple self-hosted app for gun owners to keep track of their weapons, licenses, range visits and other miscellaneous associated with gun ownership.

# Getting started

`git clone https://github.com/axelra82/rangelog.git`

Move into directory

`cd rangelog`

Install dependencies

`pnpm i`

Run development or build for production – see [Environment setup](#environment-setup)

`pnpm dev` or `pnmp build`

# Environment setup

Create the required environments.

## Development

`.env.development`

**Example**

```
VITE_RANGELOG_URL_PROTOCOL=http
VITE_RANGELOG_LOCALHOST=optional
VITE_RANGELOG_URL_PORT=9999
VITE_RANGELOG_URL_DOMAIN=your-domain
VITE_RANGELOG_URL_SUBDOMAIN=optional
VITE_RANGELOG_SERVICE_PROVIDER=pocketbase
```

## Production

`.env.production`

**Example**

```
VITE_RANGELOG_URL_PROTOCOL=https
VITE_RANGELOG_URL_DOMAIN=some-domain
VITE_RANGELOG_URL_SUBDOMAIN=optional
VITE_RANGELOG_SERVICE_PROVIDER=pocketbase
```

## Usage

Depending on your needs there are several ways you could use this app and any infrastructure you would want.

The `infrastructure` folder has service layers and adapters for Pocketbase. You can write any backend adapters you want here and set the new `VITE_RANGELOG_SERVICE_PROVIDER` to what that.

See [adapter readme](https://github.com/axelra82/rangelog/blob/master/infrastructure/adapters/README.md) for more details on using Pocketbase as your backend.
