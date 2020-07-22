const Joi = require('@hapi/joi')

const newsListing=Joi.object().keys({
    text: Joi.string().uppercase().optional().trim(),
    publicationDate: Joi.date().optional(),
    cities:Joi.array().required(),
    pageNo:Joi.number().required(),
    recordsPerPage:Joi.number().required()
});

const validateNewsId=Joi.object().keys({
    newsId: Joi.number().integer().required()
});


module.exports={
    newsListing,
    validateNewsId
}