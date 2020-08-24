const admin = require('firebase-admin');
const Notification = require('../../domain/notification')
const simpleCrud = require('../../infrastructure/repositories/simple_crud')
const serviceAccount = require('../../../firebase-sdk.json')
const pushNotificationRepo = require('../../infrastructure/repositories/push-notification');

const NOTIFICATION_COLLECTION = 'notifications';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://youcan-265010.firebaseio.com"
});
module.exports = class NotificationController {
    async createActivityNotification(arr) {
        arr.category = 'activity';
        return await this.createNotification(arr);
    }
    async createNewsNotification(arr) {
        arr.category = 'news';
        return await this.createNotification(arr);
    }
    async createNotification(notificationObject) {
        let notificationEntity = new Notification(notificationObject);
        console.log(notificationEntity);
        let multipleRecords = 'null';
        let recordId = 'null';
        if (notificationEntity.body) {
            if (notificationEntity.category == 'activity') {
                multipleRecords = notificationEntity.body.activities.length > 1 ? 'true' : 'false';
                recordId = notificationEntity.body.activities.length == 1 ?
                    notificationEntity.body.activities[0].toString() : 'null';
            } else {
                multipleRecords = notificationEntity.body.news.length > 1 ? 'true' : 'false';
                recordId = notificationEntity.body.news.length == 1 ?
                    notificationEntity.body.news[0].toString() : 'null';
            }
        }
        let message = {
            topic: notificationEntity.city,
            notification: {
                title: notificationEntity.title,
                body: notificationEntity.text,
                image: notificationEntity.imageUrl,
            },
            data: notificationEntity.data
        }
        message.data.id = notificationEntity.id;
        message.data.record_id = recordId;
        message.data.multiple_records = multipleRecords;
        console.log(`\n\n\nmessage=>\n`, message, `\n\n\n`);
        admin.messaging().send(message).
            then(data => console.log('data from fcm=>>', data))
            .catch(err => console.log('error from fcm=>', err))
        return await simpleCrud(NOTIFICATION_COLLECTION).create(notificationEntity);
    }

    async getActivityNotificationBody(arr) {
        let find = { id: arr.notificationId }
        let data = await simpleCrud(NOTIFICATION_COLLECTION).findOne(find);
        if (data) {
            return await pushNotificationRepo.searchActivitiesByIdArray(data.body.activities, arr.userId);
        }
        else return { data: 'Notification Not Found' }
    }

    async getNewsNotificationBody(arr) {
        console.log('getNewsNotification', arr);
        let find = { id: arr.notificationId }
        let data = await simpleCrud(NOTIFICATION_COLLECTION).findOne(find);
        if (data)
            return await pushNotificationRepo.searchNewsByIdArray(data.body.news, arr.userId);
        else return { data: 'Notification Not Found' }
    }
}