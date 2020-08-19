const crudRepository = require('../../infrastructure/repositories/simple_crud')
const { UserMainInterest, SearchUserInterests } = require('../../domain/user-interests')


const INTEREST_COLLECTION = 'user_interests'

module.exports = class UserInterestsController {

    async addUserInterest(arr) {
        let mainInterestEntity = new UserMainInterest(arr);
        await crudRepository(INTEREST_COLLECTION).create(mainInterestEntity);
        return arr.userInterests;
    }

    async removeUserInterest(arr) {
        let searchEntity = new SearchUserInterests({ userId: arr.userId });
        crudRepository(INTEREST_COLLECTION).removeOne(searchEntity);
        return true;
    }

    async updateUserInterest(arr) {
        let searchEntity = new SearchUserInterests({ userId: arr.userId });
        crudRepository(INTEREST_COLLECTION).update(searchEntity, arr);
        return arr.userInterests;
    }

    async findUserInterest(arr) {
        let searchEntity = new SearchUserInterests({ userId: arr.userId });
        let data = await crudRepository(INTEREST_COLLECTION).findOne(searchEntity, null, ['userInterests']);
        return data? data.userInterests: {};
    }
}