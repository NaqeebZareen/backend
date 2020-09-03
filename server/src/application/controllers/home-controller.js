const homeRepository = require('../../infrastructure/repositories/home')
const { CountByDate, CountByRange } = require('../../domain/activity_count')

module.exports = class HomeController {

    async getcitiesAndInterestList() {
        return await homeRepository.homeData();
    }

    async getActivityCount(arr) {
        console.log(arr);
        if (arr.dateRange) {
            let searchEntity = new CountByRange(arr);
            return await homeRepository.getActivityCountByRange(searchEntity);
        } else {
            let searchEntity = new CountByDate(arr);
            return await homeRepository.getActivityCountByDate(searchEntity);

        }
    }

    async getReleaseFlag(arr) {
        let data = await homeRepository.getlatestRelease(arr.plateform);
        return (arr.appVersion >= data.release_version);
    }

    async getmetadata(url) {
        return await homeRepository.getUrlMetadata(url);
    }
}