const Joi = require('@hapi/joi')

const subscriber = Joi.object().keys({
    email: Joi.string().email().lowercase().required().trim(),
    city: Joi.string().required()
});

const unsubscriber = Joi.object().keys({
    email: Joi.string().email().lowercase().required().trim(),
});

const newSchedule = Joi.object().keys({
    // city: Joi.string().required().valid("All", "Los Angeles", 'San Francisco', 'Islamabad', 'Lahore', 'New York'),
    newsletterId: Joi.number().required()
});


module.exports = {
    subscriber,
    unsubscriber,
    newSchedule
}