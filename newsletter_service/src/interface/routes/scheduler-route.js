var seneca = require('seneca')();
const ScheduleController = require('../../application/controllers/scheduler-controller');
const log = require('../../logger');

seneca.use('seneca-amqp-transport');

const newsletterService = new ScheduleController();

const ACTION_NAME = (command) => { return `service:newsletter_service,cmd:${command}`; }

seneca.add(ACTION_NAME('schedule_newsletter'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsletterService.scheduleNewsletter(arr);
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
        pin: ACTION_NAME('schedule_newsletter'),
        url: process.env.AMQP_URL
    });

module.exports = seneca;