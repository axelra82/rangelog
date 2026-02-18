<img src="https://github.com/axelra82/rangelog/blob/master/public/logo.svg?raw=true" align="left" width="80">

# RANGE LOG

<div style="clear: both;"></div>

A portable and simple self-hosted app for gun owners to keep track of their weapons, licenses, range visits and other miscellaneous associated with gun ownership.

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
