const { News, SearchNewsById, SearchNews } = require('../../domain/news')
const newsRepository = require('../../infrastructure/repositories/news')


module.exports = class UserController {

    async findNewsById(filterObject) {
        // let newsSearchEntity = new SearchNewsById(newsIdObject);
        let offset = Math.floor(Math.random() * 250);
        let data = await newsRepository.searchDetailedNews(filterObject.newsId,filterObject.userId, offset);
        console.log('similar news with data=>>>', data);
        return data;
        // return { userData, userDetailData }
    }

    async filterNewsByIds(arr) {
        return await newsRepository.searchNewsByIdArray(arr.newsIdArray);
    }

    async filterNews(filterObject) {
        let userSearchEntity = new SearchNews(filterObject);
        let data = await newsRepository.searchNews(userSearchEntity, filterObject.userId, filterObject.limit, filterObject.offset);
        return data;
    }

    async upVoteNews(arr) {
        let data = null;
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        if (!userVoteData) {
            newsRepository.addUserVote(arr.newsId, arr.userId, true, false);
            data = await newsRepository.upVoteNews(arr.newsId);
        }
        else {
            if (userVoteData.positive_voted)
                throw new Error(`User has Already Up Voted the News with ID ${arr.newsId}`);
            newsRepository.updateUserVote(arr.newsId, arr.userId, true, false);
            data = await newsRepository.upVoteNews(arr.newsId);
        }
        return data;
    }

    async downVoteNews(arr) {
        let data = null;
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        console.log(userVoteData);
        if (!userVoteData) {
            newsRepository.addUserVote(arr.newsId, arr.userId, false, true);
            data = await newsRepository.downVoteNews(arr.newsId);
        }
        else {
            if (userVoteData.negative_voted)
                throw new Error(`User has Already Down Voted the News with ID ${arr.newsId}`);
            newsRepository.updateUserVote(arr.newsId, arr.userId, false, true);
            data = await newsRepository.downVoteNews(arr.newsId);
        }
        return data;
    }

    async removeUpVoteFromNews(arr) {
        let data = {};
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        console.log(userVoteData);
        if (!userVoteData)
            throw new Error(`No record to found to remove the Up vote`);
        else if (userVoteData.positive_voted)
            data = await newsRepository.removeUpVoteFromNews(arr.newsId, arr.userId);
        else throw new Error(`User didn't have any positive votes for news ${arr.newsId}`);
        return data;
    }

    async removeDownVoteFromNews(arr) {
        let data = {};
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        console.log(userVoteData);
        if (!userVoteData)
            throw new Error(`No record to found to remove the Down vote`);
        else if (userVoteData.negative_voted)
            data = await newsRepository.removeDownVoteFromNews(arr.newsId, arr.userId);
        else throw new Error(`User didn't have any negative votes for news ${arr.newsId}`);
        return data;
    }
}