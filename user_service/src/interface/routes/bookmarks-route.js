var seneca = require('seneca')({ log: 'silent' });
const log = require('../../logger');
const BookmarksController = require('../../application/controllers/bookmarks-controller');

seneca.use('seneca-amqp-transport');

let bookmarksService = new BookmarksController();

const ACTION_NAME = (command) => { return `service:user_service,cmd:${command}`; }

seneca.add(ACTION_NAME('add_news_to_bookmarks'), async (arr, done) => {
    try {
        console.log('in route with params ====>>>>',arr.params);
        arr = arr.params;
        let data = await bookmarksService.addNewsBookmark(arr);
        log.info(`Bookmark created in mongo successfully`,{data});
        done(null, { Ok: data });
    } catch (err) {
        console.log('inside error',err);
        let customError = err.message;
        log.error({ err }, `Error occured while getting anonymus token  - Message =>  ${err.message}`);
        if (err.code == 11000) {
            err.message = `This Record has been Already Registered with our system try using another`;
            customError = { message: err.message, keyValue: err.keyValue }
        }
        done(null, { Error: customError });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('add_news_to_bookmarks'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('delete_news_from_bookmarks'), async (arr, done) => {
    try {
        arr = arr.params;
        let data = await bookmarksService.removeNewsBookmark(arr);
        log.info({ data }, `Deleted Bookmark successfully\n`);
        done(null, { Ok: data });
    } catch (err) {
        log.error({ err }, `Error while registering user - \nMessage =>  ${err.message}`);
        done(null, { Error: err.message });
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('delete_news_from_bookmarks'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('get_activity_bookmarks'), async (arr, done) => {
    try {
        arr = arr.params;
        let data = await bookmarksService.findActivityBookmarks(arr);
        log.info({ data }, `Bookmarks Retrivve successfully`);
        done(null, { Ok: data });
    } catch (err) {
        let customError = err.message;
        log.error({ err }, `Error occured while getting the bookmarks  - Message =>  ${err.message}`);
        done(null, { Error: customError })
    }
})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('get_activity_bookmarks'),
        url: process.env.AMQP_URL
    });

    seneca.add(ACTION_NAME('get_news_bookmarks'), async (arr, done) => {
        try {
            arr = arr.params;
            let data = await bookmarksService.findNewsBookmarks(arr);
            log.info({ data }, `Bookmarks Retrivve successfully`);
            done(null, { Ok: data });
        } catch (err) {
            let customError = err.message;
            log.error({ err }, `Error occured while getting the bookmarks  - Message =>  ${err.message}`);
            done(null, { Error: customError })
        }
    })
        .listen({
            type: 'amqp',
            pin: ACTION_NAME('get_news_bookmarks'),
            url: process.env.AMQP_URL
        });

seneca.add(ACTION_NAME('add_activity_to_bookmarks'), async (arr, done) => {
    try {
        arr = arr.params;
        console.log(`inside route woth params of add activity=====> `, arr);
        let data = await bookmarksService.addActivityBookmark(arr);
        log.info(`Bookmark created in mongo successfully`,{data});
        done(null, { Ok: data })
    } catch (err) {
        log.error({ err }, `Error occured while sending email - Message => ${err.message}`);
        done(null, { Error: err.message });
    }

})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('add_activity_to_bookmarks'),
        url: process.env.AMQP_URL
    });

seneca.add(ACTION_NAME('delete_activity_from_bookmarks'), async (arr, done) => {
    try {
        arr = arr.params;
        console.log(`inside route woth params of =====> `, arr);
        let data = await bookmarksService.removeActivityBookmark(arr);
        log.info({ data }, `Deleted Bookmark successfully\n`);
        done(null, { Ok: data })
    } catch (err) {
        log.error({ err }, `Error occured while sending email - Message => ${err.message}`);
        done(null, { Error: err.message });
    }

})
    .listen({
        type: 'amqp',
        pin: ACTION_NAME('delete_activity_from_bookmarks'),
        url: process.env.AMQP_URL
    });


module.exports = seneca;