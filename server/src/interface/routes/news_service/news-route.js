const express = require('express')
const serviceCalls = require('../service-calls')
const ErrorHandler = require('../../../../error-handler')
const responseHelper = require('../../helpers/response-helper')

const router = express.Router();


router.post('/listing', async (req, res, next) => {
    let params = req.body;
    console.log(`iside the router`, req.body.pageNo);
    params.limit = params.recordsPerPage;
    params.offset = params.pageNo == 1 ? 0 : params.recordsPerPage * params.pageNo;
    delete params.recordsPerPage;
    delete params.pageNo;
    serviceCalls.callNewsService('get_news_listing', params)
        .then(async (data) => {
            let bakwaas = {}; let updatedData = {};
            params = { userId: req.user };
            let userBookmarks = await serviceCalls.callUserService('get_bookmarks', params);
            if (data.Ok && userBookmarks.Ok) {
                let bookmarkedNews = userBookmarks.Ok.news;
                if (bookmarkedNews.length > 0) {
                    data.Ok.map(obj => {
                        if (bookmarkedNews.includes(obj.id))
                            obj.is_bookmarked = true;
                        else
                            obj.is_bookmarked = false;
                    })
                }
            } else {
                console.log('Error Occured while Getting Bookmarks, User Bookmarks=>', userBookmarks, data);
                throw new Error('Error Occured while Getting Bookmarks')
            }
            updatedData.news_data = data.Ok;
            updatedData.no_of_records = data.Ok.length;
            console.log('body=>', req.body);
            updatedData.page_no = req.body.offset + 1;
            data.Ok = updatedData;
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
    let params = { newsId: req.query.news_id }//{ userId: req.user };
    serviceCalls.callNewsService('get_detailed_news', params)
        .then(async data => {
            console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n`, data)
            params = { userId: req.user };
            let userBookmarks = await serviceCalls.callUserService('get_bookmarks', params);
            console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n`, data, 'data from user service', userBookmarks.Ok.news);
            if (data.Ok.news_detail && userBookmarks.Ok) {
                console.log('inside if');
                let bookmarkedNews = userBookmarks.Ok.news;
                console.log('bookarks news=>', bookmarkedNews);
                if (bookmarkedNews.includes(data.Ok.id))
                    data.Ok.news_detail.is_bookmarked = true;
                else
                    data.Ok.news_detail.is_bookmarked = false;
            } else {
                console.log('Error Occured while Getting Bookmarks, User Bookmarks=>', userBookmarks, data);
                throw new Error('Error Occured while Getting Bookmarks')
            }
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