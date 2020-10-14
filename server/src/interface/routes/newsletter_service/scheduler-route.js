const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const validator = require('../../middlewares/validator')
const { newSchedule } = require('../../middlewares/schemas/newsletter_schema');

const router = express.Router();


router.post('/schedule',validator(newSchedule, 'body'),
    async (req, res, next) => {
        let params = req.body;
        serviceCalls.callNewsletterService('schedule_newsletter', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'Succcesfully upvoted News', 200))
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

module.exports = router;