
let todayDate = new Date();
let dateFormat = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
module.exports = class SearchNews {
    constructor(object) {
        this.text = object.text || '';
        this.publication_date = object.publicationDate ? object.publicationDate : dateFormat;
        this.cities = object.cities;
    }
}