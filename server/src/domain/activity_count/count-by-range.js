module.exports = class ActivitiesCount {
    constructor(object) {
        this.dateTo = null;
        this.dateFrom = null;
        if (object.dateRange) {
            this.dateTo = object.dateRange[1];
            this.dateFrom = object.dateRange[0];
        }
        this.city = object.city ? object.city.toUpperCase() : 'SAN FRANCISCO';
    }
}