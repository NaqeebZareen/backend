// let todayDate = new Date();
// let dateFormat = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
module.exports = class SearchNews {
    constructor(object) {
        this.text = object.text || null;
        this.publication_date = object.publicationDate || null;
        this.city = object.city;
    }
}