const crudRepository = require('../../infrastructure/repositories/simple_crud')
const { NewsBookmark, SearchBookmark, DeleteNewsBookmark } = require('../../domain/bookmarks')

const USERS_BOOKMARKS_COLLECTION = 'users_bookmarks'

module.exports = class BookmarksController {

    async addNewsBookmark(arr) {
        console.log(arr);
        let searchEntity = new SearchBookmark(arr);
        let newsBookmarkEntity = null;
        crudRepository(USERS_BOOKMARKS_COLLECTION).findOne(searchEntity)
            .then(data => {
                if (data) {
                    // let news = data.news;
                    if (data.news.includes(arr.newsId) === false)
                        data.news.push(arr.newsId);
                    data.updated_at = new Date(new Date().getTime() + 18000000);
                    crudRepository(USERS_BOOKMARKS_COLLECTION).update(searchEntity, data);
                } else {
                    newsBookmarkEntity = new NewsBookmark(arr);
                    console.log(newsBookmarkEntity);
                    crudRepository(USERS_BOOKMARKS_COLLECTION).create(newsBookmarkEntity);
                }

            }).catch(err => { throw err; })
        return true;
    }

    async removeNewsBookmark(arr) {
        console.log(arr);
        let searchEntity = new SearchBookmark(arr);
        crudRepository(USERS_BOOKMARKS_COLLECTION).findOne(searchEntity)
            .then(data => {
                if (data) {
                    console.log('data from repository=> ',data);
                    const index = data.news.indexOf(arr.newsId);
                    console.log(index);
                    if (index > -1) {
                        data.news.splice(index, 1);
                    }
                    data.updated_at = new Date(new Date().getTime() + 18000000);

                    crudRepository(USERS_BOOKMARKS_COLLECTION).update(searchEntity, data);
                } else {
                    throw new Error('No Data Found');
                }

            }).catch(err => { throw err; })
        return true;
    }

    async findUserBookmarks(arr) {
        let searchEntity = new SearchBookmark(arr);
        let data = {};
        data = await crudRepository(USERS_BOOKMARKS_COLLECTION).findOne(searchEntity, null, ['news','activities']);
        console.log('bookmarks from db=> ', data);
        return data;
    }

    async addActivityBookmark(arr) {
        console.log(arr);
        let searchEntity = new SearchBookmark(arr);
        let newsBookmarkEntity = null;
        crudRepository(USERS_BOOKMARKS_COLLECTION).findOne(searchEntity)
            .then(data => {
                if (data) {
                    // let news = data.news;
                    console.log('data from repo in addactivity=>',data.activities);
                    if (data.activities.includes(arr.activityId) === false)
                        data.activities.push(arr.activityId);
                    data.updated_at = new Date(new Date().getTime() + 18000000);
                    console.log('data from repo after updation=>',data);
                    crudRepository(USERS_BOOKMARKS_COLLECTION).update(searchEntity, data);
                } else {
                    newsBookmarkEntity = new NewsBookmark(arr);
                    console.log(newsBookmarkEntity);
                    crudRepository(USERS_BOOKMARKS_COLLECTION).create(newsBookmarkEntity);
                }

            }).catch(err => { throw err; })
        return true;
    }

    async removeActivityBookmark(arr) {
        console.log(arr);
        let searchEntity = new SearchBookmark(arr);
        crudRepository(USERS_BOOKMARKS_COLLECTION).findOne(searchEntity)
            .then(data => {
                if (data) {
                    console.log('data from repository=> ',data);
                    const index = data.activities.indexOf(arr.activityId);
                    console.log(index);
                    if (index > -1) {
                        data.activities.splice(index, 1);
                    }
                    data.updated_at = new Date(new Date().getTime() + 18000000);

                    crudRepository(USERS_BOOKMARKS_COLLECTION).update(searchEntity, data);
                } else {
                    throw new Error('No Data Found');
                }

            }).catch(err => { throw err; })
        return true;
    }
}