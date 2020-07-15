const Joi = require('@hapi/joi');

const registrationToken = Joi.object().keys({
    securityCode: Joi.string()
        .length(4)
        .pattern(/^[0-9]+$/)
        .required()
        .trim()
        .messages({
            "string.empty": `"security_code" cannot be an empty field`,
            "string.length": `"security_code" should have a length of {#limit}`,
            "string.pattern.base": `"security_code" should be an integar`,
            "any.required": `"security_code" is a required`
        }),
    email: Joi.string().email().lowercase().required().trim(),
    deviceId: Joi.string().lowercase().optional().trim(),
    city: Joi.string().lowercase().optional().trim(),
    country: Joi.string().lowercase().optional().trim(),
    deviceType: Joi.string().lowercase().optional().trim()
});

const register = Joi.object().keys({
    email: Joi.string().email().required().lowercase().trim()
});

const update = Joi.object().keys({
    firstName: Joi.string().lowercase().optional().trim(),
    lastName: Joi.string().lowercase().optional().trim(),
    picture: Joi.string().lowercase().optional().trim(),
    gender: Joi.string().lowercase().optional().trim(),
    birthday: Joi.string().lowercase().optional().trim(),
    city: Joi.string().lowercase().optional().trim(),
    country: Joi.string().lowercase().optional().trim(),
});

module.exports = {
    registrationToken,
    register,
    update
};