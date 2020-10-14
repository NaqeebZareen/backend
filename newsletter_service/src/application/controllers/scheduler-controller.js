const CronJob = require('cron').CronJob;
const sendgridMail = require('@sendgrid/mail');
const { Scheduler, Newsletter } = require('../../domain/newsletter')
const { schedulerRepo } = require('../../infrastructure/repositories')
const config = require('../../../config');

sendgridMail.setApiKey(config.SENDGRID_API_KEY);

function createNewCronJob(pattern, callback, newsletterId) {
    const job = new CronJob(`${pattern}`, callback, null, true, 'Asia/Karachi');
    job.start();
}

function fetch_date_and_time_in_string(date, time) {
    let dateFromated = new Date(date);
    let timeFormatted = time.split(':');
    return `0 ${timeFormatted[1]} ${timeFormatted[0]} ${dateFromated.getDate()} ${dateFromated.getMonth()} *`;
}

async function sendNewsletter(emails, arr) {
    console.log(emails, arr);
    let pattern = fetch_date_and_time_in_string(arr.scheduled_date, arr.scheduled_time);
    let message = {
        to: emails,
        from: { email: 'developer@youcan.tech', name: 'YouCan LLC' },
        name: 'YouCan LLC',
        subject: 'Youcan LLC',
        html: arr.html
    };
    console.log(message);
    createNewCronJob(pattern, (newsletterId) => {
        console.log('The time is ', new Date(new Date().getTime() + 18000000), `\n\t`,
            `Sending the Newsletter with ${newsletterId}`);
        schedulerRepo.updateScheduleStatus(newsletterId).then(data => console.log(data));
        sendgridMail
            .send(message, true)
            .then((data) => { console.log(data); }, error => {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body)
                }
            });
    });
}


module.exports = class SchedulerController {

    async getAllSubscribers() {
        let data = await schedulerRepo.getAllSubscribersEamils()
            .catch(err => console.log(err));
        data = data.subscribers;
        return data;
    }

    async getSubscribersByCity(city) {
        let data = await schedulerRepo.getCityBaseSubscribersEamils(city)
            .catch(err => console.log(err));
        data = data.subscribers;
        return data;
    }

    async scheduleNewsletter(arr) {
        let newsletterData = await schedulerRepo.getNewsletterDetails(arr.newsletterId);
        if (newsletterData) {
            let emails = null;
            if (newsletterData.city == 'All') {
                emails = await this.getAllSubscribers();
            } else {
                emails = await this.getSubscribersByCity(newsletterData.city);
            }
            sendNewsletter(emails, newsletterData);
            return emails;
        }
        else return null;
    }
}