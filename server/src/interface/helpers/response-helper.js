const logger = require('../../logger')

module.exports = {
    serverError: (statusCode, message, detail) => {
        return statusCode == 404 ? {
            status_code: 404,
            error: {
                message: 'The Requested Resource Not Found',
                detail: {}
            }
        } : {
                status_code: statusCode,
                error: {
                    message: message || 'Something Bad Happen while excecuting your Request',
                    detail: detail || {}
                }

            }
    },
    validationError: (res, detail) => {
        res.status(400).json({
            status_code: 400,
            error: {
                message: 'Validation Failed',
                detail
            }
        });
    },
    customServerError: (statusCode, message, detail) => {
        return {
            status_code: statusCode || 500,
            error: {
                message, detail
            }
        }
    },
    success: (statusCode, message, data) => {
        return {
            status_code: statusCode || 200,
            response: {
                message, data
            }
        }
    },
    generateResponse: (req, res, data, dataProperty, message, statusCode) => {
        logger.info('Response Send from Server=> ', { route: req.url, response_message: message });
        if (data.Error) {
            return res.status(500).json({
                status_code: 500,
                error: {
                    message: 'The server can\'t process you request for a moment',
                    detail: {
                        hint: `The request cannot be processed check the attributes value and names and try again`,
                        errors: data.Error
                    }
                }
            });
        }
        let responseData = {};
        if (dataProperty)
            responseData[dataProperty] = data.Ok;
        else responseData = data.Ok;
        return (data.Ok) ? res.status(statusCode || 200).json({
            status_code: statusCode || 200,
            response: {
                message: message || null, data: responseData
            }
        }) : res.status(204).json({
            status_code: 204,
            response: {
                message: message || null, data: data.Ok
            }
        });
    }
}