module.exports = class updateSecurityCode {
  constructor() {
    this.securityCode = Math.floor(1000 + Math.random() * 9000);
    this.codeExpiresIn = new Date(new Date().getTime() + 18000000 + (10 * 60000));
  }
}