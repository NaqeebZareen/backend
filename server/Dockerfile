# buid code from node LTS verion 10-alpine
FROM node:12-alpine

#work Directory set to app.js also called the starting point of application
WORKDIR /app

#copy the package.json fro caching befor installing dependencies of the service
# COPY package*.json ./

#install dependencies
RUN npm install

#bundle app source
COPY . .

RUN ["chmod","+x","./scripts/wait-for-it.sh"]
# CMD ["/bin/sh" ,"./scripts/Entrypoint.sh"]
CMD [ "npm","start" ]