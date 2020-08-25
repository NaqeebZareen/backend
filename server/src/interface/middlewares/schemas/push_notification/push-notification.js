const Joi = require('@hapi/joi')

const notificationId=Joi.object().keys({
    notificationId: Joi.string().required()
});

module.exports={
    notificationId
}