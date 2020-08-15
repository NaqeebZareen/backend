const seneca = require('seneca')();

//seneca configuration;
seneca.use('seneca-amqp-transport');

const userClient = seneca.client({
    type: 'amqp',
    pin: 'service:user_service,cmd:*',
    url: process.env.AMQP_URL
});

const newsClient = seneca.client({
    type: 'amqp',
    pin: 'service:news_service,cmd:*',
    url: process.env.AMQP_URL
});

const activityClient = seneca.client({
    type: 'amqp',
    pin: 'service:activity_service,cmd:*',
    url: process.env.AMQP_URL
});

function callUserService(command, params = null) {
    return new Promise((resolve, reject) => {
        userClient.act(`service:user_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
};

function callNewsService(command, params = null) {
    return new Promise((resolve, reject) => {
        newsClient.act(`service:news_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
}

function callActivityService(command, params = null) {
    return new Promise((resolve, reject) => {
        activityClient.act(`service:activity_service,cmd:${command}`, { params }, (error, data) => {
            if (data)
                resolve(data);
            if (error)
                reject(error);
        });
    });
};

module.exports = {
    callUserService,
    callNewsService,
    callActivityService
}
