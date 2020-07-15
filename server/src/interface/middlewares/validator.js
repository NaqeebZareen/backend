const Joi = require('@hapi/joi');
const responseHelper = require('../helpers/response-helper');

const validator = (schema, requestedObject) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[requestedObject], { abortEarly: false });
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      return responseHelper.validationError(res, details);
    }
  }
}

module.exports = validator;