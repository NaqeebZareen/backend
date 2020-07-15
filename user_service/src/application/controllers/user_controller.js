const crudRepository = require('../../infrastructure/repositories/simple_crud');
const { createUserAndDetailsEntity, UserDetail, SearchUser, SearchUserById, UpdateSecurityCode } = require('../../domain/user');

const USER_COLLECTION = `users`;
const USER_DETAILS_COLECTION = `user.details`;

module.exports = class UserController {

    async create(userEntityObj) {
        let { userEntity, userDetailEntity } = createUserAndDetailsEntity(userEntityObj);
        let userData = await crudRepository(USER_COLLECTION).create(userEntity);
        let userDetailData = null;
        if (userDetailEntity)
            userDetailData = await crudRepository(USER_DETAILS_COLECTION).create(userDetailEntity);
        return { userData, userDetailData }
    }

    async findUser(userIdObject, fetchProfile) {
        let userData = null, userDetailData = null;
        let userSearchEntity = new SearchUserById(userIdObject);
        userData = await crudRepository(USER_COLLECTION).findOne(userSearchEntity);
        if (fetchProfile && userData.isRegistered)
            userDetailData = await crudRepository(USER_DETAILS_COLECTION).findOne(userSearchEntity);
        return { userData, userDetailData }
    }

    async getProfile(userIdObject) {
        console.log('inside controller===>>>', userIdObject);
        let userSearchEntity = new SearchUserById(userIdObject);
        let userData = await crudRepository(USER_COLLECTION).
            findOne(userSearchEntity, null, ['location', 'city', 'country']);
        let userDetailData = await crudRepository(USER_DETAILS_COLECTION)
            .findOne(userSearchEntity, null, ['firstName', 'lastName', 'picture', 'email']);
            console.log(`after processiing trhr database =>>>>`,userData,userDetailData);
        return Object.assign(userDetailData, userData);
    }

    async updateProfile(userIdObject, updationObject) {
        let userSearchEntity = new SearchUserById(userIdObject);
        let updatedRecord = await crudRepository(USER_DETAILS_COLECTION).update(userSearchEntity, updationObject);
        if (updatedRecord.updated)
            return updationObject;
        else throw new Error(`Record is not updated due to some error`);
    }

    async updateSecurityCode(userIdObject) {
        let userSearchEntity = new SearchUserById(userIdObject);
        let updateSecurityCode = new UpdateSecurityCode();
        let updatedRecord = await crudRepository(USER_DETAILS_COLECTION).update(userSearchEntity, updateSecurityCode);
        if (updatedRecord.updated)
            return updateSecurityCode.securityCode;
        else throw new Error(`Record is not updated due to some error`);
    }

    async createUserProfile(arr) {
        let userDetailEntity = new UserDetail(arr);
        let userDetailData = await crudRepository(USER_DETAILS_COLECTION).create(userDetailEntity);
        return userDetailData;
    }
}