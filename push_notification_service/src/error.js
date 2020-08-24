module.exports = class User extends Error {
    constructor(errorObject) {
        super(errorObject);
        this.code = errorObject.code;
        this.message = errorObject.message;
        this.detail = errorObject.detail;
    }
}