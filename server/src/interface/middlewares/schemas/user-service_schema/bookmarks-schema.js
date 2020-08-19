const Joi = require('@hapi/joi');

const newsId = Joi.object().keys({
    newsId: Joi.number().required()
});

const activityId = Joi.object().keys({
    activityId: Joi.number().required()
});
module.exports = {
    newsId,
    activityId
};