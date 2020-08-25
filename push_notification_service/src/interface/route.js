var seneca = require('seneca')({ log: 'silent' });
const log = require('../logger').logger;
const NotificationController = require('../application/controllers/notification_controller');
const config = require('../../config');

const notificationService = new NotificationController();

seneca.use('seneca-amqp-transport');
const ACTION_NAME = (command) => { return `service:push_notification_service,cmd:${command}`; }

/**
 * 
 */
seneca.add(ACTION_NAME('create_activity_notification'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await notificationService.createActivityNotification(arr);
        log.info({ data }, `Successfully created the new notification into the Database`);
        done(null, { Ok: data })
    } catch (err) {
        // log.error({ err }, `Error while fetching user profile - Message => ${err.message}`);
        console.log(err);
        done(null, { Error: err });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('create_activity_notification'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('create_news_notification'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await notificationService.createNewsNotification(arr);
        log.info({ data }, `Successfully created the new notification into the Database`);
        done(null, { Ok: data })
    } catch (err) {
        // log.error({ err }, `Error while fetching user profile - Message => ${err.message}`);
        console.log(err);
        done(null, { Error: err });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('create_news_notification'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_activity_notification_body'), async (arr, done) => {
    console.log('in route with params ====>>>>', arr.params);
    try {
        arr = arr.params;
        let notficationData = await notificationService.getActivityNotificationBody(arr);
        log.info({ notficationData }, `sucessfully fetched the record of notification`);
        done(null, { Ok: notficationData })
    } catch (err) {
        log.error({ err }, `Error while getting notification Data - Message => ${err.message}`);
        done(null, { Error: err });
    }

})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_activity_notification_body'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_news_notification_body'), async (arr, done) => {
    try {
        arr = arr.params;
        let notficationData = await notificationService.getNewsNotificationBody(arr);
        log.info({ notficationData }, `sucessfully fetched the record of notification`);
        done(null, { Ok: notficationData })
    } catch (err) {
        log.error({ err }, `Error while getting notification Data - Message => ${err.message}`);
        done(null, { Error: err });
    }

})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_news_notification_body'),
        url: process.env.AMQP_URL
    });

module.exports = seneca;