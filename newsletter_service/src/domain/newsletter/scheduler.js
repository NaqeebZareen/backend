module.exports = class Scheduler {
    constructor(object) {
        this.scheduled_date = object.scheduledDate;
        this.city = object.city;
        this.scheduled_time = object.scheduledTime;
        this.newsletter_html = object.newsletterHtml;
    }
}