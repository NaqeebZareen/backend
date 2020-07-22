const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')
const enablePagination = require('../../middlewares/enable_pagination')
const { interfaceUtils } = require('../../../../utils')
const validator = require('../../middlewares/validator')
const { newsListing } = require('../../middlewares/schemas/news_schema')


const router = express.Router();


router.post('/listing', validator(newsListing, 'body'), enablePagination,
    async (req, res, next) => {
        console.log('hello from server route=>>>', req.body);
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callNewsService('get_news_listing', params)
            .then(async (data) => {
                let userBookmarks = await serviceCalls.callUserService('get_bookmarks', params);
                interfaceUtils.injectUserBookmarks(data.Ok, userBookmarks.Ok);
                data = interfaceUtils.addPaginationToRespons(data.Ok, 'news_data', req.body.pageNo);
                responseHelper.generateResponse(req, res, data, null, 'Fetched news record Succcesfully', 200)
            })
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

// router.post('/search', validator()
//     , async (req, res, next) => {
//         let params = req.body;
//         params.userId = req.user;
//         serviceCalls.callUserService('update_user_profile', params)
//             .then(data => responseHelper.generateResponse(req, res, data, 'user_profile', 'Accepted for Updation', 202))
//             .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
//     });

router.get('/detail', async (req, res, next) => {
    let params = { newsId: req.query.news_id }
    params.userId = req.user;
    serviceCalls.callNewsService('get_detailed_news', params)
        .then(async data => {
            let userBookmarks = await serviceCalls.callUserService('get_bookmarks', params);
            interfaceUtils.injectUserBookmarksInDetailAndSimilar(data.Ok[Object.keys(data.Ok)[0]], userBookmarks.Ok)
            responseHelper.generateResponse(req, res, data, null, 'successfully fetched the interests of user', 200)
        })
        .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

// router.post('/bookmarks', async (req, res, next) => {
//     let params = req.body;
//     params.userId = req.user;
//     serviceCalls.callUserService('update_user_interests', params)
//         .then(data => responseHelper.generateResponse(req, res, data, 'user_interests', 'Accepted for Updation', 202))
//         .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

// });



module.exports = router;