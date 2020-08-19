const sendgridMail = require('@sendgrid/mail')
const UserController = require('./controllers/user_controller')
const DeviceController = require('./controllers/user_device_controller')
const verifyEmail = require('../interface/email-template/verify_email')
const EmailMessage = require('../domain/email-message')
const config = require('../../config')

let userService = new UserController();
let deviceService = new DeviceController();
sendgridMail.setApiKey(config.SENDGRID_API_KEY);

module.exports = class AutherticatorService {

    /**
    * @GetToken function
    * @param [null] nothing required to get anonymous token
    */

    async getAnonymousToken(arr) {
        console.log(`data from authenticator Service=>`, arr);
        let { userData } = await userService.create(arr);
        console.log(`data returned from authenticator Service=>`, userData);
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
        } else throw new Error(`No record found for specific Token Provided`);
    }

    async registerUser(arr) {
        let { userData, userDetailData } = await userService.findUser({ userId: arr.userId }, true);
        console.log('data from finding the user data', userDetailData);
        let authCode = null;
        if (!userData)
            throw new Error('No record found for specific Token Provided');
        if (userDetailData) {
            console.log('inside after getting record');
            authCode = await userService.updateSecurityCode({ userId: arr.userId });
        } else {
            console.log('profile not found');
            let profileData = await userService.createUserProfile(arr);
            authCode = profileData.securityCode;
        }
        let email = new EmailMessage({
            to: arr.email,
            from: 'noreply@youcan.tech',
            subject: 'Verification Code',
            html: verifyEmail(authCode)
        });
        sendgridMail.send(email)
            .then(data => console.log(data.response))
            .catch(err => console.log(err.message));
        return { email: arr.email };
    }

    async loginUser(arr) {
        let { userData, userDetailData } = await userService.findUser({ userId: arr.userId }, true);
        console.log(`this the detaile data with token data=>\n\n\\n\n\n\n\n`, userData, userDetailData);
        if (!userData)
            throw new Error(`No record found for specific Token Provided`);
        if (!userDetailData)
            await userService.createUserProfile(arr);
        return userData.token
    }
}