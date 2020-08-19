var seneca = require('seneca')();
const NewsController = require('../../application/controllers/news-controller');
const log = require('../../logger');

seneca.use('seneca-amqp-transport');

const newsService = new NewsController();//get_detailed_news

const ACTION_NAME = (command) => { return `service:news_service,cmd:${command}`; }

seneca.add(ACTION_NAME('get_news_listing'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsService.filterNews(arr);
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
        pin: ACTION_NAME('get_news_listing'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_detailed_news'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsService.findNewsById(arr);
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
        pin: ACTION_NAME('get_detailed_news'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_news_by_id_array'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsService.filterNewsByIds(arr);
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
        pin: ACTION_NAME('get_news_by_id_array'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('up_vote_news'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsService.upVoteNews(arr);
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
        pin: ACTION_NAME('up_vote_news'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('down_vote_news'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsService.downVoteNews(arr);
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
        pin: ACTION_NAME('down_vote_news'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('remove_up_vote_news'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsService.removeUpVoteFromNews(arr);
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
        pin: ACTION_NAME('remove_up_vote_news'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('remove_down_vote_news'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>', arr.params);
        arr = arr.params;
        let data = await newsService.removeDownVoteFromNews(arr);
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
        pin: ACTION_NAME('remove_down_vote_news'),
        url: process.env.AMQP_URL
    });


module.exports = seneca;