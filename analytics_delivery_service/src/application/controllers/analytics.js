const dataAnalytics = require('../../infrastructure/repositories/data-analytics');
const userAnalytics = require('../../infrastructure/repositories/user-analytics');

module.exports = class AnalytisController {

    async getAnalyticsReport() {
        return new Promise((resolve, reject) => {
            Promise.all(
                [dataAnalytics.getTotalNews(),
                dataAnalytics.getTodayNewsTotal(),
                dataAnalytics.getTotalActivities(),
                dataAnalytics.getTodayActivitiesTotal(),
                dataAnalytics.getActiveActivitiesTotal(),
                userAnalytics('users').totalUsers(),
                userAnalytics('users').usersAddedToday()])
                .then(data =>
                    resolve(data))
                .catch(err => {
                    console.log(err); reject(err);
                });
        })
    }
}