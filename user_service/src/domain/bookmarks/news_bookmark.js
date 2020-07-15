
let offset = new Date().getTimezoneOffset();
offset = Math.abs(offset * 60 * 1000); // convert offset minutes into milliseconds
module.exports = class NewsBookmark {
    constructor(object) {
        this.user_id = object.userId;
        this.news = object.newsId ? [object.newsId] : [];
        this.activities = object.activityId ? [object.activityId] : [];
        this.created_at = new Date(new Date().getTime() + 18000000);
        this.updated_at = null;
    }
}