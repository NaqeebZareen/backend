const Joi = require('@hapi/joi')

const activityCount = Joi.object().keys({
    city: Joi.string().uppercase().optional().trim()
});

module.exports ={
    activityCount
}