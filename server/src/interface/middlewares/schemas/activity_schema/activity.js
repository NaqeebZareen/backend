const Joi = require('@hapi/joi')

// const activitySearchWithSingleDate = Joi.object().keys({
//     text: Joi.string().uppercase().optional().trim(),
//     date: Joi.date().iso().optional(),
//     catagory: Joi.array().items(Joi.string()).optional(),
//     cities: Joi.array().items(Joi.string()).required(),
//     pageNo: Joi.number().required(),
//     recordsPerPage: Joi.number().required()
// });

const activitySearch = Joi.object().keys({
    text: Joi.string().uppercase().optional().trim(),
    date:Joi.date().iso().min(Joi.ref('$todayDate')).optional(),
    dateRange: Joi.array().min(2).sort({ order: 'ascending' }).items(Joi.date().iso().required()),
    categories: Joi.array().max(15).items(Joi.string().required()).optional(),
    city: Joi.string().required(),
    pageNo: Joi.number().required(),
    recordsPerPage: Joi.number().required()
}).nand('date','dateRange')

// const activitySearch = Joi.alternatives(activitySearchWithSingleDate,activitySearchWithDateRange);

const activityListing = Joi.object().keys({
    categories: Joi.array().min(1).max(15).items(Joi.string().required()).optional(),
    city: Joi.string().required(),
    pageNo: Joi.number().required(),
    recordsPerPage: Joi.number().required()
});

const latestActivities = Joi.object().keys({
    city: Joi.string().required()
});

const activityDetail = Joi.object().keys({
    activityId: Joi.number().required()
});


module.exports = {
    activityListing,
    activitySearch,
    activityDetail,
    latestActivities
}