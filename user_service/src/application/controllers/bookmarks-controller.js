const crudRepository = require('../../infrastructure/repositories/simple_crud')
const { NewsBookmark, SearchBookmark, DeleteNewsBookmark } = require('../../domain/bookmarks')
const bookmarksRepo = require('../../infrastructure/repositories/bookmarks-repo')

const USERS_BOOKMARKS_COLLECTION = 'users_bookmarks'

module.exports = class BookmarksController {

    async addNewsBookmark(arr) {
        bookmarksRepo.saveNews(arr.newsId, arr.userId)
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        return true;
    }

    async removeNewsBookmark(arr) {
        bookmarksRepo.removeNews(arr.newsId, arr.userId)
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        return true;
    }

    async findActivityBookmarks(arr) {
        let data = await bookmarksRepo.ativityList(arr.userId);
        return data;
    }

    async findNewsBookmarks(arr) {
        let data = await bookmarksRepo.newsList(arr.userId);
        return data;
    }

    async addActivityBookmark(arr) {
        bookmarksRepo.saveActivity(arr.activityId, arr.userId)
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        return true;
    }

    async removeActivityBookmark(arr) {
        bookmarksRepo.removeActivity(arr.activityId, arr.userId)
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        return true;
    }
}