# Data provider adapters

**TL;DR**

Adapters contain the logic for dealing with data requests in this application.

Before the adapters there is an abstraction layer (like a "switchboard") that distributes the request to the proper data provider adapter.

Make sure to follow the environment instructions in the main [README](https://github.com/axelra82/rangelog/blob/master/README.md).

---

# Pocketbase

> Open Source backend | in 1 file

_Realtime database | Authentication | File storage | Admin dashboard_

[Pocketbase](https://pocketbase.io) is a lightweight portable infrastructure.

To use it with this PWA you can either set it up locally and serve it from there or online by using services like [Railway](https://railway.com).

For instructions on local hosting, simply follow the [Pocketbase docs](https://pocketbase.io/docs/).

For Railway, see instructions [here](https://github.com/axelra82/rangelog/blob/master/infrastructure/adapters/pocketbase/_setup/RAILWWAY.md).
