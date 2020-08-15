var seneca = require('seneca')();
const ActivityController = require('../../application/controllers/activity-controller');
const log = require('../../logger');

seneca.use('seneca-amqp-transport');

const activityService = new ActivityController();//get_detailed_news

const ACTION_NAME = (command) => { return `service:activity_service,cmd:${command}`; }

seneca.add(ACTION_NAME('get_activity_listing'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await activityService.getListing(arr);
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
        pin: ACTION_NAME('get_activity_listing'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_detailed_activity'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await activityService.findActivityById(arr);
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
        pin: ACTION_NAME('get_detailed_activity'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('search_activities'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await activityService.filterActivities(arr);
        log.info(`Data fetch for lissting ofs activities`, { data });
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
        pin: ACTION_NAME('search_activities'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_latest_activities'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await activityService.getLatestActivities(arr);
        log.info(`Data fetch for latest Activities`, { data });
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
        pin: ACTION_NAME('get_latest_activities'),
        url: process.env.AMQP_URL
    });


module.exports = seneca;