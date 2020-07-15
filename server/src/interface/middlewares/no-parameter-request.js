const responseHelper = require('../helpers/response-helper')

module.exports = (req, res, next) => {
    console.log('in rv')
    if (Object.keys(req.body).length === 0 && Object.keys(req.query).length === 0)
        next()
    else
        return responseHelper.validationError(res, { message: `This API don't accept any parameters or body` })
}