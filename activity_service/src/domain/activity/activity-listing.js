module.exports = class ActivityListing {
    constructor(object) {
        this.city = object.city.toUpperCase();
        this.categories = object.categories || null;
    }
}