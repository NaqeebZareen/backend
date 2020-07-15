const log = require('../../logger').logger;
const seneca = require('seneca')({ log: 'silent' });

seneca.use('seneca-amqp-transport');

notificationClient = seneca.client({
    type: 'amqp',
    pin: 'service:notification_delivery_service,cmd:*',
    url: process.env.AMQP_URL
});

let sendEmail = (params = null) => {
    return new Promise(
        (resolve, reject) => {
            notificationClient.act(`service:notification_delivery_service,cmd:email_to_single_client`,{params},(err, data) => {
                if (data.status_code == 200)
                    log.info(`email sent to ${message.to} successfully`);
                else
                    log.error({ err }, `error while sending the email to the user ${message.to}`);
            });
        });
}

module.exports = {
    sendEmail
}