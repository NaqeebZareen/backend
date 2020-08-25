const bunyan = require('bunyan')

var logger = bunyan.createLogger({
    name: 'User-service',
    stream: process.stdout,
    level: 'info',
    serializers: { err: bunyan.stdSerializers.err }
});

module.exports = {
    logger
}