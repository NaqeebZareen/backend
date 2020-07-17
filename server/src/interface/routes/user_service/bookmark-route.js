const express = require('express');
const serviceCalls = require('../service-calls');
const responseHelper = require('../../helpers/response-helper');
const ErrorHandler = require('../../../../error-handler');
const validator = require('../../middlewares/validator');
const { profileSchemas } = require('../../middlewares/schemas/user-service_schema');
const noParameterRequest = require('../../middlewares/no-parameter-request');

const router = express.Router();



router.get('/list', async (req, res, next) => {
    let params = { userId: req.user };
    serviceCalls.callUserService('get_bookmarks', params)
        .then(async data => {
            let newsData = { Ok: [] };
            if (data.Ok) {
                params = { newsIdArray: data.Ok.news };
                newsData = await serviceCalls.callNewsService('get_news_by_id_array', params);
                console.log('news Data=>', newsData);
                newsData.Ok.map(obj => {
                    obj.isBookmarked = true;
                });
            }
            responseHelper.generateResponse(req, res, newsData, 'user_bookmarks', 'successfully fetched the Bookmarks of user', 200)
        })
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

router.delete('/news/remove', async (req, res, next) => {
    let params = req.body;
    params.userId = req.user;
    params.newsId = parseInt(params.newsId);
    serviceCalls.callUserService('delete_news_from_bookmarks', params)
        .then(data => responseHelper.generateResponse(req, res, data, 'news_bookmarks', 'Successfully removed the bookmarks of users'))
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

router.post('/news/add', async (req, res, next) => {
    let params = req.body;
    params.userId = req.user;
    params.newsId = parseInt(params.newsId);
    serviceCalls.callUserService('add_news_to_bookmarks', params)
        .then(data => responseHelper.generateResponse(req, res, data, 'news_bookmarks', 'Successfully added the bookmarks of users'))
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

router.delete('/activity/remove', async (req, res, next) => {
    let params = req.body;
    params.userId = req.user;
    params.activityId = parseInt(params.activityId);
    serviceCalls.callUserService('delete_activity_from_bookmarks', params)
        .then(data => responseHelper.generateResponse(req, res, data, 'news_bookmarks', 'Successfully removed the bookmarks of users'))
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

router.post('/activity/add', async (req, res, next) => {
    let params = req.body;
    params.userId = req.user;
    params.activityId = parseInt(params.activityId);
    serviceCalls.callUserService('add_activity_to_bookmarks', params)
        .then(data => responseHelper.generateResponse(req, res, data, 'news_bookmarks', 'Successfully added the bookmarks of users'))
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

module.exports = router;
