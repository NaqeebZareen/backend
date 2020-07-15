const logger = require('../../logger')

const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
        .replace('-', '')
        .replace('_', '')
);

module.exports = (options) => {
    return (req, res, next) => {
        // Implement the middleware function based on the options object
        logger.info('Request Received at Server=> ',
            {
                route: req.url,
                authorization_token: req.header('authorization'),
                body: req.body,
                parameters: req.query
            });
        let convertedObject = JSON.stringify(req.body);
        let a = Object.keys(req.body);
        a.map(key => convertedObject = convertedObject.replace(`${key}`, snakeToCamel(key)));
        req.body = JSON.parse(convertedObject);
        next()
    }
}