const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const { interfaceUtils } = require('../../../../utils')
const validator = require('../../middlewares/validator')
const { activityCount } = require('../../middlewares/schemas/home_schema')

const router = express.Router();


router.get('/home',
    async (req, res, next) => {
        serviceCalls.callHome.getcitiesAndInterestList()
            .then(async (data) => {
                responseHelper.generateResponse(req, res, data, null, 'Fetched Home Data Succcesfully', 200)
            })
            .catch(err => next(new ErrorHandler({
                status: 503,
                message: 'The service you are trying to reach is not available. Please try Again Later',
                detail: err
            })));
    });

router.post('/activity/count',
    async (req, res, next) => {
        serviceCalls.callHome.getActivityCount(req.body.city)
            .then(async (data) => {
                responseHelper.generateResponse(req, res, data, null, 'Fetched Home Data Succcesfully', 200)
            })
            .catch(err => {
                console.log(err); next(new ErrorHandler({
                    status: 503,
                    message: 'The service you are trying to reach is not available. Please try Again Later',
                    detail: err
                }))
            });
    });


module.exports = router;