const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const validator = require('../../middlewares/validator')
const { validateNewsId } = require('../../middlewares/schemas/news_schema')

const router = express.Router();


router.patch('/up', validator(validateNewsId, 'body'),
    async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callNewsService('up_vote_news', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'Succcesfully upvoted News', 200))
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.patch('/down', validator(validateNewsId, 'body'),
    async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callNewsService('down_vote_news', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'successfully fetched the interests of user', 200))
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.patch('/unsure', validator(validateNewsId, 'body'),
    async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callNewsService('unsure_vote_news', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'successfully fetched the interests of user', 200))
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.delete('/remove/up', validator(validateNewsId, 'body'),
    async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callNewsService('remove_up_vote_news', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'Succcesfully upvoted News', 200))
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.delete('/remove/down', validator(validateNewsId, 'body'),
    async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callNewsService('remove_down_vote_news', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'successfully fetched the interests of user', 200))
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.delete('/remove/unsure', validator(validateNewsId, 'body'),
    async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callNewsService('remove_unsure_vote_news', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'successfully fetched the interests of user', 200))
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

module.exports = router;