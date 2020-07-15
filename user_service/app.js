require('dotenv').config({ debug: true });
require('./src/interface/routes');

const fs = require('fs');
const AWS = require('aws-sdk');
const log = require('./src/logger').logger;
const config = require('./config');
const utils = require('./utils');

const amazonServices = new AWS.SES(config.SESConfig);

process.on('uncaughtException', async err => {
    try {
        await amazonServices.sendEmail(utils.generateParamsForCrashReport(err)).promise();
    } catch (err) {
        log.error({ err }, `Error while sending email to the team`);
    } finally {
        log.error({ err }, `Critical Error | uncaughtException`);
        fs.appendFileSync('error_log.txt',
            `\n\n\n -- ${new Date(new Date().getTime() + 18000000)} -- Uncaught Exception occured \n ${err} \n stack=> ${err.stack}`,
            (err) => {
                if (err)
                    log.error(`Error occured while writing into file of error_log`, { err });
                else
                    log.info('Error saved to the file error_log.txt Successfully!');
            });
        process.exit(0);
    }
});

process.on('unhandledRejection', async err => {
    try {
        await amazonServices.sendEmail(utils.generateParamsForCrashReport(err)).promise();
    } catch (err) {
        log.error({ err }, `Error while sending email to the team`);
    } finally {
        // Will print "unhandledRejection err is not defined"
        log.error({ err }, `Critical Error | unhandledRejection`);
        fs.appendFileSync('error_log.txt', `\n\n\n -- ${new Date()} -- Unhandled Rejection occured \n ${err} \n stack=> ${err.stack}`, (err) => {
            if (err)
                throw err;
            else
                log.info('Error saved to the file error_log.txt Successfully!');
        });
        process.exit(0);
    }

})