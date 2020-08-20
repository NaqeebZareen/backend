const { SearchActivityByDate, SearchActivityByRange,ActivityListing } = require('../../domain/activity')
const actiivityRepository = require('../../infrastructure/repositories/activity')


module.exports = class ActivityController {

    async getListing(arr) {
        console.log(arr);
        let searchEntity = new ActivityListing(arr);
        let data = await actiivityRepository.activityListing(searchEntity,arr.userId, arr.limit, arr.offset);
        return data;
    }

    async filterActivities(arr) {
        if (arr.dateRange) {
            let searchEntity = new SearchActivityByRange(arr);
            return await actiivityRepository.searchActivitiesByDateRange(searchEntity, arr.userId, arr.limit, arr.offset);
        } else {
            let searchEntity = new SearchActivityByDate(arr);
            console.log(searchEntity);
            let data = await actiivityRepository.searchActivitiesByDate(searchEntity, arr.userId, arr.limit, arr.offset);
            return data;
        }

    }

    async getLatestActivities(arr) {
        return await actiivityRepository.activityListing(arr.city.toUpperCase(), arr.userId, 5, 0);
    }

    async findActivityById(arr) {
        return await actiivityRepository.getDetailedActivity(arr.activityId, arr.userId);
    }
}