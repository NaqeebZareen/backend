FROM node:10.0-alpine
WORKDIR /app
ADD . /app
RUN apk add --no-cache bash
RUN ["chmod","+x","./scripts/wait-for-it.sh"]
CMD ["/bin/sh" ,"./scripts/Entrypoint.sh"]