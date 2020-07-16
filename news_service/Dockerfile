FROM node:10.0-alpine
WORKDIR /app
ADD . /app

# Install production dependencies.
RUN npm install

RUN apk update && apk upgrade && apk add bash
RUN ["chmod","+x","./scripts/wait-for-it.sh"]
CMD ["/bin/sh" ,"./scripts/Entrypoint.sh"]