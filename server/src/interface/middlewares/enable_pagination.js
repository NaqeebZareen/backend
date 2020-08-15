const logger = require('../../logger')

module.exports = (req, res, next) => {
    // Implement the middleware function based on the options object
    logger.info('Request to Enable Pagination => ',
        {
            route: req.url,
            body: req.body
        });
    req.body.limit = req.body.recordsPerPage;
    req.body.offset = req.body.pageNo == 1 ? 0 : req.body.recordsPerPage * (req.body.pageNo - 1);
    delete req.body.recordsPerPage;
    next()
}