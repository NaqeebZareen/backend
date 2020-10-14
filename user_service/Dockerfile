# FROM key work is used to get the OS locally if available get and build it or otherwiase it'll download from the DockerHub
FROM node:10.0-alpine
WORKDIR /app
# ADD key world add/Copy the source code into image f
ADD . /app
# Install production dependencies.
RUN npm install

RUN apk update && apk upgrade && apk add bash
RUN ["chmod","+x","./scripts/wait-for-it.sh"]
CMD ["/bin/sh" ,"./scripts/Entrypoint.sh"]

