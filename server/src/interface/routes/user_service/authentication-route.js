//import middleware of passport to use authentication of user by passport strategy
const validator = require('../../middlewares/validator');
const { authenticationSchemas } = require('../../middlewares/schemas/user-service_schema');

//Others imports 
const express = require('express')
const passport = require('passport')
const serviceCalls = require('../service-calls')
const responseHelper = require('../../helpers/response-helper');
const ErrorHandler = require('../../../../error-handler');
require('../../middlewares/auth/token-authentication')(passport)

//Initialize Router
const router = express.Router();

router.post('/user-token', validator(authenticationSchemas.userToken, 'body')
    , async (req, res, next) => {
        let params = req.body;
        serviceCalls.callUserService('get_user_token', params)
            .then(data => responseHelper.generateResponse(req, res, data, 'token'))
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.post('/registration-token', validator(authenticationSchemas.registrationToken, 'body')
    , passport.authenticate('jwt', { session: false })
    , async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callUserService('get_registration_token', params)
            .then(data => responseHelper.generateResponse(req, res, data, 'token'))
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.post('/register', validator(authenticationSchemas.register, 'body')
    , passport.authenticate('jwt', { session: false })
    , async (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callUserService('register_user', params)
            .then(data => responseHelper.generateResponse(req, res, data, null, 'successfully send mail to the User'))
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

router.post('/login', validator(authenticationSchemas.login, 'body')
    , passport.authenticate('jwt', { session: false })
    , (req, res, next) => {
        let params = req.body;
        params.userId = req.user;
        serviceCalls.callUserService('login_user', params)
            .then(data => responseHelper.generateResponse(req, res, data, 'token'))
            .catch(err => next(new ErrorHandler({ status: 503, message: 'The service you are trying to reach is not available. Please try Again Later' })));
    });

module.exports = router;;