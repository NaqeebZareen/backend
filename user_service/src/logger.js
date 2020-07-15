const bunyan = require('bunyan')

module.exports = bunyan.createLogger({
    name: 'User-authentication-service',
    stream: process.stdout,
    level: 'info',
    serializers: { err: bunyan.stdSerializers.err }
});