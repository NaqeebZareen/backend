const crudRepository = require('../../infrastructure/repositories/simple_crud');
const { createUserAndDetailsEntity, UserDetail, SearchUser, SearchUserById, UpdateSecurityCode } = require('../../domain/user');

const USER_COLLECTION = `users`;
const USER_DETAILS_COLECTION = `user_details`;

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
        if (userData && userData.isRegistered && fetchProfile)
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
        return userDetailData?Object.assign(userDetailData, userData):{}
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
        console.log(updatedRecord);
        if (updatedRecord.updated)
            return updateSecurityCode.securityCode;
        else throw new Error(`Record is not updated due to some error`);
    }

    async createUserProfile(arr) {
        let userDetailEntity = new UserDetail(arr);
        console.log(userDetailEntity);
        let userDetailData = await crudRepository(USER_DETAILS_COLECTION).create(userDetailEntity);
        console.log(userDetailData);
        let abc=await crudRepository(USER_COLLECTION).update({userId:arr.userId},{isRegistered:true});
        console.log('data after update',abc);
        return userDetailData;
    }
}