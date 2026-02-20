# Railway

> Ship software peacefully

**NOTE!** You can use the `Free` tier ("forever free") for hosting a simple Docker container with a volume mounted.

See [pricing](https://railway.com/pricing) for other options.

## Getting started

Create your free account on [railway.com](https://railway.com).

- Select `New`, i.e. create a new project.

- Once the project is created click `Create` to create you first service in this project.

- Select `Docker Image`.

- Provide the Docker image `ghcr.io/muchobien/pocketbase:latest`.

- Once the Docker container is running you will also need to attach a volume to it.

- Click `Create` and select volume.

  - Set `/pb_data` as mount path.

  - Assign the volume to your service.

You are now done with the initial setup. Continue with deploying the app (see [ instructions]() for building app) to your service and finally creating initial super user for you Pocketbase admin.

## Building app

- Build.

`pnpm build`

- Compress.

`tar -czf dist.tar.gz -C /PATH/TO/APP/DIST/FOLDER dist`

- Upload

Share your file from a publicly available source.

**NOTE!** The file must be able to be downloaded without "download pages", i.e. a URL that points to the actual file, not a "download page".

You can test if your file can be programmatically fetched with `wget "https://public-url-for-dist.tar.gz" -O dist.tar.gz` or `curl "https://public-url-for-dist.tar.gz" -o dist.tar.gz`. If the resulting file can not be unpacked you are most likely dealing with a "download page".

If you don't have access to any publicly available buckets you can use a free service like GitHub and then download it from there.

Example

`wget --header="Accept: application/vnd.github.v3.raw" https://api.github.com/repos/GITHUB_USERNAME/REPO_NAME/contents/PATH/TO/FILE.NAME -O dist.tar.gz`

`curl -H "Accept: application/vnd.github.v3.raw" https://api.github.com/repos/GITHUB_USERNAME/REPO_NAME/contents/PATH/TO/FILE.NAME -o dist.tar.gz`

## Uploading app (Railway CLI)

**NOTE!** Make sure you have created your service and mounted a volume as per [Getting started instructions](#getting-started) before you continue.

Install the Railway CLI. See [documentation](https://docs.railway.com/cli) for details and instruction.

macOS example:

`brew install railway`

- Login to Railway in shell.

`railway login --browserless`

- Link to your railway project (follow onscreen instructions).

`railway link`

- Run Docker service command line prompts.

`railway ssh`

- Create the required folder for serving the app publicly.

`mkdir -p /pb_data/public`

- Symlink the `/pb_data/public` folder to `/pb_public`.

`ln -sf /pb_data/public /pb_public`

_Since you are limited to one mount path in the Docker container volume and you need both `/pb_data` (for persisting database) and `/pb_public` (for hosing the app) you have to create the `public` folder in the only available persistent state, i.e. `pb_data` and then link that to the `/pb_public` folder. This makes the `public` folder available to the Pocketbase service when looking for public content hosting._

- Change working directory to `/pb_public`.

`cd /pb_public`

- Fetch the `dist.tar.gz` file to your service volume.

`wget "https://public-url-for-dist.tar.gz" -O dist.tar.gz`

- Unpack the `dist` file.

`tar -xzf dist.tar.gz --strip-components=1 && rm dist.tar.gz`

- Create/Update initial Pocketbase superuser.

```
/usr/local/bin/pocketbase superuser upsert admin@example.com yourStrongPassw
ord --dir=/pb_data
```
