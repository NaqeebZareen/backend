const homeRepository = require('../../infrastructure/repositories/home')

module.exports = class HomeController {

    async getcitiesAndInterestList() {
        return await homeRepository.homeData();
    }
}