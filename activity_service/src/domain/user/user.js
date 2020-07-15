const jwt = require('jsonwebtoken');
const config = require('../../../config');

module.exports = class User {
  constructor(userObject) {
    this.userId = userObject.userId;
    this.isRegistered = userObject.isRegistered;
    this.token = jwt.sign(this.userId, config.jwtSecret);
    this.location = userObject.location;
    this.city = userObject.city;
    this.country = userObject.country;
    this.createdAt = new Date(new Date().getTime() + 18000000);
  }
}