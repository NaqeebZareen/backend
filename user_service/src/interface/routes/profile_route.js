var seneca = require('seneca')({ log: 'silent' });
const log = require('../../logger');
const UserController = require('../../application/controllers/user_controller');
const UserInterestController = require('../../application/controllers/user_interest_controller');

seneca.use('seneca-amqp-transport');

const userService = new UserController();
const interestService= new UserInterestController();

const ACTION_NAME = (command) => { return `service:user_service,cmd:${command}`; }

seneca.add(ACTION_NAME('get_user_profile'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>',arr.params);
        arr = arr.params;
        let data = await userService.getProfile(arr);
        log.info({ user: data }, `Anonymous user created in mongo successfully`);
        done(null, { Ok: data });
    } catch (err) {
        console.log('inside error',err);
        let customError = err.message;
        log.error({ err }, `Error occured while getting anonymus token  - Message =>  ${err.message}`);
        done(null, { Error: customError });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_user_profile'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('update_user_profile'), async (arr, done) => {
    try {
        arr = arr.params;
        let data = await userService.updateProfile({ userId: arr.userId }, arr);
        log.info({ token: data }, `Token of user is successfully generated\n`);
        done(null, { Ok: data });
    } catch (err) {
        log.error({ err }, `Error while registering user - \nMessage =>  ${err.message}`);
        done(null, { Error: err.message });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('update_user_profile'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_user_interests'), async (arr, done) => {
    try {
        arr = arr.params;
        let data = await interestService.findUserInterest(arr);
        log.info({ token: data.token }, `successfully registered user's token in Auth database`);
        done(null, { Ok: data });
    } catch (err) {
        let customError = err.message;
        log.error({ err }, `Error occured while getting token with social Login  - Message =>  ${err.message}`);
        if (err.keyValue.userId) {
            err.message = `This Token has been Already Registered with our system try using another`;
            customError = { message: err.message, keyValue: { token: jsonwebtoken.sign(arr.userId, config.jwtSecret) } };
        }
        done(null, { Error: customError })
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_user_interests'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('update_user_interests'), async (arr, done) => {
    try {
        arr = arr.params;
        console.log(`inside route woth params of =====> `, arr);
        let data = await interestService.updateUserInterest(arr);
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
        pin: ACTION_NAME('update_user_interests'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('add_user_interests'), async (arr, done) => {
    try {
        arr = arr.params;
        console.log(`inside route woth params of =====> `, arr);
        let data = await interestService.addUserInterest(arr);
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
        pin: ACTION_NAME('add_user_interests'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('remove_user_interests'), async (arr, done) => {
    try {
        arr = arr.params;
        console.log(`inside route woth params of =====> `, arr);
        let data = await interestService.removeUserInterest(arr);
        console.log(`aftet processing of request ====>>`, data);
        // log.info(`successfully generated message for user ${message.to}`);
        // internalRoute.sendEmail(message);
        done(null, { Ok: {} })
    } catch (err) {
        log.error({ err }, `Error occured while sending email - Message => ${err.message}`);
        done(null, { Error: err.message });
    }

})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('remove_user_interests'),
        url: process.env.AMQP_URL
    });


module.exports = seneca;