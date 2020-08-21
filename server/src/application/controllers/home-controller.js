const homeRepository = require('../../infrastructure/repositories/home')

module.exports = class HomeController {

    async getcitiesAndInterestList() {
        return await homeRepository.homeData();
    }

    async getActivityCount(city) {
        city = city ? city.toUpperCase() : 'SAN FRANCISCO';
        return await homeRepository.getActivityCount(city);
    }
}