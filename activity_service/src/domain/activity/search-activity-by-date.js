module.exports = class SearchActivities {
    constructor(object) {
        this.text = object.text ? object.text.toUpperCase() : null;
        this.date = object.date || null;
        this.city = object.city.toUpperCase();
        this.categories = object.categories || null;
    }
}