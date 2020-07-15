const usersRouter = require('./profile-route')
const userAuthentication = require('./authentication-route')
const bookmarkRouter = require('./bookmark-route')


module.exports = {
    usersRouter,
    authenticationRouter: userAuthentication,
    bookmarkRouter
}