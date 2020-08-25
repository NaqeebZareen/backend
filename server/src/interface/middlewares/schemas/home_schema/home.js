const Joi = require('@hapi/joi')

const activityCount = Joi.object().keys({
    city: Joi.string().uppercase().optional().trim()
});

const releaseFlag = Joi.object().keys({
    appVersion: Joi.string().required().trim(),
    plateform: Joi.string().required().valid('IOS','Android')
});

module.exports ={
    activityCount,
    releaseFlag
}