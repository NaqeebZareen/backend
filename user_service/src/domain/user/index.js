const SearchUser = require('./search_user')
const User = require('./user')
const SearchUserById = require('./search_user_by_id')
const UpdateSecurityCode = require('./update_security_code')
const UserDetail = require('./user_detail')
const uuidV1 = require('uuid/v1');

function createUserAndDetailsEntity(userObject) {
    userObject.userId = uuidV1();
    let userDetailEntity = null;
    userObject.isRegistered = false;
    if (userObject.email) {
        userObject.isRegistered = true;
        userDetailEntity = new UserDetail(userObject);
    }
    let userEntity = new User(userObject);
    return { userEntity, userDetailEntity };
}

module.exports = {
    SearchUser,
    SearchUserById,
    UpdateSecurityCode,
    createUserAndDetailsEntity,
    UserDetail
}