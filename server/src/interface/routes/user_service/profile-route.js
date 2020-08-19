const express = require('express');
const serviceCalls = require('../service-calls');
const responseHelper = require('../../helpers/response-helper');
const ErrorHandler = require('../../../../error-handler');
const validator = require('../../middlewares/validator');
const { profileSchemas } = require('../../middlewares/schemas/user-service_schema');
const noParameterRequest = require('../../middlewares/no-parameter-request');

const router = express.Router();


/* GET users listing. */
router.get('/profile'
  , async (req, res, next) => {
    let params = { userId: req.user };
    serviceCalls.callUserService('get_user_profile', params)
      .then((data) =>
        responseHelper.generateResponse(req, res, data, 'user_profile', 'Fetched user record Succcesfully', 200))
      .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
  });

router.put('/profile/update', validator(profileSchemas.update,'body')
  , async (req, res, next) => {
    let params = req.body;
    params.userId = req.user;
    serviceCalls.callUserService('update_user_profile', params)
      .then(data => responseHelper.generateResponse(req, res, data, 'user_profile', 'Accepted for Updation', 202))
      .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
  });

router.get('/interests', async (req, res, next) => {
  let params = { userId: req.user };
  serviceCalls.callUserService('get_user_interests', params)
    .then(data => responseHelper.generateResponse(req, res, data, 'user_interests', 'successfully fetched the interests of user', 200))
    .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

router.put('/interests/update', async (req, res, next) => {
  let params = req.body;
  params.userId = req.user;
  serviceCalls.callUserService('update_user_interests', params)
    .then(data => responseHelper.generateResponse(req, res, data, 'user_interests', 'Accepted for Updation', 202))
    .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

router.post('/interests', async (req, res, next) => {
  let params = req.body;
  params.userId = req.user;
  serviceCalls.callUserService('add_user_interests', params)
    .then(data => responseHelper.generateResponse(req, res, data, 'user_interests', 'Successfully added the interests of users'))
    .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));

});

router.delete('/interests/remove', async (req, res, next) => {
  let params = { userId: req.user };
  serviceCalls.callUserService('remove_user_interests', params)
    .then(data => responseHelper.generateResponse(req, res, data, 'user_interests', 'Succesfully deleted the User Interests.'))
    .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
});

module.exports = router;
