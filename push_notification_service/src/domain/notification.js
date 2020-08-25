const uuidV4 = require('uuid/v4');

module.exports = class Notification {
    constructor(object) {
        this.id = uuidV4();
        this.title = object.title;
        this.text = object.description;
        this.imageUrl = object.image;
        this.name = object.name;
        this.status = 'pending';
        this.category = object.category;
        this.body = object.body;
        this.data = object.data;
        this.city = object.data.city || 'all';
    }
}