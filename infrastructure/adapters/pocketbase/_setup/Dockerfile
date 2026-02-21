FROM alpine:latest

# Install dependencies
RUN apk add --no-cache \
	wget \
	unzip

# Download and install PocketBase
# Check https://github.com/pocketbase/pocketbase/releases for latest version; match your OS and architecture.

ARG PB_VERSION=0.36.2

ARG OS=linux

# If you are unsure about your architecture run, in Linux you can run `uname -m`
# x86_64 -> use amd64
# aarch64 or arm64 -> use arm64
# armv7l -> use armv7
ARG ARCHITECTURE=amd64

RUN FILENAME=pocketbase_${PB_VERSION}_${OS}_${ARCHITECTURE}.zip && \
	wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${FILENAME} && \
	unzip ${FILENAME} -d /pb/ && \
	rm ${FILENAME} && \
	chmod +x /pb/pocketbase
# Create directories
RUN mkdir -p /pb/pb_data /pb/pb_public /pb/pb_hooks /pb/pb_migration

WORKDIR /pb

# Expose PocketBase port
EXPOSE 8090

# Start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
