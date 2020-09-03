const Joi = require('@hapi/joi')

const activityCount = Joi.object().keys({
    city: Joi.string().uppercase().optional().trim(),
    date:Joi.date().iso().min(Joi.ref('$todayDate')).optional(),
    dateRange: Joi.array().min(2).sort({ order: 'ascending' }).items(Joi.date().iso().required())
}).nand('date','dateRange');

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