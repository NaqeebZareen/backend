const {
  SearchActivityByDate,
  SearchActivityByRange,
  ActivityListing,
} = require("../../domain/activity");
const actiivityRepository = require("../../infrastructure/repositories/activity");

module.exports = class ActivityController {
  async getListing(arr) {
    console.log(arr);
    let searchEntity = new ActivityListing(arr);
    let data = await actiivityRepository.activityListing(
      searchEntity,
      arr.limit,
      arr.offset
    );
    return data;
  }

  async filterActivities(arr) {
    if (arr.dateRange) {
      let searchEntity = new SearchActivityByRange(arr);
      return await actiivityRepository.searchActivitiesByDateRange(
        searchEntity,
        arr.limit,
        arr.offset
      );
    } else {
      let searchEntity = new SearchActivityByDate(arr);
      console.log(searchEntity);
      let data = await actiivityRepository.searchActivitiesByDate(
        searchEntity,
        arr.limit,
        arr.offset
      );
      return data;
    }
  }

  async getLatestActivities(arr) {
    return await actiivityRepository.activityListing(
      { city: arr.city.toUpperCase() },
      5,
      0
    );
  }

  async findActivityById(arr) {
    let userId;
    return await actiivityRepository.getDetailedActivity(
      arr.activityId,
      userId
    );
  }
};
