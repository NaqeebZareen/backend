var seneca = require('seneca')({ log: 'silent' });
const jsonwebtoken = require('jsonwebtoken');
const AuthenticatorService = require('../../application/authenticator_service');
const log = require('../../logger');
const config = require('../../../config');

seneca.use('seneca-amqp-transport');

const authService = new AuthenticatorService();

const ACTION_NAME = (command) => { return `service:user_service,cmd:${command}`; }

seneca.add(ACTION_NAME('get_user_token'), async (arr, done) => {
    try {
        arr = arr.params;
        console.log(arr);
        let data = await authService.getAnonymousToken(arr);
        log.info({ user: data }, `Anonymous user created in mongo successfully`);
        done(null, { Ok: data });
    } catch (err) {
        let customError = err.message;
        log.error({ err }, `Error occured while getting anonymus token  - Message =>  ${err.message}`);
        console.log(err)
        if (err.code == 11000) {
            err.message = `This Record has been Already Registered with our system try using another`;
            customError = { message: err.message, keyValue: err.keyValue }
        }
        done(null, { Error: customError });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_user_token'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_registration_token'), async (arr, done) => {
    try {
        arr = arr.params;
        let data = await authService.getRegisterationToken(arr);
        log.info({ token: data }, `Token of user is successfully generated\n`);
        done(null, { Ok: data });
    } catch (err) {
        log.error({ err }, `Error while registering user - \nMessage =>  ${err.message}`);
        done(null, { Error: err.message });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_registration_token'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('login_user'), async (arr, done) => {
    try {
        arr = arr.params;
        let data = await authService.loginUser(arr);
        log.info({ token: data.token }, `successfully registered user's token in Auth database`);
        done(null, { Ok: data });
    } catch (err) {
        let customError = err.message;
        log.error({ err }, `Error occured while getting token with social Login  - Message =>  ${err.message}`);
        if (err.keyValue) {
            err.message = `This Token has been Already Registered with our system try using another`;
            customError = { message: err.message, keyValue: { token: jsonwebtoken.sign(arr.userId, config.jwtSecret) } };
        }
        done(null, { Error: customError })
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('login_user'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('register_user'), async (arr, done) => {
    try {
        arr = arr.params;
        console.log(`inside route woth params of =====> `, arr);
        let data = await authService.registerUser(arr);
        console.log(`aftet processing of request ====>>`, data);
        // log.info(`successfully generated message for user ${message.to}`);
        // internalRoute.sendEmail(message);
        done(null, { Ok: data })
    } catch (err) {
        log.error({ err }, `Error occured while sending email - Message => ${err.message}`);
        done(null, { Error: err.message });
    }

})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('register_user'),
        url: process.env.AMQP_URL
    });


module.exports = seneca;