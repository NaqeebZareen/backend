module.exports = class User {
  constructor(userObject) {
    this.userId = userObject.userId;
    this.firstName = userObject.firstName || null;
    this.lastName = userObject.lastName || null;
    this.email = userObject.email;
    this.picture = userObject.picture || null;
    this.isEmailVerified = userObject.isEmailVerified || false;
    this.securityCode = Math.floor(1000 + Math.random() * 9000);
    this.codeExpiresIn = new Date(new Date().getTime() + 18000000+(10 * 60000));
    this.createdAt = new Date(new Date().getTime() + 18000000);
  }
}