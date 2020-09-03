const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const { interfaceUtils } = require('../../../../utils')
const validator = require('../../middlewares/validator')
const { activityCount, releaseFlag,url } = require('../../middlewares/schemas/home_schema')

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

router.post('/activity/count', validator(activityCount, 'body',{ todayDate: new Date().toDateString()}),
    async (req, res, next) => {
        serviceCalls.callHome.getActivityCount(req.body)
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

router.post('/release/latest', validator(releaseFlag, 'body'),
    async (req, res, next) => {
        let params = req.body;
        serviceCalls.callHome.getLatestReleaseFlag(params)
            .then(async (data) => {
                let parametricData = { Ok: { is_latest_version: data.Ok } };
                responseHelper.generateResponse(req, res, parametricData, null, 'Fetched Home Data Succcesfully', 200)
            })
            .catch(err => next(new ErrorHandler({
                status: 503,
                message: 'The service you are trying to reach is not available. Please try Again Later',
                detail: err
            })));
    });

router.post('/url/meta', validator(url, 'body'),
    async (req, res, next) => {
        serviceCalls.callHome.getUrlMetadata(req.body.url)
            .then(async (data) => {
                responseHelper.generateResponse(req, res, data, null, 'Fetched Home Data Succcesfully', 200)
            })
            .catch(err => next(new ErrorHandler({
                status: 503,
                message: 'The service you are trying to reach is not available. Please try Again Later',
                detail: err
            })));
    });


module.exports = router;