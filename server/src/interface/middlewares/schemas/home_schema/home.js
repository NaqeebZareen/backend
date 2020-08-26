const Joi = require('@hapi/joi')

const activityCount = Joi.object().keys({
    city: Joi.string().uppercase().optional().trim()
});

const releaseFlag = Joi.object().keys({
    appVersion: Joi.string().required().trim(),
    plateform: Joi.string().required().valid('IOS', 'Android')
});

const url = Joi.object().keys({
    url: Joi.string().required().trim()
});

module.exports = {
    activityCount,
    releaseFlag, url
}