// const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../../../../config');
const log = require('../../../logger');

/**
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).
 */
module.exports = (passport) => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.keys.secret_jwt
    },
        (jwtPayload, done) => {
            try {
                log.info({ "Middleware": "Passport", "jwtPayload": jwtPayload }, "Token Accepted");
                return done(null, jwtPayload);
            }
            catch (err) {
                log.error({ "Middleware": "Passport", "Token": jwtPayload, "err": err }, "Request Unauthorized");
                return done({ "error": "token not recognized" }, null);
            }
        }
    ));
}