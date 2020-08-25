const express = require('express')
const passport = require('passport')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const enablePagination = require('../../middlewares/enable_pagination')
const { interfaceUtils } = require('../../../../utils')
const validator = require('../../middlewares/validator')
const { notificationId } = require('../../middlewares/schemas/push_notification')


const router = express.Router();


router.post('/activity',
    async (req, res, next) => {
        console.log('hello from server route=>>>', req.body);
        let params = req.body;
        serviceCalls.callPushNotificationService('create_activity_notification', params)
            .then(async (data) => {
                responseHelper.generateResponse(req, res, data, null, 'Fetched news record Succcesfully', 200)
            })
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.post('/news',
    async (req, res, next) => {
        console.log('hello from server route=>>>', req.body);
        let params = req.body;
        serviceCalls.callPushNotificationService('create_news_notification', params)
            .then(async (data) => {
                responseHelper.generateResponse(req, res, data, null, 'Fetched news record Succcesfully', 200)
            })
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.post('/activity/data', validator(notificationId, 'body'),
    passport.authenticate('jwt', { session: false })
    , async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callPushNotificationService('get_activity_notification_body', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched the interests of user', 200)
            })
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

router.post('/news/data', validator(notificationId, 'body'),
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callPushNotificationService('get_news_notification_body', params)
            .then(async data => {
                responseHelper.generateResponse(req, res, data, null, 'successfully fetched the interests of user', 200)
            })
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

    });

module.exports = router;