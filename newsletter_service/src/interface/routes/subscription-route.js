var seneca = require('seneca')();
const SubscriptionController = require('../../application/controllers/subscription-controller');
const log = require('../../logger');

seneca.use('seneca-amqp-transport');

const newsletterService = new SubscriptionController();

const ACTION_NAME = (command) => { return `service:newsletter_service,cmd:${command}`; }

seneca.add(ACTION_NAME('add_new_subscriber'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsletterService.addNewSubscriber(arr);
        console.log(data);
        log.info(`Data fetch for lissting ofs news`, { data });
        done(null, { Ok: data });
    } catch (err) {
        console.log('inside error', err);
        let customError = err.message;
        log.error(`Error occured while getting news Data - Message =>  ${err.message}`);
        done(null, { Error: customError });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('add_new_subscriber'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('remove_subscriber'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsletterService.removeSubscriber(arr);
        console.log(data);
        log.info(`Data fetch for lissting of news`, { data });
        done(null, { Ok: data });
    } catch (err) {
        console.log('inside error', err);
        let customError = err.message;
        log.error(`Error occured while getting news Data - Message =>  ${err.message}`);
        done(null, { Error: customError });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('remove_subscriber'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_subscribers'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        let data = await newsletterService.getSubscriberList();
        console.log('data from reouter',data);
        log.info(`Data fetch for lissting of news`, { data });
        done(null, { Ok: data });
    } catch (err) {
        console.log('inside error', err);
        let customError = err.message;
        log.error(`Error occured while getting news Data - Message =>  ${err.message}`);
        done(null, { Error: customError });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_subscribers'),
        url: process.env.AMQP_URL
    });

module.exports = seneca;