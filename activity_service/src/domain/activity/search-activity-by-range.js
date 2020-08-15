module.exports = class SearchActivities {
    constructor(object) {
        this.text = object.text ? object.text.toUpperCase() : null;
        this.dateTo = null;
        this.dateFrom = null;
        if (object.dateRange) {
            this.dateTo = object.dateRange[1];
            this.dateFrom = object.dateRange[0];
        }
        this.city = object.city.toUpperCase();
        this.categories = object.categories || null;
    }
}