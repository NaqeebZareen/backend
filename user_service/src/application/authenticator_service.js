const UserController = require('./controllers/user_controller')
const DeviceController = require('./controllers/user_device_controller')

let userService = new UserController();
let deviceService = new DeviceController();

module.exports = class AutherticatorService {

    /**
    * @GetToken function
    * @param [null] nothing required to get anonymous token
    */

    async getAnonymousToken(arr) {
        console.log(`data from authenticator Service=>`, arr);
        let { userData } = await userService.create(arr);
        console.log(`data returned from authenticator Service=>`,userData);
        arr.userId = userData.userId;
        deviceService.create(arr);
        return userData.token;
    }

    async getRegisterationToken(arr) {
        let { userData, userDetailData } = await userService.findUser({ userId: arr.userId }, true);
        if (userDetailData) {
            if (userDetailData.securityCode == arr.securityCode) {
                if (userDetailData.codeExpiresIn >= new Date(new Date().getTime() + 18000000)) {
                    userDetailData.isEmailVerified = true;
                    userService.updateProfile({ userId: userData.userId }, userDetailData);
                    return userData.token
                } else throw new Error(`Provided code is Expired.`);
            } else throw new Error(`Invalid Security Code provided. Please Provide a valid code to proceed.`);
        } else throw new Error(`No record Found please verify your email first.`);
    }

    async registerUser(arr) {
        let { userDetailData } = await userService.findUser({ userId: arr.userId }, false);
        let securityCode = null;
        if (userDetailData) {
            securityCode = await userService.updateSecurityCode({ userId: arr.userId });
        } else {
            securityCode = await userService.createUserProfile(arr).securityCode;
        }
        return securityCode;
    }

    async loginUser(arr) {
        let { userData, userDetailData } = await userService.findUser({ userId: arr.userId }, true);
        if (!userDetailData)
            await userService.createUserProfile(arr);
        return userData.token
    }
}