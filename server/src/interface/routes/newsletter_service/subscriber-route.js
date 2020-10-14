const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const validator = require('../../middlewares/validator')
const { subscriber, unsubscriber } = require('../../middlewares/schemas/newsletter_schema')


const router = express.Router();


router.post('/subscribe', validator(subscriber, 'body'),
    async (req, res, next) => {
        console.log('hello from server route=>>>', req.body);
        let params = req.body;
        serviceCalls.callNewsletterService('add_new_subscriber', params)
            .then(async (data) => {
                responseHelper.generateResponse(req, res, data, null, 'Added new subscriber Succcesfully', 200)
            })
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.delete('/unsubscribe', validator(unsubscriber, 'body'),
    async (req, res, next) => {
        console.log('hello from server route=>>>', req.body);
        let params = req.body;
        serviceCalls.callNewsletterService('remove_subscriber', params)
            .then(async (data) => {
                responseHelper.generateResponse(req, res, data, null, 'Removed subscriber Succcesfully', 200)
            })
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.get('/list',
    async (req, res, next) => {
        console.log('hello from server route=>>>', req.body);
        let params = req.body;
        serviceCalls.callNewsletterService('get_subscribers', params)
            .then(async (data) => {
                console.log(data)
                responseHelper.generateResponse(req, res, data, 'subscribers', 'Fetched subscribers List Succcesfully', 200)
            })
            .catch(() => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });



module.exports = router;