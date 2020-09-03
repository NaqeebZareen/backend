module.exports = class ActivitiesCount {
    constructor(object) {
        this.date = object.date || null;
        this.city = object.city ? object.city.toUpperCase() : 'SAN FRANCISCO';
    }
}